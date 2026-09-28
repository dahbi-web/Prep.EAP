#!/usr/bin/env python3
"""Construit le catalogue de la section Concours à partir des PDF locaux."""
from __future__ import annotations

import json
import hashlib
import re
import unicodedata
from pathlib import Path

BASE = Path(__file__).resolve().parents[2]
APP = BASE / "CNC_ANASS_App"
CONCOURS_DIR = APP / "concours-commun"
COURSE_DIR = APP / "cours-pdf"
CATEGORY_ORDER = [
    "EAP / échelle 11",
    "Textes officiels EAP",
    "Concours commun / national",
    "CHU",
    "Concours régionaux",
    "Recrutement / spécialité",
    "QCM / bases",
    "Autres documents",
]

LOCAL_METADATA = {
    "CNC-Fes-Commun-2025.pdf": {
        "title": "26 - CNC Fès - Commun 2025",
        "note": "Sujet commun de recrutement de la région Fès-Meknès — session 2025",
        "source": "PDF local fourni par l’utilisateur",
        "correction": False,
    },
    "18- CNC TTH - Commun 2024.pdf": {
        "title": "18 - CNC TTH - Commun 2024",
        "note": "Sujet commun TTH — session 2024",
        "source": "PDF local fourni par l’utilisateur",
        "correction": False,
    },
    "Concours recrutement TTH 2023.pdf": {
        "title": "Concours recrutement TTH 2023",
        "note": "Sujet de recrutement TTH — session 2023, version source non corrigée",
        "source": "PDF local fourni par l’utilisateur",
        "correction": False,
    },
    "SNS-QCM-corrig-1-1.pdf": {
        "title": "Questions sur le système de santé marocain",
        "note": "Banque de questions corrigées sur le système national de santé marocain",
        "source": "PDF local fourni par l’utilisateur",
        "correction": True,
    },
    "QCM_SNS_Maroc_pages_20_40.pdf": {
        "title": "QCM du système national de santé marocain — pages 20 à 40",
        "note": "Extrait de préparation consacré au système national de santé marocain",
        "source": "PDF local fourni par l’utilisateur",
        "correction": False,
    },
    "Concours Techniciens de sante Tanger 2024 - 2e epreuve corrige annote.pdf": {
        "title": "Techniciens de santé - Tanger 2024 - 2e épreuve",
        "note": "Session du 22 septembre 2024 - 40 QCM avec réponses annotées sur le sujet",
        "source": "7 photographies du sujet fournies par l’utilisateur, assemblées en PDF",
        "correction": True,
    },
    "ilide.info-1er-epreuve-eap-cadre-infirmier-2023-pr_595e1d2e129f5e3d696b7c507cfb7b15.pdf": {
        "title": "EAP 2023 - 1re épreuve cadre infirmier",
        "note": "Session du 31 décembre 2023 - 1re épreuve - 30 QCM sans corrigé fourni",
        "source": "PDF local fourni par l’utilisateur (ilide.info)",
        "correction": False,
    },
}

LEGACY_VIEWERS = [
    "08- CNC Marrakech - Commun 2024-1.pdf",
    "15- CNC Marrakech - Commun 2025-2.pdf",
    "Chu Marrakech.pdf",
    "CNC Beni Mellal Khénifra 2023 Avec Justification.pdf",
    "CNC Guelmim 2023 Avec Justification.pdf",
    "cnc rect Marrakech 2025-1.pdf",
    "CNC Tanger 2023 - preuve 1 Avec Justification.pdf",
    "commun marrakech 2024.pdf",
    "Concours CHU MARRAKECH 2020.pdf",
    "Concours CHU SM 2024 Avec Justification.pdf",
    "Concours Commun 03 Mars 2019 Avec Justification.pdf",
    "Concours Commun National 10 Juin 2018 Avec Justification.pdf",
    "Concours commun souss massa 2024.pdf",
    "Concours ISFSC Région  Marrakech 2024 Avec Justification.docx-1.pdf",
    "Concours National 26 Juin 2026 Avec Justification.pdf",
    "Concours Région Fès Meknes Avec Justification.pdf",
    "correction commun marrakech.pdf",
    "Etat Marrakech commun 2024VF.pdf",
    "QCM_marrakech_2024_logo_arriere_plan_plus_clair-1.pdf",
    "Recueil des Epreuves du Concours ITS 2021-2025.pdf",
    "draa 2024.pdf",
    "Concours de draa Tafilalet octobre 2021.pdf",
    "DRAA 2025.pdf",
    "CamScanner 22-06-2026 20.39.pdf",
    "beni mellal 2025 commun .pdf",
    "commun CHU Oujda 2023.pdf",
    "CHU Oujda.pdf",
    "cnc recrt laayoune 2025.pdf",
    "etat laayoun 2024 commun.pdf",
    "cncr agadir 2024.pdf",
    "commun état Tanger 2025.pdf",
    "état tanger.pdf",
]


