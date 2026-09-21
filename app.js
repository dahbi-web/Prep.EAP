/* ==========================================================================
   Concours de santé — moteur de l'application
   Révision type "Duolingo" pour le concours (licence) — 31 modules
   Aucune dépendance externe. Fonctionne hors-ligne.
   ========================================================================== */
(function () {
"use strict";

/* ------------------------------------------------------------------ data */
var DOCS = (window.CNC_DATA && window.CNC_DATA.docs) || [];
// Doc 1 : afficher précisément la couverture réellement disponible.
var SNS_DOC = DOCS.find(function (x) { return x.id === 1; });
if (SNS_DOC) {
  SNS_DOC.sub = 'Système National de Santé — Doc 1 complet (p.2-101)';
  if (!SNS_DOC.units.some(function (u) { return u.pages === 'p.48-76'; })) {
    SNS_DOC.units.push(
      {t:'Directions centrales et services assimilés',ic:'🏛️',pages:'p.30-39',lesson:'<h3>🏛️ Directions centrales du Ministère</h3><p>La <b>DPRF</b> contribue à la planification sanitaire, aux études, à la carte sanitaire, au budget, à la comptabilité, à l’économie de la santé et à la coopération. La <b>DRH</b> gère notamment le recrutement, l’affectation, la formation, les postes, les congés maladie et les œuvres sociales.</p><p>La <b>DELM</b> assure la surveillance épidémiologique, les programmes de lutte contre les maladies, la protection du milieu, le contrôle sanitaire des denrées alimentaires et la radioprotection. La <b>DMP</b> encadre les médicaments : normes, prix, qualité, médicaments essentiels, visas, autorisations et inspection.</p><h3>🏥 Autres directions et divisions</h3><p>La <b>Direction de la population</b> porte notamment la planification familiale, la santé maternelle et infantile, la santé scolaire et universitaire, la réhabilitation, la gériatrie et l’IEC. La <b>DHSA</b> coordonne les hôpitaux, les soins ambulatoires, les urgences, l’assistance et la transfusion. La <b>DEM</b> suit bâtiments, équipements biomédicaux, maintenance et patrimoine. La réglementation et le contentieux traitent les textes juridiques, les litiges et les professions réglementées.</p><p>S’ajoutent l’approvisionnement en médicaments et produits de santé, la protection sociale des travailleurs, le parc auto, l’approvisionnement et l’informatique. Les services assimilés cités sont notamment l’INH, le CNTSH, le Centre national de radioprotection, l’ENSP, le CAPM, le LNCM, l’Institut Pasteur Maroc et le Laboratoire national de virologie.</p>',qs:[{q:'Quelle direction contribue à la planification sanitaire, à la carte sanitaire et à la gestion budgétaire ?',o:['La DPRF','La DELM','La DP','La DEM'],c:0,e:'La Direction de la planification et des ressources financières couvre planification, études, carte sanitaire, budget, comptabilité et coopération.'},{q:'Quelle direction gère le recrutement, l’affectation et la formation du personnel ?',o:['La DRH','La DMP','La DHSA','La DELM'],c:0,e:'La Direction des ressources humaines assure notamment recrutement, affectation, administration du personnel et formation.'},{q:'La surveillance épidémiologique centrale relève principalement de :',o:['La DELM','La DPRF','La DEM','La Direction de la population'],c:0,e:'La DELM tient le fichier épidémiologique central et conçoit les programmes de lutte contre les maladies.'},{q:'Quelle direction fixe le cadre des prix et contrôle la qualité des médicaments ?',o:['La DMP','La DRH','La DHSA','La DP'],c:0,e:'La Direction du médicament et de la pharmacie encadre prix, normes, qualité, visas et autorisations.'},{q:'La santé maternelle et infantile et la planification familiale relèvent de :',o:['La Direction de la population','La DEM','La DPRF','La Division du parc auto'],c:0,e:'Ces programmes figurent parmi les attributions de la Direction de la population.'},{q:'Quelle direction coordonne les actions hospitalières, les soins ambulatoires et les urgences ?',o:['La DHSA','La DMP','La DRH','La DPRF'],c:0,e:'La Direction des hôpitaux et des soins ambulatoires suit les hôpitaux, le réseau ambulatoire, les urgences et l’assistance.'},{q:'Les projets de bâtiments et les équipements biomédicaux relèvent principalement de :',o:['La DEM','La DELM','La DP','La DMP'],c:0,e:'La Direction des équipements et de la maintenance suit les bâtiments, équipements biomédicaux, maintenance et patrimoine.'},{q:'Lequel est cité comme service assimilé à un service central ?',o:['L’Institut national d’hygiène','Une délégation provinciale','Un centre de santé rural','Un hôpital de proximité'],c:0,e:'L’INH figure dans la liste des services assimilés à des services centraux.'}],cards:[{f:'DPRF','b':'Planification sanitaire · études · carte sanitaire · budget · comptabilité · économie de la santé · coopération'},{f:'DRH','b':'Recrutement · affectation · gestion du personnel · formation · postes · congés maladie · œuvres sociales'},{f:'DELM','b':'Surveillance épidémiologique · lutte contre les maladies · santé environnementale · radioprotection · contrôle sanitaire'},{f:'DMP','b':'Normes, prix, qualité et contrôle des médicaments · liste des médicaments essentiels · visas et autorisations'},{f:'DHSA','b':'Hôpitaux · soins ambulatoires · urgences · assistance · transfusion sanguine'},{f:'DEM','b':'Bâtiments · équipements biomédicaux · maintenance · patrimoine · investissement'}]},
      {t:'Administration périphérique : DRS, délégations et SRES',ic:'🗺️',pages:'p.40-47',lesson:'<h3>🗺️ Services extérieurs</h3><p>L’administration périphérique comprend les <b>directions régionales de la santé</b> et les <b>délégations préfectorales et provinciales</b>. Le document indique <b>12 DRS</b> et <b>82 délégations</b>. La DRS met en œuvre la politique nationale de santé dans la région et sert de relais entre les délégations et l’administration centrale.</p><p>Ses missions couvrent la santé publique et la veille sanitaire, la planification stratégique, les finances, les ressources humaines, la coordination des établissements et la disponibilité des médicaments. Elle comprend six services : santé publique, offre de soins, observatoire régional, ressources financières/logistique/partenariat, ressources humaines/contentieux, équipements/maintenance ; ainsi que deux unités régionales : approvisionnement/pharmacie et communication/information.</p><h3>🏢 Délégations et SRES</h3><p>La délégation applique la politique de santé au niveau provincial ou préfectoral. Elle est placée sous l’autorité d’un délégué et comprend notamment un service administratif et économique et le <b>SRES</b>.</p><p>Le SRES encadre le RESSP, coordonne les réseaux et les filières de soins et comporte quatre unités : <b>planification, suivi et évaluation</b> ; <b>veille, sécurité sanitaire et santé environnementale</b> ; <b>coordination des réseaux de santé</b> ; <b>pharmacie</b>. L’unité de coordination organise la référence/contre-référence ; l’unité de pharmacie sécurise tout le cycle des médicaments et supervise leur usage rationnel et la stérilisation dans les ESSP.</p>',qs:[{q:'Les services déconcentrés du ministère sont constitués de :',o:['DRS et délégations préfectorales/provinciales','DPRF et DRH','CHU uniquement','Communes uniquement'],c:0,e:'L’administration périphérique repose sur les directions régionales et les délégations préfectorales et provinciales.'},{q:'Combien de directions régionales de la santé le document indique-t-il ?',o:['12','6','8','82'],c:0,e:'Le document indique 12 directions régionales de la santé.'},{q:'Combien de délégations préfectorales et provinciales sont indiquées ?',o:['82','12','31','6'],c:0,e:'Le document indique 82 délégations.'},{q:'Quel service de la DRS collecte et analyse les informations sanitaires régionales ?',o:['L’Observatoire régional de la santé','Le service des équipements','L’unité de pharmacie','Le parc auto'],c:0,e:'L’Observatoire régional collecte, analyse et évalue les informations et indicateurs sanitaires régionaux.'},{q:'La délégation provinciale ou préfectorale est placée sous l’autorité de :',o:['Un délégué nommé par le ministre','Un pharmacien régional','Le président de commune','Le directeur de l’INH'],c:0,e:'Chaque délégation est placée sous l’autorité d’un délégué nommé par le ministre de la santé.'},{q:'Combien d’unités fonctionnelles composent le SRES ?',o:['4','2','6','8'],c:0,e:'Le SRES comporte quatre unités fonctionnelles.'},{q:'Quelle unité du SRES organise la référence et la contre-référence ?',o:['L’unité de coordination des réseaux de santé','L’unité de pharmacie','L’unité des finances','L’unité du parc auto'],c:0,e:'Cette unité facilite le parcours des patients et coordonne les réseaux, filières et mécanismes de référence/contre-référence.'},{q:'L’unité de pharmacie du SRES supervise notamment :',o:['Le cycle des médicaments et la stérilisation dans les ESSP','La construction des hôpitaux','Les élections professionnelles','La comptabilité nationale'],c:0,e:'Elle suit le cycle des médicaments, leur usage rationnel et l’activité de stérilisation au niveau des ESSP.'}],cards:[{f:'Administration périphérique','b':'12 DRS · 82 délégations préfectorales et provinciales'},{f:'6 services de la DRS','b':'Santé publique · offre de soins · observatoire régional · finances/logistique/partenariat · RH/contentieux · équipements/maintenance'},{f:'2 unités régionales de la DRS','b':'Approvisionnement et pharmacie · communication et information'},{f:'Délégation','b':'Niveau provincial/préfectoral d’application et d’exécution de la politique de santé'},{f:'4 unités du SRES','b':'Planification/suivi/évaluation · veille/sécurité/santé environnementale · coordination des réseaux · pharmacie'},{f:'Coordination des réseaux','b':'Parcours de soins · référence/contre-référence · filières · comité de coordination'}]},
      {t:'V. Organisation de l’offre de soins au Maroc',ic:'🏥',pages:'p.48-76',lesson:'<h3>🏥 Organisation de l’offre de soins</h3><p>L’offre de soins est <b>pyramidale, intégrée, hiérarchisée</b> et fondée sur les soins de santé primaires. Elle repose sur la gradation des soins et sur la référence/contre-référence.</p><p>En mode fixe, le secteur public comprend quatre réseaux : <b>RH</b> réseau hospitalier, <b>RESSP</b> établissements de soins de santé primaires, <b>RISUM</b> soins d’urgence médicale et <b>REMS</b> établissements médico-sociaux.</p><h3>🩺 Réseaux à retenir</h3><p>Le RH assure les soins hospitaliers, la formation, la recherche, la permanence et l’aide médicale urgente. Le RESSP comprend notamment dispensaires ruraux, CSR1/CSR2, CSU1/CSU2 et structures spécialisées d’appui. Le RISUM organise les urgences et leur régulation. Le REMS prend en charge des personnes à besoins spécifiques : santé-jeunes, addictologie, rééducation, soins palliatifs.</p>',qs:[{q:'Quels sont les quatre réseaux publics de l’offre de soins en mode fixe ?',o:['RH, RESSP, RISUM et REMS','DRS, DMS, SRES et CHU','AMO, CNOPS, CNSS et RAMED','CSR1, CSR2, CSU1 et CSU2'],c:0,e:'Les quatre réseaux sont RH, RESSP, RISUM et REMS.'},{q:'Sur quels principes repose l’offre de soins ?',o:['Gradation et référence/contre-référence','Uniquement l’hospitalisation','Uniquement le secteur privé','Absence de hiérarchie'],c:0,e:'La gradation des soins et la référence/contre-référence organisent le parcours hors urgence.'}],cards:[{f:'Les 4 réseaux publics de soins','b':'RH · RESSP · RISUM · REMS'},{f:'Modèle marocain de l’offre de soins','b':'Pyramidal, intégré, hiérarchisé, fondé sur les SSP'}]},
      {t:'VI. La couverture sanitaire',ic:'🗺️',pages:'p.76-84',lesson:'<h3>🗺️ Couverture sanitaire</h3><p>Le découpage sanitaire s’organise en circonscriptions sanitaires, préfectures/provinces, régions et interrégions. La couverture peut être <b>fixe</b>, <b>mobile</b> ou <b>participative</b>.</p><p>Le mode mobile comprend les visites à domicile, les équipes mobiles, les caravanes médicales et les hôpitaux mobiles. La participation communautaire mobilise la population et des dispositifs comme Dar Al Oumouma, le SAMU obstétrical rural, l’éducation parentale et la classe des mères.</p>',qs:[{q:'Quels sont les trois modes de couverture sanitaire ?',o:['Fixe, mobile et participatif','Public, privé et informel','Rural, urbain et régional','Préventif, curatif et palliatif'],c:0,e:'La couverture sanitaire est organisée selon les modes fixe, mobile et participatif.'}],cards:[{f:'Mode mobile','b':'Visites à domicile · équipes mobiles · caravanes médicales · hôpitaux mobiles'},{f:'Mode participatif','b':'Participation communautaire, Dar Al Oumouma, SAMU obstétrical rural, éducation parentale'}]},
      {t:'VII. Circuit du malade et filière de soins',ic:'🔄',pages:'p.85-90',lesson:'<h3>🔄 Parcours de soins</h3><p>La filière de soins est une organisation coordonnée de la prise en charge. Le réseau coordonné relie les établissements et facilite le parcours du patient.</p><p>Hors urgence, l’accès suit les règles de référence vers le spécialiste, l’hospitalisation ou le plateau technique. La <b>référence</b> oriente le patient vers un niveau adapté ; la <b>contre-référence</b> assure son retour et la continuité du suivi.</p><h3>🤰 Filières spécifiques</h3><p>Les filières peuvent être adaptées à des situations particulières, notamment l’accouchement et les soins obstétricaux.</p>',qs:[{q:'Que signifie la contre-référence ?',o:['Le retour d’information et du patient vers le niveau d’origine','Une admission directe aux urgences','Une suppression du suivi','Une consultation sans dossier'],c:0,e:'La contre-référence assure le retour vers le niveau d’origine et la continuité de la prise en charge.'}],cards:[{f:'Référence / contre-référence','b':'Orientation vers un niveau adapté, puis retour organisé avec continuité du suivi'},{f:'But de la filière de soins','b':'Coordonner la prise en charge et faciliter le parcours du malade'}]},
      {t:'VIII. Les programmes de santé',ic:'📋',pages:'p.90-93',lesson:'<h3>📋 Programmes de santé</h3><p>Un programme de santé définit une intervention organisée à partir d’objectifs, de populations cibles, d’activités, de ressources, d’indicateurs et d’une évaluation.</p><p>Le document regroupe les programmes de santé de la mère et de l’enfant, des populations à besoins spécifiques, de lutte contre les maladies transmissibles et non transmissibles, ainsi que les programmes de santé-environnement et les stratégies nationales.</p>',qs:[{q:'Quels éléments structurent un programme de santé ?',o:['Objectifs, activités, ressources, indicateurs et évaluation','Uniquement un budget','Uniquement une campagne','Un diagnostic sans suivi'],c:0,e:'Un programme associe objectifs, activités, moyens, indicateurs et évaluation.'}],cards:[{f:'Programmes de santé','b':'Mère-enfant · besoins spécifiques · maladies transmissibles/non transmissibles · santé-environnement'}]},
      {t:'IX. Ressources humaines du Ministère de la Santé',ic:'👥',pages:'p.93-101',lesson:'<h3>👥 Ressources humaines</h3><p>Les ressources humaines comprennent le personnel médical, paramédical, administratif et les autres catégories nécessaires au fonctionnement du système.</p><h3>🎓 Formation</h3><p>Le document présente la formation médicale, pharmaceutique et dentaire, la formation paramédicale et son évolution vers les <b>ISPITS</b> selon le système LMD, la formation des techniciens de santé dans les IFTS, ainsi que l’<b>ENSP</b> et ses filières de spécialisation.</p><p>La gestion des ressources humaines couvre le recrutement, l’affectation, la formation continue, le recyclage, la promotion et l’adéquation entre compétences et besoins du Ministère.</p>',qs:[{q:'Quelles sont les grandes catégories de personnel citées ?',o:['Médical, paramédical, administratif et autres','Uniquement médical et infirmier','Uniquement administratif','Bénévoles seulement'],c:0,e:'Le document distingue le personnel médical, paramédical, administratif et les autres catégories.'},{q:'Quel établissement porte les Instituts Supérieurs des Professions Infirmières et Techniques de Santé ?',o:['ISPITS','SRES','RISUM','CNTSH'],c:0,e:'Les ISPITS assurent la formation supérieure des professions infirmières et techniques de santé.'}],cards:[{f:'Formation et structures','b':'ISPITS (cycles LMD) · IFTS · ENSP · formations médicale, pharmaceutique et dentaire'},{f:'Gestion des RH','b':'Recrutement · affectation · formation continue · recyclage · promotion · adéquation aux besoins'}]}
    );
  }
}

/* Complément exhaustif du support SNS, pages 30 à 39. */
if (SNS_DOC) {
  var centralUnit = SNS_DOC.units.find(function (u) { return u.pages === 'p.30-39'; });
  if (centralUnit) {
    centralUnit.lesson += '<h3>📋 Attributions détaillées à connaître</h3>' +
      '<p><b>DPRF - Direction de la planification et des ressources financières :</b> élabore les plans et programmes sanitaires, conduit les études, prépare et suit la <b>carte sanitaire</b>, coordonne le budget et la comptabilité, développe l’économie de la santé et assure la coopération.</p>' +
      '<p><b>DRH - Direction des ressources humaines :</b> évalue les besoins en personnel, assure le recrutement, l’affectation, la gestion administrative et des carrières, la formation initiale et continue, les postes, les congés de maladie et les œuvres sociales.</p>' +
      '<p><b>DELM - Direction de l’épidémiologie et de la lutte contre les maladies :</b> exploite la surveillance épidémiologique, prépare les programmes de prévention et de lutte contre les maladies, protège le milieu, contrôle l’hygiène et la sécurité sanitaire des denrées alimentaires et suit la radioprotection.</p>' +
      '<p><b>DMP - Direction du médicament et de la pharmacie :</b> prépare la politique pharmaceutique ; fixe les normes, encadre les prix et la liste des médicaments essentiels ; contrôle la qualité, la sécurité et l’usage des médicaments ; instruit les visas, autorisations et inspections.</p>' +
      '<p><b>Direction de la population :</b> met en œuvre les programmes de planification familiale, santé maternelle et infantile, santé scolaire et universitaire, nutrition, réhabilitation, gériatrie, ainsi que l’information, l’éducation et la communication (IEC).</p>' +
      '<p><b>DHSA - Direction des hôpitaux et des soins ambulatoires :</b> organise et coordonne les activités hospitalières, les soins ambulatoires, les urgences, l’assistance médicale et la transfusion sanguine.</p>' +
      '<p><b>DEM - Direction des équipements et de la maintenance :</b> programme et suit les bâtiments et investissements, les équipements biomédicaux, leur maintenance et le patrimoine du Ministère.</p>' +
      '<p><b>Direction de la réglementation et du contentieux :</b> élabore et suit les textes juridiques, instruit les litiges et contentieux, et veille à l’encadrement des professions réglementées.</p>' +
      '<p><b>Directions et divisions complémentaires :</b> la direction de l’approvisionnement en médicaments et produits de santé organise les besoins, l’acquisition, le stockage et la distribution ; la direction de la protection sociale des travailleurs traite la santé et la protection sociale au travail. Les divisions citées concernent le parc auto et les affaires générales, l’approvisionnement, ainsi que l’informatique et les méthodes.</p>' +
      '<h3>🔬 Services assimilés à des services centraux</h3>' +
      '<p>À retenir sans les confondre avec les directions régionales ou les délégations : <b>INH</b> (Institut national d’hygiène), <b>CNTSH</b> (Centre national de transfusion sanguine et d’hématologie), <b>Centre national de radioprotection</b>, <b>ENSP</b> (École nationale de santé publique), <b>CAPM</b> (Centre antipoison et de pharmacovigilance du Maroc), <b>LNCM</b> (Laboratoire national de contrôle des médicaments), <b>Institut Pasteur du Maroc</b> et <b>Laboratoire national de virologie</b>.</p>' +
      '<div class="warn">⚠️ À ne pas confondre : la DMP réglemente et contrôle le médicament ; la direction de l’approvisionnement assure sa disponibilité. La DELM surveille les maladies ; l’INH est un service assimilé.</div>';

    centralUnit.qs = centralUnit.qs.concat([
      {q:'Quelle direction prépare et suit la carte sanitaire ?',o:['La DPRF','La DHSA','La DELM','La DMP'],c:0,e:'La DPRF conduit les études et la planification, notamment la carte sanitaire.'},
      {q:'La gestion des carrières, des postes et des congés de maladie relève de :',o:['La DRH','La DEM','La Direction de la population','La DPRF'],c:0,e:'Ces attributions font partie de la gestion administrative du personnel par la DRH.'},
      {q:'Le contrôle sanitaire des denrées alimentaires est une attribution de :',o:['La DELM','La DMP','La DHSA','La DEM'],c:0,e:'La DELM intervient dans la protection du milieu, l’hygiène et le contrôle sanitaire des denrées.'},
      {q:'Quelle direction instruit notamment les visas, autorisations et inspections pharmaceutiques ?',o:['La DMP','La DELM','La DPRF','La Direction de la population'],c:0,e:'La DMP encadre la réglementation, la qualité et le contrôle du médicament.'},
      {q:'La santé scolaire et universitaire relève principalement de :',o:['La Direction de la population','La DHSA','La DRH','La Direction de la réglementation'],c:0,e:'Elle figure parmi les programmes portés par la Direction de la population.'},
      {q:'La disponibilité par achat, stockage et distribution des médicaments relève de :',o:['La Direction de l’approvisionnement en médicaments et produits de santé','La DMP seule','La DEM','Le CNTSH'],c:0,e:'Cette direction assure la chaîne d’approvisionnement ; elle est distincte de la DMP.'},
      {q:'Le CAPM est :',o:['Le Centre antipoison et de pharmacovigilance du Maroc','Une direction régionale','Un service hospitalier','Une division de la DPRF'],c:0,e:'Le CAPM est un service assimilé à un service central.'},
      {q:'Le LNCM a pour mission centrale le contrôle des :',o:['Médicaments','Bâtiments hospitaliers','Ressources humaines','Budgets régionaux'],c:0,e:'LNCM signifie Laboratoire national de contrôle des médicaments.'},
      {q:'Quel organisme est un service assimilé et non une direction centrale ?',o:['L’Institut Pasteur du Maroc','La Direction de la population','La Direction des équipements et de la maintenance','La DPRF'],c:0,e:'L’Institut Pasteur du Maroc figure parmi les services assimilés.'},
      {q:'Quel couple est correctement associé ?',o:['DHSA : hôpitaux, soins ambulatoires et urgences','DEM : recrutement et formation','DRH : qualité des médicaments','DMP : maintenance biomédicale'],c:0,e:'La DHSA coordonne les activités hospitalières, ambulatoires, les urgences et l’assistance.'}
    ]);
    centralUnit.cards = centralUnit.cards.concat([
      {f:'DPRF - rôle détaillé',b:'Plans et programmes · études · carte sanitaire · budget/comptabilité · économie de la santé · coopération'},
      {f:'DRH - rôle détaillé',b:'Besoins · recrutement · affectation · carrières · formation · postes · congés maladie · œuvres sociales'},
      {f:'DELM - rôle détaillé',b:'Surveillance épidémiologique · programmes de lutte · protection du milieu · denrées alimentaires · radioprotection'},
      {f:'DMP - rôle détaillé',b:'Politique pharmaceutique · normes · prix · médicaments essentiels · qualité · visas/autorisations · inspection'},
      {f:'Direction de la population',b:'Planification familiale · mère-enfant · scolaire/universitaire · nutrition · réhabilitation · gériatrie · IEC'},
      {f:'Réglementation et contentieux',b:'Textes juridiques · litiges · contentieux · professions réglementées'},
      {f:'Approvisionnement en médicaments',b:'Besoins · acquisition · stockage · distribution des médicaments et produits de santé'},
      {f:'Services assimilés - liste complète',b:'INH · CNTSH · Centre national de radioprotection · ENSP · CAPM · LNCM · Institut Pasteur Maroc · Laboratoire national de virologie'}
    ]);
  }
}
if (window.CNC_APPLY_CONTENT_REVIEW) window.CNC_APPLY_CONTENT_REVIEW(DOCS);
DOCS.sort(function (a, b) { return a.id - b.id; });

// index rapide
var DOC_BY_ID = {};
DOCS.forEach(function (d) {
  DOC_BY_ID[d.id] = d;
  d.units.forEach(function (u, i) { u._d = d.id; u._i = i; u.qs = u.qs || []; u.cards = u.cards || []; });
});
function doc(id) { return DOC_BY_ID[+id]; }
function unit(did, ui) { var d = doc(did); return d && d.units[+ui]; }
function questionSource(q, did, ui) {
  if (q && q.source) return q.source;
  var u = unit(did, ui), d = doc(did);
  return d && u ? 'Document ' + d.code + ' · ' + (u.pages || 'unité ' + (+ui + 1)) : 'Source PDF du module';
}
function questionReportUrl(q, did, ui) {
  var d = doc(did), u = unit(did, ui);
  var text = 'Bonjour PrepMe, je souhaite signaler une question à vérifier. Module ' + (d ? d.code + ' · ' + d.title : did) + ' · ' + (u ? u.t : ui) + '. Question : ' + String(q && q.q || '').replace(/<[^>]+>/g, ' ');
  return 'https://wa.me/' + WHATSAPP_CONTACT_NUMBER + '?text=' + encodeURIComponent(text);
}
function qKey(did, ui, qi) { return 'q' + did + '.' + ui + '.' + qi; }
function cKey(did, ui, ci) { return 'c' + did + '.' + ui + '.' + ci; }
function uKey(did, ui) { return did + '.' + ui; }

function unitCards(did, ui, min) {
  var d = doc(did), u = unit(did, ui); if (!u) return [];
  var out = u.cards.map(function (c, ci) { return { c: c, k: cKey(d.id, ui, ci), d: d.id, u: ui }; });
  min = min || 8;
  if (out.length < min && u.qs.length) {
    var idx = shuffle(u.qs.map(function (_, i) { return i; })).slice(0, min - out.length);
    idx.forEach(function (qi) {
      out.push({ c: qcCard(u.qs[qi]), k: 'cq' + d.id + '.' + ui + '.' + qi, d: d.id, u: ui });
    });
  }
  return out;
}
function qcCard(q) {
  return {
    f: '<div class="sub" style="margin-bottom:8px">D\u2019apr\u00e8s un QCM de l\u2019unit\u00e9</div>' + q.q,
    b: '<div><b>' + q.o[q.c] + '</b></div>' +
      (q.e ? '<div class="sub" style="margin-top:10px;font-weight:400">' + q.e + '</div>' : '')
  };
}
function allQuestions(filterDocId) {
  var out = [];
  DOCS.forEach(function (d) {
    if (filterDocId && d.id !== +filterDocId) return;
    d.units.forEach(function (u, ui) {
      u.qs.forEach(function (q, qi) { out.push({ q: q, k: qKey(d.id, ui, qi), d: d.id, u: ui }); });
    });
  });
  return out;
}
function quickQuestions() {
  var all = allQuestions(null), picked = [], used = {};
  function add(it) { if (it && !used[it.k] && picked.length < 10) { used[it.k] = 1; picked.push(it); } }
  dueList().forEach(function (k) { var it = resolveKey(k); if (it && it.type === 'q') add({ q: it.q, k: k, d: it.d, u: it.u }); });
  all.slice().sort(function (a, b) {
    var sa = ust(a.d, a.u), sb = ust(b.d, b.u);
    return ((sa.ok + sa.ko ? sa.ok / (sa.ok + sa.ko) : 0) - (sb.ok + sb.ko ? sb.ok / (sb.ok + sb.ko) : 0));
  }).forEach(add);
  shuffle(all).forEach(function (it) { if (!S.srs[it.k]) add(it); });
  return picked.length ? picked : shuffle(all).slice(0, 10);
}
function diagnosticQuestions() {
  return shuffle(allQuestions(null)).slice(0, 20);
}
function allCards(filterDocId) {
  var out = [];
  DOCS.forEach(function (d) {
    if (filterDocId && d.id !== +filterDocId) return;
    d.units.forEach(function (u, ui) {
      u.cards.forEach(function (c, ci) { out.push({ c: c, k: cKey(d.id, ui, ci), d: d.id, u: ui }); });
    });
  });
  return out;
}

/* ----------------------------------------------------------------- state */
var KEY = 'cnc_anass_v2';
var BACKUP_KEY = KEY + '_backup';
var HEART_MAX = 5, HEART_MIN = 25;           // 1 cœur toutes les 25 minutes
var CROWN_MAX = 5, CROWN_PCT = 0.8;
var CONTEST_DATE = '2026-10-10';
/* Source unique de vérité : version.json est généré avec cette même valeur. */
var APP_VERSION = window.PREPME_VERSION || '3.5.35';
var WHATSAPP_CONTACT_NUMBER = '212710713772';
var WHATSAPP_CONTACT_DISPLAY = '0710 71 37 72';
var WHATSAPP_CONTACT_URL = 'https://wa.me/' + WHATSAPP_CONTACT_NUMBER + '?text=' + encodeURIComponent('Bonjour PrepMe, je souhaite signaler un problème, proposer une amélioration ou envoyer des documents pour la section Concours.');
var UPDATE_DISMISSED_KEY = 'concours_sante_update_dismissed';
var UPDATE_RELOAD_KEY = 'concours_sante_update_reload';
var UPDATE_VERSION_URL = 'https://raw.githubusercontent.com/dahbi-web/cnc-anass-prepa/main/version.json';
var UPDATE_DOWNLOAD_URL = 'https://raw.githubusercontent.com/dahbi-web/cnc-anass-prepa/main/CNC_ANASS_App_MOBILE.html';
var GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/dahbi-web/cnc-anass-prepa/main/';
function githubRawFile(folder, file) { return GITHUB_RAW_BASE + folder + '/' + encodeURIComponent(file).replace(/%2F/g, '/'); }

/* ---------------------------------------------------------------- sources
   Provenance contrôlée : uniquement les documents présents dans le dossier
   local « CNC 26 ANASS ». Les sujets de concours sont référencés dans la
   section Concours depuis le corpus local « concours commun ». */
var DOC_SOURCES = {
  1: [{label:'Dossier local — 01- SNS Maroc.pdf', local:true}],
  2: [{label:'Dossier local — 02- Réglement Intérieur des Hôpitaux.pdf', local:true, file:'../CNC 26 ANASS/02- Réglement Intérieur des Hôpitaux.pdf'}],
  3: [{label:'Dossier local — 03- La Loi 08-22 GST.pdf', local:true}],
  4: [{label:'Dossier local — 04- Economie de la Santé.pdf', local:true}],
  5: [{label:'Dossier local — 05- Indicateurs de la Santé.pdf', local:true}],
  6: [{label:'Dossier local — 06- La Loi-Cadre 06-22.pdf', local:true}],
  7: [{label:'Dossier local — 07- Epidémiologie.pdf', local:true}],
  8: [{label:'Dossier local — 08- La loi 43-13 Exercice des professions infermière.pdf', local:true}],
  9: [{label:'Dossier local — 09- OMD et ODD.pdf', local:true}],
  10: [{label:'Dossier local — 10- Accident Exposition Au Sang.pdf', local:true}],
  11: [{label:'Dossier local — 11- Comptes Nationaux de la Santé 2022.pdf', local:true}],
  12: [{label:'Dossier local — 12- Comptes Nationaux de la Santé 2018.pdf', local:true}],
  13: [{label:'Dossier local — 13- Lavage Des Mains.pdf', local:true}],
  14: [{label:'Dossier local — 14- Maladies à Déclaration Obligatoire.pdf', local:true}],
  15: [{label:'Dossier local — 15- Jours internationaux et Fériés.pdf', local:true}],
  16: [{label:'Dossier local — 16- Couverture Médicale de Base.pdf', local:true}],
  17: [{label:'Dossier local — 17- Projet d_Etablissement Hospitalier.pdf', local:true}],
  18: [{label:'Dossier local — 18- Planification Stratégique.pdf', local:true}],
  19: [{label:'Dossier local — 19- Gestion et Management de la qualité.pdf', local:true}],
  20: [{label:'Dossier local — 20- Santé en chiffres 2018-2023.pdf', local:true}],
  21: [{label:'Dossier local — 21- Stratégie Sectorielle 2012-2016.pdf', local:true}],
  22: [{label:'Dossier local — 22- Les ALDs et Les ALCs.pdf', local:true}],
  23: [{label:'Dossier local — 23- La Loi Cadre 43-09.pdf', local:true}],
  24: [{label:'Dossier local — 24- La Loi 28-00 La Gestion Des Déchets.pdf', local:true}],
  25: [{label:'Dossier local — 25- La Loi 09-21 La Protection Sociale.pdf', local:true}],
  26: [{label:'Dossier local — 26- Le Plan Santé 2025.pdf', local:true}],
  27: [{label:'Dossier local — 27- Présentation Des Lois.pdf', local:true}],
  28: [{label:'Dossier local — 28- La Lois 07-22 Haute Autorité de la Santé.pdf', local:true}],
  29: [{label:'Dossier local — 29- La loi 10-22 Agence Des Médicaments.pdf', local:true}],
  30: [{label:'Dossier local — 30- La Loi 11-22 Agence du Sang et Ses Dérivés.pdf', local:true}],
  31: [{label:'Dossier local — 31- CS. SROS. CSN. CSR.pdf', local:true}]
};
var ABBREVIATIONS = {
  'SNS':'Système National de Santé','OMS':'Organisation Mondiale de la Santé','MSPS':'Ministère de la Santé et de la Protection Sociale','GST':'Groupement Sanitaire Territorial','HAS':'Haute Autorité de Santé','CHU':'Centre Hospitalier Universitaire','ESSP':'Établissements de Soins de Santé Primaires','RESSP':'Réseau des Établissements de Soins de Santé Primaires','RH':'Réseau Hospitalier','RISUM':'Réseau Intégré des Soins d’Urgence Médicale','REMS':'Réseau des Établissements Médico-Sociaux','SROS':'Schéma Régional de l’Offre de Soins','SRES':'Service du Réseau des Établissements Sanitaires','DRS':'Direction Régionale de la Santé','DPRF':'Direction de la Planification et des Ressources Financières','DRH':'Direction des Ressources Humaines','DELM':'Direction de l’Épidémiologie et de la Lutte contre les Maladies','DMP':'Direction du Médicament et de la Pharmacie','DHSA':'Direction des Hôpitaux et des Soins Ambulatoires','DEM':'Direction des Équipements et de la Maintenance','INH':'Institut National d’Hygiène','CNTSH':'Centre National de Transfusion Sanguine et d’Hématologie','CAPM':'Centre Anti Poison et de Pharmacovigilance du Maroc','LNCM':'Laboratoire National de Contrôle des Médicaments','ENSP':'École Nationale de Santé Publique','ISPITS':'Instituts Supérieurs des Professions Infirmières et Techniques de Santé','CMDP':'Conseil des Médecins, Dentistes et Pharmaciens','PEH':'Projet d’Établissement Hospitalier','PMR':'Projet Médical Régional','AMO':'Assurance Maladie Obligatoire','CNSS':'Caisse Nationale de Sécurité Sociale','CNOPS':'Caisse Nationale des Organismes de Prévoyance Sociale','ANAM':'Agence Nationale de l’Assurance Maladie','RAMED':'Régime d’Assistance Médicale','CMB':'Couverture Médicale de Base','RSU':'Registre Social Unifié','AMO-TNS':'AMO des Travailleurs Non-Salariés','AMO-TADAMON':'AMO destinée aux personnes incapables d’acquitter les cotisations','ALD':'Affection de Longue Durée','ALC':'Affection Lourde et Coûteuse','AES':'Accident d’Exposition au Sang','MDO':'Maladie à Déclaration Obligatoire','VIH':'Virus de l’Immunodéficience Humaine','SIDA':'Syndrome d’Immunodéficience Acquise','VHB':'Virus de l’Hépatite B','VHC':'Virus de l’Hépatite C','HBV':'Hepatitis B Virus','HIV':'Human Immunodeficiency Virus','HPV':'Papillomavirus Humain','SRAS':'Syndrome Respiratoire Aigu Sévère','TIAC':'Toxi-Infection Alimentaire Collective','PNI':'Programme National d’Immunisation','HTA':'Hypertension Artérielle','BPCO':'Bronchopneumopathie Chronique Obstructive','AVC':'Accident Vasculaire Cérébral','IVG':'Interruption Volontaire de Grossesse','SAMU':'Service d’Aide Médicale Urgente','PEC':'Prise En Charge','IEC':'Information, Éducation et Communication','PIB':'Produit Intérieur Brut','PNB':'Produit National Brut','IDH':'Indice de Développement Humain','HCP':'Haut-Commissariat au Plan','ODD':'Objectifs de Développement Durable','OMD':'Objectifs du Millénaire pour le Développement','OIT':'Organisation Internationale du Travail','OCDE':'Organisation de Coopération et de Développement Économiques','ONG':'Organisation Non Gouvernementale','PPP':'Partenariat Public-Privé','TNR':'Tarif National de Référence','TNS':'Travailleur Non-Salarié','PDCA':'Planifier, Déployer, Contrôler, Agir','ISO':'Organisation Internationale de Normalisation','QCM':'Questionnaire à Choix Multiple','CSU':'Centre de Santé Urbain','CSR':'Centre de Santé Rural','CSN':'Carte Sanitaire Nationale','PAA':'Plan d’Action Annuel','PA':'Plan d’Action','EIG':'Événement Indésirable Grave'
};
function abbreviationBox(u) {
  var text = stripTags([u.t, u.lesson].concat((u.qs || []).map(function (q) { return q.q + ' ' + q.o.join(' '); }), (u.cards || []).map(function (c) { return c.f + ' ' + c.b; })).join(' '));
  var found = Object.keys(ABBREVIATIONS).filter(function (abbr) {
    var rx = new RegExp('(^|[^A-ZÀ-ÖØ-Þ0-9-])' + abbr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=$|[^A-ZÀ-ÖØ-Þ0-9-])');
    return rx.test(text);
  });
  if (!found.length) return '';
  return '<aside class="card abbreviation-box"><h3>🔤 Abréviations à connaître</h3><div class="abbreviation-grid">' + found.map(function (abbr) {
    return '<div><b>' + esc(abbr) + '</b><span>' + esc(ABBREVIATIONS[abbr]) + '</span></div>';
  }).join('') + '</div></aside>';
}
function sourcePageLabel(pages) {
  if (!pages) return '';
  return /\bp\.?\s*\d/i.test(String(pages)) ? String(pages).replace(/\bp\.?\s*/i, 'p. ') : 'section ' + String(pages);
}
function sourceLocator(pages) {
  if (!pages) return 'Repère de page non renseigné';
  return /\bp\.?\s*\d/i.test(String(pages)) ? 'Pages du support : ' + sourcePageLabel(pages) : 'Repère dans le support : section ' + String(pages) + ' (ce n’est pas un numéro de page)';
}
function sourceLabel(did, pages) {
  var list = DOC_SOURCES[+did] || [];
  var base = list.length ? list[0].label : 'Support pédagogique fourni';
  var page = sourcePageLabel(pages);
  return base + (page ? ' — ' + page : '');
}
function sourceStartPage(pages) {
  var m = String(pages || '').match(/\d+/);
  return m ? Math.max(1, +m[0]) : 1;
}
function coursePdfIndex(did) {
  var code = doc(did) && String(doc(did).code).padStart(2, '0');
  var list = window.PREP_PDFS || [];
  for (var i = 0; i < list.length; i++) if (String(list[i][0]).padStart(2, '0') === code) return i;
  return -1;
}
function sourceBox(did, ui) {
  var list = DOC_SOURCES[+did] || [{label:'Support pédagogique fourni — vérification avec le texte original recommandée', local:true}];
  var u = ui === undefined || ui === null ? null : unit(did, ui);
  var h = '<aside class="card lesson-sources"><h3>📚 Référence du cours</h3>';
  h += '<div class="source-course"><b>Module ' + esc(doc(did).code) + ' — ' + esc(doc(did).title) + '</b>' +
    (doc(did).sub ? '<span>' + esc(doc(did).sub) + '</span>' : '') +
    (u ? '<span>' + esc(sourceLocator(u.pages)) + '</span>' : '') + '</div>';
  h += '<p class="sub">Les leçons synthétisent le support fourni. Les réponses et explications pédagogiques ne remplacent pas le texte officiel.</p><ul>';
  list.forEach(function (s) {
    var tag = s.url ? '<span class="source-badge source-official">Source officielle</span>' : s.local ? '<span class="source-badge source-doc">Support fourni</span>' : '<span class="source-badge source-pending">Point à dater</span>';
    var label = esc(s.label + (u && u.pages ? ' — ' + sourcePageLabel(u.pages) : ''));
    var href = s.url || s.file, pdfIndex = coursePdfIndex(did);
    var page = sourceStartPage(u && u.pages);
    var internalRoute = pdfIndex >= 0 ? '#/pdfview/' + pdfIndex + '/' + page + '/' + did + '/' + ui : '';
    h += '<li>' + tag + ' ' + (internalRoute ? '<a class="source-direct-link" href="' + internalRoute + '">' + label + '<span>Ouvrir à la page ' + page + ' →</span></a>' : href ? '<a href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + label + '</a>' : label) + '</li>';
  });
  return h + '</ul></aside>';
}

function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function pad(n) { return n < 10 ? '0' + n : '' + n; }
function dayShift(str, n) { var p = str.split('-'); var d = new Date(+p[0], +p[1] - 1, +p[2]); d.setDate(d.getDate() + n); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function dayDiff(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }

function blank() {
  return {
    v: 2, xp: 0, day: today(), xpDay: 0, streak: 0, lastDay: null, best: 0,
    hearts: HEART_MAX, heartTs: Date.now(),
    goal: 50, contestDate: CONTEST_DATE, planStart: '2026-09-10', homeMode: 'auto', sound: true, theme: 'auto', fontScale: 'normal', unlimited: false, hl: true, analytics: false,
    units: {}, srs: {}, exams: [], sessions: [], lastRoute: '', hist: {}, seen: {}
  };
}
var S = load();
/* GA4 est chargé seulement après consentement. Les événements ne contiennent
   ni réponses, ni texte des cours, ni recherches, ni identifiant utilisateur. */
var ANALYTICS_CONFIG = window.PREPME_ANALYTICS_CONFIG || {};
var ANALYTICS_ID = String(ANALYTICS_CONFIG.measurementId || '').trim();
function analyticsReady() { return /^G-[A-Z0-9]+$/i.test(ANALYTICS_ID); }
function analyticsSetEnabled(enabled) {
  if (!analyticsReady()) return;
  if (enabled) {
    if (window.gtag) window.gtag('consent', 'update', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window['ga-disable-' + ANALYTICS_ID] = false;
  } else {
    window['ga-disable-' + ANALYTICS_ID] = true;
    if (window.gtag) window.gtag('consent', 'update', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
  }
}
function analytics(name, params) {
  if (!S.analytics || !analyticsReady()) return;
  analyticsSetEnabled(true);
  if (window.gtag) window.gtag('event', name, params || {});
}
function trackScreen(screen) { analytics('screen_view', { screen_name: String(screen || 'home').slice(0, 40) }); }
var INSTALL_PROMPT = null;
window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); INSTALL_PROMPT = e; render(); });
window.addEventListener('appinstalled', function () { INSTALL_PROMPT = null; toast('✅ Application installée hors ligne'); render(); });
function installApp() {
  if (INSTALL_PROMPT) { INSTALL_PROMPT.prompt(); INSTALL_PROMPT.userChoice.then(function () { INSTALL_PROMPT = null; render(); }); }
  else {
    var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    toast(ios ? 'iPhone/iPad : Partager → Sur l’écran d’accueil → Ajouter' : 'Android : menu ⋮ → Installer l’application ou Ajouter à l’écran d’accueil');
  }
}
function versionIsNewer(remote, current) {
  var a = String(remote || '').match(/\d+/g) || [], b = String(current || '').match(/\d+/g) || [];
  for (var i = 0; i < Math.max(a.length, b.length); i++) {
    var x = +(a[i] || 0), y = +(b[i] || 0);
    if (x !== y) return x > y;
  }
  return false;
}
function downloadUpdate(button) {
  if (!window.fetch) { toast('Téléchargement non disponible sur ce navigateur'); return; }
  button.disabled = true; button.textContent = 'Préparation…';
  fetch(UPDATE_DOWNLOAD_URL + '?t=' + Date.now(), { cache: 'no-store' }).then(function (r) {
    if (!r.ok) throw new Error('download unavailable');
    return r.blob();
  }).then(function (blob) {
    var file = new Blob([blob], { type: 'text/html;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(file); link.download = 'PrepMe_Mise_a_jour.html';
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 3000);
    button.textContent = '✅ Téléchargé';
    toast('Fichier téléchargé : ouvre PrepMe_Mise_a_jour.html');
  }).catch(function () {
    button.disabled = false; button.textContent = 'Réessayer';
    toast('Téléchargement impossible. Vérifie ta connexion Internet.');
  });
}
function showUpdateNotice(version, worker, force) {
  version = String(version || '');
  if (!version || (!force && !versionIsNewer(version, APP_VERSION))) return;
  try { if (localStorage.getItem(UPDATE_DISMISSED_KEY) === version) return; } catch (e) { }
  if (document.getElementById('app-update-notice')) return;
  var box = document.createElement('aside');
  box.id = 'app-update-notice'; box.className = 'update-notice';
  box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite');
  box.innerHTML = '<div class="update-copy"><b>✨ Mise à jour disponible · v' + esc(version) + '</b><span>Une nouvelle version de PrepMe est prête.</span></div>' +
    '<div class="update-actions">' + (worker ? '<button type="button" class="btn update-primary">Mettre à jour</button>' : '<button type="button" class="btn update-primary">Télécharger</button>') +
    '<button type="button" class="update-later">Plus tard</button></div>';
  document.body.appendChild(box);
  var later = box.querySelector('.update-later');
  later.onclick = function () { try { localStorage.setItem(UPDATE_DISMISSED_KEY, version); } catch (e) { } box.remove(); };
  var accept = box.querySelector('.update-primary');
  if (worker) accept.onclick = function () {
    try { sessionStorage.setItem(UPDATE_RELOAD_KEY, '1'); } catch (e) { }
    worker.postMessage({ type: 'SKIP_WAITING' });
    accept.disabled = true; accept.textContent = 'Installation…';
  };
  else accept.onclick = function () { downloadUpdate(accept); };
}
function checkRemoteUpdate() {
  if (!navigator.onLine || !window.fetch) return;
  fetch(UPDATE_VERSION_URL + '?t=' + Date.now(), { cache: 'no-store' }).then(function (r) {
    if (!r.ok) throw new Error('version unavailable');
    return r.json();
  }).then(function (info) {
    if (info && versionIsNewer(info.version, APP_VERSION)) showUpdateNotice(info.version, null);
  }).catch(function () { });
}
function watchAppUpdates() {
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      var reload = false;
      try { reload = sessionStorage.getItem(UPDATE_RELOAD_KEY) === '1'; sessionStorage.removeItem(UPDATE_RELOAD_KEY); } catch (e) { }
      if (reload) location.reload();
    });
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(function (reg) {
      function announceWaiting() {
        if (!reg.waiting || !navigator.serviceWorker.controller) return;
        var waiting = reg.waiting;
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
          if (event.data && event.data.version) showUpdateNotice(event.data.version, waiting, true);
        };
        waiting.postMessage({ type: 'GET_VERSION' }, [channel.port2]);
      }
      reg.addEventListener('updatefound', function () {
        var installing = reg.installing;
        if (!installing) return;
        installing.addEventListener('statechange', function () {
          if (installing.state === 'installed') announceWaiting();
        });
      });
      announceWaiting();
      function check() { if (navigator.onLine) reg.update().then(announceWaiting).catch(function () { }); }
      window.addEventListener('online', check);
      check();
    }).catch(function () { });
  }
  if (navigator.onLine) checkRemoteUpdate();
  window.addEventListener('online', checkRemoteUpdate);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible' && navigator.onLine) checkRemoteUpdate(); });
}
function completeProgress(s) {
  if (!isValidProgress(s)) return null;
  var b = blank();
  for (var k in b) if (!(k in s)) s[k] = b[k];
  migrateSns3047Progress(s);
  return s;
}
function parseProgress(raw) {
  if (!raw) return null;
  try { return completeProgress(JSON.parse(raw)); } catch (e) { return null; }
}
function load() {
  try {
    var s = parseProgress(localStorage.getItem(KEY));
    if (s) return s;
    s = parseProgress(localStorage.getItem(BACKUP_KEY));
    if (s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (restoreErr) { } toast('♻️ Sauvegarde précédente restaurée'); return s; }
    return blank();
  } catch (e) { return blank(); }
}
function isValidProgress(s) {
  return !!(s && typeof s === 'object' && !Array.isArray(s) && Number.isFinite(Number(s.v)) && Number(s.v) >= 1 &&
    Number.isFinite(Number(s.xp)) && Number(s.xp) >= 0 &&
    s.units && typeof s.units === 'object' && s.srs && typeof s.srs === 'object' &&
    s.hist && typeof s.hist === 'object' && s.seen && typeof s.seen === 'object');
}
function migrateSns3047Progress(s) {
  if (!s || s.sns3047Migrated) return;
  var movedUnits = {};
  Object.keys(s.units || {}).forEach(function (key) {
    var m = key.match(/^1\.(1[2-5])$/);
    movedUnits[m ? '1.' + (+m[1] + 2) : key] = s.units[key];
  });
  s.units = movedUnits;
  var movedSrs = {};
  Object.keys(s.srs || {}).forEach(function (key) {
    var m = key.match(/^(cq|q|c)1\.(1[2-5])\.(\d+)$/);
    movedSrs[m ? m[1] + '1.' + (+m[2] + 2) + '.' + m[3] : key] = s.srs[key];
  });
  s.srs = movedSrs;
  s.sns3047Migrated = true;
}
var saveT = null;
function save() { clearTimeout(saveT); saveT = setTimeout(function () {
  try {
    if (!isValidProgress(S)) throw new Error('invalid-progress');
    var json = JSON.stringify(S), previous = localStorage.getItem(KEY);
    if (previous && previous !== json && parseProgress(previous)) localStorage.setItem(BACKUP_KEY, previous);
    localStorage.setItem(KEY, json);
  } catch (e) { toast('⚠️ Progression non enregistrée : stockage indisponible ou invalide'); }
}, 120); }
function recordSession(type, result, total, secs, scope) {
  if (!S.sessions || !Array.isArray(S.sessions)) S.sessions = [];
  S.sessions.push({ date: new Date().toISOString(), type: type, score: total ? Math.round(result / total * 100) : 0, correct: result, total: total, secs: Math.max(0, Math.round(secs || 0)), scope: scope || '' });
  if (S.sessions.length > 200) S.sessions = S.sessions.slice(-200);
  save();
}

