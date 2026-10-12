#!/usr/bin/env python3
"""
Construit CNC_ANASS_App_MOBILE.html : une entrée mobile légère de l'application.
Les styles, données, moteur et icônes sont inclus ; les documents volumineux
restent dans cours-pdf/ et concours-commun/ pour être chargés à la demande.

Usage :  python3 build_single.py
Sortie : CNC_ANASS_App_MOBILE.html  (à copier sur le téléphone ou une clé USB)
"""
import base64
import json
import pathlib
import re

BASE = pathlib.Path(__file__).parent
html = (BASE / "index.html").read_text(encoding="utf-8")

# 1) icône en data URI
icon_b64 = base64.b64encode((BASE / "icons" / "icon-192.png").read_bytes()).decode()
icon_uri = "data:image/png;base64," + icon_b64
job_alert_b64 = base64.b64encode((BASE / "assets" / "recrutement-huism6.jpg").read_bytes()).decode()
job_alert_uri = "data:image/jpeg;base64," + job_alert_b64

# 2) CSS en ligne
css = (BASE / "app.css").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="app.css">', "<style>\n" + css + "\n</style>")

# 3) manifeste et icônes : remplacés par une icône embarquée
html = html.replace('<link rel="manifest" href="manifest.webmanifest">', "")
html = re.sub(r'<link rel="(icon|apple-touch-icon)" href="[^"]*"[^>]*>',
              lambda m: '<link rel="%s" href="%s">' % (m.group(1), icon_uri), html)

# 4) scripts en ligne (données + moteur)
def inline(match):
    src = match.group(1)
    code = (BASE / src).read_text(encoding="utf-8")
    embedded = ""
    if src == "app.js":
        code = code.replace("assets/prep-eap-accueil.jpg", "data:image/jpeg;base64," + base64.b64encode((BASE / "assets" / "prep-eap-accueil.jpg").read_bytes()).decode())
        code = code.replace("assets/recrutement-huism6.jpg", job_alert_uri)
        code = code.replace("if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0)", 'if (false)')
    return embedded, re.sub(r'</script', lambda _: '<\\/script', code, flags=re.I)

# 5) pas de service worker en mode fichier unique
html = html.replace("navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' })",
                    "Promise.resolve()")

out = BASE / "CNC_ANASS_App_MOBILE.html"
tmp_out = BASE / "CNC_ANASS_App_MOBILE.html.tmp"
script_pattern = re.compile(r'<script src="([^"]+)"></script>')
with tmp_out.open("w", encoding="utf-8") as stream:
    cursor = 0
    for match in script_pattern.finditer(html):
        stream.write(html[cursor:match.start()])
        embedded, code = inline(match)
        stream.write(embedded)
        stream.write("<script>\n")
        stream.write(code)
        stream.write("\n</script>")
        cursor = match.end()
    stream.write(html[cursor:])
tmp_out.replace(out)
print("OK ->", out, round(out.stat().st_size / 1024), "Ko")
