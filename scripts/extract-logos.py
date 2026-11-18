"""Extract clean individual logos using detected content segments."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "image" / "apoiadores.jpg"
OUT = ROOT / "assets" / "image" / "parceiros"
OUT.mkdir(parents=True, exist_ok=True)

im = Image.open(SRC).convert("RGB")


def trim(img: Image.Image, pad: int = 18, thr: int = 247) -> Image.Image:
    px = img.load()
    cw, ch = img.size
    for y in range(ch):
        for x in range(cw):
            r, g, b = px[x, y]
            if r >= thr and g >= thr and b >= thr:
                px[x, y] = (255, 255, 255)
    bbox = ImageOps.invert(img.convert("L")).getbbox()
    if not bbox:
        return img
    l, t, r, b = bbox
    return img.crop((max(0, l - pad), max(0, t - pad), min(cw, r + pad), min(ch, b + pad)))


def save(name: str, box: tuple[int, int, int, int]) -> None:
    piece = trim(im.crop(box))
    # Add a little white margin canvas for nicer grid display
    pad = 24
    canvas = Image.new("RGB", (piece.width + pad * 2, piece.height + pad * 2), (255, 255, 255))
    canvas.paste(piece, (pad, pad))
    path = OUT / f"{name}.png"
    canvas.save(path, optimize=True)
    print(f"{name:22} {canvas.size}")


# Boxes from automatic gutter detection + manual grouping for Prefeitura pairs
# x ranges padded slightly so edges aren't clipped
save("belmonte", (155, 335, 410, 515))
save("diario-do-rio", (412, 365, 535, 470))
save("polo-confeitarias", (540, 320, 690, 520))

save("rio-capital-livro", (100, 515, 290, 655))
save("prefeitura-cultura", (270, 515, 490, 655))
save("conselho-moda", (475, 515, 715, 655))

save("marinha", (90, 670, 220, 900))
save("dphdm", (260, 670, 360, 920))
save("arqrio", (395, 670, 555, 950))
save("cau-rj", (555, 680, 720, 930))

print("done")