function rollDay() {
  var t = today();
  if (S.day !== t) { S.hist[S.day] = S.xpDay; S.day = t; S.xpDay = 0; save(); }
}
function addXP(n) {
  rollDay();
  var before = S.xpDay;
  S.xp += n; S.xpDay += n;
  if (S.lastDay !== S.day) {
    if (S.lastDay && dayDiff(S.lastDay, S.day) === 1) S.streak++; else S.streak = 1;
    S.lastDay = S.day;
    if (S.streak > S.best) S.best = S.streak;
    toast('🔥 Série : ' + S.streak + ' jour' + (S.streak > 1 ? 's' : ''));
  }
  if (before < (S.goal || 50) && S.xpDay >= (S.goal || 50) && S.streakCelebratedDay !== S.day) {
    S.streakCelebratedDay = S.day;
    setTimeout(showStreakCelebration, 220);
  }
  save();
}

function streakDays() {
  var labels = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  var out = [];
  for (var i = -2; i <= 4; i++) {
    var date = dayShift(S.day, i);
    var parts = date.split('-');
    var dow = new Date(+parts[0], +parts[1] - 1, +parts[2]).getDay();
    var active = date === S.day ? S.xpDay >= (S.goal || 50) : +(S.hist[date] || 0) >= (S.goal || 50);
    out.push({ label: labels[dow], active: active, today: date === S.day });
  }
  return out;
}
function showStreakCelebration() {
  if (document.querySelector('.streak-celebration')) return;
  var days = streakDays();
  var next = (S.streak || 0) + 1;
  var layer = document.createElement('div');
  layer.className = 'streak-celebration';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-labelledby', 'streak-title');
  layer.innerHTML = '<div class="streak-top"><span class="streak-mini">🔥 ' + S.streak + '</span></div>' +
    '<div class="streak-flame" aria-hidden="true"><span></span></div>' +
    '<div class="streak-week">' + days.map(function (d) {
      return '<div class="streak-day' + (d.today ? ' today' : '') + '"><b>' + d.label + '</b><span class="' + (d.active ? 'done' : '') + '">' + (d.active ? '✓' : '') + '</span></div>';
    }).join('') + '</div>' +
    '<div class="streak-copy"><h1 id="streak-title">Série de ' + S.streak + ' jour' + (S.streak > 1 ? 's' : '') + ' !</h1>' +
    '<p>Objectif quotidien atteint. Plus qu’un jour pour une série de ' + next + ' jours.</p></div>' +
    '<button class="btn blue streak-continue" type="button">Continuer</button>';
  document.body.appendChild(layer);
  requestAnimationFrame(function () { layer.classList.add('show'); });
  layer.querySelector('.streak-continue').onclick = function () {
    layer.classList.remove('show');
    setTimeout(function () { layer.remove(); }, 220);
  };
  layer.querySelector('.streak-continue').focus();
}
/* --- cœurs --- */
function hearts() {
  if (S.unlimited) return HEART_MAX;
  var gained = Math.floor((Date.now() - (S.heartTs || Date.now())) / (HEART_MIN * 60000));
  if (gained > 0 && S.hearts < HEART_MAX) {
    S.hearts = Math.min(HEART_MAX, S.hearts + gained);
    S.heartTs = Date.now(); save();
  }
  return S.hearts;
}
function loseHeart() {
  if (S.unlimited) return HEART_MAX;
  if (S.hearts === HEART_MAX) S.heartTs = Date.now();
  S.hearts = Math.max(0, S.hearts - 1); save(); return S.hearts;
}
function gainHeart(n) { if (S.unlimited) return; S.hearts = Math.min(HEART_MAX, S.hearts + (n || 1)); save(); }
function heartIn() {
  if (S.hearts >= HEART_MAX) return '';
  var ms = HEART_MIN * 60000 - ((Date.now() - S.heartTs) % (HEART_MIN * 60000));
  var m = Math.floor(ms / 60000), s = Math.floor(ms % 60000 / 1000);
  return m + ':' + pad(s);
}

