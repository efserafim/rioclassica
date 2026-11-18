from pathlib import Path

path = Path(__file__).resolve().parents[1] / "index.html"
text = path.read_text(encoding="utf-8")

markers = [
    ("HERO", "<!-- HERO SECTION -->"),
    ("ABOUT", "<!-- QUEM SOMOS -->"),
    ("SERVICES", "<!-- O QUE PODEMOS CRIAR JUNTOS -->"),
    ("PROJECTS", "<!-- PROJETOS / PARCERIAS INSTITUCIONAIS -->"),
    ("FOUNDER", "<!-- QUEM ESTÁ À FRENTE -->"),
    ("PROCESS", "<!-- NOSSO PROCESSO -->"),
    ("PARTNERS", "<!-- APOIO / PARCEIROS -->"),
    ("SATURDAYS", "<!-- EXPERIÊNCIAS DE SÁBADO -->"),
    ("ROTEIROS", "<!-- ROTEIROS FIXOS / PRIVATIVOS -->"),
    ("GALLERY", "<!-- GALERIA DE FOTOS -->"),
    ("PLAYLIST", "<!-- TRILHA SONORA -->"),
    ("CONTACT", "<!-- CONTATO -->"),
    ("FOOTER", "<!-- FOOTER -->"),
]

positions = [(name, text.index(marker)) for name, marker in markers]
sections = {}
for i, (name, start) in enumerate(positions):
    end = positions[i + 1][1] if i + 1 < len(positions) else None
    sections[name] = text[start:end] if end else text[start:]

prefix = text[: positions[0][1]]
order = [
    "HERO",
    "ABOUT",
    "SATURDAYS",
    "ROTEIROS",
    "SERVICES",
    "PROJECTS",
    "FOUNDER",
    "PROCESS",
    "PARTNERS",
    "GALLERY",
    "PLAYLIST",
    "CONTACT",
    "FOOTER",
]
new_text = prefix + "".join(sections[name] for name in order)
path.write_text(new_text, encoding="utf-8")
print("reordered:", " -> ".join(order))
