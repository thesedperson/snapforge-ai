"""IPv6 DNS resolution for Aerolink (Claude) endpoints.

api.aerolink.lat (formerly capi.aerolink.lat) — Aerolink's Anthropic-compatible
gateway — only accepts
connections over its IPv6 / DNS64 address; its IPv4 endpoint resets the TLS
handshake ("Connection reset by peer"). On hosts without a global IPv6
source address, glibc's ``getaddrinfo`` applies ``AI_ADDRCONFIG`` and drops
the AAAA record, so httpx/anyio only resolve the broken IPv4 address and
every request fails with ``ConnectError``.

This module installs a scoped wrapper around ``socket.getaddrinfo`` that, for
``*.aerolink.lat`` hosts queried with the default address family, re-queries
the AAAA record explicitly (which bypasses ``AI_ADDRCONFIG``) and merges the
IPv6 result in ahead of the broken IPv4 address. The working address is then
reachable by every consumer of the process DNS stack — the shared async
client in ``src/llm_core.py``, the endpoint probes in
``routes/model_routes.py``, and any other httpx call.

For every other host the wrapper is a transparent passthrough. ``AF_INET``-
only lookups are left untouched (an explicit IPv4 request never gains an IPv6
result). This mirrors the scoping philosophy of ``src/tls_overrides.py``: the
override is confined to LLM provider hosts where returning the IPv6 address
is the *correct* resolution, and it does not weaken or alter DNS for anything
else.
"""

import logging
import socket

logger = logging.getLogger(__name__)

_AEROLINK_SUFFIX = ".aerolink.lat"
_installed = False
_orig_getaddrinfo = socket.getaddrinfo


def _aerolink_getaddrinfo(host, port, family=0, type=0, proto=0, flags=0):
    result = _orig_getaddrinfo(host, port, family, type, proto, flags)
    # Only augment default (AF_UNSPEC) or AF_INET6 lookups for aerolink hosts
    # whose IPv6 record was dropped by AI_ADDRCONFIG. An explicit AF_INET
    # request must never gain an IPv6 result.
    if (
        family in (0, socket.AF_UNSPEC, socket.AF_INET6)
        and isinstance(host, str)
        and host.lower().endswith(_AEROLINK_SUFFIX)
        and not any(r[0] == socket.AF_INET6 for r in result)
    ):
        try:
            v6 = _orig_getaddrinfo(host, port, socket.AF_INET6, type, proto, flags)
            if v6:
                result = list(v6) + list(result)
        except socket.gaierror:
            pass
    return result


def install():
    """Install the scoped getaddrinfo wrapper (idempotent)."""
    global _installed
    if _installed:
        return
    _installed = True
    socket.getaddrinfo = _aerolink_getaddrinfo
    logger.debug("Installed Aerolink IPv6 getaddrinfo wrapper")


install()