/* --- progression unité --- */
function ust(did, ui) {
  var k = uKey(did, ui);
  if (!S.units[k]) S.units[k] = { runs: 0, best: 0, crowns: 0, lesson: 0, ok: 0, ko: 0 };
  return S.units[k];
}
function docPct(d) {
  var tot = 0, got = 0;
  d.units.forEach(function (u, i) { tot += CROWN_MAX; got += ust(d.id, i).crowns; });
  return tot ? Math.round(got / tot * 100) : 0;
}
function docStarted(d) { return d.units.some(function (u, i) { return ust(d.id, i).runs > 0 || ust(d.id, i).lesson; }); }
function planInfo() {
  var contestDate = /^\d{4}-\d{2}-\d{2}$/.test(S.contestDate || '') ? S.contestDate : CONTEST_DATE;
  var rawLeft = dayDiff(today(), contestDate), left = Math.max(0, rawLeft), remaining = 0, total = 0, done = 0;
  DOCS.forEach(function (d) { d.units.forEach(function (u, i) { total++; if (ust(d.id, i).crowns >= CROWN_MAX) done++; else remaining++; }); });
  var perDay = left ? Math.ceil(remaining / left) : remaining;
  var start = /^\d{4}-\d{2}-\d{2}$/.test(S.planStart || '') ? S.planStart : today();
  var duration = Math.max(1, dayDiff(start, contestDate));
  var elapsed = Math.min(duration, Math.max(0, dayDiff(start, today())));
  var targetDone = Math.floor(total * elapsed / duration);
  var delta = done - targetDone;
  return { date: contestDate, expired: rawLeft < 0, left: left, remaining: remaining, total: total, done: done, perDay: perDay,
    targetDone: targetDone, delta: delta, ahead: delta >= 0,
    status: delta > 0 ? 'En avance' : delta < 0 ? 'En retard' : 'Dans le rythme' };
}
function dateFr(s) {
  var p = String(s || '').split('-');
  if (p.length !== 3) return s;
  return +p[2] + ' ' + ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'][+p[1] - 1] + ' ' + p[0];
}
function readinessInfo() {
  var totalUnits = 0, crownUnits = 0, ok = 0, ko = 0;
  DOCS.forEach(function (d) { d.units.forEach(function (u, i) {
    var s = ust(d.id, i); totalUnits++; crownUnits += s.crowns / CROWN_MAX; ok += s.ok || 0; ko += s.ko || 0;
  }); });
  var mastery = totalUnits ? crownUnits / totalUnits : 0;
  var seen = coverage();
  var accuracy = ok + ko ? ok / (ok + ko) : 0;
  var due = dueList().length, tracked = Object.keys(S.srs).length;
  var revision = tracked ? Math.max(0, 1 - due / Math.max(10, tracked)) : 0;
  var score = Math.round((mastery * .35 + seen * .30 + accuracy * .25 + revision * .10) * 100);
  var label = score >= 80 ? 'Prêt pour l’épreuve' : score >= 60 ? 'Bonne progression' : score >= 35 ? 'Base en construction' : 'Démarrage';
  return { score: score, label: label, mastery: Math.round(mastery * 100), coverage: Math.round(seen * 100), accuracy: Math.round(accuracy * 100), revision: Math.round(revision * 100) };
}
function weeklyInfo() {
  var total = 0, active = 0;
  for (var i = 0; i < 7; i++) { var day = dayShift(today(), -i), xp = day === today() ? S.xpDay : (S.hist[day] || 0); total += xp; if (xp > 0) active++; }
  var target = (S.goal || 50) * 7;
  return { total: total, target: target, active: active, pct: Math.min(100, Math.round(total / Math.max(1, target) * 100)) };
}
function requestNotifications() {
  if (!('Notification' in window)) { toast('Notifications non disponibles dans ce navigateur'); return; }
  Notification.requestPermission().then(function (p) { S.notify = p === 'granted'; save(); toast(p === 'granted' ? '🔔 Rappels activés' : 'Notifications refusées'); render(); });
}
function dailyReminder() {
  if (S.notify && window.Notification && Notification.permission === 'granted' && S.notifyDay !== today() && S.xpDay < S.goal) {
    var pi = planInfo(); new Notification('PrepMe · ton concours approche', { body: pi.left + ' jours restants. Vise ' + pi.perDay + ' unité(s) aujourd’hui.' });
    S.notifyDay = today(); save();
  }
}

/* --- SRS : paliers 0-5, intervalles 1 / 3 / 7 / 16 / 35 / 90 jours ---
   Règle : une erreur DESCEND DE 2 PALIERS, elle ne remet jamais à zéro. */
var BOX_IV = [1, 3, 7, 16, 35, 90];
function srs(k) {
  if (!S.srs[k]) S.srs[k] = { b: 0, due: today(), lap: 0, seen: 0 };
  if (S.srs[k].b == null) S.srs[k].b = 0;        // reprise d'une ancienne sauvegarde
  return S.srs[k];
}
function grade(k, g) {                      // g : 0 = raté, 3 dur, 4 bien, 5 facile
  var it = srs(k);
  it.seen = (it.seen || 0) + 1;
  if (g < 3) {
    it.b = Math.max(0, it.b - 2);           // jamais de remise à zéro
    it.lap = (it.lap || 0) + 1;
    it.due = today();                       // repasse dans la séance du jour
  } else if (g === 3) {
    it.due = dayShift(today(), Math.max(1, Math.round(BOX_IV[it.b] / 2)));
  } else {
    it.b = Math.min(5, it.b + (g === 5 ? 2 : 1));
    it.due = dayShift(today(), BOX_IV[it.b]);
  }
  save();
}
/* un item est « têtu » quand il a été raté au moins 3 fois */
function isStubborn(k) { return (S.srs[k] && S.srs[k].lap || 0) >= 3; }
function dueList() {
  var t = today(), out = [];
  for (var k in S.srs) { if (S.srs[k].due <= t) out.push(k); }
  return out;
}
function resolveKey(k) {
  if (k.slice(0, 2) === 'cq') {
    var pq = k.slice(2).split('.'), uq = unit(pq[0], pq[1]); if (!uq) return null;
    var qq = uq.qs[+pq[2]];
    return qq ? { type: 'c', c: qcCard(qq), k: k, d: +pq[0], u: +pq[1] } : null;
  }
  var kind = k[0], p = k.slice(1).split('.');
  var u = unit(p[0], p[1]); if (!u) return null;
  if (kind === 'q') { var q = u.qs[+p[2]]; return q ? { type: 'q', q: q, k: k, d: +p[0], u: +p[1] } : null; }
  var c = u.cards[+p[2]]; return c ? { type: 'c', c: c, k: k, d: +p[0], u: +p[1] } : null;
}

/* ------------------------------------------------------ surlignage leçons */
/* Reprend la charte du document source : definition (jaune) · date (bleu)
   · chiffre cle (vert) · loi ou article (rose). */
var MOIS = 'janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre';
var HLRX = [
  ['art', /\b(?:lois?[-\s]?cadres?|loi|dahirs?|décrets?|arrêtés?|circulaires?)\s*(?:n[°o]\s*)?\d{1,4}\s*[-.–]\s*\d{2,3}\b/gi],
  ['art', /\bart(?:icle)?s?\.?\s*\d+(?:\s*(?:et|,|à)\s*\d+)*\b/gi],
  ['art', /\b\d{2}\s?[-–]\s?\d{2}\b/g],
  ['date', new RegExp('\\b\\d{1,2}(?:er)?\\s+(?:' + MOIS + ')\\s+\\d{4}\\b', 'gi')],
  ['date', new RegExp('\\b(?:' + MOIS + ')\\s+\\d{4}\\b', 'gi')],
  ['date', /\b\d{1,2}[./]\d{1,2}[./]\d{4}\b/g],
  ['date', /\b(?:1[5-9]\d{2}|20\d{2})\b/g],
  ['num', /\b\d{1,3}(?:[  ]\d{3})*(?:[.,]\d+)?\s*%/g],
  ['num', /\b\d{1,3}(?:[  ]\d{3})*(?:[.,]\d+)?\s+(?:pour\s+\d[\d  ]*|milli(?:on|ard)s?|dirhams?|DH)\b/gi],
  ['num', /\b\d{1,3}(?:[.,]\d+)?\s+(?:piliers?|principes?|objectifs?|fonctions?|axes?|actions?|mesures?|missions?|directions?|divisions?|valeurs?|approches?|secteurs?|acteurs?|niveaux|catégories?|composantes?|éléments?|types?|critères?|qualités?|chapitres?|articles?|conditions?|étapes?|domaines?|instances?|pôles?|modes?|formes?|voies?|volets?|raisons?|cadres?|sources?|groupes?|unités?|paliers?|jours?|mois|ans|années?|semaines?|heures?|lits?|places?|habitants?|professionnels?|cliniques?|officines?|structures?|établissements?|services?|départements?|comités?|conseils?|membres?|représentants?|exclusions?|devoirs?|droits?)\b/gi]
];
var HLTOK = '\u0001';
/* --------------------------------------------- charte emoji des leçons */
/* Reprend la mise en forme du document source : chaque item de liste porte
   une émoji thématique, les énumérations sont numérotées en pastilles,
   les définitions passent en bloc citation, les pièges en encadré orange. */
