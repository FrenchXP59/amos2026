/* =========================================================================
   COMMUN — B1 « Concours de vente » : ce qui est partagé par les 6 séances
   (sujet Kilomètre Nord, barème, simulateur, fiches méthode, glossaire, ressources, jury).
   Chargé avant le content.js de chaque séance. Modifier ici = modifier partout.
   ========================================================================= */

window.KN = {

  methodes: {
    intro: "Ouvrez chaque fiche. Si le quiz est réussi, survolez-les en 5 minutes ; sinon, prenez le temps de chacune.",
    items: [
      { sigle: "AIDA", titre: "Structurer un pitch", sous: "Attention, Intérêt, Désir, Action",
        points: [["Attention :", "une accroche qui parle au client, pas de vous."], ["Intérêt :", "le problème du client, appuyé sur un fait."], ["Désir :", "votre solution et ce qu'elle lui apporte."], ["Action :", "une proposition concrète et datée."]],
        exemple: "« Vos clients achètent leurs chaussures en ligne après les avoir essayées chez vous. Et si une marque leur donnait une raison d'acheter en magasin ? »" },
      { sigle: "SONCAS", titre: "Comprendre ce qui motive le client", sous: "Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie",
        points: [["Sécurité :", "veut des garanties, craint le risque."], ["Orgueil :", "veut être le premier, le meilleur, valorisé."], ["Nouveauté :", "aime l'innovation, la différence."], ["Confort :", "veut de la simplicité, peu d'efforts."], ["Argent :", "raisonne en prix, marge, rentabilité."], ["Sympathie :", "achète à des gens en qui il a confiance. Profil présenté mais exclu du tirage du concours."]],
        exemple: "On écoute les mots du client pour repérer son profil dominant, puis on adapte ses arguments. Certains ajoutent un E pour Environnement (SONCASE)." },
      { sigle: "CAB", titre: "Transformer un produit en bénéfice", sous: "Caractéristique, Avantage, Bénéfice",
        points: [["Caractéristique :", "ce qu'est le produit (un fait)."], ["Avantage :", "ce que ça permet, en général."], ["Bénéfice :", "ce que ça change pour CE client, dans SA situation."]],
        exemple: "« Semelle de 38 mm (C), donc plus d'amorti (A) : vos clients qui préparent un marathon reviendront vous voir moins blessés (B). »" },
      { sigle: "?", titre: "Découvrir les besoins", sous: "Questionner avant d'argumenter",
        points: ["Questions ouvertes pour faire parler (« Comment… », « Qu'est-ce qui… »).", "Questions fermées pour valider (« Si je comprends bien, c'est surtout le prix ? »).", "Reformuler ce qu'on a compris avant d'argumenter.", "Noter les mots du client : ils trahissent son profil SONCAS."],
        exemple: "« Qu'est-ce qui vous fait référencer une nouvelle marque, en général ? »" },
      { sigle: "OBJ", titre: "Traiter une objection", sous: "Une objection est une question déguisée",
        points: ["Écouter jusqu'au bout, sans couper.", "Reformuler pour montrer qu'on a compris.", "Questionner pour trouver la vraie raison.", "Répondre avec un argument adapté au profil.", "Vérifier que la réponse convient."],
        exemple: "« Votre marge est trop faible. » → « Vous comparez à vos marques actuelles ? Regardons ce que rapporte une marque qui tourne plus vite en rayon. »" }
    ],
    chrono: 20
  },

  client: {
    nom: "Kilomètre Nord",
    accroche: "Neuf magasins de running, un rayon qui ne s'agrandit pas.",
    avertissement: "Enseigne, acheteur et marques fictifs, créés pour le concours.",
    arrivee: "Le sujet est dévoilé à {heure:cas}",
    teaser: "Une chaîne de magasins de running cherche des marques différenciantes. Chaque équipe crée la sienne et devra la faire référencer devant le jury, le {concours}.",
    seance2Kicker: "Séance 2, {seance2}",
    seance2Titre: "Le terrain parle",
    onglets: ["L'enseigne", "Ses clients", "Fiche de marge", "Le travail", "La grille", "Feuille de route"],
    fiche: [
      ["Enseigne", "Kilomètre Nord, 9 magasins spécialisés running, Hauts-de-France (fictif)"],
      ["Positionnement", "Conseil, analyse de foulée, partenariats avec des clubs de course"],
      ["Problème", "Concurrence des grandes surfaces de sport et du e-commerce"],
      ["Contrainte", "Rayon fixe : faire entrer une marque, c'est en sortir une autre"],
      ["Interlocuteur", "Le responsable achats running, joué par un juré"],
      ["Objectif des équipes", "Un référencement test de 3 mois dans 3 magasins"],
      ["Concours", "{concours}, 15 minutes par équipe"]
    ],
    objectifsTitre: "Ce que cherche l'enseigne",
    objectifs: ["Des marques que les grandes surfaces n'ont pas", "Une marge au moins égale à ses marques actuelles", "Peu de risque sur les stocks", "Des produits que ses vendeurs aiment conseiller"],
    cibles: [
      { nom: "Coureurs réguliers, 25-45 ans", d: "2 à 4 sorties par semaine, préparent des courses, demandent du conseil technique." },
      { nom: "Néo-coureurs", d: "Débutent, ont besoin d'être rassurés, sensibles au confort et au prix." },
      { nom: "Traileurs", d: "Cherchent de l'accroche, de la protection, des produits durables." },
      { nom: "Clubs de course partenaires", d: "Achats groupés, remises, équipement pour leurs licenciés." }
    ],
    marge: {
      intro: "Chaque équipe reçoit cette fiche pour ses 3 références. Les montants servent de base à la négociation : on peut bouger, mais pas sous le prix plancher.",
      colonnes: ["Référence", "Prix public conseillé", "Prix d'achat proposé par la marque", "Prix plancher de la marque", "Prix d'achat visé par l'enseigne"],
      lignes: [
        ["Chaussure route", "140 € TTC", "65 € HT", "55 € HT", "58,33 € HT au plus"],
        ["Chaussure trail", "160 € TTC", "74 € HT", "63 € HT", "66,67 € HT au plus"],
        ["Veste de running", "90 € TTC", "42 € HT", "35 € HT", "37,50 € HT au plus"]
      ],
      reglesTitre: "Les règles du jeu",
      regles: [
        "L'enseigne vise un coefficient de 2 : prix de vente HT (prix TTC divisé par 1,2) égal à deux fois le prix d'achat HT.",
        "Exemple : 140 € TTC, soit 116,67 € HT ; divisé par 2 : 58,33 € HT au plus pour l'enseigne.",
        "Sous le prix plancher, la marque perd de l'argent : interdit d'y descendre.",
        "Autres leviers négociables : quantités de la commande test, exclusivité régionale, PLV et formation des vendeurs, reprise des invendus, durée du test et indicateurs."
      ],
      note: "Le coefficient de 2 est une simplification pédagogique : dans la réalité, il varie selon les enseignes et les produits."
    },
    travail: [
      { t: "Votre marque", d: "Un nom, un positionnement, une promesse. Fictive, sans copier une marque existante." },
      { t: "Votre gamme", d: "3 références (route, trail, veste) avec leurs caractéristiques, avantages et bénéfices." },
      { t: "La mission terrain", d: "Visites en client mystère et mini-interviews, compte-rendu pour la séance 2." },
      { t: "Votre feuille de route", d: "Remplie au fil des séances, elle prépare le pitch et la négociation." }
    ],
    dureeTravail: 25,
    etape: "Fin de séance : chaque équipe a son nom de marque, sa promesse et ses 3 références. La mission terrain est lancée.",
    seance2: "Séance 2 ({seance2}) : restitution du terrain, analyse des besoins de l'enseigne, premières lignes du pitch.",
    bareme: [
      { g: "Soutenance : note collective du jury (14 points)" },
      { c: "Compréhension des besoins de l'enseigne et découverte", p: 3 },
      { c: "Pitch de 2 minutes : structure AIDA et aisance à l'oral (fiches de notes tolérées, mais leur lecture pénalise ce critère)", p: 3 },
      { c: "Négociation : CAB, leviers, concessions maîtrisées", p: 3 },
      { c: "Réponses aux objections", p: 2 },
      { c: "Écoute active : profil SONCAS identifié et adaptation", p: 2 },
      { c: "Cohésion du groupe et complémentarité des rôles", p: 1 },
      { g: "Rétrospective (6 points)" },
      { c: "Compte-rendu d'analyse terrain, collectif", p: 2 },
      { c: "Note réflexive individuelle, rédigée en classe le matin du concours, sans IA : auto-évaluation et compétences à valoriser sur LinkedIn et le CV", p: 4 }
    ],
    baremeNote: "Note sur 20 : 14 points de soutenance, communs à l'équipe, et 6 points de rétrospective, dont 4 individuels. Soutenance : pitch de 2 minutes, négociation avec réponse aux objections, remise des livrables, sans autre support.",
    journal: {
      titre: "Feuille de route",
      champ: "Notre réponse",
      etapes: [
        { label: "Notre marque et sa promesse" },
        { label: "Nos 3 références en CAB" },
        { label: "Ce que le terrain nous a appris", changement: true },
        { label: "Notre pitch de 2 minutes (AIDA)", changement: true }
      ],
      changementLabel: "Ce que nous avons modifié depuis la séance précédente",
      critique: "Nos réponses aux 3 objections les plus probables"
    }
  },

  pitch: {
    titre: "Simulateur de soutenance",
    lede: "Pitch de 2 minutes, puis négociation. L'acheteur joue un profil caché ; à mi-parcours, il sort une objection, et quelqu'un de l'équipe doit y répondre.",
    duree: 720,
    objectionA: 420,
    phases: [{ label: "Pitch", sec: 120 }, { label: "Négociation", sec: 600 }],
    roles: ["Accroche et présentation", "Découverte des besoins", "La gamme en CAB", "Négociation des conditions", "Conclusion et engagement"],
    cartesBouton: "Tirer le profil de l'acheteur",
    cartes: [
      { nom: "Sécurité", consigne: "Vous demandez des références, des garanties, la reprise des invendus. Vous hésitez tant que le risque n'est pas couvert.", indices: "Il voulait des garanties et des preuves." },
      { nom: "Orgueil", consigne: "Vous voulez être le premier et le seul de la région. Vous êtes sensible à l'image de votre enseigne.", indices: "Il voulait être le premier, valorisé." },
      { nom: "Nouveauté", consigne: "Vous cherchez ce qui n'existe pas encore en rayon. Le déjà-vu vous ennuie.", indices: "Il voulait de la différence et de l'innovation." },
      { nom: "Confort", consigne: "Vous voulez une logistique simple, des vendeurs formés sans effort de votre part, peu de références.", indices: "Il voulait de la simplicité." },
      { nom: "Argent", consigne: "Vous ramenez tout à la marge, aux remises, au coût de la PLV. Vous négociez chaque euro.", indices: "Il raisonnait en marge et en prix." }
    ],
    objections: [
      "« Je ne connais pas votre marque, et mes clients non plus. »",
      "« Votre marge est inférieure à celle de mes marques actuelles. »",
      "« Si je vous fais entrer, qui je sors du rayon ? »",
      "« Et si ça ne se vend pas ? »",
      "« Mes vendeurs n'ont pas le temps d'apprendre une nouvelle marque. »",
      "« Les grandes surfaces auront votre marque dans six mois, non ? »",
      "« Trois mois de test, c'est trop court pour juger. »"
    ],
    origine: "Mécanique reprise de ton appli Pitchcoach : chrono, objection tirée au hasard, personne désignée au hasard pour répondre."
  },

  /* Pitch AIDA : un seul stockage pour toutes les séances (clé « pitchAida ») */
  pitchAida: {
    intro: "Écrivez ce que vous direz, mot pour mot, pour mesurer la durée. Au concours, vous ne lirez pas : le texte sert à préparer.",
    oral: { motsMinute: 130, cible: 120 },
    blocs: [
      { k: "a", nom: "Attention", aide: "Une accroche sur le client, pas sur vous : 15 secondes", ex: "« Vos clients essaient leurs chaussures chez vous, puis les achètent en ligne. Et si une marque leur donnait une raison d'acheter ici ? »" },
      { k: "i", nom: "Intérêt", aide: "Son problème, appuyé sur le terrain : 30 secondes", ex: "« Dans les magasins que nous avons visités, trois marques occupent tout le mur. Pour un client, plus rien ne distingue un spécialiste d'une grande surface. »" },
      { k: "d", nom: "Désir", aide: "Votre marque en CAB, et ce qu'elle lui rapporte : 50 secondes", rows: 5, ex: "« Notre chaussure route [caractéristique] permet [avantage] : vos clients [bénéfice]. Et pour vous : [bénéfice pour l'enseigne]. »" },
      { k: "ac", nom: "Action", aide: "Une proposition précise et datée : 25 secondes", ex: "« Nous vous proposons un test de trois mois dans trois de vos magasins, à partir du 1er mars. On le lance ensemble ? »" }
    ]
  },

  /* Note réflexive individuelle (4 points) : rédigée en classe le matin du concours (séance 5), sans IA */
  noteReflexive: {
    intro: "Individuelle, manuscrite, sans IA ni téléphone : 30 minutes, une page, le matin du concours. Vos documents d'équipe (auto-évaluation, feuille de route) sont autorisés.",
    items: [
      { sigle: "1", titre: "Mon rôle et ma contribution", sous: "Des faits, avec leur date",
        points: ["Mon rôle dans l'équipe et au concours.", "Ce que j'ai fait concrètement : visites terrain, rédaction, pitch, négociation.", "Un exemple daté : « Le 25 novembre, en simulation, j'ai… »"] },
      { sigle: "2", titre: "Une réussite, une difficulté", sous: "Et ce que j'en ai appris",
        points: ["Ce qui a marché, et pourquoi.", "Ce qui a coincé, et ce que je ferais autrement."] },
      { sigle: "3", titre: "Mon auto-évaluation", sous: "Sur deux ou trois critères de la grille",
        points: ["Ma note, argumentée, sur les critères où j'étais le plus impliqué.", "Ce qui me reste à travailler."] },
      { sigle: "4", titre: "Deux compétences pour LinkedIn ou le CV", sous: "Chacune avec sa preuve",
        points: ["Une compétence, ce qui la prouve, le contexte."], exemple: "« Négociation commerciale : préparation d'un plan de concessions et négociation face à un acheteur, concours de vente AMOS, novembre 2026. »" },
      { sigle: "/4", titre: "Comment elle est notée", sous: "4 points individuels",
        points: [["1 point :", "des faits précis plutôt que des généralités."], ["1 point :", "une auto-évaluation lucide."], ["1 point :", "des apprentissages réels."], ["1 point :", "deux compétences formulées avec une preuve."]] }
    ],
    chrono: 30
  },

  jury: {
    titre: "Grille du jury",
    lede: "Page réservée au jury, à ne pas projeter. Un membre du jury joue l'acheteur, les autres notent. Les notes restent dans ce navigateur : exportez-les à la fin.",
    criteres: [
      { c: "Besoins de l'enseigne et découverte", p: 3 },
      { c: "Pitch AIDA et aisance à l'oral (lecture de fiches pénalisée)", p: 3 },
      { c: "Négociation : CAB, leviers, concessions", p: 3 },
      { c: "Réponses aux objections", p: 2 },
      { c: "Écoute active, profil SONCAS repéré", p: 2 },
      { c: "Cohésion et complémentarité des rôles", p: 1 }
    ],
    departage: [2, 3],
    note: "Soutenance sur 14 points, commune à l'équipe ; c'est elle qui fait le palmarès. Le compte-rendu terrain (2 points) et la note réflexive individuelle (4 points) sont notés après lecture, hors de cette grille. En cas d'égalité au palmarès, la négociation puis les objections départagent."
  },

  glossaire: [
    ["AIDA", "Attention, Intérêt, Désir, Action : la structure d'un pitch."],
    ["SONCAS", "Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie : les motivations d'achat."],
    ["CAB", "Caractéristique, Avantage, Bénéfice : transformer un produit en raison d'acheter."],
    ["Découverte", "Phase de questions pour comprendre les besoins avant d'argumenter."],
    ["Question ouverte", "Question qui appelle une réponse développée (« Comment… »)."],
    ["Reformulation", "Redire avec ses mots ce que le client a dit, pour vérifier et montrer qu'on a compris."],
    ["Objection", "Frein exprimé par le client, souvent une question déguisée."],
    ["Référencement", "Décision d'une enseigne de mettre une marque ou un produit en vente."],
    ["Prix plancher", "Prix en dessous duquel le vendeur perd de l'argent."],
    ["Coefficient", "Rapport entre le prix de vente HT et le prix d'achat HT."],
    ["PLV", "Publicité sur le lieu de vente : présentoirs, affiches, animations."],
    ["Client mystère", "Personne qui joue un client pour évaluer l'accueil et la vente."]
  ],

  ressources: [
    { titre: "Fiches méthode : AIDA, SONCAS, CAB, objections", fichier: "../concours-vente/ressources/fiches-methode.pdf", type: "PDF", dispo: true },
    { titre: "Sujet du concours et fiche de marge", fichier: "../concours-vente/ressources/sujet-kilometre-nord.pdf", type: "PDF", dispo: true },
    { titre: "Grille client mystère", fichier: "../concours-vente/ressources/grille-client-mystere.pdf", type: "PDF", dispo: true },
    { titre: "Grille du jury", fichier: "../concours-vente/ressources/grille-jury.pdf", type: "PDF", dispo: true },
    { titre: "Grille d'auto-évaluation", fichier: "../concours-vente/ressources/grille-auto-evaluation.pdf", type: "PDF", dispo: true },
    { titre: "Fiche : traiter les objections", fichier: "../concours-vente/ressources/fiche-objections.pdf", type: "PDF", dispo: true },
    { titre: "Modèle de note réflexive et d'auto-évaluation", fichier: "../concours-vente/ressources/note-reflexive.pdf", type: "PDF", dispo: true }
  ],

};
