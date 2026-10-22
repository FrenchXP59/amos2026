/* =========================================================================
   CONTENU — M2 « IA et productivité », séance 2 : modéliser, cadrer, convaincre.
   Le dossier Nordval, le barème et le simulateur de comité viennent de la séance 1
   (../ia-productivite/content.js, chargé avant ce fichier).
   Ouvrir avec ?classe=m2a ou ?classe=m2b. Cellules et journal repris de la séance 1.
   ========================================================================= */

(function () {
  const S1 = window.CONTENT;

  window.CONTENT = {

    config: {
      id: "amos-ia-productivite-s2",
      idEquipes: "amos-ia-productivite-s1",
      idJournal: "amos-ia-productivite-s1",
      ecole: "AMOS",
      logo: "../moteur/assets/logo-amos.png",
      cours: "IA et productivité",
      classe: "M2 Mastère Management du Sport, Marketing & Communication",
      seance: "Séance 2 sur 2",
      intervenant: "Frédéric Legrand",
      dateSeance: "Séance de 13h30 à 17h00",
      classes: {
        m2a: { date: "Mercredi 25 novembre 2026, 13h30 – 17h00", debut: "13:30" },
        m2b: { date: "Jeudi 26 novembre 2026, 13h30 – 17h00", debut: "13:30" }
      },
      agences: S1.config.agences,
      equipes: "cellules",
      tirage: false,
      tirageNote: "Les cellules de la séance 1, avec leurs points. Pour corriger un nom : clic sur les scores."
    },

    videos: { s1: { titre: "Manager une équipe augmentée", duree: "4 à 5 min", url: "" } },

    parcours: [
      { id: "accueil", heure: "13:30", duree: 10, titre: "Retour au club", sous: "Cellules et programme" },
      { id: "video", heure: "13:40", duree: 15, titre: "Manager une équipe augmentée", sous: "Vidéo et débat",
        lede: "Quatre minutes sur la modélisation avec l'IA et le cadrage d'une équipe, puis un débat de manager." },
      { id: "modele", type: "chaine", data: "modele", heure: "13:55", duree: 30, titre: "Modéliser un scénario", sous: "Hypothèses, modèle, sensibilité",
        lede: "Le comité ne votera pas pour une idée, mais pour un scénario chiffré. L'IA chiffre vite ; vous signez le modèle." },
      { id: "audit", type: "audit", data: "audit", heure: "14:25", duree: 20, titre: "Audit d'un modèle", sous: "Sept erreurs dans un business plan",
        lede: "Un scénario chiffré par une IA, présenté avec assurance. Sept erreurs à trouver avant le comité." },
      { id: "pause", heure: "14:45", duree: 15, titre: "Pause", sous: "Mi-temps" },
      { id: "usages", type: "tri", data: "usages", heure: "15:00", duree: 15, titre: "Autorisé, encadré, interdit", sous: "Les usages de l'équipe marketing",
        lede: "Neuf usages réels d'une équipe marketing de club. Pour chacun, la règle à fixer." },
      { id: "charte", type: "construire", data: "charte", heure: "15:15", duree: 30, titre: "La charte IA de l'équipe", sous: "Sept règles pour cinq personnes",
        lede: "La commande du comité : une équipe qui utilise l'IA sans risque. Votre charte tient sur une page." },
      { id: "cas", heure: "15:45", duree: 25, titre: "Préparer le comité", sous: "Recommandation, modèle, charte",
        lede: "Dernier tour de dossier avant le comité : trois minutes pour convaincre, puis les questions." },
      { id: "comite", type: "tour", data: "comite", heure: "16:10", duree: 35, titre: "Le comité de direction", sous: "3 minutes, puis les questions",
        lede: "Chaque cellule passe devant le comité. Le simulateur gère le chrono et la question piège." },
      { id: "final", heure: "16:45", duree: 15, titre: "Battle finale", sous: "À retenir et fin du module",
        lede: "Huit questions sur la séance. La cellule qui lève la main la première et répond juste prend le point." }
    ],

    /* ---------- Vidéo + débat (aligné sur la note de cadrage NotebookLM du 25 novembre) ---------- */
    videoDebat: {
      question: "Un salarié colle le fichier des abonnés dans une IA grand public pour gagner du temps. Faute du salarié, ou faute du manager ?",
      relances: [
        "Le salarié savait-il que c'était interdit ? Qui le lui avait dit, et où était-ce écrit ?",
        "Si l'équipe n'a aucun outil autorisé, peut-on lui reprocher d'en trouver un elle-même ?",
        "Qu'est-ce qu'une charte change, concrètement, le lundi matin ?"
      ],
      minutes: 8
    },

    /* ---------- Chaîne de modélisation ---------- */
    modele: {
      intro: "Quatre étapes pour chiffrer le scénario que votre cellule a retenu en séance 1. Les prompts sont modifiables, puis copiables dans l'outil de votre choix.",
      etapes: [
        { titre: "Hypothèses", role: "Rendre visibles toutes les hypothèses.",
          prompt: "Tu es contrôleur de gestion d'un club de football professionnel. Voici la fiche du club : [coller la fiche]. Voici notre scénario : [coller le scénario]. Liste toutes les hypothèses nécessaires pour le chiffrer sur deux saisons : prix, volumes, taux de conversion, montée en charge, coûts. Pour chacune : valeur proposée, justification, niveau de confiance (fort, moyen, faible). N'invente aucune source." },
        { titre: "Modèle", role: "Des formules, pas seulement des résultats.",
          prompt: "À partir de ces hypothèses : [coller la sortie précédente]. Construis un tableau par saison : revenus, coûts, résultat. Donne la formule de chaque ligne, pour que je puisse la refaire dans un tableur." },
        { titre: "Sensibilité", role: "Trouver l'hypothèse qui change tout.",
          prompt: "Fais trois versions de ce modèle : pessimiste, centrale, optimiste. Indique l'hypothèse qui fait le plus varier le résultat, et à partir de quelle valeur le scénario n'atteint plus l'objectif de 1,5 M€ de revenus propres en deux saisons." },
        { titre: "Vérification", role: "Faire auditer le modèle avant de le signer.",
          prompt: "Relis ce modèle comme un auditeur : [coller le modèle]. Liste les calculs à refaire, les hypothèses non justifiées, les doubles comptages possibles et les coûts oubliés. Ne corrige rien : liste." }
      ],
      note: "Refaites au moins trois calculs dans un tableur : c'est vous qui présentez le modèle au comité, pas l'IA.",
      principesTitre: "Cinq règles pour un modèle crédible",
      principes: [
        { t: "Les hypothèses d'abord", d: "Un chiffre sans hypothèse visible ne se discute pas : il se croit ou se rejette." },
        { t: "Des formules", d: "Exigez les formules : un résultat seul ne se vérifie pas." },
        { t: "Le tableur fait foi", d: "Une IA peut se tromper en calcul ; un tableur recalcule. Les chiffres présentés sortent du tableur." },
        { t: "Trois versions", d: "Pessimiste, centrale, optimiste : le comité veut savoir ce qui se passe si ça va mal." },
        { t: "La montée en charge", d: "Aucun produit n'atteint son rythme de croisière le premier mois." }
      ],
      defisTitre: "Deux défis chronométrés",
      defisNote: "Outils au choix : ChatGPT, Claude, Gemini, Le Chat, Copilot, et un tableur.",
      defis: [
        { n: 1, titre: "Le chiffre qui change tout", min: 8, consigne: "Trouvez l'hypothèse la plus sensible de votre modèle. Faites-la varier de 20 % dans un sens puis dans l'autre : l'objectif tient-il encore ?" },
        { n: 2, titre: "Le tableur fait foi", min: 8, consigne: "Refaites trois calculs du modèle dans un tableur. Notez chaque écart et sa cause." }
      ]
    },

    /* ---------- Audit d'un modèle (sept erreurs volontaires) ---------- */
    audit: {
      consigne: "Un collaborateur vous transmet ce scénario chiffré, produit avec une IA. En cellule, relevez les erreurs : calculs, doubles comptages, hypothèses irréalistes, coûts oubliés, sources douteuses, conclusions abusives.",
      minutes: 8,
      titreDoc: "Scénario « Nordval+ », chiffré par IA : abonnement digital à 4,99 € par mois",
      texte: [
        ["L'audience digitale du club atteint 110 000 personnes (Instagram, TikTok, X et newsletter). ", { e: 0, t: "Si 10 % s'abonnent, le club compte 11 000 abonnés digitaux" }, ", ", { e: 1, t: "dès le premier mois de lancement" }, "."],
        ["Revenu annuel : 11 000 × 4,99 € × 12 = 658 680 €, soit 1,3 M€ sur deux saisons. ", { e: 2, t: "Les frais de plateforme, de paiement et de production sont négligeables" }, ". ", { e: 3, t: "Un taux de conversion de 10 % est la norme du secteur, selon une étude Statista" }, "."],
        ["En parallèle, l'objectif de +30 % d'abonnés au stade fait passer le club ", { e: 4, t: "de 4 200 à 5 900 abonnés" }, ", ", { e: 5, t: "et la billetterie augmente donc de 30 %, soit +930 000 €" }, "."],
        ["Conclusion : ", { e: 6, t: "avec 2,2 M€ de revenus supplémentaires, le scénario dépasse l'objectif sans aucun risque" }, "."]
      ],
      erreurs: [
        { titre: "Double comptage", explication: "Additionner les abonnés de quatre canaux compte plusieurs fois les mêmes personnes : l'audience unique est inférieure à 110 000, et personne ne sait de combien." },
        { titre: "Pas de montée en charge", explication: "Aucun abonnement n'atteint son niveau de croisière le premier mois. Le modèle doit prévoir une progression." },
        { titre: "Coûts oubliés", explication: "Plateforme vidéo, commissions de paiement et des boutiques d'applications, production de contenus : rien n'est chiffré. Un revenu n'est pas un résultat." },
        { titre: "Source invérifiable", explication: "« Une étude Statista », sans titre, ni date, ni lien : impossible à retrouver. On la traite comme une hypothèse, pas comme une norme." },
        { titre: "Erreur de calcul", explication: "4 200 × 1,3 = 5 460 abonnés, pas 5 900." },
        { titre: "Extrapolation abusive", explication: "La billetterie (3,1 M€) ne se compose pas que d'abonnements : +30 % d'abonnés ne fait pas +30 % de billetterie. 1 260 abonnés de plus à 180 € rapportent environ 227 000 €." },
        { titre: "Conclusion sans risque", explication: "Aucune version pessimiste, aucun coût, une somme de revenus bruts : « sans aucun risque » n'est pas une conclusion, c'est un argument de vente." }
      ],
      lecon: "Un modèle bien présenté n'est pas un modèle juste. Le manager refait les calculs, traque les doubles comptages et exige les coûts et une version pessimiste."
    },

    /* ---------- Tri des usages ---------- */
    usages: {
      intro: "L'équipe marketing du Nordval utilise déjà l'IA, chacun à sa façon. Pour chaque usage, la classe vote : autorisé, autorisé avec validation humaine, ou interdit.",
      categories: [{ k: "ok", label: "Autorisé" }, { k: "val", label: "Avec validation" }, { k: "non", label: "Interdit" }],
      items: [
        { t: "Générer dix accroches pour la campagne d'abonnement.", cat: "ok", why: "Idéation sans donnée sensible : l'humain choisit et adapte de toute façon." },
        { t: "Coller le fichier des abonnés (noms, e-mails) dans une IA grand public pour les segmenter.", cat: "non", why: "Données personnelles dans un outil sans cadre contractuel : risque majeur au regard du RGPD." },
        { t: "Publier un visuel réaliste, généré par IA, de supporters en tribune.", cat: "val", why: "Possible, mais validé et signalé comme généré : un contenu réaliste qui pourrait passer pour vrai relève de l'obligation de transparence de l'AI Act." },
        { t: "Traduire le communiqué d'avant-match en anglais.", cat: "ok", why: "Point fort de l'IA, avec relecture des noms propres." },
        { t: "Faire répondre un chatbot aux messages des supporters.", cat: "val", why: "Le supporter doit savoir qu'il parle à une IA, et un humain reprend la main sur les cas sensibles." },
        { t: "Créer une vidéo où un joueur, recréé par IA, annonce la nouvelle offre.", cat: "non", why: "Image d'une personne réelle sans son accord, contenu trompeur : c'est l'un des interdits de la charte du club." },
        { t: "Résumer les réponses anonymisées d'une enquête supporters.", cat: "ok", why: "Synthèse de texte fourni, sans donnée personnelle : dans la frontière." },
        { t: "Rédiger le projet de contrat d'un sponsor.", cat: "val", why: "Un premier jet peut aider, mais un juriste valide tout engagement contractuel." },
        { t: "Analyser les contrats confidentiels des sponsors dans une IA gratuite.", cat: "non", why: "Informations confidentielles dans un outil non encadré : fuite possible, et violation probable des clauses de confidentialité." }
      ],
      faitsTitre: "Ce que dit le droit",
      faits: [
        { chiffre: "2 août 2026", texte: "entrée en application de l'article 50 de l'AI Act : obligations de transparence pour les chatbots et les contenus générés ou manipulés (marquage des contenus : délai jusqu'au 2 décembre 2026 pour les systèmes déjà sur le marché)." },
        { chiffre: "2 décembre 2027", texte: "report des obligations pour les systèmes à haut risque, après l'omnibus numérique." },
        { chiffre: "RGPD", texte: "les données personnelles des supporters ne quittent pas les outils encadrés par le club." }
      ],
      faitsNote: "La charte ne fait pas que protéger le club : elle dit à l'équipe ce qu'elle a le droit de faire, et c'est souvent ce qui manque.",
      source: { url: "https://www.donneespersonnelles.fr/omnibus-numerique-ia", nom: "Calendrier de l'AI Act après l'omnibus numérique, donneespersonnelles.fr, 12 septembre 2026" }
    },

    /* ---------- Charte d'usage de l'IA ---------- */
    charte: {
      intro: "Une page, des règles précises et applicables par cinq personnes. Une règle qu'on ne peut pas vérifier n'est pas une règle.",
      minutes: 30,
      blocs: [
        { k: "outils", nom: "Outils autorisés", aide: "Lesquels, avec quel compte", ex: "Les versions professionnelles fournies par le club, avec un compte d'équipe. Aucun compte personnel pour les données du club." },
        { k: "donnees", nom: "Données interdites", aide: "Ce qui n'entre jamais dans une IA", ex: "Données personnelles des abonnés et supporters, contrats de sponsoring, informations médicales des joueurs, chiffres financiers non publiés." },
        { k: "verif", nom: "Vérifications obligatoires", aide: "Avant toute publication", ex: "Tout chiffre et toute citation vérifiés à la source ; calculs refaits dans un tableur ; noms propres relus." },
        { k: "transparence", nom: "Transparence", aide: "Quand et comment dire que c'est l'IA", ex: "Mention « créé avec l'aide de l'IA » sur les visuels et vidéos réalistes ; le chatbot se présente comme une IA." },
        { k: "validation", nom: "Qui valide quoi", aide: "La validation humaine", ex: "La responsable marketing valide toute publication externe produite avec l'IA ; un juriste valide tout contrat." },
        { k: "jamais", nom: "Ce qu'on ne délègue jamais", aide: "Les décisions humaines", ex: "Les décisions sur les personnes, la parole du club en situation de crise, l'image des joueurs." },
        { k: "suivi", nom: "Formation et révision", aide: "Faire vivre la charte", ex: "Un référent IA dans l'équipe, une heure de formation par trimestre, une révision de la charte à chaque saison." }
      ],
      note: "Téléchargez la charte : elle fait partie des livrables notés (4 points)."
    },

    /* ---------- Comité de direction ---------- */
    comite: {
      intro: "Tirez l'ordre de passage. Pour chaque cellule : le simulateur (3 minutes, question piège à mi-parcours), puis 4 minutes de questions du comité. La classe joue le comité.",
      ordre: true,
      minutes: 8,
      simulateur: true,
      consignes: [
        { t: "La recommandation", d: "Un scénario, trois arguments, le chiffre clé du modèle et sa version pessimiste." },
        { t: "La charte", d: "Les deux règles les plus importantes pour l'équipe, et pourquoi." },
        { t: "Les questions", d: "Le comité interroge : chiffres, risques, usage de l'IA dans votre propre travail." }
      ],
      questionsTitre: "Les questions du comité",
      questions: [
        "Quelle hypothèse de votre modèle est la plus fragile ?",
        "Que se passe-t-il dans la version pessimiste ?",
        "Qu'avez-vous vérifié vous-mêmes dans ce que l'IA a produit ?",
        "Votre charte interdit quoi, concrètement, dès lundi ?"
      ],
      awardLabel: "Recommandation la plus convaincante"
    },

    /* ---------- Battle finale ---------- */
    battle: [
      { q: "L'article 50 de l'AI Act (transparence) s'applique depuis…", options: ["Le 1er janvier 2025", "Le 2 août 2026", "Le 2 décembre 2027", "Il n'est pas encore voté"], bonne: 1 },
      { q: "Additionner les abonnés Instagram, TikTok, X et newsletter donne…", options: ["L'audience unique exacte", "Un total surestimé, à cause des doublons", "Un total sous-estimé", "Le nombre de clients"], bonne: 1 },
      { q: "4 200 abonnés + 30 % =", options: ["5 460", "5 900", "4 230", "5 200"], bonne: 0 },
      { q: "Dans un modèle produit avec l'IA, on exige…", options: ["Le résultat final seulement", "Les formules et les hypothèses", "Un joli graphique", "Une source Statista"], bonne: 1 },
      { q: "Coller le fichier des abonnés dans une IA grand public, c'est…", options: ["Autorisé", "Autorisé avec validation", "Interdit : données personnelles", "Recommandé pour gagner du temps"], bonne: 2 },
      { q: "Un chatbot qui répond aux supporters doit…", options: ["Se faire passer pour un salarié", "Indiquer qu'il s'agit d'une IA", "Être interdit", "Répondre uniquement en anglais"], bonne: 1 },
      { q: "L'analyse de sensibilité sert à…", options: ["Rendre le modèle plus joli", "Trouver l'hypothèse qui fait le plus varier le résultat", "Supprimer les risques", "Remplacer le tableur"], bonne: 1 },
      { q: "Une règle de charte utile est une règle…", options: ["Générale et inspirante", "Précise et vérifiable", "Longue", "Rédigée par l'IA"], bonne: 1 }
    ],

    aRetenir: [
      "Un scénario se présente chiffré, avec ses hypothèses visibles et une version pessimiste.",
      "L'IA chiffre vite, le tableur fait foi : on refait les calculs avant de signer.",
      "Doubles comptages, montée en charge, coûts oubliés : les trois pièges des modèles produits par IA.",
      "Une charte d'usage dit ce qui est autorisé, encadré, interdit, et qui valide.",
      "Depuis le 2 août 2026, chatbots et contenus générés réalistes doivent être signalés (AI Act, article 50).",
      "Cadrer l'IA d'une équipe est un acte de management, pas une option technique."
    ],

    client: Object.assign({}, S1.client, {
      arrivee: "Séance 2 : le comité de direction tranche",
      teaser: "Trois semaines après le diagnostic, le comité attend une recommandation chiffrée et une charte d'usage de l'IA pour l'équipe marketing. Vous passez devant lui à {heure:comite}.",
      travail: [
        { t: "Recommandation", d: "Un scénario, en une page : la décision, trois arguments, deux risques et leur parade, un calendrier." },
        { t: "Modèle chiffré", d: "Hypothèses, tableau par saison, versions pessimiste et optimiste. Calculs vérifiés dans un tableur." },
        { t: "Charte d'usage de l'IA", d: "Les sept rubriques, sur une page." },
        { t: "Présentation de 3 minutes", d: "Qui dit quoi, et qui répond à quelles questions." }
      ],
      dureeTravail: 25,
      etape: "Livrables remis à l'intervenant en fin de séance : recommandation, modèle, charte, journal de chaîne.",
      seance2Kicker: "Fin du module",
      seance2Titre: "La note",
      seance2: "Note unique sur 20, à partir des livrables et du passage devant le comité. Elle vous sera communiquée après correction."
    }),

    pitch: S1.pitch,

    jury: {
      titre: "Grille d'évaluation",
      lede: "Page réservée à l'intervenant, à ne pas projeter. Les notes restent dans ce navigateur : exportez-les à la fin.",
      criteres: S1.client.bareme.map((b) => ({ c: b.c, p: b.p })),
      note: "Note unique sur 20. Le comité se note pendant le passage ; les autres critères se complètent après lecture des livrables."
    },

    glossaire: S1.glossaire.concat([
      ["Analyse de sensibilité", "Faire varier une hypothèse pour mesurer son effet sur le résultat."],
      ["Montée en charge", "Progression d'un produit jusqu'à son rythme de croisière."],
      ["Double comptage", "Compter plusieurs fois la même chose, par exemple les mêmes personnes sur plusieurs réseaux."],
      ["Shadow AI", "Usage d'outils d'IA non autorisés ou non encadrés par l'organisation."]
    ]),

    ressources: [
      { titre: "Fiche méthode : modéliser un scénario avec l'IA", fichier: "ressources/fiche-modelisation.pdf", type: "PDF", dispo: false },
      { titre: "Modèle de charte d'usage de l'IA", fichier: "ressources/modele-charte-ia.pdf", type: "PDF", dispo: false },
      { titre: "Grille d'évaluation et barème", fichier: "../ia-productivite/ressources/grille-evaluation.pdf", type: "PDF", dispo: false }
    ],

    actus: [
      { date: "12 septembre 2026", titre: "Calendrier de l'AI Act après l'omnibus numérique", src: "https://www.donneespersonnelles.fr/omnibus-numerique-ia", srcNom: "donneespersonnelles.fr" },
      { date: "7 août 2026", titre: "Droits TV de la Ligue 2 : répartition entre les clubs", src: "https://financemercato.fr/droits-tv-ligue-2-repartition-clubs/", srcNom: "Finance Mercato" }
    ]
  };
})();
