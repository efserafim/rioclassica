from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "image" / "apoiadores.jpg"
OUT = ROOT / "assets" / "image" / "parceiros"
OUT.mkdir(parents=True, exist_ok=True)

im = Image.open(SRC).convert("RGB")

# Density-valley boxes on 819x1024 apoiadores.jpg
crops = {
    "belmonte": (155, 362, 408, 512),
    "diario-do-rio": (412, 368, 540, 478),
    "polo-confeitarias": (548, 325, 685, 515),
    "rio-capital-livro": (115, 528, 278, 652),
    "prefeitura-cultura": (278, 528, 485, 652),
    "conselho-moda": (490, 528, 710, 652),
    "marinha": (95, 675, 215, 885),
    "dphdm": (255, 675, 365, 915),
    "arqrio": (395, 675, 550, 945),
    "cau-rj": (560, 695, 725, 930),
}


def trim_white(crop, pad=14, threshold=248):
    px = crop.load()
    cw, ch = crop.size
    left, top, right, bottom = cw, ch, 0, 0
    found = False
    for y in range(ch):
        for x in range(cw):
            r, g, b = px[x, y]
            if r < threshold or g < threshold or b < threshold:
                found = True
                left = min(left, x)
                top = min(top, y)
                right = max(right, x)
                bottom = max(bottom, y)
    if not found:
        return crop
    return crop.crop(
        (
            max(0, left - pad),
            max(0, top - pad),
            min(cw, right + pad + 1),
            min(ch, bottom + pad + 1),
        )
    )


for name, box in crops.items():
    crop = trim_white(im.crop(box))
    if name == "belmonte":
        px = crop.load()
        cw, ch = crop.size
        for y in range(min(24, ch)):
            for x in range(cw):
                r, g, b = px[x, y]
                if b > r + 12 and b > g + 8:
                    px[x, y] = (255, 255, 255)
                elif y < 18 and (r + g + b) / 3 < 240 and not (g > r + 20 and g > b + 20):
                    px[x, y] = (255, 255, 255)
    canvas = Image.new("RGB", (crop.width + 20, crop.height + 20), (255, 255, 255))
    canvas.paste(crop, (10, 10))
    canvas.save(OUT / f"{name}.png", optimize=True)
    print(f"{name}: {canvas.size}")
