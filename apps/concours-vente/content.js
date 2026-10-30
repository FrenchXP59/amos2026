/* =========================================================================
   CONTENU — B1 « Projet : concours de vente », séance 1.
   Le moteur est commun (../moteur/). Ouvrir avec ?classe=b1a.
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-concours-vente-s1",
    idJournal: "amos-concours-vente-journal",
    ambiance: "piste",
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
  methodes: KN.methodes,

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
  client: KN.client,

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
  pitch: KN.pitch,
  jury: KN.jury,

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

  glossaire: KN.glossaire,
  /* Documents proposés au téléchargement directement dans l'étape (clé = id de l'étape). */
  docsEtapes: {"methodes": ["fiches-methode"], "cas": ["sujet-kilometre-nord"], "terrain": ["grille-client-mystere"]},
  ressources: KN.ressources,

  actus: []
};
