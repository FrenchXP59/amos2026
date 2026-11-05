/* =========================================================================
   CONTENU — M1 « IA et automatisation », séance 2.
   Mêmes agences et mêmes scores qu'en séance 1 (config.idEquipes).
   Ouvrir avec ?classe=m1a.
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-ia-automatisation-s2",
    idEquipes: "amos-ia-automatisation-s1",
    ambiance: "flux",
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
    agences: ["Agence 1", "Agence 2", "Agence 3", "Agence 4", "Agence 5"],
    equipes: "agences",
    tirageNote: "Les agences de la séance 1 sont conservées : ne refaites le tirage que si la classe a changé."
  },

  videos: {
    s1: { titre: "Veiller et automatiser : déléguer sans perdre le contrôle", duree: "3 min 30", url: "https://youtu.be/dcd2VXDSHlM" }
  },
  videoDebat: {
    question: "Faut-il automatiser tout ce qui peut l'être ?",
    relances: ["La vidéo propose trois niveaux : automatisation directe, validation humaine, précautions renforcées. Existe-t-il des tâches qu'on ne devrait jamais automatiser ?", "Quelles tâches de votre stage reviennent chaque semaine à l'identique ?", "Qui est responsable quand un flux automatique envoie une erreur à 500 personnes ?", "Qu'est-ce qu'on perd quand plus personne ne lit la veille en entier ?"],
    minutes: 6
  },

  parcours: [
    { id: "accueil", heure: "9:00", duree: 10, titre: "Retour des agences", sous: "La soutenance est aujourd'hui" },
    { id: "video", heure: "9:10", duree: 15, titre: "Vidéo et débat", sous: "Déléguer sans perdre le contrôle",
      lede: "Trois minutes et demie sur la veille assistée et l'automatisation, puis un débat : faut-il automatiser tout ce qui peut l'être ?" },
    { id: "echelle", type: "fiches", data: "echelle", heure: "9:25", duree: 10, titre: "Prompt, Skill, agent, automatisation", sous: "Quatre niveaux de délégation",
      lede: "Un prompt vous aide à réaliser une tâche. Un Skill vous permet de la refaire avec la même méthode. Une automatisation lance le processus sans vous." },
    { id: "automatisable", type: "tri", data: "automatisable", heure: "9:35", duree: 10, titre: "Automatisable ?", sous: "Avec ou sans humain",
      lede: "Tout ce qui se répète peut s'automatiser. Tout ce qui s'automatise ne doit pas l'être. Huit tâches d'agence à classer." },
    { id: "skill", type: "fiches", data: "skill", heure: "9:45", duree: 25, titre: "Atelier Skill", sous: "Créer le contrôle qualité de l'agence",
      lede: "Ensemble, on crée un Skill Claude qui relit n'importe quel livrable avant qu'il parte chez le client. Puis chaque agence l'utilise sur sa propre réponse." },
    { id: "flux", type: "chaine", data: "flux", heure: "10:10", duree: 25, titre: "Make en direct", sous: "Un processus qui se déclenche seul",
      lede: "Un déclencheur, des actions, un filtre, une validation. Démonstration en direct sur Make, puis chaque agence dessine le flux de reporting de sa réponse." },
    { id: "pause", heure: "10:35", duree: 15, titre: "Pause", sous: "Changement de côté" },
    { id: "veille", type: "fiches", data: "veille", heure: "10:50", duree: 10, titre: "La veille augmentée", sous: "Chercher, trier, restituer",
      lede: "L'IA lit plus vite que vous. Elle invente aussi des sources. La méthode en cinq points, à appliquer directement dans votre réponse." },
    { id: "cas", heure: "11:00", duree: 35, titre: "Finaliser la réponse", sous: "Appel d'offres Lys Padel Open",
      lede: "Dernière ligne droite : veille, flux de reporting, puis contrôle qualité avec votre Skill avant la soutenance de {heure:pitch}." },
    { id: "bonus", type: "fiches", data: "bonus", heure: "11:35", duree: 15, titre: "Bonus : l'agent qui crée un site", sous: "Du prompt au site en ligne",
      lede: "Le niveau agent en action : une IA qui travaille dans votre dossier et crée les fichiers d'un site. Vous gardez vos fichiers, vous le mettez en ligne gratuitement." },
    { id: "pitch", type: "pitch", heure: "11:50", duree: 30, titre: "Soutenance", sous: "3 minutes par agence",
      lede: "Trois minutes pour convaincre le client. À mi-parcours, il pose une question difficile, et quelqu'un de l'agence doit répondre." },
    { id: "final", heure: "12:20", duree: 10, titre: "Le client choisit", sous: "Classement et à retenir",
      lede: "Le client désigne son agence. Le classement cumule les deux séances." }
  ],

  /* ---------- Prompt, Skill, agent, automatisation ---------- */
  echelle: {
    intro: "Quatre façons de travailler avec l'IA, de la plus manuelle à la plus autonome. Chaque marche suppose la précédente.",
    items: [
      { sigle: "1", titre: "Le prompt", sous: "Une consigne, une réponse, à refaire à chaque fois",
        points: ["Vous écrivez, l'IA répond, vous recommencez la prochaine fois.", "Exemple Lys Padel : « Résume ces 40 avis de spectateurs. »", "Limite : la qualité dépend de qui écrit le prompt, et du jour."] },
      { sigle: "2", titre: "Le Skill", sous: "Une méthode enregistrée, appliquée toujours pareil",
        points: ["Un fichier d'instructions (SKILL.md) que Claude charge quand la tâche s'y prête.", "Exemple : le contrôle qualité de l'agence, avec les mêmes 5 contrôles et le même format de sortie.", "Ce qu'on gagne : la méthode ne dépend plus de la personne. Ce n'est pas encore une automatisation : il faut le lancer."] },
      { sigle: "3", titre: "L'agent", sous: "Une IA qui enchaîne les étapes et agit sur des fichiers",
        points: ["Il lit des documents, crée des fichiers, enchaîne plusieurs opérations pour atteindre un objectif.", "Exemple : Antigravity, Claude Code ou Codex qui créent un site entier dans votre dossier (voir le bonus).", "Ce qu'il faut : un dossier dédié, une copie de sauvegarde, une relecture."] },
      { sigle: "4", titre: "L'automatisation", sous: "Un processus qui se déclenche sans vous",
        points: ["Un déclencheur (une nouvelle ligne, un horaire) lance des actions entre applications.", "Exemple : un nouveau prospect sponsor dans un tableau déclenche une notification à l'agence (Make).", "La règle : un humain valide avant tout envoi au client."],
        exemple: "La phrase à retenir : un prompt vous aide à réaliser une tâche, un Skill vous permet de la refaire avec la même méthode, une automatisation lance le processus sans vous." }
    ]
  },

  /* ---------- Atelier Skill ---------- */
  skill: {
    intro: "Démonstration commune sur Claude (le compte gratuit suffit), puis une personne par agence reproduit. Les libellés des menus peuvent varier selon la langue de l'interface.",
    items: [
      { sigle: "1", titre: "Activer l'exécution de code", sous: "Les Skills en ont besoin",
        points: ["Paramètres → Capacités → « Exécution de code et création de fichiers » (aide en anglais : Settings → Capabilities).", "Disponible sur l'offre gratuite, dans ses limites d'usage."] },
      { sigle: "2", titre: "Trouver les Skills", sous: "Personnaliser → Compétences",
        points: ["Aide en anglais : Customize → Skills.", "On y voit les Skills d'exemple d'Anthropic et ceux qu'on a ajoutés, avec un interrupteur pour les activer."] },
      { sigle: "3", titre: "Faire écrire le Skill par Claude", sous: "Il rédige le fichier SKILL.md",
        points: ["Demandez : « Aide-moi à créer un Skill de contrôle qualité pour une agence de communication sport : 5 contrôles (chiffres et faits, affirmations inventées, conformité au brief, clarté, risques), toujours le même format de sortie. »", "Le Skill tient dans un dossier controle-qualite-agence/ qui contient SKILL.md : un nom, une description (quand l'utiliser), puis les instructions."] },
      { sigle: "4", titre: "Empaqueter et importer", sous: "Un ZIP, puis « Importer une compétence »",
        points: ["Compressez le dossier en ZIP.", "Compétences → « + » → « Créer une compétence » → « Importer une compétence », puis choisissez le ZIP.", "Secours : le ZIP prêt à importer est dans les téléchargements de cette étape."] },
      { sigle: "5", titre: "Tester deux fois", sous: "La preuve que la méthode est standardisée",
        points: ["Test 1 : la réponse de l'agence Smash, avec le brief du client.", "Test 2 : un post Instagram, avec le même brief.", "Même grille, même format, deux livrables différents : c'est ça, un Skill. Comptez ce qu'il trouve et ce qu'il rate."],
        exemple: "Le Skill propose, l'agence tranche. Il peut rater une erreur ou en signaler une qui n'existe pas : chaque signalement se vérifie. Pendant le travail de 11h00, chaque agence passe sa propre réponse dans le Skill avant la soutenance." }
    ],
    chrono: 10
  },

  /* ---------- Bonus : créer un site ---------- */
  bonus: {
    intro: "La page bonus de la convention détaille tout : comparatif des outils, parcours, générateur de prompt, lexique, mise en ligne.",
    items: [
      { sigle: "?", titre: "Le critère n°1", sous: "Votre site peut-il partir avec vous ?",
        points: ["Avoir accès au code ne suffit pas : il faut que le site tourne sans l'outil qui l'a créé.", "Antigravity (gratuit à date), Claude Code et Codex (abonnement) travaillent dans votre dossier : les fichiers sont à vous."] },
      { sigle: "6", titre: "Le parcours en 6 étapes", sous: "Sans terminal ni compte développeur",
        points: ["Un dossier mon-site/ avec brief.md et images/.", "Un prompt préparé avec le générateur de la page bonus.", "L'agent crée index.html ; vous corrigez une chose à la fois et copiez le dossier avant chaque gros changement.", "Compte Netlify gratuit, puis glisser-déposer : le site est en ligne."] },
      { sigle: "GO", titre: "Le défi", sous: "Votre landing page en ligne",
        points: ["Une page sur votre projet : asso, événement, portfolio.", "Envoyez le lien en .netlify.app : les plus réussies seront montrées, avec l'accord de leurs auteurs."],
        lien: { url: "../../bonus/", label: "Ouvrir la page bonus" } }
    ]
  },


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
        exemple: "À appliquer dans votre réponse (pendant le travail de 11h00) : une veille express sur les tournois de padel amateurs en France. Cinq points, chacun avec un lien que vous avez ouvert. Un lien qui ne marche pas = un point perdu." }
    ],
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
    note: "Démonstration en direct sur Make (offre gratuite) : chaque nouveau prospect sponsor ajouté dans le Google Sheet « Prospects sponsors Lys Padel » déclenche un e-mail à l'agence, seulement si le montant dépasse 1 000 €. Test avec « Run once » : une ligne à 500 € (bloquée par le filtre), une à 3 000 € (e-mail envoyé). Pour reproduire : le fichier doit être un vrai Google Sheets, pas un CSV ni un .xlsx déposé sur Drive (Fichier → Enregistrer au format Google Sheets), et les montants en chiffres seuls. Les agences dessinent ensuite le flux de reporting de leur réponse : déclencheur, actions, filtre, validation humaine.",
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
      { n: 1, titre: "Le reporting du Lys Padel Open", min: 10, consigne: "Dessinez le flux qui produit chaque semaine, pendant les 8 semaines de campagne, un point d'étape pour le client : chiffres des réseaux, publications de la semaine, veille. Déclencheur, actions, filtre, validation humaine. Il ira dans votre réponse à l'appel d'offres." }
    ],
    battle: { titre: "Le meilleur flux", texte: "Chaque agence présente son flux en quarante secondes. Vote de la classe : le plus utile et le plus sûr. 3 points pour le premier, 1 point pour le deuxième." }
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
      { t: "Flux de reporting", d: "Le flux dessiné ce matin : déclencheur, actions, filtre, validation humaine." },
      { t: "Contrôle qualité", d: "Votre réponse passée dans le Skill avant la soutenance : ce qu'il a signalé, ce que vous avez corrigé." }
    ],
    dureeTravail: 35,
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
        { label: "Notre flux de reporting", changement: true },
        { label: "Ce que le Skill a signalé sur notre réponse", changement: true }
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
      "« Et si votre outil d'automatisation tombe en panne pendant le tournoi ? »",
      "« Votre réponse a été relue par une IA : qui me garantit qu'il n'y a plus d'erreur ? »"
    ],
    origine: "Mécanique reprise de ton appli Pitchcoach : chrono, question tirée au hasard à mi-parcours, personne désignée au hasard pour répondre."
  },

  battle: [
    { q: "Un Skill Claude, c'est avant tout…", options: ["Une automatisation planifiée", "Un abonnement payant", "Une méthode enregistrée que l'IA applique toujours de la même façon", "Un module de Make"], bonne: 2 },
    { q: "Chez Make, à quoi sert un routeur ?", options: ["À envoyer des mails", "À faire bifurquer le scénario en plusieurs chemins", "À stocker des fichiers", "À payer l'abonnement"], bonne: 1 },
    { q: "Un filtre dans un flux sert à…", options: ["N'exécuter la suite que si une condition est remplie", "Décorer", "Supprimer les données", "Accélérer l'IA"], bonne: 0 },
    { q: "Résumer la veille avec l'IA et l'envoyer au client : on…", options: ["Automatise complètement", "Ne le fait jamais", "Automatise avec validation humaine", "Le fait à la main"], bonne: 2 },
    { q: "Dans une veille faite par l'IA, un lien cité…", options: ["Est forcément juste", "S'ouvre et se vérifie", "Est inutile", "Remplace la lecture"], bonne: 1 },
    { q: "Répondre à un spectateur blessé après le tournoi : on…", options: ["N'automatise pas", "Automatise", "Automatise avec validation", "Ignore"], bonne: 0 },
    { q: "Une veille utile commence par…", options: ["Beaucoup de sources", "Un outil payant", "Une question à laquelle elle répond", "Un résumé IA"], bonne: 2 },
    { q: "Le dernier maillon d'un flux qui écrit au client, c'est…", options: ["L'IA", "Le filtre", "Le déclencheur", "Un humain qui relit"], bonne: 3 }
  ],

  aRetenir: [
    "Une veille répond à une question, avec des sources choisies, à un rythme fixé.",
    "L'IA lit vite mais invente parfois : on ouvre chaque lien, on vérifie chaque date.",
    "Un flux, c'est un déclencheur, des actions, un filtre, une validation.",
    "On automatise le répétitif, on valide ce qui part chez le client, on garde l'humain pour le sensible.",
    "Prompt, Skill, agent, automatisation : quatre niveaux de délégation, chacun suppose le précédent.",
    "Un Skill standardise la méthode ; il ne remplace pas la vérification humaine.",
    "Make et Zapier ont la même logique : savoir dessiner un flux compte plus que l'outil.",
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
    ["Reporting", "Compte rendu régulier des résultats d'une action."],
    ["Skill", "Chez Claude : un dossier d'instructions (SKILL.md) qui enregistre une méthode réutilisable."],
    ["Agent", "IA qui enchaîne plusieurs étapes et agit sur des fichiers ou des outils pour atteindre un objectif."]
  ],

  /* Documents proposés au téléchargement directement dans l'étape (clé = id de l'étape). */

  docsEtapes: {"veille": ["fiche-veille"], "flux": ["modele-flux", "prospects-sponsors"], "skill": ["controle-qualite-agence", "brief-lys-padel", "test-1", "test-2"]},

  ressources: [
    { titre: "Fiche méthode : la veille augmentée", fichier: "ressources/fiche-veille.pdf", type: "PDF", dispo: true },
    { titre: "Modèle de flux : déclencheur, actions, filtre, validation", fichier: "ressources/modele-flux.pdf", type: "PDF", dispo: true },
    { titre: "Démo Make : prospects sponsors (CSV à importer dans Google Sheets)", fichier: "ressources/prospects-sponsors-lys-padel.csv", type: "CSV", dispo: true },
    { titre: "Skill prêt à importer : contrôle qualité de l'agence", fichier: "ressources/controle-qualite-agence.zip", type: "ZIP", dispo: true },
    { titre: "Brief du client Lys Padel Open", fichier: "ressources/brief-lys-padel.md", type: "Texte", dispo: true },
    { titre: "Test 1 : réponse de l'agence Smash", fichier: "ressources/test-1-reponse-agence.md", type: "Texte", dispo: true },
    { titre: "Test 2 : post Instagram", fichier: "ressources/test-2-post-instagram.md", type: "Texte", dispo: true }
  ],

  actus: [
    { date: "Aide officielle", titre: "Learn key concepts in Zaps", src: "https://help.zapier.com/hc/en-us/articles/8496181725453-Learn-key-concepts-in-Zaps", srcNom: "Zapier" },
    { date: "Aide officielle", titre: "Router", src: "https://help.make.com/router", srcNom: "Make" },
    { date: "Ressource du syllabus", titre: "Make Academy", src: "https://make.com/academy", srcNom: "Make" }
  ]
};
