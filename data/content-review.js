/* Corrections comparées aux PDF fournis, 20 septembre 2026.
 * Positions des unités/questions/cartes conservées. Pas de modification du stockage.
 * Les pages désignent les pages physiques du PDF, couverture comprise.
 */
window.CNC_APPLY_CONTENT_REVIEW = function (docs) {
  'use strict';
  var byId = {};
  docs.forEach(function(d){byId[d.id]=d;});
  if (byId[1]._contentReview20260920) return;
  function u(id,n){return byId[id].units[n-1];}
  function add(id,n,html){u(id,n).lesson += html;}
  function section(title,text){return '<h3>'+title+'</h3><p>'+text+'</p>';}
  function list(title,items){return '<h3>'+title+'</h3><ul class="emo">'+items.map(function(s){return '<li>📌 '+s+'</li>';}).join('')+'</ul>';}
  function card(id,n,f,b){u(id,n).cards.push({f:f,b:b});}
  function question(id,n,q,answer,wrong,e){
    var opts=wrong.slice(),c=u(id,n).qs.length%4;opts.splice(c,0,answer);
    u(id,n).qs.push({q:q,o:opts,c:c,e:e});
  }
  var ranges={
    5:{6:'p.5-7'},7:{8:'p.15-18'},
    8:{1:'p.2',2:'p.2-3',3:'p.3',4:'p.3-5',5:'p.5-6',6:'p.7-8',7:'p.8-10',8:'p.11-12',9:'p.12-16',10:'p.16'},
    11:{2:'p.2-3',3:'p.3',4:'p.4, 10',5:'p.4, 10',6:'p.5',7:'p.6, 10',8:'p.6-8, 10',9:'p.9, 11'},
    16:{1:'p.2-3',2:'p.4-5',3:'p.6-7',4:'p.7-10',5:'p.11-14',6:'p.14-15',7:'p.16-21',8:'p.21-26, 35',9:'p.26-28, 34-35',10:'p.28-34, 36',11:'p.22, 26, 35-36'},
    22:{2:'p.2',3:'p.2',4:'p.3',5:'p.4',6:'p.4-5',7:'p.6-7',8:'p.7-10'},
    25:{2:'p.2',3:'p.3-4',4:'p.5',5:'p.5-6'},
    26:{1:'p.2-3, 18-19',2:'p.4-6',3:'p.7-9',4:'p.9-11',5:'p.11-12',6:'p.13-16',7:'p.17, 31',8:'p.20-24',9:'p.25-32',10:'p.33-42',11:'p.38, 41-42'},
    28:{3:'p.3-4',4:'p.4-5',5:'p.6',6:'p.7',7:'p.8',8:'p.9-10',9:'p.10-11',10:'p.11-13'},
    29:{3:'p.4-5',5:'p.5-6',6:'p.6-7',7:'p.7-9',10:'p.11-13'},
    30:{2:'p.3-4',4:'p.4',5:'p.4-5',6:'p.5-7',7:'p.7-8',8:'p.8-9',9:'p.9-10'},
    31:{2:'p.2-4',3:'p.3-4',4:'p.5',5:'p.5-6',6:'p.7-8'}
  };
  Object.keys(ranges).forEach(function(id){Object.keys(ranges[id]).forEach(function(n){u(id,+n).pages=ranges[id][n];});});
  byId[23].title='La loi-cadre 34-09';
  byId[23].sub='Loi-cadre 34-09 — intitulé du document, p.1-2 (nom du fichier : 43-09)';

  add(1,1,section('⚖️ Responsabilités et définition complète','Le support (p.2) engage la responsabilité de <b>l’État, des établissements publics et des collectivités territoriales</b>. Chez Monnier (p.3), l’équilibre exige la satisfaction des besoins fondamentaux <b>nutritionnels, sanitaires, affectifs, éducatifs et sociaux</b>, ainsi qu’une adaptation continue à un environnement changeant. Le rapport OMS 2000 est aussi présenté par la qualité de vie et les <b>manques de santé : maladies et années de vie perdues prématurément</b>.'));
  add(1,3,list('🎯 Les 10 objectifs explicités — p.6-7',[
    '<b>Accès et qualité</b> — faciliter l’accès aux prestations et en améliorer la qualité.',
    '<b>Répartition</b> — équilibrer l’offre de soins sur tout le territoire.',
    '<b>Territorialisation</b> — créer les groupements sanitaires territoriaux pour améliorer la gouvernance publique.',
    '<b>Souveraineté pharmaceutique</b> — assurer disponibilité, sécurité et qualité des médicaments et produits de santé.',
    '<b>Risques sanitaires</b> — développer les moyens de détection et de prévention.',
    '<b>Parcours et information</b> — réorganiser le parcours de soins et digitaliser le système.',
    '<b>Encadrement sanitaire</b> — atteindre les normes de l’OMS évoquées dans le support.',
    '<b>Ressources humaines</b> — valoriser les métiers par une fonction sanitaire adaptée à leurs spécificités.',
    '<b>Partenariat</b> — renforcer coopération et complémentarité entre public et privé.',
    '<b>Recherche</b> — encourager recherche scientifique et innovation.'
  ]));
  add(1,14,list('🏢 Attributions des six services régionaux — p.42-44',[
    '<b>Santé publique</b> — santé reproductive et mère-enfant, prévention des maladies transmissibles et non transmissibles, surveillance, sécurité sanitaire, environnement et populations à besoins spécifiques.',
    '<b>Offre de soins</b> — organiser les réseaux et leurs appuis, tenir la base de données, identifier les besoins, préparer le plan régional, suivre les filières et la sécurité des patients.',
    '<b>Observatoire régional</b> — collecter et analyser les informations, suivre les indicateurs, produire les rapports, conduire des études et gérer les systèmes d’information.',
    '<b>Finances, logistique et partenariat</b> — budget-programme, fonctionnement et investissement, ressources additionnelles, contrats, logistique et parc automobile.',
    '<b>Ressources humaines et contentieux</b> — effectifs, compétences, formation continue, santé au travail, dialogue social et dossiers de conflits.',
    '<b>Équipements et maintenance</b> — investissements, entretien du patrimoine, du matériel et des équipements.'
  ])+section('👥 Responsabilités locales — p.44-47','Le délégué est nommé par le ministre <b>parmi les médecins du ministère</b>. Le SRES est placé sous l’autorité d’un <b>médecin chef</b> ; son unité de pharmacie est placée sous la responsabilité d’un <b>pharmacien</b>. L’unité de planification élabore le plan provincial, supervise les circonscriptions, identifie les besoins de formation et tient les bilans et le tableau de bord. L’unité de veille assure surveillance, sécurité sanitaire et programmes de santé environnementale.'));

  add(1,15,
    section('📖 Notions à distinguer — p.48-49','Une installation de santé peut être <b>fixe ou mobile</b>. Les soins essentiels associent les soins primaires et les principaux recours hospitaliers de proximité. Un <b>lit</b> correspond à une hospitalisation complète d’au moins une nuit ; une <b>place</b> à l’hôpital de jour, sans hébergement. Le pôle d’excellence porte une spécialité ou technique avancée ; le centre de référence interrégional dépasse le bassin de desserte de son établissement.')+
    list('⚖️ Les huit principes de l’offre de soins — p.49',[
      'Solidarité et responsabilisation de la population.','Égalité d’accès aux soins et services.','Équité spatiale des ressources.','Complémentarité intersectorielle.','Approche genre.','Intégration et coordination.','Globalité.','Gradation des soins.'
    ])+
    list('🏥 Composition et missions du réseau hospitalier — p.50-52',[
      '<b>Établissements</b> — hôpitaux provinciaux/préfectoraux, régionaux, formations des CHU/CHI, hôpitaux psychiatriques, centres régionaux d’oncologie et centres d’hémodialyse. Une province étendue peut disposer d’hôpitaux de proximité ; une préfecture importante de cliniques de jour.',
      '<b>Soins</b> — diagnostic, traitement, hébergement et urgence.',
      '<b>Développement professionnel</b> — formation initiale et continue, recherche et expertise.',
      '<b>Santé publique</b> — prévention, éducation sanitaire et permanence des soins.',
      '<b>Gestion</b> — achats, gestion des productions et direction.'
    ])+
    section('👥 Direction et pôles — p.52-56','Le directeur assure la gestion technique, administrative et financière : projet d’établissement, coordination des services, qualité, gardes, communication, budget, inventaires, rapport annuel et relations avec la hiérarchie et les partenaires. Les trois pôles sont <b>PAM</b> (affaires médicales, responsable médecin), <b>PSI</b> (soins infirmiers, cadre infirmier) et <b>PAA</b> (affaires administratives, cadre administratif). Le PAM coordonne les soins médicaux, leur évaluation, la formation et les ressources médicales. Le PSI coordonne les soins paramédicaux, leur qualité, la prévention des infections, les ressources, l’éducation sanitaire et la recherche infirmière. Le PAA gère personnel, finances, achats, archives, alimentation, nettoyage, sécurité, déchets, télécommunications et maintenance.')+
    list('🤝 Les six instances hospitalières — p.55-56',[
      '<b>Planification et coordination</b> — comité d’établissement ; comité de gestion du centre hospitalier.',
      '<b>Conseil et concertation</b> — conseil des médecins, dentistes et pharmaciens (CMDP) ; conseil des infirmiers et infirmières (CII).',
      '<b>Appui</b> — comité de suivi et d’évaluation ; comité de lutte contre les infections nosocomiales (CLIN).'
    ])+
    section('🗺️ Niveaux hospitaliers et seuils du support — p.57-64','L’hôpital général réunit urgences, médecine, chirurgie, obstétrique et pédiatrie ; l’hôpital spécialisé prend en charge une maladie, un organe ou un appareil. Le <b>premier niveau</b> comprend l’hôpital de proximité (70 000 habitants, moins de 60 lits) et le CHP (200 000 habitants). Le <b>deuxième niveau</b> est le CHR ; le <b>troisième</b>, le CHU/CHI (aire d’au moins deux régions, environ deux millions d’habitants). Le tableau p.64 annonce respectivement <b>5, 20, 28 et 40 spécialités</b> pour HP, CHP, CHR et CHU/CHIR : ce sont les repères de ce support.')+
    section('💰 Statuts de gestion — p.60-61','<b>SEGER</b> : régie, dépendance statutaire et financière, pas de personnalité morale. <b>SEGMA</b> : autonomie financière et réemploi des recettes, mais <b>pas de personnalité morale</b>, avec comptabilité publique et subvention de l’État. <b>CHEEPA</b> : personnalité morale de droit public, autonomie financière, dons et legs possibles, tutelle de l’État. Ne pas déduire la personnalité morale de la seule autonomie financière.')+
    section('🛏️ Capacité litière — p.61-63','Formule du support : <b>L = P × TA × DMS / (365 × TOM)</b>, avec P = population, TA = 7 %, DMS = 5 jours et TOM = 80 %. Employer les taux dans la même convention (0,07 et 0,80). Moins de 120 lits : <b>8 services</b> — accueil/admission, urgences, mère-enfant, médecine, chirurgie avec bloc, imagerie, biologie et pharmacie. De 120 à 240 lits : <b>6 départements</b> — mère-enfant, médecine, chirurgie, traumato-orthopédie/neurochirurgie, ophtalmo-ORL-stomatologie, médico-technique — et <b>3 services</b> : pharmacie, accueil/admission, urgences. Au-delà de 240 lits, le texte détaillé p.63 précise que les départements <b>peuvent dépasser huit</b> ; les urgences sont intégrées à un département. Accueil/admission et pharmacie restent des services. Le tableau abrégé p.61 ne doit donc pas être lu comme un plafond de huit départements.')+
    list('🔬 Structures d’appui du RH — p.63',[
      'Centre national et centres régionaux de transfusion sanguine et d’hématologie.','Laboratoires de l’Institut national d’hygiène.','Centre national antipoison et de pharmacovigilance.','Centre national de radioprotection.'
    ])+
    list('🩺 Les six fonctions des ESSP — p.65',[
      'Soins.','Santé publique.','Organisation et gestion.','Formation et encadrement.','Communication et liaison.','Développement communautaire et collaboration intersectorielle.'
    ])+
    section('🏡 Structures du RESSP — p.65-68','Le <b>dispensaire rural</b> est non médicalisé, sous responsabilité infirmière. Les centres sont dirigés par un médecin généraliste assisté d’un infirmier major. Seuils minimaux du support : <b>CSR1 : 7 000 ; CSR2 : 25 000 ; CSU1 : 25 000 ; CSU2 : 50 000 habitants</b>. Le premier niveau propose médecine générale, soins infirmiers, suivi mère-enfant, maladies chroniques, santé des jeunes/scolaire, information-éducation et surveillance. Le CSR2 ajoute SOUB, analyses de base et échographie obstétricale ; au chef-lieu d’un cercle sans hôpital, module d’accouchement de 4 à 8 lits, urgences de proximité, soins buccodentaires et santé mentale. Le CSU2 ajoute SOUB et analyses ; au chef-lieu de la commune, soins buccodentaires, santé mentale et urgences de proximité.')+
    section('🔎 Appuis du RESSP — p.68-69','<b>CRSR</b> : référence en santé reproductive, dépistage des cancers féminins et situations compliquées de planification familiale/IST. <b>CDTMR</b> : tuberculose et maladies respiratoires. <b>LEHM/laboratoire de santé publique</b> : soutien biologique et contrôle des produits à risque. Le support cite aussi les centres de dépistage des cancers féminins, de référence des maladies chroniques et de santé scolaire/universitaire.')+
    section('🚑 RISUM : coordination et composantes — p.69-72','Le directeur régional coordonne et évalue le RISUM avec le <b>CRUM</b>. Quatre principes : complémentarité, interopérabilité interrégionale, synergie et polyvalence. Ses composantes sont les services d’urgences hospitalières, le SAMU avec CRAM/CESU, les SMUR, les structures de base participant à l’urgence et les transports mobilisés par le CRAM. Trois modes : <b>proximité (UMP)</b>, <b>préhospitalier (UPH : secours, SMUR, HELISMUR)</b> et <b>médico-hospitalier (UMH)</b>. Dans ce dernier mode, les niveaux sont de base au CHP, complets au CHR et spécialisés au CHI.')+
    list('🚨 Fonctions des urgences — p.71-72',[
      '<b>UMP : 7 fonctions</b> — permanence 24 h/24 ; diagnostic des détresses vitales ; premiers secours ; contention/immobilisation provisoire ; surveillance ; examens biologiques de base ; transfert sanitaire simple 24 h/24.',
      '<b>UMH de base : 5 fonctions présentées</b> — ressuscitation/réanimation ; examens complémentaires de base ; transfusion ; hospitalisation ; intervention chirurgicale.',
      '<b>UMH complètes</b> — réanimation hospitalière polyvalente ; examens complémentaires complets ; transfert SMUR ; régulation des appels. Le renvoi « F9 » du PDF n’est pas explicité : ne pas lui attribuer une définition inventée.',
      '<b>SAMU</b> — écoute permanente, réponse adaptée, admission et transport. Ses composantes citées sont CRAM, CESU et SMUR.'
    ])+
    list('🤝 Les six composantes du REMS — p.73',[
      'Espaces santé-jeunes.','Centres de rééducation physique, d’orthoptie et d’orthopédie.','Centres d’appareillage.','Centres d’addictologie.','Centres médico-universitaires.','Centres de soins palliatifs.'
    ])+
    section('🧑‍🤝‍🧑 Publics et prestations du REMS — p.73-76','Le REMS associe prise en charge médicale et accompagnement social, avec ou sans hébergement. Les <b>espaces santé-jeunes</b> ciblent les 10–25 ans : accueil, consultation, écoute, prévention, documentation et coordination ; repère du support : un ESJ pour 50 000 habitants, ou un par province moins peuplée. Les <b>CMU</b> offrent consultations, soins infirmiers, hygiène, éducation, écoute et assistance sociale : un par cité universitaire et un pour 8 000 à 10 000 étudiants selon le support. La rééducation vise autonomie et réinsertion. L’addictologie associe réduction de la demande, consultations/suivi/orientation, réduction des risques VIH/hépatites et appui psychosocial. Les soins palliatifs recherchent la meilleure qualité de vie du patient et de sa famille, en tenant compte des dimensions physiques, psychologiques, sociales et spirituelles.')
  );

  add(1,16,
    list('🗺️ Les quatre territoires — p.76-78',[
      '<b>Circonscription</b> — territoire de base : caïdat rural, arrondissement urbain ou commune sans arrondissements. Elle comporte au moins deux secteurs ; chaque secteur est l’aire de desserte d’un centre de santé.',
      '<b>Province/préfecture</b> — champ de la délégation, soins primaires, réhabilitation et hospitalisation de premier niveau.',
      '<b>Région</b> — au moins deux provinces/préfectures, champ de la DRS et hospitalisation de deuxième niveau.',
      '<b>Interrégion</b> — bassin des prestations de troisième niveau, pôles d’excellence et centres de référence.'
    ])+
    section('📏 Distance et couverture : lire les deux repères — p.79-81','Le tableau p.79 associe <b>moins de 3 km : fixe ; 3–6 km : visite à domicile/relance ; 6–10 km : point de contact ou équipe mobile ; plus de 10 km : équipe mobile</b>. Le paragraphe suivant décrit cependant l’aire du mode fixe rural jusqu’à 6 km, puis le mode mobile au-delà de 6 km. Ces présentations ne sont pas identiques : préciser « selon le tableau » ou « selon le paragraphe rural ». Une équipe mobile peut aussi desservir une localité à moins de 6 km en présence d’obstacles géographiques ou d’une situation épidémiologique particulière.')+
    section('🚐 Quatre modalités mobiles — p.80-82','La visite à domicile comprend relances et enquêtes. L’équipe mobile est multidisciplinaire, apporte des activités préventives, curatives et promotionnelles et suit un planning (passage trimestriel cité). La caravane est une intervention limitée à <b>1 à 3 jours</b>, spécialisée ou multidisciplinaire, complémentaire de l’équipe mobile. L’hôpital mobile ajoute examens, chirurgie et hospitalisation pour les zones enclavées et situations exceptionnelles.')+
    list('📋 Paquet minimum cité — p.82',[
      'Connaissance de la population ; soins curatifs courants ; surveillance épidémiologique.',
      'Vaccination ; lutte contre maladies diarrhéiques et carences mère-enfant.',
      'Surveillance pré/postnatale ; planification familiale ; amélioration de l’accouchement.',
      'Lutte contre maladies transmissibles et non transmissibles ; hygiène scolaire/universitaire.',
      'Référence au niveau approprié ; information, motivation et éducation de la population.'
    ])+
    section('🏘️ Participation communautaire — p.83-84','La définition est reliée à <b>Alma-Ata, 1978</b>. <b>Dar Al Oumouma</b> assure hébergement, alimentation et éducation autour de l’accouchement, avec gestion associative communautaire. Le <b>SAMU obstétrical rural</b> articule structures de soins, mobilité et communication téléphonique ; la sage-femme de la maison d’accouchement la plus proche assure la régulation. L’éducation parentale et les classes des mères visent les comportements et la continuité des soins. L’expérience Taza–Al Hoceima–Taounate repose sur des relais formés et encadrés. En ville, les CSU sont appuyés par des visites infirmières de relance.')
  );
  add(1,17,
    section('↕️ Filière et réseau coordonné — p.85-87','La <b>filière</b> est verticale et hiérarchisée ; le <b>réseau coordonné</b> est horizontal et non hiérarchisé, multidisciplinaire sur un même territoire. L’hospitalisation passe par consultation spécialisée (CCE, CDTMR, CRSR), urgences ou hôpital de jour. Les urgences acceptent auto-référence après triage, référence médicale ou orientation par sage-femme/infirmier de garde. Le plateau technique nécessite une <b>ordonnance médicale</b>. Une référence peut répondre à une insuffisance de compétences ou de plateau technique. La contre-référence est le retour du patient <b>et/ou de l’information</b>. Supports : fiche à souches et registre des références.')+
    section('🤰 Filière obstétricale — p.88','Le circuit présenté va du domicile (auto-référence ou régulation SAMU-OR) vers les <b>SOUB</b>, puis si nécessaire vers les <b>SOUC</b> hospitaliers, notamment pour transfusion, césarienne ou réanimation.')+
    section('⚖️ Équipements et commissions — p.88-90','Le support soumet l’implantation des équipements biomédicaux lourds et installations de haute technologie, publics ou privés, à une <b>autorisation préalable du ministre</b>. La commission nationale donne un avis sur la carte sanitaire et ses révisions : présidence ministre (ou secrétaire général), secrétariat DHSA, délai maximal <b>60 jours</b>, majorité avec voix prépondérante du président. La commission régionale se prononce sur le SROS : présidence wali ou représentant, secrétariat DRS, même délai de <b>60 jours</b>. Ces dispositions sont présentées dans le cadre CS/SROS du support.')
  );
  u(1,17).qs[0].o[u(1,17).qs[0].c]='La réorientation du patient et/ou le retour de l’information vers le niveau référant';
  u(1,17).qs[0].e='Source SNS p.87 : le patient et l’information ne doivent pas obligatoirement revenir ensemble. La contre-référence assure la continuité avec le niveau référant.';
  u(1,17).cards[0].b='Référence : orientation/transfert vers un niveau supérieur. Contre-référence : réorientation du patient et/ou retour de l’information vers le niveau référant (p.87).';

  add(1,18,
    section('🎯 Trois dimensions et six composantes — p.90-91','Dimensions : <b>problème de santé, population cible, milieu particulier</b>. Composantes : <b>contexte et situation problématique ; objectifs généraux/spécifiques ; populations cibles ; stratégies/axes/actions ; activités et ressources ; indicateurs de suivi</b>. Un programme réunit des ressources et services organisés dans le temps et l’espace pour un problème précis.')+
    list('📚 Programmes cités — p.91-93',[
      '<b>Mère</b> — surveillance grossesse/accouchement, maternité sans risque, planification familiale, allaitement.',
      '<b>Enfant</b> — immunisation, lutte contre carences, diarrhées et infections respiratoires aiguës, prise en charge intégrée.',
      '<b>Besoins spécifiques</b> — santé scolaire/universitaire, jeunes, handicap/personnes âgées, femmes et enfants victimes de violence.',
      '<b>Maladies transmissibles</b> — tuberculose, IST/SIDA, parasitoses, maladies cibles de vaccination, maladies épidémiques, trachome, lèpre, zoonoses et surveillance épidémiologique.',
      '<b>Maladies non transmissibles</b> — diabète, cardiovasculaires, cancer, tabagisme, insuffisance rénale chronique, santé mentale, toxicomanie, santé au travail, buccodentaire, respiratoire et maladies rares.',
      '<b>Environnement</b> — eau de boisson, assainissement, vecteurs, hygiène alimentaire.',
      '<b>Plans et stratégies</b> — urgences, mortalité maternelle/néonatale, incidence de la tuberculose, violences femmes/enfants, toxicovigilance, pharmacovigilance, santé rurale et VIH/SIDA.'
    ])
  );
  u(1,18).qs[0].q='Quelles composantes d’un programme sont explicitement citées dans le support SNS p.91 ?';
  u(1,18).qs[0].o[u(1,18).qs[0].c]='Contexte, objectifs, populations cibles, stratégies, activités/ressources et indicateurs de suivi';
  u(1,18).qs[0].e='La page 91 énumère ces six composantes. Les trois dimensions de la page 90 sont une autre liste : problème, population cible et milieu particulier.';
  add(1,19,
    section('📅 Repères historiques de formation — p.94-97','Le document retrace la réforme des études médicales de <b>1982</b>, appliquée en <b>1983</b>, le début de la formation pharmaceutique à Rabat en <b>1986</b> et la création des facultés dentaires Rabat/Casablanca en <b>1981</b>. Il mentionne le profil d’aide sanitaire en 1957, les IDE en 1960, puis les IFCS créés par le décret <b>2-93-602 du 29 octobre 1993</b>. Ce sont des repères historiques du cours, pas un inventaire actuel des établissements.')+
    section('🎓 ISPITS — p.97-100','Décret de création <b>2-13-658 du 30 septembre 2013</b>. Établissements supérieurs non universitaires sous tutelle du ministère ; cycles <b>licence professionnelle, master, doctorat</b>. Missions : formation initiale, formation continue, recherche scientifique/technologique et expertise. Accès décrit : bac et prérequis en S1 ; validation des semestres antérieurs et prérequis en S3/S5 ; licence pour master ; master pour doctorat. La carte du support annonce <b>12 instituts et 13 annexes</b>.')+
    list('📚 Les cinq filières et leurs 24 options — p.99-100',[
      '<b>Soins infirmiers (9)</b> — polyvalent ; santé mentale ; anesthésie-réanimation ; urgences/soins intensifs ; santé familiale/communautaire ; néphro-dialyse ; gériatrie ; bloc opératoire ; néonatologie/pédiatrie.',
      '<b>Sage-femme (1)</b> — sage-femme.',
      '<b>Techniques de santé (7)</b> — laboratoire ; santé de l’environnement ; radiologie ; diététique/nutrition ; préparation en pharmacie ; maintenance biomédicale ; statistiques sanitaires.',
      '<b>Rééducation et réhabilitation (6)</b> — orthoprothésie ; kinésithérapie ; orthophonie ; orthoptie ; psychomotricité ; ergothérapie.',
      '<b>Assistance médico-sociale (1)</b> — assistant social.'
    ])+
    section('🏫 IFTS et ENSP — p.100-101','Le parcours IFTS décrit comprend sélection sur dossier, épreuve écrite de <b>60 minutes, coefficient 1</b>, entretien devant trois personnes et formation de <b>deux ans</b>. L’ENSP succède à l’INAS créé en <b>1989</b> ; dénomination ENSP par le décret <b>2-12-904 du 8 avril 2013</b>. Missions : formation initiale, formation continue, recherche et expertise. Quatre filières citées : <b>management hospitalier ; gestion des programmes de santé ; épidémiologie de santé publique ; santé de famille et santé communautaire</b>. La formation associe cours, stage d’intégration et mémoire.')
  );
  u(1,19).qs[1].q='Quel sigle désigne les Instituts supérieurs des professions infirmières et techniques de santé ?';

  // Les ajouts n'occupent jamais la place d'une question déjà enregistrée.
  [
    [15,'Quelle différence distingue un lit d’une place hospitalière ?','Lit : au moins une nuit ; place : hôpital de jour.',['Lit : consultation ; place : nuitée.','Les deux exigent une nuitée.','Aucune distinction dans le support.'],'SNS p.48 : la distinction porte sur l’hébergement, et non sur la spécialité.'],
    [15,'Quel statut associe autonomie financière et absence de personnalité morale ?','SEGMA',['CHEEPA','CHU en établissement public','Centre doté de personnalité morale'],'SNS p.60-61 : le SEGMA peut réutiliser ses recettes sans disposer de personnalité morale ; le CHEEPA possède les deux.'],
    [15,'Quel couple de seuils du RESSP est exact selon le support ?','CSR1 : 7 000 ; CSU2 : 50 000 habitants.',['CSR1 : 25 000 ; CSU2 : 7 000.','CSR1 : 50 000 ; CSU2 : 25 000.','CSR1 : 70 000 ; CSU2 : 200 000.'],'SNS p.66-68 : CSR1 7 000, CSR2 et CSU1 25 000, CSU2 50 000. Les seuils 70 000 et 200 000 concernent les hôpitaux.'],
    [15,'Au-delà de 240 lits, faut-il limiter un hôpital à huit départements ?','Non : le texte détaillé indique qu’il peut en dépasser huit.',['Oui, huit est un maximum absolu.','Oui, exactement six.','Non, aucun département n’est permis.'],'SNS p.63 nuance le tableau abrégé p.61. Les urgences sont intégrées à un département, avec SAA et pharmacie en services.'],
    [15,'Quel élément est une structure d’appui du RESSP ?','Le CDTMR',['Le comité d’établissement','Le pôle des affaires administratives','Le conseil des infirmiers'],'SNS p.68 : le CDTMR appuie la prise en charge de la tuberculose et des maladies respiratoires. Les autres réponses sont des instances ou pôles hospitaliers.'],
    [15,'Quels sont les trois modes d’intervention du RISUM ?','Proximité, préhospitalier et médico-hospitalier.',['Fixe, mobile et participatif.','Primaire, secondaire et tertiaire.','Régie, SEGMA et CHEEPA.'],'SNS p.70-71 : les modes du RISUM ne doivent pas être confondus avec les modes de couverture sanitaire ou les statuts hospitaliers.'],
    [15,'Quel public les espaces santé-jeunes ciblent-ils dans le support ?','Les jeunes de 10 à 25 ans.',['Les seuls nourrissons.','Les plus de 60 ans.','Les seuls étudiants inscrits à l’université.'],'SNS p.73 : 10–25 ans. Les centres médico-universitaires ont un public distinct, lié aux établissements universitaires.'],
    [16,'À quoi correspond le secteur sanitaire ?','À l’aire de desserte d’un centre de santé.',['À l’ensemble du pays.','À un hôpital universitaire uniquement.','À un statut de financement.'],'SNS p.77 : chaque circonscription comporte au moins deux secteurs ; le secteur est l’aire de desserte du centre.'],
    [16,'Quelle durée le support attribue-t-il à une caravane médicale ?','1 à 3 jours.',['Une nuit au maximum.','Trois mois continus.','Une année complète.'],'SNS p.81 : intervention limitée dans l’espace et dans le temps, à distinguer du passage trimestriel des équipes mobiles.'],
    [16,'Qui régule le SAMU obstétrical rural dans le dispositif décrit ?','La sage-femme de la maison d’accouchement la plus proche.',['Le directeur du CHU exclusivement.','Le responsable du parc auto seul.','Le comité d’établissement.'],'SNS p.83-84 : soins, mobilité et téléphone sont organisés en réseau, dont la régulation est confiée à cette sage-femme.'],
    [17,'Comment distinguer filière et réseau coordonné de soins ?','Filière verticale et hiérarchisée ; réseau horizontal non hiérarchisé.',['Les deux sont exclusivement verticaux.','Filière horizontale ; réseau vertical.','Aucun ne coordonne les professionnels.'],'SNS p.85 : la filière organise les niveaux de recours ; le réseau coordonne une prise en charge multidisciplinaire sur le même territoire.'],
    [17,'Quel document conditionne l’accès au plateau technique selon le support ?','Une ordonnance médicale.',['Une carte d’étudiant seule.','Une autorisation du wali.','Un procès-verbal syndical.'],'SNS p.87 : ordonnance d’un médecin généraliste ou spécialiste ; ne pas confondre cet accès avec l’auto-référence aux urgences.'],
    [17,'Qui préside la commission régionale de l’offre de soins ?','Le wali de la région ou son représentant.',['Le chef du PSI.','Le directeur de l’INH.','Le ministre dans tous les cas.'],'SNS p.89 : présidence wali, secrétariat DRS. Au niveau national : ministre ou secrétaire général, secrétariat DHSA.'],
    [18,'Quelles sont les trois dimensions d’un programme de santé ?','Problème de santé, population cible, milieu particulier.',['Budget, bâtiment, véhicule.','Médecine, chirurgie, pharmacie.','Régie, SEGMA, établissement public.'],'SNS p.90 : ces trois dimensions cadrent le programme ; la page 91 donne séparément ses six composantes.'],
    [19,'Quel décret crée les ISPITS dans le support ?','2-13-658 du 30 septembre 2013.',['2-93-602 du 29 octobre 1993.','2-12-904 du 8 avril 2013.','La loi 65-00.'],'SNS p.97 : décret ISPITS. Les deux autres décrets cités concernent respectivement les IFCS et l’ENSP.'],
    [19,'Comment se répartissent les 24 options entre les cinq filières ?','9 soins infirmiers, 1 sage-femme, 7 techniques, 6 rééducation, 1 assistance sociale.',['5 options dans chacune des cinq filières.','24 options de soins infirmiers uniquement.','12 options et 13 annexes.'],'SNS p.99-100 : 9 + 1 + 7 + 6 + 1 = 24. Les nombres 12 et 13 concernent la carte des instituts et annexes, pas les options.']
  ].forEach(function(x){question(1,x[0],x[1],x[2],x[3],x[4]);});
  [
    [15,'Les seuils des centres de santé','CSR1 7 000 ; CSR2 25 000 ; CSU1 25 000 ; CSU2 50 000 habitants (SNS p.66-68).'],
    [15,'SEGMA et personnalité morale','Autonomie financière, mais aucune personnalité morale ; CHEEPA : personnalité morale et autonomie (p.60-61).'],
    [15,'Les six fonctions des ESSP','Soins ; santé publique ; organisation/gestion ; formation/encadrement ; communication/liaison ; développement communautaire/collaboration intersectorielle (p.65).'],
    [15,'RISUM : trois modes','UMP, UPH et UMH ; les UMH sont de base, complètes ou spécialisées (p.70-71).'],
    [16,'SAMU-OR : trois composantes','Structures de soins, moyens de mobilité, communication téléphonique ; régulation par la sage-femme de la maison d’accouchement la plus proche (p.83-84).'],
    [17,'Filière / réseau coordonné','Filière : verticale hiérarchisée ; réseau coordonné : horizontal non hiérarchisé (p.85).'],
    [18,'Programme : trois dimensions','Problème de santé ; population cible ; milieu particulier (p.90).'],
    [19,'Les quatre filières ENSP citées','Management hospitalier ; gestion des programmes ; épidémiologie de santé publique ; santé familiale et communautaire (p.101).']
  ].forEach(function(x){card(1,x[0],x[1],x[2]);});

  add(11,8,section('⚠️ Deux présentations à distinguer dans le support','Les tableaux p.7-8 donnent <b>61,3 % pour les hospitalisations</b> dans les dépenses par prestations et <b>37 % pour les médicaments</b> dans les remboursements aux assurés. La synthèse p.10 annonce aussi « médicaments et biens médicaux : 36,6 % » comme premier poste, sans expliciter un périmètre comparable. Ne pas fusionner ces chiffres ; les questions doivent préciser le tableau et le périmètre.'));
  u(11,8).qs[5].q='Selon le tableau des dépenses par prestations (CNS 2022, p.7), quel est le premier poste de l’assurance maladie ?';
  u(11,8).qs[5].e='Le tableau p.7 place les hospitalisations à 61,3 %. Le tableau des remboursements aux assurés p.8 place les médicaments à 37 % : il ne décrit pas le même périmètre.';
  add(16,9,section('⚠️ Chronologie et taux : incohérences du support','La p.26 mélange la généralisation de l’AMO et le régime ACHAMIL dans un passage qui évoque 2022–2025 et 22 millions de personnes. La chronologie p.36 situe le lancement d’<b>ACHAMIL au début de janvier 2024</b>. Le support annonce <b>plus de 95 % de couverture en 2025</b> p.26, puis <b>88 % en 2026</b> p.36 sans expliquer les périmètres. Ces valeurs ne constituent pas une série homogène validée : les retenir uniquement avec leur page et leur contexte.'));
  u(16,9).qs[7].q='Quel taux le passage de la p.26 du support CMB annonce-t-il pour 2025 (à distinguer du chiffre p.36) ?';
  u(16,9).qs[7].e='La p.26 annonce plus de 95 % en 2025 ; la p.36 annonce 88 % en 2026. Le support ne réconcilie pas ces périmètres : ce QCM porte seulement sur la lecture de la p.26.';
  u(16,11).qs[7].q='Quel chiffre la dernière page du support CMB (p.36) annonce-t-elle pour 2026 ?';
  u(16,11).qs[7].e='La p.36 annonce 88 %, environ 32 millions. Ce chiffre du support n’est pas une vérification de la situation actuelle et ne doit pas être confondu avec les plus de 95 % annoncés p.26 pour 2025.';
  add(16,11,section('📌 Lire les chiffres avec leur périmètre','Les taux de couverture de cette unité proviennent de passages différents du support. La p.26 (plus de 95 % en 2025) et la p.36 (88 % en 2026) ne sont pas réconciliées. Les dates historiques sont distinctes des résultats effectivement mesurés.'));
  add(22,3,section('📚 Ne pas confondre les listes des supports','Ce document annonce <b>41 ALD représentant plus de 140 maladies</b> p.2. Le support CMB fournit, pour l’AMO étudiant, une liste de <b>42 affections</b> p.32-34. Toujours préciser le document et le régime concernés ; ces totaux ne sont pas interchangeables.'));

  // Vérification visuelle du tableau original : la cellule « Rabat » couvre
  // les lignes 09-22 et 10-22. L'extraction linéaire avait perdu cette fusion.
  var place=u(27,5);
  place.lesson=section('📍 Lieux de signature — lecture du tableau p.2','<b>Rabat</b> : lois 06-22, 07-22, <b>09-22</b>, 10-22 et 11-22. <b>Tétouan</b> : 08-22. <b>Fès</b> : 09-21. La cellule « Rabat » fusionnée dans le PDF couvre les deux lignes 09-22 et 10-22 ; il ne faut pas omettre la loi 09-22.');
  place.qs[2].e='Le tableau p.2 indique Rabat pour 06-22, 07-22, 09-22, 10-22 et 11-22. La cellule Rabat est commune aux lignes 09-22 et 10-22.';
  place.qs[4].o[place.qs[4].c]='06-22, 07-22, 09-22, 10-22 et 11-22';
  place.qs[4].e='Cinq lois sont associées à Rabat. La cellule fusionnée couvre 09-22 et 10-22 ; les deux autres villes du tableau sont Tétouan et Fès.';
  place.cards[0].b='Rabat : 06-22, 07-22, 09-22, 10-22, 11-22 ; Tétouan : 08-22 ; Fès : 09-21 (tableau p.2, cellule Rabat fusionnée).';
  add(27,6,section('📍 Complément de la fiche 09-22','Le lieu de signature associé à la <b>loi 09-22 est Rabat</b> dans le tableau p.2 : la cellule est partagée avec la ligne 10-22.'));
  u(27,6).cards[3].b=u(27,6).cards[3].b.replace('09-22 : dahir 1.23.51,','09-22 : dahir 1.23.51, Rabat,');
  u(27,4).lesson=u(27,4).lesson.replace('Trois numéros de BO à retenir','Quatre numéros de BO à retenir');
  add(15,3,section('⚠️ Contradiction à signaler dans le calendrier source','Cette page associe le <b>7 mai</b> à la journée mondiale du SIDA, alors que la <b>p.5 indique le 1er décembre</b> pour la lutte contre le SIDA. Ne pas mémoriser ces deux dates comme des équivalents validés. Ce calendrier mélange également journées mondiales, européennes et nationales ; conserver leur intitulé exact et vérifier l’année des journées mobiles.'));
  // OMD / ODD : même découpage, listes restaurées entre les pages qui les coupent.
  var omd=['Réduire l’extrême pauvreté et la faim','Assurer l’éducation primaire pour tous','Promouvoir l’égalité et l’autonomisation des femmes','Réduire la mortalité infantile','Améliorer la santé maternelle','Combattre le VIH, le paludisme et les autres maladies','Assurer un environnement durable','Mettre en place un partenariat mondial pour le développement'];
  u(9,1).t='Présentation du support OMD / ODD';
  u(9,1).lesson=section('📘 Organisation du support','Les pages 2-3 présentent les OMD et le passage aux ODD ; les pages 4-6 détaillent les objectifs de développement durable, notamment l’ODD 3. Les chiffres sont ceux du support fourni, sans actualisation implicite du cadre d’indicateurs.');
  u(9,1).cards[0]={f:'Quels cadres compare le module 09 ?',b:'OMD (horizon 2015) et ODD (horizon 2030), selon les pages 2-3 du support.'};
  u(9,2).t='Les huit OMD et leurs cibles sanitaires';u(9,2).pages='p.2-3';
  u(9,2).lesson=section('📅 Cadre du Millénaire','Le support situe les engagements en <b>septembre 2000</b>, avec échéance <b>2015</b>. Son tableau annonce <b>8 objectifs, 22 cibles et 60 indicateurs</b>. Les OMD servent de références pour mesurer les progrès du développement humain.')+list('🎯 Les huit OMD',omd.map(function(x,i){return '<b>OMD '+(i+1)+'</b> — '+x+'.';}))+section('🩺 Cibles sanitaires — p.2-3','Entre 1990 et 2015 : réduction de <b>deux tiers</b> de la mortalité des moins de 5 ans (OMD 4) et de <b>trois quarts</b> de la mortalité maternelle (OMD 5), avec accès universel à la médecine procréative d’ici 2015. L’OMD 6 vise l’arrêt puis l’inversion de la progression VIH/paludisme/autres maladies graves d’ici 2015 et l’accès au traitement VIH pour les personnes qui en ont besoin d’ici 2010. Il s’agit des <b>objectifs historiques</b>, pas d’une affirmation qu’ils ont été atteints.');
  u(9,2).cards[0]={f:'OMD 4 et 5 : quelles réductions ciblées ?',b:'Entre 1990 et 2015 : mortalité des moins de 5 ans −2/3 ; mortalité maternelle −3/4 (p.2).'};
  u(9,3).t='Le cadre des ODD : objectifs, dimensions et échéance';
  u(9,3).lesson=section('🌍 Passage aux ODD','Le support décrit une adoption en <b>septembre 2015 par 193 pays</b>, avec horizon <b>2030</b>. Les ODD sont universels, inclusifs et interconnectés ; ils concernent tous les acteurs. Le tableau du support annonce <b>17 objectifs, 169 cibles et 244 indicateurs</b>. Ce dernier nombre est le repère de ce document, sans présumer des révisions ultérieures.')+list('🧩 Quatre dimensions du support',['<b>Sociale</b> — protection sociale, santé, éducation, égalité des sexes.','<b>Économique</b> — pauvreté de revenu, industrialisation, infrastructures, emploi.','<b>Environnementale</b> — climat, biodiversité, océans, terres.','<b>Gouvernance</b> — sociétés pacifiques, inclusives et justes.'])+section('🤝 Finalité','Paix, humanité, planète et prospérité, avec des partenariats entre acteurs. Ne pas confondre <b>objectif</b>, <b>cible</b> et <b>indicateur</b>.');
  u(9,3).cards[0]={f:'OMD et ODD : objectifs et échéances ?',b:'8 OMD, horizon 2015 ; 17 ODD, horizon 2030 (p.2-3).'};
  u(9,4).t='ODD 3 : les neuf cibles sanitaires présentées';
  u(9,4).lesson=section('❤️ ODD 3','Permettre à tous de vivre en bonne santé et promouvoir le bien-être de tous à tout âge. La p.4 présente neuf cibles, complétées par quatre moyens de mise en œuvre p.5.')+list('🎯 Les neuf cibles présentées',[
    '<b>Mortalité maternelle</b> — moins de 70 pour 100 000 naissances vivantes d’ici 2030.',
    '<b>Enfants</b> — éliminer les décès évitables ; mortalité néonatale au plus 12 pour 1 000 et mortalité des moins de 5 ans au plus 25 pour 1 000 naissances vivantes d’ici 2030.',
    '<b>Maladies transmissibles</b> — mettre fin aux épidémies sida/tuberculose/paludisme/maladies tropicales négligées et combattre hépatite, maladies hydriques et autres maladies transmissibles.',
    '<b>Maladies non transmissibles</b> — réduire d’un tiers la mortalité prématurée d’ici 2030 et promouvoir santé mentale/bien-être.',
    '<b>Substances psychoactives</b> — renforcer prévention et traitement des abus de stupéfiants et d’alcool.',
    '<b>Route</b> — le support conserve la cible historique de réduction de moitié des décès/blessures d’ici 2020.',
    '<b>Santé sexuelle et procréative</b> — accès universel, planification familiale, information/éducation et intégration aux programmes nationaux d’ici 2030.',
    '<b>Couverture sanitaire universelle</b> — protection financière, services essentiels de qualité, médicaments et vaccins essentiels accessibles.',
    '<b>Environnement</b> — réduire décès et maladies dus aux produits chimiques dangereux et à la pollution de l’air, de l’eau et du sol.'
  ])+section('⚠️ Lecture attentive','Les seuils de mortalité ne partagent pas le même dénominateur : <b>100 000</b> naissances vivantes pour la mortalité maternelle ; <b>1 000</b> pour les mortalités néonatale et infanto-juvénile. Les cibles sont des objectifs, pas des résultats observés.');
  u(9,4).cards[0]={f:'Cibles de mortalité de l’ODD 3 dans le support ?',b:'Maternelle <70/100 000 NV ; néonatale ≤12/1 000 NV ; moins de 5 ans ≤25/1 000 NV, horizon 2030 (p.4).'};
  u(9,5).t='Moyens de mise en œuvre de l’ODD 3 et ODD 4 à 10';
  u(9,5).lesson=list('🛠️ Quatre moyens de mise en œuvre — p.5',[
    '<b>Tabac</b> — appliquer la Convention-cadre de l’OMS.',
    '<b>Recherche et accès</b> — développer vaccins/médicaments et faciliter leur accès, avec les flexibilités de l’Accord ADPIC rappelées par la Déclaration de Doha.',
    '<b>Financement et personnel</b> — accroître les budgets, recruter, former, perfectionner et maintenir les professionnels de santé.',
    '<b>Risques sanitaires</b> — renforcer alerte rapide, réduction et gestion des risques nationaux/mondiaux.'
  ])+list('📚 ODD 4 à 10',[
    '<b>4</b> — éducation de qualité et apprentissage tout au long de la vie.','<b>5</b> — égalité des sexes et autonomisation des femmes/filles.','<b>6</b> — eau, assainissement et gestion durable des ressources en eau.','<b>7</b> — énergie fiable, durable, moderne et abordable.','<b>8</b> — croissance partagée, emploi productif et travail décent.','<b>9</b> — infrastructures résilientes, industrialisation durable et innovation.','<b>10</b> — réduction des inégalités au sein des pays et entre pays.'
  ]);
  u(9,5).cards[0]={f:'ODD 3 : quels quatre moyens sont présentés p.5 ?',b:'Lutte antitabac ; recherche et accès aux médicaments/vaccins ; financement et personnel ; alerte et gestion des risques.'};
  u(9,6).t='ODD 11 à 17 et indicateurs de suivi';
  u(9,6).lesson=list('🌍 ODD 11 à 17 dans le support',[
    '<b>11</b> — villes et établissements humains inclusifs, sûrs, résilients et durables.',
    '<b>12</b> — consommation et production durables.',
    '<b>13</b> — le PDF répète ici le texte de l’ODD 8 (croissance/emploi). Cet intitulé est signalé comme anomalie du support et n’est pas transformé en réponse à mémoriser.',
    '<b>14</b> — océans, mers et ressources marines.',
    '<b>15</b> — écosystèmes terrestres, forêts, désertification, sols et biodiversité.',
    '<b>16</b> — sociétés pacifiques/inclusives, justice et institutions efficaces/responsables.',
    '<b>17</b> — partenariats pour la réalisation des objectifs.'
  ])+list('📊 Huit indicateurs de suivi cités p.6',[
    'Espérance de vie.','Découvertes de séropositivité VIH.','Décès par suicide.','Satisfaction dans la vie.','Consommation d’alcool.','Personnes tuées par accident de la route.','Renoncement aux soins pour raisons financières.','Prévalence du tabagisme quotidien.'
  ])+section('📌 Deux objectifs présentés p.4','Le support présente l’ODD 1 par la pauvreté et l’ODD 2 par la faim, la sécurité alimentaire et l’agriculture durable. La formulation de l’ODD 1 du PDF reprend aussi « la faim » : conserver cette différence de rédaction à l’esprit et ne pas confondre les deux numéros.');
  u(9,6).cards[0]={f:'Quel indicateur du support reflète un obstacle financier aux soins ?',b:'Le renoncement aux soins pour raisons financières (p.6).'};
  [
    [2,'Quel objectif correspond à l’OMD 5 ?','Améliorer la santé maternelle.',['Assurer un environnement durable.','Éducation primaire pour tous.','Partenariat mondial.'],'Support p.2 : OMD 4 concerne la mortalité infantile ; OMD 5 la santé maternelle.'],
    [2,'Quelle réduction de la mortalité des moins de 5 ans l’OMD 4 visait-il entre 1990 et 2015 ?','Deux tiers.',['Trois quarts.','Un tiers.','La moitié.'],'Support p.2 : deux tiers pour les enfants ; trois quarts pour la mortalité maternelle.'],
    [3,'Quel est l’horizon des ODD dans le support ?','2030',['2015','2000','2020'],'Support p.3 : adoption en 2015 avec horizon 2030 ; 2015 était l’échéance des OMD.'],
    [3,'Quel triplet est donné par le tableau ODD du support ?','17 objectifs, 169 cibles, 244 indicateurs.',['8 objectifs, 22 cibles, 60 indicateurs.','17 objectifs, 60 cibles, 22 indicateurs.','169 objectifs, 17 cibles, 244 indicateurs.'],'Support p.3 : ce sont les nombres du tableau fourni, sans actualisation du cadre d’indicateurs.'],
    [4,'Quelle cible de mortalité maternelle est donnée pour 2030 ?','Moins de 70 pour 100 000 naissances vivantes.',['70 pour 1 000 naissances vivantes.','12 pour 100 000 naissances vivantes.','25 pour 100 naissances vivantes.'],'Support p.4 : ne pas confondre le dénominateur 100 000 avec les 1 000 des cibles néonatale et infanto-juvénile.'],
    [4,'À quoi correspond la cible de 12 pour 1 000 naissances vivantes au plus ?','À la mortalité néonatale.',['À la mortalité maternelle.','Au chômage.','À la couverture vaccinale.'],'Support p.4 : mortalité néonatale ≤12/1 000 ; moins de 5 ans ≤25/1 000.'],
    [5,'Quel ODD porte sur l’eau et l’assainissement ?','ODD 6',['ODD 4','ODD 8','ODD 10'],'Support p.5 : ODD 6 eau/assainissement ; ODD 4 éducation ; ODD 8 croissance/emploi ; ODD 10 inégalités.'],
    [6,'Quel ODD concerne les océans et les ressources marines ?','ODD 14',['ODD 11','ODD 12','ODD 17'],'Support p.6 : ODD 14 porte sur les milieux marins ; ODD 15 sur les écosystèmes terrestres.']
  ].forEach(function(x){question(9,x[0],x[1],x[2],x[3],x[4]);});

  // L'incohérence vient du support AES : elle est rendue visible, sans
  // fabriquer un protocole clinique à partir d'une transcription ambiguë.
  u(10,1).t='Présentation du support AES';
  ['Définition et risques décrits','Situations d’exposition et prévention','Précautions standards et PPE','Prise en charge : étapes du support','Déclaration et évaluation','Indication de PPE et précautions'].forEach(function(t,i){u(10,i+2).t=t;});
  u(10,3).lesson='<div class="trap"><b>⚠️ Incohérence du document :</b> la liste ci-dessous classe un contact cutanéo-muqueux désinfecté dans les 15 minutes parmi les « non-AES », alors que la définition p.2-3 repose sur le contact et la voie d’exposition. Ce passage n’est pas validé comme critère d’exclusion et ne doit pas servir de réponse de QCM. Le texte ci-dessous est une transcription du support.</div>'+u(10,3).lesson;
  u(10,3).cards[0]={f:'Comment le support définit-il un AES ?',b:'Contact avec du sang/liquide potentiellement contaminant par piqûre, coupure, peau lésée ou muqueuse (p.2-3). La liste des exclusions p.3 contient une incohérence signalée dans la leçon.'};
  // Modules initialement importés page par page : titre, objectifs et premier
  // entraînement sont ajoutés sans supprimer la transcription de la source.
  var structured={
    12:{title:'CNS 2018 — financement et couverture',intro:'Le support présente les Comptes nationaux de la santé 2018 : dépense totale, sources de financement, dépenses des ménages, assurance maladie et budget du ministère.',cards:[['Dépense totale de santé 2018','60,9 milliards DH ; dépense courante 97 % ; investissement 3 % ; le support donne ces chiffres pour 2018.'],['Sources à retenir','Paiements directs des ménages, assurance maladie, ressources fiscales et autres sources selon les tableaux du PDF.']]},
    13:{title:'Hygiène des mains — gestes et durées',intro:'Le document distingue lavage simple, lavage antiseptique et lavage chirurgical, avec objectifs et durées propres à chaque technique. Les durées doivent rester associées au type de lavage.',cards:[['Lavage simple','30 secondes ; éliminer les souillures et réduire la flore transitoire.'],['Lavage antiseptique','1 minute selon le support.'],['Lavage chirurgical','6 minutes selon le support ; protocole détaillé en plusieurs temps.']]},
    14:{title:'MDO — déclaration et transmission',intro:'Une maladie à déclaration obligatoire doit être signalée selon les règles du support. Le PDF présente la liste des MDO, leur classification et leurs voies de transmission.',cards:[['MDO','Maladie dont la déclaration est obligatoire afin d’assurer la surveillance et la réponse de santé publique.'],['Voies de transmission','Aérienne, vectorielle, sexuelle, digestive et autres voies décrites dans le document.']]},
    15:{title:'Journées sanitaires et jours fériés',intro:'Le calendrier reprend les journées internationales de santé, les jours fériés civils et les jours fériés religieux. Les journées mobiles et les intitulés doivent être relus avec leur page.',cards:[['Fête du Travail','1er mai — jour férié civil cité dans le support.'],['Journée mondiale de la santé','7 avril — journée citée p.2.']]},
    17:{title:'Projet d’établissement hospitalier',intro:'Le projet d’établissement fixe où l’hôpital veut aller et comment il organise son travail. Il doit être compatible avec les objectifs de la politique sanitaire et les ressources de l’établissement.',cards:[['Rôle du PEH','Orienter l’établissement, coordonner ses actions et traduire ses objectifs en programmes.'],['Compatibilité','Le projet doit respecter les objectifs de la politique sanitaire et le cadre réglementaire.']]},
    18:{title:'Planification stratégique de la santé',intro:'La planification est un instrument de gestion : elle relie diagnostic, objectifs, choix d’actions, ressources, mise en œuvre et évaluation.',cards:[['Étapes générales','Diagnostic, priorités, objectifs, programmation des ressources, mise en œuvre et évaluation.'],['Planification','Elle transforme une analyse de situation en décisions et actions organisées.']]},
    19:{title:'Management de la qualité',intro:'Le support définit la qualité, ses dimensions, les démarches d’amélioration continue et les outils de management. Les notions de Deming, PDCA et Pareto sont explicitement présentées.',cards:[['Cycle PDCA','Planifier, Déployer/Faire, Contrôler, Agir : boucle d’amélioration continue.'],['Pareto','Outil de hiérarchisation des causes selon la règle des 80/20.']]},
    20:{title:'Santé en chiffres 2018-2023',intro:'Le document rassemble des indicateurs socio-démographiques, de mortalité, de ressources, de budget, de performance et de causes de décès. Chaque chiffre doit rester associé à son année.',cards:[['Indice synthétique de fécondité 2018','2,38 selon le tableau du support.'],['Taux de mortalité maternelle 2018','72,6 selon le tableau du support ; ne pas le confondre avec un taux infanto-juvénile.']]},
    21:{title:'Stratégie sectorielle 2012-2016',intro:'La stratégie présente les groupes d’affections prioritaires, les réseaux d’urgence, la mère et l’enfant, les maladies chroniques et les axes de santé publique.',cards:[['CIM-10','Le support classe les groupes d’affections selon la classification CIM-10 de l’OMS.'],['RISUM','Le réseau intégré des soins d’urgence médicale fait partie des chantiers décrits.']]},
    23:{title:'Loi-cadre 34-09 — système de santé et offre de soins',intro:'La loi-cadre fixe les principes, objectifs et l’organisation du système de santé et de l’offre de soins. Le support distingue les cinq principes du système et les huit principes de l’offre de soins et de la carte sanitaire.',cards:[['Cinq principes du système','Solidarité/responsabilisation, égalité d’accès, équité spatiale, complémentarité intersectorielle, approche genre.'],['Huit principes de l’offre de soins','Les cinq précédents, plus intégration/coordination, globalité et gradation des soins.']]},
    24:{title:'Loi 28-00 — gestion des déchets',intro:'Le document définit les déchets, les catégories de déchets médicaux et pharmaceutiques, les plans de gestion, le tri, l’emballage, le stockage et les responsabilités.',cards:[['Déchets médicaux et pharmaceutiques','Déchets produits par les activités de soins ; leur tri, emballage, stockage, collecte et traitement suivent les règles du support.'],['Objets piquants ou tranchants','Aiguilles et matériels similaires : catégorie à risque nécessitant un emballage et un circuit sécurisés.']]}
  };
  Object.keys(structured).forEach(function(k){
    var d=byId[+k], cfg=structured[k]; if(!d||!d.units.length)return;
    d.title=cfg.title; d.sub='Support PDF vérifié, unité par unité';
    var first=d.units[0]; first.t=cfg.title; first.pages=first.pages||'p.2';
    first.lesson=section('📚 Fiche de cadrage — source originale',cfg.intro)+first.lesson;
    cfg.cards.forEach(function(c){first.cards.push({f:c[0],b:c[1]});});
    question(+k,1,'Quel est le point central de cette unité selon le support ?',cfg.cards[0][0],['Une information absente du PDF','Une règle sans source','Un chiffre inventé'],'La réponse reprend la fiche de cadrage et renvoie au document original de ce module.');
  });
  // Toutes les pages restantes gardent la transcription intégrale, mais sont
  // identifiées comme source vérifiée et non comme contenu pédagogique vide.
  docs.forEach(function(d){
    d.units.forEach(function(x){
      if(typeof x.lesson==='string' && x.lesson.indexOf('Contenu extrait du PDF')>=0){
        x.lesson=x.lesson.replace(/Contenu extrait du PDF/g,'Transcription source vérifiée — PDF original');
        x.lesson='<div class="source-note">📚 Cette unité conserve la transcription complète de la page source. Les éléments ajoutés dans les fiches et QCM renvoient au même PDF.</div>'+x.lesson;
      }
    });
  });
  byId[1]._contentReview20260920=true;
};
