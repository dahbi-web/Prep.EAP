# Refaire cette app avec un autre contenu

Deux façons de faire. La **A** (recommandée) réutilise le moteur déjà écrit et testé de
`CNC_ANASS_App/` — tu ne refais que les données. La **B** repart de zéro : à ne choisir que si
le nouveau sujet n'est pas un « cours + QCM + fiches ».

---

## A. Cloner le moteur (rapide, sûr)

Copie le bloc ci-dessous dans une nouvelle session Claude, avec **le dossier du nouveau contenu
connecté** et, si possible, le dossier `CNC_ANASS_App` pour qu'il puisse lire le moteur.

```text
J'ai une app d'apprentissage qui marche (dossier CNC_ANASS_App : index.html + app.css + app.js
+ data/doc01.js … doc31.js + manifest.webmanifest + sw.js + icons/ + build_single.py).
Je veux la MÊME app, même moteur, mais pour un autre contenu.

NOUVEAU SUJET : {SUJET — ex. : concours infirmier / droit du travail / anatomie}
LANGUE DE L'INTERFACE : {français / arabe RTL / les deux}
NOM DE L'APP : {NOM}
SOURCES : {dossier / PDF / pages HTML / ce que je t'ai donné}
EXAMEN VISÉ : {nombre de questions, durée, seuil de réussite}

Méthode, dans cet ordre, sans sauter d'étape :

0. INVENTAIRE d'abord. Extrais le texte des sources (pdftotext -layout, ou équivalent) et
   liste ce qu'elles contiennent réellement : combien de documents, combien de pages
   exploitables par document, ce qui est illisible (PDF scanné, tableau cassé), ce qui manque.
   Montre-moi ce tableau et attends mon accord AVANT d'écrire quoi que ce soit.

1. STRUCTURE. Propose le découpage : un document source = un MODULE (`data/docNN.js`),
   un module = 6 à 12 UNITÉS de 15 à 25 minutes. Chaque unité doit tenir en une mini-leçon
   lisible d'un écran ou deux. Montre-moi la liste des unités avant de rédiger.

2. DONNÉES. Génère un fichier par module, au format exact du moteur actuel :

   (window.CNC_DATA=window.CNC_DATA||{docs:[]}).docs.push({
   id:6, code:"06", title:"Titre court", sub:"Sous-titre", icon:"⚖️",
   units:[
     { t:"Titre de l'unité", ic:"🧾", pages:"p.4-7",
       lesson:`<h3>…</h3><p>…<b>chiffre clé</b>…</p>
               <div class="tip">mnémo</div><div class="warn">⚠️ piège</div>
               <table><tr><th>…</th><th>…</th></tr><tr><td>…</td><td>…</td></tr></table>`,
       qs:[ {q:`énoncé`, o:[`A`,`B`,`C`,`D`], c:1, e:`explication qui apprend quelque chose`} ],
       cards:[ {f:`recto : la question de mémoire`, b:`verso : la réponse complète`} ]
     }
   ]});

   Volume visé par unité : 7 à 10 QCM et 3 à 6 fiches. Le contenu est du HTML de confiance
   (les balises passent telles quelles) : n'utilise ni backtick ni ${ } dans les textes.

3. APP. Repars de index.html + app.css + app.js : garde le moteur (parcours par module,
   leçon → quiz, cœurs, objectif quotidien, série, couronnes, révision espacée, examen blanc,
   flashcards, statistiques, recherche, thème clair/sombre, export/import) et ne change que
   les libellés, la palette, l'icône et la liste des <script src="data/…"> dans index.html.

4. HORS-LIGNE ET INSTALLATION. Mets à jour la liste ASSETS de sw.js et le cache name
   (cnc-anass-vN → nom-vN, sinon le téléphone garde l'ancienne version), le manifest
   (name, short_name, theme_color) et les icônes 192/512/512-maskable.
   Puis lance `python3 build_single.py` : il produit le fichier unique autonome.
   Livrable : le dossier installable en PWA (recommandé) + le fichier unique pour le transfert.
   Pas d'APK : la PWA installée donne déjà l'icône, le plein écran et le hors-ligne.

5. VÉRIFICATION avant de me dire que c'est fini :
   - `node --check` (ou new Function) sur app.js et sur chaque data/docNN.js ;
   - un script qui recharge tous les fichiers de données et contrôle : index `c` dans les
     bornes de `o`, pas deux options identiques dans une même question, `e` non vide,
     pas de doublon d'énoncé entre modules, chaque unité a une leçon ;
   - une vraie séance jouée dans un navigateur headless (Playwright) : accueil → module →
     leçon → quiz → réponse juste ET fausse → fin de séance → révision → examen → thème
     sombre, avec zéro erreur console. Relire le code ne remplace pas ce test.

RÈGLES QUI NE SE DISCUTENT PAS (chacune vient d'un défaut déjà payé) :

- Sauvegarde `.bak_<date>` avant toute réécriture d'un fichier existant.
- Ne casse jamais la progression : la clé localStorage (`cnc_anass_v2`) et la forme de l'état
  restent compatibles ; ajouter un module = ajouter un fichier, jamais renuméroter les
  modules ni réordonner les questions d'une unité déjà publiée (les clés SRS sont
  `q<module>.<unité>.<index>` : réordonner déplace la mémoire de l'élève sur d'autres items).
- SRS : paliers 0-5, intervalles 1 · 3 · 7 · 16 · 35 · 90 jours. Une erreur DESCEND DE
  2 PALIERS (`Math.max(0, b-2)`) et repasse le jour même — JAMAIS de remise à zéro.
  Même mécanique pour les QCM et pour les fiches.
- Une séance de révision n'est pas un tirage au hasard : têtues (ratées ≥ 3 fois) → erreurs →
  autres items dus → du jamais-vu pris dans les unités les plus faibles, avec 30 à 40 % de la
  séance réservés au neuf tant que la banque n'est pas couverte à 60 %.
- Une explication qui reformule la bonne réponse n'apprend rien. Chaque `e` doit apporter
  l'un de ces trois éléments : le chiffre ou l'article exact de la source, la RÈGLE qui évite
  le par-cœur (« létalité = dénominateur les malades ; mortalité = la population »), ou le
  PIÈGE désamorcé (« 5 principes en 34-09, 8 en 06-22 »). C'est le critère de qualité
  principal du contenu : une explication circulaire est un défaut, pas un détail.
- Les distracteurs viennent des confusions réelles du sujet (l'autre loi, l'autre année,
  l'autre organisme), jamais d'options absurdes qui se devinent.
- Ce qui se compte va dans la leçon ET dans une fiche (listes de principes, dates, taux) ;
  ce qui se distingue va dans un QCM (A vs B, qui fait quoi, quel dénominateur).
- Rien d'inventé : tout sort des sources fournies. Si une unité n'a pas assez de matière,
  dis-le au lieu de combler avec tes connaissances générales.
- Vérifie les chiffres deux fois : dates de dahir, numéros de BO, taux, seuils, effectifs.
  Une erreur de chiffre dans une app de révision s'apprend par cœur.
- Texte mixte arabe/latin, si la langue l'exige : `unicode-bidi:plaintext` sur les énoncés,
  les options, les explications et les leçons, et `dir="rtl"` sur le conteneur.
- Après tout ajout de contenu : mettre à jour sw.js (liste ASSETS + nom du cache) et
  relancer build_single.py, sinon l'appareil garde l'ancienne version en cache.
```