var EMO_MAP = [
  [/gouvernance|régulation|pilotage|État|ministère|administration|tutelle|institutionnel/i, '\u{1F3DB}️'],
  [/ressources? humaines?|personnel|infirmi|médecin|sage-femme|professionnel|effectif|soignant/i, '\u{1F469}‍⚕️'],
  [/hôpital|hospitali|offre de soins|établissement|CHU|CHP|CHR|clinique|centre de santé|lit/i, '\u{1F3E5}'],
  [/digitalis|numérique|informati|système d.information|télémédecine|dossier électronique/i, '\u{1F4BB}'],
  [/financ|budget|coût|dépense|économi|dirham|tarif|coûteux|payant|gratuit|assurance|AMO|RAMED|cotisation/i, '\u{1F4B0}'],
  [/\bloi\b|loi-cadre|décret|dahir|article|juridique|réglement|arrêté|texte de loi|circulaire|code/i, '⚖️'],
  [/carte sanitaire|territo|région|SROS|découpage|spatial|province|préfecture|zone|répartition géo/i, '\u{1F5FA}️'],
  [/prévention|préventi|protection de la santé|sécurité sanitaire|prophyla/i, '\u{1F6E1}️'],
  [/vaccin|immunisation|injection/i, '\u{1F489}'],
  [/objectif|finalité|\bbut\b|cible|visée/i, '\u{1F3AF}'],
  [/composante|intégr|complémentarité|articulation entre/i, '\u{1F9E9}'],
  [/indicateur|évaluation|statistiq|mesure|\btaux\b|données|enquête|\bratio\b|surveillance/i, '\u{1F4CA}'],
  [/dépistage|diagnostic|détection|repérage|analyse/i, '\u{1F50D}'],
  [/recherche|étude scientifique|laboratoire|science/i, '\u{1F52C}'],
  [/médicament|pharmac|traitement|thérapeut|posologie|générique/i, '\u{1F48A}'],
  [/transmissible|infecti|épidémi|virus|microbe|contagi|pandémi|tuberculose|VIH|paludisme/i, '\u{1F9A0}'],
  [/partenariat|coopération|collabor|intersectoriel|multisectoriel|public-privé|participation/i, '\u{1F91D}'],
  [/population|communauté|collectivité|citoyen|usager|famille|habitant|ménage|bénéficiaire/i, '\u{1F465}'],
  [/\bOMS\b|international|mondial|\bglobal|Alma-Ata|Nations Unies|ONU|UNICEF/i, '\u{1F30D}'],
  [/Maroc|marocain|national/i, '\u{1F1F2}\u{1F1E6}'],
  [/constitution|déclaration|charte|convention|traité|pacte/i, '\u{1F4DC}'],
  [/\bplan\b|programme|stratégi|projet|schéma|feuille de route|réforme/i, '\u{1F4CB}'],
  [/communautaire|\blocal|quartier|milieu|proximité|douar/i, '\u{1F3D8}️'],
  [/\bgenre\b|femme|parité|maternel|égalité hommes/i, '♀️'],
  [/enfant|infantile|pédiatri|nourrisson|néonatal|nouveau-né|scolaire/i, '\u{1F9D2}'],
  [/grossesse|maternité|accouchement|prénatal|obstétri|parturiente/i, '\u{1F930}'],
  [/nutrition|alimentai?re|aliment|malnutrition|carence|allaitement/i, '\u{1F37D}️'],
  [/\beau\b|assainissement|hygiène du milieu|salubrité|potable|déchet/i, '\u{1F6B0}'],
  [/environnement|écolog|pollution|\bair\b|climat|bruit/i, '\u{1F33F}'],
  [/tabac|alcool|drogue|addiction|toxicoman|stupéfiant/i, '\u{1F6AD}'],
  [/mental|psych|mnémo|mémoire|cognitif|stress|dépression/i, '\u{1F9E0}'],
  [/handicap|incapacité|réadaptation|réinsertion|rééducation/i, '♿'],
  [/durée|année|période|calendrier|échéance|délai|\bans\b/i, '\u{1F4C5}'],
  [/continuité|processus|cycle|adaptation|permanence|suivi/i, '\u{1F504}'],
  [/qualité|excellence|performance|accréditation|certification/i, '⭐'],
  [/accès|accessib|proximité géographique|disponibilité/i, '\u{1F6AA}'],
  [/fonction|mécanisme|organisation|structuration|système/i, '⚙️'],
  [/promotion|communicat|sensibilis|éducation|mobilisation|IEC|plaidoyer/i, '\u{1F4E3}'],
  [/formation|enseignement|apprentissage|école|institut|stage|cursus/i, '\u{1F4DA}'],
  [/résultat|gestion par résultat|rendement|succès|réussite/i, '\u{1F3C6}'],
  [/coordination|réseau|filière|liaison|référence|contre-référence/i, '\u{1F517}'],
  [/approche|orientation|méthode|démarche|axe/i, '\u{1F9ED}'],
  [/urgence|riposte|catastrophe|crise|alerte|flambée|SAMU/i, '⚡'],
  [/infrastructure|bâtiment|locaux|structure|équipement|matériel|plateau technique/i, '\u{1F3E2}'],
  [/moyen|outil|dispositif|instrument/i, '\u{1F6E0}️'],
  [/solidarité|équité|justice sociale|vulnérab|pauvre|démuni/i, '\u{1F49E}'],
  [/décès|mortalité|létalité|espérance de vie/i, '⚰️'],
  [/naissance|natalité|fécondité|démograph/i, '\u{1F476}'],
  [/chronique|ALD|diabète|cancer|hypertension|non transmissible/i, '\u{1F3E5}'],
  [/\bdroit|devoir|obligation|responsabilité/i, '⚖️'],
  [/principe|valeur|éthique|déontolog|secret/i, '\u{1F48E}'],
  [/contrôle|inspection|audit|sanction|supervision/i, '\u{1F50E}'],
  [/couverture|universel|généralis|CMB|protection sociale/i, '\u{1F6E1}️'],
  [/soins? curatif|guérison|curatif/i, '\u{1F691}'],
  [/palliatif|souffrance|douleur|fin de vie/i, '\u{1F54A}️'],
  [/prestataire|dispensateur|producteur de soins/i, '\u{1F469}‍⚕️'],
  [/directeur|chef de|responsable|président|encadrement|gestionnaire|ministr|cabinet/i, '\u{1F9D1}‍\u{1F4BC}'],
  [/ingénieur|technicien|biomédical|maintenance|informaticien/i, '\u{1F9D1}‍\u{1F527}'],
  [/commission|comité|conseil|instance|assemblée|CMDP|bureau de/i, '\u{1F91D}'],
  [/norme|procédure|standard|référentiel|protocole|règlement intérieur/i, '\u{1F4CF}'],
  [/recommandation|\bavis\b|proposition|note de service|\bPEH\b|rapport/i, '\u{1F4CC}'],
  [/archive|dossier|secrétariat|affaires générales|courrier|document/i, '\u{1F5C2}️'],
  [/parc-auto|véhicule|transport|ambulance|évacuation/i, '\u{1F691}'],
  [/caisse|CNSS|CNOPS|ANAM|mutuelle|organisme gestionnaire|remboursement/i, '\u{1F3E6}'],
  [/facturation|recouvrement|tarification|\bdevis\b|honoraire/i, '\u{1F9FE}'],
  [/Bismarck|Beveridge|modèle|typologie|libéral|étatisé/i, '\u{1F310}'],
  [/hospitalisation|\blit\b|séjour|admission|accueil/i, '\u{1F6CF}️'],
  [/stérilisation|désinfection|hygiène hospitalière|asepsie|nettoyage/i, '\u{1F9F4}'],
  [/consultation|examen clinique|\bvisite\b|\bsoins\b/i, '\u{1FA7A}'],
  [/stock|approvisionnement|logistique|magasin|commande/i, '\u{1F4E6}'],
  [/sang|transfusion|hémato/i, '\u{1FA78}'],
  [/pôle|division|département|\bservice\b|unité|cellule/i, '\u{1F4C1}'],
  [/membre|composé de|comprend|comporte|regroupe/i, '\u{1F465}'],
  [/élection|\bvote\b|désignation|mandat|nomination/i, '\u{1F5F3}️'],
  [/catégorie|\btype\b|classe|niveau|palier|échelon/i, '\u{1F516}'],
  [/planif|gestion|gérer|administrer|piloter|organiser/i, '\u{1F4D0}'],
  [/garde|astreinte|permanence|horaire|\bnuit\b|24h/i, '\u{1F550}'],
  [/incident|signalement|informer|hiérarchie|notification/i, '\u{1F514}'],
  [/registre|enregistrement|inscription|immatricul|\bfiche\b/i, '\u{1F4DD}'],
  [/sortie|sortant|billet|congé|décharge|transfert/i, '\u{1F6B6}'],
  [/autonomie|indépendan|liberté|délégation|décentralis/i, '\u{1F513}'],
  [/mission|attribution|tâche|\brôle\b|prérogative/i, '\u{1F396}️'],
  [/technolog|innovation|brevet|numérisation|recherche appliquée/i, '\u{1F680}'],
  [/équipe|multidisciplinaire|pluridisciplinaire|collectif|binôme/i, '\u{1F91D}'],
  [/développ|renforcement|amélioration|extension|mise à niveau/i, '\u{1F4C8}'],
  [/liste|répertoire|nomenclature|inventaire|recensement/i, '\u{1F4D1}'],
  [/pays|monde|étranger|comparaison internationale|Cuba|France|Royaume-Uni/i, '\u{1F30E}']
];
var EMO_DEF = '\u{1F539}';
var KEYCAP = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
var RX_HASEMO = /^\s*(?:<\/?[a-z][^>]*>\s*)*(?:[\uD83C-\uDBFF][\uDC00-\uDFFF]|[←-⇿⌀-➿⬀-⯿☠-⛿]|\d️?⃣)/;
function stripTags(s) { return String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); }
function pickEmoji(txt) {
  for (var i = 0; i < EMO_MAP.length; i++) if (EMO_MAP[i][0].test(txt)) return EMO_MAP[i][1];
  return EMO_DEF;
}
function emojify(html) {
  var h = String(html);
  /* 1. énumérations 1. 2. 3. → pastilles (avant tout découpage) */
  h = h.replace(/(^|<br\s*\/?>|<p>|<\/b>\s|·\s|:\s)\s*<b>([1-9])\.<\/b>/g,
    function (m, pre, n) { return pre + '<b>' + KEYCAP[+n] + '</b>'; });
  h = h.replace(/(^|<br\s*\/?>|<p>|<li>)\s*<b>([1-9])\.\s+/g,
    function (m, pre, n) { return pre + '<b>' + KEYCAP[+n] + ' '; });
  h = h.replace(/(^|<br\s*\/?>|<p>|·\s|:\s)\s*([1-9])\.\s/g,
    function (m, pre, n) { return pre + KEYCAP[+n] + ' '; });
  /* 2. définitions entre guillemets → bloc citation */
  h = h.replace(/<p>([\s\S]*?)<\/p>/g, function (m, inner) {
    var i = inner.indexOf('«'), j = inner.lastIndexOf('»');
    if (i < 0 || j < i + 40 || inner.indexOf('<br') >= 0) return m;
    var intro = inner.slice(0, i).trim(), quote = inner.slice(i, j + 1), rest = inner.slice(j + 1).trim();
    return (intro ? '<p>' + intro + '</p>' : '') + '<div class="quote">' + quote + '</div>' +
      (stripTags(rest).length > 2 ? '<p>' + rest + '</p>' : '');
  });
  /* 3. paragraphes découpés par <br> → liste à émojis */
  h = h.replace(/<p>([\s\S]*?)<\/p>/g, function (m, inner) {
    if (inner.indexOf('<br') < 0) return m;
    var lines = inner.split(/<br\s*\/?>/), out = '', n = 0;
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i].replace(/^\s+|\s+$/g, '');
      if (!stripTags(l)) continue;
      n++; out += '<li>' + bullet(l) + l + '</li>';
    }
    return n < 2 ? m : '<ul class="emo">' + out + '</ul>';
  });
  /* 4. énumérations séparées par « · » → liste à émojis */
  h = h.replace(/<p>([\s\S]*?)<\/p>/g, function (m, inner) {
    if (inner.indexOf('·') < 0 || inner.split('·').length < 3) return m;
    var intro = '', body = inner, k = inner.indexOf(' : ');
    if (k > 0 && k < inner.indexOf('·')) { intro = inner.slice(0, k + 2); body = inner.slice(k + 2); }
    var parts = body.split('·'), out = '', n = 0;
    for (var i = 0; i < parts.length; i++) {
      var l = parts[i].replace(/^\s+|[\s.]+$/g, '');
      if (!stripTags(l) || stripTags(l).length > 220) return m;
      n++; out += '<li>' + bullet(l) + l + '</li>';
    }
    return n < 3 ? m : (intro ? '<p>' + intro + '</p>' : '') + '<ul class="emo">' + out + '</ul>';
  });
  /* 5. listes déjà écrites en <ul> (contenu futur) */
  h = h.replace(/<ul(?![^>]*class)/g, '<ul class="emo"');
  h = h.replace(/<li>([\s\S]*?)<\/li>/g, function (m, inner) {
    return RX_HASEMO.test(inner) ? m : '<li>' + pickEmoji(stripTags(inner)) + ' ' + inner + '</li>';
  });
  /* 6. pièges et mnémos → encadré orange */
  h = h.replace(/<p>\s*(⚠️?|\u{1F9E0})\s*([\s\S]*?)<\/p>/gu,
    function (m, ic, body) { return '<div class="trap">' + ic + ' ' + body + '</div>'; });
  h = h.replace(/<div class="warn">\s*(?!⚠)/g, '<div class="trap">⚠️ ');
  h = h.replace(/<div class="tip">\s*(?![\u{1F4A1}\u{1F9E0}])/gu, '<div class="tip">\u{1F4A1} ');
  /* 7. titres sans émoji */
  h = h.replace(/<(h3|h4)>([\s\S]*?)<\/\1>/g, function (m, tag, inner) {
    if (RX_HASEMO.test(inner)) return m;
    return '<' + tag + '>' + pickEmoji(stripTags(inner)) + ' ' + inner + '</' + tag + '>';
  });
  return h;
}
function bullet(line) { return RX_HASEMO.test(line) ? '' : pickEmoji(stripTags(line)) + ' '; }

var RX_DEF = /«(?:(?!«|<\/p>|<\/h3>|<\/li>|<\/div>)[\s\S]){2,600}?»/g;
function decorate(html) {
  if (!html || !S.hl) return html;
  html = emojify(html);
  html = String(html).replace(RX_DEF, function (m) { return '<span class="hl def">' + m + '</span>'; });
  var parts = String(html).split(/(<[^>]*>)/);
  for (var i = 0; i < parts.length; i++) {
    if (!parts[i] || parts[i].charAt(0) === '<') continue;
    parts[i] = markup(parts[i]);
  }
  return parts.join('');
}
function markup(text) {
  var store = [];
  function keep(cls) {
    return function (m) {
      store.push('<span class="hl ' + cls + '">' + m + '</span>');
      return HLTOK + (store.length - 1) + HLTOK;
    };
  }
  for (var i = 0; i < HLRX.length; i++) text = text.replace(HLRX[i][1], keep(HLRX[i][0]));
  return text.replace(new RegExp(HLTOK + '(\\d+)' + HLTOK, 'g'), function (_, n) { return store[+n]; });
}
function legendHL() {
  if (!S.hl) return '';
  return '<div class="legend-hl">🖍️' +
    '<i><span class="sw" style="background:#fff3b0"></span>💡 définition</i>' +
    '<i><span class="sw" style="background:#bbdefb"></span>📅 date</i>' +
    '<i><span class="sw" style="background:#c8e6c9"></span>🔢 chiffre clé</i>' +
    '<i><span class="sw" style="background:#f8bbd0"></span>⚖️ loi / article</i></div>';
}

/* ------------------------------------------------------------------ util */
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function rich(s) { return String(s == null ? '' : s); }   // le contenu est de confiance (généré localement)
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function el(id) { return document.getElementById(id); }
function toast(msg) {
  var t = document.createElement('div'); t.className = 'toast'; t.innerHTML = rich(msg);
  document.body.appendChild(t); setTimeout(function () { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 1700);
  setTimeout(function () { t.remove(); }, 2100);
}
function confetti() {
  var c = document.createElement('div'); c.className = 'confetti';
  var cols = ['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff'];
  for (var i = 0; i < 40; i++) {
    var s = document.createElement('i');
    s.style.left = Math.random() * 100 + 'vw'; s.style.top = '-20px';
    s.style.background = cols[i % cols.length];
    s.style.animationDuration = (1.2 + Math.random() * 1.2) + 's';
    s.style.animationDelay = (Math.random() * .4) + 's';
    c.appendChild(s);
  }
  document.body.appendChild(c); setTimeout(function () { c.remove(); }, 2800);
}

/* ------------------------------------------------------------------ sons */
var AC = null;
function beep(kind) {
  if (!S.sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === 'suspended') AC.resume();
    var seq = kind === 'ok' ? [[660, 0], [880, .08]] :
      kind === 'ko' ? [[200, 0], [150, .09]] :
        kind === 'up' ? [[523, 0], [659, .09], [784, .18], [1047, .27]] : [[440, 0]];
    seq.forEach(function (p) {
      var o = AC.createOscillator(), g = AC.createGain();
      o.type = kind === 'ko' ? 'square' : 'sine';
      o.frequency.value = p[0];
      var t0 = AC.currentTime + p[1];
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(kind === 'ko' ? .12 : .16, t0 + .012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + .19);
      o.connect(g); g.connect(AC.destination); o.start(t0); o.stop(t0 + .22);
    });
  } catch (e) { }
}
function vibrate(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { } }

/* ----------------------------------------------------------------- thème */
function applyTheme() {
  var t = S.theme;
  if (t === 'auto') t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.setAttribute('data-font-scale', S.fontScale || 'normal');
  var m = document.querySelector('meta[name=theme-color]');
  if (m) m.content = t === 'dark' ? '#111820' : '#58cc02';
}
if (window.matchMedia) { try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); } catch (e) { } }

/* --------------------------------------------------------------- routeur */
function go(h) {
  var path = '/' + String(h || '').replace(/^\/+/, '');
  if (/^\/(?:lesson|quiz|review|exam|cards)(?:\/|$)/.test(path)) { S.lastRoute = path.slice(1); save(); }
  var target = '#' + path;
  if (location.hash === target) { render(); return; }
  location.hash = path;
}
function route() { return (location.hash || '#/').replace(/^#\/?/, '').split('/'); }
window.addEventListener('hashchange', render);

var ROOT;
function render() {
  rollDay(); hearts();
  var r = route(), v = r[0] || '';
  window.scrollTo(0, 0);
  var html;
  switch (v) {
    case '': case 'home': html = vHome(); break;
    case 'doc': html = vDoc(r[1]); break;
    case 'lesson': html = vLesson(r[1], r[2]); break;
    case 'quiz': html = vQuizStart(r[1], r[2]); break;
    case 'cards': html = vCardsStart(r[1], r[2]); break;
    case 'review': html = vReview(); break;
    case 'concours': html = vConcours(); break;
    case 'concourspdf': html = vConcoursPdfView(r[1]); break;
    case 'pdf': html = vPdfs(); break;
    case 'pdfview': html = vPdfView(r[1], r[2], r[3], r[4]); break;
    case 'exam': html = vExamSetup(r[1]); break;
    case 'stats': html = vStats(); break;
    case 'set': html = vSettings(); break;
    case 'about': html = vAbout(); break;
    case 'search': html = vSearch(); break;
    default: html = vHome();
  }
  ROOT.innerHTML = html + navBar(v);
  bind();
  trackScreen(v || 'home');
  if (v === 'pdfview' || v === 'concourspdf') initPdfReader();
}

/* ------------------------------------------------------------ composants */
function bar(title, back) {
  return '<div class="topbar">' +
    (back ? '<button class="iconbtn" data-go="' + back + '" aria-label="Retour">←</button>' : '<span style="width:34px"></span>') +
    '<span class="ttl">' + esc(title) + '</span>' +
    '<span class="pill hearts">' + (S.unlimited ? '♾️' : '❤️ ' + hearts()) + '</span>' +
    '</div>';
}
function navBar(v) {
  var d = dueList().length;
  var items = [
    ['', '🏠', 'Accueil'],
    ['review', '🧠', 'Évaluation intelligente'],
    ['concours', '📝', 'Concours'],
    ['pdf', '📚', 'Cours PDF'],
    ['cards', '🃏', 'Cartes'],
    ['stats', '📊', 'Statistiques'],
    ['set', '⚙️', 'Réglages']
  ];
  return '<nav class="nav" aria-label="Navigation principale"><div class="in">' + items.map(function (it) {
    var on = (v === it[0] || (v === 'home' && it[0] === '')) ? ' on' : '';
    var dot = (it[0] === 'review' && d) ? '<span class="dot">' + (d > 99 ? '99+' : d) + '</span>' : '';
    var label = it[2] === 'Évaluation intelligente' ? 'Évaluation<br>intelligente' : it[2];
    return '<button type="button" class="' + on.trim() + '" data-go="' + it[0] + '" aria-label="' + it[2] + '"' + (on ? ' aria-current="page"' : '') + '><span class="ic" aria-hidden="true">' + it[1] + '</span><span class="nav-label">' + label + '</span>' + dot + '</button>';
  }).join('') + '</div></nav>';
}
function vPdfs() {
  var list = window.PREP_PDFS || [];
  var h = bar('Cours PDF', '') + '<div class="wrap"><h1>📚 Cours PDF</h1><div class="sub">Les documents sources des modules sont disponibles hors ligne dans la version PWA et l’APK.</div><div class="spacer"></div>';
  list.forEach(function (p, i) {
    var href = 'cours-pdf/' + encodeURIComponent(p[2]);
    h += '<article class="card pdf-course"><div class="pdf-course-main"><div class="pdf-course-icon">📄</div><div class="pdf-course-copy"><b>' + esc(p[0] + '. ' + p[1]) + '</b><div class="sub">Lecture dans PrepMe · disponible hors ligne</div></div></div><div class="pdf-course-actions"><button class="btn blue sm" data-go="pdfview/' + i + '">👁️ Visualiser</button><a class="btn ghost sm" download href="' + href + '">⬇️ Télécharger</a></div></article>';
  });
  return h + '</div>';
}
function vPdfView(index, startPage, backDid, backUi) {
  var p = (window.PREP_PDFS || [])[+index];
  if (!p) return vPdfs();
  var href = 'cours-pdf/' + encodeURIComponent(p[2]);
  var fallback = githubRawFile('cours-pdf', p[2]);
  var back = backDid !== undefined && backUi !== undefined ? 'lesson/' + backDid + '/' + backUi : 'pdf';
  return bar(p[1], back) + '<div class="pdf-reader" data-pdf-src="' + href + '" data-pdf-embedded="' + esc(p[2]) + '" data-pdf-fallback="' + esc(fallback) + '" data-pdf-page="' + Math.max(1, +(startPage || 1)) + '">' +
    '<div class="pdf-toolbar"><button class="pdf-tool" id="pdfPrev">←</button><span id="pdfPage">Page…</span><button class="pdf-tool" id="pdfNext">→</button><button class="pdf-tool" id="pdfZoomOut">−</button><span id="pdfZoom">100%</span><button class="pdf-tool" id="pdfZoomIn">+</button></div>' +
    '<div class="pdf-status" id="pdfStatus">Chargement du PDF…</div><div class="pdf-canvas-wrap"><canvas id="pdfCanvas"></canvas></div>' +
    '<div class="pdf-download"><a class="btn ghost sm" download href="' + href + '">⬇️ Télécharger le PDF</a></div></div>';
}

var PDF_READER = { doc: null, page: 1, scale: 1.15, rendering: false, pending: null };
function pdfBase64Bytes(value) {
  var raw = atob(value), bytes = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes;
}
function initPdfReader() {
  var box = ROOT.querySelector('[data-pdf-src]');
  if (!box) return;
  var status = el('pdfStatus');
  if (!window.pdfjsLib) { status.textContent = 'Lecteur PDF indisponible.'; return; }
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdf.worker.min.js';
  var requestedPage = Math.max(1, +(box.getAttribute('data-pdf-page') || 1));
  PDF_READER = { doc: null, page: requestedPage, scale: 1.15, rendering: false, pending: null };
  var fallbackSrc = box.getAttribute('data-pdf-fallback');
  var embeddedName = box.getAttribute('data-pdf-embedded');
  var embeddedB64 = embeddedName && window.PREP_COURSE_PDFS_B64 && window.PREP_COURSE_PDFS_B64[embeddedName];
  function loadPdf(src, usingFallback) {
    window.pdfjsLib.getDocument(src).promise.then(function (doc) {
      PDF_READER.doc = doc; status.style.display = 'none';
      if (usingFallback) { var dl = box.querySelector('.pdf-download a'); if (dl) dl.href = fallbackSrc; }
      renderPdfPage(Math.min(requestedPage, doc.numPages));
    }).catch(function () {
      if (!usingFallback && fallbackSrc) { status.textContent = 'Source locale indisponible · chargement depuis GitHub…'; loadPdf(fallbackSrc, true); }
      else status.textContent = 'Impossible d’afficher ce PDF. Vérifiez la connexion ou utilisez Télécharger.';
    });
  }
  if (embeddedB64) {
    status.textContent = 'Ouverture de la page ' + requestedPage + '…';
    window.pdfjsLib.getDocument({ data: pdfBase64Bytes(embeddedB64) }).promise.then(function (doc) {
      PDF_READER.doc = doc; status.style.display = 'none'; renderPdfPage(Math.min(requestedPage, doc.numPages));
    }).catch(function () { status.textContent = 'Impossible d’ouvrir le PDF intégré.'; });
  } else loadPdf(box.getAttribute('data-pdf-src'), false);
  el('pdfPrev').onclick = function () { if (PDF_READER.page > 1) renderPdfPage(PDF_READER.page - 1); };
  el('pdfNext').onclick = function () { if (PDF_READER.doc && PDF_READER.page < PDF_READER.doc.numPages) renderPdfPage(PDF_READER.page + 1); };
  el('pdfZoomOut').onclick = function () { PDF_READER.scale = Math.max(.65, PDF_READER.scale - .15); renderPdfPage(PDF_READER.page); };
  el('pdfZoomIn').onclick = function () { PDF_READER.scale = Math.min(2.5, PDF_READER.scale + .15); renderPdfPage(PDF_READER.page); };
}
function renderPdfPage(number) {
  if (!PDF_READER.doc) return;
  if (PDF_READER.rendering) { PDF_READER.pending = number; return; }
  PDF_READER.rendering = true;
  PDF_READER.doc.getPage(number).then(function (page) {
    var canvas = el('pdfCanvas'), wrap = canvas.parentNode, raw = page.getViewport({ scale: 1 });
    var fit = Math.max(.25, (wrap.clientWidth - 16) / raw.width), viewport = page.getViewport({ scale: fit * PDF_READER.scale });
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(viewport.width * ratio); canvas.height = Math.floor(viewport.height * ratio);
    canvas.style.width = Math.floor(viewport.width) + 'px'; canvas.style.height = Math.floor(viewport.height) + 'px';
    return page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport, transform: ratio === 1 ? null : [ratio, 0, 0, ratio, 0, 0] }).promise;
  }).then(function () {
    PDF_READER.page = number; PDF_READER.rendering = false;
    el('pdfPage').textContent = 'Page ' + number + ' / ' + PDF_READER.doc.numPages;
    el('pdfZoom').textContent = Math.round(PDF_READER.scale * 100) + '%';
    if (PDF_READER.pending !== null) { var next = PDF_READER.pending; PDF_READER.pending = null; renderPdfPage(next); }
  }).catch(function () { PDF_READER.rendering = false; el('pdfStatus').style.display = 'block'; el('pdfStatus').textContent = 'Erreur pendant l’affichage de cette page.'; });
}
function ring(pct) {
  var r = 24, c = 2 * Math.PI * r, o = c * (1 - Math.min(1, pct));
  return '<div class="ring"><svg width="56" height="56">' +
    '<circle cx="28" cy="28" r="' + r + '" stroke="rgba(255,255,255,.3)" stroke-width="7" fill="none"/>' +
    '<circle cx="28" cy="28" r="' + r + '" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + o.toFixed(1) + '"/>' +
    '</svg><div class="txt">' + Math.round(pct * 100) + '%</div></div>';
}

