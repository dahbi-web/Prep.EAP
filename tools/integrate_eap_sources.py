#!/usr/bin/env python3
"""Intègre les PDF EAP téléchargés dans PrepMe sans fabriquer de corrigé.

Chaque page devient une unité de lecture source. Les QCM restent dans le texte
de la page et ne sont pas transformés en questions corrigées automatiquement.
"""
from __future__ import annotations

import html
import json
import re
import shutil
from pathlib import Path

from pypdf import PdfReader

BASE = Path(__file__).resolve().parents[2]
APP = BASE / "CNC_ANASS_App"
DATA = APP / "data"
COURSE_PDFS = APP / "cours-pdf"
SOURCES = BASE / "EAP_ressources_internet"

DOCUMENTS = [
    (33, "ISPITS/concours-ide-11-1.pdf", "Concours IDE — échelle 11", "Concours IDE échelle 11 — source PDF téléchargée"),
    (34, "ISPITS/je-prepare-banques-questions.pdf", "Je préparer — banque de questions", "Banque de questions santé publique — lecture source, corrigé non validé"),
    (35, "ISPITS/preparation-au-concours.pdf", "Préparation au concours", "Préparation au concours infirmier — lecture source"),
    (36, "ISPITS/qcm-17-et-ensp-corrig-elkh.pdf", "QCM 2017 et ENSP", "QCM 2017 / ENSP — correction conservée comme source à vérifier"),
    (37, "ISPITS/qcm-17-et-master-corrig-elkh.pdf", "QCM 2017 et Master ISPITS", "QCM 2017 / Master — correction conservée comme source à vérifier"),
    (38, "ISPITS/qcm-2016-corrige-elkh.pdf", "QCM 2016 corrigé", "QCM 2016 — correction conservée comme source à vérifier"),
    (39, "ISPITS/qcm-3-2017-corrig-ELKH.pdf", "QCM 3 — 2017 corrigé", "QCM 3 de 2017 — correction conservée comme source à vérifier"),
    (40, "ISPITS/qcm-4.pdf", "QCM 4", "QCM 4 — document téléchargé, corrigé à vérifier"),
    (41, "ISPITS/qcm-commun-corrige-sns.pdf", "QCM commun — SNS", "QCM commun SNS — correction conservée comme source à vérifier"),
    (42, "ISPITS/qcm-us-corrige.pdf", "QCM US corrigé", "QCM US — correction conservée comme source à vérifier"),
    (43, "Officiel/decret-2-93-308.pdf", "Décret 2-93-308", "Texte officiel téléchargé — décret"),
    (44, "Officiel/EXA-CON2.pdf", "Examen d’aptitude professionnelle", "Document officiel téléchargé — examen d’aptitude professionnelle"),
    (45, "Officiel/STATUINF.pdf", "Statut des infirmiers", "Document officiel téléchargé — statut"),
]


def clean_text(value: str) -> str:
    value = value.replace("\x00", "")
    value = re.sub(r"[\x01-\x08\x0b\x0c\x0e-\x1f\x7f]", " ", value)
    value = re.sub(r"[ \t]+", " ", value)
    value = re.sub(r"\n{3,}", "\n\n", value)
    return value.strip()


def page_html(page_no: int, text: str) -> str:
    safe = html.escape(text, quote=False).replace("\r\n", "\n").replace("\n", "<br>")
    if not safe:
        safe = "Page sans texte extractible : consulter le PDF source."
    return f"<h3>📄 Page {page_no} du document source</h3><p>{safe}</p>"


def first_line(text: str, page_no: int) -> str:
    compact = re.sub(r"\s+", " ", text).strip()
    if not compact:
        return f"Page {page_no} — texte non extractible"
    return compact[:140] + ("…" if len(compact) > 140 else "")


def module_for(doc_id: int, source_rel: str, title: str, subtitle: str, pdf_name: str) -> dict:
    reader = PdfReader(str(SOURCES / source_rel))
    units = []
    for page_no, page in enumerate(reader.pages, 1):
        text = clean_text(page.extract_text() or "")
        units.append({
            "t": first_line(text, page_no),
            "ic": "📄",
            "pages": f"p.{page_no}",
            "lesson": page_html(page_no, text),
            "qs": [],
            "cards": [],
        })
    return {
        "id": doc_id,
        "code": f"{doc_id:02d}",
        "title": title,
        "sub": subtitle,
        "icon": "📚",
        "sourceFile": pdf_name,
        "units": units,
    }


def write_module(doc: dict) -> None:
    target = DATA / f"doc{doc['id']:02d}.js"
    payload = json.dumps(doc, ensure_ascii=False, separators=(",", ":"))
    target.write_text(
        f"/* Module {doc['id']} — source PDF EAP intégré page par page; aucun corrigé automatique */\n"
        f"(window.CNC_DATA=window.CNC_DATA||{{docs:[]}}).docs.push({payload});\n",
        encoding="utf-8",
    )


def main() -> None:
    COURSE_PDFS.mkdir(exist_ok=True)
    generated = []
    for doc_id, source_rel, title, subtitle in DOCUMENTS:
        source = SOURCES / source_rel
        pdf_name = f"{doc_id:02d}- EAP - {source.name}"
        shutil.copy2(source, COURSE_PDFS / pdf_name)
        doc = module_for(doc_id, source_rel, title, subtitle, pdf_name)
        write_module(doc)
        generated.append((doc_id, pdf_name, len(doc["units"])))
    print(json.dumps({"generated": generated}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
