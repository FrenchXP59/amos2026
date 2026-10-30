/* =========================================================================
   CONTENU — M1 « IA et automatisation », séance 1.
   Le moteur est commun (../moteur/). Ouvrir avec ?classe=m1a.
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-ia-automatisation-s1",
    ambiance: "flux",
    ecole: "AMOS",
    logo: "../moteur/assets/logo-amos.png",
    cours: "IA et automatisation",
    classe: "M1 Mastère Management du Sport, Marketing & Communication",
    seance: "Séance 1 sur 2",
    intervenant: "Frédéric Legrand",
    dateSeance: "Séance de 9h00 à 12h30",
    classes: {
      m1a: { date: "Mardi 3 novembre 2026, 9h00 – 12h30", debut: "9:00", variables: { seance2: "vendredi 6 novembre, matin" } }
    },
    variables: { seance2: "date à venir" },
    agences: ["Agence 1", "Agence 2", "Agence 3", "Agence 4"],
    equipes: "agences",
    tirageNote: "Mêmes agences jusqu'à la soutenance de la séance 2."
  },

  videos: {
    s1: { titre: "Du bricolage au métier : l'usage professionnel de l'IA", duree: "4 min", url: "https://youtu.be/gCxYxXawdcM" }
  },

  parcours: [
    { id: "accueil", heure: "9:00", duree: 10, titre: "Départ", sous: "Agences et appel d'offres" },
    { id: "amateur", type: "tri", data: "amateurPro", heure: "9:10", duree: 15, titre: "Amateur ou pro ?", sous: "Deux façons d'utiliser l'IA",
      lede: "Tout le monde utilise l'IA. La différence entre un amateur et un professionnel tient à quelques réflexes. Les reconnaissez-vous ?" },
    { id: "video", heure: "9:25", duree: 20, titre: "Vidéo et quiz flash", sous: "Du bricolage au métier",
      lede: "Quatre minutes sur ce qui distingue un usage professionnel de l'IA, puis six questions éclair et une question bonus." },
    { id: "prompt", heure: "9:45", duree: 35, titre: "Prompt engineering", sous: "Rôle, contexte, tâche, format, contraintes",
      lede: "La méthode qui transforme une réponse moyenne en livrable. Un constructeur de prompt, une démonstration d'itération, trois défis, puis la battle." },
    { id: "pause", heure: "10:20", duree: 15, titre: "Pause", sous: "Changement de côté" },
    { id: "audit", type: "audit", data: "audit", heure: "10:35", duree: 20, titre: "Vérifier une synthèse", sous: "Six erreurs à trouver",
      lede: "L'IA a synthétisé le questionnaire spectateurs de 2026. Le texte est fluide et convaincant. Il contient six erreurs." },
    { id: "chaine", type: "chaine", data: "chaine", heure: "10:55", duree: 25, titre: "Les 4 livrables", sous: "De la synthèse à la réponse",
      lede: "Synthèse qualitative, brief créatif, plan de contenu, note de compréhension : les quatre livrables courants d'une agence, enchaînés." },
    { id: "cas", heure: "11:20", duree: 55, titre: "Fil rouge Lys Padel Open", sous: "Partie 1 : la réponse prend forme",
      lede: "L'appel d'offres est tombé. Aujourd'hui : synthèse, brief et plan de contenu. Partie 2, {seance2} : veille, automatisation et soutenance." },
    { id: "final", heure: "12:15", duree: 15, titre: "Battle finale", sous: "À retenir et suite",
      lede: "Huit questions sur toute la séance. L'agence qui lève la main la première et répond juste prend le point." }
  ],

  /* ---------- Jeu de tri : amateur ou pro ---------- */
  amateurPro: {
    intro: "Pour chaque pratique, la classe vote : usage amateur ou usage professionnel. Puis on révèle.",
    categories: [{ k: "amateur", label: "Amateur" }, { k: "pro", label: "Pro" }],
    items: [
      { t: "Demander « fais-moi un post Instagram pour le tournoi »", cat: "amateur", why: "Aucun contexte, aucune cible, aucun format : l'IA comble les vides au hasard." },
      { t: "Donner un rôle, la cible, le format et les contraintes, puis itérer", cat: "pro", why: "C'est la méthode : rien d'implicite, et le premier jet n'est jamais le livrable." },
      { t: "Copier-coller la réponse dans la présentation client sans la relire", cat: "amateur", why: "Erreurs, tournures génériques, chiffres inventés : le client le verra." },
      { t: "Exiger que l'IA distingue ce qui vient des documents et ce qu'elle suppose", cat: "pro", why: "Séparer faits et hypothèses, c'est la base de la fiabilité." },
      { t: "Coller le fichier clients du tournoi dans un chatbot gratuit", cat: "amateur", why: "Données personnelles : RGPD. Jamais dans un outil non validé." },
      { t: "Garder une bibliothèque des prompts qui marchent, ou en faire un skill", cat: "pro", why: "On capitalise : la bonne méthode s'écrit une fois et se réutilise." },
      { t: "Croire un chiffre précis parce qu'il est bien présenté", cat: "amateur", why: "La forme rassure, pas le fond. Un chiffre sans source se vérifie." },
      { t: "Tester deux outils sur la même tâche avant de choisir", cat: "pro", why: "Les outils n'excellent pas tous sur les mêmes tâches : on compare sur pièce." }
    ]
  },

  /* ---------- Quiz flash après la vidéo ---------- */
  quizFlash: [
    { q: "Une hallucination d'IA, c'est…", options: ["Un bug qui fait planter l'outil", "Une information fausse donnée avec un aplomb total", "Une image trop colorée", "Un refus de répondre"], bonne: 1,
      explication: "Un rapport ultra convaincant, plein de chiffres précis… sortis de nulle part.",
      complement: "Le modèle produit du plausible, pas forcément du vrai : la fluidité du texte ne dit rien de sa justesse." },
    { q: "La règle d'or face à un chiffre donné par l'IA ?", options: ["Le citer s'il est précis", "Ce n'est jamais une preuve en soi : on le vérifie auprès d'une source fiable", "Demander à l'IA s'il est juste", "L'arrondir"], bonne: 1,
      explication: "C'est cette rigueur qui sépare le bricoleur de l'expert.",
      complement: "Vous l'appliquerez à {heure:audit} : une synthèse à vérifier, avec des erreurs cachées." },
    { q: "Lequel de ces éléments ne fait pas partie des cinq blocs d'un prompt pro ?", options: ["La tâche", "Le format", "La politesse", "Les contraintes"], bonne: 2,
      explication: "Les cinq blocs : rôle, contexte, tâche, format, contraintes.",
      complement: "Ce n'est pas une règle technique ni une formule magique, mais un cadre pour piloter la qualité. Vous le pratiquez à {heure:prompt}." },
    { q: "Un prompt a bien marché après plusieurs allers-retours. Le réflexe pro ?", options: ["Le supprimer", "Le sauvegarder comme gabarit, puis en faire un skill", "Le publier sur les réseaux", "Recommencer de zéro la prochaine fois"], bonne: 1,
      explication: "Itération, gabarit, puis skill : un package d'instructions, d'exemples et de scripts que toute l'équipe réutilise.",
      complement: "Le skill est un actif de l'agence : c'est la capitalisation de son expérience." },
    { q: "Une hallucination passe inaperçue dans la synthèse des retours clients. Conséquence ?", options: ["Aucune, elle sera corrigée plus tard", "Elle contamine le brief créatif puis le plan de contenu, sans qu'on la voie", "L'IA la signale automatiquement", "Elle ne touche que la synthèse"], bonne: 1,
      explication: "Dans une chaîne de livrables, chaque document nourrit le suivant : on vérifie à chaque étape.",
      complement: "Vous construisez cette chaîne à {heure:chaine} : synthèse, brief, plan de contenu, réponse à l'appel d'offres." },
    { q: "Le RGPD et l'IA, c'est…", options: ["Une interdiction générale d'utiliser l'IA", "Des règles strictes : pas de vrai fichier client dans un chatbot public non autorisé", "Rien, tant que l'outil est gratuit", "Une règle qui ne vise que les grandes entreprises"], bonne: 1,
      explication: "On privilégie des données fictives, anonymisées, ou un outil d'IA validé par l'organisation.",
      complement: "Attention : retirer les noms ne suffit pas toujours. Des données seulement pseudonymisées restent des données personnelles (CNIL)." },
    { bonus: true, q: "Quel est le montant du contrat que l'agence veut décrocher au Lys Padel Open ?", options: ["4 000 €", "15 000 €", "40 000 €", "400 000 €"], bonne: 2,
      explication: "40 000 € HT : c'est l'appel d'offres du fil rouge de la séance.",
      complement: "La réponse prend forme à {heure:cas}, en agence." }
  ],

  /* ---------- Prompt engineering (gabarit « prompt ») ---------- */
  blocs: [
    { k: "role", nom: "Rôle", aide: "Qui l'IA doit-elle être ?", ex: "Tu es planneur stratégique dans une agence de marketing sportif." },
    { k: "contexte", nom: "Contexte", aide: "Ce qu'elle doit savoir.", ex: "Le Lys Padel Open est un tournoi de padel de 3 jours dans la métropole lilloise (2e édition en juin 2027). Il lance un appel d'offres pour sa communication, budget 40 000 € HT. Cibles : joueurs amateurs, spectateurs, sponsors locaux." },
    { k: "tache", nom: "Tâche", aide: "Ce qu'elle doit produire.", ex: "Rédige le brief créatif de la campagne de lancement de la billetterie." },
    { k: "format", nom: "Format", aide: "La forme attendue.", ex: "Une page maximum : objectif, cible principale, message clé, preuve, ton, livrables attendus, en titres courts." },
    { k: "contraintes", nom: "Contraintes", aide: "Ton, interdits, critères de réussite.", ex: "Pas de jargon de joueur confirmé, aucun chiffre inventé : signale ce qui manque. Pose-moi d'abord 3 questions si une information est indispensable." }
  ],
  blocsNote: "Rôle, contexte, tâche, format, contraintes : un cadre pédagogique, pas une norme. L'important est de ne rien laisser implicite.",
  iterations: [
    { v: "V1", prompt: "Fais-moi un brief pour un tournoi de padel.", probleme: "Aucun contexte : l'IA invente le lieu, les dates, la cible et le budget." },
    { v: "V2", prompt: "Tu es planneur stratégique. Rédige le brief créatif du lancement de la billetterie du Lys Padel Open (padel, 3 jours, métropole lilloise, juin 2027, budget 40 000 € HT).", probleme: "Mieux cadré, mais le format et les interdits restent libres : résultats inégaux." },
    { v: "V3", prompt: "V2 + « une page, sept rubriques imposées, aucun chiffre inventé, signale ce qui manque, pose-moi 3 questions avant. Puis critique ton brief comme le ferait le client et améliore-le. »", probleme: "Format maîtrisé, zones d'incertitude signalées, auto-critique intégrée : c'est un livrable." }
  ],
  techniques: [
    { t: "Le gabarit", d: "Un prompt qui marche devient un modèle à trous, réutilisable par toute l'équipe." },
    { t: "Les exemples", d: "Montrer un brief réussi de l'agence (few-shot) aligne le ton et la structure." },
    { t: "Les questions d'abord", d: "« Avant de répondre, pose-moi les questions qui te manquent. »" },
    { t: "Le format imposé", d: "Tableau, rubriques fixes, longueur maximale : c'est le format qui rend le livrable exploitable." },
    { t: "L'auto-critique", d: "« Critique ta réponse comme le ferait le client, puis améliore-la. »" }
  ],
  defisNote: "Outils gratuits au choix : ChatGPT, Claude, Gemini, Le Chat, Copilot. Pas d'import de fichier nécessaire.",
  defis: [
    { n: 1, titre: "Le brief en trois tours", min: 7, consigne: "Partez de la V1, puis améliorez en deux itérations. Gardez les trois versions : elles vont dans le journal." },
    { n: 2, titre: "Trois registres", min: 7, consigne: "Même information (ouverture de la billetterie) pour trois destinataires : post Instagram, mail à un sponsor, communiqué de presse." },
    { n: 3, titre: "Le gabarit d'agence", min: 6, consigne: "Transformez votre meilleur prompt en modèle à trous que n'importe quel collègue pourrait réutiliser demain." }
  ],

  /* ---------- Audit d'une synthèse qualitative (six erreurs volontaires) ---------- */
  audit: {
    consigne: "Le questionnaire spectateurs de 2026 était anonyme et a reçu 40 réponses, pour 3 200 spectateurs. Lisez la synthèse produite par l'IA et relevez les erreurs : calculs, contradictions, généralisations, données personnelles, conclusions abusives.",
    minutes: 7,
    titreDoc: "Synthèse générée par IA : questionnaire spectateurs, édition 2026",
    texte: [
      ["Le questionnaire a reçu 40 réponses. ", { e: 0, t: "85 % des répondants, soit 36 personnes, recommandent le tournoi" }, ". ", { e: 1, t: "Les spectateurs sont donc unanimement satisfaits de l'édition 2026" }, "."],
      ["L'accès au site est salué : ", { e: 2, t: "aucune critique n'a été formulée sur l'accès" }, ". Les répondants demandent surtout plus de contenus vidéo : ", { e: 3, t: "tous les spectateurs veulent davantage de TikTok" }, ", trois réponses citant explicitement ce réseau."],
      ["Comme le résume ", { e: 4, t: "Julien, 34 ans, de Villeneuve-d'Ascq : « le meilleur tournoi de padel de France »" }, ". Plusieurs répondants regrettent toutefois le manque de places de parking à proximité."],
      ["Enfin, ", { e: 5, t: "la hausse des abonnés Instagram pendant le tournoi prouve que l'affichage en ville a fonctionné" }, "."]
    ],
    erreurs: [
      { titre: "Erreur de calcul", explication: "85 % de 40 = 34 personnes, pas 36. Refaire les calculs, toujours." },
      { titre: "Représentativité ignorée", explication: "40 réponses sur 3 200 spectateurs, soit 1,25 % : impossible de parler de tous les spectateurs, encore moins d'unanimité (15 % ne recommandent pas)." },
      { titre: "Contradiction interne", explication: "« Aucune critique sur l'accès », puis des plaintes sur le parking deux phrases plus loin." },
      { titre: "Généralisation abusive", explication: "Trois mentions de TikTok deviennent « tous les spectateurs »." },
      { titre: "Citation douteuse et données personnelles", explication: "Le questionnaire était anonyme : un prénom, un âge et une ville ne peuvent pas y figurer. Citation invérifiable, et problème RGPD si elle était réelle." },
      { titre: "Lien de cause non démontré", explication: "Une hausse d'abonnés pendant le tournoi peut avoir mille causes. Corrélation n'est pas causalité." }
    ],
    lecon: "Une synthèse fluide n'est pas une synthèse juste. On vérifie les chiffres, les citations, la représentativité et chaque « donc »."
  },

  /* ---------- Chaîne des 4 livrables ---------- */
  chaine: {
    intro: "Chaque livrable nourrit le suivant. Entre deux étapes, vous relisez et corrigez : c'est votre valeur ajoutée d'agence.",
    etapes: [
      { titre: "Synthèse qualitative", role: "Faire parler les retours, sans les trahir.",
        prompt: "Tu es chargé d'études. Voici les retours du questionnaire spectateurs 2026 du Lys Padel Open : [coller la fiche]. Fais une synthèse en 5 thèmes. Pour chaque thème : le nombre de réponses concernées et une citation exacte tirée du texte. N'invente aucun chiffre ni aucune citation." },
      { titre: "Brief créatif", role: "Transformer les constats en direction créative.",
        prompt: "À partir de cette synthèse : [coller la sortie précédente]. Rédige le brief créatif de la campagne 2027 en une page : objectif, cible principale, insight, message clé, preuve, ton, livrables. Signale toute hypothèse." },
      { titre: "Plan de contenu", role: "Organiser la campagne dans le temps.",
        prompt: "À partir de ce brief : [coller la sortie précédente]. Propose un plan de contenu sur 8 semaines avant le tournoi, sous forme de tableau : semaine, réseau, format, sujet, objectif, indicateur. Trois publications par semaine au maximum." },
      { titre: "Note de compréhension", role: "Ouvrir la réponse à l'appel d'offres.",
        prompt: "En t'appuyant sur ces éléments : [coller les sorties précédentes]. Rédige la note de compréhension de notre réponse à l'appel d'offres : les enjeux du client, notre lecture de la situation, notre parti pris, en 300 mots. Termine par les trois questions à poser au client." }
    ],
    note: "Chaque prompt est modifiable ici, puis copiable. Le bouton « Copier la fiche » contient les données de l'appel d'offres et les retours 2026.",
    principesTitre: "Les règles d'une chaîne fiable",
    principes: [
      { t: "Une étape, un livrable", d: "Chaque prompt produit une seule chose, contrôlable." },
      { t: "Pas d'invention", d: "Exiger chiffres et citations tirés des documents fournis." },
      { t: "Relire entre deux étapes", d: "Une erreur dans la synthèse contamine le brief, puis tout le plan." },
      { t: "Garder les traces", d: "Les prompts et leurs corrections vont dans le journal." }
    ],
    defisTitre: "Deux défis",
    defisNote: "Copiez la fiche du client, puis lancez la chaîne dans l'outil de votre choix.",
    defis: [
      { n: 1, titre: "La synthèse honnête", min: 8, consigne: "Étape 1 sur les retours 2026. Vérifiez chaque citation : est-elle vraiment dans le texte ? Corrigez le prompt jusqu'à zéro invention." },
      { n: 2, titre: "Du brief au plan", min: 8, consigne: "Étapes 2 et 3. Le plan respecte-t-il le brief ? Notez les écarts et corrigez." }
    ]
  },

  /* ---------- Fil rouge : appel d'offres du Lys Padel Open (fictif) ---------- */
  client: {
    nom: "Lys Padel Open",
    accroche: "Un tournoi qui grandit, une agence à choisir.",
    avertissement: "Tournoi, organisateur et chiffres fictifs, créés pour le cours.",
    arrivee: "L'appel d'offres se travaille à {heure:cas}",
    teaser: "Un tournoi de padel de 3 jours dans la métropole lilloise lance un appel d'offres pour sa communication 2027. Quatre agences, un seul contrat de 40 000 € HT.",
    seance2Kicker: "Séance 2, {seance2}",
    seance2Titre: "La soutenance devant le client",
    onglets: ["L'appel d'offres", "Les cibles", "Identité du tournoi", "Le travail", "La participation", "Journal de prompts"],
    fiche: [
      ["Client", "Comité d'organisation du Lys Padel Open (fictif)"],
      ["Événement", "Tournoi de padel amateur et pro, 3 jours, métropole lilloise, juin 2027 (2e édition)"],
      ["Édition 2026", "3 200 spectateurs, 180 joueurs amateurs, 6 500 abonnés Instagram"],
      ["Questionnaire 2026", "Anonyme, 40 réponses"],
      ["Budget", "40 000 € HT (stratégie, contenus, activation sponsors)"],
      ["Attendu", "Note de compréhension, brief créatif, plan de contenu 8 semaines, planning, budget"],
      ["Soutenance", "{seance2}, 15 minutes par agence"]
    ],
    ficheTexte: "APPEL D'OFFRES — Lys Padel Open (tournoi fictif). Tournoi de padel amateur et pro, 3 jours, métropole lilloise, juin 2027, 2e édition. Édition 2026 : 3 200 spectateurs, 180 joueurs amateurs, 6 500 abonnés Instagram. Budget communication 2027 : 40 000 € HT (stratégie, contenus, activation sponsors). Attendu : note de compréhension, brief créatif, plan de contenu sur 8 semaines, planning, budget. QUESTIONNAIRE SPECTATEURS 2026 (anonyme, 40 réponses), extraits : « Ambiance géniale, on reviendra en famille » / « Impossible de se garer le samedi » / « Trop peu de vidéos des matchs sur les réseaux » / « Les navettes depuis le métro, il en faut plus » / « Super découverte, je ne connaissais pas le padel » / « Les prix de la buvette sont trop élevés » / « Un TikTok avec les meilleurs points, ce serait top » / « Organisation au top, bénévoles adorables » / « Le programme des matchs était difficile à trouver » / « On voudrait une initiation pour les enfants ».",
    objectifsTitre: "Ce que le client attend",
    objectifs: ["5 000 spectateurs en 2027", "Une communauté de joueurs amateurs", "3 nouveaux sponsors locaux", "Une agence capable de produire vite et bien"],
    cibles: [
      { nom: "Joueurs amateurs", d: "Pratiquent en club, cherchent à jouer le tournoi et à progresser." },
      { nom: "Curieux et familles", d: "Ont découvert le padel récemment, viennent pour l'ambiance." },
      { nom: "Sponsors locaux", d: "Veulent une visibilité mesurable auprès d'un public jeune et actif." },
      { nom: "Clubs et ligue", d: "Relais naturels vers les licenciés." },
      { nom: "Presse locale", d: "Cherche des histoires : joueurs locaux, chiffres, nouveautés." }
    ],
    charte: {
      couleurs: [["Bleu Lys", "#1E3A8A"], ["Vert court", "#22A06B"], ["Jaune balle", "#E9F542"], ["Blanc", "#FFFFFF"]],
      ton: "Dynamique, accessible, convivial.",
      valeurs: ["Convivialité", "Découverte", "Proximité"],
      interdits: ["Jargon de joueur confirmé", "Promesses de performance", "Visuels IA présentés comme des photos du tournoi"]
    },
    travail: [
      { t: "Synthèse des retours", d: "Cinq thèmes, chiffres et citations exacts, sans invention." },
      { t: "Brief créatif", d: "Une page : objectif, cible, insight, message, preuve, ton, livrables." },
      { t: "Plan de contenu", d: "Huit semaines, en tableau, avec un indicateur par publication." },
      { t: "Journal de prompts", d: "Les prompts clés, leurs itérations et ce que vous avez corrigé." }
    ],
    dureeTravail: 45,
    etape: "Fin de séance : dépôt de la synthèse, du brief et du plan de contenu. Ils serviront de base à la séance 2.",
    seance2: "Séance 2 ({seance2}) : veille assistée par l'IA, automatisation no-code de la publication et du reporting, puis soutenance de la réponse devant le client.",
    bareme: [
      { c: "Implication dans les défis et les battles", p: 5 },
      { c: "Qualité des prompts et des itérations (journal)", p: 5 },
      { c: "Regard critique : audit, vérifications, corrections", p: 5 },
      { c: "Livrables de l'appel d'offres et soutenance", p: 5 }
    ],
    baremeNote: "Le syllabus prévoit une évaluation par la participation. Cette grille indicative la rend lisible ; elle est ajustable.",
    journal: {
      titre: "Journal de prompts",
      etapes: [
        { label: "Brief : version 1" },
        { label: "Brief : version 2", changement: true },
        { label: "Brief : version 3", changement: true },
        { label: "Synthèse qualitative", changement: true }
      ],
      changementLabel: "Ce que nous avons changé ou vérifié, et pourquoi",
      critique: "Erreurs repérées dans nos propres sorties"
    }
  },

  /* ---------- Simulateur de soutenance (séance 2) ---------- */
  pitch: {
    titre: "Simulateur de soutenance",
    lede: "Trois minutes pour convaincre le client. À mi-parcours, il pose une question difficile, et quelqu'un de l'agence doit répondre.",
    duree: 180,
    objectionA: 90,
    roles: ["Ouverture et compréhension", "Insight et brief", "Plan de contenu", "Production et automatisation", "Budget et indicateurs"],
    objections: [
      "« 40 000 €, qu'est-ce qu'on a de plus qu'avec une agence classique ? »",
      "« Vos contenus sont faits par IA : nos spectateurs vont s'en rendre compte ? »",
      "« Comment saurons-nous que la campagne a marché ? »",
      "« Nos bénévoles n'ont pas le temps de publier trois fois par semaine. »",
      "« Le parking, c'était notre point faible. Vous en parlez ou vous l'évitez ? »",
      "« Qui vérifie les chiffres que vous nous présentez ? »"
    ],
    origine: "Mécanique reprise de ton appli Pitchcoach : chrono, question tirée au hasard à mi-parcours, personne désignée au hasard pour répondre."
  },

  battle: [
    { q: "Quels éléments rendent un prompt professionnel ?", options: ["La politesse", "Rôle, contexte, contraintes, format", "La longueur", "Les émojis"], bonne: 1 },
    { q: "85 % de 40 répondants, c'est…", options: ["36", "34", "32", "38"], bonne: 1 },
    { q: "40 réponses sur 3 200 spectateurs permettent de dire…", options: ["Que tous sont satisfaits", "Ce que pensent ces 40 répondants", "Que la majorité veut TikTok", "Rien du tout"], bonne: 1 },
    { q: "Une citation avec prénom, âge et ville dans un questionnaire anonyme est…", options: ["Une preuve", "Douteuse, et un problème RGPD si elle est réelle", "Normale", "Obligatoire"], bonne: 1 },
    { q: "Dans la chaîne des 4 livrables, que vient-il après le brief ?", options: ["La synthèse", "Le plan de contenu", "La facture", "La veille"], bonne: 1 },
    { q: "Un gabarit de prompt sert à…", options: ["Faire joli", "Réutiliser une méthode qui marche", "Payer moins cher", "Éviter de relire"], bonne: 1 },
    { q: "Une hausse d'abonnés pendant le tournoi prouve que l'affichage a marché ?", options: ["Oui", "Non, corrélation n'est pas causalité", "Oui si elle dépasse 10 %", "Oui avec TikTok"], bonne: 1 },
    { q: "Sur Claude, les skills sont accessibles…", options: ["En entreprise seulement", "Y compris en gratuit, avec l'exécution de code", "Sur Max seulement", "Pas en Europe"], bonne: 1 }
  ],

  aRetenir: [
    "Un usage pro, c'est un prompt sans implicite : rôle, contexte, tâche, format, contraintes.",
    "Le premier jet n'est jamais le livrable : on itère et on fait critiquer.",
    "Les meilleurs prompts deviennent des gabarits ou des skills, réutilisables par l'équipe.",
    "Une synthèse fluide n'est pas une synthèse juste : chiffres, citations, représentativité.",
    "Les livrables s'enchaînent, et on relit entre chaque étape.",
    "Pas de données personnelles dans un outil non validé."
  ],

  glossaire: [
    ["LLM", "Large Language Model : grand modèle de langage qui prédit la suite d'un texte."],
    ["Hallucination", "Réponse fausse produite avec assurance."],
    ["Prompt", "La consigne donnée à l'IA : rôle, contexte, tâche, format, contraintes."],
    ["Itération", "Améliorer une réponse en précisant ou corrigeant la consigne, tour après tour."],
    ["Few-shot", "Donner un ou deux exemples du résultat attendu dans le prompt."],
    ["Gabarit de prompt", "Prompt à trous, réutilisable par toute une équipe."],
    ["Skill", "Compétence réutilisable (instructions, exemples, code) que l'IA charge pour une tâche."],
    ["Synthèse qualitative", "Regroupement de réponses ouvertes en thèmes, avec chiffres et citations exacts."],
    ["Verbatim", "Citation exacte d'un répondant."],
    ["Représentativité", "Capacité d'un échantillon à refléter l'ensemble de la population étudiée."],
    ["Appel d'offres", "Mise en concurrence de prestataires sur un cahier des charges."],
    ["Note de compréhension", "Première partie d'une réponse à appel d'offres : les enjeux du client vus par l'agence."],
    ["Automatisation no-code", "Enchaîner des tâches entre applications sans programmer, avec des outils comme Make ou Zapier (séance 2)."],
    ["RGPD", "Règlement européen sur la protection des données personnelles."]
  ],

  /* Documents proposés au téléchargement directement dans l'étape (clé = id de l'étape). */

  docsEtapes: {"prompt": ["fiche-prompt-pro"], "cas": ["appel-offres-lys-padel-open", "grille-participation"], "final": ["glossaire"]},

  ressources: [
    { titre: "Fiche méthode : le prompt professionnel", fichier: "ressources/fiche-prompt-pro.pdf", type: "PDF", dispo: true },
    { titre: "Appel d'offres Lys Padel Open", fichier: "ressources/appel-offres-lys-padel-open.pdf", type: "PDF", dispo: true },
    { titre: "Grille de participation", fichier: "ressources/grille-participation.pdf", type: "PDF", dispo: true },
    { titre: "Glossaire de la séance", fichier: "ressources/glossaire.pdf", type: "PDF", dispo: true }
  ],

  actus: [
    { date: "2026", titre: "Use skills in Claude", src: "https://support.claude.com/en/articles/12512180-use-skills-in-claude", srcNom: "Centre d'aide Claude" },
    { date: "9 juillet 2026", titre: "ChatGPT Work", src: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", srcNom: "OpenAI release notes" },
    { date: "12 septembre 2026", titre: "Calendrier de l'AI Act après l'omnibus numérique", src: "https://www.donneespersonnelles.fr/omnibus-numerique-ia", srcNom: "donneespersonnelles.fr" }
  ]
};
