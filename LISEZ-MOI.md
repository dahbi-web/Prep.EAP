# PrepMe — version PWA 3.5.53

Préparation aux concours de santé : 45 modules, 1 459 QCM interactifs et 1 257 cartes. Les modules 32 à 45 sont des documents de consultation sans QCM interactifs ; le module 32 comporte des cartes. Le catalogue Concours regroupe 74 PDF et 1 PPTX.

## Ouvrir l’application

- Fichier autonome, fourni séparément du ZIP PWA : ouvrir CNC_ANASS_App_MOBILE.html. Il contient les documents et le lecteur PDF ; sa taille d’environ 367 Mo peut ralentir les téléphones peu puissants.
- Version PWA sur PC : lancer `node local-server.js` dans ce dossier puis ouvrir http://localhost:8080.
- Installation sur téléphone : utiliser une version publiée en HTTPS et l’option d’installation du navigateur. Laisser finir le téléchargement initial avant de passer hors ligne.

Un accès HTTP via l’adresse IP du PC ne suffit pas pour activer le service worker sur le téléphone. HTTPS ou localhost sont requis : [documentation MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

## Progression et mises à jour

La progression reste locale, sous la clé `cnc_anass_v2`, avec deux copies de secours. Exporter régulièrement une copie JSON depuis Réglages, notamment avant de changer de navigateur, de fichier ou d’adresse de site. L’import vérifie le format et demande confirmation avant remplacement. La réinitialisation conserve les copies de secours.

Après cette mise à jour : **Ctrl+F5** sur PC. Version 3.5.53, cache `cnc-anass-v93`. Google Analytics 4 suit les routes internes, les clics utiles et les fins de quiz/examens après consentement explicite ; ce choix reste modifiable dans Réglages. Le nouvel espace Classement compare les XP hebdomadaires à un groupe d’entraînement simulé, avec ligues, rang et profil candidat local. L’accueil présente les 31 vrais cours avec leurs QCM correspondants ; les annales et banques documentaires restent dans Concours et Cours PDF.

## Contenu et limites

Les identifiants des modules, l’ordre des questions et les clés de révision sont conservés. La présence d’une source ou d’une explication ne certifie pas l’exactitude médicale ou juridique du contenu. Les 14 modules documentaires restent à enrichir et vérifier.

Google Analytics 4 est chargé lorsque le réseau est disponible ; voir la page À propos et confidentialité. Aucun compte étudiant ni synchronisation de progression entre appareils n’est actuellement implémenté.

## Reconstruire et contrôler

- `node build_single.js` : générer le fichier autonome.
- `node tools/test_reliability.cjs` : tests de sauvegarde, validation et cache.
- `node tools/audit_concours.mjs` : catalogue et copies livrées.
- Depuis le dossier parent : `node audit-prepme.cjs` pour le bilan structurel complet.
- Depuis le dossier parent : `powershell -File CNC_ANASS_App/tools/package_pwa.ps1` pour créer le ZIP sans historique Git ni sauvegardes.

Phase actuelle : PWA. Aucun APK n’est généré par ces outils.
