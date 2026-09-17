# Concours de santé — application de révision (v2.7)

Application type **Duolingo** pour préparer le concours : leçons courtes, QCM avec explications,
flashcards, **cœurs**, **objectif quotidien**, **série (streak)**, **couronnes**, **révision espacée**
et **examens blancs chronométrés**. Tout fonctionne **hors ligne**, sans compte et sans internet.

## Contenu de cette version

| Module | Unités | QCM | Cartes |
|---|---|---|---|
| 01. SNS Maroc | 12 | 99 | 66 |
| 02. Règlement intérieur des hôpitaux | 13 | 108 | 41 |
| 03. Loi 08-22 — GST | 8 | 61 | 29 |
| 04. Économie de la santé | 7 | 50 | 19 |
| 05. Indicateurs de la santé | 6 | 46 | 27 |
| 06. Loi-cadre 06-22 | 9 | 70 | 41 |
| 07. Épidémiologie | 10 | 79 | 39 |
| 08. Loi 43-13 — Professions infirmières | 10 | 72 | 32 |
| 16. Couverture Médicale de Base | 11 | 93 | 43 |
| 26. Plan Santé 2025 | 11 | 95 | 39 |
| 31. CS · SROS · CSN · CSR | 6 | 47 | 21 |
| **Total** | **103** | **820** | **397** |

Les 20 autres documents seront ajoutés ensuite : ils viendront s'ajouter dans le dossier `data/`
**sans effacer ta progression**.

---

## 1) Sur le PC — le plus simple

Double-clique sur **`CNC_ANASS_App_MOBILE.html`** : l'app s'ouvre dans le navigateur, c'est tout.
(Ce fichier unique contient tout : styles, données, moteur.)

## 2) Sur le PC — version installable (recommandée)

Pour l'installer comme une vraie application (icône, fenêtre sans barre d'adresse, hors ligne) :

1. Ouvre un terminal dans ce dossier et lance un petit serveur local :
   - `python -m http.server 8080`
