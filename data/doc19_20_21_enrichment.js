/* Entraînement des documents 19 à 21, construit à partir des contenus PDF présents. */
(function(){
  var docs=window.CNC_DATA.docs||[];
  function add(id,rows){var d=docs.find(function(x){return x.id===id;});if(!d)return;d.units.forEach(function(u,i){var x=rows[i];if(!x)return;u.qs=[{q:x[0],o:x[1],c:x[2],e:x[3],source:'Document '+id+' · p.'+(i+1),verified:true}];u.cards=u.cards.slice(0,1).concat([{f:x[0].replace(/\?$/,''),b:x[3]}]);u.lesson=u.lesson.replace('Contenu extrait du PDF','Cours vérifié à partir du PDF');});}
  add(19,[
    ['Le document 19 traite principalement du :',['Management de la qualité','Financement des retraites','Transport sanitaire','Droit du travail'],0,'Le support porte sur la gestion et le management de la qualité.'],
    ['Selon la définition citée de l’OMS, la qualité vise notamment :',['Le meilleur résultat de santé au meilleur coût et avec le moindre risque','Le plus grand nombre d’actes sans évaluation','La réduction de tout personnel','La suppression de la prévention'],0,'La définition OMS citée associe résultat de santé, état de la science, coût et risque iatrogène.'],
    ['La non-qualité possède elle aussi :',['Un coût','Aucun effet','Uniquement un avantage','Une durée fixe'],0,'Le support souligne le coût des défauts et des erreurs.'],
    ['La démarche qualité vise notamment la satisfaction :',['Des clients ou usagers','Des seuls fournisseurs','Des seuls financeurs','Des seuls visiteurs'],0,'La définition de la démarche qualité mentionne la satisfaction des clients.'],
    ['L’assurance qualité vise la conformité des structures, processus et résultats à :',['Des normes spécifiées','Des opinions individuelles','Des objectifs secrets','Des règles non écrites'],0,'Le support définit l’assurance qualité comme une approche normative.'],
    ['L’efficience correspond au rapport entre :',['Les résultats obtenus et les ressources utilisées','Le nombre de lits et la taille du bâtiment','Les plaintes et les congés','Les patients et les visiteurs'],0,'Le document définit l’efficience par le rapport entre résultats et ressources.'],
    ['Le cycle PDCA signifie :',['Planifier, Faire, Vérifier, Agir','Prévenir, Diagnostiquer, Corriger, Arrêter','Préparer, Décider, Contrôler, Alerter','Planifier, Déléguer, Classer, Archiver'],0,'Le cycle de Deming est Plan, Do, Check, Act.'],
    ['L’amélioration continue de la qualité est :',['Une démarche visant à accroître la capacité à satisfaire les exigences','Une action unique sans suivi','Une suppression des indicateurs','Une procédure réservée aux achats'],0,'Le support présente l’amélioration continue comme une démarche de management de la qualité.'],
    ['Le cycle de Deming comporte :',['4 étapes','2 étapes','6 étapes','10 étapes'],0,'Le cycle PDCA comporte quatre étapes.'],
    ['La première étape de résolution d’un problème est :',['Identifier le problème','Choisir immédiatement une solution','Fermer le service','Écrire le rapport final'],0,'La page 10 commence par l’identification du problème.'],
    ['Un enjeu juridique de la qualité est notamment :',['La preuve que les précautions ont été prises','La suppression de toute responsabilité','L’absence de conformité','La non-traçabilité'],0,'Le document cite la preuve de bonne foi et des précautions prises.'],
    ['Le coût de la non-qualité peut se manifester par :',['Des erreurs, infections nosocomiales, réclamations et litiges','Uniquement une hausse des salaires','Uniquement des travaux','Aucun événement'],0,'La page 12 cite ces manifestations du coût de la non-qualité.'],
    ['Une dimension de la qualité des soins est :',['La compétence professionnelle','La couleur des murs uniquement','La vitesse administrative seule','Le nombre de parkings'],0,'La compétence professionnelle fait partie des dimensions de la qualité des soins.'],
    ['Le premier principe du management de la qualité cité est :',['Orientation client','Secret professionnel uniquement','Rotation des lits','Réduction des soins'],0,'La page 14 présente l’orientation client comme principe.'],
    ['Le diagramme de Pareto est aussi appelé :',['Règle des 80/20','Règle des 50/50','Courbe de survie','Cycle de Deming'],0,'Le document appelle Pareto la règle des 80/20 ou courbe ABC.'],
    ['Le brainstorming est :',['Un travail de groupe de production d’idées','Un examen individuel','Un audit financier','Une méthode de stérilisation'],0,'La page 16 décrit le brainstorming comme une production collective d’idées.'],
    ['La matrice de compatibilité aide à :',['Choisir entre plusieurs propositions selon des critères','Mesurer la tension artérielle','Calculer la durée de séjour','Classer les médicaments'],0,'La page 17 présente cet outil comme une aide à la décision.'],
    ['Un diagramme de Gantt représente les tâches par :',['Des barres indiquant début, durée et fin','Des cercles de couleur uniquement','Des photos de patients','Des cartes géographiques'],0,'La page 18 décrit les barres horizontales du diagramme de Gantt.']
  ]);
  add(20,[
    ['Le document 20 rassemble des chiffres de santé pour la période :',['2018-2023','2000-2005','2025-2030','1990-1995'],0,'Le titre du document porte sur Santé en chiffres 2018-2023.'],
    ['L’indice synthétique de fécondité indiqué pour 2018 est :',['2,38','16,9','5,1','76,3'],0,'La page 2 indique 2,38 en 2018.'],
    ['Le taux brut de natalité indiqué en 2023 est :',['15,7','22,2','77,0','11,8'],0,'La page 2 indique 15,7 en 2023.'],
    ['L’espérance de vie totale indiquée en 2023 est :',['77,0','75,3','22,2','5,1'],0,'La page 3 indique une espérance de vie de 77,0 en 2023.'],
    ['Le taux de chômage de la population active indiqué en 2021 est :',['9,2 %','12,3 %','11,8 %','5,1 %'],1,'La page 4 indique 12,3 % en 2021.'],
    ['Le nombre de médecins généralistes indiqué en 2023 est :',['3 457','29 738','37 376','439'],0,'La page 5 indique 3 457 médecins généralistes en 2023.'],
    ['Le budget total du MSPS indiqué en 2022 est de :',['23 milliards','14 milliards','7,55 milliards','3,07 milliards'],0,'La page 5 indique 23 milliards en 2022.'],
    ['Le taux d’occupation est calculé à partir notamment :',['Des journées réalisées et des lits installés','Du nombre de médecins uniquement','Des naissances uniquement','Des dépenses pharmaceutiques'],0,'La formule de la page 13 utilise journées réalisées et lits installés.'],
    ['La première cause de décès 2017-2022 citée est :',['Les maladies de l’appareil circulatoire','Les maladies infectieuses','Les causes externes','Les tumeurs malignes'],0,'La page 8 classe les maladies de l’appareil circulatoire en première position.'],
    ['Le nombre de cas de tuberculose indiqué en 2023 est :',['32 429','30 977','28 509','29 943'],0,'La page 9 indique 32 429 cas en 2023.'],
    ['Le nombre d’hôpitaux indiqué en 2023 est :',['335','439','135','9'],0,'La page 10 indique 335 hôpitaux en 2023.'],
    ['La durée moyenne de séjour est calculée par :',['Journées réalisées / nombre d’entrées','Entrées / journées réalisées','Lits / médecins','Décès / naissances'],0,'La page 13 donne cette formule.'],
    ['Le taux de rotation utilise notamment :',['Le nombre d’entrées et les lits installés','Les dépenses et le PIB','Les consultations et les naissances','Les infections et les décès'],0,'La formule citée utilise le nombre d’entrées et le nombre de lits installés.']
  ]);
  add(21,[
    ['Le document 21 porte sur la stratégie sectorielle :',['2012-2016','2000-2004','2018-2023','2025-2030'],0,'Le titre du support est Stratégie sectorielle 2012-2016.'],
    ['La part des maladies non transmissibles indiquée est de :',['55,8 %','33,4 %','10,8 %','5,5 %'],0,'La page 2 indique 55,8 % pour les maladies non transmissibles.'],
    ['Une contrainte principale citée est :',['Les difficultés d’accès aux soins','L’excès de ressources humaines','La disparition des paiements directs','L’absence de maladies chroniques'],0,'La page 2 cite les difficultés d’accès aux soins parmi les contraintes.'],
    ['Le RISUM correspond au :',['Réseau intégré de soins d’urgence médicale','Réseau international de surveillance universitaire','Régime interne de sécurité médicale','Référentiel infirmier de soins urgents'],0,'La page 3 mentionne la mise en place du Réseau intégré de soins d’urgence médicale.'],
    ['Une action en santé de la mère et de l’enfant est :',['Améliorer la prise en charge des complications obstétricales','Supprimer les soins néonataux','Réduire la planification familiale','Fermer les structures rurales'],0,'La page 5 cite l’amélioration de la prise en charge des complications obstétricales.'],
    ['La stratégie prévoit aussi la détection précoce des cancers :',['Du sein et du col de l’utérus','Du poumon uniquement','De la peau uniquement','Du foie uniquement'],0,'La page 6 mentionne l’intégration de la détection précoce des cancers du sein et du col de l’utérus.']
  ]);
})();