/* ------------------------------------------------------- vue CONCOURS */
var CONCOURS_VIEWER_URLS = {};
function concoursViewerUrl(htmlFile) {
  var embedded = window.CNC_CONCOURS_VIEWERS_B64 && window.CNC_CONCOURS_VIEWERS_B64[htmlFile];
  if (!embedded) return 'concours-commun/' + htmlFile;
  if (!CONCOURS_VIEWER_URLS[htmlFile]) {
    var binary = atob(embedded), bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    CONCOURS_VIEWER_URLS[htmlFile] = URL.createObjectURL(new Blob([bytes], { type: 'text/html;charset=utf-8' }));
  }
  return CONCOURS_VIEWER_URLS[htmlFile];
}
var CONCOURS_DOCS = [
  ['08- CNC Marrakech - Commun 2024-1.pdf', 'CNC Marrakech · Commun 2024'],
  ['15- CNC Marrakech - Commun 2025-2.pdf', 'CNC Marrakech · Commun 2025'],
  ['Chu Marrakech.pdf', 'CHU Marrakech'],
  ['CNC Beni Mellal Khénifra 2023 Avec Justification.pdf', 'CNC Beni Mellal-Khénifra 2023 · corrigé'],
  ['CNC Guelmim 2023 Avec Justification.pdf', 'CNC Guelmim 2023 · corrigé'],
  ['cnc rect Marrakech 2025-1.pdf', 'CNC Marrakech 2025 · rectificatif'],
  ['CNC Tanger 2023 - preuve 1 Avec Justification.pdf', 'CNC Tanger 2023 · corrigé'],
  ['commun marrakech 2024.pdf', 'Commun Marrakech 2024'],
  ['Concours CHU MARRAKECH 2020.pdf', 'Concours CHU Marrakech 2020'],
  ['Concours CHU SM 2024 Avec Justification.pdf', 'Concours CHU SM 2024 · corrigé'],
  ['Concours Commun 03 Mars 2019 Avec Justification.pdf', 'Concours commun · 3 mars 2019 · corrigé'],
  ['Concours Commun National 10 Juin 2018 Avec Justification.pdf', 'Concours commun national · 10 juin 2018 · corrigé'],
  ['Concours commun souss massa 2024.pdf', 'Concours commun Souss-Massa 2024'],
  ['Concours ISFSC Région  Marrakech 2024 Avec Justification.docx-1.pdf', 'ISFSC Marrakech 2024 · corrigé'],
  ['Concours National 26 Juin 2026 Avec Justification.pdf', 'Concours national · 26 juin 2026 · corrigé'],
  ['Concours Région Fès Meknes Avec Justification.pdf', 'Concours région Fès-Meknès · corrigé'],
  ['correction commun marrakech.pdf', 'Correction commun Marrakech'],
  ['Etat Marrakech commun 2024VF.pdf', 'État Marrakech commun 2024'],
  ['QCM_marrakech_2024_logo_arriere_plan_plus_clair-1.pdf', 'QCM Marrakech 2024'],
  ['Recueil des Epreuves du Concours ITS 2021-2025.pdf', 'Recueil des épreuves du concours ITS 2021–2025'],
  ['draa 2024.pdf', 'Draa-Tafilalet · Commun 2024'],
  ['Concours de draa Tafilalet octobre 2021.pdf', 'Draa-Tafilalet · octobre 2021'],
  ['DRAA 2025.pdf', 'Draa-Tafilalet · concours 2025'],
  ['CamScanner 22-06-2026 20.39.pdf', 'Sujet scanné · juin 2026'],
  ['beni mellal 2025 commun .pdf', 'Béni Mellal · Commun 2025'],
  ['commun CHU Oujda 2023.pdf', 'CHU Oujda · Commun 2023'],
  ['CHU Oujda.pdf', 'CHU Oujda'],
  ['cnc recrt laayoune 2025.pdf', 'Laâyoune · recrutement 2025'],
  ['etat laayoun 2024 commun.pdf', 'Laâyoune · Commun 2024'],
  ['cncr agadir 2024.pdf', 'Agadir · concours 2024'],
  ['commun état Tanger 2025.pdf', 'Tanger · Commun 2025'],
  ['état tanger.pdf', 'Tanger · concours d’État']
];
function vConcours() {
  var h = bar('Concours', '') + '<div class="wrap">';
  h += '<h1>📝 Concours</h1><div class="sub">Sujets et corrigés du dossier Concours commun</div>';
  h += '<div class="card" style="border-color:var(--green)"><b>Examen blanc</b><div class="sub">Teste-toi avec les QCM de préparation, en conditions chronométrées.</div><div class="spacer"></div><button class="btn gold" data-go="exam">Lancer un examen blanc</button></div>';
  h += '<div class="card concours-note"><b>ℹ️ À propos des corrections</b><div class="sub">Les fiches ci-dessous transcrivent les sujets. Une transcription seule ne confirme pas les réponses : consulte le document original. Les explications des QCM d’entraînement sont pédagogiques et ne remplacent pas une source officielle.</div><div class="concours-badges"><span class="source-badge source-doc">Document pédagogique</span><span class="source-badge source-old">Ancien concours</span><span class="source-badge source-ai">Explication pédagogique</span></div></div>';
  h += '<div class="card" style="border-color:#25d366"><b>💬 Contribuer par WhatsApp</b><div class="sub">Signaler un problème, proposer une amélioration ou envoyer des sujets, corrigés et autres documents.</div><div class="spacer"></div><a class="btn green sm" href="' + esc(WHATSAPP_CONTACT_URL) + '" target="_blank" rel="noopener noreferrer">Ouvrir WhatsApp · ' + esc(WHATSAPP_CONTACT_DISPLAY) + '</a></div>';
  h += '<div class="card concours-filters"><div class="row"><input class="search" id="concoursSearch" placeholder="🔎 Rechercher une ville, une année, un métier…" value="' + esc(window.CONCOURS_QUERY || '') + '"></div><div class="filter-row"><select class="search" id="concoursCategory"><option value="">Tous les métiers</option><option>Infirmier</option><option>Technicien de santé</option><option>Administration</option></select><select class="search" id="concoursYear"><option value="">Toutes les années</option><option>2026</option><option>2025</option><option>2024</option><option>2023</option><option>2021</option><option>2020</option><option>2019</option><option>2018</option></select><select class="search" id="concoursStatus"><option value="">Tous les statuts</option><option value="verified">Corrigés vérifiés</option><option value="pending">Réponses à vérifier</option></select></div><div class="sub">Recherche instantanée · tri du plus récent au plus ancien</div></div>';
  var query = String(window.CONCOURS_QUERY || '').toLowerCase().trim(), categoryFilter = window.CONCOURS_CATEGORY || '', yearFilter = window.CONCOURS_YEAR || '', statusFilter = window.CONCOURS_STATUS || '';
  var visible = CONCOURS_DOCS.map(function (p, i) { return {p:p, i:i, year:(p[0].match(/20\d{2}/g)||[]).map(Number).filter(function(y){return y<=2026;}).sort(function(a,b){return b-a;})[0]||0, correction:/justification|corrig|correction/i.test(p[0])}; }).filter(function(x){ var text=(x.p[0]+' '+x.p[1]).toLowerCase(); return (!query||text.indexOf(query)>=0)&&(!categoryFilter||text.indexOf(categoryFilter.toLowerCase())>=0)&&(!yearFilter||String(x.year)===yearFilter)&&(!statusFilter||(statusFilter==='verified'?x.correction:!x.correction)); }).sort(function(a,b){return b.year-a.year||a.p[1].localeCompare(b.p[1]); });
  h += '<h2>Sujets disponibles <span class="sub">(' + visible.length + '/' + CONCOURS_DOCS.length + ' PDF)</span></h2>';
  visible.forEach(function (x) { var p=x.p, i=x.i;
    var htmlFile = 'sujet-' + String(i + 1).padStart(2, '0') + '.html';
    var pdfUrl = 'concours-commun/' + encodeURIComponent(p[0]).replace(/%2F/g, '/');
    var correction = /justification|corrig|correction/i.test(p[0]);
    var year = x.year;
    h += '<div class="card concours-item"><div class="concours-item-head"><div class="concours-file">📄</div><div class="concours-item-info"><b>' + esc(p[1]) + '</b><div class="concours-badges"><span class="source-badge source-doc">Document pédagogique</span>' + (year ? '<span class="source-badge source-old">Ancien concours · ' + year + '</span>' : '') + (correction ? '<span class="source-badge source-correction">Corrigé fourni · à vérifier</span>' : '<span class="source-badge source-pending">Réponse non vérifiée</span>') + '</div></div></div><div class="concours-actions concours-actions-main"><button class="btn blue sm" data-go="concourspdf/' + i + '">👁️ Visualiser le PDF</button><a class="btn ghost sm" download href="' + esc(pdfUrl) + '">⬇️ Télécharger</a></div><a class="concours-sheet-link" href="' + esc(concoursViewerUrl(htmlFile)) + '" target="_blank" rel="noopener">📝 Ouvrir la fiche pédagogique</a></div>';
  });
  return h + '</div>';
}

function vConcoursPdfView(index) {
  var p = CONCOURS_DOCS[+index];
  if (!p) return vConcours();
  var href = 'concours-commun/' + encodeURIComponent(p[0]).replace(/%2F/g, '/');
  var fallback = githubRawFile('concours-commun', p[0]);
  return bar(p[1], 'concours') + '<div class="pdf-reader" data-pdf-src="' + href + '" data-pdf-fallback="' + esc(fallback) + '">' +
    '<div class="pdf-toolbar"><button class="pdf-tool" id="pdfPrev">←</button><span id="pdfPage">Page…</span><button class="pdf-tool" id="pdfNext">→</button><button class="pdf-tool" id="pdfZoomOut">−</button><span id="pdfZoom">100%</span><button class="pdf-tool" id="pdfZoomIn">+</button></div>' +
    '<div class="pdf-status" id="pdfStatus">Chargement du PDF…</div><div class="pdf-canvas-wrap"><canvas id="pdfCanvas"></canvas></div>' +
    '<div class="pdf-download"><a class="btn ghost sm" download href="' + href + '">⬇️ Télécharger le PDF</a></div></div>';
}

/* ------------------------------------------------------------ vue ACCUEIL */
function vHome() {
  var due = dueList().length;
  var plan = planInfo();
  var ready = readinessInfo();
  var week = weeklyInfo();
  var autoMode = S.homeMode !== 'manual';
  var totQ = 0; DOCS.forEach(function (d) { d.units.forEach(function (u) { totQ += u.qs.length; }); });
  var nextU = firstUnfinished();
  var focusTarget = reviewTargets()[0];
  var nextAction = due ? { go: 'review', title: 'Réviser maintenant', detail: due + ' élément' + (due > 1 ? 's' : '') + ' à consolider avant de continuer.', why: 'Tes révisions programmées sont prioritaires.', time: '≈ 8 min' } :
    nextU ? { go: 'lesson/' + nextU.d + '/' + nextU.u, title: 'Commencer la prochaine leçon', detail: esc(doc(nextU.d).code + ' · ' + unit(nextU.d, nextU.u).t), why: 'C’est la prochaine étape de ton programme.', time: '≈ 10 min' } :
    (focusTarget && focusTarget.unanswered ? { go: 'quiz/' + focusTarget.d.id + '/' + focusTarget.i, title: 'Terminer un quiz important', detail: esc(focusTarget.u.t + ' · ' + focusTarget.unanswered + ' QCM sans réponse'), why: 'Des questions restent à faire dans ce cours.', time: '≈ 8 min' } :
    (focusTarget && focusTarget.best < 80 ? { go: 'quiz/' + focusTarget.d.id + '/' + focusTarget.i, title: 'Renforcer un point faible', detail: esc(focusTarget.u.t + ' · meilleur score : ' + focusTarget.best + '%'), why: 'Ce cours a besoin d’être consolidé avant un examen.', time: '≈ 10 min' } :
    { go: 'exam', title: 'Lancer un examen blanc', detail: 'Tes cours sont à jour : mesure maintenant ton niveau.', why: 'Tu peux vérifier ta préparation en conditions réelles.', time: '≈ 15 min' }));
  var g = Math.min(1, S.xpDay / (S.goal || 50));
  var xpGap = Math.max(0, S.goal - S.xpDay);
  var resume = S.lastRoute && /^(?:lesson|quiz|review|exam|cards)(?:\/|$)/.test(S.lastRoute) ? S.lastRoute : '';
  var resumeLabel = resume ? (resume.indexOf('lesson/') === 0 ? 'Reprendre la leçon' : resume.indexOf('quiz/') === 0 ? 'Reprendre le quiz' : resume.indexOf('review') === 0 ? 'Reprendre les révisions' : resume.indexOf('exam') === 0 ? 'Reprendre l’examen' : 'Reprendre les cartes') : '';

  var h = '<div class="welcome-strip"><span>👋</span><div><b>Bienvenue dans PrepMe</b><div class="sub">Commence par ton diagnostic, puis avance à ton rythme.</div></div></div>' +
    '<div class="hero">' +
    '<div class="row" style="justify-content:space-between">' +
    '<span class="pill">🔥 ' + S.streak + '</span>' +
    '<span class="pill">⭐ ' + S.xp + ' XP</span>' +
    '<span class="pill">' + (S.unlimited ? '♾️ cœurs' : '❤️ ' + hearts() + (hearts() < HEART_MAX ? ' · ' + heartIn() : '')) + '</span>' +
    '</div>' +
    '<h1 style="margin-top:12px">Diplômé en santé ? Prépare ton concours</h1>' +
    '<div class="sub">Cours ciblés · QCM · flashcards · ' + DOCS.length + ' modules et ' + totQ + ' questions pour avancer jusqu’au concours.</div>' +
    '<div class="goal-ring">' + ring(g) +
    '<div style="flex:1"><div style="font-weight:800">Objectif du jour</div>' +
    '<div class="sub" style="color:#eafbe0">' + S.xpDay + ' / ' + S.goal + ' XP' +
    (g >= 1 ? ' ✅ atteint !' : ' · encore ' + xpGap + ' XP') + '</div></div></div>' +
    '</div>';

  h += '<div class="wrap">';
  if (resume) h += '<div class="card resume-card" style="border-color:var(--blue)"><div class="row"><div style="flex:1"><b>▶️ Reprendre</b><div class="sub">' + esc(resumeLabel) + ' · dernière activité conservée sur cet appareil</div></div><button class="btn blue sm" data-go="' + esc(resume) + '">Reprendre</button></div></div>';
  h += '<div class="mode-switch" role="group" aria-label="Mode de préparation"><button class="' + (autoMode ? 'on' : '') + '" data-home-mode="auto"><b>✨ Auto</b><small>PrepMe décide</small></button><button class="' + (!autoMode ? 'on' : '') + '" data-home-mode="manual"><b>🖐️ Manuel</b><small>Je vois tout et je choisis</small></button></div>';
  if (!autoMode) {
  var paceLabel = plan.delta > 0 ? plan.delta + ' unité' + (plan.delta > 1 ? 's' : '') + ' d’avance' :
    plan.delta < 0 ? Math.abs(plan.delta) + ' unité' + (plan.delta < -1 ? 's' : '') + ' de retard' : 'dans le rythme prévu';
  h += '<div class="card" style="border-color:' + (plan.ahead ? 'var(--green)' : 'var(--orange)') + '"><div class="row"><div style="font-size:28px">🗓️</div><div style="flex:1"><b>Objectif concours · ' + esc(dateFr(plan.date)) + '</b><div class="sub">' + (plan.expired ? 'Date dépassée · choisis une nouvelle date dans Réglages' : plan.left + ' jours restants') + ' · ' + plan.remaining + ' unités à valider</div></div><span class="badge ' + (plan.ahead ? 'ok' : 'hot') + '">' + plan.status + '</span></div><div class="progress" style="margin:12px 0 6px"><div style="width:' + Math.round(plan.done / Math.max(1, plan.total) * 100) + '%"></div></div><div class="pace-summary"><b>' + paceLabel + '</b> · ' + plan.done + ' faites · cible au rythme 30 jours : ' + plan.targetDone + '</div><div class="sub">Pour finir à temps : ' + plan.perDay + ' unité' + (plan.perDay > 1 ? 's' : '') + '/jour · aujourd’hui ' + due + ' révision' + (due > 1 ? 's' : '') + ' à faire</div></div>';
  h += '<div class="card readiness-card"><div class="readiness-head"><div><b>🎯 Niveau de préparation</b><div class="sub">' + ready.label + '</div></div><div class="readiness-score">' + ready.score + '<small>/100</small></div></div><div class="progress readiness-progress"><div style="width:' + ready.score + '%"></div></div><div class="readiness-grid"><span><b>' + ready.mastery + '%</b> maîtrise</span><span><b>' + ready.coverage + '%</b> banque vue</span><span><b>' + ready.accuracy + '%</b> réussite</span></div><div class="sub readiness-help">Le score combine les unités maîtrisées, les questions déjà vues, la réussite et les révisions à jour.</div></div>';
  h += '<div class="card weekly-card"><div class="row"><div style="flex:1"><b>📅 Rythme de la semaine</b><div class="sub">' + week.active + '/7 jours actifs · ' + week.total + ' / ' + week.target + ' XP</div></div><span class="badge ' + (week.pct >= 70 ? 'ok' : 'hot') + '">' + week.pct + '%</span></div><div class="progress" style="margin-top:10px"><div style="width:' + week.pct + '%"></div></div><div class="sub weekly-tip">' + (week.pct >= 100 ? 'Objectif hebdomadaire atteint — garde ce rythme !' : 'Encore ' + Math.max(0, week.target - week.total) + ' XP pour atteindre ta cible de la semaine.') + '</div></div>';
  h += '<h2>✅ Priorités du jour</h2><div class="daily-plan">' +
    '<button class="daily-step" data-go="review"><span class="daily-num">1</span><span><b>Consolider</b><small>' + (due ? due + ' révision' + (due > 1 ? 's' : '') + ' à faire' : 'Révisions à jour') + '</small></span><strong>›</strong></button>' +
    (nextU ? '<button class="daily-step" data-go="lesson/' + nextU.d + '/' + nextU.u + '"><span class="daily-num">2</span><span><b>Apprendre</b><small>Prochaine unité du chemin</small></span><strong>›</strong></button>' : '') +
    '<button class="daily-step" data-go="exam"><span class="daily-num">3</span><span><b>Se tester</b><small>Examen blanc chronométré</small></span><strong>›</strong></button></div>';
  if (nextU) {
    var d0 = doc(nextU.d), u0 = unit(nextU.d, nextU.u);
    h += '<div class="card" style="border-color:var(--green)">' +
      '<div class="row" style="justify-content:space-between"><b>🛣️ Chemin du jour</b><span class="badge ok">Jour ' + (plan.done + 1) + '</span></div>' +
      '<div class="sub" style="margin-top:6px">' + (S.streak ? '🔥 Série de ' + S.streak + ' jour' + (S.streak > 1 ? 's' : '') : 'Commence ta série aujourd’hui') + '</div>' +
      '<div style="font-weight:800;font-size:15.5px;margin:2px 0 10px">' + esc(d0.code + ' · ' + u0.t) + '</div>' +
      '<button class="btn" data-go="lesson/' + nextU.d + '/' + nextU.u + '">Commencer</button></div>';
  } else if (!plan.remaining) h += '<div class="card" style="border-color:var(--green)"><b>🏆 Chemin terminé !</b><div class="sub">Toutes les unités sont validées. Continue avec les révisions.</div></div>';
  else h += '<div class="card" style="border-color:var(--blue)"><b>✅ Leçons déjà parcourues</b><div class="sub">Tu as déjà ouvert les leçons restantes. Reprends les cours signalés ci-dessous pour compléter les QCM et valider les unités.</div></div>';
  var targets = reviewTargets();
  if (targets.length) {
    h += '<h2>📚 Cours à revoir</h2><div class="sub" style="margin:-4px 0 10px">Appuie sur un cours pour le reprendre. Les erreurs et les QCM jamais répondus restent visibles ici.</div>';
    targets.slice(0, 6).forEach(function (x) {
      var details = [];
      if (x.due) details.push(x.due + ' révision' + (x.due > 1 ? 's' : '') + ' à faire');
      if (x.unanswered) details.push(x.unanswered + ' QCM sans réponse');
      if (!details.length && x.best < 80) details.push('meilleur score : ' + x.best + '%');
      h += '<div class="mod review-target" data-go="lesson/' + x.d.id + '/' + x.i + '"><div class="bub">' + (x.u.ic || '📘') + '</div><div class="info"><div class="t">' + esc(x.u.t) + '</div><div class="p">' + esc(x.d.code + '. ' + x.d.title) + ' · ' + details.join(' · ') + '</div></div><span class="review-arrow">›</span></div>';
    });
    if (targets.length > 6) h += '<div class="sub">+' + (targets.length - 6) + ' autres cours à revoir</div>';
  }
  } else {
    var autoLearnGo = nextU ? 'lesson/' + nextU.d + '/' + nextU.u : 'doc/1';
    var autoLearnText = nextU ? 'Prochaine unité du chemin' : 'Revoir un module déjà parcouru';
    h += '<div class="card auto-action"><div class="auto-action-icon">✨</div><b>PrepMe te conseille</b><div class="auto-action-title">' + nextAction.title + '</div><div class="sub">' + nextAction.detail + '</div><div class="auto-meta"><span>🎯 ' + nextAction.why + '</span><span>⏱️ ' + nextAction.time + '</span></div><div class="spacer"></div><button class="btn" data-go="' + nextAction.go + '">' + nextAction.title + '</button></div>' +
      '<h2>✅ Priorités du jour</h2><div class="sub daily-intro">Voici tout ce que tu peux faire aujourd’hui. PrepMe choisit automatiquement la prochaine leçon.</div><div class="daily-plan">' +
      '<button class="daily-step" data-go="review" aria-label="Consolider les révisions"><span class="daily-num">1</span><span><b>Consolider</b><small>' + (due ? due + ' révision' + (due > 1 ? 's' : '') + ' à faire' : 'Révisions à jour') + '</small></span><strong>›</strong></button>' +
      '<button class="daily-step" data-go="' + autoLearnGo + '" aria-label="Apprendre la prochaine unité"><span class="daily-num">2</span><span><b>Apprendre</b><small>' + autoLearnText + '</small></span><strong>›</strong></button>' +
      '<button class="daily-step" data-go="exam" aria-label="Se tester avec un examen blanc"><span class="daily-num">3</span><span><b>Se tester</b><small>Examen blanc chronométré</small></span><strong>›</strong></button></div>';
  }
  if (!autoMode) {
  h += '<div class="qa-grid">' +
    '<div class="qa" data-go="review"><div class="ic">🔁</div><div class="t">Révision</div><div class="d">' + (due ? due + ' à revoir' : 'à jour ✅') + '</div></div>' +
    '<div class="qa" data-go="exam"><div class="ic">📝</div><div class="t">Examen blanc</div><div class="d">chronométré</div></div>' +
    '</div><div class="card quick-card"><div class="row"><div class="quick-icon">⚡</div><div style="flex:1"><b>Séance express</b><div class="sub">5 questions en 5 minutes, ou 10 questions pour une révision complète.</div></div></div><div class="spacer"></div><div class="row2"><button class="btn purple sm" data-act="quick5">⏱️ 5 minutes</button><button class="btn ghost sm" data-act="quick">10 questions</button></div></div><div class="spacer"></div>' +
    '<input class="search" id="q" placeholder="🔎 Chercher une notion, une loi, un chiffre…">' +
    '<h2>Modules</h2>';

  DOCS.forEach(function (d) {
    var p = docPct(d), st = docStarted(d);
    var nq = 0; d.units.forEach(function (u) { nq += u.qs.length; });
    h += '<div class="mod' + (p >= 100 ? ' done' : st ? ' started' : '') + '" data-go="doc/' + d.id + '">' +
      '<div class="bub">' + d.icon + '</div>' +
      '<div class="info"><div class="t">' + esc(d.code + '. ' + d.title) + '</div>' +
      '<div class="p">' + d.units.length + ' unités · ' + nq + ' QCM · ≈ ' + Math.max(5, Math.round(nq * 0.8 + d.units.length * 2)) + ' min</div>' +
      '<div class="progress thin" style="margin-top:6px"><div style="width:' + p + '%"></div></div></div>' +
      '<div class="pct">' + p + '%</div></div>';
  });
  }
  h += '</div>';
  return h;
}
function firstUnfinished() {
  for (var i = 0; i < DOCS.length; i++) {
    var d = DOCS[i];
    for (var j = 0; j < d.units.length; j++) {
      var s = ust(d.id, j);
      if (s.crowns < CROWN_MAX && !s.lesson) return { d: d.id, u: j };
    }
  }
  return null;
}

