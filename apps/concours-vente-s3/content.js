/* =========================================================================
   CONTENU — B1 « Projet : concours de vente », séance 3 : convaincre en deux minutes.
   Sujet, barème, simulateur et fiches : ../concours-vente/commun.js (KN).
   Ouvrir avec ?classe=b1a. Équipes, feuille de route et pitch repris des séances précédentes.
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-concours-vente-s3",
    idEquipes: "amos-concours-vente-s1",
    idJournal: "amos-concours-vente-journal",
    ecole: "AMOS",
    logo: "../moteur/assets/logo-amos.png",
    cours: "Concours de vente",
    classe: "B1 Bachelor marketing, commercial & événementiel sport",
    seance: "Séance 3 sur 6",
    intervenant: "Frédéric Legrand",
    dateSeance: "Séance de 13h30 à 17h00",
    classes: {
      b1a: { date: "Mardi 24 novembre 2026, 13h30 – 17h00", debut: "13:30", variables: { seance4: "mercredi 25 novembre, matin", concours: "vendredi 27 novembre, après-midi" } }
    },
    variables: { seance4: "séance 4", concours: "jour du concours" },
    agences: ["Marque 1", "Marque 2", "Marque 3", "Marque 4", "Marque 5"],
    equipes: "équipes",
    tirage: false,
    tirageNote: "Constituées en séance 1, elles restent les mêmes jusqu'au concours. Pour corriger un nom ou un membre : séance 1, ou clic sur les scores."
  },

  videos: { s1: { titre: "Le pitch qui donne envie", duree: "4 à 5 min", url: "" } },

  parcours: [
    { id: "accueil", heure: "13:30", duree: 10, titre: "Départ", sous: "Les équipes, la séance" },
    { id: "video", heure: "13:40", duree: 20, titre: "Le pitch qui donne envie", sous: "Vidéo et débat",
      lede: "Quatre minutes sur AIDA, CAB et l'art d'adapter son discours, puis un débat qui divise les vendeurs." },
    { id: "argumentaire", type: "construire", data: "argumentaire", heure: "14:00", duree: 30, titre: "L'argumentaire", sous: "Chaque référence en CAB",
      lede: "Trois références, trois arguments complets. Le bénéfice doit parler à l'acheteur, pas seulement au coureur." },
    { id: "profils", type: "tri", data: "triProfils", heure: "14:30", duree: 15, titre: "Un argument, un profil", sous: "Adapter au SONCAS",
      lede: "Le même produit se vend avec des arguments différents selon l'acheteur. À quel profil parle chaque argument ?" },
    { id: "pause", heure: "14:45", duree: 15, titre: "Pause", sous: "Ravitaillement" },
    { id: "pitch-v2", type: "construire", data: "pitchAida", heure: "15:00", duree: 25, titre: "Le pitch, version 2", sous: "Resserrer, adapter, chronométrer",
      lede: "Votre version 1 est là. Resserrez-la : 2 minutes, pas une seconde de plus." },
    { id: "roles", type: "fiches", data: "roles", heure: "15:25", duree: 10, titre: "Qui fait quoi ?", sous: "Les rôles et les relais",
      lede: "Le jury note la cohésion : tout le monde parle, chacun sait quand." },
    { id: "entrainement", type: "tour", data: "entrainement", heure: "15:35", duree: 30, titre: "Pitch en public", sous: "2 minutes, puis 3 minutes de retours",
      lede: "Premier passage devant la classe. Le chrono ne pardonne pas." },
    { id: "leviers", type: "fiches", data: "leviers", heure: "16:05", duree: 10, titre: "Négocier sans perdre", sous: "Leviers, zone d'accord, donnant-donnant",
      lede: "Le pitch donne envie ; la négociation fixe les conditions. Voici les règles du jeu." },
    { id: "plan", type: "construire", data: "planNego", heure: "16:15", duree: 25, titre: "Le plan de négociation", sous: "Ce qu'on cède, ce qu'on demande",
      lede: "On ne négocie pas au feeling : on décide avant ce qu'on peut céder, et contre quoi." },
    { id: "final", heure: "16:40", duree: 20, titre: "Battle finale", sous: "À retenir et suite",
      lede: "Huit questions sur la séance. L'équipe qui lève la main la première et répond juste prend le point." }
  ],

  /* ---------- Vidéo + débat (aligné sur la note de cadrage NotebookLM du 24 novembre) ---------- */
  videoDebat: {
    question: "Faut-il apprendre son pitch par cœur ?",
    relances: [
      "Pour : en 2 minutes, chaque seconde compte, et le trac efface l'improvisation.",
      "Contre : un texte récité s'entend, l'acheteur décroche, et le moindre imprévu fait tout dérailler.",
      "Entre les deux : apprendre l'accroche et la conclusion mot pour mot, le reste en mots-clés ?"
    ],
    minutes: 8
  },

  /* ---------- Argumentaire CAB ---------- */
  argumentaire: {
    intro: "Pour chaque référence : la caractéristique, l'avantage, puis le bénéfice. Ajoutez ce que l'enseigne y gagne et une preuve. Votre marque est fictive, mais vos arguments doivent rester crédibles : pas de chiffre invraisemblable.",
    minutes: 30,
    blocs: [
      { k: "route", nom: "Chaussure route", aide: "C → A → B", rows: 3, ex: "Mousse de 38 mm (C), donc plus d'amorti sur le bitume (A) : les clients qui préparent un semi reviennent moins fatigués, et vous en parlent (B)." },
      { k: "trail", nom: "Chaussure trail", aide: "C → A → B", rows: 3, ex: "Crampons de 5 mm (C), donc une meilleure accroche dans la boue (A) : vos traileurs du Nord courent l'hiver sans glisser (B)." },
      { k: "veste", nom: "Veste de running", aide: "C → A → B", rows: 3, ex: "Bandes réfléchissantes sur 360° (C), donc visible de tous côtés (A) : vos clients qui courent après le travail, de nuit, sont rassurés (B)." },
      { k: "enseigne", nom: "Ce que l'enseigne y gagne", aide: "Différence, marge, risque, vendeurs", rows: 3, ex: "Une marque que les grandes surfaces n'ont pas, un coefficient de 2 respecté, une formation de 30 minutes pour vos vendeurs." },
      { k: "preuve", nom: "Notre preuve", aide: "Ce qui rend l'argument crédible", ex: "Un test réalisé avec un club de course partenaire (fictif), dont nous apportons les retours." }
    ],
    note: "Les exemples sont volontairement simples. Le jury attend vos propres caractéristiques, cohérentes avec votre marque."
  },

  /* ---------- Tri : quel argument pour quel profil ---------- */
  triProfils: {
    intro: "Pour chaque argument, la classe vote : à quel profil SONCAS parle-t-il le plus ? Le jour du concours, choisissez vos arguments selon le profil que vous aurez deviné.",
    categories: [{ k: "s", label: "S" }, { k: "o", label: "O" }, { k: "n", label: "N" }, { k: "c", label: "C" }, { k: "a", label: "A" }],
    items: [
      { t: "« Nous reprenons les invendus à la fin du test. »", cat: "s", why: "Le risque disparaît : argument Sécurité." },
      { t: "« Vous serez la seule enseigne de la région à nous distribuer pendant un an. »", cat: "o", why: "Être le seul, le premier : argument Orgueil." },
      { t: "« Notre veste utilise un textile recyclé que personne ne propose encore dans votre rayon. »", cat: "n", why: "La différence, l'inédit : argument Nouveauté." },
      { t: "« Livraison en un seul colis, étiqueté, prêt à mettre en rayon. »", cat: "c", why: "Zéro effort pour le magasin : argument Confort." },
      { t: "« Avec un coefficient de 2, chaque paire de route vous rapporte 58 € de marge brute. »", cat: "a", why: "La rentabilité chiffrée : argument Argent." },
      { t: "« Trois clubs de la région nous font déjà confiance. »", cat: "s", why: "La preuve par les autres rassure : argument Sécurité." },
      { t: "« Une formation de 30 minutes pour vos vendeurs, faite par nous, sur place. »", cat: "c", why: "On lui retire une charge : argument Confort." },
      { t: "« Un prix de lancement 10 % sous notre tarif sur la première commande. »", cat: "a", why: "Un geste chiffré sur le prix : argument Argent." },
      { t: "« Nos ambassadeurs, les meilleurs coureurs du club, viendront le jour du lancement. »", cat: "o", why: "Le prestige et l'image de l'enseigne : argument Orgueil." }
    ]
  },

  /* ---------- Pitch AIDA, version 2 (même stockage qu'en séance 2) ---------- */
  pitchAida: Object.assign({}, KN.pitchAida, {
    intro: "Votre version 1 apparaît si vous êtes sur le même navigateur qu'en séance 2 (sinon, recollez-la). Coupez tout ce qui parle de vous plutôt que de l'acheteur, puis lisez à voix haute avec le chrono.",
    minutes: 25,
    note: "Version 2 : c'est celle que vous présenterez dans un instant. Téléchargez-la après la séance."
  }),

  /* ---------- Rôles ---------- */
  roles: {
    intro: "Cinq rôles, un par membre. Dans une équipe de six, le sixième est l'analyste du profil.",
    items: [
      { sigle: "1", titre: "Accroche et présentation", sous: "Attention et Intérêt",
        points: ["Ouvre le pitch, présente l'équipe en une phrase.", "Pose le problème de l'enseigne, appuyé sur le terrain."] },
      { sigle: "2", titre: "Découverte des besoins", sous: "Ouvre la négociation",
        points: ["Pose les questions préparées en séance 2.", "Écoute, note les mots de l'acheteur, reformule."] },
      { sigle: "3", titre: "La gamme en CAB", sous: "Le Désir",
        points: ["Présente les 3 références par leurs bénéfices.", "Répond aux questions sur les produits."] },
      { sigle: "4", titre: "Négociation des conditions", sous: "Prix et leviers",
        points: ["Tient la fiche de marge et le plan de négociation.", "Ne cède jamais sans contrepartie, jamais sous le plancher."] },
      { sigle: "5", titre: "Conclusion et engagement", sous: "L'Action",
        points: ["Récapitule ce qui a été convenu.", "Demande la décision : date, magasins, quantités."] },
      { sigle: "6", titre: "Analyste du profil", sous: "Pour les équipes de six",
        points: ["Observe l'acheteur et repère son profil SONCAS.", "Le signale discrètement à l'équipe, puis l'annonce au jury à la fin."] },
      { sigle: "↔", titre: "Les relais", sous: "Ce que le jury remarque",
        points: ["Annoncer qui prend la suite : « Léa va vous présenter la gamme. »", "Regarder l'acheteur, pas ses notes.", "Tout le monde parle au moins une fois, y compris pendant la négociation."] }
    ]
  },

  /* ---------- Entraînement au pitch ---------- */
  entrainement: {
    intro: "Chaque équipe pitche 2 minutes, chrono lancé. Puis 3 minutes de retours de la classe, avec les trois questions ci-dessous. Le simulateur reste disponible pour un passage complet.",
    minutes: 2,
    simulateur: true,
    questionsTitre: "La grille des retours",
    questions: [
      "L'accroche parle-t-elle de l'enseigne, ou de l'équipe ?",
      "A-t-on compris le problème de l'enseigne et un bénéfice concret pour elle ?",
      "La fin propose-t-elle une action précise et datée ?",
      "Le pitch tient-il dans les 2 minutes ? Qui n'a pas parlé ?"
    ],
    awardLabel: "Meilleur pitch"
  },

  /* ---------- Leviers de négociation ---------- */
  leviers: {
    intro: "Ces règles valent pour les 10 minutes de négociation du concours. Gardez la fiche de marge sous les yeux.",
    items: [
      { sigle: "€", titre: "La zone d'accord", sous: "Entre votre plancher et le prix visé par l'enseigne",
        points: ["Chaussure route : plancher de la marque 55 € HT, prix visé par l'enseigne 58,33 € HT au plus. L'accord se joue entre les deux.", "Chaussure trail : entre 63 et 66,67 € HT. Veste : entre 35 et 37,50 € HT.", "Votre prix proposé (65, 74, 42 € HT) est un prix d'ouverture : il laisse de la marge pour négocier."] },
      { sigle: "↻", titre: "Les autres leviers", sous: "Le prix n'est pas le seul sujet",
        points: ["Quantités de la commande test.", "Exclusivité régionale.", "PLV et formation des vendeurs.", "Reprise des invendus.", "Durée du test et indicateurs de réussite."] },
      { sigle: "⇄", titre: "Donnant-donnant", sous: "Jamais de concession gratuite",
        points: ["Chaque concession obtient une contrepartie : « Si je baisse à 60 €, vous prenez les trois références ? »", "Des concessions de plus en plus petites : l'acheteur comprend qu'on approche de la limite.", "On annonce ce que la concession coûte : elle prend de la valeur."] },
      { sigle: "✕", titre: "Ce qu'on ne fait pas", sous: "Les erreurs qui coûtent des points",
        points: ["Descendre sous le prix plancher.", "Céder dès la première objection.", "Parler prix avant d'avoir fait la découverte.", "Inventer une condition impossible à tenir pour conclure."] }
    ],
    note: "Zone d'accord : prix d'achat HT compris entre le plancher de la marque et le prix visé par l'enseigne avec son coefficient de 2 (simplification pédagogique)."
  },

  /* ---------- Plan de négociation ---------- */
  planNego: {
    intro: "Décidez maintenant, à froid, ce que vous pouvez céder. Pendant le concours, le rôle « Négociation des conditions » tient ce plan.",
    minutes: 25,
    blocs: [
      { k: "ouverture", nom: "Nos prix d'ouverture", aide: "Par référence, en € HT", ex: "Route 65 €, trail 74 €, veste 42 € HT." },
      { k: "plancher", nom: "Nos limites", aide: "Ce qu'on ne franchira jamais", ex: "Jamais sous 55 / 63 / 35 € HT. Pas d'exclusivité au-delà d'un an." },
      { k: "concessions", nom: "Ce que nous pouvons céder, dans l'ordre", aide: "Du moins coûteux au plus coûteux", rows: 4, ex: "1. Formation des vendeurs offerte.\n2. PLV fournie.\n3. Prix route ramené à 60 € HT.\n4. Reprise de 20 % des invendus." },
      { k: "contreparties", nom: "Ce que nous demandons en échange", aide: "Une contrepartie par concession", rows: 3, ex: "Les trois références commandées ensemble, une mise en avant en tête de rayon, un point d'étape à 6 semaines." },
      { k: "conclusion", nom: "Notre proposition de conclusion", aide: "Précise et datée", ex: "« Test de 3 mois dans 3 magasins à partir du 1er mars, 60 paires route, 40 trail, 30 vestes. On signe sur cette base ? »" }
    ],
    note: "Les quantités des exemples sont indicatives : à vous de les justifier."
  },

  /* ---------- Battle finale ---------- */
  battle: [
    { q: "« Nous reprenons les invendus » parle surtout au profil…", options: ["Orgueil", "Sécurité", "Nouveauté", "Argent"], bonne: 1 },
    { q: "« Vous serez la seule enseigne de la région » parle au profil…", options: ["Confort", "Argent", "Orgueil", "Sécurité"], bonne: 2 },
    { q: "Chaussure route : plancher 55 € HT, prix visé par l'enseigne 58,33 € HT. L'accord se joue…", options: ["Au-dessus de 65 €", "Entre 55 et 58,33 € HT", "Sous 55 €", "À 70 €"], bonne: 1 },
    { q: "Donnant-donnant signifie…", options: ["On cède tout pour conclure", "Chaque concession obtient une contrepartie", "On ne cède jamais rien", "On partage la différence"], bonne: 1 },
    { q: "Au fil de la négociation, les concessions sont…", options: ["De plus en plus grandes", "De plus en plus petites", "Toujours identiques", "Annoncées toutes d'un coup"], bonne: 1 },
    { q: "Le rôle « Conclusion et engagement » correspond à quelle lettre d'AIDA ?", options: ["A comme Attention", "I", "D", "A comme Action"], bonne: 3 },
    { q: "Un bénéfice, c'est…", options: ["Un fait technique", "Ce que le produit permet en général", "Ce que ça change pour ce client", "Le prix"], bonne: 2 },
    { q: "Face à un acheteur « Argent », on met d'abord en avant…", options: ["L'innovation", "La marge et la rentabilité", "Le prestige", "La simplicité"], bonne: 1 }
  ],

  aRetenir: [
    "Chaque référence se défend en CAB, et le bénéfice doit parler à l'enseigne.",
    "Le même produit se vend avec des arguments différents selon le profil de l'acheteur.",
    "Un pitch de 2 minutes se resserre : on coupe tout ce qui parle de nous.",
    "Tout le monde parle, et chacun sait quand : les relais s'annoncent.",
    "On négocie dans la zone d'accord, en donnant-donnant, avec un plan décidé à froid."
  ],

  methodes: KN.methodes,
  client: Object.assign({}, KN.client, {
    arrivee: "Séance 3 : convaincre en deux minutes",
    teaser: "Le terrain a parlé, la découverte est prête. Aujourd'hui : l'argumentaire, le pitch version 2, les rôles et le plan de négociation. Concours : {concours}.",
    seance2Kicker: "Séance 4, {seance4}",
    seance2Titre: "L'acheteur contre-attaque",
    seance2: "Les techniques de traitement des objections, le duel des objections, une simulation complète par équipe avec profil caché, puis l'auto-évaluation."
  }),
  pitch: KN.pitch,
  jury: KN.jury,
  glossaire: KN.glossaire.concat([
    ["Prix d'ouverture", "Premier prix annoncé en négociation, qui laisse une marge de manœuvre."],
    ["Zone d'accord", "Écart entre la limite du vendeur (son plancher) et celle de l'acheteur : l'accord n'est possible que là."],
    ["Donnant-donnant", "Règle de négociation : toute concession obtient une contrepartie."],
    ["Contrepartie", "Ce que l'on obtient en échange d'une concession."],
    ["Marge brute", "Prix de vente HT moins prix d'achat HT."]
  ]),
  ressources: KN.ressources,
  actus: []
};
