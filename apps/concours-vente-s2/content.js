/* =========================================================================
   CONTENU — B1 « Projet : concours de vente », séance 2 : le terrain parle.
   Sujet, barème, simulateur et fiches : ../concours-vente/commun.js (KN).
   Ouvrir avec ?classe=b1a. Équipes et feuille de route reprises de la séance 1.
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-concours-vente-s2",
    idEquipes: "amos-concours-vente-s1",
    idJournal: "amos-concours-vente-journal",
    ambiance: "piste",
    ecole: "AMOS",
    logo: "../moteur/assets/logo-amos.png",
    cours: "Concours de vente",
    classe: "B1 Bachelor marketing, commercial & événementiel sport",
    seance: "Séance 2 sur 6",
    intervenant: "Frédéric Legrand",
    dateSeance: "Séance de 13h30 à 17h00",
    classes: {
      b1a: { date: "Lundi 23 novembre 2026, 13h30 – 17h00", debut: "13:30", variables: { seance3: "mardi 24 novembre, après-midi", concours: "vendredi 27 novembre, après-midi" } }
    },
    variables: { seance3: "séance 3", concours: "jour du concours" },
    agences: ["Marque 1", "Marque 2", "Marque 3", "Marque 4", "Marque 5"],
    equipes: "équipes",
    tirage: false,
    tirageNote: "Constituées en séance 1, elles restent les mêmes jusqu'au concours. Pour corriger un nom ou un membre : séance 1, ou clic sur les scores."
  },

  videos: { s1: { titre: "Écouter avant de vendre", duree: "4 à 5 min", url: "" } },

  parcours: [
    { id: "accueil", heure: "13:30", duree: 10, titre: "Retour en piste", sous: "Les équipes, la séance" },
    { id: "video", heure: "13:40", duree: 15, titre: "Écouter avant de vendre", sous: "Vidéo et quiz flash",
      lede: "Quatre minutes sur l'écoute, le terrain et la reformulation, puis quatre questions. L'équipe la plus rapide prend le point." },
    { id: "restitution", type: "tour", data: "restitution", heure: "13:55", duree: 35, titre: "Le terrain parle", sous: "Restitution, 5 min par équipe",
      lede: "Ce que vous avez vu, entendu et compris dans les magasins. Pas de diaporama : on raconte des faits." },
    { id: "besoins", type: "tri", data: "triBesoins", heure: "14:30", duree: 20, titre: "Des faits aux besoins", sous: "Les 4 besoins de l'enseigne",
      lede: "Une observation n'a de valeur que si elle révèle un besoin. À quel besoin de Kilomètre Nord rattacher chacune ?" },
    { id: "pause", heure: "14:50", duree: 15, titre: "Pause", sous: "Ravitaillement" },
    { id: "questions", type: "tri", data: "triQuestions", heure: "15:05", duree: 20, titre: "Bien questionner", sous: "Ouverte, fermée ou orientée",
      lede: "Au concours, la négociation commence par la découverte. Une bonne question fait parler l'acheteur ; une mauvaise l'enferme." },
    { id: "decouverte", type: "construire", data: "decouverte", heure: "15:25", duree: 20, titre: "Préparer sa découverte", sous: "Le plan de questions de l'équipe",
      lede: "Cinq questions, pas plus. Elles ouvriront votre négociation, juste après le pitch." },
    { id: "compterendu", type: "fiches", data: "compteRendu", heure: "15:45", duree: 15, titre: "Le compte-rendu terrain", sous: "Livrable noté sur 2 points",
      lede: "Le premier livrable du concours. Il se construit maintenant, tant que les visites sont fraîches." },
    { id: "pitch-v1", type: "construire", data: "pitchAida", heure: "16:00", duree: 40, titre: "Le pitch, version 1", sous: "AIDA en 2 minutes",
      lede: "Premières lignes du pitch, appuyées sur le terrain. L'estimation de durée vous dit si vous tenez en 2 minutes." },
    { id: "final", heure: "16:40", duree: 20, titre: "Battle finale", sous: "À retenir et suite",
      lede: "Huit questions sur la séance. L'équipe qui lève la main la première et répond juste prend le point." }
  ],

  /* ---------- Vidéo + quiz flash (aligné sur la note de cadrage NotebookLM du 23 novembre) ---------- */
  quizFlash: [
    { q: "Pendant la découverte, qui doit parler le plus ?", options: ["Le vendeur", "Le client", "Autant l'un que l'autre", "Le jury"], bonne: 1, explication: "La découverte sert à faire parler le client : c'est lui qui détient l'information sur ses besoins." },
    { q: "Une visite en client mystère sert à…", options: ["Piéger un vendeur", "Évaluer l'expérience réelle d'un client", "Obtenir une remise", "Recruter un vendeur"], bonne: 1, explication: "On vit le parcours d'un vrai client, avec une grille, pour observer ce qui marche et ce qui bloque." },
    { q: "Une observation terrain utile, c'est…", options: ["Une impression générale", "Un fait précis : où, quand, quoi", "Un avis sur le vendeur", "Une photo du vendeur"], bonne: 1, explication: "Un fait précis se vérifie et s'exploite ; une impression se discute." },
    { q: "Reformuler, c'est…", options: ["Répéter mot pour mot", "Redire avec ses mots ce que le client a dit, pour vérifier", "Résumer son argumentaire", "Contredire poliment"], bonne: 1, explication: "La reformulation montre qu'on a écouté et vérifie qu'on a bien compris avant d'argumenter." }
  ],

  /* ---------- Restitution terrain ---------- */
  restitution: {
    intro: "5 minutes par équipe : 3 pour restituer, 2 pour les questions de la classe. Lancez le chrono à chaque passage. Ce que vous entendez chez les autres équipes peut nourrir votre pitch.",
    minutes: 5,
    consignes: [
      { t: "Ce que nous avons vu", d: "Les magasins visités, sans nommer les vendeurs. L'organisation du rayon, la place des nouveautés, les prix." },
      { t: "Le client mystère", d: "Une bonne pratique et une erreur du vendeur : accueil, découverte, argumentation, objection, conclusion." },
      { t: "Ce qu'on nous a dit", d: "La phrase la plus utile entendue en interview, et qui l'a dite (son rôle, pas son nom)." },
      { t: "Ce que ça change pour nous", d: "Une idée concrète pour le pitch ou la négociation." }
    ],
    questionsTitre: "Pour relancer la classe",
    questions: [
      "Le vendeur a-t-il posé des questions avant de proposer un produit ?",
      "Qu'a-t-il fait quand vous avez dit « c'est un peu cher » ?",
      "Qu'est-ce qui distingue un magasin spécialisé d'une grande surface de sport ?",
      "Qu'est-ce qui ferait entrer une nouvelle marque dans le rayon que vous avez vu ?"
    ],
    awardLabel: "Meilleure observation"
  },

  /* ---------- Tri : des observations aux besoins ---------- */
  triBesoins: {
    intro: "Ces observations sont des exemples types, pas des relevés réels. Pour chacune, la classe vote : à quel besoin de l'enseigne la rattacher ? Ensuite, chaque équipe fait le même exercice avec ses propres observations.",
    categories: [{ k: "d", label: "Se différencier" }, { k: "m", label: "Marge" }, { k: "r", label: "Risque" }, { k: "v", label: "Vendeurs" }],
    items: [
      { t: "Les trois mêmes grandes marques occupent presque tout le mur de chaussures.", cat: "d", why: "Un rayon qui ressemble à celui d'une grande surface : l'enseigne a besoin de marques que les autres n'ont pas." },
      { t: "Un client compare le prix en magasin avec son téléphone.", cat: "m", why: "La pression du web tire les prix vers le bas : l'acheteur surveillera votre coefficient de près." },
      { t: "Le responsable garde en réserve des invendus de la saison passée.", cat: "r", why: "Le stock dormant coûte : l'acheteur veut limiter le risque (petites quantités, reprise, réassort)." },
      { t: "Le vendeur conseille surtout les modèles qu'il porte lui-même.", cat: "v", why: "Un vendeur vend ce qu'il connaît : former et équiper les vendeurs fait partie de l'offre." },
      { t: "Un client demande une marque « que tout le monde n'a pas ».", cat: "d", why: "La demande de différence vient aussi des clients : argument direct pour votre marque." },
      { t: "Les fins de série sont soldées dès l'arrivée des nouveaux modèles.", cat: "r", why: "Chaque fin de série vendue en solde, c'est un risque qui s'est réalisé : rassurez sur l'écoulement." },
      { t: "Les vendeurs n'ont qu'un court briefing par semaine.", cat: "v", why: "Peu de temps pour apprendre une marque : proposez une formation courte et des supports simples." },
      { t: "Le responsable parle de « rentabilité au mètre linéaire ».", cat: "m", why: "Il raisonne en euros rapportés par mètre de rayon : votre marque doit rapporter au moins autant que celle qu'elle remplace." }
    ]
  },

  /* ---------- Tri : types de questions ---------- */
  triQuestions: {
    intro: "Pour chaque question, la classe vote : ouverte (elle fait parler), fermée (elle valide) ou orientée (elle suggère la réponse, à éviter).",
    categories: [{ k: "o", label: "Ouverte" }, { k: "f", label: "Fermée" }, { k: "r", label: "Orientée" }],
    items: [
      { t: "« Comment choisissez-vous les marques de votre rayon ? »", cat: "o", why: "Elle appelle une réponse développée : l'acheteur explique sa logique." },
      { t: "« Vous travaillez déjà avec des marques françaises ? »", cat: "f", why: "Réponse par oui ou non : utile pour valider un point précis." },
      { t: "« Vous ne trouvez pas que vos marques actuelles manquent d'originalité ? »", cat: "r", why: "Elle met la réponse dans la bouche de l'acheteur, qui se sent manipulé." },
      { t: "« Qu'est-ce qui fait qu'une référence se vend bien chez vous ? »", cat: "o", why: "Elle révèle ses critères de réussite, donc vos futurs arguments." },
      { t: "« Votre rayon trail est-il complet en ce moment ? »", cat: "f", why: "Fermée : un oui ou un non, mais l'information est précieuse." },
      { t: "« Vous êtes d'accord que la marge, c'est ce qui compte le plus ? »", cat: "r", why: "Orientée : et si son vrai sujet était le risque ? Vous ne le saurez pas." },
      { t: "« Si je comprends bien, vous cherchez surtout à limiter le risque sur le stock ? »", cat: "f", why: "Fermée de reformulation : elle valide ce qu'on a compris, en fin de découverte." },
      { t: "« Qu'est-ce qui vous ferait sortir une marque du rayon ? »", cat: "o", why: "Elle révèle ses craintes : ce sont les objections que vous entendrez plus tard." },
      { t: "« Une petite commande test, ce serait mieux pour vous, non ? »", cat: "r", why: "Orientée, et elle négocie contre vous avant même que l'acheteur ait parlé." }
    ]
  },

  /* ---------- Plan de découverte ---------- */
  decouverte: {
    intro: "Au concours, le pitch ouvre la soutenance ; la découverte lance la négociation. Préparez vos questions, puis attribuez-les : celui qui pose la question écoute la réponse et la reformule.",
    minutes: 20,
    blocs: [
      { k: "ouverture", nom: "La question d'ouverture", aide: "Faire parler l'acheteur de son magasin", ex: "« Avant de parler conditions, j'aimerais comprendre votre rayon : comment le voyez-vous évoluer ? »" },
      { k: "besoins", nom: "3 questions sur ses besoins", aide: "Ses clients, son rayon, ses vendeurs", rows: 4, ex: "« Qu'est-ce que vos clients vous demandent que vous n'avez pas ? »\n« Qu'est-ce qui fait qu'une marque marche chez vous ? »\n« Comment se passe l'arrivée d'une nouvelle marque pour vos vendeurs ? »" },
      { k: "profil", nom: "La question qui révèle le profil", aide: "Pour deviner son profil SONCAS", ex: "« Qu'est-ce qui compte le plus pour vous quand vous référencez une marque ? »" },
      { k: "reformulation", nom: "La reformulation", aide: "Une question fermée pour valider", ex: "« Si je résume : vous voulez une marque que les grandes surfaces n'ont pas, sans risque sur le stock. C'est bien ça ? »" },
      { k: "transition", nom: "La transition", aide: "Vers votre proposition", ex: "« Merci, c'est très clair. Regardons ensemble ce que nous pouvons vous proposer. »" }
    ],
    note: "Le texte reste dans ce navigateur. Téléchargez-le pour le partager dans l'équipe."
  },

  /* ---------- Compte-rendu d'analyse terrain ---------- */
  compteRendu: {
    intro: "Un livrable collectif, remis au jury le jour du concours et noté sur 2 points. Répartissez-vous la rédaction dès ce soir.",
    items: [
      { sigle: "1", titre: "Le format", sous: "Court, factuel, remis imprimé",
        points: ["2 à 4 pages, une seule version par équipe.", "Remis au jury le {concours}, en même temps que vous vous présentez.", "Aucun nom de vendeur ni de client : des rôles (« le responsable du magasin »)."] },
      { sigle: "2", titre: "Le plan", sous: "Quatre parties",
        points: [["Les magasins observés :", "type d'enseigne, date de visite, organisation du rayon."], ["La grille client mystère :", "accueil, découverte, argumentation, objection, conclusion, avec un exemple pour chaque étape."], ["Les interviews :", "qui (son rôle), les phrases clés, ce qu'elles nous apprennent."], ["Nos conclusions pour Kilomètre Nord :", "les besoins repérés et 3 idées concrètes pour le pitch et la négociation."]] },
      { sigle: "+", titre: "Ce qui fait la différence", sous: "Ce que le jury regarde",
        points: ["Des faits observés plutôt que des impressions.", "Une analyse : pourquoi le vendeur a réussi ou échoué.", "Un lien visible entre le terrain et votre pitch."] },
      { sigle: "IA", titre: "Et l'IA ?", sous: "Pour la forme, pas pour le fond",
        points: ["Elle peut aider à corriger ou à mettre en forme.", "Elle n'invente aucune observation : le jury pose des questions sur vos visites.", "Une ligne en fin de document indique si et comment vous l'avez utilisée."] }
    ],
    note: "Une équipe qui n'a pas pu faire toutes ses visites le dit et explique ce qu'elle a fait à la place : l'honnêteté vaut mieux qu'une visite inventée."
  },

  /* ---------- Pitch AIDA (défini dans commun.js : la version 2 de la séance 3 repart de celle-ci) ---------- */
  pitchAida: Object.assign({}, KN.pitchAida, {
    minutes: 40,
    note: "Version 1 : elle sera reprise et améliorée en séance 3, sur ce même navigateur. Téléchargez-la pour la garder."
  }),

  /* ---------- Battle finale ---------- */
  battle: [
    { q: "« Comment choisissez-vous vos marques ? » est une question…", options: ["Fermée", "Ouverte", "Orientée", "Alternative"], bonne: 1 },
    { q: "« Vous ne trouvez pas que… ? » est une question…", options: ["Ouverte", "Fermée de reformulation", "Orientée, à éviter", "Idéale pour conclure"], bonne: 2 },
    { q: "La reformulation sert à…", options: ["Gagner du temps", "Vérifier qu'on a compris, et le montrer", "Répéter son pitch", "Annoncer le prix"], bonne: 1 },
    { q: "Au concours, la découverte se place…", options: ["Avant le pitch", "Au début de la négociation, après le pitch", "À la fin", "Elle est interdite"], bonne: 1 },
    { q: "Un rayon saturé de grandes marques révèle surtout un besoin…", options: ["De marge", "De se différencier", "De formation", "De stock"], bonne: 1 },
    { q: "Le compte-rendu terrain compte pour…", options: ["2 points sur 20", "10 points sur 20", "Rien", "La moitié de la note"], bonne: 0 },
    { q: "Dans AIDA, l'Intérêt c'est…", options: ["Le prix", "Le problème du client, appuyé sur un fait", "Le nom de la marque", "La remise"], bonne: 1 },
    { q: "Un pitch de 2 minutes à l'oral, c'est environ…", options: ["80 mots", "260 mots", "600 mots", "1 000 mots"], bonne: 1 }
  ],

  aRetenir: [
    "Le terrain fournit des faits ; les faits révèlent des besoins.",
    "Quatre besoins chez l'enseigne : se différencier, garder sa marge, limiter le risque, simplifier la vie des vendeurs.",
    "Questions ouvertes pour faire parler, fermées pour valider, jamais orientées.",
    "On reformule avant d'argumenter.",
    "Un pitch de 2 minutes tient en 250 mots environ : chaque mot compte."
  ],

  methodes: KN.methodes,
  client: Object.assign({}, KN.client, {
    arrivee: "Séance 2 : le terrain parle",
    teaser: "Vous avez vu des magasins de l'intérieur. Aujourd'hui, on transforme ces observations en besoins, puis en premières lignes de pitch. Concours : {concours}.",
    seance2Kicker: "Séance 3, {seance3}",
    seance2Titre: "Convaincre en deux minutes",
    seance2: "Argumentaire CAB pour chaque référence, adaptation au profil de l'acheteur, pitch version 2, répartition des rôles et plan de négociation. Apportez votre version 1 du pitch."
  }),
  pitch: KN.pitch,
  jury: KN.jury,
  glossaire: KN.glossaire.concat([
    ["Question fermée", "Question qui appelle un oui, un non ou une réponse courte : elle valide."],
    ["Question orientée", "Question qui suggère la réponse attendue : à éviter en découverte."],
    ["Compte-rendu d'analyse terrain", "Livrable qui restitue les observations, la grille client mystère et les enseignements des interviews."],
    ["Mètre linéaire", "Longueur de rayon occupée par une marque ; l'enseigne raisonne en chiffre d'affaires ou en marge par mètre."]
  ]),
  ressources: KN.ressources,
  actus: []
};