function reviewTargets() {
  var map = {};
  function target(did, ui) {
    var k = uKey(did, ui);
    if (!map[k]) map[k] = { d: doc(did), u: unit(did, ui), i: +ui, due: 0, unanswered: 0, best: 100 };
    return map[k];
  }
  dueList().forEach(function (k) {
    var it = resolveKey(k);
    if (it) target(it.d, it.u).due++;
  });
  DOCS.forEach(function (d) {
    d.units.forEach(function (u, i) {
      var s = ust(d.id, i), unseen = 0;
      if (s.lesson) u.qs.forEach(function (_, qi) { if (!S.srs[qKey(d.id, i, qi)]) unseen++; });
      var weak = s.runs > 0 && s.best < 80;
      if (unseen || weak) {
        var x = target(d.id, i);
        x.unanswered = unseen;
        x.best = s.best || 0;
      }
    });
  });
  return Object.keys(map).map(function (k) { return map[k]; }).filter(function (x) { return x.d && x.u; })
    .sort(function (a, b) { return (b.unanswered + b.due) - (a.unanswered + a.due) || a.best - b.best; });
}

/* --------------------------------------------------------------- vue DOC */
function unitMinutes(u) {
  var words = String(u.lesson || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 180) + Math.ceil((u.qs || []).length * 0.7) + Math.ceil((u.cards || []).length * 0.15));
}
function vDoc(id) {
  var d = doc(id); if (!d) return vHome();
  var h = bar(d.code + '. ' + d.title, '') + '<div class="wrap">';
  h += '<h1>' + d.icon + ' ' + esc(d.title) + '</h1><div class="sub">' + esc(d.sub || '') + '</div>';
  var studied = d.units.filter(function (u, i) { var s = ust(d.id, i); return s.lesson || s.runs > 0; }).length;
  var mastered = d.units.filter(function (u, i) { return ust(d.id, i).crowns >= CROWN_MAX; }).length;
  var status = mastered === d.units.length ? '✅ Module maîtrisé' : studied ? '🔄 Module en cours' : '🆕 Module à commencer';
  h += '<div class="card module-objective"><b>🎯 Objectif du module</b><div class="sub">Comprendre les notions clés de « ' + esc(d.title) + ' », retenir les définitions et chiffres importants, puis réussir les QCM et les révisions.</div><div class="sub" style="margin-top:6px">' + status + ' · ' + studied + '/' + d.units.length + ' unités parcourues · ' + mastered + '/' + d.units.length + ' maîtrisées</div></div>';
  h += '<div class="row" style="margin:12px 0 4px"><div class="progress"><div style="width:' + docPct(d) + '%"></div></div>' +
    '<b style="font-size:13px">' + docPct(d) + '%</b></div>';
  h += '<div class="row2" style="margin:12px 0"><button class="btn blue sm" data-go="cards/' + d.id + '">🃏 Flashcards</button>' +
    '<button class="btn gold sm" data-go="quiz/' + d.id + '/all">⚡ Quiz du module</button></div>' +
    '<button class="btn purple sm" data-go="exam/' + d.id + '">📝 Examen blanc ciblé sur ce module</button>';
  h += '<div class="path">';
  d.units.forEach(function (u, i) {
    var s = ust(d.id, i);
    var cls = s.crowns >= CROWN_MAX ? 'mastered' : (s.runs > 0 || s.lesson) ? 'started' : '';
    h += '<div class="node ' + cls + '" data-go="lesson/' + d.id + '/' + i + '">' +
      '<div class="circ">' + (u.ic || '📘') + '</div>' +
      '<div class="info" style="flex:1"><div class="t">' + esc(u.t) + '</div>' +
      '<div class="d">' + u.qs.length + ' QCM · ' + u.cards.length + ' cartes · ≈ ' + unitMinutes(u) + ' min' + (u.pages ? ' · ' + u.pages : '') + '</div>' +
      '<div class="unit-source">📄 ' + esc(sourceLabel(d.id, u.pages)) + '</div>' +
      '<div class="crowns">' + '👑'.repeat(s.crowns) + '<span style="opacity:.25">' + '👑'.repeat(CROWN_MAX - s.crowns) + '</span>' +
      (s.best ? ' <span class="badge ok">' + s.best + '%</span>' : '') + '</div></div>' +
      '<button class="cardbtn" title="Flashcards de cette unité" data-go="cards/' + d.id + '/' + i + '">🃏</button></div>';
  });
  h += '</div></div>';
  return h;
}

/* ------------------------------------------------------------ vue LEÇON */
function vLesson(did, ui) {
  var d = doc(did), u = unit(did, ui); if (!u) return vHome();
  window.PREP_SPEAK_TEXT = (u.lesson || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  var s = ust(d.id, ui); s.lesson = 1; save();
  return bar(u.t, 'doc/' + d.id) + '<div class="wrap">' + legendHL() +
    abbreviationBox(u) + sourceBox(d.id, ui) + '<div class="card lesson">' +
    rich(decorate(u.lesson) || '<p class="muted">Pas de leçon pour cette unité.</p>') + '</div>' +
    '<button class="btn" data-go="quiz/' + d.id + '/' + ui + '">Passer au quiz →</button>' +
    '<div class="spacer"></div>' +
    '<div class="row2">' +
    '<button class="btn ghost sm" data-act="speak">🔊 Écouter</button>' +
    '<button class="btn blue sm" data-go="cards/' + d.id + '/' + ui + '">🃏 Cartes de cette unité (' +
    Math.max(u.cards.length, Math.min(8, u.cards.length + u.qs.length)) + ')</button>' +
    '<button class="btn ghost sm" data-go="cards/' + d.id + '">🃏 Cartes du module</button></div>' +
    '</div>';
}

/* ------------------------------------------------------------- vue QUIZ */
var RUN = null;
function vQuizStart(did, ui) {
  var d = doc(did); if (!d) return vHome();
  var pool;
  if (ui === 'all') pool = allQuestions(d.id);
  else { var u = unit(did, ui); if (!u) return vHome(); pool = u.qs.map(function (q, qi) { return { q: q, k: qKey(d.id, ui, qi), d: d.id, u: +ui }; }); }
  if (!pool.length) { return bar('Quiz', 'doc/' + d.id) + '<div class="wrap"><div class="card">Aucune question ici.</div></div>'; }
  var n = ui === 'all' ? Math.min(20, pool.length) : pool.length;
  var title = ui === 'all' ? d.title : unit(did, ui).t;
  return bar('Préparer la session', 'doc/' + d.id) + '<div class="wrap"><div class="prep-hero"><div class="prep-icon">🎯</div><h1>Préparer ton quiz</h1><div class="sub">' + esc(title) + '</div></div><div class="card prep-summary"><div><b>📚 Sujet</b><span>' + esc(title) + '</span></div><div><b>❓ Questions</b><span>' + n + ' QCM</span></div><div><b>⏱️ Durée estimée</b><span>≈ ' + Math.max(3, Math.round(n * 0.6)) + ' min</span></div><div><b>🧠 Mode</b><span>Entraînement avec correction immédiate</span></div></div><button class="btn" data-act="startquiz" data-did="' + d.id + '" data-ui="' + esc(ui) + '">Commencer</button><div class="spacer"></div><button class="btn ghost" data-go="doc/' + d.id + '">Modifier le sujet</button></div>';
}
function startQuiz(did, ui) {
  var d = doc(did), pool = ui === 'all' ? allQuestions(d.id) : unit(did, ui).qs.map(function(q,qi){return {q:q,k:qKey(d.id,ui,qi),d:d.id,u:+ui};});
  var n = ui === 'all' ? Math.min(20,pool.length) : pool.length;
  if (!S.unlimited && hearts() <= 0) { ROOT.innerHTML = vNoHearts() + navBar('review'); bind(); return; }
  RUN = {mode:'lesson',items:shuffle(pool).slice(0,n),i:0,ok:0,ko:0,combo:0,maxCombo:0,xp:0,back:'doc/'+d.id,title:ui==='all'?d.title:unit(did,ui).t,did:d.id,ui:ui==='all'?null:+ui,wrong:[],t0:Date.now()};
  analytics('quiz_started', { module_id: d.id, scope: ui === 'all' ? 'module' : 'unit', question_count: n });
  ROOT.innerHTML = quizFrame() + navBar('review'); bind();
}
function vNoHearts() {
  return bar('Plus de cœurs', '') + '<div class="wrap center">' +
    '<div style="font-size:60px;margin:26px 0 6px">💔</div>' +
    '<h1>Plus de cœurs</h1>' +
    '<div class="sub">Un cœur revient toutes les ' + HEART_MIN + ' min — prochain dans <b>' + heartIn() + '</b>.</div>' +
    '<div class="spacer"></div>' +
    '<div class="card"><div class="sub" style="margin-bottom:10px">Tu peux regagner un cœur tout de suite en faisant une session de révision (5 items).</div>' +
    '<button class="btn blue" data-go="review">🔁 Réviser pour un cœur</button></div>' +
    '<button class="btn ghost" data-act="unlimited">♾️ Activer les cœurs illimités</button>' +
    '<div class="spacer"></div><button class="btn ghost" data-go="">Retour</button></div>';
}
function quizFrame() {
  var R = RUN, it = R.items[R.i];
  if (!it) return quizEnd();
  // Garde-fou : une séance ne doit jamais planter si une donnée incomplète
  // arrive dans le moteur. Les cartes sont affichées par reviewFrame().
  if (!it.q) {
    if (R.mode === 'review') return reviewFrame();
    R.i++;
    return quizFrame();
  }
  var q = it.q;
  var pct = R.i / R.items.length * 100;
  var opts = q._sh || (q._sh = shuffle(q.o.map(function (t, i) { return { t: t, i: i }; })));
  var letters = 'ABCDEF';
  var h = '<div class="qbar">' +
    '<button class="iconbtn" data-act="quit">✕</button>' +
    '<div class="progress"><div style="width:' + pct + '%"></div></div>' +
    (R.mode === 'lesson' ? '<span class="pill hearts">' + (S.unlimited ? '♾️' : '❤️ ' + S.hearts) + '</span>' : '<span class="pill xp">' + (R.i + 1) + '/' + R.items.length + '</span>') +
    (R.mode === 'exam' ? '<span class="pill gem timer" id="tm">--:--</span>' : '') +
    '</div>';
  h += '<div class="wrap"><div class="sub">' + (unit(it.d, it.u).ic || '📘') + ' ' +
    esc(unit(it.d, it.u).t) + ' <span style="opacity:.6">· ' + esc(doc(it.d).code) + '</span></div>' +
    '<div class="qtext">' + rich(q.q) + '</div><div id="opts">';
  opts.forEach(function (o, n) {
    h += '<button class="opt" data-opt="' + o.i + '"><span class="k">' + letters[n] + '</span>' + rich(o.t) + '</button>';
  });
  h += '</div><div style="height:150px"></div></div>';
  return h;
}
function answer(chosen) {
  var R = RUN, it = R.items[R.i], q = it.q;
  var correct = (+chosen === q.c);
  analytics('quiz_answered', { mode: R.mode || 'lesson', is_correct: correct ? 1 : 0, question_index: R.i + 1 });
  var btns = ROOT.querySelectorAll('.opt');
  Array.prototype.forEach.call(btns, function (b) {
    b.disabled = true;
    var v = +b.getAttribute('data-opt');
    if (v === q.c) b.classList.add('correct');
    else if (v === +chosen) b.classList.add('wrong');
    else b.classList.add('dim');
  });
  if (correct) {
    R.ok++; R.combo++; R.maxCombo = Math.max(R.maxCombo, R.combo);
    var gain = 2 + (R.combo >= 5 ? 2 : 0);
    R.xp += gain; beep('ok');
    grade(it.k, R.mode === 'exam' ? 4 : 4);
    if (R.combo === 5 || R.combo === 10 || R.combo === 15) {
      var c = document.createElement('div'); c.className = 'combo'; c.textContent = '🔥 ' + R.combo + ' d\'affilée ! +2 XP';
      document.body.appendChild(c); setTimeout(function () { c.remove(); }, 1400);
    }
  } else {
    R.ko++; R.combo = 0; R.wrong.push(it); beep('ko'); vibrate(60);
    grade(it.k, 0);
    if (R.mode === 'lesson') { loseHeart(); }
    var w = ROOT.querySelector('.qtext'); if (w) { w.classList.add('shake'); setTimeout(function () { w.classList.remove('shake'); }, 400); }
  }
  var us = ust(it.d, it.u); if (correct) us.ok++; else us.ko++; save();

  var fb = document.createElement('div');
  fb.className = 'fbbar ' + (correct ? 'ok' : 'ko');
  fb.innerHTML = '<div class="inner"><div class="h">' + (correct ? '✅ Bonne réponse !' : '❌ Réponse : ' + rich(q.o[q.c])) + '</div>' +
    (q.e ? '<div class="e"><button class="btn ghost sm why-btn" type="button" aria-expanded="false">💡 Pourquoi cette réponse ?</button><div class="why-content" hidden><span class="source-badge source-ai">Explication pédagogique · non vérifiée comme source officielle</span><div class="q-explanation">' + rich(q.e) + '</div><div class="remember"><b>🎯 À retenir</b><div>' + rich(q.e) + '</div></div></div></div>' : '<div class="e">Aucune justification sourcée n’est disponible pour cette question.</div>') +
    '<button class="btn ' + (correct ? '' : 'red') + '" id="next">Continuer</button></div>';
  var why = fb.querySelector('.why-btn');
  if (why) why.onclick = function () { var box = fb.querySelector('.why-content'); box.hidden = !box.hidden; why.setAttribute('aria-expanded', String(!box.hidden)); why.textContent = box.hidden ? '💡 Pourquoi cette réponse ?' : 'Masquer l’explication'; };
  document.body.appendChild(fb);
  el('next').onclick = function () {
    fb.remove(); RUN.i++;
    if (!S.unlimited && RUN.mode === 'lesson' && S.hearts <= 0 && RUN.i < RUN.items.length) { ROOT.innerHTML = vNoHearts() + navBar(''); bind(); return; }
    // Une séance de révision peut contenir des QCM et des flashcards.
    // Après un QCM, il faut conserver le moteur de révision pour que le
    // prochain item (éventuellement une carte) ne soit pas lu comme une question.
    ROOT.innerHTML = RUN.mode === 'review' ? reviewFrame() : quizFrame();
    ROOT.innerHTML += navBar(''); bind();
  };
  /* Sur téléphone, éviter le focus forcé : certains navigateurs recomposent mal
     le panneau de correction animé. Le raccourci Entrée reste disponible au PC. */
  if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) el('next').focus();
}
function quizEnd() {
  var R = RUN, tot = R.items.length, pct = tot ? Math.round(R.ok / tot * 100) : 0;
  analytics('quiz_completed', { mode: R.mode || 'lesson', question_count: tot, correct_count: R.ok, score_percent: pct });
  addXP(R.xp + (R.mode === 'lesson' ? 10 : 0) + (pct === 100 ? 5 : 0));
  if (R.mode === 'lesson' && R.ui != null) {
    var s = ust(R.did, R.ui);
    s.runs++; s.best = Math.max(s.best, pct);
    if (pct >= CROWN_PCT * 100 && s.crowns < CROWN_MAX) { s.crowns++; beep('up'); confetti(); }
    save();
  }
  if (pct >= 80) { beep('up'); if (pct === 100) confetti(); }
  var secs = Math.round((Date.now() - R.t0) / 1000);
  recordSession(R.mode === 'lesson' ? 'quiz' : 'revision', R.ok, tot, secs, R.title || '');
  var h = bar('Résultat', '') + '<div class="wrap center">' +
    '<div style="font-size:56px;margin:16px 0 4px">' + (pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '💪' : '📚') + '</div>' +
    '<h1>' + pct + '%</h1><div class="sub">' + R.ok + ' bonnes / ' + tot + ' questions · ' + Math.floor(secs / 60) + 'm' + pad(secs % 60) + 's</div>' +
    '<div class="row3" style="margin:16px 0">' +
    '<div class="stat"><div class="v">+' + (R.xp + (R.mode === 'lesson' ? 10 : 0)) + '</div><div class="l">XP</div></div>' +
    '<div class="stat"><div class="v">' + R.maxCombo + '</div><div class="l">meilleure série</div></div>' +
    '<div class="stat"><div class="v">' + R.ko + '</div><div class="l">à revoir</div></div>' +
    '</div>';
  if (R.wrong.length) {
    h += '<div class="card" style="text-align:left"><b>À revoir (' + R.wrong.length + ')</b>';
    R.wrong.slice(0, 12).forEach(function (it) {
      h += '<div style="margin-top:10px;font-size:13.5px"><div style="font-weight:700">' + rich(it.q.q) + '</div>' +
        '<div style="color:var(--green-dk)">➜ ' + rich(it.q.o[it.q.c]) + '</div><div class="sub">📄 ' + esc(questionSource(it.q, it.d, it.u)) + ' · <a href="' + esc(questionReportUrl(it.q, it.d, it.u)) + '" target="_blank" rel="noopener noreferrer">Signaler</a></div></div>';
    });
    h += '<div class="sub" style="margin-top:10px">Ces questions sont programmées dans ta révision espacée.</div></div>';
  }
  h += '<button class="btn" data-go="' + (R.back || '') + '">Continuer</button><div class="spacer"></div>' +
    (R.ui != null ? '<button class="btn ghost" data-act="again">↻ Refaire cette unité</button>' : '') +
    '</div>';
  return h;
}

/* ---------------------------------------------------------- vue RÉVISION */
/* Une séance n'est pas un tirage au hasard. Ordre de priorité :
   1) les têtues (ratées ≥ 3 fois)  2) les erreurs  3) les autres items dus
   4) du jamais-vu pris dans les unités les plus faibles — 35 % de la séance
   réservés au neuf tant que la banque n'est pas couverte à 60 %. */
function coverage() {
  var tot = allQuestions(null).length + allCards(null).length, seen = 0;
  for (var k in S.srs) if (k.slice(0, 2) !== 'cq') seen++;
  return tot ? seen / tot : 1;
}
function weakUnitScore(did, ui) {
  var s = ust(did, ui), n = s.ok + s.ko;
  return n ? s.ok / n : 0.5;                 // jamais travaillée : priorité moyenne
}
function freshItems(n) {
  if (n <= 0) return [];
  var pool = allQuestions(null).filter(function (x) { return !S.srs[x.k]; });
  if (!pool.length) return [];
  pool.sort(function (a, b) { return weakUnitScore(a.d, a.u) - weakUnitScore(b.d, b.u); });
  return shuffle(pool.slice(0, Math.max(n * 4, 40))).slice(0, n).map(function (x) {
    return { type: 'q', q: x.q, k: x.k, d: x.d, u: x.u };
  });
}
function buildSession(n) {
  var stub = [], errs = [], rest = [];
  dueList().forEach(function (k) {
    (isStubborn(k) ? stub : (S.srs[k].lap ? errs : rest)).push(k);
  });
  var ordered = shuffle(stub).concat(shuffle(errs), shuffle(rest)).map(resolveKey).filter(Boolean);
  var quota = coverage() < 0.6 ? Math.round(n * 0.35) : Math.max(0, n - ordered.length);
  var old = ordered.slice(0, Math.max(0, n - quota));
  var neuf = freshItems(Math.min(quota, n - old.length));
  var out = [], oi = 0, ni = 0;              // on intercale le neuf : 2 anciens, 1 nouveau
  while (oi < old.length || ni < neuf.length) {
    if (oi < old.length) out.push(old[oi++]);
    if (oi < old.length) out.push(old[oi++]);
    if (ni < neuf.length) out.push(neuf[ni++]);
  }
  return { items: out, due: ordered.length, stub: stub.length, neuf: neuf.length };
}
function vReview() {
  var plan = buildSession(20);
  if (!plan.items.length) {
    return bar('Révision', '') + '<div class="wrap center">' +
      '<div style="font-size:56px;margin:26px 0 6px">✅</div><h1>Tout est à jour</h1>' +
      '<div class="sub">Rien à revoir aujourd\'hui, et toute la banque est déjà passée au moins une fois.</div>' +
      '<div class="spacer"></div><button class="btn blue" data-act="freeplay">🎯 Entraînement libre (15 QCM)</button>' +
      '<div class="spacer"></div><button class="btn ghost" data-go="">Retour</button></div>';
  }
  RUN = {
    mode: 'review', items: plan.items, i: 0, ok: 0, ko: 0, combo: 0, maxCombo: 0, xp: 0,
    wrong: [], t0: Date.now(), back: '', title: 'Révision', did: null, ui: null, plan: plan
  };
  return reviewFrame();
}
function reviewFrame() {
  var R = RUN, it = R.items[R.i];
  if (!it) return reviewEnd();
  if (it.type === 'q') {
    // réutilise l'affichage quiz
    R.items[R.i] = { q: it.q, k: it.k, d: it.d, u: it.u, type: 'q' };
    return quizFrame();
  }
  // Ignore proprement un élément incomplet au lieu de bloquer la session.
  if (!it.c || !it.c.f || !it.c.b) {
    R.i++;
    return reviewFrame();
  }
  var pct = R.i / R.items.length * 100;
  var h = '<div class="qbar"><button class="iconbtn" data-act="quit">✕</button>' +
    '<div class="progress blue"><div style="width:' + pct + '%"></div></div><span class="pill gem">' + (R.i + 1) + '/' + R.items.length + '</span></div>';
  h += '<div class="wrap"><div class="sub">' + (unit(it.d, it.u).ic || '📘') + ' ' +
    esc(unit(it.d, it.u).t) + ' <span style="opacity:.6">· ' + esc(doc(it.d).code) + '</span></div>' +
    '<div class="flip" id="flip"><div class="in">' +
    '<div class="fa">' + rich(it.c.f) + '</div><div class="ba">' + rich(it.c.b) + '</div></div></div>' +
    '<div id="cardbtns"><button class="btn blue" data-act="flip">Voir la réponse</button></div>' +
    '<div style="height:90px"></div></div>';
  return h;
}
function cardGrade(g) {
  var R = RUN, it = R.items[R.i];
  grade(it.k, g);
  if (g >= 3) { R.ok++; R.xp += 1; beep('ok'); } else { R.ko++; beep('ko'); }
  R.i++;
  ROOT.innerHTML = reviewFrame() + navBar('review'); bind();
}
function reviewEnd() {
  var R = RUN;
  analytics('review_completed', { item_count: R.items.length, correct_count: R.ok });
  recordSession('revision', R.ok, R.items.length, (Date.now() - R.t0) / 1000, 'Révision espacée');
  addXP(R.xp + 5);
  if (!S.unlimited && S.hearts < HEART_MAX && R.items.length >= 5) { gainHeart(1); }
  beep('up');
  var pl = R.plan || {};
  return bar('Révision terminée', '') + '<div class="wrap center">' +
    '<div style="font-size:56px;margin:20px 0 4px">🔁</div><h1>Bien joué !</h1>' +
    '<div class="sub">' + R.items.length + ' items revus · +' + (R.xp + 5) + ' XP' +
    (!S.unlimited && R.items.length >= 5 ? ' · ❤️ +1 cœur' : '') + '</div>' +
    (pl.items ? '<div class="sub" style="margin-top:6px">' +
      (pl.stub ? '🔥 ' + pl.stub + ' têtue(s) · ' : '') +
      (pl.neuf ? '✨ ' + pl.neuf + ' nouvelle(s) · ' : '') +
      Math.round(coverage() * 100) + ' % de la banque déjà vue</div>' : '') +
    '<div class="spacer"></div><button class="btn" data-go="">Retour à l\'accueil</button>' +
    '<div class="spacer"></div><button class="btn ghost" data-go="review">Encore une session</button></div>';
}

