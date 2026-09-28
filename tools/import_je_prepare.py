#!/usr/bin/env python3
"""Import the Je prépare annals PDF as a page-addressable PrepMe module."""

import html
import json
from pathlib import Path

from pypdf import PdfReader

BASE = Path(__file__).resolve().parents[1]
SOURCE = BASE.parent / "je-prepare-.elkh_.pdf"
OUTPUT = BASE / "data" / "doc32.js"


def clean_text(value: str) -> str:
    value = (value or "").replace("\ufffd", " ")
    return " ".join(value.split())


def page_lesson(page_number: int, text: str) -> str:
    safe = html.escape(text, quote=False)
    return (
        f"<h3>📄 Page {page_number} du document source</h3>"
        f"<p>{safe or 'Page sans texte extractible : consulter le PDF source.'}</p>"
    )


reader = PdfReader(str(SOURCE))
units = []
for page_number, page in enumerate(reader.pages, start=1):
    text = clean_text(page.extract_text())
    if not text:
        text = "Page sans texte extractible : consulter le PDF source."
    title = text[:90].rstrip(" .:-") or f"Page {page_number}"
    units.append(
        {
            "t": f"Page {page_number} — {title}",
            "ic": "📄",
            "pages": f"p.{page_number}",
            "lesson": page_lesson(page_number, text),
            "qs": [],
            "cards": [
                {
                    "f": f"Je prépare — page {page_number}",
                    "b": text[:700],
                }
            ],
        }
    )

module = {
    "id": 32,
    "code": "32",
    "title": "Je prépare — Annales des concours",
    "sub": "Recueil de préparation et QCM d’annales 2018-2019",
    "icon": "📝",
    "units": units,
}

payload = json.dumps(module, ensure_ascii=False, separators=(",", ":"))
OUTPUT.write_text(
    "/* Module 32 — Je prépare, annales des concours */\n"
    "(window.CNC_DATA=window.CNC_DATA||{docs:[]}).docs.push("
    + payload
    + ");\n",
    encoding="utf-8",
)
print(f"Imported {len(units)} pages into {OUTPUT}")