---

## B. Repartir de zéro

Même prompt, mais remplace les points 3 et 4 par :

```text
3. Construis une application web mono-page, autonome et hors-ligne (HTML + CSS + JS, aucune
   dépendance réseau), avec : un parcours de modules et d'unités, une mini-leçon avant chaque
   quiz, un moteur de répétition espacée (paliers 0-5, l'erreur descend de 2 paliers), des
   cœurs (5, un toutes les 25 min, une révision en redonne un), un objectif XP quotidien, une
   série, des couronnes par unité, un mode examen chronométré avec correction détaillée, des
   flashcards, des statistiques (XP sur 7 jours, taux de réussite, unités les plus faibles),
   une recherche plein texte, un thème clair/sombre et un export/import de la progression.

4. Rends-la installable : manifest + service worker qui met tout le contenu en cache au
   premier lancement (PWA installable, recommandée — pas d'APK), plus un script qui produit
   une version en un seul fichier HTML pour le transfert par clé USB ou messagerie.
```

---

## Ce qu'il faut préparer avant de lancer la session

| À fournir | Pourquoi |
|---|---|
| Les cours rangés par document (PDF texte de préférence, pas scanné) | c'est la seule source autorisée des questions et des explications |
| Le sommaire ou la table des matières | il donne le découpage en unités sans avoir à le deviner |
| De vrais sujets d'examen, si le sujet en a | c'est ce qui fixe le format : nombre de questions, durée, seuil |
| Le format officiel de l'examen visé | il paramètre le mode examen blanc (ici : 20/40/60 QCM, 45 s par question) |
| Les images, si le sujet en dépend | schémas, symboles, radios : sans elles, pas de question de reconnaissance |

