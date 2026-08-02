#compdef snapforge snapforge-backup snapforge-calendar snapforge-contacts snapforge-cookbook snapforge-docs snapforge-gallery snapforge-mail snapforge-mcp snapforge-memory snapforge-notes snapforge-personal snapforge-preset snapforge-research snapforge-sessions snapforge-signature snapforge-skills snapforge-tasks snapforge-theme snapforge-webhook
# Zsh tab-completion for the snapforge umbrella + sub-CLIs.
#
# Drop in any directory on $fpath, e.g.:
#     fpath=(/path/to/snapforge-ui/scripts/_completion $fpath)
#     autoload -U compinit; compinit
#
# Then `snapforge <tab>` completes subcommands; `snapforge mail <tab>`
# completes mail subcommands; `snapforge-mail <tab>` works the same.

_snapforge_scripts_dir() {
    local self="${(%):-%x}"
    while [[ -L "$self" ]]; do self="$(readlink "$self")"; done
    cd "${self:h}/.." && pwd
}

typeset -gA _snapforge_subs

_snapforge_refresh() {
    _snapforge_subs=()
    local dir="$(_snapforge_scripts_dir)"
    local py="$dir/../venv/bin/python"
    [[ -x "$py" ]] || py="$(command -v python3)"
    local f sub help_out commands
    for f in "$dir"/snapforge-*; do
        [[ -x "$f" ]] || continue
        case "$f" in
            *.bak|*.pyc|*.pre-*) continue ;;
        esac
        sub="${${f:t}#snapforge-}"
        help_out=$("$py" "$f" --help 2>/dev/null) || continue
        commands=$(echo "$help_out" | grep -oE '\{[a-z0-9_,-]+\}' | head -1 \
            | tr -d '{}' | tr ',' ' ')
        _snapforge_subs[$sub]="$commands"
    done
}

_snapforge() {
    [[ ${#_snapforge_subs} -eq 0 ]] && _snapforge_refresh

    local cmd="${words[1]}"

    if [[ "$cmd" == "snapforge" ]]; then
        if (( CURRENT == 2 )); then
            local -a subs=(${(k)_snapforge_subs} help)
            _describe 'subcommand' subs
            return
        fi
        local sub="${words[2]}"
        if [[ "$sub" == "help" ]] && (( CURRENT == 3 )); then
            local -a subs=(${(k)_snapforge_subs})
            _describe 'subcommand' subs
            return
        fi
        if (( CURRENT == 3 )); then
            local -a sc=(${(s/ /)_snapforge_subs[$sub]})
            _describe 'command' sc
            return
        fi
        return
    fi

    # snapforge-foo <tab>
    local sub="${cmd#snapforge-}"
    if (( CURRENT == 2 )); then
        local -a sc=(${(s/ /)_snapforge_subs[$sub]})
        _describe 'command' sc
        return
    fi
}

_snapforge "$@"
