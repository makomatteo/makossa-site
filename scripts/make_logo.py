# Genera il logo Makossa (stile Interstellar, eclissi con luce a destra al posto della O, "IT" in esponente)
# come SVG con le lettere convertite in tracciati.
# Serve il font Jost variabile (OFL): https://github.com/google/fonts/raw/main/ofl/jost/Jost%5Bwght%5D.ttf
# salvato come Jost.ttf nella cartella da cui si lancia, e `pip install fonttools`.
# Uso: python scripts/make_logo.py public/logo
import math, sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

SRC = "Jost.ttf"
CAP = 700          # cap height Jost (upm 1000)
TRACK = 500        # 0.5em tra le lettere, come nel bozzetto
IT_SCALE = 0.262   # 11px / 42px
IT_TRACK = 500     # 0.5em della sigla, in unità della sigla
IT_GAP = 230       # spazio tra la A e la I
ECL_D = 720        # diametro eclissi (cap height + overshoot)
ECL_SHIFT = 0.07   # spostamento del disco d'ombra verso sinistra (7% del diametro)


def font(w):
    return instantiateVariableFont(TTFont(SRC), {"wght": w})


def glyph_path(f, ch, x, y, s=1.0):
    gs = f.getGlyphSet()
    name = f.getBestCmap()[ord(ch)]
    pen = SVGPathPen(gs)
    # y verso il basso in SVG: baseline a y, scala s
    gs[name].draw(TransformPen(pen, (s, 0, 0, -s, x, y)))
    bp = BoundsPen(gs)
    gs[name].draw(bp)
    import re
    cmds = re.sub(r"-?\d+\.\d+", lambda m: f"{float(m.group()):.1f}".rstrip("0").rstrip("."), pen.getCommands())
    return cmds, gs[name].width * s, bp.bounds


def crescent(cx, cy, d, shift):
    # falce di luce sul lato destro: il disco d'ombra è spostato verso sinistra
    r = d / 2
    o = d * shift
    ix = cx - o / 2
    iy = math.sqrt(r * r - (o / 2) ** 2)
    top, bot = (ix, cy - iy), (ix, cy + iy)
    return (f"M{top[0]:.1f} {top[1]:.1f}"
            f"A{r} {r} 0 1 1 {bot[0]:.1f} {bot[1]:.1f}"
            f"A{r} {r} 0 0 0 {top[0]:.1f} {top[1]:.1f}Z")


def build(with_it=True):
    main, small = font(200), font(300)
    base = CAP  # baseline: le maiuscole occupano y 0..700
    paths, x = [], 0
    first_lsb = None
    for ch in "MAK":
        d, adv, b = glyph_path(main, ch, x, base)
        if first_lsb is None:
            first_lsb = b[0]
        paths.append(d)
        x += adv + TRACK
    # eclissi al posto della O
    paths.append(crescent(x + ECL_D / 2, base - CAP / 2, ECL_D, ECL_SHIFT))
    x += ECL_D + TRACK
    last_right = None
    for i, ch in enumerate("SSA"):
        d, adv, b = glyph_path(main, ch, x, base)
        paths.append(d)
        last_right = x + b[2]
        x += adv + (TRACK if i < 2 else 0)
    right = last_right
    if with_it:
        ix = last_right + IT_GAP
        it_base = CAP * IT_SCALE  # cima della sigla allineata alla cima delle maiuscole
        for i, ch in enumerate("IT"):
            d, adv, b = glyph_path(small, ch, ix, it_base, IT_SCALE)
            if i == 0:
                # compensa il margine sinistro della I
                pass
            paths.append(d)
            right = ix + b[2] * IT_SCALE
            ix += adv + IT_TRACK * IT_SCALE
    left = first_lsb
    return paths, left, right


def svg(paths, left, right, fill, bg=None, pad=0):
    w = right - left + 2 * pad
    h = CAP + 20 + 2 * pad  # +20: overshoot di eclissi / lettere tonde
    vb = f"{left - pad:.0f} {-10 - pad:.0f} {w:.0f} {h:.0f}"
    rect = f'<rect x="{left - pad:.0f}" y="{-10 - pad:.0f}" width="{w:.0f}" height="{h:.0f}" fill="{bg}"/>' if bg else ""
    body = "".join(f'<path d="{p}"/>' for p in paths)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="Makossa">'
            f'<title>Makossa</title>{rect}<g fill="{fill}">{body}</g></svg>\n')


if __name__ == "__main__":
    out = sys.argv[1]
    for it in (True, False):
        p, l, r = build(it)
        suffix = "" if it else "-no-it"
        open(f"{out}/makossa-logo-white{suffix}.svg", "w").write(svg(p, l, r, "#ffffff"))
        open(f"{out}/makossa-logo-black{suffix}.svg", "w").write(svg(p, l, r, "#000000"))
        open(f"{out}/makossa-logo-white-on-black{suffix}.svg", "w").write(svg(p, l, r, "#ffffff", "#000000", pad=600))
        open(f"{out}/makossa-logo-black-on-white{suffix}.svg", "w").write(svg(p, l, r, "#000000", "#ffffff", pad=600))
    print("ok")
