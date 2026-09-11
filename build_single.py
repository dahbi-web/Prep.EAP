#!/usr/bin/env python3
"""
Construit CNC_ANASS_App_MOBILE.html : une version AUTONOME de l'application
(un seul fichier, tout est inclus : styles, données, moteur, icône).

Usage :  python3 build_single.py
Sortie : CNC_ANASS_App_MOBILE.html  (à copier sur le téléphone ou une clé USB)
"""
import base64
import pathlib
import re

BASE = pathlib.Path(__file__).parent
html = (BASE / "index.html").read_text(encoding="utf-8")

# 1) icône en data URI
icon_b64 = base64.b64encode((BASE / "icons" / "icon-192.png").read_bytes()).decode()
icon_uri = "data:image/png;base64," + icon_b64

# 2) CSS en ligne
css = (BASE / "app.css").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="app.css">', "<style>\n" + css + "\n</style>")

# 3) manifeste et icônes : remplacés par une icône embarquée
html = html.replace('<link rel="manifest" href="manifest.webmanifest">', "")
html = re.sub(r'<link rel="(icon|apple-touch-icon)" href="[^"]*">',
              lambda m: '<link rel="%s" href="%s">' % (m.group(1), icon_uri), html)

# 4) scripts en ligne (données + moteur)
def inline(match):
    src = match.group(1)
    code = (BASE / src).read_text(encoding="utf-8")
    return "<script>\n" + code + "\n</script>"

html = re.sub(r'<script src="([^"]+)"></script>', inline, html)

# 5) pas de service worker en mode fichier unique
html = html.replace("navigator.serviceWorker.register('sw.js')",
                    "Promise.resolve()")

out = BASE / "CNC_ANASS_App_MOBILE.html"
out.write_text(html, encoding="utf-8")
print("OK ->", out, round(out.stat().st_size / 1024), "Ko")
