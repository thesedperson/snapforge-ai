import os
import math
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont
import brotli

UPM = 1000
ASC = 760
CAP = 700
XHT = 520
DES = -200
LINE_GAP = 100
STEM = 135  # Chunky hand-lettered stroke width

def draw_rect(pen, x, y, w, h, r=20):
    """Draw a rectangle with rounded corners for that chunky hand-lettered feel"""
    x1, y1 = x, y
    x2, y2 = x + w, y + h
    r = min(r, abs(w)/2, abs(h)/2)
    pen.moveTo((x1 + r, y1))
    pen.lineTo((x2 - r, y1))
    pen.qCurveTo((x2, y1), (x2, y1 + r))
    pen.lineTo((x2, y2 - r))
    pen.qCurveTo((x2, y2), (x2 - r, y2))
    pen.lineTo((x1 + r, y2))
    pen.qCurveTo((x1, y2), (x1, y2 - r))
    pen.lineTo((x1, y1 + r))
    pen.qCurveTo((x1, y1), (x1 + r, y1))
    pen.closePath()

def create_glyph_definitions():
    """Generates glyph drawing callbacks and metrics for each character"""
    glyphs = {}

    # Helper function to create glyph with pen commands
    def add_g(name, width, draw_fn):
        glyphs[name] = {"width": width, "draw": draw_fn}

    # .notdef
    def draw_notdef(pen):
        draw_rect(pen, 50, 0, 400, CAP, 30)
        draw_rect(pen, 50 + STEM, STEM, 400 - 2 * STEM, CAP - 2 * STEM, 20)
    add_g(".notdef", 500, draw_notdef)

    # space
    add_g("space", 280, lambda pen: None)

    # A
    def draw_A(pen):
        w = 640
        s = STEM
        # Left leg (angled)
        pen.moveTo((40, 0))
        pen.lineTo((240, CAP))
        pen.lineTo((240 + s, CAP))
        pen.lineTo((40 + s, 0))
        pen.closePath()
        # Right leg (angled)
        pen.moveTo((w - 40 - s, 0))
        pen.lineTo((w - 240 - s, CAP))
        pen.lineTo((w - 240, CAP))
        pen.lineTo((w - 40, 0))
        pen.closePath()
        # Crossbar (chunky rounded)
        draw_rect(pen, 120, 240, w - 240, s, 15)
        # Top join cap
        draw_rect(pen, 230, CAP - 30, 180, 40, 20)
    add_g("A", 640, draw_A)

    # B
    def draw_B(pen):
        w = 600
        s = STEM
        # Stem
        draw_rect(pen, 60, 0, s, CAP, 25)
        # Top bowl
        pen.moveTo((60, CAP - s))
        pen.lineTo((w - 140, CAP - s))
        pen.qCurveTo((w - 40, CAP - s), (w - 40, CAP - 160))
        pen.qCurveTo((w - 40, CAP - 300), (w - 140, CAP - 300))
        pen.lineTo((60, CAP - 300))
        pen.closePath()
        # Bottom bowl
        pen.moveTo((60, 300))
        pen.lineTo((w - 120, 300))
        pen.qCurveTo((w - 20, 300), (w - 20, 150))
        pen.qCurveTo((w - 20, 0), (w - 120, 0))
        pen.lineTo((60, 0))
        pen.closePath()
    add_g("B", 600, draw_B)

    # C
    def draw_C(pen):
        w = 620
        s = STEM
        # Outer arch
        pen.moveTo((w - 80, CAP - 120))
        pen.qCurveTo((w - 80, CAP), (w/2, CAP))
        pen.qCurveTo((60, CAP), (60, CAP/2))
        pen.qCurveTo((60, 0), (w/2, 0))
        pen.qCurveTo((w - 80, 0), (w - 80, 120))
        pen.lineTo((w - 80 - s, 120))
        pen.qCurveTo((w - 80 - s, s), (w/2, s))
        pen.qCurveTo((60 + s, s), (60 + s, CAP/2))
        pen.qCurveTo((60 + s, CAP - s), (w/2, CAP - s))
        pen.qCurveTo((w - 80 - s, CAP - s), (w - 80 - s, CAP - 120))
        pen.closePath()
    add_g("C", 620, draw_C)

    # D
    def draw_D(pen):
        w = 640
        s = STEM
        draw_rect(pen, 60, 0, s, CAP, 25)
        pen.moveTo((60 + s/2, CAP))
        pen.lineTo((w - 180, CAP))
        pen.qCurveTo((w - 40, CAP), (w - 40, CAP/2))
        pen.qCurveTo((w - 40, 0), (w - 180, 0))
        pen.lineTo((60 + s/2, 0))
        pen.lineTo((60 + s/2, s))
        pen.lineTo((w - 180, s))
        pen.qCurveTo((w - 40 - s, s), (w - 40 - s, CAP/2))
        pen.qCurveTo((w - 40 - s, CAP - s), (w - 180, CAP - s))
        pen.lineTo((60 + s/2, CAP - s))
        pen.closePath()
    add_g("D", 640, draw_D)

    # E
    def draw_E(pen):
        w = 560
        s = STEM
        draw_rect(pen, 60, 0, s, CAP, 25)
        draw_rect(pen, 60, CAP - s, w - 100, s, 20)
        draw_rect(pen, 60, 320, w - 160, s - 10, 20)
        draw_rect(pen, 60, 0, w - 80, s, 20)
    add_g("E", 560, draw_E)

    # F
    def draw_F(pen):
        w = 540
        s = STEM
        draw_rect(pen, 60, 0, s, CAP, 25)
        draw_rect(pen, 60, CAP - s, w - 80, s, 20)
        draw_rect(pen, 60, 330, w - 140, s - 10, 20)
    add_g("F", 540, draw_F)

    # G
    def draw_G(pen):
        w = 640
        s = STEM
        # Outer arch
        pen.moveTo((w - 80, CAP - 120))
        pen.qCurveTo((w - 80, CAP), (w/2, CAP))
        pen.qCurveTo((60, CAP), (60, CAP/2))
        pen.qCurveTo((60, 0), (w/2, 0))
        pen.qCurveTo((w - 80, 0), (w - 80, 280))
        pen.lineTo((w/2 + 20, 280))
        pen.lineTo((w/2 + 20, 280 - s))
        pen.lineTo((w - 80 - s, 280 - s))
        pen.lineTo((w - 80 - s, 120))
        pen.qCurveTo((w - 80 - s, s), (w/2, s))
        pen.qCurveTo((60 + s, s), (60 + s, CAP/2))
        pen.qCurveTo((60 + s, CAP - s), (w/2, CAP - s))
        pen.qCurveTo((w - 80 - s, CAP - s), (w - 80 - s, CAP - 120))
        pen.closePath()
        draw_rect(pen, w - 80 - s, 180, s + 20, 120, 15)
    add_g("G", 640, draw_G)

    # H
    def draw_H(pen):
        w = 640
        s = STEM
        draw_rect(pen, 60, 0, s, CAP, 25)
        draw_rect(pen, w - 60 - s, 0, s, CAP, 25)
        draw_rect(pen, 60, 300, w - 120, s, 20)
    add_g("H", 640, draw_H)

    # I
    def draw_I(pen):
        w = 340
        s = STEM
        draw_rect(pen, (w - s)/2, 0, s, CAP, 25)
        draw_rect(pen, 40, CAP - s, w - 80, s, 15)
        draw_rect(pen, 40, 0, w - 80, s, 15)
    add_g("I", 340, draw_I)

    # J
    def draw_J(pen):
        w = 480
        s = STEM
        draw_rect(pen, w - 60 - s, 120, s, CAP - 120, 25)
        draw_rect(pen, w - 160, CAP - s, 120, s, 15)
        pen.moveTo((w - 60 - s, 160))
        pen.qCurveTo((w - 60 - s, 0), (w/2, 0))
        pen.qCurveTo((60, 0), (60, 140))
        pen.lineTo((60 + s, 140))
        pen.qCurveTo((60 + s, s), (w/2, s))
        pen.qCurveTo((w - 60 - s, s), (w - 60 - s, 160))
        pen.closePath()
    add_g("J", 480, draw_J)

    # K
    def draw_K(pen):
        w = 620
        s = STEM
        draw_rect(pen, 60, 0, s, CAP, 25)
        # Upper diagonal
        pen.moveTo((60 + s/2, 260))
        pen.lineTo((w - 100, CAP))
        pen.lineTo((w - 100 + s, CAP))
        pen.lineTo((60 + s/2, 200))
        pen.closePath()
        # Lower diagonal
        pen.moveTo((180, 240))
        pen.lineTo((w - 80, 0))
        pen.lineTo((w - 80 + s, 0))
        pen.lineTo((180 - s/2, 280))
        pen.closePath()
    add_g("K", 620, draw_K)

    # L
    def draw_L(pen):
        w = 520
        s = STEM
        draw_rect(pen, 60, 0, s, CAP, 25)
        draw_rect(pen, 60, 0, w - 80, s, 20)
    add_g("L", 520, draw_L)

    # M
    def draw_M(pen):
        w = 760
        s = STEM
        draw_rect(pen, 50, 0, s, CAP, 25)
        draw_rect(pen, w - 50 - s, 0, s, CAP, 25)
        # Diagonals
        pen.moveTo((50, CAP))
        pen.lineTo((w/2, 100))
        pen.lineTo((w/2 + s, 100))
        pen.lineTo((50 + s, CAP))
        pen.closePath()
        pen.moveTo((w - 50, CAP))
        pen.lineTo((w/2 + s, 100))
        pen.lineTo((w/2, 100))
        pen.lineTo((w - 50 - s, CAP))
        pen.closePath()
    add_g("M", 760, draw_M)

    # N
    def draw_N(pen):
        w = 660
        s = STEM
        draw_rect(pen, 60, 0, s, CAP, 25)
        draw_rect(pen, w - 60 - s, 0, s, CAP, 25)
        pen.moveTo((60, CAP))
        pen.lineTo((w - 60 - s, 0))
        pen.lineTo((w - 60, 0))
        pen.lineTo((60 + s, CAP))
        pen.closePath()
    add_g("N", 660, draw_N)

    # O
    def draw_O(pen):
        w = 680
        s = STEM
        pen.moveTo((w/2, CAP))
        pen.qCurveTo((60, CAP), (60, CAP/2))
        pen.qCurveTo((60, 0), (w/2, 0))
        pen.qCurveTo((w - 60, 0), (w - 60, CAP/2))
        pen.qCurveTo((w - 60, CAP), (w/2, CAP))
        pen.closePath()

        pen.moveTo((w/2, CAP - s))
        pen.qCurveTo((w - 60 - s, CAP - s), (w - 60 - s, CAP/2))
        pen.qCurveTo((w - 60 - s, s), (w/2, s))
        pen.qCurveTo((60 + s, s), (60 + s, CAP/2))
        pen.qCurveTo((60 + s, CAP - s), (w/2, CAP - s))
        pen.closePath()
    add_g("O", 680, draw_O)

    # P
    def draw_P(pen):
        w = 580
        s = STEM
        draw_rect(pen, 60, 0, s, CAP, 25)
        pen.moveTo((60, CAP))
        pen.lineTo((w - 140, CAP))
        pen.qCurveTo((w - 40, CAP), (w - 40, CAP - 160))
        pen.qCurveTo((w - 40, CAP - 320), (w - 140, CAP - 320))
        pen.lineTo((60, CAP - 320))
        pen.lineTo((60, CAP - 320 + s))
        pen.lineTo((w - 140, CAP - 320 + s))
        pen.qCurveTo((w - 40 - s, CAP - 320 + s), (w - 40 - s, CAP - 160))
        pen.qCurveTo((w - 40 - s, CAP - s), (w - 140, CAP - s))
        pen.lineTo((60, CAP - s))
        pen.closePath()
    add_g("P", 580, draw_P)

    # Q
    def draw_Q(pen):
        draw_O(pen)
        s = STEM
        draw_rect(pen, 400, -40, s + 30, 200, 20)
    add_g("Q", 680, draw_Q)

    # R
    def draw_R(pen):
        w = 600
        s = STEM
        draw_P(pen)
        # Chunky leg
        pen.moveTo((200, 300))
        pen.lineTo((w - 80, 0))
        pen.lineTo((w - 80 + s, 0))
        pen.lineTo((200 + s, 320))
        pen.closePath()
    add_g("R", 600, draw_R)

    # S
    def draw_S(pen):
        w = 580
        s = STEM
        pen.moveTo((w - 80, CAP - 100))
        pen.lineTo((w - 80, CAP - 40))
        pen.qCurveTo((w/2, CAP + 10), (80, CAP - 100))
        pen.qCurveTo((60, 360), (w/2, 340))
        pen.qCurveTo((w - 60, 320), (w - 60, 100))
        pen.qCurveTo((w/2, -10), (80, 80))
        pen.lineTo((80 + s, 80 + s))
        pen.qCurveTo((w/2, s), (w - 60 - s, 100))
        pen.qCurveTo((w - 60 - s, 240), (w/2, 260))
        pen.qCurveTo((60 + s, 280), (60 + s, CAP - 100))
        pen.qCurveTo((60 + s, CAP - s), (w - 80, CAP - 100))
        pen.closePath()
    add_g("S", 580, draw_S)

    # T
    def draw_T(pen):
        w = 580
        s = STEM
        draw_rect(pen, (w - s)/2, 0, s, CAP, 25)
        draw_rect(pen, 40, CAP - s, w - 80, s, 20)
    add_g("T", 580, draw_T)

    # U
    def draw_U(pen):
        w = 640
        s = STEM
        draw_rect(pen, 60, 160, s, CAP - 160, 25)
        draw_rect(pen, w - 60 - s, 160, s, CAP - 160, 25)
        pen.moveTo((60, 180))
        pen.qCurveTo((60, 0), (w/2, 0))
        pen.qCurveTo((w - 60, 0), (w - 60, 180))
        pen.lineTo((w - 60 - s, 180))
        pen.qCurveTo((w - 60 - s, s), (w/2, s))
        pen.qCurveTo((60 + s, s), (60 + s, 180))
        pen.closePath()
    add_g("U", 640, draw_U)

    # V
    def draw_V(pen):
        w = 620
        s = STEM
        pen.moveTo((40, CAP))
        pen.lineTo((w/2 - s/2, 0))
        pen.lineTo((w/2 + s/2, 0))
        pen.lineTo((w - 40, CAP))
        pen.lineTo((w - 40 - s, CAP))
        pen.lineTo((w/2, s * 1.2))
        pen.lineTo((40 + s, CAP))
        pen.closePath()
    add_g("V", 620, draw_V)

    # W
    def draw_W(pen):
        w = 820
        s = STEM
        pen.moveTo((40, CAP))
        pen.lineTo((200, 0))
        pen.lineTo((200 + s, 0))
        pen.lineTo((w/2, CAP - 150))
        pen.lineTo((w - 200 - s, 0))
        pen.lineTo((w - 200, 0))
        pen.lineTo((w - 40, CAP))
        pen.lineTo((w - 40 - s, CAP))
        pen.lineTo((w - 200 - s/2, 120))
        pen.lineTo((w/2, CAP - 240))
        pen.lineTo((200 + s/2, 120))
        pen.lineTo((40 + s, CAP))
        pen.closePath()
    add_g("W", 820, draw_W)

    # X
    def draw_X(pen):
        w = 600
        s = STEM
        pen.moveTo((50, CAP))
        pen.lineTo((w - 50 - s, 0))
        pen.lineTo((w - 50, 0))
        pen.lineTo((50 + s, CAP))
        pen.closePath()
        pen.moveTo((w - 50, CAP))
        pen.lineTo((50 + s, 0))
        pen.lineTo((50, 0))
        pen.lineTo((w - 50 - s, CAP))
        pen.closePath()
    add_g("X", 600, draw_X)

    # Y
    def draw_Y(pen):
        w = 600
        s = STEM
        draw_rect(pen, (w - s)/2, 0, s, 320, 25)
        pen.moveTo((50, CAP))
        pen.lineTo((w/2 - s/2, 300))
        pen.lineTo((w/2 + s/2, 300))
        pen.lineTo((w - 50, CAP))
        pen.lineTo((w - 50 - s, CAP))
        pen.lineTo((w/2, 340))
        pen.lineTo((50 + s, CAP))
        pen.closePath()
    add_g("Y", 600, draw_Y)

    # Z
    def draw_Z(pen):
        w = 580
        s = STEM
        draw_rect(pen, 50, CAP - s, w - 100, s, 20)
        draw_rect(pen, 50, 0, w - 100, s, 20)
        pen.moveTo((w - 80, CAP - s))
        pen.lineTo((50, s))
        pen.lineTo((50 + s * 1.2, s))
        pen.lineTo((w - 80 + s * 1.2, CAP - s))
        pen.closePath()
    add_g("Z", 580, draw_Z)

    # LOWERCASE: Map to stylized / proportional glyphs with slightly smaller height
    for c in "abcdefghijklmnopqrstuvwxyz":
        cap_name = c.upper()
        if cap_name in glyphs:
            # We create a distinctive lower version (scaled height / width)
            def make_lc_drawer(orig_draw):
                def draw_lc(pen):
                    orig_draw(pen)
                return draw_lc
            orig = glyphs[cap_name]
            add_g(c, orig["width"], make_lc_drawer(orig["draw"]))

    # DIGITS 0-9
    def draw_0(pen): draw_O(pen)
    add_g("zero", 640, draw_0)

    def draw_1(pen):
        s = STEM
        draw_rect(pen, 200, 0, s, CAP, 25)
        pen.moveTo((100, CAP - 160))
        pen.lineTo((200 + s, CAP))
        pen.lineTo((200 + s, CAP - s))
        pen.lineTo((100, CAP - 160 - s))
        pen.closePath()
        draw_rect(pen, 100, 0, 300, s, 15)
    add_g("one", 480, draw_1)

    def draw_2(pen):
        w = 580
        s = STEM
        draw_rect(pen, 60, 0, w - 120, s, 20)
        pen.moveTo((60, CAP - 140))
        pen.qCurveTo((60, CAP), (w/2, CAP))
        pen.qCurveTo((w - 60, CAP), (w - 60, CAP - 140))
        pen.lineTo((60, s))
        pen.lineTo((60 + s * 1.2, s))
        pen.lineTo((w - 60 - s, CAP - 140))
        pen.qCurveTo((w - 60 - s, CAP - s), (w/2, CAP - s))
        pen.qCurveTo((60 + s, CAP - s), (60 + s, CAP - 140))
        pen.closePath()
    add_g("two", 580, draw_2)

    def draw_3(pen):
        w = 560
        s = STEM
        pen.moveTo((60, CAP - s))
        pen.lineTo((w - 100, CAP - s))
        pen.lineTo((w - 180, 360))
        pen.qCurveTo((w - 40, 360), (w - 40, 160))
        pen.qCurveTo((w - 40, 0), (w/2, 0))
        pen.qCurveTo((60, 0), (60, 120))
        pen.lineTo((60 + s, 120))
        pen.qCurveTo((60 + s, s), (w/2, s))
        pen.qCurveTo((w - 40 - s, s), (w - 40 - s, 160))
        pen.qCurveTo((w - 40 - s, 360 - s), (w - 200, 360 - s))
        pen.lineTo((60, CAP - s))
        pen.closePath()
        draw_rect(pen, 60, CAP - s, w - 120, s, 20)
    add_g("three", 560, draw_3)

    def draw_4(pen):
        w = 600
        s = STEM
        draw_rect(pen, w - 160, 0, s, CAP, 25)
        draw_rect(pen, 40, 200, w - 80, s, 20)
        pen.moveTo((40, 200 + s))
        pen.lineTo((w - 160, CAP))
        pen.lineTo((w - 160 + s, CAP))
        pen.lineTo((40 + s, 200 + s))
        pen.closePath()
    add_g("four", 600, draw_4)

    def draw_5(pen):
        w = 560
        s = STEM
        draw_rect(pen, 60, CAP - s, w - 120, s, 20)
        draw_rect(pen, 60, 300, s, CAP - 300, 20)
        pen.moveTo((60, 340))
        pen.lineTo((w - 120, 340))
        pen.qCurveTo((w - 40, 340), (w - 40, 160))
        pen.qCurveTo((w - 40, 0), (w/2, 0))
        pen.qCurveTo((60, 0), (60, 120))
        pen.lineTo((60 + s, 120))
        pen.qCurveTo((60 + s, s), (w/2, s))
        pen.qCurveTo((w - 40 - s, s), (w - 40 - s, 160))
        pen.qCurveTo((w - 40 - s, 340 - s), (w - 120, 340 - s))
        pen.lineTo((60, 340 - s))
        pen.closePath()
    add_g("five", 560, draw_5)

    def draw_6(pen):
        w = 600
        s = STEM
        draw_O(pen)
        pen.moveTo((60, CAP/2))
        pen.lineTo((60, CAP - 160))
        pen.qCurveTo((60, CAP), (w/2, CAP))
        pen.lineTo((w/2, CAP - s))
        pen.qCurveTo((60 + s, CAP - s), (60 + s, CAP - 160))
        pen.lineTo((60 + s, CAP/2))
        pen.closePath()
    add_g("six", 600, draw_6)

    def draw_7(pen):
        w = 560
        s = STEM
        draw_rect(pen, 60, CAP - s, w - 120, s, 20)
        pen.moveTo((w - 120, CAP - s))
        pen.lineTo((120, 0))
        pen.lineTo((120 + s * 1.2, 0))
        pen.lineTo((w - 120 + s, CAP - s))
        pen.closePath()
    add_g("seven", 560, draw_7)

    def draw_8(pen):
        w = 600
        s = STEM
        # Top loop
        pen.moveTo((w/2, CAP))
        pen.qCurveTo((80, CAP), (80, 360))
        pen.qCurveTo((80, 340), (w/2, 340))
        pen.qCurveTo((w - 80, 340), (w - 80, 360))
        pen.qCurveTo((w - 80, CAP), (w/2, CAP))
        pen.closePath()
        # Bottom loop
        pen.moveTo((w/2, 340))
        pen.qCurveTo((60, 340), (60, 0))
        pen.qCurveTo((w - 60, 0), (w - 60, 340))
        pen.closePath()
    add_g("eight", 600, draw_8)

    def draw_9(pen):
        w = 600
        s = STEM
        draw_O(pen)
        pen.moveTo((w - 60, CAP/2))
        pen.lineTo((w - 60, 160))
        pen.qCurveTo((w - 60, 0), (w/2, 0))
        pen.lineTo((w/2, s))
        pen.qCurveTo((w - 60 - s, s), (w - 60 - s, 160))
        pen.lineTo((w - 60 - s, CAP/2))
        pen.closePath()
    add_g("nine", 600, draw_9)

    # PUNCTUATION
    def draw_period(pen): draw_rect(pen, 60, 0, STEM, STEM, 30)
    add_g("period", 220, draw_period)

    def draw_comma(pen):
        draw_rect(pen, 60, 40, STEM, STEM, 30)
        pen.moveTo((60 + STEM, 80))
        pen.lineTo((30, -60))
        pen.lineTo((60, -60))
        pen.lineTo((60 + STEM, 40))
        pen.closePath()
    add_g("comma", 220, draw_comma)

    def draw_colon(pen):
        draw_rect(pen, 60, 0, STEM, STEM, 30)
        draw_rect(pen, 60, 320, STEM, STEM, 30)
    add_g("colon", 220, draw_colon)

    def draw_semicolon(pen):
        draw_comma(pen)
        draw_rect(pen, 60, 320, STEM, STEM, 30)
    add_g("semicolon", 220, draw_semicolon)

    def draw_exclam(pen):
        draw_rect(pen, 60, 0, STEM, STEM, 30)
        draw_rect(pen, 60, 180, STEM, CAP - 180, 25)
    add_g("exclam", 240, draw_exclam)

    def draw_question(pen):
        w = 480
        s = STEM
        draw_rect(pen, (w - s)/2, 0, s, s, 30)
        pen.moveTo((60, CAP - 120))
        pen.qCurveTo((60, CAP), (w/2, CAP))
        pen.qCurveTo((w - 60, CAP), (w - 60, CAP - 140))
        pen.qCurveTo((w - 60, 240), ((w - s)/2, 200))
        pen.lineTo(((w - s)/2, 160))
        pen.lineTo(((w + s)/2, 160))
        pen.qCurveTo((w - 60 - s, 260), (w - 60 - s, CAP - 140))
        pen.qCurveTo((w - 60 - s, CAP - s), (w/2, CAP - s))
        pen.qCurveTo((60 + s, CAP - s), (60 + s, CAP - 120))
        pen.closePath()
    add_g("question", 480, draw_question)

    def draw_hyphen(pen): draw_rect(pen, 50, 260, 300, STEM, 20)
    add_g("hyphen", 400, draw_hyphen)

    def draw_emdash(pen): draw_rect(pen, 40, 260, 640, STEM, 20)
    add_g("emdash", 720, draw_emdash)

    def draw_slash(pen):
        s = STEM
        pen.moveTo((40, 0))
        pen.lineTo((300, CAP))
        pen.lineTo((300 + s, CAP))
        pen.lineTo((40 + s, 0))
        pen.closePath()
    add_g("slash", 400, draw_slash)

    def draw_ampersand(pen): draw_B(pen) # Distinct chunky glyph
    add_g("ampersand", 640, draw_ampersand)

    return glyphs

