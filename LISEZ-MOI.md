# PrepMe — version PWA 3.6.0

Préparation aux concours de santé : 76 modules, 1 459 QCM interactifs et 1 257 cartes. Les modules 32 à 76 sont des documents de consultation ; les modules 46 à 76 reprennent les 31 sources CNC sous forme de 388 pages transcrites et reliées au PDF original. Le catalogue Concours regroupe 95 PDF distincts et 1 PPTX.

## Ouvrir l’application

- Fichier autonome : ouvrir `CNC_ANASS_App_MOBILE.html`. Les documents et le lecteur PDF sont intégrés ; aucun dossier annexe n’est nécessaire. Le fichier complet pèse environ 357 Mio. Sur téléphone, privilégier la PWA, qui charge les documents séparément.
- Version PWA sur PC : lancer `node local-server.js` dans ce dossier puis ouvrir http://localhost:8080.
- Installation sur téléphone : utiliser une version publiée en HTTPS et l’option d’installation du navigateur. Laisser finir le téléchargement initial avant de passer hors ligne.

Un accès HTTP via l’adresse IP du PC ne suffit pas pour activer le service worker sur le téléphone. HTTPS ou localhost sont requis : [documentation MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

## Progression et mises à jour

La progression reste locale, sous la clé `cnc_anass_v2`, avec deux copies de secours. Exporter régulièrement une copie JSON depuis Réglages, notamment avant de changer de navigateur, de fichier ou d’adresse de site. L’import vérifie le format et demande confirmation avant remplacement. La réinitialisation conserve les copies de secours.

Après cette mise à jour : **Ctrl+F5** sur PC. Version 3.6.0, cache `cnc-anass-v100`. Le premier lancement configure maintenant le profil, la spécialité, la date du concours, le temps quotidien, le score cible, le week-end et les rappels avant de créer le programme. Les 31 sources CNC sont présentes dans la section Concours et dans Cours PDF, où chaque page est consultable comme unité de lecture avec retour au PDF original. Les sujets ne fournissant pas de corrigé vérifié restent sans notation automatique. La version en ligne doit être publiée séparément ; sa mise à jour n’est pas attestée par le paquet local.

## Contenu et limites

Les identifiants des modules, l’ordre des questions et les clés de révision sont conservés. La présence d’une source ou d’une explication ne certifie pas l’exactitude médicale ou juridique du contenu. Les 45 modules documentaires restent à enrichir et vérifier.

Google Analytics 4 est chargé uniquement sur `https://dahbi-web.github.io/Prep.EAP/`, après consentement. Le développement local et le fichier autonome n’envoient aucune donnée ; voir la page À propos et confidentialité. L’identifiant du flux se règle dans la balise `prepme-ga4-id` de `index.html`. Aucun compte étudiant ni synchronisation de progression entre appareils n’est actuellement implémenté.

## Reconstruire et contrôler

- `node build_single.js` : générer le fichier autonome complet avec les PDF et le lecteur hors ligne. `python build_single.py` appelle le même générateur Node.
- `node tools/test_reliability.cjs` : tests de sauvegarde, validation et cache.
- `node tools/test_auto_plan.cjs` : plan adaptatif, préférence QCM, réglages et recalcul après séance.
- `node tools/audit_concours.mjs` : catalogue et copies livrées.
- Depuis le dossier parent : `node audit-prepme.cjs` pour le bilan structurel complet.
- Depuis le dossier parent : `powershell -File CNC_ANASS_App/tools/package_pwa.ps1` pour créer le ZIP sans historique Git ni sauvegardes.

Phase actuelle : PWA. Aucun APK n’est généré par ces outils.