def norm(text: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", text.lower()) if unicodedata.category(c) != "Mn")


def category(name: str) -> tuple[str, str]:
    n = norm(name)
    if "statut" in n or "statuinf" in n or "decret" in n or "exa-con" in n:
        return "Textes officiels EAP", "Texte officiel à consulter"
    if re.search(r"\beap\b", n) or "echelle" in n or "concours-ide" in n:
        return "EAP / échelle 11", "Préparation EAP ou échelle 11"
    if "qcm" in n or "loi" in n or "carte sanitaire" in n or "economie" in n or "sns_" in n:
        return "QCM / bases", "QCM ou support de santé publique"
    if "chu" in n:
        return "CHU", "Sujet d’un centre hospitalier universitaire"
    if "special" in n or "tth" in n or "recrut" in n:
        return "Recrutement / spécialité", "Sujet de recrutement ou de spécialité"
    if any(x in n for x in ("marrakech", "draa", "tanger", "laayoune", "dakhla", "agadir", "fes", "goulmim", "beni", "souss", "rabat", "casa", "oujda")):
        return "Concours régionaux", "Sujet régional ou local"
    if "commun" in n or "national" in n or "etat" in n or "cnc" in n or "concours" in n:
        return "Concours commun / national", "Sujet commun, national ou d’État"
    return "Autres documents", "Document de concours à classer"


def years(name: str) -> list[int]:
    return sorted({int(x) for x in re.findall(r"20\d{2}", name)})


def title(name: str) -> str:
    stem = Path(name).stem.replace("_", " ").replace("^F", "–")
    stem = re.sub(r"\s+", " ", stem).strip()
    return stem


def entry(folder: str, name: str, viewer: str | None = None, source: str = "PDF local", module: int | None = None) -> dict:
    cat, note = category(name)
    n = norm(name)
    metadata = LOCAL_METADATA.get(name, {})
    correction = metadata.get("correction", bool(re.search(r"corrig|justification|correction|(?<!e)preuve", n)))
    return {
        "folder": folder,
        "file": name,
        "format": Path(name).suffix.lower().lstrip(".").upper() or "FICHIER",
        "title": metadata.get("title", title(name)),
        "category": cat,
        "note": metadata.get("note", note),
        "years": years(name),
        "correction": correction,
        "official": cat == "Textes officiels EAP",
        "viewer": viewer,
        "source": metadata.get("source", source),
        "module": module,
    }


def main() -> None:
    docs = []
    hashes = set()

    def append_unique(document: dict) -> None:
        file_path = APP / document["folder"] / document["file"]
        digest = hashlib.sha256(file_path.read_bytes()).hexdigest()
        if digest in hashes:
            return
        hashes.add(digest)
        docs.append(document)

    concours_files = list(CONCOURS_DIR.glob("*.pdf")) + list(CONCOURS_DIR.glob("*.pptx")) + list(CONCOURS_DIR.glob("*.ppt"))
    concours_files.sort(key=lambda p: (bool(re.search(r"_1\.[^.]+$", p.name, re.I)), norm(p.name)))
    for path in concours_files:
        viewer = None
        for i, old in enumerate(LEGACY_VIEWERS, 1):
            if norm(old) == norm(path.name):
                viewer = f"sujet-{i:02d}.html"
                break
        source = "PPTX ISPITS local" if path.suffix.lower() in (".pptx", ".ppt") else "PDF local"
        append_unique(entry("concours-commun", path.name, viewer, source))
    course_files = sorted(COURSE_DIR.glob("*.pdf"), key=lambda p: (p.name.lower() == "43- eap - decret-2-93-308.pdf", norm(p.name)))
    for path in course_files:
        if re.match(r"^(32|33|35|36|37|38|39|40|41|42|43|44|45)- EAP", path.name):
            module_match = re.match(r"^(\d+)-", path.name)
            module = int(module_match.group(1)) if module_match else None
            append_unique(entry("cours-pdf", path.name, None, "PDF EAP intégré au cours", module))
    docs.sort(key=lambda d: (CATEGORY_ORDER.index(d["category"]), -(d["years"][-1] if d["years"] else 0), d["title"].lower()))
    target = APP / "data" / "concours-catalog.js"
    payload = json.dumps(docs, ensure_ascii=False, separators=(",", ":"))
    target.write_text("/* Catalogue généré depuis les PDF locaux — organisation sans validation automatique. */\nwindow.PREP_CONCOURS_DOCS=" + payload + ";\n", encoding="utf-8")
    print(json.dumps({"documents": len(docs), "categories": sorted({d["category"] for d in docs})}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