2. Va sur **http://localhost:8080** dans Chrome ou Edge.
3. Clique sur l'icône **« Installer »** dans la barre d'adresse (ou menu ⋮ → *Installer l'application*).

## 3) Sur le téléphone (Android / iPhone)

**Méthode A — transfert du fichier unique**

1. Copie **`CNC_ANASS_App_MOBILE.html`** sur le téléphone (câble USB, WhatsApp « note à moi-même »,
   Google Drive, Bluetooth…).
2. Ouvre-le avec **Chrome** (Android) ou **Safari** (iPhone).
3. Menu **⋮ / Partager → Ajouter à l'écran d'accueil** : tu obtiens une icône comme une vraie app.

**Méthode B — via le PC (même Wi-Fi), pour avoir la vraie installation PWA**

1. Sur le PC, dans ce dossier : `python -m http.server 8080`
2. Trouve l'adresse IP du PC (`ipconfig` sous Windows, ligne « IPv4 »), par exemple `192.168.1.20`.
3. Sur le téléphone, ouvre `http://192.168.1.20:8080` puis **Ajouter à l'écran d'accueil**.
   L'app est alors mise en cache : elle marche ensuite **sans Wi-Fi**.

> APK Android : possible dans un second temps (empaquetage Capacitor). La PWA installée se comporte
> déjà comme une application (icône, plein écran, hors ligne) sans passer par un fichier .apk.

---

## Comment ça marche

- **Leçon → quiz** : chaque unité commence par une mini-leçon (chiffres clés, mnémos, pièges),
  puis un QCM. Chaque réponse fausse coûte **un cœur** (5 max, +1 toutes les 25 min).
- **Flashcards par unité** : chaque unité a son bouton 🃏 dans la liste du module, et la page de
  leçon propose « Cartes de cette unité » (recto-verso, notation Raté / Dur / Bien / Facile qui
  alimente la révision espacée). Une unité qui a peu de cartes est complétée par ses propres QCM,
  pour au moins 8 cartes par séance. Le bouton « Cartes du module » reste disponible.
- **Couronnes** : 1 couronne par passage réussi à ≥ 80 %, jusqu'à 5 par unité. La progression d'un
  module est le pourcentage de couronnes obtenues.
- **Révision (onglet 🔁)** : répétition espacée à **paliers 0-5** (1 · 3 · 7 · 16 · 35 · 90 jours).
  Une erreur **descend de 2 paliers** et repasse le jour même — jamais de remise à zéro.
  La séance n'est pas tirée au hasard : d'abord les **têtues** (ratées ≥ 3 fois), puis les erreurs,
  puis le reste du dû, et **35 % de questions jamais vues** prises dans tes unités les plus faibles
  tant que la banque n'est pas couverte à 60 %. Une session **ne coûte pas de cœur** et en **redonne un**.
- **Examen blanc (onglet 📝)** : 20 / 40 / 60 questions, chronomètre 45 s par question, correction
  détaillée de chaque erreur et historique des tentatives.
- **Stats** : XP des 7 derniers jours, taux de réussite, **points faibles** classés, items à réviser.
- **Plan personnalisé** : date du concours modifiable dans Réglages, compte à rebours et rythme quotidien recalculés automatiquement.
- **Niveau de préparation** : score sur 100 fondé sur la maîtrise, la couverture de la banque, la réussite et les révisions à jour.
- **Priorités du jour** : accès direct aux trois étapes utiles — consolider, apprendre, se tester.
- **Séance express** : 10 questions ciblées sur les révisions dues, les erreurs et les notions jamais vues pour réviser même avec peu de temps.
- **Rythme hebdomadaire** : suivi des 7 derniers jours et cible XP adaptée à l’objectif quotidien.
- **Modules à prioriser** : classement automatique des modules selon le taux de réussite aux QCM.
- **Examen ciblé** : chaque module propose un examen blanc limité à son contenu.
- **Mise en forme des leçons** : les leçons reprennent la charte de `Doc1_SNS_Maroc_p1-14.html` — 💡 **définition** en jaune, 📅 **date** en bleu, 🔢 **chiffre clé** en vert, ⚖️ **loi / article** en rose, avec la légende en haut de chaque leçon ; **une émoji thématique sur chaque titre et chaque item de liste**, les énumérations en pastilles 1️⃣2️⃣3️⃣, les définitions en bloc citation et les pièges en encadré orange. Désactivable dans Réglages.
- **Réglages** : objectif quotidien, thème clair/sombre/auto, sons, **cœurs illimités**, **surlignage des leçons**,
  **export / import** de la progression (pour passer du PC au téléphone).

**Raccourcis clavier (PC)** : `1` à `6` pour répondre, `Entrée` pour continuer, `Espace` pour
retourner une carte.

---

## Fichiers

```
index.html                    page de l'application (version dossier / PWA)
app.css                       styles (thème clair et sombre)
app.js                        moteur : navigation, quiz, cœurs, SRS, examen, stats
manifest.webmanifest, sw.js   installation PWA + fonctionnement hors ligne
icons/                        icônes de l'application
data/doc01.js … doc31.js      contenu : un fichier par module
build_single.py               reconstruit CNC_ANASS_App_MOBILE.html après une modification
MES_PREFERENCES.md            ⭐ comment je veux les choses (à relire avant toute modification)
version.json                  numéro de version (à régénérer après tout ajout de contenu)
CNC_ANASS_App_MOBILE.html     ⭐ version autonome en un seul fichier (PC + téléphone)
```

Pour ajouter un module plus tard : déposer `data/docXX.js` dans `data/`, ajouter la ligne
`<script src="data/docXX.js"></script>` dans `index.html`, puis relancer `python build_single.py`.

La progression est enregistrée dans le navigateur (localStorage) : elle reste sur l'appareil.
Utilise **Réglages → Exporter** pour la transférer d'un appareil à l'autre.
