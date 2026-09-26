/* Entraînement structuré des documents 15, 17 et 18, fondé sur leurs pages PDF. */
(function(){
  var docs=window.CNC_DATA.docs||[];
  function add(id, rows){var d=docs.find(function(x){return x.id===id;});if(!d)return;d.units.forEach(function(u,i){var x=rows[i];if(!x)return;u.qs=[{q:x[0],o:x[1],c:x[2],e:x[3],source:'Document '+id+' · p.'+(i+1),verified:true}];u.cards=u.cards.slice(0,1).concat([{f:x[0].replace(/\?$/,''),b:x[3]}]);u.lesson=u.lesson.replace('Contenu extrait du PDF','Cours vérifié à partir du PDF');});}
  add(15,[
    ['Le document 15 porte principalement sur :',['Les journées sanitaires et les jours fériés','La comptabilité hospitalière','Les urgences médicales','La vaccination infantile'],0,'Le support rassemble des journées internationales de santé et des jours fériés.'],
    ['Le 26 janvier est présenté comme la Journée mondiale :',['Des lépreux','Du diabète','Du rein','De l’asthme'],0,'La page 2 indique le 26 janvier comme Journée mondiale des lépreux.'],
    ['Le 12 mai est la Journée internationale :',['Des infirmières','Du cancer','De la prostate','Des premiers secours'],0,'La page 3 cite le 12 mai comme Journée internationale des infirmières.'],
    ['Le 14 septembre est la Journée mondiale :',['Des premiers secours','Du diabète','De la physiothérapie','De la contraception'],0,'La page 4 cite le 14 septembre comme Journée mondiale des premiers secours.'],
    ['Le 14 novembre est la Journée mondiale :',['Du diabète','Du rein','Du lupus','De la pneumonie'],0,'La page 5 indique le 14 novembre comme Journée mondiale du diabète.']
  ]);
  add(17,[
    ['Le PEH signifie :',['Projet d’établissement hospitalier','Programme d’évaluation hygiénique','Plan d’équipement hôtelier','Projet d’étude hospitalière'],0,'Le support présente le PEH comme le Projet d’établissement hospitalier.'],
    ['Le PEH sert notamment à :',['Définir où l’hôpital veut aller et comment il va travailler','Remplacer tous les soins','Fixer uniquement les salaires','Gérer uniquement les archives'],0,'Le document décrit le PEH comme un guide de travail et d’amélioration de l’établissement.'],
    ['Le PEH doit être compatible avec :',['Les objectifs de la carte sanitaire régionale','Le calendrier scolaire uniquement','Les règles de transport','Les objectifs d’une entreprise privée'],0,'La page 3 précise sa compatibilité avec les objectifs de la carte sanitaire régionale.'],
    ['Quelle démarche est mise en avant dans le PEH ?',['Communication et concertation','Isolement des services','Suppression des groupes de travail','Décision sans dialogue'],0,'Le support recommande une communication proactive et des structures de concertation.'],
    ['L’approche du PEH doit donner la priorité :',['À une prise en charge globale et continue du patient','À la réduction des visites','À la gestion des parkings','Aux seuls indicateurs financiers'],0,'La page 5 place le patient, la globalité et la continuité des soins au centre.'],
    ['Le projet managérial englobe notamment :',['La gouvernance, les ressources humaines, la finance et la qualité','Uniquement les travaux de bâtiment','Uniquement la pharmacie','Uniquement les archives'],0,'Le projet managérial couvre gouvernance, leadership, gestion, RH, finance, logistique et qualité.'],
    ['Le plan financier précise notamment :',['Le coût, les sources de financement et la priorisation des projets','Les horaires de visite uniquement','Les noms des patients','Les résultats scolaires'],0,'La page 7 cite le coût, les sources de financement et la priorisation.'],
    ['Le comité de projet comprend notamment :',['Le directeur et des responsables de projets','Uniquement les patients','Uniquement les fournisseurs','Uniquement les visiteurs'],0,'La page 8 cite le directeur, plusieurs responsables et les chefs de projet.']
  ]);
  add(18,[
    ['La planification fait partie des fonctions classiques du processus :',['PODC','ABC uniquement','PDF','SROS uniquement'],0,'Le document présente Planification, Organisation, Direction et Contrôle (PODC).'],
    ['La planification sanitaire est définie comme un processus de :',['Prévision des ressources et services selon des objectifs et priorités','Suppression des ressources','Remplacement du diagnostic','Gestion des congés uniquement'],0,'La définition du support porte sur les ressources, services, objectifs, priorités et contraintes.'],
    ['La fonction « contrôler » consiste à :',['Mesurer le rendement et prendre des dispositions correctives','Affecter uniquement les ressources','Définir les valeurs','Motiver uniquement l’équipe'],0,'La page 3 associe le contrôle à la mesure du rendement et aux dispositions nécessaires.'],
    ['La planification sanitaire doit tenir compte :',['Des contraintes actuelles ou prévisibles','Uniquement des souhaits individuels','Uniquement des dépenses passées','De la météo'],0,'La définition citée inclut les contraintes connues ou prévisibles.'],
    ['La planification stratégique couvre généralement :',['5 à 10 années','Un seul jour','Une semaine','Plus de 50 années obligatoirement'],0,'Le tableau de la page 5 donne une durée stratégique de 5 à 10 années.'],
    ['La planification opérationnelle concerne généralement :',['Une année','10 années','20 années','Une seule heure'],0,'Le tableau associe la planification opérationnelle à une durée d’un an.'],
    ['La première étape du processus de planification est :',['La recherche d’un consensus sur les buts','La rédaction du budget final','La suppression des indicateurs','La nomination des patients'],0,'La page 7 présente le consensus sur les buts comme première étape.'],
    ['Le point de départ d’un exercice de planification est :',['L’identification des besoins de la population','La publication du rapport final','Le choix du logo','La fermeture des services'],0,'La page 8 indique que l’identification des besoins constitue le point de départ.'],
    ['Dans l’analyse SWOT, une force est :',['Un atout interne','Une menace externe','Une opportunité externe','Une faiblesse interne'],0,'La page 9 définit les forces comme des atouts internes.'],
    ['Un objectif SMART doit être notamment :',['Spécifique et mesurable','Secret et imprécis','Impossible et non quantifié','Sans délai'],0,'La page 10 présente notamment les critères spécifique et mesurable.']
  ]);
})();
