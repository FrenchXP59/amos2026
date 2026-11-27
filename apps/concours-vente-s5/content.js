/* =========================================================================
   CONTENU — B1 « Projet : concours de vente », séance 5 : la répétition générale.
   Sujet, barème, simulateur et fiches : ../concours-vente/commun.js (KN).
   Ouvrir avec ?classe=b1a. L'ordre de passage tiré ici est repris au concours (séance 6).
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-concours-vente-s5",
    idEquipes: "amos-concours-vente-s1",
    idJournal: "amos-concours-vente-journal",
    ambiance: "piste",
    ecole: "AMOS",
    logo: "../moteur/assets/logo-amos.png",
    cours: "Concours de vente",
    classe: "B1 Bachelor marketing, commercial & événementiel sport",
    seance: "Séance 5 sur 6",
    intervenant: "Frédéric Legrand",
    dateSeance: "Séance de 9h00 à 12h30",
    classes: {
      b1a: { date: "Vendredi 27 novembre 2026, 9h00 – 12h30", debut: "9:00", variables: { concours: "cet après-midi, à 13h30" } }
    },
    variables: { concours: "le jour du concours" },
    agences: ["Marque 1", "Marque 2", "Marque 3", "Marque 4", "Marque 5"],
    equipes: "équipes",
    tirage: false,
    tirageNote: "Constituées en séance 1, elles restent les mêmes jusqu'au concours. Pour corriger un nom ou un membre : séance 1, ou clic sur les scores."
  },

  videos: { s1: { titre: "", duree: "", url: "" } },

  parcours: [
    { id: "accueil", heure: "9:00", duree: 10, titre: "Jour J", sous: "Les équipes, la journée" },
    { id: "jourj", type: "fiches", data: "jourJ", heure: "9:10", duree: 15, titre: "Le concours, mode d'emploi", sous: "Déroulé, livrables, règles",
      lede: "Tout ce qu'il faut savoir pour cet après-midi. Aucune surprise sur l'organisation : les seules surprises seront le profil de l'acheteur et l'objection." },
    { id: "repetition", type: "tour", data: "repetition", heure: "9:25", duree: 150, titre: "Les passages", sous: "30 minutes par équipe",
      lede: "On tire l'ordre de passage, puis chaque équipe passe : 15 minutes d'épreuve, puis 15 minutes d'échanges et de délibération du jury." },
    { id: "reflexive", type: "fiches", data: "noteReflexive", heure: "11:55", duree: 35, titre: "La note réflexive", sous: "Individuelle, sur papier, sans IA",
      lede: "Seul, à la main, sans IA ni téléphone : 30 minutes. Le sujet est distribué sur papier et ramassé à la fin du temps." }
  ],

  /* ---------- Le concours, mode d'emploi ---------- */
  jourJ: {
    items: [
      { sigle: "1", titre: "Le déroulé", sous: "Cet après-midi, à partir de 13h30",
        points: ["Accueil de toutes les équipes, puis passages dans l'ordre tiré ce matin.", "15 minutes par équipe : pitch de 2 minutes, négociation de 10 minutes, questions du jury et remise des livrables.", "Pendant la délibération du jury : temps libre, restez à proximité.", "Palmarès, puis retours du jury à chaque équipe."] },
      { sigle: "2", titre: "À remettre au jury", sous: "En entrant dans la salle",
        points: ["Le compte-rendu d'analyse terrain, imprimé, un exemplaire par juré.", "La liste des membres de l'équipe et leurs rôles.", "Rien d'autre : la fiche de marge et le plan de négociation restent dans vos mains."] },
      { sigle: "3", titre: "Les règles", sous: "Le format du syllabus",
        points: ["Aucun support : ni diaporama, ni vidéo, ni prototype.", "Les fiches de notes sont tolérées, mais les lire pénalise la note d'aisance à l'oral : regardez l'acheteur.", "Les équipes attendent hors de la salle de passage et n'assistent pas aux autres passages.", "L'acheteur est joué par un membre du jury ; son profil est tiré au sort, différent pour chaque équipe ; l'objection imposée tombe vers la 7e minute."] },
      { sigle: "4", titre: "Ce qui est noté", sous: "Sur 20",
        points: ["Soutenance, commune à l'équipe : 14 points. C'est elle qui fait le palmarès.", "Compte-rendu terrain : 2 points.", "Note réflexive individuelle : 4 points."] },
      { sigle: "5", titre: "Attitude", sous: "Vous êtes une marque face à un acheteur",
        points: ["Tenue professionnelle.", "Devant la salle 10 minutes avant votre passage.", "Téléphones éteints, y compris pendant la note réflexive."] }
    ],
    note: "Les règles sur les fiches de notes et l'attente hors de la salle sont celles de l'intervenant : elles s'appliquent à toutes les équipes."
  },

  /* ---------- Répétition générale ---------- */
  repetition: {
    intro: "Tirez d'abord l'ordre de passage, puis faites passer les équipes dans cet ordre. 30 minutes par équipe : 15 minutes d'épreuve (pitch 2 min, négociation 10 min avec l'objection vers la 7e minute, questions du jury 3 min), puis 15 minutes d'échanges et de délibération. 5 équipes : 2 h 30.",
    ordre: true,
    minutes: 15,
    simulateur: true,
    questionsTitre: "Échanges et délibération, 15 minutes",
    questions: [
      "Retours à l'équipe : une chose à garder, une chose à corriger.",
      "L'acheteur révèle son profil ; l'équipe dit à quels indices elle l'a repéré.",
      "L'équipe sort ; le jury délibère et note sur la grille avant d'appeler l'équipe suivante."
    ],
    award: false
  },

  /* ---------- Check-list ---------- */
  checklist: {
    items: [
      { sigle: "✓", titre: "Avant de partir déjeuner", sous: "Toute l'équipe vérifie",
        points: ["Le pitch tient sous 2 minutes, chronométré à voix haute.", "Chacun connaît son rôle et le relais qui le précède.", "La fiche de marge et le plan de négociation sont imprimés.", "Le compte-rendu terrain est imprimé, un exemplaire par juré.", "Les réponses aux trois objections les plus probables sont prêtes.", "Les notes réflexives sont rendues."] }
    ]
  },

  methodes: KN.methodes,
  noteReflexive: {
    intro: "Individuelle, à la main, sans IA ni téléphone : 30 minutes. Le sujet est distribué sur papier.",
    items: [
      { sigle: "1", titre: "Avant de commencer", sous: "Sur la feuille du sujet",
        points: ["Nom, prénom, équipe et date en haut de la feuille.", "Téléphone éteint et rangé. Calculatrice autorisée."] },
      { sigle: "2", titre: "Pendant l'épreuve", sous: "30 minutes",
        points: ["Répondez sous chaque question, dans les cadres prévus.", "Pour les calculs, montrez chaque étape."] },
      { sigle: "3", titre: "À la fin", sous: "Copie ramassée",
        points: ["La copie est ramassée à la fin du temps, même incomplète."] }
    ],
    chrono: 30
  },
  client: Object.assign({}, KN.client, {
    arrivee: "Séance 5 : la répétition générale",
    teaser: "Dernière matinée avant le concours : ordre de passage, répétition en conditions réelles, derniers réglages. Le concours a lieu {concours}.",
    travail: [
      { t: "Corriger", d: "Ce que la répétition a révélé : durée du pitch, relais, concession sans contrepartie." },
      { t: "Finaliser le compte-rendu terrain", d: "Relire, imprimer un exemplaire par juré." },
      { t: "Préparer les objections", d: "Une réponse prête pour chacune des trois objections les plus probables, avec sa technique." },
      { t: "Répéter", d: "Le pitch à voix haute, chrono en main, et les relais entre les rôles." }
    ],
    dureeTravail: 35,
    etape: "Fin de matinée : pitch chronométré sous 2 minutes, compte-rendu imprimé, plan de négociation prêt.",
    seance2: "Le concours, {concours} : 15 minutes par équipe devant le jury."
  }),
  pitch: KN.pitch,
  jury: KN.jury,
  glossaire: KN.glossaire,
  /* Documents proposés au téléchargement directement dans l'étape (clé = id de l'étape). */
  docsEtapes: {"jourj": ["grille-jury"]},
  ressources: KN.ressources.filter((r) => !/note-reflexive/.test(r.fichier || "")),
  actus: []
};
