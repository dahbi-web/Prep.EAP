#!/usr/bin/env python3
"""Convertit les annales fournies en modules documentaires OCR, sans inventer de corrigé."""
from __future__ import annotations

import concurrent.futures
import html
import json
import re
import shutil
import subprocess
from pathlib import Path


APP = Path(__file__).resolve().parents[1]
WORKSPACE = APP.parent
SOURCE = WORKSPACE / "CNC ANass-concours" / "CNC ANass"
TEMP = WORKSPACE / "tmp" / "pdfs" / "ocr"
POPPLER = Path(r"C:\Users\hp\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe")
TESSERACT = Path(r"C:\Program Files\Tesseract-OCR\tesseract.exe")


def clean_name(source: Path, module_id: int) -> str:
    stem = re.sub(r"^\d+\s*-\s*", "", source.stem).strip().replace("_", " ")
    stem = re.sub(r"\s+", " ", stem).strip()
    return f"{module_id:02d}- {stem}.pdf"


def display_title(source: Path) -> str:
    stem = re.sub(r"^\d+\s*-\s*", "", source.stem).strip().replace("_", " ")
    return re.sub(r"\s+", " ", stem).strip()


def clean_ocr(text: str) -> str:
    lines = []
    for raw in text.replace("\f", "\n").splitlines():
        line = re.sub(r"\s+", " ", raw).strip(" |\t")
        if not line or re.fullmatch(r"[-_=~.·—–\s]{3,}", line):
            continue
        if len(re.sub(r"[^A-Za-zÀ-ÿ0-9]", "", line)) < 2:
            continue
        lines.append(line)
    return "\n".join(lines)


def page_title(text: str, page: int) -> str:
    candidates = [line for line in text.splitlines() if len(line) >= 8]
    question = next((line for line in candidates if re.match(r"^(?:Q(?:uestion)?\s*)?\d{1,3}\s*[/.)-]", line, re.I)), None)
    selected = question or (candidates[0] if candidates else f"Page {page}")
    return f"Page {page} - {selected[:105]}"


def render_and_ocr(source: Path, module_id: int) -> dict:
    job = TEMP / f"doc{module_id:02d}"
    if job.exists():
        shutil.rmtree(job)
    job.mkdir(parents=True)
    prefix = job / "page"
    subprocess.run(
        [str(POPPLER), "-jpeg", "-jpegopt", "quality=82", "-r", "150", str(source), str(prefix)],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
    )
    images = sorted(job.glob("page-*.jpg"), key=lambda item: int(re.search(r"(\d+)$", item.stem).group(1)))
    units = []
    total_chars = 0
    for page, image in enumerate(images, 1):
        result = subprocess.run(
            [str(TESSERACT), str(image), "stdout", "-l", "fra+eng", "--psm", "11"],
            check=True,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        text = clean_ocr(result.stdout)
        total_chars += len(text)
        body = html.escape(text).replace("\n", "<br>") if text else "Page graphique ou texte non reconnu automatiquement. Consulte le PDF source pour la mise en page originale."
        lesson = (
            f"<h3>📄 Page {page} du sujet</h3><p>{body}</p>"
            "<aside class=\"source-note\"><b>Source :</b> transcription OCR du PDF fourni. "
            "Le sujet ne contient pas de corrigé vérifié dans cette intégration ; aucune réponse automatique n’est attribuée.</aside>"
        )
        units.append({
            "t": page_title(text, page),
            "ic": "📄",
            "pages": f"p.{page}",
            "lesson": lesson,
            "qs": [],
            "cards": [],
        })
    destination_name = clean_name(source, module_id)
    shutil.copy2(source, APP / "cours-pdf" / destination_name)
    document = {
        "id": module_id,
        "code": str(module_id),
        "title": display_title(source),
        "sub": "Annale de concours - transcription page par page; corrigé automatique non fourni",
        "icon": "📝",
        "sourceFile": destination_name,
        "units": units,
    }
    target = APP / "data" / f"doc{module_id:02d}.js"
    target.write_text(
        "/* Module documentaire généré depuis l’annale fournie; réponses non certifiées. */\n"
        + "(window.CNC_DATA=window.CNC_DATA||{docs:[]}).docs.push("
        + json.dumps(document, ensure_ascii=False, separators=(",", ":"))
        + ");\n",
        encoding="utf-8",
    )
    shutil.rmtree(job)
    return {
        "id": module_id,
        "source": source.name,
        "title": document["title"],
        "courseFile": destination_name,
        "pages": len(units),
        "ocrChars": total_chars,
        "dataFile": target.name,
    }


def main() -> None:
    if not POPPLER.exists() or not TESSERACT.exists():
        raise SystemExit("Poppler ou Tesseract est introuvable.")
    TEMP.mkdir(parents=True, exist_ok=True)
    sources = sorted(SOURCE.glob("*.pdf"))
    jobs = [(source, 46 + index) for index, source in enumerate(sources)]
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(render_and_ocr, source, module_id): source for source, module_id in jobs}
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            results.append(result)
            print(f"{result['id']}: {result['source']} - {result['pages']} pages, {result['ocrChars']} caractères", flush=True)
    results.sort(key=lambda item: item["id"])
    manifest = APP / "data" / "concours-courses.json"
    manifest.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"modules": len(results), "pages": sum(item["pages"] for item in results), "ocrChars": sum(item["ocrChars"] for item in results)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