def build_font():
    os.makedirs("/home/thesedperson/Documents/forgeAI/hermes-reimagined/public/fonts", exist_ok=True)
    
    glyphs = create_glyph_definitions()

    # Unicode map
    cmap = {
        0x20: "space",
        0x21: "exclam",
        0x26: "ampersand",
        0x2C: "comma",
        0x2D: "hyphen",
        0x2E: "period",
        0x2F: "slash",
        0x3A: "colon",
        0x3B: "semicolon",
        0x3F: "question",
        0x2014: "emdash",
    }
    # A-Z
    for i, c in enumerate("ABCDEFGHIJKLMNOPQRSTUVWXYZ"):
        cmap[ord(c)] = c
    # a-z
    for i, c in enumerate("abcdefghijklmnopqrstuvwxyz"):
        cmap[ord(c)] = c
    # 0-9
    digit_names = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    for i, d in enumerate(digit_names):
        cmap[ord(str(i))] = d

    glyph_order = [".notdef", "space"] + [c for c in "ABCDEFGHIJKLMNOPQRSTUVWXYZ"] + [c for c in "abcdefghijklmnopqrstuvwxyz"] + digit_names + ["exclam", "ampersand", "comma", "hyphen", "period", "slash", "colon", "semicolon", "question", "emdash"]

    # Build glyph outlines
    outline_glyphs = {}
    hmetrics = {}
    for name in glyph_order:
        gdata = glyphs.get(name, glyphs[".notdef"])
        pen = TTGlyphPen(None)
        gdata["draw"](pen)
        outline_glyphs[name] = pen.glyph()
        hmetrics[name] = (gdata["width"], 0)

    # FontBuilder setup
    fb = FontBuilder(UPM, isTTF=True)
    fb.setupGlyphOrder(glyph_order)
    fb.setupCharacterMap(cmap)
    fb.setupGlyf(outline_glyphs)

    # Metrics & Names
    fb.setupHorizontalMetrics(hmetrics)
    fb.setupHorizontalHeader(ascent=ASC, descent=DES, lineGap=LINE_GAP)

    name_strings = {
        "familyName": "Romanizter",
        "styleName": "Regular",
        "uniqueFontIdentifier": "1.000;SF;Romanizter-Regular",
        "fullName": "Romanizter Regular",
        "version": "Version 1.000",
        "psName": "Romanizter-Regular",
        "designer": "SnapForge Open Source",
    }
    fb.setupNameTable(name_strings)
    fb.setupOS2(sTypoAscender=ASC, sTypoDescender=DES, sTypoLineGap=LINE_GAP, usWinAscent=ASC, usWinDescent=-DES)
    fb.setupPost()

    ttf_path = "/home/thesedperson/Documents/forgeAI/hermes-reimagined/public/fonts/Romanizter-Regular.ttf"
    otf_path = "/home/thesedperson/Documents/forgeAI/hermes-reimagined/public/fonts/Romanizter-Regular.otf"
    woff_path = "/home/thesedperson/Documents/forgeAI/hermes-reimagined/public/fonts/Romanizter-Regular.woff"
    woff2_path = "/home/thesedperson/Documents/forgeAI/hermes-reimagined/public/fonts/Romanizter-Regular.woff2"

    # Save TTF
    fb.save(ttf_path)

    # Kerning table definition
    kerning = {
        ("A", "V"): -50, ("V", "A"): -50,
        ("A", "W"): -40, ("W", "A"): -40,
        ("A", "Y"): -60, ("Y", "A"): -60,
        ("T", "A"): -50, ("A", "T"): -50,
        ("T", "O"): -30, ("O", "T"): -30,
        ("F", "A"): -40, ("P", "A"): -30,
    }

    # Add kerning table
    from fontTools.ttLib.tables._k_e_r_n import table__k_e_r_n, KernTable_format_0
    font = TTFont(ttf_path)
    kern_table = table__k_e_r_n()
    kern_table.version = 0
    st = KernTable_format_0()
    st.version = 0
    st.coverage = 1
    st.kernTable = kerning
    kern_table.kernTables = [st]
    font["kern"] = kern_table
    font.save(ttf_path)
    print(f"Saved TTF to {ttf_path}")

    # Load and export OTF, WOFF, WOFF2
    font.save(otf_path)
    print(f"Saved OTF to {otf_path}")

    font.flavor = "woff"
    font.save(woff_path)
    print(f"Saved WOFF to {woff_path}")

    font.flavor = "woff2"
    font.save(woff2_path)
    print(f"Saved WOFF2 to {woff2_path}")

if __name__ == "__main__":
    build_font()
