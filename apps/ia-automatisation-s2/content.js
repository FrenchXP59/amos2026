/* =========================================================================
   CONTENU — M1 « IA et automatisation », séance 2.
   Mêmes agences et mêmes scores qu'en séance 1 (config.idEquipes).
   Ouvrir avec ?classe=m1a.
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-ia-automatisation-s2",
    idEquipes: "amos-ia-automatisation-s1",
    ecole: "AMOS",
    logo: "../moteur/assets/logo-amos.png",
    cours: "IA et automatisation",
    classe: "M1 Mastère Management du Sport, Marketing & Communication",
    seance: "Séance 2 sur 2",
    intervenant: "Frédéric Legrand",
    dateSeance: "Séance de 9h00 à 12h30",
    classes: {
      m1a: { date: "Vendredi 6 novembre 2026, 9h00 – 12h30", debut: "9:00" }
    },
    agences: ["Agence 1", "Agence 2", "Agence 3", "Agence 4"],
    equipes: "agences",
    tirageNote: "Les agences de la séance 1 sont conservées : ne refaites le tirage que si la classe a changé."
  },

  videos: {
    s1: { titre: "Veiller et automatiser : déléguer sans perdre le contrôle", duree: "4 à 5 min", url: "" }
  },
  videoDebat: {
    question: "Faut-il automatiser tout ce qui peut l'être ?",
    relances: ["Quelles tâches de votre stage reviennent chaque semaine à l'identique ?", "Qui est responsable quand un flux automatique envoie une erreur à 500 personnes ?", "Qu'est-ce qu'on perd quand plus personne ne lit la veille en entier ?"],
    minutes: 8
  },

  parcours: [
    { id: "accueil", heure: "9:00", duree: 10, titre: "Retour des agences", sous: "La soutenance est aujourd'hui" },
    { id: "video", heure: "9:10", duree: 20, titre: "Vidéo et débat", sous: "Déléguer sans perdre le contrôle",
      lede: "Cinq minutes sur la veille assistée et l'automatisation, puis un débat : faut-il automatiser tout ce qui peut l'être ?" },
    { id: "veille", type: "fiches", data: "veille", heure: "9:30", duree: 25, titre: "La veille augmentée", sous: "Chercher, trier, restituer",
      lede: "L'IA lit plus vite que vous. Elle invente aussi des sources. Une méthode de veille, puis un défi de 10 minutes sur le marché du Lys Padel Open." },
    { id: "automatisable", type: "tri", data: "automatisable", heure: "9:55", duree: 15, titre: "Automatisable ?", sous: "Avec ou sans humain",
      lede: "Tout ce qui se répète peut s'automatiser. Tout ce qui s'automatise ne doit pas l'être. Huit tâches d'agence à classer." },
    { id: "flux", type: "chaine", data: "flux", heure: "10:10", duree: 30, titre: "Construire un flux", sous: "La logique du no-code",
      lede: "Un déclencheur, des actions, un filtre, une validation. Démonstration en direct sur Make ou Zapier, puis chaque agence dessine son propre flux." },
    { id: "pause", heure: "10:40", duree: 15, titre: "Pause", sous: "Changement de côté" },
    { id: "cas", heure: "10:55", duree: 55, titre: "Finaliser la réponse", sous: "Appel d'offres Lys Padel Open",
      lede: "Dernière ligne droite : la réponse intègre maintenant un dispositif de veille et de reporting automatisé. Soutenance à {heure:pitch}." },
    { id: "pitch", type: "pitch", heure: "11:50", duree: 30, titre: "Soutenance", sous: "3 minutes par agence",
      lede: "Trois minutes pour convaincre le client. À mi-parcours, il pose une question difficile, et quelqu'un de l'agence doit répondre." },
    { id: "final", heure: "12:20", duree: 10, titre: "Le client choisit", sous: "Classement et à retenir",
      lede: "Le client désigne son agence. Le classement cumule les deux séances." }
  ],

  /* ---------- La veille augmentée ---------- */
  veille: {
    intro: "Une veille utile répond à une question, à partir de sources choisies, à un rythme fixé, pour quelqu'un qui en fera quelque chose.",
    items: [
      { sigle: "?", titre: "Poser la question de veille", sous: "Sans question, on accumule",
        points: ["Que cherche-t-on à décider ? Exemple : quels contenus fonctionnent pour les tournois de padel amateurs ?", "Pour qui ? Le client, l'équipe, le directeur de compte.", "À quel rythme ? Une fois par semaine suffit souvent."] },
      { sigle: "SRC", titre: "Choisir ses sources", sous: "La qualité avant le volume",
        points: ["Sources officielles : fédérations, organisateurs, communiqués.", "Médias spécialisés et réseaux des acteurs du secteur.", "Alertes et flux (alertes par mots-clés, flux RSS) pour être prévenu automatiquement.", "Une liste fermée de sources vaut mieux qu'une recherche ouverte à chaque fois."] },
      { sigle: "IA", titre: "Laisser l'IA lire et trier", sous: "Recherche approfondie, synthèse, classement",
        points: ["Les modes de recherche approfondie des assistants parcourent des dizaines de pages et rédigent une synthèse.", "L'IA classe, résume et repère les tendances dans ce qu'on lui fournit.", "Exiger pour chaque point : la source, avec son lien, et la date."] },
      { sigle: "!", titre: "Les limites", sous: "Ce que l'IA fait mal en veille",
        points: ["Elle peut inventer une source ou un chiffre : on ouvre chaque lien cité.", "Elle confond l'ancien et le récent : on vérifie les dates.", "Elle reproduit les sources les plus visibles, pas forcément les plus justes.", "Un résumé fait perdre des nuances : on lit en entier ce qui compte."] },
      { sigle: "OUT", titre: "Restituer", sous: "Une veille qui n'est pas lue ne sert à rien",
        points: ["Cinq points maximum, chacun avec sa source et sa date.", "Un « et alors ? » pour chaque point : ce que ça change pour le client.", "Un format fixe, au même moment chaque semaine."],
        exemple: "Défi (10 min) : par agence, une veille express sur les tournois de padel amateurs en France. Cinq points, chacun avec un lien que vous avez ouvert. Un lien qui ne marche pas = un point perdu." }
    ],
    chrono: 10
  },

  /* ---------- Tri : automatisable ? ---------- */
  automatisable: {
    intro: "Pour chaque tâche, la classe choisit : on automatise, on automatise avec une validation humaine, ou on ne l'automatise pas.",
    categories: [{ k: "auto", label: "Automatiser" }, { k: "valid", label: "Avec validation" }, { k: "non", label: "Ne pas automatiser" }],
    items: [
      { t: "Chaque lundi, rassembler les articles des sources de veille dans un document", cat: "auto", why: "Répétitif, sans décision : idéal pour un flux." },
      { t: "Publier les posts déjà validés aux heures prévues", cat: "auto", why: "La décision a été prise avant ; l'outil exécute." },
      { t: "Chaque semaine, copier les statistiques Instagram dans un tableau de suivi", cat: "auto", why: "Collecte mécanique de données : gain de temps net." },
      { t: "Résumer la veille de la semaine avec l'IA et l'envoyer au client", cat: "valid", why: "L'IA peut se tromper ou inventer : un humain relit avant l'envoi au client." },
      { t: "Répondre aux commentaires des spectateurs sur les réseaux", cat: "valid", why: "Des brouillons proposés, oui ; une réponse publiée sans relecture, non." },
      { t: "Envoyer un mail de bienvenue personnalisé aux bénévoles inscrits", cat: "valid", why: "Données personnelles et ton de la relation : on valide le modèle, on contrôle les envois." },
      { t: "Répondre à un spectateur blessé ou mécontent après le tournoi", cat: "non", why: "Situation sensible : une personne, un responsable, une réponse." },
      { t: "Choisir le parti pris créatif de la campagne", cat: "non", why: "C'est le cœur du métier d'agence : l'IA peut proposer, pas décider." }
    ]
  },

  /* ---------- Construire un flux (gabarit « chaîne ») ---------- */
  flux: {
    intro: "Zapier parle de « Zap » : un déclencheur, puis des actions. Make parle de « scénario » : des modules qu'un routeur peut faire bifurquer selon des filtres. La logique est la même.",
    etapes: [
      { titre: "Déclencheur", role: "L'événement qui lance le flux.",
        prompt: "Chaque lundi à 8h00 (déclencheur programmé). Variante : un nouvel article publié dans une source suivie (flux RSS)." },
      { titre: "Collecte", role: "Rassembler la matière.",
        prompt: "Récupérer les articles de la semaine dans les sources de veille du Lys Padel Open (fédération, médias padel, comptes des tournois concurrents)." },
      { titre: "Action IA", role: "Trier et résumer.",
        prompt: "Envoyer les articles à une IA avec ce prompt : « Résume en 5 points les informations utiles pour l'organisateur d'un tournoi de padel amateur. Pour chaque point, donne la source avec son lien et la date. N'ajoute aucune information absente des articles. »" },
      { titre: "Validation et envoi", role: "Un humain relit, puis diffusion.",
        prompt: "Créer un brouillon de mail au chef de projet de l'agence. Il relit, corrige, puis envoie au client. Filtre : si aucun article n'a été trouvé, ne rien envoyer." }
    ],
    note: "Démonstration en direct par l'intervenant sur Make ou Zapier. Les agences dessinent ensuite leur propre flux : déclencheur, actions, filtre, validation humaine.",
    principesTitre: "Les règles d'un flux fiable",
    principes: [
      { t: "Un déclencheur clair", d: "Un événement précis ou un horaire fixe, jamais « quand j'y pense »." },
      { t: "Un filtre", d: "Le flux ne s'exécute que si les conditions sont réunies." },
      { t: "Un humain avant le client", d: "Tout ce qui sort de l'agence passe par une relecture." },
      { t: "Pas de données sensibles", d: "Vérifier où transitent les données personnelles (RGPD)." }
    ],
    defisTitre: "Le défi",
    defisNote: "Sur papier ou dans l'appli : pas besoin de compte Make ou Zapier pour dessiner un flux.",
    defis: [
      { n: 1, titre: "Le reporting du Lys Padel Open", min: 12, consigne: "Dessinez le flux qui produit chaque semaine, pendant les 8 semaines de campagne, un point d'étape pour le client : chiffres des réseaux, publications de la semaine, veille. Déclencheur, actions, filtre, validation humaine. Il ira dans votre réponse à l'appel d'offres." }
    ],
    battle: { titre: "Le meilleur flux", texte: "Chaque agence présente son flux en une minute. Vote de la classe : le plus utile et le plus sûr. 3 points pour le premier, 1 point pour le deuxième." }
  },

  /* ---------- Fil rouge : finaliser la réponse ---------- */
  client: {
    nom: "Lys Padel Open",
    accroche: "Un tournoi qui grandit, une agence à choisir.",
    avertissement: "Tournoi, organisateur et chiffres fictifs, créés pour le cours.",
    arrivee: "La soutenance commence à {heure:pitch}",
    teaser: "Le client a ajouté une exigence : il veut savoir comment l'agence suivra la campagne semaine après semaine. Votre réponse intègre maintenant un dispositif de veille et de reporting.",
    seance2Kicker: "Fin du module",
    seance2Titre: "Le client a choisi",
    onglets: ["L'appel d'offres", "Les cibles", "Identité du tournoi", "La réponse finale", "La participation", "Journal de la séance"],
    fiche: [
      ["Client", "Comité d'organisation du Lys Padel Open (fictif)"],
      ["Événement", "Tournoi de padel amateur et pro, 3 jours, métropole lilloise, juin 2027 (2e édition)"],
      ["Budget", "40 000 € HT (stratégie, contenus, activation sponsors)"],
      ["Nouvelle exigence", "Un suivi hebdomadaire de la campagne : veille et reporting"],
      ["Soutenance", "{heure:pitch}, 3 minutes par agence, questions du client"]
    ],
    objectifsTitre: "Ce que le client attend",
    objectifs: ["5 000 spectateurs en 2027", "Une communauté de joueurs amateurs", "3 nouveaux sponsors locaux", "Un suivi clair, chaque semaine"],
    cibles: [
      { nom: "Joueurs amateurs", d: "Pratiquent en club, cherchent à jouer le tournoi et à progresser." },
      { nom: "Curieux et familles", d: "Ont découvert le padel récemment, viennent pour l'ambiance." },
      { nom: "Sponsors locaux", d: "Veulent une visibilité mesurable auprès d'un public jeune et actif." },
      { nom: "Clubs et ligue", d: "Relais naturels vers les licenciés." }
    ],
    charte: {
      couleurs: [["Bleu Lys", "#1E3A8A"], ["Vert court", "#22A06B"], ["Jaune balle", "#E9F542"], ["Blanc", "#FFFFFF"]],
      ton: "Dynamique, accessible, convivial.",
      valeurs: ["Convivialité", "Découverte", "Proximité"],
      interdits: ["Jargon de joueur confirmé", "Promesses de performance", "Visuels IA présentés comme des photos du tournoi"]
    },
    travail: [
      { t: "Note de compréhension", d: "Reprise de la séance 1, corrigée : les enjeux du client et votre parti pris." },
      { t: "Brief et plan de contenu", d: "Ceux de la séance 1, ajustés grâce à la veille." },
      { t: "Dispositif de veille", d: "Question, sources, rythme, restitution : une demi-page." },
      { t: "Flux de reporting", d: "Le flux dessiné ce matin : déclencheur, actions, filtre, validation humaine." }
    ],
    dureeTravail: 45,
    etape: "La soutenance se fait sans diaporama : trois minutes, un porte-parole par partie, le flux montré sur une page.",
    seance2: "Fin du module. Le journal des deux séances est déposé.",
    bareme: [
      { c: "Implication dans les défis et les battles", p: 5 },
      { c: "Qualité des prompts et des itérations (journal)", p: 5 },
      { c: "Regard critique : audit, vérifications, corrections", p: 5 },
      { c: "Livrables de l'appel d'offres et soutenance", p: 5 }
    ],
    baremeNote: "Évaluation par la participation (syllabus). Grille indicative, ajustable.",
    journal: {
      titre: "Journal de la séance 2",
      champ: "Notre réponse",
      etapes: [
        { label: "Notre question de veille et nos sources" },
        { label: "Les 5 points de notre veille express (avec liens)", changement: true },
        { label: "Notre flux de reporting", changement: true }
      ],
      changementLabel: "Ce que nous avons vérifié ou corrigé",
      critique: "Les erreurs de l'IA repérées pendant la veille (sources, dates, chiffres)"
    }
  },

  /* ---------- Soutenance ---------- */
  pitch: {
    titre: "Soutenance devant le client",
    lede: "Trois minutes pour convaincre le client. À mi-parcours, il pose une question difficile, et quelqu'un de l'agence doit répondre.",
    duree: 180,
    objectionA: 90,
    roles: ["Ouverture et compréhension", "Insight et brief", "Plan de contenu", "Veille et reporting automatisés", "Budget et engagement"],
    objections: [
      "« 40 000 €, qu'est-ce qu'on a de plus qu'avec une agence classique ? »",
      "« Votre reporting automatique, qui le relit avant qu'il m'arrive ? »",
      "« Comment saurons-nous que la campagne a marché ? »",
      "« Votre veille, elle vient d'une IA : qui vérifie les sources ? »",
      "« Nos bénévoles n'ont pas le temps de publier trois fois par semaine. »",
      "« Et si votre outil d'automatisation tombe en panne pendant le tournoi ? »"
    ],
    origine: "Mécanique reprise de ton appli Pitchcoach : chrono, question tirée au hasard à mi-parcours, personne désignée au hasard pour répondre."
  },

  battle: [
    { q: "Chez Zapier, un Zap commence toujours par…", options: ["Une action", "Un déclencheur", "Un filtre", "Un routeur"], bonne: 1 },
    { q: "Chez Make, à quoi sert un routeur ?", options: ["À envoyer des mails", "À faire bifurquer le scénario en plusieurs chemins", "À stocker des fichiers", "À payer l'abonnement"], bonne: 1 },
    { q: "Un filtre dans un flux sert à…", options: ["Décorer", "N'exécuter la suite que si une condition est remplie", "Supprimer les données", "Accélérer l'IA"], bonne: 1 },
    { q: "Résumer la veille avec l'IA et l'envoyer au client : on…", options: ["Automatise complètement", "Automatise avec validation humaine", "Ne le fait jamais", "Le fait à la main"], bonne: 1 },
    { q: "Dans une veille faite par l'IA, un lien cité…", options: ["Est forcément juste", "S'ouvre et se vérifie", "Est inutile", "Remplace la lecture"], bonne: 1 },
    { q: "Répondre à un spectateur blessé après le tournoi : on…", options: ["Automatise", "Automatise avec validation", "N'automatise pas", "Ignore"], bonne: 2 },
    { q: "Une veille utile commence par…", options: ["Beaucoup de sources", "Une question à laquelle elle répond", "Un outil payant", "Un résumé IA"], bonne: 1 },
    { q: "Le dernier maillon d'un flux qui écrit au client, c'est…", options: ["L'IA", "Un humain qui relit", "Le filtre", "Le déclencheur"], bonne: 1 }
  ],

  aRetenir: [
    "Une veille répond à une question, avec des sources choisies, à un rythme fixé.",
    "L'IA lit vite mais invente parfois : on ouvre chaque lien, on vérifie chaque date.",
    "Un flux, c'est un déclencheur, des actions, un filtre, une validation.",
    "On automatise le répétitif, on valide ce qui part chez le client, on garde l'humain pour le sensible.",
    "Make et Zapier ont la même logique : savoir dessiner un flux compte plus que l'outil.",
    "Données personnelles : on sait toujours où elles passent."
  ],

  glossaire: [
    ["Veille", "Surveillance organisée d'un sujet pour éclairer des décisions."],
    ["Recherche approfondie", "Mode des assistants IA qui parcourt de nombreuses pages et rédige une synthèse sourcée."],
    ["Flux RSS", "Format qui permet de suivre automatiquement les nouvelles publications d'un site."],
    ["No-code", "Création d'outils ou d'automatisations sans écrire de code."],
    ["Zap", "Chez Zapier : un flux automatisé qui relie des applications."],
    ["Déclencheur", "Événement qui lance un flux (trigger)."],
    ["Action", "Tâche exécutée par le flux après le déclencheur."],
    ["Scénario", "Chez Make : un flux composé de modules."],
    ["Routeur", "Chez Make : élément qui fait bifurquer un scénario en plusieurs chemins."],
    ["Filtre", "Condition qui autorise ou non la suite d'un flux."],
    ["Human in the loop", "Un humain valide les étapes importantes avant exécution."],
    ["Reporting", "Compte rendu régulier des résultats d'une action."]
  ],

  ressources: [
    { titre: "Fiche méthode : la veille augmentée", fichier: "ressources/fiche-veille.pdf", type: "PDF", dispo: false },
    { titre: "Modèle de flux : déclencheur, actions, filtre, validation", fichier: "ressources/modele-flux.pdf", type: "PDF", dispo: false }
  ],

  actus: [
    { date: "Aide officielle", titre: "Learn key concepts in Zaps", src: "https://help.zapier.com/hc/en-us/articles/8496181725453-Learn-key-concepts-in-Zaps", srcNom: "Zapier" },
    { date: "Aide officielle", titre: "Router", src: "https://help.make.com/router", srcNom: "Make" },
    { date: "Ressource du syllabus", titre: "Make Academy", src: "https://make.com/academy", srcNom: "Make" }
  ]
};
