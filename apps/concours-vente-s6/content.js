/* =========================================================================
   CONTENU — B1 « Projet : concours de vente », séance 6 : le concours.
   Sujet, barème, simulateur, grille du jury : ../concours-vente/commun.js (KN).
   Ouvrir avec ?classe=b1a. Ordre de passage tiré en séance 5. Page Jury : menu de gauche.
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-concours-vente-s6",
    idEquipes: "amos-concours-vente-s1",
    idJournal: "amos-concours-vente-journal",
    ambiance: "piste",
    ecole: "AMOS",
    logo: "../moteur/assets/logo-amos.png",
    cours: "Concours de vente",
    classe: "B1 Bachelor marketing, commercial & événementiel sport",
    seance: "Séance 6 sur 6, le concours",
    intervenant: "Frédéric Legrand",
    dateSeance: "Concours de 13h30 à 17h00",
    classes: {
      b1a: { date: "Vendredi 27 novembre 2026, 13h30 – 17h00", debut: "13:30" }
    },
    agences: ["Marque 1", "Marque 2", "Marque 3", "Marque 4", "Marque 5"],
    equipes: "équipes",
    tirage: false,
    tirageNote: "Constituées en séance 1, elles restent les mêmes jusqu'au concours. Pour corriger un nom ou un membre : séance 1, ou clic sur les scores."
  },

  videos: { s1: { titre: "", duree: "", url: "" } },

  parcours: [
    { id: "accueil", heure: "13:30", duree: 15, titre: "Le concours", sous: "Accueil des équipes" },
    { id: "passages", type: "tour", data: "passages", heure: "13:45", duree: 100, titre: "Les passages", sous: "15 minutes par équipe",
      lede: "Dans l'ordre tiré ce matin. Le simulateur gère le chrono, le profil caché et l'objection." },
    { id: "pause", heure: "15:25", duree: 25, titre: "La délibération", sous: "Le jury se retire" },
    { id: "palmares", type: "palmares", data: "palmares", heure: "15:50", duree: 20, titre: "Le palmarès", sous: "De la cinquième à la première place",
      lede: "Le classement de la soutenance, révélé place par place." },
    { id: "retours", type: "tour", data: "retours", heure: "16:10", duree: 30, titre: "Les retours du jury", sous: "6 minutes par équipe",
      lede: "Une force, un axe de progrès, un conseil pour la suite. Pour chaque équipe." },
    { id: "bilan", type: "fiches", data: "bilan", heure: "16:40", duree: 20, titre: "Et maintenant ?", sous: "Ce que vous emportez",
      lede: "Six séances, une marque, un acheteur. Voici ce que vous savez faire, et comment le dire." }
  ],

  /* ---------- Les passages ---------- */
  passages: {
    intro: "Le jury note sur la page Jury (menu de gauche), de préférence sur un autre appareil que celui qui projette. Le simulateur s'ouvre depuis chaque équipe.",
    minutes: 15,
    simulateur: true,
    consignes: [
      { t: "Avant", d: "L'équipe entre, remet ses livrables. Le juré qui joue l'acheteur tire la carte du profil (sans remise : un profil différent par équipe) et la lit en silence." },
      { t: "Pitch, 2 minutes", d: "Sans support. Le jury ne pose pas de question pendant le pitch." },
      { t: "Négociation, 10 minutes", d: "L'acheteur joue son profil. L'objection imposée tombe vers la 7e minute." },
      { t: "Questions du jury, 3 minutes", d: "Le jury interroge, l'analyste annonce le profil deviné, l'acheteur révèle sa carte." }
    ],
    award: false
  },

  /* ---------- Palmarès ---------- */
  palmares: {
    intro: "Classement sur la soutenance, 14 points communs à l'équipe. Le compte-rendu terrain et la note réflexive comptent dans la note sur 20, pas dans le palmarès.",
    motKicker: "Le mot du jury",
    mot: "Toutes les équipes ont vendu une marque qui n'existait pas il y a un mois, à un acheteur qui ne voulait rien changer. C'est exactement le métier."
  },

  /* ---------- Retours du jury ---------- */
  retours: {
    intro: "6 minutes par équipe, dans l'ordre de passage. Le jury s'appuie sur ses observations (page Jury). L'acheteur révèle ce qui l'a convaincu, ou non.",
    minutes: 6,
    questionsTitre: "La trame des retours",
    questions: [
      "Une force, à garder pour la suite.",
      "Un axe de progrès, concret.",
      "Le moment de la négociation où tout s'est joué."
    ],
    award: false
  },

  /* ---------- Bilan ---------- */
  bilan: {
    items: [
      { sigle: "✓", titre: "Ce que vous savez faire", sous: "Les objectifs du module",
        points: ["Identifier les besoins d'un client à partir du terrain.", "Construire un argumentaire avec AIDA, SONCAS et CAB.", "Présenter et défendre un pitch devant un jury.", "Négocier dans une zone d'accord, en donnant-donnant.", "Traiter une objection avec méthode.", "Mener une visite en client mystère et en rédiger le compte-rendu."] },
      { sigle: "in", titre: "Le dire sur LinkedIn ou le CV", sous: "Une compétence, une preuve, un contexte",
        points: ["Rubrique Projets : « Concours de vente AMOS, novembre 2026 : création d'une marque de running fictive et négociation de son référencement face à un jury. »", "Compétences : négociation commerciale, prospection terrain, prise de parole en public, travail en équipe."] },
      { sigle: "→", titre: "La suite", sous: "Là où ça servira",
        points: ["Un job étudiant en magasin de sport : vous connaissez maintenant l'envers du décor.", "Un stage commercial, un salon, une recherche de partenaires pour un club.", "Chaque entretien d'embauche est un pitch suivi d'une négociation."] }
    ]
  },

  methodes: KN.methodes,
  client: Object.assign({}, KN.client, {
    arrivee: "Séance 6 : le concours",
    teaser: "Six séances de préparation, cinq marques, un acheteur au profil caché. Que la meilleure équipe gagne."
  }),
  pitch: KN.pitch,
  jury: KN.jury,
  glossaire: KN.glossaire,
  ressources: KN.ressources,
  actus: []
};