/* -------------------------------------------------------- vue FLASHCARDS */
function vCardsStart(did, ui) {
  var d = did ? doc(did) : null;
  if (did && !d) return vHome();
  var one = ui != null && ui !== '' && ui !== 'all';
  var u = one ? unit(did, ui) : null;
  if (one && !u) return vHome();
  var pool = one ? unitCards(d.id, +ui) : allCards(d ? d.id : null);
  var back = one ? 'lesson/' + d.id + '/' + ui : (d ? 'doc/' + d.id : '');
  if (!pool.length) return bar('Cartes', back) + '<div class="wrap"><div class="card">Aucune carte.</div></div>';
  var count = Math.min(one ? 20 : 30, pool.length);
  return bar('Préparer les cartes', back) + '<div class="wrap"><div class="prep-hero"><div class="prep-icon">🃏</div><h1>Préparer les cartes</h1><div class="sub">Révision active, sans lancer automatiquement une carte</div></div><div class="card prep-summary"><div><b>📚 Sujet</b><span>' + esc(one ? unit(d.id,+ui).t : (d ? d.title : 'Tous les modules')) + '</span></div><div><b>🃏 Cartes</b><span>' + count + ' cartes</span></div><div><b>⏱️ Durée estimée</b><span>≈ ' + Math.max(3,Math.round(count * .4)) + ' min</span></div><div><b>🎯 Objectif</b><span>Consolider les notions importantes</span></div></div><button class="btn blue" data-act="startcards" data-did="' + (d ? d.id : '') + '" data-ui="' + esc(ui == null ? '' : ui) + '">Commencer</button></div>';
}
function startCards(did, ui) {
  var d=did?doc(did):null, one=ui!==''&&ui!=='all', pool=one?unitCards(d.id,+ui):allCards(d?d.id:null), back=one?'lesson/'+d.id+'/'+ui:(d?'doc/'+d.id:'');
  RUN={mode:'review',items:shuffle(pool).map(function(p){return {type:'c',c:p.c,k:p.k,d:p.d,u:p.u};}).slice(0,one?20:30),i:0,ok:0,ko:0,xp:0,combo:0,maxCombo:0,wrong:[],t0:Date.now(),back:back,did:d?d.id:null,ui:one?+ui:null};
  ROOT.innerHTML=reviewFrame()+navBar('cards'); bind();
}

/* ------------------------------------------------------------ vue EXAMEN */
function vExamSetup(scopeId) {
  var h = bar('Examen blanc', '') + '<div class="wrap">';
  h += '<h1>📝 Examen blanc</h1><div class="sub">Conditions du concours : QCM chronométrés, correction détaillée à la fin.</div>';
  h += '<div class="card"><b>Périmètre</b><div class="spacer"></div><select id="scope" class="search">' +
    '<option value="0">Tous les modules</option>' +
    DOCS.map(function (d) { return '<option value="' + d.id + '"' + (+scopeId === d.id ? ' selected' : '') + '>' + esc(d.code + '. ' + d.title) + '</option>'; }).join('') +
    '</select><div class="spacer"></div><b>Nombre de questions</b><div class="spacer"></div>' +
    '<div class="row3"><button class="btn ghost sm nsel" data-n="20">20</button><button class="btn ghost sm nsel" data-n="40">40</button><button class="btn ghost sm nsel" data-n="60">60</button></div>' +
    '<div class="spacer"></div><label class="row"><input type="checkbox" id="chrono" checked> <span>Chronomètre (45 s / question)</span></label>' +
    '<div class="spacer"></div><button class="btn gold" data-act="startexam">Lancer l\'examen</button></div>';
  if (S.exams.length) {
    h += '<h2>Historique</h2>';
    S.exams.slice(-10).reverse().forEach(function (e) {
      h += '<div class="card tight row"><div style="flex:1"><b>' + e.pct + '%</b> <span class="sub">· ' + e.n + ' Q · ' + esc(e.scope) + '</span>' +
        '<div class="sub">' + e.date + ' · ' + Math.floor(e.secs / 60) + ' min</div></div>' +
        '<span class="badge ' + (e.pct >= 70 ? 'ok' : 'hot') + '">' + (e.pct >= 70 ? 'admis' : 'à travailler') + '</span></div>';
    });
  }
  h += '</div>';
  return h;
}
var EXN = 40, EXTIMER = null;
function startExam() {
  var scope = +(el('scope') ? el('scope').value : 0);
  var chrono = el('chrono') ? el('chrono').checked : true;
  var pool = allQuestions(scope || null);
  if (pool.length < 5) { toast('Pas assez de questions'); return; }
  var n = Math.min(EXN, pool.length);
  RUN = {
    mode: 'exam', items: shuffle(pool).slice(0, n), i: 0, ok: 0, ko: 0, combo: 0, maxCombo: 0, xp: 0, wrong: [],
    t0: Date.now(), back: 'exam', did: null, ui: null,
    scope: scope ? doc(scope).code + '. ' + doc(scope).title : 'Tous les modules',
    end: chrono ? Date.now() + n * 45000 : 0
  };
  analytics('exam_started', { scope: scope ? 'module' : 'all_modules', question_count: n, timed: chrono ? 1 : 0 });
  ROOT.innerHTML = quizFrame() + navBar('exam'); bind(); tickExam();
}
function tickExam() {
  clearInterval(EXTIMER);
  if (!RUN || RUN.mode !== 'exam' || !RUN.end) return;
  EXTIMER = setInterval(function () {
    var t = el('tm'); if (!t) return;
    var left = Math.max(0, RUN.end - Date.now());
    var m = Math.floor(left / 60000), s = Math.floor(left % 60000 / 1000);
    t.textContent = m + ':' + pad(s);
    if (left < 60000) t.classList.add('warn');
    if (left <= 0) { clearInterval(EXTIMER); RUN.i = RUN.items.length; ROOT.innerHTML = examEnd() + navBar('exam'); bind(); }
  }, 500);
}
function examEnd() {
  clearInterval(EXTIMER);
  var R = RUN, tot = R.items.length, pct = tot ? Math.round(R.ok / tot * 100) : 0;
  var secs = Math.round((Date.now() - R.t0) / 1000);
  analytics('exam_completed', { question_count: tot, correct_count: R.ok, score_percent: pct, duration_seconds: secs });
  recordSession('examen', R.ok, tot, secs, R.scope);
  addXP(R.xp + 25);
  S.exams.push({ date: today(), n: tot, pct: pct, secs: secs, scope: R.scope });
  save();
  if (pct >= 70) { beep('up'); confetti(); }
  var h = bar('Résultat examen', 'exam') + '<div class="wrap center">' +
    '<div style="font-size:56px;margin:14px 0 2px">' + (pct >= 80 ? '🥇' : pct >= 70 ? '🎓' : pct >= 50 ? '📈' : '📚') + '</div>' +
    '<h1>' + pct + '% · ' + R.ok + '/' + tot + '</h1>' +
    '<div class="sub">' + esc(R.scope) + ' · ' + Math.floor(secs / 60) + ' min ' + pad(secs % 60) + ' s</div>' +
    '<div class="row3" style="margin:16px 0">' +
    '<div class="stat"><div class="v">' + R.ok + '</div><div class="l">justes</div></div>' +
    '<div class="stat"><div class="v">' + R.ko + '</div><div class="l">faux</div></div>' +
    '<div class="stat"><div class="v">' + Math.round(secs / Math.max(1, tot)) + 's</div><div class="l">/question</div></div></div>';
  if (R.wrong.length) {
    h += '<div class="card" style="text-align:left"><b>Correction des erreurs</b>';
    R.wrong.forEach(function (it) {
      h += '<div class="hr"></div><div style="font-size:13.6px"><div style="font-weight:700">' + rich(it.q.q) + '</div>' +
        '<div style="color:var(--green-dk);margin:3px 0"><b>➜ ' + rich(it.q.o[it.q.c]) + '</b></div>' +
        (it.q.e ? '<div class="sub">' + rich(it.q.e) + '</div>' : '') +
        '<div class="sub" style="margin-top:3px">' + esc(doc(it.d).code + ' · ' + unit(it.d, it.u).t) + '</div><div class="sub">📄 ' + esc(questionSource(it.q, it.d, it.u)) + ' · <a href="' + esc(questionReportUrl(it.q, it.d, it.u)) + '" target="_blank" rel="noopener noreferrer">Signaler</a></div></div>';
    });
    h += '</div>';
  }
  h += '<button class="btn" data-go="exam">Retour</button></div>';
  return h;
}

/* ------------------------------------------------------------- vue STATS */
function vStats() {
  var days = [], t = today();
  for (var i = 6; i >= 0; i--) { var d = dayShift(t, -i); days.push([d, d === t ? S.xpDay : (S.hist[d] || 0)]); }
  function xpPeriod(n) { var total = 0, active = 0; for (var j = 0; j < n; j++) { var day = dayShift(t, -j), value = day === t ? S.xpDay : +(S.hist[day] || 0); total += value; if (value > 0) active++; } return { total: total, active: active }; }
  var p7 = xpPeriod(7), p30 = xpPeriod(30), p90 = xpPeriod(90);
  var max = Math.max(10, Math.max.apply(null, days.map(function (x) { return x[1]; })));
  var totQ = 0, okQ = 0, koQ = 0, crowns = 0, maxc = 0;
  DOCS.forEach(function (d) {
    d.units.forEach(function (u, i) { var s = ust(d.id, i); totQ += u.qs.length; okQ += s.ok; koQ += s.ko; crowns += s.crowns; maxc += CROWN_MAX; });
  });
  var h = bar('Statistiques', '') + '<div class="wrap">';
  h += '<div class="row3">' +
    '<div class="stat"><div class="v">' + S.xp + '</div><div class="l">XP total</div></div>' +
    '<div class="stat"><div class="v">' + S.streak + '</div><div class="l">série (record ' + S.best + ')</div></div>' +
    '<div class="stat"><div class="v">' + Math.round(crowns / Math.max(1, maxc) * 100) + '%</div><div class="l">maîtrise</div></div></div>';
  h += '<div class="card"><div class="row"><div style="flex:1"><b>📈 Évolution de l’activité</b><div class="sub">XP gagné et jours actifs</div></div><button class="btn ghost sm" data-act="exportStats">⬇️ Exporter</button></div><div class="row3" style="margin-top:12px"><div class="stat"><div class="v">' + p7.total + '</div><div class="l">7 jours · ' + p7.active + ' actifs</div></div><div class="stat"><div class="v">' + p30.total + '</div><div class="l">30 jours · ' + p30.active + ' actifs</div></div><div class="stat"><div class="v">' + p90.total + '</div><div class="l">90 jours · ' + p90.active + ' actifs</div></div></div></div>';
  var recent = (S.sessions || []).slice(-5).reverse();
  h += '<h2>Historique des séances</h2>';
  if (!recent.length) h += '<div class="card sub">Tes séances terminées apparaîtront ici.</div>';
  recent.forEach(function (s) {
    var label = s.type === 'examen' ? '📝 Examen' : s.type === 'revision' ? '🔁 Révision' : '✅ Quiz';
    var date = String(s.date || '').slice(0, 10);
    h += '<div class="mod"><div class="bub">' + label.split(' ')[0] + '</div><div class="info"><div class="t">' + esc(label.slice(2)) + ' · ' + esc(date) + '</div><div class="p">' + s.correct + '/' + s.total + ' · ' + Math.round(s.score || 0) + '% · ' + Math.floor((s.secs || 0) / 60) + 'm' + pad((s.secs || 0) % 60) + 's</div></div><span class="badge ' + (s.score >= 80 ? 'ok' : s.score < 50 ? 'hot' : '') + '">' + Math.round(s.score || 0) + '%</span></div>';
  });
  var sessionSummary = { quiz: 0, revision: 0, examen: 0 }, sessionCorrect = { quiz: 0, revision: 0, examen: 0 };
  (S.sessions || []).forEach(function (s) { if (sessionSummary[s.type] != null) { sessionSummary[s.type]++; sessionCorrect[s.type] += +s.correct || 0; } });
  h += '<div class="card"><b>🧭 Répartition des séances</b><div class="row3" style="margin-top:10px">' +
    '<div class="stat"><div class="v">' + sessionSummary.quiz + '</div><div class="l">quiz</div></div>' +
    '<div class="stat"><div class="v">' + sessionSummary.revision + '</div><div class="l">révisions</div></div>' +
    '<div class="stat"><div class="v">' + sessionSummary.examen + '</div><div class="l">examens</div></div></div>' +
    '<div class="sub" style="margin-top:8px">Réponses justes enregistrées : ' + (sessionCorrect.quiz + sessionCorrect.revision + sessionCorrect.examen) + '</div></div>';
  h += '<h2>7 derniers jours</h2><div class="card"><div class="bars">' +
    days.map(function (x) {
      var n = ['D', 'L', 'M', 'M', 'J', 'V', 'S'][new Date(x[0]).getDay()];
      return '<div class="b" style="height:' + Math.max(3, x[1] / max * 100) + '%;' + (x[1] === 0 ? 'background:var(--line)' : '') + '"><span>' + n + '</span></div>';
    }).join('') + '</div><div style="height:24px"></div>' +
    '<div class="sub center">' + days.reduce(function (a, x) { return a + x[1]; }, 0) + ' XP cette semaine</div></div>';
  h += '<h2>Réponses</h2><div class="row3">' +
    '<div class="stat"><div class="v">' + okQ + '</div><div class="l">justes</div></div>' +
    '<div class="stat"><div class="v">' + koQ + '</div><div class="l">fausses</div></div>' +
    '<div class="stat"><div class="v">' + (okQ + koQ ? Math.round(okQ / (okQ + koQ) * 100) : 0) + '%</div><div class="l">réussite</div></div></div>';
  var errorCount = Object.keys(S.srs || {}).filter(function (k) { return S.srs[k] && S.srs[k].lap; }).length;
  h += '<div class="card" style="border-color:var(--orange)"><div class="row"><div style="flex:1"><b>🎯 Révision ciblée</b><div class="sub">' + (errorCount ? errorCount + ' question' + (errorCount > 1 ? 's' : '') + ' ratée' + (errorCount > 1 ? 's' : '') + ' à consolider.' : 'Les questions ratées apparaîtront ici après tes quiz.') + '</div></div><button class="btn gold sm" data-go="review">Réviser mes erreurs</button></div></div>';
  var modWeak = [];
  DOCS.forEach(function (d) {
    var mok = 0, mko = 0, started = false;
    d.units.forEach(function (u, i) { var s = ust(d.id, i); mok += s.ok || 0; mko += s.ko || 0; started = started || s.runs > 0; });
    if (started) modWeak.push({ d: d, r: mok + mko ? mok / (mok + mko) : 0, n: mok + mko });
  });
  modWeak.sort(function (a, b) { return a.r - b.r; });
  h += '<h2>Modules à prioriser</h2><div class="sub" style="margin:-4px 0 10px">Classement basé sur tes réponses. Reprends les premiers modules avant de relancer un examen blanc.</div>';
  if (!modWeak.length) h += '<div class="card sub">Commence un quiz pour obtenir un classement personnalisé.</div>';
  modWeak.slice(0, 6).forEach(function (m) {
    h += '<div class="mod" data-go="doc/' + m.d.id + '"><div class="bub">' + m.d.icon + '</div><div class="info"><div class="t">' + esc(m.d.code + '. ' + m.d.title) + '</div><div class="p">' + m.n + ' réponse' + (m.n > 1 ? 's' : '') + '</div><div class="progress thin" style="margin-top:6px"><div style="width:' + Math.round(m.r * 100) + '%"></div></div></div><span class="badge ' + (m.r < .6 ? 'hot' : 'ok') + '">' + Math.round(m.r * 100) + '%</span></div>';
  });
  h += '<h2>Points faibles</h2>';
  var weak = [];
  DOCS.forEach(function (d) {
    d.units.forEach(function (u, i) { var s = ust(d.id, i); if (s.ok + s.ko >= 4) weak.push({ d: d, u: u, i: i, r: s.ok / (s.ok + s.ko), n: s.ok + s.ko }); });
  });
  weak.sort(function (a, b) { return a.r - b.r; });
  if (!weak.length) h += '<div class="card sub">Fais quelques quiz : tes unités les plus fragiles apparaîtront ici.</div>';
  weak.slice(0, 8).forEach(function (w) {
    h += '<div class="mod" data-go="lesson/' + w.d.id + '/' + w.i + '"><div class="bub">' + (w.u.ic || '📘') + '</div>' +
      '<div class="info"><div class="t">' + esc(w.u.t) + '</div><div class="p">' + esc(w.d.code + '. ' + w.d.title) + '</div></div>' +
      '<span class="badge ' + (w.r < .6 ? 'hot' : '') + '">' + Math.round(w.r * 100) + '%</span></div>';
  });
  h += '<h2>Révision espacée</h2>';
  var due = dueList().length, tot = Object.keys(S.srs).length;
  var stub = Object.keys(S.srs).filter(isStubborn).length;
  h += '<div class="card"><div class="row"><div style="flex:1"><b>' + due + '</b> item' + (due > 1 ? 's' : '') + ' à revoir aujourd\'hui' +
    '<div class="sub">' + tot + ' items suivis · ' + Math.round(coverage() * 100) + ' % de la banque vue' +
    (stub ? ' · 🔥 ' + stub + ' têtue(s)' : '') + '</div></div>' +
    '<button class="btn blue sm" style="width:auto;padding:10px 16px" data-go="review">Réviser</button></div></div>';
  h += '<div class="row2"><button class="btn ghost sm" data-act="focus">🎯 Mode concentration</button><button class="btn ghost sm" data-act="report">🖨️ Rapport PDF</button></div>';
  h += '</div>';
  return h;
}

