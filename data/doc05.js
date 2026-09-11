/* Module 05 — Indicateurs de la santé */
(window.CNC_DATA=window.CNC_DATA||{docs:[]}).docs.push({
id:5,code:"05",title:"Indicateurs de la santé",sub:"Mesure de l'état de santé d'une population",icon:"📊",
units:[

/* U1 */
{t:`Définition et types d'indicateurs`,ic:`📐`,pages:`p.2-3`,
lesson:`<h3>🔍 Mesurer l'état de santé</h3>
<p>La mesure de l'état de santé d'une population implique deux connaissances : celle de la <b>population</b> et celle des <b>outils</b>.</p>
<p>Son appréciation permet de : <b>identifier</b> les problèmes de santé (épidémie, hausse d'une pathologie) · <b>orienter la recherche étiologique</b> · <b>préciser les priorités</b> (fréquence, gravité, impact social) · <b>évaluer les résultats</b> des actions (campagne de vaccination, ouverture d'un hôpital).</p>
<h3>📏 Définition</h3>
<p>Un <b>indicateur en santé</b> est un <b>outil de mesure</b> d'un état de santé, d'une pratique ou de la <b>survenue d'un événement</b>. C'est un « instrument qui fournit une indication », un critère d'appréciation de l'état d'un phénomène <b>à un moment donné</b>.</p>
<p>Un <b>indicateur de santé</b> est une variable <b>qualitative ou quantitative</b> permettant d'évaluer l'état de santé, de décrire l'état de santé des individus d'une population, de <b>suivre et évaluer les effets</b>, de mesurer <b>performances et résultats</b>.</p>
<h3>🧩 Les 3 types d'indicateurs</h3>
<p><b>Structure</b> : évaluent la gestion des <b>ressources</b> humaines, matérielles et financières nécessaires aux processus de soins.<br>
<b>Processus</b> : évaluent la <b>mise en œuvre</b> d'une activité de soins dans la prise en charge du patient.<br>
<b>Résultats</b> : évaluent, à l'issue du processus, les <b>bénéfices ou risques</b> pour le patient en termes d'<b>efficacité, satisfaction et sécurité</b>.</p>
<div class="tip">Mnémo <b>S-P-R</b> : Structure (les moyens) → Processus (l'action) → Résultats (l'effet).</div>`,
qs:[
{q:`Un indicateur en santé est défini comme :`,o:[`Un objectif de santé publique`,`Un outil de mesure d'un état de santé, d'une pratique ou de la survenue d'un événement`,`Une norme réglementaire`,`Un programme de prévention`],c:1,e:`Indicateur = outil de mesure d'un état de santé, d'une pratique ou de la survenue d'un événement.`},
{q:`Les indicateurs qui évaluent la gestion des ressources humaines, matérielles et financières sont dits :`,o:[`De structure`,`De processus`,`De résultats`,`D'impact`],c:0,e:`Indicateurs de structure = ressources nécessaires à la mise en œuvre des processus de soins.`},
{q:`Les indicateurs évaluant l'efficacité, la satisfaction et la sécurité pour le patient sont :`,o:[`De structure`,`De processus`,`De résultats`,`D'exposition`],c:2,e:`Indicateurs de résultats : bénéfices ou risques générés pour le patient à l'issue du processus de soins.`},
{q:`Les indicateurs de processus évaluent :`,o:[`Les ressources disponibles`,`La mise en œuvre d'une activité de soins dans la prise en charge`,`La mortalité`,`Le budget de l'hôpital`],c:1,e:`Ils évaluent la mise en œuvre d'une activité de soins du processus de prise en charge d'un patient.`},
{q:`La mesure de l'état de santé d'une population implique la connaissance :`,o:[`De la population et des outils`,`Du budget et du personnel`,`Des lois et des règlements`,`Des hôpitaux et des cliniques`],c:0,e:`Deux notions : connaissance de la population et connaissance des outils.`},
{q:`L'appréciation de l'état de santé permet notamment :`,o:[`De fixer les salaires`,`D'orienter la recherche étiologique`,`De construire des hôpitaux`,`De réduire les impôts`],c:1,e:`Elle permet d'identifier les problèmes, d'orienter la recherche étiologique, de préciser les priorités et d'évaluer les résultats des actions.`},
{q:`Les priorités de santé sont précisées en fonction de :`,o:[`La fréquence, la gravité et l'impact social`,`Le coût et la rentabilité`,`L'âge et le sexe`,`La région et la saison`],c:0,e:`Priorités selon la fréquence, la gravité et l'impact social du problème.`},
{q:`Un indicateur de santé est une variable :`,o:[`Uniquement quantitative`,`Uniquement qualitative`,`Qualitative ou quantitative`,`Toujours binaire`],c:2,e:`Il s'agit de mesures quantitatives ou non d'une dimension particulière de l'état de santé.`}
],
cards:[
{f:`Définition d'un indicateur en santé`,b:`Outil de mesure d'un <b>état de santé</b>, d'une <b>pratique</b> ou de la <b>survenue d'un événement</b>`},
{f:`Les 3 types d'indicateurs`,b:`<b>Structure</b> (ressources) · <b>Processus</b> (mise en œuvre des soins) · <b>Résultats</b> (efficacité, satisfaction, sécurité)`},
{f:`À quoi sert l'appréciation de l'état de santé ?`,b:`Identifier les problèmes · orienter la recherche étiologique · préciser les priorités (fréquence, gravité, impact social) · évaluer les résultats des actions`},
{f:`Que mesure un indicateur de résultats ?`,b:`Les bénéfices ou risques pour le patient en termes d'<b>efficacité</b>, de <b>satisfaction</b> et de <b>sécurité</b>`}
]},

/* U2 */
{t:`Proportion, ratio, indice, taux`,ic:`➗`,pages:`p.3, 8`,
lesson:`<h3>🔢 Comment s'expriment les indicateurs</h3>
<p>En <b>nombre</b> (nombre absolu dans une zone ou une population) · en <b>taux</b> (par unité de temps ou de population) · en <b>proportion</b> (à un temps t) · en <b>moyenne</b> (à un temps t) · en <b>catégorie</b> (variable qualitative à un temps t).</p>
<h3>📊 Les 4 mesures à ne pas confondre</h3>
<table><tr><th>Mesure</th><th>Définition</th></tr>
<tr><td><b>Proportion</b></td><td>Rapport des effectifs d'une <b>même variable</b>, le <b>numérateur est compris dans le dénominateur</b>. Mesure <b>statique</b>, exprimée en % ou de 0 à 1.</td></tr>
<tr><td><b>Ratio</b></td><td>Rapport des effectifs de <b>2 modalités d'une même variable</b>, numérateur et dénominateur <b>mutuellement exclusifs</b> (ex. sexe H/F). <b>Pas d'unité</b>.</td></tr>
<tr><td><b>Indice</b></td><td>Rapport des effectifs de <b>deux variables différentes</b>.</td></tr>
<tr><td><b>Taux</b></td><td>Une proportion qui <b>inclut la notion de temps</b>.</td></tr></table>
<h3>🌍 Critères de choix selon l'OMS</h3>
<p><b>Utilité · Accessibilité · Aspect éthique · Solidité · Représentativité · Compréhensibilité</b> (6 critères).</p>
<div class="warn">⚠️ Piège fréquent : <b>ratio</b> = 2 modalités d'une même variable (exclusives) ; <b>indice</b> = 2 variables différentes ; <b>taux</b> = proportion + temps.</div>`,
qs:[
{q:`Dans une proportion :`,o:[`Le numérateur est compris dans le dénominateur`,`Numérateur et dénominateur sont exclusifs`,`Il s'agit de deux variables différentes`,`Elle inclut toujours le temps`],c:0,e:`Proportion : rapport des effectifs d'une même variable, le numérateur étant compris dans le dénominateur ; mesure statique exprimée en % ou de 0 à 1.`},
{q:`Le rapport des effectifs de deux modalités mutuellement exclusives d'une même variable est :`,o:[`Une proportion`,`Un ratio`,`Un indice`,`Un taux`],c:1,e:`Ratio (ex. hommes / femmes) : pas d'unité, numérateur et dénominateur mutuellement exclusifs.`},
{q:`Le rapport des effectifs de deux variables différentes est :`,o:[`Un ratio`,`Un indice`,`Une proportion`,`Une moyenne`],c:1,e:`Un indice met en rapport deux variables différentes.`},
{q:`Qu'est-ce qui distingue un taux d'une proportion ?`,o:[`Le taux inclut une notion de temps`,`Le taux n'a pas d'unité`,`Le taux compare deux variables`,`Rien, ce sont des synonymes`],c:0,e:`Le taux est une proportion qui inclut la notion de temps.`},
{q:`Selon l'OMS, le choix d'un indicateur repose sur combien de critères ?`,o:[`4`,`5`,`6`,`8`],c:2,e:`6 critères : utilité, accessibilité, aspect éthique, solidité, représentativité, compréhensibilité.`},
{q:`Parmi les critères OMS de choix d'un indicateur figure :`,o:[`La rentabilité`,`L'aspect éthique`,`La rapidité de calcul`,`Le coût minimal`],c:1,e:`Utilité, accessibilité, aspect éthique, solidité, représentativité, compréhensibilité.`},
{q:`Une variable qualitative mesurée à un temps t s'exprime en :`,o:[`Taux`,`Catégorie`,`Moyenne`,`Ratio`],c:1,e:`Les indicateurs s'expriment en nombre, taux, proportion, moyenne ou catégorie (variable qualitative à un temps t).`},
{q:`Un ratio s'exprime :`,o:[`En pourcentage obligatoirement`,`Sans unité`,`En années`,`Pour 1000 habitants`],c:1,e:`Le ratio n'a pas d'unité.`}
],
cards:[
{f:`Proportion vs ratio`,b:`<b>Proportion</b> : même variable, numérateur inclus dans le dénominateur (%) · <b>Ratio</b> : 2 modalités exclusives d'une même variable, sans unité`},
{f:`Indice`,b:`Rapport des effectifs de <b>deux variables différentes</b>`},
{f:`Taux`,b:`Une <b>proportion</b> qui inclut en plus une <b>notion de temps</b>`},
{f:`Les 6 critères OMS de choix d'un indicateur`,b:`Utilité · accessibilité · aspect éthique · solidité · représentativité · compréhensibilité`},
{f:`Les 5 formes d'expression d'un indicateur`,b:`Nombre · taux · proportion · moyenne · catégorie`}
]},

/* U3 */
{t:`Qualités d'un bon indicateur (SMART)`,ic:`⭐`,pages:`p.4-5`,
lesson:`<h3>🎯 Un bon indicateur est SMART</h3>
<p><b>S</b>pécifique : mesure claire et précise de ce qu'il est censé mesurer<br>
<b>M</b>esurable : erreur de mesure minimale<br>
<b>A</b>daptable : valeurs existantes dans différents groupes de population<br>
<b>R</b>éalisable : disponibilité des valeurs de l'indicateur<br>
<b>T</b>emporel : mesure à intervalles réguliers et appropriés</p>
<h3>🔬 Les 4 qualités d'un indicateur de santé</h3>
<p><b>1. Validité</b> : aptitude à mesurer la dimension de l'état de santé visée.<br>
<b>2. Sensibilité au changement</b> : capacité à rendre compte <b>rapidement</b> des variations réelles de l'état de santé au cours du temps.<br>
<b>3. Spécificité</b> : capacité à varier <b>lorsque le phénomène mesuré varie lui-même</b>.<br>
<b>4. Fiabilité (précision)</b> : capacité à caractériser l'importance des <b>erreurs de mesure aléatoires</b>.</p>
<h3>🔁 La fiabilité s'apprécie par…</h3>
<p>La <b>reproductibilité</b> (dispersion des mesures répétées à brève échéance) · la <b>concordance inter-observateurs</b> · la <b>cohérence interne</b> (homogénéité du questionnaire ou d'un indice complexe).</p>
<p>En plus, l'indicateur doit être : construit selon un <b>but précis</b>, <b>facile à obtenir</b>, <b>facile à comprendre</b>, <b>accessible</b>, <b>simple</b>, <b>acceptable</b> et <b>quantitatif</b>.</p>`,
qs:[
{q:`Dans l'acronyme SMART appliqué aux indicateurs, le « A » signifie :`,o:[`Accessible`,`Adaptable`,`Acceptable`,`Analysable`],c:1,e:`S : Spécifique, M : Mesurable, A : Adaptable, R : Réalisable, T : Temporel.`},
{q:`Le « R » de SMART correspond à :`,o:[`Rapide`,`Réalisable (disponibilité des valeurs)`,`Reproductible`,`Représentatif`],c:1,e:`Réalisable : les valeurs de l'indicateur sont disponibles.`},
{q:`La capacité d'un indicateur à mesurer effectivement la dimension visée est :`,o:[`La validité`,`La fiabilité`,`La sensibilité`,`La spécificité`],c:0,e:`Validité = aptitude à mesurer la dimension de l'état de santé visée.`},
{q:`La capacité à rendre compte rapidement des variations réelles de l'état de santé est :`,o:[`La spécificité`,`La sensibilité au changement`,`La validité`,`La reproductibilité`],c:1,e:`Sensibilité au changement : rendre compte rapidement et de façon importante des variations réelles au cours du temps.`},
{q:`La fiabilité d'un indicateur peut être appréciée par :`,o:[`La reproductibilité, la concordance inter-observateurs et la cohérence interne`,`Le coût et la rapidité`,`La validité et la spécificité`,`Le nombre de mesures`],c:0,e:`Trois approches : reproductibilité, concordance inter-observateurs, cohérence interne.`},
{q:`La capacité d'un indicateur à varier lorsque le phénomène mesuré varie s'appelle :`,o:[`La sensibilité`,`La spécificité`,`La fiabilité`,`La validité`],c:1,e:`Spécificité : l'indicateur varie lorsque le phénomène mesuré varie lui-même.`},
{q:`Combien de qualités principales définit-on pour un indicateur de santé ?`,o:[`3`,`4`,`5`,`6`],c:1,e:`4 qualités : validité, sensibilité au changement, spécificité, fiabilité (précision).`},
{q:`La cohérence interne évalue :`,o:[`L'homogénéité d'un questionnaire ou d'un indice complexe`,`L'accord entre deux observateurs`,`La stabilité dans le temps`,`Le coût de l'enquête`],c:0,e:`Cohérence interne = homogénéité du questionnaire ou d'un indice complexe.`}
],
cards:[
{f:`SMART pour un indicateur`,b:`<b>S</b>pécifique · <b>M</b>esurable · <b>A</b>daptable · <b>R</b>éalisable · <b>T</b>emporel`},
{f:`Les 4 qualités d'un indicateur de santé`,b:`Validité · sensibilité au changement · spécificité · fiabilité (précision)`},
{f:`Comment apprécie-t-on la fiabilité ?`,b:`<b>Reproductibilité</b> · <b>concordance inter-observateurs</b> · <b>cohérence interne</b>`},
{f:`Validité vs spécificité`,b:`<b>Validité</b> : aptitude à mesurer ce qui est visé · <b>Spécificité</b> : varier quand le phénomène mesuré varie`}
]},

/* U4 */
{t:`Indicateurs de mortalité`,ic:`⚰️`,pages:`p.6`,
lesson:`<h3>⚰️ Taux brut de mortalité (TBM)</h3>
<p><b>TBM = (nombre de décès pendant une période définie / effectif moyen de la population exposée au risque pour la même période) × 100</b></p>
<p>C'est un <b>bon indicateur quantitatif</b> de l'évolution d'un état de santé, mais il <b>ne tient pas compte de la structure par âge</b> : il ne permet donc <b>pas de comparer</b> la mortalité d'un endroit à l'autre, ni dans un même endroit sur une longue période.</p>
<h3>☠️ Taux de létalité (TL)</h3>
<p><b>TL = (nombre de décès par la maladie X / nombre de cas de la maladie X) × 100</b> → mesure la <b>gravité</b> d'une maladie.</p>
<h3>📉 Taux de mortalité proportionnel (TMP)</h3>
<p><b>TMP = (nombre de décès par une cause donnée pendant une période / nombre total de décès pendant cette même période) × 100</b> → poids d'une cause dans l'ensemble des décès.</p>
<div class="warn">⚠️ Piège classique : le <b>dénominateur</b>. Létalité → <b>les malades</b>. Mortalité → <b>la population</b>. Mortalité proportionnelle → <b>l'ensemble des décès</b>.</div>`,
qs:[
{q:`Le dénominateur du taux de létalité est :`,o:[`La population moyenne`,`Le nombre de cas de la maladie`,`Le nombre total de décès`,`Les personnes-années`],c:1,e:`Létalité = décès dus à la maladie X / nombre de cas de la maladie X × 100. Elle mesure la gravité de la maladie.`},
{q:`Le taux brut de mortalité présente quelle limite majeure ?`,o:[`Il est difficile à calculer`,`Il ne tient pas compte de la structure par âge de la population`,`Il ne s'applique qu'aux enfants`,`Il nécessite un registre des cancers`],c:1,e:`Ne tenant pas compte de la structure par âge, il ne permet pas de comparer deux lieux ni un même lieu sur une longue période.`},
{q:`Le taux de mortalité proportionnel rapporte les décès par une cause donnée :`,o:[`À la population moyenne`,`Au nombre total de décès de la période`,`Aux malades de cette cause`,`Aux naissances vivantes`],c:1,e:`TMP = décès par une cause / nombre total de décès pendant la même période × 100.`},
{q:`Quel indicateur mesure le mieux la gravité d'une maladie ?`,o:[`Le taux d'incidence`,`Le taux de létalité`,`Le taux de prévalence`,`Le taux brut de mortalité`],c:1,e:`La létalité rapporte les décès aux malades : c'est l'indicateur de gravité.`},
{q:`Le dénominateur du taux brut de mortalité est :`,o:[`L'effectif moyen de la population exposée au risque`,`Le nombre de malades`,`Le nombre de décès`,`Le nombre de naissances`],c:0,e:`TBM = décès de la période / effectif moyen de la population exposée au risque pour la même période × 100.`},
{q:`Les indicateurs de mortalité sont considérés comme :`,o:[`De mauvais indicateurs`,`De bons indicateurs quantitatifs de l'évolution d'un état de santé`,`Des indicateurs qualitatifs`,`Des indicateurs de structure`],c:1,e:`Bon indicateur quantitatif permettant de mesurer l'évolution d'un état de santé.`}
],
cards:[
{f:`Formule du taux brut de mortalité`,b:`Décès de la période / <b>effectif moyen de la population exposée</b> × 100 — ne tient pas compte de la <b>structure par âge</b>`},
{f:`Formule du taux de létalité`,b:`Décès par la maladie X / <b>nombre de cas de la maladie X</b> × 100 → mesure la <b>gravité</b>`},
{f:`Formule du taux de mortalité proportionnel`,b:`Décès par une cause donnée / <b>nombre total de décès</b> de la période × 100`},
{f:`Limite du TBM`,b:`Ne permet pas de <b>comparer</b> deux lieux ni un même lieu sur une longue période (structure par âge ignorée)`}
]},

/* U5 */
{t:`Indicateurs de morbidité`,ic:`🦠`,pages:`p.6-7`,
lesson:`<h3>📈 Prévalence</h3>
<p><b>Taux de prévalence = (cas d'une maladie à un moment donné ou sur une période / population moyenne sur la même période) × 100.</b><br>
<b>Prévalence instantanée</b> : cas à un <b>instant</b> donné / population moyenne. <b>Prévalence périodique</b> : cas pendant une <b>période</b> donnée / population moyenne.</p>
<p>👉 La prévalence permet de <b>planifier les services de soins</b> car elle mesure la <b>charge</b> que représente une maladie pour la collectivité.</p>
<h3>🆕 Incidence</h3>
<p><b>Taux d'incidence = nouveaux cas apparaissant sur une période définie / nombre de personnes-temps susceptibles d'être atteintes pour la même période.</b></p>
<p>👉 L'incidence évalue l'efficacité d'une <b>prévention primaire</b> : celle-ci limite l'apparition de nouveaux cas et fait donc <b>baisser l'incidence</b>.</p>
<p><b>Densité d'incidence</b> = nouveaux cas au cours d'une période / <b>nombre de personnes-années exposées au risque</b>. Utile pour les maladies <b>aiguës et chroniques</b>, les besoins en soins préventifs et l'évaluation des mesures de contrôle d'une maladie de masse.</p>
<h3>⚡ Taux d'attaque</h3>
<p><b>Taux d'attaque = (nouveaux cas sur une période définie / sujets susceptibles d'être atteints) × 100</b> → très utile <b>lors d'une épidémie</b>.</p>
<div class="tip">Prévalence = <b>stock</b> de malades (planification). Incidence = <b>flux</b> de nouveaux cas (prévention primaire). Taux d'attaque = incidence <b>en situation d'épidémie</b>.</div>`,
qs:[
{q:`La prévalence permet surtout :`,o:[`D'évaluer la prévention primaire`,`De planifier les services de soins car elle mesure la charge de la maladie`,`De mesurer la gravité`,`De détecter une épidémie`],c:1,e:`La prévalence mesure la charge que représente une maladie pour la collectivité : elle sert à planifier les services de soins.`},
{q:`Le taux d'incidence permet d'évaluer l'efficacité :`,o:[`De la prévention primaire`,`De la prévention secondaire`,`De la prévention tertiaire`,`Du traitement curatif`],c:0,e:`La prévention primaire limite l'apparition de nouveaux cas, donc diminue l'incidence.`},
{q:`Le dénominateur de la densité d'incidence est :`,o:[`La population moyenne`,`Le nombre de personnes-années exposées au risque`,`Le nombre de malades`,`Le nombre total de décès`],c:1,e:`Densité d'incidence = nouveaux cas / personnes-années exposées au risque.`},
{q:`Quel indicateur est le plus utile lors d'une épidémie ?`,o:[`Le taux de prévalence`,`Le taux d'attaque`,`Le taux de mortalité proportionnel`,`L'espérance de vie`],c:1,e:`Le taux d'attaque = nouveaux cas / sujets susceptibles d'être atteints × 100, très utile en situation épidémique.`},
{q:`La prévalence instantanée se calcule à partir :`,o:[`Des cas à un instant donné`,`Des nouveaux cas de la période`,`Des décès`,`Des sujets exposés`],c:0,e:`Prévalence instantanée : ensemble des cas à un instant donné / population moyenne × 100.`},
{q:`Le taux d'incidence mesure :`,o:[`Tous les cas existants`,`Les nouveaux cas apparaissant sur une période définie`,`Les décès`,`Les guérisons`],c:1,e:`Incidence = nouveaux cas sur une période / personnes-temps susceptibles d'être atteintes.`},
{q:`La densité d'incidence est utile :`,o:[`Uniquement pour les maladies aiguës`,`Pour les maladies aiguës et chroniques`,`Uniquement pour les maladies chroniques`,`Uniquement en épidémie`],c:1,e:`Elle est utile pour les maladies aiguës et chroniques, les besoins en soins préventifs et l'évaluation des mesures de contrôle d'une maladie de masse.`},
{q:`Prévalence et incidence : quelle affirmation est exacte ?`,o:[`La prévalence est un flux, l'incidence un stock`,`La prévalence est un stock de cas, l'incidence un flux de nouveaux cas`,`Les deux mesurent les nouveaux cas`,`Les deux mesurent la mortalité`],c:1,e:`Prévalence = stock (tous les cas) ; incidence = flux (nouveaux cas seulement).`}
],
cards:[
{f:`Formule du taux de prévalence`,b:`Cas d'une maladie (instant ou période) / <b>population moyenne</b> × 100 — sert à <b>planifier les services de soins</b>`},
{f:`Formule du taux d'incidence`,b:`<b>Nouveaux cas</b> sur une période / <b>personnes-temps susceptibles</b> d'être atteintes — évalue la <b>prévention primaire</b>`},
{f:`Densité d'incidence`,b:`Nouveaux cas / <b>personnes-années exposées au risque</b>`},
{f:`Taux d'attaque`,b:`Nouveaux cas / <b>sujets susceptibles d'être atteints</b> × 100 — indicateur des <b>épidémies</b>`},
{f:`Prévalence vs incidence`,b:`Prévalence = <b>stock</b> de cas (charge, planification) · Incidence = <b>flux</b> de nouveaux cas (prévention primaire)`}
]},

/* U6 */
{t:`Indicateurs démographiques et catégories`,ic:`👥`,pages:`p.5, 7`,
lesson:`<h3>👶 Natalité et fécondité</h3>
<p><b>Taux brut de natalité = (naissances vivantes sur une période / population moyenne pour la même période) × 100.</b> Il <b>ne tient pas compte de la structure par âge</b> et doit être complété par l'étude de la <b>fécondité</b>.</p>
<p><b>Taux global de fécondité = naissances vivantes sur une période / nombre moyen de femmes d'un âge donné pour cette même période.</b></p>
<h3>⏳ Espérance de vie à la naissance (EVN)</h3>
<p>Nombre <b>probable d'années à vivre</b> de la naissance à la mort. C'est l'un des indicateurs d'état de santé <b>les plus fréquemment utilisés</b>, exprimé <b>en années</b>, présenté globalement et <b>par sexe</b>. Son augmentation s'explique par : élévation du <b>niveau de vie</b>, amélioration du <b>mode de vie</b>, hausse du <b>niveau d'instruction</b>, meilleur <b>accès à des services de santé de qualité</b>.</p>
<h3>🗂️ Les 4 catégories d'indicateurs</h3>
<table><tr><th>Catégorie</th><th>Exemples</th></tr>
<tr><td><b>Exposition</b></td><td>Facteurs de risque, facteurs intrinsèques, comportements individuels et habitudes de vie, environnement</td></tr>
<tr><td><b>Morbidité</b></td><td>Taux de prévalence, taux d'incidence</td></tr>
<tr><td><b>Mortalité</b></td><td>Taux brut, taux spécifiques, taux de létalité</td></tr>
<tr><td><b>Démographiques</b></td><td><b>D'état</b> : indice de vieillissement, rapport de dépendance, chômage, nuptialité/divortialité, CSP, alphabétisation, scolarisation, pauvreté — <b>De mouvement</b> : natalité, fécondité, mortalité, espérance de vie, taux d'accroissement</td></tr></table>
<p>Les indicateurs d'<b>état</b> sont de deux types : <b>épidémiologiques</b> et <b>démographiques</b>. On distingue aussi les indicateurs de <b>moyens</b>, d'<b>environnement</b>, <b>socio-économiques</b> et de <b>production</b>.</p>`,
qs:[
{q:`Le taux brut de natalité doit être complété par :`,o:[`L'étude de la mortalité`,`L'étude de la fécondité`,`Le taux d'attaque`,`Le taux de létalité`],c:1,e:`Ne tenant pas compte de la structure par âge, il doit être complété par l'étude de la fécondité.`},
{q:`Le dénominateur du taux global de fécondité est :`,o:[`La population moyenne`,`Le nombre moyen de femmes d'un âge donné`,`Le nombre de naissances`,`Le nombre de ménages`],c:1,e:`Taux global de fécondité = naissances vivantes / nombre moyen de femmes d'un âge donné pour la même période.`},
{q:`L'espérance de vie à la naissance est exprimée :`,o:[`En pourcentage`,`En années`,`Pour 1000 habitants`,`Sans unité`],c:1,e:`Elle correspond au nombre probable d'années à vivre, exprimé en années, globalement et par sexe.`},
{q:`L'indice de vieillissement est un indicateur démographique :`,o:[`D'état`,`De mouvement`,`De morbidité`,`D'exposition`],c:0,e:`Indicateurs d'état : indice de vieillissement, rapport de dépendance, chômage, nuptialité, CSP, alphabétisation, scolarisation, pauvreté.`},
{q:`Le taux d'accroissement est un indicateur démographique :`,o:[`D'état`,`De mouvement`,`De structure`,`De processus`],c:1,e:`Indicateurs de mouvement : natalité, fécondité, mortalité, espérance de vie, taux d'accroissement.`},
{q:`Les facteurs de risque et les habitudes de vie relèvent des indicateurs :`,o:[`D'exposition`,`De morbidité`,`De mortalité`,`Démographiques`],c:0,e:`Indicateurs d'exposition : facteurs de risque, facteurs intrinsèques, comportements individuels et habitudes de vie, environnement.`},
{q:`Les deux types d'indicateurs d'état sont :`,o:[`Épidémiologiques et démographiques`,`Structure et processus`,`Publics et privés`,`Quantitatifs et qualitatifs`],c:0,e:`Indicateurs d'état = épidémiologiques et démographiques ; s'y ajoutent moyens, environnement, socio-économiques et production.`},
{q:`L'augmentation de l'espérance de vie s'explique notamment par :`,o:[`L'élévation du niveau de vie et d'instruction et un meilleur accès aux soins`,`L'augmentation de la natalité`,`La baisse de la population active`,`L'urbanisation seule`],c:0,e:`Niveau de vie, mode de vie, niveau d'instruction et accès plus large à des services de santé de qualité.`}
],
cards:[
{f:`Formule du taux brut de natalité`,b:`Naissances vivantes / <b>population moyenne</b> de la période × 100 — à compléter par la <b>fécondité</b>`},
{f:`Espérance de vie à la naissance`,b:`Nombre <b>probable d'années à vivre</b> de la naissance à la mort ; exprimée en <b>années</b>, globalement et par sexe`},
{f:`Indicateurs démographiques d'état`,b:`Indice de vieillissement · rapport de dépendance · chômage · nuptialité / divortialité · CSP · alphabétisation · scolarisation · pauvreté`},
{f:`Indicateurs démographiques de mouvement`,b:`Natalité · fécondité · mortalité · espérance de vie · taux d'accroissement`},
{f:`Les 4 catégories d'indicateurs`,b:`Exposition · morbidité · mortalité · démographiques (état et mouvement)`}
]}

]});
