/* =========================================================================
   CONTENU — B1 « Projet : concours de vente », séance 4 : l'acheteur contre-attaque.
   Sujet, barème, simulateur et fiches : ../concours-vente/commun.js (KN).
   Ouvrir avec ?classe=b1a. Équipes et feuille de route reprises des séances précédentes.
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-concours-vente-s4",
    idEquipes: "amos-concours-vente-s1",
    idJournal: "amos-concours-vente-journal",
    ambiance: "piste",
    ecole: "AMOS",
    logo: "../moteur/assets/logo-amos.png",
    cours: "Concours de vente",
    classe: "B1 Bachelor marketing, commercial & événementiel sport",
    seance: "Séance 4 sur 6",
    intervenant: "Frédéric Legrand",
    dateSeance: "Séance de 9h00 à 12h30",
    classes: {
      b1a: { date: "Mercredi 25 novembre 2026, 9h00 – 12h30", debut: "9:00", variables: { seance5: "vendredi 27 novembre, matin", concours: "vendredi 27 novembre, après-midi" } }
    },
    variables: { seance5: "séance 5", concours: "jour du concours" },
    agences: ["Marque 1", "Marque 2", "Marque 3", "Marque 4", "Marque 5"],
    equipes: "équipes",
    tirage: false,
    tirageNote: "Constituées en séance 1, elles restent les mêmes jusqu'au concours. Pour corriger un nom ou un membre : séance 1, ou clic sur les scores."
  },

  videos: { s1: { titre: "L'objection, une question déguisée", duree: "3 min 40", url: "https://youtu.be/CS3vC5yewuM" } },

  parcours: [
    { id: "accueil", heure: "9:00", duree: 10, titre: "Départ", sous: "Les équipes, la séance" },
    { id: "video", heure: "9:10", duree: 15, titre: "L'objection, une question déguisée", sous: "Vidéo et quiz flash",
      lede: "Un peu plus de trois minutes pour changer de regard sur les objections, puis quatre questions et une question bonus. L'équipe la plus rapide prend le point." },
    { id: "techniques", type: "fiches", data: "techniques", heure: "9:25", duree: 20, titre: "Sept techniques", sous: "Traiter une objection",
      lede: "Une méthode en cinq temps, sept techniques pour répondre. On ne les apprend pas toutes : on en maîtrise trois." },
    { id: "reconnaitre", type: "tri", data: "triTechniques", heure: "9:45", duree: 15, titre: "Quelle technique ?", sous: "Reconnaître la réponse",
      lede: "Neuf réponses de vendeurs. Laquelle utilise quelle technique ?" },
    { id: "duel", type: "duel", data: "duel", heure: "10:00", duree: 20, titre: "Le duel des objections", sous: "45 secondes pour répondre",
      lede: "Une objection tirée au sort, une équipe désignée, un membre qui répond. La classe juge." },
    { id: "pause", heure: "10:20", duree: 15, titre: "Pause", sous: "Ravitaillement" },
    { id: "simulations", type: "tour", data: "simulations", heure: "10:35", duree: 75, titre: "Simulations complètes", sous: "Le format du concours",
      lede: "Pitch de 2 minutes, négociation de 10 minutes, profil caché, objection imposée. Puis 3 minutes de débrief." },
    { id: "autoeval", type: "construire", data: "autoEval", heure: "11:50", duree: 20, titre: "Notre auto-évaluation", sous: "La grille du jury, appliquée à soi",
      lede: "Où en êtes-vous, critère par critère ? Soyez exigeants : le jury le sera." },
    { id: "final", heure: "12:10", duree: 20, titre: "Battle finale", sous: "À retenir et suite",
      lede: "Huit questions sur la séance. L'équipe qui lève la main la première et répond juste prend le point." }
  ],

  /* ---------- Vidéo + quiz flash (aligné sur la note de cadrage NotebookLM du 25 novembre) ---------- */
  quizFlash: [
    { q: "« Votre marque, personne ne la connaît ! » Cette objection, c'est le plus souvent…", options: ["Une attaque personnelle", "Un refus définitif", "Une question déguisée : une inquiétude, un besoin d'être rassuré", "La fin de la négociation"], bonne: 2,
      explication: "Certaines objections sont de vrais refus, mais la plupart sont une invitation à creuser.",
      complement: "Réflexe à éviter : se braquer ou se justifier tout de suite." },
    { q: "Dans la méthode en cinq marches, que fait-on juste avant de répondre ?", options: ["On reformule", "On questionne pour trouver le vrai problème", "On vérifie", "On baisse le prix"], bonne: 1,
      explication: "Écouter sans interrompre, reformuler, questionner, répondre, puis vérifier que l'inquiétude est dissipée.",
      complement: "La marche la plus souvent oubliée : la dernière. « Est-ce que cela répond à votre inquiétude ? »" },
    { q: "« Exactement, et c'est justement cette exclusivité qui va différencier votre magasin. » C'est la technique…", options: ["Du questionnement", "De la compensation", "Du boomerang", "De la reformulation"], bonne: 2,
      explication: "Le boomerang transforme l'objection en atout.",
      complement: "Compenser, c'est reconnaître un inconvénient réel et le contrebalancer, par exemple avec une première commande test. Sans jamais inventer de fausse garantie. Les sept techniques sont détaillées à {heure:techniques}." },
    { q: "Pourquoi préférer « Oui, et » à « Oui, mais » ?", options: ["C'est plus court", "« Mais » sonne comme une contradiction et braque l'acheteur", "C'est imposé par le jury", "Il n'y a aucune différence"], bonne: 1,
      explication: "« Je comprends votre inquiétude, et voici ce que nous pouvons examiner » garde un ton collaboratif.",
      complement: "Pas une formule magique : l'attitude compte autant que la technique. Entraînement dans le duel de {heure:duel}." },
    { bonus: true, q: "Au concours, vers quelle minute de la négociation tombe l'objection imposée ?", options: ["La 1re", "La 3e", "La 7e", "La 12e"], bonne: 2,
      explication: "Vers la 7e minute. Le piège : réciter une réponse toute faite. On applique les cinq marches avec naturel.",
      complement: "Vous la vivrez en conditions réelles pendant les simulations de {heure:simulations}." }
  ],

  /* ---------- Techniques de traitement ---------- */
  techniques: {
    intro: "Les noms varient d'un manuel à l'autre ; ce qui compte, c'est le geste. Méthode d'abord, puis les sept techniques.",
    items: [
      { sigle: "5", titre: "La méthode en cinq temps", sous: "Le cadre, quelle que soit la technique",
        points: [["Écouter :", "jusqu'au bout, sans couper."], ["Reformuler :", "« Si je comprends bien, ce qui vous inquiète, c'est… »"], ["Questionner :", "trouver la vraie raison derrière l'objection."], ["Répondre :", "avec la technique adaptée, et au profil de l'acheteur."], ["Vérifier :", "« Est-ce que cela répond à votre question ? »"]] },
      { sigle: "?", titre: "Questionner", sous: "Faire préciser l'objection",
        points: ["On renvoie une question ouverte pour faire émerger la vraie raison."], exemple: "« Trois mois, c'est trop court » → « Qu'est-ce qui vous ferait dire, au bout de trois mois, que le test est réussi ? »" },
      { sigle: "OUI", titre: "Oui, et…", sous: "Accepter, puis nuancer",
        points: ["On reconnaît la part de vrai, puis on apporte un autre point de vue. « Oui, et » passe mieux que « oui, mais »."], exemple: "« Oui, vos clients ne nous connaissent pas encore, et c'est votre conseil qui fera la différence. »" },
      { sigle: "⚖", titre: "Compenser", sous: "Un inconvénient, un avantage",
        points: ["On admet la faiblesse, puis on la compense par un avantage plus fort."], exemple: "« C'est vrai, la marge sur la veste est plus serrée. En échange, nous reprenons les invendus : votre risque est nul. »" },
      { sigle: "↩", titre: "Boomerang", sous: "Retourner l'objection en argument",
        points: ["La raison du refus devient la raison d'acheter."], exemple: "« Votre marque est inconnue » → « Justement : vos clients la découvriront chez vous, et nulle part ailleurs. »" },
      { sigle: "★", titre: "Témoignage", sous: "S'appuyer sur un tiers",
        points: ["Un client, un club, un magasin qui a déjà fait le choix. Au concours, vos références sont fictives : elles doivent rester plausibles."], exemple: "« Trois clubs de la région courent déjà avec nos modèles : je peux vous mettre en contact. »" },
      { sigle: "→", titre: "Anticiper", sous: "Répondre avant qu'on demande",
        points: ["On traite l'objection prévisible dans le pitch, avant qu'elle ne soit posée."], exemple: "« Vous allez sans doute vous demander qui reprend les invendus : c'est nous. »" },
      { sigle: "⏸", titre: "Différer", sous: "Y revenir au bon moment",
        points: ["Utile quand le prix arrive trop tôt : on le traitera une fois les besoins compris. À ne pas utiliser pour esquiver."], exemple: "« Le prix, c'est essentiel, j'y viens dans un instant. Avant, je voudrais comprendre comment vous choisissez vos marques. »" }
    ],
    chrono: 20
  },

  /* ---------- Tri : quelle technique ---------- */
  triTechniques: {
    intro: "L'objection est entre parenthèses, la réponse du vendeur entre guillemets. La classe vote pour la technique utilisée.",
    categories: [{ k: "q", label: "Questionner" }, { k: "c", label: "Compenser" }, { k: "b", label: "Boomerang" }, { k: "t", label: "Témoignage" }, { k: "a", label: "Anticiper" }],
    items: [
      { t: "(Votre marque est inconnue.) « C'est pour ça que vos clients la découvriront chez vous, et nulle part ailleurs. »", cat: "b", why: "L'inconnu devient une exclusivité." },
      { t: "(Votre marge est plus faible.) « C'est vrai sur la veste. En contrepartie, nous reprenons les invendus. »", cat: "c", why: "On admet, puis on compense." },
      { t: "(Trois mois, c'est court.) « Qu'est-ce qui vous ferait dire que le test est réussi ? »", cat: "q", why: "On fait préciser la vraie attente." },
      { t: "(Mes vendeurs n'ont pas le temps.) « Un magasin partenaire a formé son équipe en 30 minutes, et ses vendeurs nous recommandent. »", cat: "t", why: "Un tiers qui a déjà franchi le pas." },
      { t: "(Avant toute objection.) « Vous vous demandez sans doute qui reprend les invendus : c'est nous. »", cat: "a", why: "L'objection est traitée avant d'être posée." },
      { t: "(Et si ça ne se vend pas ?) « Qu'entendez-vous par là : combien de paires, en combien de temps ? »", cat: "q", why: "On transforme une crainte vague en critère précis." },
      { t: "(Les grandes surfaces l'auront dans six mois.) « Nous réservons la marque aux spécialistes : c'est ce qui vous distinguera d'elles. »", cat: "b", why: "La menace devient l'argument de différenciation." },
      { t: "(C'est cher pour une marque nouvelle.) « Plus cher qu'une entrée de gamme, oui. Mais avec un coefficient de 2, chaque paire vous rapporte autant que vos marques actuelles. »", cat: "c", why: "On reconnaît le prix, on compense par la marge." },
      { t: "(Je ne connais personne qui la porte.) « Trois clubs de la région courent déjà avec : je vous mets en contact ? »", cat: "t", why: "La preuve par les autres." }
    ]
  },

  /* ---------- Duel des objections ---------- */
  duel: {
    intro: "Chaque tirage désigne une équipe et un de ses membres. 45 secondes pour répondre avec la méthode en cinq temps. Réponse convaincante : 2 points ; correcte : 1 point.",
    secondes: 45,
    objections: [
      "« Je ne connais pas votre marque, et mes clients non plus. »",
      "« Votre marge est inférieure à celle de mes marques actuelles. »",
      "« Si je vous fais entrer, qui je sors du rayon ? »",
      "« Et si ça ne se vend pas ? »",
      "« Mes vendeurs n'ont pas le temps d'apprendre une nouvelle marque. »",
      "« Les grandes surfaces auront votre marque dans six mois, non ? »",
      "« Trois mois de test, c'est trop court pour juger. »",
      "« Votre veste ressemble à toutes les autres. »",
      "« Je n'ai plus de place en rayon. »",
      "« Un concurrent me propose 5 € de moins par paire. »",
      "« Revenez me voir l'an prochain. »",
      "« Je dois en parler à ma direction. »"
    ]
  },

  /* ---------- Simulations complètes ---------- */
  simulations: {
    intro: "Ordre libre aujourd'hui (l'ordre officiel sera tiré en séance 5). Lancez le simulateur pour chaque équipe : il gère le pitch, la négociation et l'objection. L'acheteur : vous, ou un étudiant d'une autre équipe qui tire la carte du profil et la lit en silence.",
    minutes: 15,
    simulateur: true,
    consignes: [
      { t: "Pitch, 2 minutes", d: "Sans support. Le chrono du simulateur affiche la phase en cours." },
      { t: "Négociation, 10 minutes", d: "Découverte, conditions, objection imposée à 7 minutes. Fiche de marge sur la table." },
      { t: "Débrief, 3 minutes", d: "La classe répond aux questions ci-dessous, puis l'acheteur révèle son profil." }
    ],
    questionsTitre: "Les questions du débrief",
    questions: [
      "Quel était le profil de l'acheteur ? À quels mots l'avez-vous deviné ?",
      "Une concession a-t-elle été faite sans contrepartie ?",
      "Quelle technique pour l'objection imposée ? A-t-on vérifié que la réponse convenait ?",
      "La conclusion était-elle précise et datée ? Qui n'a pas parlé ?"
    ],
    awardLabel: "Meilleure négociation"
  },

  /* ---------- Auto-évaluation ---------- */
  autoEval: {
    intro: "Notez votre équipe avec la grille du jury, sur 14. Pour chaque critère : la note, une force, un point à travailler. Ce travail nourrira aussi vos notes réflexives individuelles.",
    minutes: 20,
    blocs: [
      { k: "besoins", nom: "Besoins et découverte, sur 3", aide: "Note, force, à travailler", ex: "2/3. Bonnes questions ouvertes ; on a oublié de reformuler avant de parler prix." },
      { k: "pitch", nom: "Pitch AIDA et aisance, sur 3", aide: "Note, force, à travailler", ex: "2/3. Accroche efficace ; 2 min 25 : il faut couper dans le Désir." },
      { k: "nego", nom: "Négociation, sur 3", aide: "Note, force, à travailler", ex: "1,5/3. Une concession sur le prix sans contrepartie." },
      { k: "objections", nom: "Objections, sur 2", aide: "Note, force, à travailler", ex: "1/2. Bonne écoute ; réponse trop longue, pas de vérification." },
      { k: "ecoute", nom: "Écoute et profil SONCAS, sur 2", aide: "Note, force, à travailler", ex: "1/2. Profil Sécurité deviné trop tard." },
      { k: "cohesion", nom: "Cohésion, sur 1", aide: "Note, force, à travailler", ex: "0,5/1. Deux membres n'ont presque pas parlé." },
      { k: "priorites", nom: "Nos 3 priorités d'ici au concours", aide: "Concrètes et vérifiables", rows: 4, ex: "1. Pitch sous 2 minutes, chronométré trois fois.\n2. Une contrepartie préparée pour chaque concession.\n3. Chacun prend la parole au moins deux fois." }
    ],
    note: "Téléchargez l'auto-évaluation : elle fait partie des éléments que vous pourrez citer dans votre note réflexive."
  },

  /* ---------- Battle finale ---------- */
  battle: [
    { q: "Dans la méthode en cinq temps, que fait-on juste après avoir écouté ?", options: ["On répond", "On reformule", "On baisse le prix", "On conclut"], bonne: 1 },
    { q: "« Votre marque est inconnue » → « Justement, elle sera exclusive chez vous. » Quelle technique ?", options: ["Compenser", "Boomerang", "Différer", "Témoignage"], bonne: 1 },
    { q: "« C'est vrai, la marge est serrée ; en échange, nous reprenons les invendus. » Quelle technique ?", options: ["Compenser", "Questionner", "Anticiper", "Boomerang"], bonne: 0 },
    { q: "Pourquoi préférer « oui, et » à « oui, mais » ?", options: ["C'est plus court", "« Mais » efface ce qui précède et braque l'acheteur", "C'est la règle du concours", "Aucune différence"], bonne: 1 },
    { q: "Traiter l'objection dans le pitch, avant qu'elle soit posée, c'est…", options: ["Différer", "Anticiper", "Questionner", "Compenser"], bonne: 1 },
    { q: "Différer une objection, c'est acceptable…", options: ["Pour esquiver une question gênante", "Quand le prix arrive avant la découverte", "Toujours", "Jamais"], bonne: 1 },
    { q: "La dernière étape du traitement d'une objection ?", options: ["Remercier", "Vérifier que la réponse convient", "Passer à la suivante", "Signer"], bonne: 1 },
    { q: "Au concours, l'objection imposée tombe…", options: ["Au début du pitch", "Vers la 7e minute", "Après la note", "Jamais"], bonne: 1 }
  ],

  aRetenir: [
    "Une objection est une question déguisée : l'acheteur dit ce qui lui manque pour dire oui.",
    "Écouter, reformuler, questionner, répondre, vérifier.",
    "Maîtrisez trois techniques plutôt que sept : questionner, compenser, boomerang.",
    "« Oui, et » ouvre la discussion ; « oui, mais » la ferme.",
    "L'auto-évaluation sert si elle est exigeante : trois priorités, pas dix."
  ],

  methodes: KN.methodes,
  client: Object.assign({}, KN.client, {
    arrivee: "Séance 4 : l'acheteur contre-attaque",
    teaser: "Votre pitch tient en deux minutes, votre plan de négociation est prêt. Reste le plus dur : les objections. Concours : {concours}.",
    seance2Kicker: "Séance 5, {seance5}",
    seance2Titre: "La répétition générale",
    seance2: "Ordre de passage tiré au sort, répétition complète en conditions réelles, préparation de la note réflexive, derniers réglages. L'après-midi : le concours."
  }),
  pitch: KN.pitch,
  jury: KN.jury,
  glossaire: KN.glossaire.concat([
    ["Boomerang", "Technique qui retourne l'objection en argument."],
    ["Compensation", "Technique qui admet un inconvénient et le compense par un avantage."],
    ["Anticipation", "Traiter une objection prévisible avant qu'elle soit formulée."],
    ["Auto-évaluation", "Évaluation de sa propre prestation avec la grille du jury, pour fixer ses priorités."]
  ]),
  /* Documents proposés au téléchargement directement dans l'étape (clé = id de l'étape). */
  docsEtapes: {"techniques": ["fiche-objections"], "autoeval": ["grille-auto-evaluation"]},
  ressources: KN.ressources,
  actus: []
};
