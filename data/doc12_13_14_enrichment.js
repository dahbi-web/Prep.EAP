/* Entraînement des modules 12 à 14, établi à partir des transcriptions PDF correspondantes. */
(function(){
  var docs=window.CNC_DATA.docs||[];
  function q(q,o,c,e,p){return {q:q,o:o,c:c,e:e,source:'Document '+(this&&this.id||'')+' · p.'+p,verified:true};}
  function add(id, rows){var d=docs.find(function(x){return x.id===id;});if(!d)return;d.units.forEach(function(u,i){var r=rows[i];if(!r)return;u.qs=r.map(function(x){return {q:x[0],o:x[1],c:x[2],e:x[3],source:'Document '+id+' · p.'+(i+1),verified:true};});u.cards=u.cards.slice(0,1).concat(u.qs.map(function(x){return {f:x.q.replace(/\?$/,''),b:x.e};}));u.lesson=u.lesson.replace('Contenu extrait du PDF','Cours vérifié à partir du PDF');});}
  add(12,[
    [['Les Comptes nationaux de la santé renseignent principalement sur :',['Les dépenses de santé et leur utilisation','La météo nationale','Les admissions universitaires','Les transports publics'],0,'Le document présente les CNS comme une source importante sur les dépenses de santé et leur utilisation.']],
    [['La classification SHA-11 a été introduite en 2011 par :',['L’OMS avec l’OCDE et Eurostat','La CNSS uniquement','Les collectivités territoriales','Les hôpitaux privés'],0,'Le support indique une introduction par l’OMS en collaboration avec l’OCDE et Eurostat.']],
    [['Selon le document, la dépense totale de santé est de :',['6,09 milliards DH','60,9 milliards DH','609 milliards DH','5,5 milliards DH'],1,'La page 3 indique une dépense totale de santé de 60,9 milliards DH.']],
    [['Quel poste représente la plus grande part des prestations de santé citées ?',['Les soins hospitaliers','La médecine traditionnelle','L’administration','Les autres services'],0,'Les soins hospitaliers représentent 30 % des dépenses courantes par type de prestations.']],
    [['Dans les dépenses des ménages, le poste le plus important cité est :',['Les médicaments et biens médicaux','Les soins dentaires','La médecine traditionnelle','Les soins hospitaliers'],0,'La page 5 indique 34 % pour les médicaments et biens médicaux.']],
    [['Quelle population est majoritaire parmi les personnes couvertes par organisme d’assurance maladie ?',['CNOPS','CNSS','Assurances privées','Mutuelles et régimes internes'],1,'La répartition indiquée est de 68 % pour la CNSS.']],
    [['Dans les dépenses de l’assurance maladie par prestations, les hospitalisations représentent :',['22 %','34,2 %','61 %','9 %'],2,'La page 7 indique 61 % pour les hospitalisations.']],
    [['La principale source de financement des dépenses du Ministère de la Santé est :',['Le budget de l’État','La coopération internationale','Les assurances maladie','Les collectivités territoriales'],0,'Le budget de l’État représente 80,8 % selon la page 8.']]
  ]);
  add(13,[
    [['Le document présente le lavage des mains comme un moyen de prévenir :',['La transmission manuportée des agents infectieux','Uniquement les allergies','Les accidents de circulation','La déshydratation'],0,'L’hygiène des mains limite la transmission manuportée des agents infectieux.']],
    [['Parmi les indications du lavage des mains figure :',['Avant de toucher un patient','Uniquement après le repas','Seulement en fin de semaine','Après avoir quitté l’hôpital uniquement'],0,'Le support indique le lavage avant de toucher un patient.']],
    [['Le lavage simple est prévu pour durer :',['15 secondes','30 secondes','1 minute','5 minutes'],1,'La durée prévue du lavage simple est de 30 secondes.']],
    [['Le lavage antiseptique est prévu pour durer :',['10 secondes','30 secondes','1 minute','10 minutes'],2,'La page 4 indique une durée d’une minute.']],
    [['La friction hydro-alcoolique est prévue pour durer environ :',['3 à 5 secondes','30 à 60 secondes','5 minutes','15 minutes'],1,'Le document indique 30 à 60 secondes pour le traitement hygiénique par friction.']],
    [['Avant une friction hydro-alcoolique, les mains doivent être :',['Mouillées et talquées','Sèches et sans souillures','Couvertes de savon','Désinfectées avec de l’eau de Javel'],1,'Le support demande de vérifier que les mains sont sèches, sans souillures et sans talc.']],
    [['Les gants stériles à usage unique sont indiqués pour :',['Les gestes nécessitant un haut niveau d’asepsie','Toute entrée dans un service','La prise de température uniquement','Le rangement administratif'],0,'Ils sont destinés aux gestes nécessitant un haut niveau d’asepsie et au matériel stérile.']],
    [['Les gants non stériles sont indiqués lorsqu’il existe un risque de contact avec :',['Du sang ou un produit biologique','Uniquement de l’eau potable','Du papier propre','Un vêtement sec'],0,'Le document cite le sang, les produits biologiques, la peau lésée, les muqueuses et le matériel souillé.']],
    [['Le masque FFP2 filtre au moins :',['80 % des aérosols','90 % des aérosols','94 % des aérosols','99 % des aérosols'],2,'La page 9 indique une filtration d’au moins 94 % pour le FFP2.']]
  ]);
  add(14,[
    [['Une maladie à déclaration obligatoire doit être déclarée par :',['Les professionnels de santé aux autorités sanitaires','Les patients uniquement à leur voisinage','Les pharmacies uniquement','Les écoles uniquement'],0,'Le document définit la MDO comme une maladie dont la déclaration est obligatoire par les professionnels de santé aux autorités sanitaires.']],
    [['La déclaration des MDO permet notamment de :',['Suivre l’évolution et mettre en place des mesures de contrôle','Supprimer la surveillance sanitaire','Remplacer tous les examens','Éviter toute prévention'],0,'La déclaration permet la surveillance, le contrôle, la prévention et la protection de la santé publique.']],
    [['Quelle maladie figure parmi celles soumises au règlement sanitaire international ?',['La peste','Le diabète','L’hypertension','La carie dentaire'],0,'La peste est citée avec la fièvre jaune et le choléra.']],
    [['La désinsectisation obligatoire concerne notamment :',['Le paludisme','La fracture du poignet','La migraine','La myopie'],0,'Le paludisme figure dans la liste des maladies donnant lieu à désinsectisation obligatoire.']],
    [['Le paludisme est classé dans le document parmi les maladies :',['Bactériennes','Virales','Parasitaires','Génétiques'],2,'La page 5 classe le paludisme parmi les maladies parasitaires.']],
    [['Quel agent est associé à la tuberculose dans le document ?',['Mycobacterium tuberculosis','SARS-CoV-2','Plasmodium','Treponema pallidum'],0,'La page 6 associe la tuberculose à Mycobacterium tuberculosis.']],
    [['Le vecteur cité pour le paludisme est :',['Le moustique Anopheles','Le phlébotome','La tique Hyalomma','Le pou'],0,'La page 7 cite Plasmodium transmis par le moustique Anopheles.']],
    [['La syphilis primo-secondaire est présentée comme une maladie à transmission notamment :',['Sexuelle','Uniquement alimentaire','Uniquement vectorielle','Uniquement hydrique'],0,'La page 8 associe la syphilis primo-secondaire à Treponema pallidum et à la transmission sexuelle.']]
  ]);
})();
