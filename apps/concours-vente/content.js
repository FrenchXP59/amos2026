/* =========================================================================
   CONTENU — B1 « Projet : concours de vente », séance 1.
   Le moteur est commun (../moteur/). Ouvrir avec ?classe=b1a.
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-concours-vente-s1",
    ecole: "AMOS",
    logo: "../moteur/assets/logo-amos.png",
    cours: "Concours de vente",
    classe: "B1 Bachelor marketing, commercial & événementiel sport",
    seance: "Séance 1 sur 6",
    intervenant: "Frédéric Legrand",
    dateSeance: "Séance de 9h00 à 12h30",
    classes: {
      b1a: { date: "Mercredi 4 novembre 2026, 9h00 – 12h30", debut: "9:00", variables: { seance2: "lundi 23 novembre, après-midi", concours: "vendredi 27 novembre, après-midi" } }
    },
    variables: { seance2: "séance 2", concours: "jour du concours" },
    agences: ["Marque 1", "Marque 2", "Marque 3", "Marque 4", "Marque 5"],
    equipes: "équipes",
    tirageNote: "Mêmes équipes jusqu'au concours."
  },

  videos: { s1: { titre: "", duree: "", url: "" } },

  parcours: [
    { id: "accueil", heure: "9:00", duree: 10, titre: "Départ", sous: "Équipes et défi" },
    { id: "positionnement", type: "quiz", data: "positionnement", heure: "9:10", duree: 15, titre: "Où en êtes-vous ?", sous: "Quiz de positionnement",
      lede: "Dix questions sur AIDA, SONCAS et CAB. Le résultat décide de la suite : un rappel rapide si c'est acquis, l'atelier complet sinon." },
    { id: "methodes", type: "fiches", data: "methodes", heure: "9:25", duree: 20, titre: "Les méthodes", sous: "AIDA, SONCAS, CAB, objections",
      lede: "Les outils du vendeur. Vous les garderez jusqu'au concours : ils sont aussi dans les ressources." },
    { id: "cab", type: "tri", data: "triCab", heure: "9:45", duree: 15, titre: "Entraînement CAB", sous: "Caractéristique, avantage, bénéfice",
      lede: "Un acheteur n'achète pas une caractéristique, il achète un bénéfice. Classez chaque phrase." },
    { id: "soncas", type: "tri", data: "triSoncas", heure: "10:00", duree: 15, titre: "Reconnaître un profil", sous: "Les signaux SONCAS",
      lede: "Le jour du concours, le profil de l'acheteur sera caché. Entraînez-vous à le reconnaître à ce qu'il dit." },
    { id: "pause", heure: "10:15", duree: 15, titre: "Pause", sous: "Ravitaillement" },
    { id: "cas", heure: "10:30", duree: 40, titre: "Le défi Kilomètre Nord", sous: "Le sujet du concours",
      lede: "Votre client : une enseigne de running. Votre mission : faire référencer votre marque. Concours : {concours}." },
    { id: "terrain", type: "fiches", data: "terrain", heure: "11:10", duree: 25, titre: "Mission terrain", sous: "À faire avant la séance 2",
      lede: "Avant de convaincre un magasin, allez voir comment il vend. À faire en dehors des cours, avant la séance 2 ({seance2})." },
    { id: "simulation", type: "pitch", heure: "11:35", duree: 40, titre: "Premier essai", sous: "Simulateur de soutenance",
      lede: "Un premier tour à blanc, sans préparation : pitch de 2 minutes, puis négociation. Pour sentir ce qui vous attend." },
    { id: "final", heure: "12:15", duree: 15, titre: "Battle finale", sous: "À retenir et suite",
      lede: "Huit questions sur la séance. L'équipe qui lève la main la première et répond juste prend le point." }
  ],

  /* ---------- Quiz de positionnement ---------- */
  positionnement: {
    intro: "Répondez seul, à main levée ou sur papier. Si moins de la moitié de la classe a 7 bonnes réponses sur 10, faites l'atelier complet ; sinon, un rappel rapide suffit et le temps gagné va au premier essai.",
    questions: [
      { q: "AIDA signifie…", options: ["Attention, Intérêt, Désir, Action", "Accueil, Information, Démonstration, Accord", "Argument, Idée, Décision, Achat", "Attente, Intention, Désir, Achat"], bonne: 0, explication: "Les quatre étapes qui guident le client de l'attention à l'action. Votre pitch de 2 minutes suivra ce chemin." },
      { q: "Dans SONCAS, le S correspond à…", options: ["Service", "Sécurité", "Satisfaction", "Simplicité"], bonne: 1, explication: "S comme Sécurité : le client veut être rassuré, avoir des garanties." },
      { q: "« Semelle en mousse de 38 mm » est…", options: ["Une caractéristique", "Un avantage", "Un bénéfice", "Une objection"], bonne: 0, explication: "C'est un fait technique sur le produit : une caractéristique." },
      { q: "« Vos genoux fatigueront moins sur un semi-marathon » est…", options: ["Une caractéristique", "Un avantage", "Un bénéfice", "Une question"], bonne: 2, explication: "C'est ce que le client gagne, lui, dans sa situation : un bénéfice." },
      { q: "« Et si ça ne se vend pas, vous reprenez les invendus ? » révèle surtout un profil…", options: ["Orgueil", "Nouveauté", "Sécurité", "Confort"], bonne: 2, explication: "Le client cherche une garantie : profil Sécurité." },
      { q: "« C'est la toute dernière technologie ? » révèle surtout un profil…", options: ["Nouveauté", "Argent", "Confort", "Sécurité"], bonne: 0, explication: "L'attrait pour l'innovation : profil Nouveauté." },
      { q: "Avant d'argumenter, le vendeur doit d'abord…", options: ["Annoncer le prix", "Découvrir les besoins du client", "Présenter toute la gamme", "Traiter les objections"], bonne: 1, explication: "On n'argumente bien qu'après avoir compris le besoin : c'est la phase de découverte." },
      { q: "Laquelle est une question ouverte ?", options: ["Vous courez souvent ?", "Vous préférez la route ?", "Comment se passent vos sorties longues ?", "C'est pour vous ?"], bonne: 2, explication: "Une question ouverte appelle une réponse développée, pas un oui ou un non." },
      { q: "Face à une objection, le premier réflexe est de…", options: ["Contredire immédiatement", "Écouter et reformuler", "Baisser le prix", "Changer de sujet"], bonne: 1, explication: "On écoute, on reformule pour montrer qu'on a compris, puis on répond." },
      { q: "Le dernier A d'AIDA demande au vendeur de…", options: ["Attendre la décision", "Conclure : proposer une action concrète", "Ajouter un argument", "Annoncer une remise"], bonne: 1, explication: "Action : on conclut, on propose une suite précise (une commande test, un rendez-vous)." }
    ]
  },

  /* ---------- Fiches méthode ---------- */
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

  /* ---------- Tri CAB ---------- */
  triCab: {
    intro: "Pour chaque phrase, la classe vote : caractéristique, avantage ou bénéfice.",
    categories: [{ k: "c", label: "C" }, { k: "a", label: "A" }, { k: "b", label: "B" }],
    items: [
      { t: "La chaussure pèse 240 grammes.", cat: "c", why: "Un fait mesurable sur le produit." },
      { t: "Elle est plus légère que la moyenne du rayon.", cat: "a", why: "Ce que la caractéristique permet, en général." },
      { t: "Vos clients du club gagneront en aisance sur leurs fractionnés.", cat: "b", why: "Ce que ça change pour le client et ses clients." },
      { t: "Le textile est recyclé à 80 %.", cat: "c", why: "Un fait sur la composition." },
      { t: "Vos clients sensibles à l'environnement trouveront enfin une offre à leur image.", cat: "b", why: "Le gain pour l'enseigne et sa clientèle." },
      { t: "Nos délais de livraison sont de 5 jours.", cat: "c", why: "Un fait sur le service." },
      { t: "Le réassort est rapide.", cat: "a", why: "L'avantage général des délais courts." },
      { t: "Vous ne perdrez plus de ventes faute de pointure en stock.", cat: "b", why: "Le bénéfice concret pour ce magasin." }
    ]
  },

  /* ---------- Tri SONCAS (sans Sympathie, comme au concours) ---------- */
  triSoncas: {
    intro: "Ce que dit l'acheteur trahit son profil. Pour chaque phrase, la classe choisit le profil dominant.",
    categories: [{ k: "s", label: "S" }, { k: "o", label: "O" }, { k: "n", label: "N" }, { k: "c", label: "C" }, { k: "a", label: "A" }],
    items: [
      { t: "« Qui d'autre vous a déjà référencé ? »", cat: "s", why: "Il cherche des preuves, des références : Sécurité." },
      { t: "« Je veux être le seul de la région à l'avoir. »", cat: "o", why: "Être le premier, se distinguer : Orgueil." },
      { t: "« Qu'est-ce que votre marque a que les autres n'ont pas ? »", cat: "n", why: "L'attrait pour la différence : Nouveauté." },
      { t: "« Combien je gagne sur chaque paire ? »", cat: "a", why: "Raisonnement en marge : Argent." },
      { t: "« Je n'ai pas le temps de former mes vendeurs. »", cat: "c", why: "Il veut que ce soit simple : Confort." },
      { t: "« Vous reprenez ce qui ne se vend pas ? »", cat: "s", why: "Réduire le risque : Sécurité." },
      { t: "« Une marque que les meilleurs coureurs du club portent, ça me plaît. »", cat: "o", why: "Le prestige : Orgueil." },
      { t: "« Votre livraison, c'est un seul carton tout prêt ? »", cat: "c", why: "La logistique facile : Confort." },
      { t: "« Vous me faites un geste sur la première commande ? »", cat: "a", why: "Le prix avant tout : Argent." },
      { t: "« C'est la technologie dont tout le monde parle ? »", cat: "n", why: "L'innovation : Nouveauté." }
    ]
  },

  /* ---------- Le sujet : Kilomètre Nord (fictif) ---------- */
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
      { c: "Compréhension des besoins de l'enseigne et découverte", p: 4 },
      { c: "Pitch de 2 minutes : structure AIDA, impact", p: 3 },
      { c: "Négociation : CAB, leviers, concessions maîtrisées", p: 4 },
      { c: "Réponses aux objections", p: 3 },
      { c: "Écoute active : profil SONCAS identifié et adaptation", p: 2 },
      { c: "Cohésion du groupe et complémentarité des rôles", p: 2 },
      { c: "Livrables : analyse terrain, auto-évaluation, note réflexive", p: 2 }
    ],
    baremeNote: "Grille du jury, partagée dès aujourd'hui. Soutenance : pitch de 2 minutes, négociation avec réponse aux objections, remise des livrables, sans autre support. Pondération de la note de rétrospective à confirmer avec l'école.",
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

  /* ---------- Mission terrain ---------- */
  terrain: {
    intro: "En dehors des heures de cours, avant la séance 2. Chaque équipe se répartit le travail ; chaque étudiant fait au moins une visite.",
    items: [
      { sigle: "1", titre: "Observer 2 ou 3 points de vente", sous: "Magasins spécialisés running et rayons running de grandes surfaces",
        points: ["Comment le rayon est organisé : marques, prix, place des nouveautés.", "Le parcours du client, de l'entrée à la caisse.", "Ce que les vendeurs mettent en avant, et comment."] },
      { sigle: "2", titre: "Une visite en client mystère", sous: "Vous jouez un client, avec un scénario préparé",
        points: [["Accueil :", "délai, premier contact, ambiance."], ["Découverte :", "questions posées par le vendeur, ouvertes ou fermées."], ["Argumentation :", "caractéristiques ou bénéfices ? Adaptée à vous ?"], ["Objection :", "glissez-en une (« c'est un peu cher »). Comment est-elle traitée ?"], ["Conclusion :", "le vendeur propose-t-il d'acheter, d'essayer, de revenir ?"]] },
      { sigle: "3", titre: "2 à 3 mini-interviews", sous: "Un vendeur, un responsable de magasin, un client",
        points: ["Qu'est-ce qui fait qu'une vente réussit ?", "Comment le magasin choisit-il une nouvelle marque ?", "Qu'est-ce qui vous ferait changer de marque ? (client)"] },
      { sigle: "!", titre: "Les règles", sous: "Respect des personnes et des magasins",
        points: ["Observation discrète, sans gêner le travail des vendeurs.", "Une interview se fait avec l'accord de la personne, et en se présentant comme étudiant.", "Aucun enregistrement ni photo de personnes sans leur accord.", "Pas de nom de vendeur dans le compte-rendu."] },
      { sigle: "CR", titre: "Le compte-rendu d'analyse terrain", sous: "À apporter en séance 2, remis au jury le jour du concours",
        points: ["Les magasins visités et ce que vous avez observé.", "La grille client mystère remplie.", "Les enseignements des interviews.", "Trois idées concrètes pour votre pitch."] }
    ],
    note: "La mission terrain ne pèse pas l'essentiel de la note, mais une équipe qui connaît le quotidien d'un magasin négocie bien mieux avec son acheteur."
  },

  /* ---------- Simulateur de soutenance ---------- */
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

  /* ---------- Battle finale ---------- */
  battle: [
    { q: "« Semelle de 38 mm » est…", options: ["Une caractéristique", "Un avantage", "Un bénéfice", "Une objection"], bonne: 0 },
    { q: "« Vous reprenez les invendus ? » : quel profil ?", options: ["Orgueil", "Sécurité", "Nouveauté", "Argent"], bonne: 1 },
    { q: "Combien de temps dure le pitch au concours ?", options: ["30 secondes", "2 minutes", "5 minutes", "15 minutes"], bonne: 1 },
    { q: "Quel support peut-on utiliser le jour du concours ?", options: ["Un diaporama", "Une vidéo", "Aucun, en dehors des livrables remis", "Un prototype"], bonne: 2 },
    { q: "Prix public 140 € TTC, coefficient 2 : prix d'achat visé par l'enseigne ?", options: ["70 € HT", "58,33 € HT", "65 € HT", "46,67 € HT"], bonne: 1 },
    { q: "Peut-on descendre sous le prix plancher ?", options: ["Oui, pour conclure", "Non, la marque perd de l'argent", "Oui, si l'acheteur insiste", "Seulement pour la veste"], bonne: 1 },
    { q: "Avant d'argumenter, on…", options: ["Annonce les prix", "Découvre les besoins", "Fait une remise", "Parle de soi"], bonne: 1 },
    { q: "Pendant une visite client mystère, on peut enregistrer le vendeur…", options: ["Oui, discrètement", "Non, jamais sans son accord", "Oui, si c'est pour l'école", "Oui, en audio seulement"], bonne: 1 }
  ],

  aRetenir: [
    "On découvre avant d'argumenter : les questions ouvertes font parler l'acheteur.",
    "Un argument se construit en CAB, et c'est le bénéfice qui convainc.",
    "Le profil SONCAS se devine aux mots du client : écoutez-les.",
    "Une objection est une question déguisée : écouter, reformuler, répondre, vérifier.",
    "On négocie avec des leviers, jamais sous son prix plancher.",
    "Le terrain d'abord : on vend mieux à un magasin qu'on connaît."
  ],

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
    { titre: "Fiches méthode : AIDA, SONCAS, CAB, objections", fichier: "ressources/fiches-methode.pdf", type: "PDF", dispo: false },
    { titre: "Sujet du concours et fiche de marge", fichier: "ressources/sujet-kilometre-nord.pdf", type: "PDF", dispo: false },
    { titre: "Grille client mystère", fichier: "ressources/grille-client-mystere.pdf", type: "PDF", dispo: false },
    { titre: "Grille du jury", fichier: "ressources/grille-jury.pdf", type: "PDF", dispo: false },
    { titre: "Modèle de note réflexive et d'auto-évaluation", fichier: "ressources/note-reflexive.pdf", type: "PDF", dispo: false }
  ],

  actus: []
};