/* ---------------------------------------------------------- vue RÉGLAGES */
function vSettings() {
  var h = bar('Réglages', '') + '<div class="wrap">';
  var storageState = '✅ Stockage local disponible';
  var storageDetail = '';
  try { localStorage.setItem('__prepme_diag__', '1'); localStorage.removeItem('__prepme_diag__'); } catch (e) { storageState = '⚠️ Stockage local indisponible'; }
  try {
    var savedRaw = localStorage.getItem(KEY), backupRaw = localStorage.getItem(BACKUP_KEY);
    var savedKb = savedRaw ? (savedRaw.length / 1024).toFixed(1) : '0.0';
    storageDetail = '<br>État : ' + (savedRaw ? '✅ progression enregistrée' : '⚠️ aucune progression enregistrée') +
      ' · taille : ' + savedKb + ' Ko<br>' + (backupRaw ? '✅ copie de secours disponible' : 'ℹ️ copie de secours créée après la prochaine modification');
  } catch (e2) { storageDetail = '<br>⚠️ détails du stockage indisponibles'; }
  var networkState = navigator.onLine ? '🌐 Connexion disponible' : '📴 Fonctionnement hors ligne';
  h += '<div class="card"><b>🗓️ Date de mon concours</b><div class="sub">Le rythme quotidien et le compte à rebours s’adaptent automatiquement.</div><div class="spacer"></div><label class="date-field"><span>Date prévue</span><input type="date" id="contestDate" value="' + esc(S.contestDate || CONTEST_DATE) + '"></label></div>';
  h += '<div class="card"><b>Objectif quotidien</b><div class="sub">XP à gagner chaque jour pour garder ta série</div>' +
    '<div class="spacer"></div><div class="row3">' +
    [20, 50, 100].map(function (g) { return '<button class="btn ' + (S.goal === g ? '' : 'ghost') + ' sm" data-goal="' + g + '">' + g + ' XP</button>'; }).join('') +
    '</div></div>';
  h += '<div class="card"><b>Thème</b><div class="spacer"></div><div class="row3">' +
    [['auto', '🌗 Auto'], ['light', '☀️ Mode diurne'], ['dark', '🌙 Sombre']].map(function (t) {
      return '<button class="btn ' + (S.theme === t[0] ? '' : 'ghost') + ' sm" data-theme="' + t[0] + '">' + t[1] + '</button>';
    }).join('') + '</div></div>';
  h += '<div class="card"><b>🔤 Taille du texte</b><div class="sub">Ajuste la lisibilité des cours, boutons et informations.</div><div class="spacer"></div><div class="row3">' +
    [['small','Petite'],['normal','Normale'],['large','Grande']].map(function (t) { return '<button class="btn ' + (S.fontScale === t[0] ? '' : 'ghost') + ' sm" data-font-scale="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div></div>';
  h += '<div class="card"><label class="row" style="justify-content:space-between"><span><b>🔊 Le son est activé</b><div class="sub">Retour audio juste / faux</div></span>' +
    '<input type="checkbox" id="snd"' + (S.sound ? ' checked' : '') + ' style="width:22px;height:22px"></label>' +
    '<div class="hr"></div><label class="row" style="justify-content:space-between"><span><b>Cœurs illimités</b><div class="sub">Ne jamais être bloqué par les erreurs</div></span>' +
    '<input type="checkbox" id="unl"' + (S.unlimited ? ' checked' : '') + ' style="width:22px;height:22px"></label>' +
    '<div class="hr"></div><label class="row" style="justify-content:space-between"><span><b>Mise en forme des leçons</b><div class="sub">Couleurs (définition, date, chiffre, loi) et émojis comme les documents source</div></span>' +
    '<input type="checkbox" id="hlx"' + (S.hl ? ' checked' : '') + ' style="width:22px;height:22px"></label></div>';
  h += '<div class="card"><label class="row" style="justify-content:space-between"><span><b>📈 Aider à améliorer PrepMe</b><div class="sub">Partager des statistiques d’usage anonymisées : écrans, navigation et résultats agrégés. Jamais les réponses, recherches ou données personnelles.</div></span>' +
    '<input type="checkbox" id="analytics"' + (S.analytics ? ' checked' : '') + ' style="width:22px;height:22px"></label></div>';
  h += '<div class="card"><b>🔔 Rappels du concours</b><div class="sub">Autoriser les rappels de l’application sur cet appareil.</div><div class="spacer"></div><button class="btn blue sm" data-act="notify">' + (S.notify ? '✅ Rappels activés' : 'Activer les notifications') + '</button></div>';
  h += '<div class="card"><b>📲 Installation hors ligne</b><div class="sub">Si le bouton ne s’ouvre pas : menu du navigateur → « Ajouter à l’écran d’accueil ».</div><div class="spacer"></div><button class="btn blue sm" data-act="install">⬇️ Installer l’application</button></div>';
  h += '<div class="card"><b>🔄 Mises à jour</b><div class="sub">Version ' + APP_VERSION + ' · vérification automatique quand Internet est disponible. Une alerte s’affiche seulement lorsqu’une nouvelle version est publiée.</div></div>';
  h += '<div class="card"><b>🛠️ Diagnostic hors ligne</b><div class="sub">Version installée : <b>' + APP_VERSION + '</b><br>' + networkState + '<br>' + storageState + storageDetail + '<br>Progression : clé protégée <b>cnc_anass_v2</b><br>Pour corriger un affichage après mise à jour : faire <b>Ctrl+F5</b> sur PC.</div><div class="spacer"></div><div class="row2"><button class="btn blue sm" data-act="export">⬇️ Créer une copie maintenant</button><button class="btn ghost sm" data-act="storageTest">🧪 Tester le stockage</button></div></div>';
  h += '<div class="card"><b>🧭 Test diagnostic</b><div class="sub">20 questions mélangées pour évaluer ton niveau de départ. Le test utilise la banque existante et ne réinitialise aucune progression.</div><div class="spacer"></div><button class="btn purple sm" data-act="diagnostic">🧭 Commencer le diagnostic</button></div>';
  h += '<div class="card"><b>💬 Contact WhatsApp</b><div class="sub">Pour déclarer un problème, suggérer une amélioration ou déposer des documents de concours.</div><div class="spacer"></div><a class="btn green sm" href="' + esc(WHATSAPP_CONTACT_URL) + '" target="_blank" rel="noopener noreferrer">WhatsApp · ' + esc(WHATSAPP_CONTACT_DISPLAY) + '</a></div>';
  h += '<div class="card"><b>Sauvegarde</b><div class="sub">Ta progression est stockée sur cet appareil. Exporte-la pour la transférer sur un autre (PC ↔ téléphone).</div>' +
    '<div class="spacer"></div><div class="row2"><button class="btn blue sm" data-act="export">⬇️ Exporter</button>' +
    '<button class="btn ghost sm" data-act="import">⬆️ Importer</button></div>' +
    '<div class="spacer"></div><div class="row2"><button class="btn ghost sm" data-act="restoreBackup">♻️ Restaurer la copie de secours</button><button class="btn red sm" data-act="reset">🗑️ Réinitialiser la progression</button></div></div>';
  var nq = 0, nc = 0; DOCS.forEach(function (d) { d.units.forEach(function (u) { nq += u.qs.length; nc += u.cards.length; }); });
  h += '<button class="settings-link" data-go="about"><span><b>🛡️ À propos et confidentialité</b><small>Informations légales, données et avertissement pédagogique</small></span><strong>›</strong></button>';
  h += '<div class="app-signature"><div class="app-signature-mark">P</div><div><b>PrepMe</b><span>Version ' + APP_VERSION + ' · ' + DOCS.length + ' modules · ' + nq + ' QCM · ' + nc + ' flashcards</span></div></div>';
  h += '</div>';
  return h;
}

function vAbout() {
  return bar('À propos', 'set') + '<main class="wrap legal-page">' +
    '<section class="about-hero"><div class="about-logo">P</div><div><h1>PrepMe</h1><p>Préparation structurée aux concours de santé</p><span>Version ' + APP_VERSION + '</span></div></section>' +
    '<section class="card"><h2>🎓 Finalité pédagogique</h2><p>PrepMe est un outil indépendant de révision et d’entraînement. Il ne représente aucune administration, aucun établissement de santé ni aucun organisateur de concours.</p><p>Les cours, QCM et explications doivent être vérifiés avec les textes officiels et les documents sources. Ils ne constituent ni un avis médical, ni une décision administrative.</p></section>' +
    '<section class="card"><h2>🛡️ Confidentialité</h2><p><b>Données enregistrées :</b> progression, réponses, préférences et planning sont conservés localement sur votre appareil.</p><p><b>Mesure d’usage facultative :</b> si vous activez « Aider à améliorer PrepMe », Google Analytics 4 reçoit des statistiques anonymisées sur les écrans, la navigation et les résultats agrégés des sessions. Les réponses, recherches, textes de cours et données personnelles ne sont pas envoyés. Cette option est désactivée par défaut et peut être retirée à tout moment dans Réglages.</p><p><b>Connexion facultative :</b> l’application fonctionne hors ligne. Lorsqu’Internet est disponible, une requête peut être envoyée à GitHub pour vérifier l’existence d’une nouvelle version. Le contact WhatsApp ne s’ouvre que lorsque vous appuyez sur son bouton.</p><p><b>Contrôle utilisateur :</b> la sauvegarde peut être exportée ou importée depuis Réglages. La réinitialisation efface les données locales de progression.</p></section>' +
    '<section class="card"><h2>📚 Contenus et sources</h2><p>Les documents PDF intégrés restent accessibles séparément afin de permettre la consultation des sources. Les marques, institutions et titres cités appartiennent à leurs propriétaires respectifs.</p></section>' +
    '<section class="card"><h2>💬 Assistance et contribution</h2><p>Pour signaler un problème, proposer une amélioration ou envoyer des sujets, corrigés et autres documents, contactez PrepMe sur WhatsApp.</p><a class="btn green sm" href="' + esc(WHATSAPP_CONTACT_URL) + '" target="_blank" rel="noopener noreferrer">WhatsApp · ' + esc(WHATSAPP_CONTACT_DISPLAY) + '</a></section>' +
    '<p class="legal-updated">Dernière mise à jour : 20 septembre 2026</p></main>';
}

/* ---------------------------------------------------------- vue RECHERCHE */
var SQ = '';
function vSearch() {
  var q = SQ.toLowerCase().trim();
  var h = bar('Recherche', '') + '<div class="wrap">' +
    '<input class="search" id="q2" placeholder="🔎 Chercher…" value="' + esc(SQ) + '"><div class="spacer"></div>';
  if (q.length < 2) { h += '<div class="card sub">Tape au moins 2 caractères.</div></div>'; return h; }
  var res = [];
  DOCS.forEach(function (d) {
    d.units.forEach(function (u, ui) {
      var score = 0;
      if ((u.t || '').toLowerCase().indexOf(q) >= 0) score += 3;
      if ((u.lesson || '').toLowerCase().indexOf(q) >= 0) score += 2;
      var hits = u.qs.filter(function (x) { return (x.q + ' ' + x.o.join(' ') + ' ' + (x.e || '')).toLowerCase().indexOf(q) >= 0; });
      var chits = u.cards.filter(function (c) { return (c.f + ' ' + c.b).toLowerCase().indexOf(q) >= 0; });
      score += hits.length + chits.length;
      if (score) res.push({ d: d, u: u, ui: ui, n: hits.length + chits.length, score: score, sample: (chits[0] ? chits[0].f + ' → ' + chits[0].b : hits[0] ? hits[0].q : '') });
    });
  });
  res.sort(function (a, b) { return b.score - a.score; });
  h += '<div class="sub">' + res.length + ' unité(s) trouvée(s)</div><div class="spacer"></div>';
  res.slice(0, 30).forEach(function (r) {
    h += '<div class="mod" data-go="lesson/' + r.d.id + '/' + r.ui + '"><div class="bub">' + (r.u.ic || '📘') + '</div>' +
      '<div class="info"><div class="t">' + esc(r.u.t) + '</div><div class="p">' + esc(r.d.code + '. ' + r.d.title) + ' · ' + r.n + ' occurrence(s)</div>' +
      (r.sample ? '<div class="p" style="opacity:.8">' + esc(String(r.sample).replace(/<[^>]+>/g, '').slice(0, 90)) + '…</div>' : '') +
      '</div></div>';
  });
  h += '</div>';
  return h;
}

/* ------------------------------------------------------------- bindings */
function bind() {
  Array.prototype.forEach.call(ROOT.querySelectorAll('[data-go]'), function (b) {
    b.onclick = function (ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); analytics('select_content', { content_type: 'navigation', item_id: String(b.getAttribute('data-go') || 'home').slice(0, 40) }); clearInterval(EXTIMER); go('/' + b.getAttribute('data-go')); };
    var tag = (b.tagName || '').toLowerCase();
    if (tag !== 'a' && tag !== 'button' && tag !== 'input' && tag !== 'select' && tag !== 'textarea') {
      b.setAttribute('role', 'button');
      b.setAttribute('tabindex', '0');
      if (!b.getAttribute('aria-label')) b.setAttribute('aria-label', (b.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120) || 'Ouvrir');
      b.onkeydown = function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); b.click(); }
      };
    }
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('.opt'), function (b) {
    b.onclick = function () { answer(b.getAttribute('data-opt')); };
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('[data-act]'), function (b) {
    b.onclick = function () { act(b.getAttribute('data-act'), b); };
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('.nsel'), function (b) {
    b.onclick = function () {
      EXN = +b.getAttribute('data-n');
      Array.prototype.forEach.call(ROOT.querySelectorAll('.nsel'), function (x) { x.classList.add('ghost'); });
      b.classList.remove('ghost');
    };
    if (+b.getAttribute('data-n') === EXN) b.classList.remove('ghost');
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('[data-goal]'), function (b) {
    b.onclick = function () { S.goal = +b.getAttribute('data-goal'); save(); render(); };
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('[data-home-mode]'), function (b) {
    b.onclick = function () { S.homeMode = b.getAttribute('data-home-mode'); save(); render(); };
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('[data-theme]'), function (b) {
    b.onclick = function () { S.theme = b.getAttribute('data-theme'); save(); applyTheme(); render(); };
  });
  Array.prototype.forEach.call(ROOT.querySelectorAll('[data-font-scale]'), function (b) {
    b.onclick = function () { S.fontScale = b.getAttribute('data-font-scale'); save(); applyTheme(); render(); };
  });
  var snd = el('snd'); if (snd) snd.onchange = function () { S.sound = snd.checked; save(); if (snd.checked) beep('ok'); };
  var unl = el('unl'); if (unl) unl.onchange = function () { S.unlimited = unl.checked; save(); toast(unl.checked ? '♾️ Cœurs illimités' : '❤️ Cœurs activés'); render(); };
  var hlx = el('hlx'); if (hlx) hlx.onchange = function () { S.hl = hlx.checked; save(); toast(hlx.checked ? '🖍️ Mise en forme activée' : 'Mise en forme désactivée'); };
  var analyticsChoice = el('analytics'); if (analyticsChoice) analyticsChoice.onchange = function () { S.analytics = analyticsChoice.checked; analyticsSetEnabled(S.analytics); save(); if (S.analytics) { if (window.gtag) window.gtag('event', 'page_view', { page_location: location.href, page_title: document.title }); analytics('analytics_consent', { enabled: 1 }); trackScreen(route()[0] || 'home'); } toast(S.analytics ? '📈 Statistiques anonymisées activées' : '📈 Statistiques anonymisées désactivées'); };
  var contestDate = el('contestDate'); if (contestDate) contestDate.onchange = function () {
    if (!contestDate.value) return;
    S.contestDate = contestDate.value; S.planStart = today(); save(); toast('🗓️ Date du concours enregistrée'); render();
  };
  var q = el('q'); if (q) q.onkeyup = function (e) { if (q.value.length >= 2 && (e.key === 'Enter' || q.value.length > 2)) { SQ = q.value; go('/search'); } };
  var q2 = el('q2'); if (q2) { q2.oninput = function () { SQ = q2.value; clearTimeout(q2._t); q2._t = setTimeout(function () { var p = q2.selectionStart; render(); var n = el('q2'); if (n) { n.focus(); n.setSelectionRange(p, p); } }, 350); }; q2.focus(); }
  var cs = el('concoursSearch'); if (cs) cs.oninput = function () { window.CONCOURS_QUERY = cs.value; clearTimeout(cs._t); cs._t = setTimeout(render, 180); };
  var cc = el('concoursCategory'); if (cc) { cc.value = window.CONCOURS_CATEGORY || ''; cc.onchange = function(){ window.CONCOURS_CATEGORY = cc.value; render(); }; }
  var cy = el('concoursYear'); if (cy) { cy.value = window.CONCOURS_YEAR || ''; cy.onchange = function(){ window.CONCOURS_YEAR = cy.value; render(); }; }
  var cst = el('concoursStatus'); if (cst) { cst.value = window.CONCOURS_STATUS || ''; cst.onchange = function(){ window.CONCOURS_STATUS = cst.value; render(); }; }
  var flip = el('flip'); if (flip) flip.onclick = function () { doFlip(); };
  if (RUN && RUN.mode === 'exam' && RUN.items[RUN.i]) tickExam();
}
function doFlip() {
  var f = el('flip'); if (!f || f.classList.contains('on')) return;
  f.classList.add('on');
  el('cardbtns').innerHTML = '<div class="srsrow">' +
    '<button class="srsbtn again" data-g="0">Raté</button>' +
    '<button class="srsbtn hard" data-g="3">Dur</button>' +
    '<button class="srsbtn good" data-g="4">Bien</button>' +
    '<button class="srsbtn easy" data-g="5">Facile</button></div>';
  Array.prototype.forEach.call(el('cardbtns').querySelectorAll('[data-g]'), function (b) {
    b.onclick = function () { cardGrade(+b.getAttribute('data-g')); };
  });
}
function anchorSave(text, name) {
  try {
    var blob = new Blob([text], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    toast('Sauvegarde exportée');
  } catch (e) { toast('Export impossible sur cet appareil'); }
}
function act(a, b) {
  switch (a) {
    case 'speak':
      if ('speechSynthesis' in window) { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(window.PREP_SPEAK_TEXT || 'Aucun texte à lire.'); u.lang = 'fr-FR'; speechSynthesis.speak(u); toast('🔊 Lecture en cours'); } else toast('Lecture audio non disponible');
      break;
    case 'focus':
      document.body.classList.toggle('focus-mode'); toast(document.body.classList.contains('focus-mode') ? '🎯 Mode concentration activé' : 'Mode concentration désactivé'); break;
    case 'report':
      window.print(); break;
    case 'quit':
      clearInterval(EXTIMER);
      if (RUN && RUN.xp > 0) { addXP(RUN.xp); toast('+' + RUN.xp + ' XP conservés'); }
      go('/' + (RUN && RUN.back ? RUN.back : ''));
      break;
    case 'flip': doFlip(); break;
    case 'again': if (RUN) go('/quiz/' + RUN.did + '/' + RUN.ui); break;
    case 'startexam': startExam(); break;
    case 'startquiz': startQuiz(+b.getAttribute('data-did'), b.getAttribute('data-ui')); break;
    case 'startcards': startCards(+(b.getAttribute('data-did') || 0), b.getAttribute('data-ui') || ''); break;
    case 'notify': requestNotifications(); break;
    case 'install': installApp(); break;
    case 'unlimited': S.unlimited = true; save(); toast('♾️ Cœurs illimités activés'); go('/'); break;
    case 'freeplay': {
      var pool = allQuestions(null);
      RUN = { mode: 'review', items: shuffle(pool).slice(0, 15), i: 0, ok: 0, ko: 0, combo: 0, maxCombo: 0, xp: 0, wrong: [], t0: Date.now(), back: '', did: null, ui: null };
      ROOT.innerHTML = quizFrame() + navBar('review'); bind(); break;
    }
    case 'quick': {
      var quick = quickQuestions();
      RUN = { mode: 'review', items: quick, i: 0, ok: 0, ko: 0, combo: 0, maxCombo: 0, xp: 0, wrong: [], t0: Date.now(), back: '', did: null, ui: null };
      ROOT.innerHTML = quizFrame() + navBar('review'); bind(); break;
    }
    case 'quick5': {
      var quick5 = quickQuestions().slice(0, 5);
      RUN = { mode: 'review', items: quick5, i: 0, ok: 0, ko: 0, combo: 0, maxCombo: 0, xp: 0, wrong: [], t0: Date.now(), back: '', did: null, ui: null };
      ROOT.innerHTML = quizFrame() + navBar('review'); bind(); break;
    }
    case 'diagnostic': {
      var diagnostic = diagnosticQuestions();
      RUN = { mode: 'review', diagnostic: true, items: diagnostic, i: 0, ok: 0, ko: 0, combo: 0, maxCombo: 0, xp: 0, wrong: [], t0: Date.now(), back: 'settings', did: null, ui: null };
      ROOT.innerHTML = quizFrame() + navBar('settings'); bind(); break;
    }
    case 'export': {
      var json = JSON.stringify(S), name = 'cnc-anass-progression-' + today() + '.json';
      if (window.claude && typeof window.claude.use === 'function') {
        window.claude.use('downloads').then(function (dl) {
          if (!dl) { anchorSave(json, name); return; }
          dl.save({ filename: name, data: json })
            .then(function () { toast('Sauvegarde enregistrée'); })
            .catch(function (e) {
              if (e && e.code === 'declined') return;
              if (e && (e.code === 'rate_limited')) { toast('Réessaie dans un instant'); return; }
              anchorSave(json, name);
            });
        }).catch(function () { anchorSave(json, name); });
      } else anchorSave(json, name);
      break;
    }
    case 'exportStats': {
      var statPayload = { version: APP_VERSION, exportedAt: new Date().toISOString(), xp: S.xp, streak: S.streak, best: S.best, history: S.hist, exams: S.exams, units: S.units };
      anchorSave(JSON.stringify(statPayload, null, 2), 'cnc-anass-statistiques-' + today() + '.json');
      break;
    }
    case 'storageTest': {
      try {
        var stamp = 'prepme-test-' + Date.now();
        localStorage.setItem('__prepme_storage_test__', stamp);
        var ok = localStorage.getItem('__prepme_storage_test__') === stamp;
        localStorage.removeItem('__prepme_storage_test__');
        toast(ok ? '✅ Stockage local fonctionnel' : '⚠️ Lecture du stockage impossible');
      } catch (e) { toast('⚠️ Écriture dans le stockage impossible'); }
      break;
    }
    case 'restoreBackup': {
      var backup = null;
      try { backup = parseProgress(localStorage.getItem(BACKUP_KEY)); } catch (e) { backup = null; }
      if (!backup) { toast('ℹ️ Aucune copie de secours valide disponible'); break; }
      if (!confirm('Restaurer la copie de secours ? La progression actuelle sera conservée dans une copie avant restauration.')) break;
      try { localStorage.setItem(KEY + '_before_restore', JSON.stringify(S)); } catch (backupErr) { }
      S = backup; save(); toast('♻️ Copie de secours restaurée'); render();
      break;
    }
    case 'import': {
      var inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'application/json';
      inp.onchange = function () {
        var f = inp.files[0]; if (!f) return;
        var rd = new FileReader();
        rd.onload = function () {
          try {
            var o = JSON.parse(rd.result);
            o = completeProgress(o);
            if (!o) { toast('Fichier invalide, incomplet ou incompatible'); return; }
            if (!confirm('Importer cette progression et remplacer celle de cet appareil ?')) return;
            try { localStorage.setItem(KEY + '_before_import', JSON.stringify(S)); } catch (backupErr) { }
            S = o; save(); toast('Progression importée · sauvegarde précédente conservée'); render();
          }
          catch (e) { toast('Fichier illisible'); }
        };
        rd.readAsText(f);
      };
      inp.click(); break;
    }
    case 'reset':
      if (confirm('Effacer toute la progression (XP, séries, couronnes, révisions) ?')) { S = blank(); save(); applyTheme(); toast('Progression réinitialisée'); go('/'); render(); }
      break;
  }
}

/* Invitation affichée une fois à chaque ouverture de l'application. */
function showContributionWelcome() {
  if (el('contributionWelcome')) return;
  var overlay = document.createElement('div');
  overlay.id = 'contributionWelcome';
  overlay.className = 'contribution-overlay';
  overlay.innerHTML = '<section class="contribution-dialog" role="dialog" aria-modal="true" aria-labelledby="contributionTitle">' +
    '<button class="contribution-close" type="button" aria-label="Fermer">×</button>' +
    '<div class="contribution-icon">🤝</div><h2 id="contributionTitle">Ensemble, améliorons PrepMe</h2>' +
    '<p>Ton avis compte ! Signale un problème, propose une amélioration ou partage des sujets, corrigés et documents pour aider toute la communauté.</p>' +
    '<a class="btn green" href="' + esc(WHATSAPP_CONTACT_URL) + '" target="_blank" rel="noopener noreferrer">💬 Contribuer sur WhatsApp</a>' +
    '<button class="btn ghost contribution-later" type="button">Continuer dans l’application</button>' +
    '<small>WhatsApp · ' + esc(WHATSAPP_CONTACT_DISPLAY) + '</small></section>';
  function closeWelcome() { overlay.remove(); }
  overlay.querySelector('.contribution-close').onclick = closeWelcome;
  overlay.querySelector('.contribution-later').onclick = closeWelcome;
  overlay.onclick = function (e) { if (e.target === overlay) closeWelcome(); };
  document.body.appendChild(overlay);
}

/* ------------------------------------------------------- fin de session */
var _endWrap = quizEnd;
function quizEndRouter() { return RUN && RUN.mode === 'exam' ? examEnd() : RUN && RUN.mode === 'review' ? reviewEnd() : _endWrap(); }
quizEnd = quizEndRouter;

/* clavier : 1-6 pour répondre, Entrée pour continuer */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') { var n = el('next'); if (n) { n.click(); e.preventDefault(); return; } }
  if (/^[1-6]$/.test(e.key)) {
    var opts = ROOT.querySelectorAll('.opt:not([disabled])');
    var i = +e.key - 1; if (opts[i]) opts[i].click();
  }
  if (e.key === ' ') { var f = el('flip'); if (f && !f.classList.contains('on')) { doFlip(); e.preventDefault(); } }
});

/* ------------------------------------------------------------- démarrage */
function boot() {
  ROOT = el('app');
  analyticsSetEnabled(!!S.analytics);
  applyTheme();
  if (!DOCS.length) { ROOT.innerHTML = '<div class="wrap"><div class="card">Aucune donnée chargée. Vérifie que les fichiers du dossier <b>data/</b> sont bien présents à côté de index.html.</div></div>'; return; }
  render();
  dailyReminder();
  setInterval(function () { if ((route()[0] || '') === '' ) { /* rafraîchit les cœurs sur l'accueil */ if (!S.unlimited && S.hearts < HEART_MAX) render(); } }, 60000);
  /* Les mises à jour n’interrompent jamais le premier parcours. */
  setTimeout(watchAppUpdates, 15000);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

})();
