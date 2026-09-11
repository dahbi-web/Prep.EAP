# Comment je veux les choses — CNC 26 ANASS

Fichier mémoire. À relire **avant** toute modification de l'application ou ajout de contenu.
Dernière mise à jour : 4 septembre 2026.

---

## 1. Le format de livraison

- **PWA installable — jamais d'APK.** L'application doit s'installer depuis le navigateur
  (icône sur l'écran d'accueil, plein écran, hors ligne). Aucun fichier `.apk`, aucun Capacitor,
  aucun store.
- Trois canaux, toujours les trois à la fois :
  1. `CNC_ANASS_App_MOBILE.html` — **fichier unique autonome** (PC + téléphone, double-clic) ;
  2. `CNC_ANASS_App.zip` + dossier `CNC_ANASS_App\` — version PWA (serveur local, installation) ;
  3. l'**artefact en ligne** — même app, accessible depuis n'importe quel appareil.
- **Deux copies à garder synchronisées sur le PC**, à chaque livraison, sans exception :
  - `C:\Users\hp\Downloads\CNC_ANASS_App_MOBILE.html` ← *c'est celle que j'ouvre* ;
  - `C:\Users\hp\Downloads\CNC 26 ANASS-20260729T200151Z-1-001\CNC_ANASS_App_MOBILE.html`.
- Après tout ajout : **régénérer `version.json` et incrémenter le cache du service worker**
  (`cnc-anass-vN`), sinon le téléphone ne verra jamais la mise à jour.
- Me rappeler **Ctrl+F5** au premier chargement après une mise à jour.

---

## 2. La mise en forme des leçons — charte de `Doc1_SNS_Maroc_p1-14.html`

C'est **la** référence visuelle. Une leçon doit ressembler à ce document, pas à du texte brut.

### Les couleurs (surlignage fluo)

| Ce qui est repéré | Couleur | Exemples |
|---|---|---|
| 💡 **définition** (citation entre « … ») | jaune `#fff3b0` | « L'art et la science de prévenir les maladies… » |
| 📅 **date** | bleu `#bbdefb`, gras | 1952 · 2011 · mars 2011 · 12/03/2011 |
| 🔢 **chiffre clé** | vert `#c8e6c9`, gras | 8 fonctions · 5 objectifs · 12 % · 3 millions de dirhams |
| ⚖️ **loi / article** | rose `#f8bbd0`, gras | loi 43-13 · loi-cadre 06-22 · décret n° 2-14-562 · article 20 |

Une **légende** rappelle ce code en haut de chaque leçon.

### Les émojis — obligatoires, jamais décoratives au hasard

- **Chaque titre** (`h3`, `h4`) commence par une émoji qui dit le thème : 🏥 hôpital · ⚖️ loi ·
  💰 financement · 🗺️ carte sanitaire · 🛡️ prévention · 🎯 objectifs · 📊 indicateurs · 🌍 OMS…
- **Chaque item de liste** commence par une émoji thématique (style `ul.emo` du document :
  pas de puce ronde, l'émoji **est** la puce), suivie du **terme en gras**, puis d'un tiret
  et de l'explication.
- **Les énumérations sont numérotées en pastilles** : 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣.
- **Les définitions** passent en bloc citation (`.quote`, italique, filet à gauche) avec le
  surlignage jaune à l'intérieur.
- **Les pièges et les mnémos** vont dans un encadré orange (`.trap`) : ⚠️ *Piège classique :* …
  et 🧠 *Moyen mnémo :* …
- Blocs disponibles pour le contenu futur : `.timeline` (chronologie année par année),
  `.fiche` + `table.fiche-tbl` (fiche de révision verte en fin de chapitre).
- Tout cela est **automatique** (moteur `emojify()` + `decorate()` dans `app.js`) : les modules
  ajoutés plus tard héritent de la charte sans retouche. Réglage « Mise en forme des leçons »
  pour tout désactiver.

---

## 3. Le contenu

- **Tout sort de mes PDF.** Aucune question, aucun chiffre, aucune date issus de connaissances
  générales. Si une unité n'a pas assez de matière dans la source, on le dit — on n'invente pas.
- **Une liste annoncée est une liste écrite.** Interdit d'écrire « 8 fonctions (4 essentielles
  + 4 d'appui) » sans énumérer les huit. Si un nombre est cité, les éléments suivent.
- **Une explication qui reformule la bonne réponse n'apprend rien.** L'explication doit dire
  *pourquoi* c'est cette réponse, et signaler le distracteur piège quand il y en a un.
- Les pièges classiques du concours (5 principes de la 34-09 vs 8 principes de la 06-22,
  10 ans de la carte sanitaire vs 5 ans du SROS…) doivent être signalés explicitement.
- Rythme : **module par module, jour par jour**. Mieux vaut 4 modules complets et vérifiés
  que 31 modules bâclés.

---

## 4. Ce qu'on ne casse jamais

- **Ma progression est sacrée.** Même clé `localStorage` (`cnc_anass_v2`), jamais de reset.
- **Jamais renuméroter** les modules ni **réordonner** les questions : les clés de révision
  espacée sont `q<module>.<unité>.<index>`. Les nouvelles questions **s'ajoutent à la fin**.
- **Sauvegarde `.bak_<date>`** avant toute réécriture d'un fichier existant.
- **SRS** : une erreur descend de **2 boîtes** (`Math.max(0, b-2)`), **jamais** de remise à zéro.
  Paliers 1 · 3 · 7 · 16 · 35 · 90 jours.
- **Une séance de révision n'est pas un tirage au hasard** : d'abord les têtues (ratées ≥ 3 fois),
  puis les erreurs, puis le reste du dû, et **30 à 40 % de jamais-vu** tant que la banque n'est
  pas couverte à 60 %.
- **Export / import** toujours disponibles ; progression écrite en 3 endroits.
- Texte mixte arabe/latin : `unicode-bidi:plaintext`.
- Vanilla HTML/CSS/JS, aucune dépendance, tout doit marcher **hors ligne**.

---

## 5. Les mécaniques de l'app (à conserver)

❤️ cœurs et objectif quotidien · 👑 couronnes par unité · 🔥 série · 🔁 révision espacée renforcée ·
📝 examen blanc chronométré · 🔊 sons · ✨ animations · 🌙 thème sombre · 📊 stats et points faibles ·
🔍 recherche · 🃏 flashcards **par unité** (bouton sur chaque unité et sur la page de leçon,
en-tête = émoji + titre de l'unité, complément automatique depuis les QCM de l'unité si elle a
moins de 8 cartes) **et** par module.

---

## 6. Comment me répondre

- En **français**, concis, pas de recap inutile.
- Dire **où** sont les fichiers et **ce qui a changé**, pas de pavé explicatif.
- Quand une étape est impossible (PC hors ligne, outil manquant) : le dire tout de suite,
  proposer la suite, ne pas boucler.