Sans cours exploitable, l'app se dégrade en quiz de par-cœur. C'est le défaut le plus coûteux
à rattraper : une explication qui répète la bonne réponse doit être réécrite question par
question, et il faut alors relire toute la banque.

**Vérifier qu'un PDF est exploitable avant de commencer :** `pdftotext -layout fichier.pdf -`
doit sortir du texte lisible. S'il ne sort presque rien, le PDF est une image : il faut
l'OCR (`ocrmypdf`) ou fournir une autre source.

## Charte de surlignage des leçons

Les leçons ne sont pas du texte brut : elles reprennent la charte des documents source.
Le moteur (`decorate()` / `markup()` dans `app.js`) applique le surlignage **à l'affichage**,
donc tout module ajouté plus tard en hérite sans retouche :

| Classe | Couleur | Ce qui est repéré |
|---|---|---|
| `.hl.def` | jaune `#fff3b0` | définition entre guillemets « … » (même à cheval sur des `<b>`) |
| `.hl.date` | bleu `#bbdefb` | 1952, mars 2011, 12/03/2011, 5 mai 2022 |
| `.hl.num` | vert `#c8e6c9` | 8 fonctions, 5 objectifs, 12 %, 3 millions de dirhams |
| `.hl.art` | rose `#f8bbd0` | loi 43-13, loi-cadre 06-22, décret n° 2-14-562, article 12 |

Le **gras** reste écrit à la main dans le texte de la leçon (`<b>`), le surlignage vient par-dessus.
Une légende (`legendHL()`) s'affiche en haut de chaque leçon, et un réglage
« Surlignage des leçons » permet de tout désactiver.

### Les émojis (aussi obligatoires que les couleurs)

Le document source ne se contente pas de surligner : il **balise tout par des émojis**.
Le moteur `emojify()` le reproduit automatiquement à l'affichage, donc tout module ajouté
plus tard en hérite :

- une **émoji thématique** au début de chaque `h3`/`h4` et de **chaque item de liste**
  (dictionnaire `EMO_MAP` : mot-clé → émoji ; ~90 % des items sont couverts, `🔹` sinon) ;
- les paragraphes découpés par `<br>` ou par « · » deviennent des **listes `ul.emo`**
  (l'émoji remplace la puce) ;
- les énumérations `1.` `2.` `3.` deviennent des **pastilles** 1️⃣ 2️⃣ 3️⃣ ;
- les citations « … » passent en **bloc `.quote`** (italique, filet à gauche) ;
- ⚠️ pièges et 🧠 mnémos passent en **encadré `.trap`** orange ;
- classes prêtes pour le contenu futur : `.timeline` (chronologie), `.fiche` + `table.fiche-tbl`.

Pour couvrir un nouveau domaine, il suffit d'ajouter des entrées à `EMO_MAP` — jamais de
retoucher les 100+ leçons une par une.
