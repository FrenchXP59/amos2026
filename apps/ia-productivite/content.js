/* =========================================================================
   CONTENU — M2 « IA et productivité », séance 1.
   Le moteur est commun (../moteur/). Ouvrir avec ?classe=m2a ou ?classe=m2b.
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-ia-productivite-s1",
    ambiance: "donnees",
    ecole: "AMOS",
    logo: "../moteur/assets/logo-amos.png",
    cours: "IA et productivité",
    classe: "M2 Mastère Management du Sport, Marketing & Communication",
    seance: "Séance 1 sur 2",
    intervenant: "Frédéric Legrand",
    dateSeance: "Séance de 13h30 à 17h00",
    classes: {
      m2a: { date: "Lundi 2 novembre 2026, 13h30 – 17h00", debut: "13:30", variables: { seance2: "mercredi 25 novembre, après-midi" } },
      m2b: { date: "Mercredi 4 novembre 2026, 13h30 – 17h00", debut: "13:30", variables: { seance2: "jeudi 26 novembre, après-midi" } }
    },
    variables: { seance2: "date à venir" },
    agences: ["Cellule 1", "Cellule 2", "Cellule 3", "Cellule 4"],
    equipes: "cellules",
    tirageNote: "Mêmes cellules jusqu'au comité de direction de la séance 2."
  },

  videos: {
    s1: { titre: "Le manager augmenté : orchestrer l'IA pour décider", duree: "4 min", url: "https://youtu.be/mBw2X9lwEA4" }
  },

  parcours: [
    { id: "accueil",  heure: "13:30", duree: 10, titre: "Départ",               sous: "Cellules et brief du comité" },
    { id: "frontiere", type: "tri", data: "frontiere", heure: "13:40", duree: 20, titre: "La frontière irrégulière", sous: "Où l'IA aide, où elle piège",
      lede: "Avant de déléguer à l'IA, un manager doit savoir où elle est fiable. Huit tâches du club : l'IA vous aide, ou elle vous piège ?" },
    { id: "video",    heure: "14:00", duree: 20, titre: "Vidéo et quiz flash",  sous: "Le manager augmenté",
      lede: "Quatre minutes sur le changement de posture : de l'utilisateur qui produit au manager qui décide. Puis six questions éclair et une question bonus." },
    { id: "chaine", type: "chaine", data: "chaine", heure: "14:20", duree: 40, titre: "Chaînes de prompts", sous: "Raisonner en étapes",
      lede: "Un seul prompt pour une décision stratégique, c'est une réponse fragile. Une chaîne de quatre étapes, c'est un raisonnement que vous contrôlez." },
    { id: "pause",    heure: "15:00", duree: 15, titre: "Pause",                sous: "Mi-temps" },
    { id: "audit", type: "audit", data: "audit", heure: "15:15", duree: 25, titre: "Audit d'une sortie IA", sous: "Trouver les erreurs",
      lede: "Une analyse concurrentielle bien écrite, produite par une IA. Elle contient sept erreurs. Votre métier : les trouver avant le comité." },
    { id: "cas",      heure: "15:40", duree: 65, titre: "Fil rouge Nordval",    sous: "Partie 1 : diagnostic et scénarios",
      lede: "Le comité de direction vous confie le dossier. Aujourd'hui : diagnostic et trois scénarios. Partie 2, {seance2} : recommandation, charte IA et comité." },
    { id: "final",    heure: "16:45", duree: 15, titre: "Battle finale",        sous: "À retenir et suite",
      lede: "Huit questions sur toute la séance. La cellule qui lève la main la première et répond juste prend le point." }
  ],

  /* ---------- Jeu de tri : la frontière irrégulière ---------- */
  frontiere: {
    intro: "Pour chaque tâche, la classe vote : l'IA m'aide (dans la frontière) ou l'IA me piège (hors frontière). Puis on révèle.",
    categories: [{ k: "aide", label: "L'IA m'aide" }, { k: "piege", label: "L'IA me piège" }],
    items: [
      { t: "Regrouper 40 retours de supporters en 5 grands thèmes", cat: "aide", why: "Synthèse de texte fourni : terrain fort de l'IA, à condition de relire les verbatims clés." },
      { t: "Donner l'affluence moyenne exacte de chaque club de Ligue 2 la saison dernière", cat: "piege", why: "Chiffres précis sans source : risque élevé d'invention. Il faut aller chercher la donnée officielle." },
      { t: "Proposer 10 idées d'activation sponsor pour le derby", cat: "aide", why: "Idéation : l'IA élargit le champ, le manager trie." },
      { t: "Décider s'il faut se séparer du responsable billetterie à partir de ses KPI", cat: "piege", why: "Décision humaine, contexte, droit du travail, éthique : l'IA peut éclairer, jamais trancher." },
      { t: "Structurer un SWOT à partir de documents internes fournis", cat: "aide", why: "Structuration de matière fournie : efficace, si l'on vérifie que rien n'est inventé hors des documents." },
      { t: "Prévoir le nombre d'abonnés si le prix baisse de 10 %, sans données historiques", cat: "piege", why: "Sans données, l'IA produit un chiffre plausible mais sans fondement. Un modèle exige des données." },
      { t: "Adapter un communiqué pour une audience anglophone", cat: "aide", why: "Traduction et adaptation de ton : point fort, avec relecture des noms propres." },
      { t: "Croiser un tableur de ventes et des entretiens pour expliquer une baisse", cat: "piege", why: "C'est le type de tâche « hors frontière » de l'étude : l'IA répond avec assurance mais passe à côté du signal subtil." }
    ],
    faitsTitre: "L'étude Harvard et BCG (2023)",
    faits: [
      { chiffre: "758", texte: "travailleurs du savoir, étude menée avec le Boston Consulting Group" },
      { chiffre: "+12,2 %", texte: "de tâches réalisées avec l'IA, sur les tâches dans la frontière" },
      { chiffre: "25,1 % plus rapides", texte: "et une qualité nettement supérieure, dans la frontière" },
      { chiffre: "19 % de chances en moins", texte: "de trouver la bonne réponse avec l'IA, sur une tâche hors frontière" }
    ],
    faitsNote: "La frontière est irrégulière : deux tâches qui semblent proches peuvent tomber de part et d'autre. Le risque n'est pas l'IA qui échoue, c'est l'IA qui se trompe avec assurance.",
    source: { url: "https://www.hbs.edu/faculty/Pages/item.aspx?num=64700", nom: "Dell'Acqua, Mollick et al., HBS Working Paper 24-013, septembre 2023" }
  },

  /* ---------- Quiz flash après la vidéo ---------- */
  quizFlash: [
    { q: "Dans l'étude Harvard et BCG (2023), sur une tâche hors du terrain fiable de l'IA, la justesse des réponses des consultants…", options: ["Progressait de 25 %", "Chutait de 19 points de pourcentage", "Ne changeait pas", "Doublait"], bonne: 1,
      explication: "C'est la « frontière technologique irrégulière » : selon la tâche, l'IA aide beaucoup… ou fait se tromper avec assurance.",
      complement: "Source : Dell'Acqua et al., HBS Working Paper 24-013, 2023. En anglais : « jagged technological frontier »." },
    { q: "Une chaîne de prompts en quatre étapes, dans l'ordre…", options: ["Recommandation, options, diagnostic, contre-analyse", "Diagnostic, options, contre-analyse, recommandation", "Options, diagnostic, recommandation, contre-analyse", "Diagnostic, recommandation, options, contre-analyse"], bonne: 1,
      explication: "Chaque sortie nourrit l'étape suivante. Le diagnostic sépare les faits vérifiés des hypothèses.",
      complement: "Vous la construisez juste après, à 14h20, sur le cas Nordval." },
    { q: "Pourquoi vérifier entre chaque étape de la chaîne ?", options: ["Pour gagner du temps", "Parce qu'une petite erreur au diagnostic contamine toute la chaîne", "Parce que l'IA l'exige", "Ce n'est pas utile si le prompt est bon"], bonne: 1,
      explication: "La règle d'or de la vidéo : on contrôle chaque maillon avant de passer au suivant.",
      complement: "C'est aussi là que se joue votre valeur ajoutée de manager : l'IA produit, vous validez." },
    { q: "À quoi sert l'étape de contre-analyse ?", options: ["À traduire la recommandation", "À faire jouer à l'IA un directeur financier sceptique qui attaque vos scénarios", "À raccourcir le texte", "À choisir le scénario le moins cher"], bonne: 1,
      explication: "On stress-teste la solidité et les risques de ses propres propositions avant le comité.",
      complement: "Les anglo-saxons parlent de « red team » : une équipe chargée de trouver les failles." },
    { q: "Un collaborateur dépose un rapport stratégique généré par l'IA, superbe et plein de chiffres. Premier réflexe ?", options: ["Le transmettre au comité", "Exiger les sources et la méthode, et creuser les hypothèses", "Le refaire soi-même", "Le faire relire par une autre IA uniquement"], bonne: 1,
      explication: "Un chiffre ultra précis sans source n'est pas une preuve. La forme ne garantit jamais le fond.",
      complement: "Vous le vivrez à 15h15 : l'audit d'une étude qui contient des erreurs volontaires." },
    { q: "Depuis août 2026, l'article 50 de l'AI Act impose…", options: ["L'interdiction de l'IA en entreprise", "Une obligation de transparence pour certaines interactions avec l'IA et certains contenus générés", "Un permis pour utiliser ChatGPT", "Rien, il est reporté à 2028"], bonne: 1,
      explication: "Exemples : savoir qu'on parle à un chatbot, signaler un contenu réaliste généré par l'IA (2 août 2026).",
      complement: "Plus l'outil est autonome (ChatGPT Work exécute des missions en plusieurs étapes), plus la responsabilité du manager qui l'orchestre augmente." },
    { bonus: true, q: "Sur les tâches bien adaptées à l'IA, les consultants de l'étude allaient environ…", options: ["5 % plus vite", "25 % plus vite, avec une meilleure qualité", "2 fois plus vite, mais moins bien", "Aussi vite qu'avant"], bonne: 1,
      explication: "Environ 25 % plus vite, et un travail jugé de meilleure qualité : le vrai gain, mais seulement sur le bon terrain.",
      complement: "758 consultants du BCG. L'étude mesure aussi 12 % de tâches réalisées en plus et une qualité supérieure de plus de 40 %." }
  ],

  /* ---------- Chaîne de prompts ---------- */
  chaine: {
    intro: "Quatre étapes, quatre prompts. Entre deux étapes, vous relisez, vous vérifiez, vous corrigez : c'est là que se joue votre valeur de manager.",
    etapes: [
      { titre: "Diagnostic", role: "Comprendre la situation, séparer faits et hypothèses.",
        prompt: "Tu es analyste stratégie dans le sport professionnel. Voici la fiche de l'Olympique Nordval : [coller la fiche]. Fais un diagnostic en trois parties : forces, faiblesses, signaux faibles du marché. Pour chaque point, indique s'il s'agit d'un fait de la fiche ou d'une hypothèse de ta part." },
      { titre: "Options", role: "Ouvrir le champ : des scénarios vraiment différents.",
        prompt: "À partir de ce diagnostic : [coller la sortie précédente]. Propose trois scénarios contrastés pour générer 1,5 M€ de revenus propres en deux saisons. Pour chacun : principe, investissement estimé, risques, indicateurs de succès. Signale clairement chaque chiffre estimé." },
      { titre: "Contre-analyse", role: "Faire attaquer ses propres idées.",
        prompt: "Joue le rôle d'un directeur financier sceptique. Attaque chacun de ces scénarios : [coller la sortie précédente]. Hypothèses fragiles, coûts oubliés, risques d'image. Sois précis et sans complaisance." },
      { titre: "Recommandation", role: "Trancher, et dire ce qui reste à vérifier.",
        prompt: "En tenant compte de ces critiques : [coller la sortie précédente]. Recommande un scénario au comité de direction en une page : la décision, trois arguments, deux risques et leur parade, un calendrier en trois étapes. Termine par la liste de ce qu'un humain doit encore vérifier." }
    ],
    note: "Chaque prompt est modifiable ici, puis copiable dans l'outil de votre choix. La chaîne ne remplace pas le jugement : elle le rend visible.",
    principesTitre: "Cinq règles pour une chaîne fiable",
    principes: [
      { t: "Une étape, une tâche", d: "Diagnostiquer et recommander dans le même prompt, c'est mélanger l'analyse et la conclusion." },
      { t: "Faits ou hypothèses", d: "Exiger que l'IA marque chaque affirmation. Ce qui n'est pas sourcé est une hypothèse." },
      { t: "Garder la main", d: "Relire et corriger entre deux étapes : une erreur au début contamine toute la chaîne." },
      { t: "Se faire attaquer", d: "Une recommandation qui n'a pas affronté de contre-analyse n'est pas prête pour un comité." },
      { t: "Finir par le doute", d: "Toujours demander ce qui reste à vérifier par un humain." }
    ],
    defisTitre: "Trois défis chronométrés",
    defisNote: "Outils gratuits au choix : ChatGPT, Claude, Gemini, Le Chat, Copilot. Copiez la fiche du club avec le bouton ci-dessus.",
    defis: [
      { n: 1, titre: "Le diagnostic honnête", min: 7, consigne: "Lancez l'étape 1 sur la fiche Nordval. Comptez les « hypothèses » présentées comme des faits, puis corrigez le prompt pour les faire disparaître." },
      { n: 2, titre: "Deux avocats du diable", min: 7, consigne: "Faites attaquer le même scénario par un DAF sceptique, puis par le président d'un groupe de supporters. Qu'est-ce qui change dans les critiques ?" },
      { n: 3, titre: "La chaîne complète", min: 8, consigne: "Enchaînez les quatre étapes et obtenez une recommandation d'une page. Notez ce que vous avez corrigé entre chaque étape." }
    ],
    battle: { titre: "Battle de recommandations", texte: "Chaque cellule lit sa recommandation en une minute. La classe vote pour la plus convaincante et la mieux étayée : 3 points pour la première, 1 point pour la deuxième." }
  },

  /* ---------- Audit d'une sortie IA (sept erreurs volontaires) ---------- */
  audit: {
    consigne: "Lisez cette analyse comme si un collaborateur vous l'avait remise avant le comité. En cellule, relevez les erreurs : faits faux, calculs, contradictions avec la fiche du club, sources douteuses, conclusions abusives.",
    minutes: 8,
    titreDoc: "Analyse concurrentielle, générée par IA : l'Olympique Nordval et son marché",
    texte: [
      ["La ", { e: 0, t: "Ligue 2 compte 20 clubs" }, " qui se disputent un marché régional très concurrentiel. Ses matchs sont ", { e: 1, t: "diffusés par DAZN" }, ", ce qui offre une exposition nationale à chaque club."],
      ["Bonne nouvelle pour le Nordval : ", { e: 2, t: "les droits TV de Ligue 2 progressent de 25 % en 2026-2027" }, ", ce qui sécurise une partie du budget. Le club dispose par ailleurs d'un ", { e: 3, t: "stade de 15 000 places rempli à 80 %" }, ", signe d'une base de supporters solide."],
      ["Côté billetterie, ", { e: 4, t: "les 4 200 abonnés à 180 € rapportent 1,2 M€ par saison" }, ". ", { e: 5, t: "Selon une étude Deloitte de 2026, 73,4 % des supporters de Ligue 2 sont prêts à payer un abonnement vidéo au club" }, "."],
      ["Conclusion : ", { e: 6, t: "le club doit impérativement lancer sa propre plateforme vidéo payante, seule option viable pour atteindre ses objectifs" }, "."]
    ],
    erreurs: [
      { titre: "Nombre de clubs faux", explication: "La Ligue 2 compte 18 clubs (enveloppe de droits TV 2026-2027 répartie entre 18 clubs, document LFP)." },
      { titre: "Mauvais diffuseur", explication: "beIN SPORTS est le seul diffuseur de la Ligue 2 jusqu'en 2029 (cycle 2024-2029)." },
      { titre: "Tendance inversée", explication: "L'enveloppe ordinaire 2026-2027 est projetée à 29,2 M€, environ 25 % de moins qu'en 2024-2025. Elle baisse, elle ne progresse pas." },
      { titre: "Contradiction avec le dossier", explication: "La fiche du club indique 12 000 places et 6 800 spectateurs en moyenne, soit un remplissage d'environ 57 %." },
      { titre: "Erreur de calcul", explication: "4 200 × 180 € = 756 000 €, pas 1,2 M€. Toujours refaire les calculs." },
      { titre: "Source invérifiable", explication: "Chiffre très précis, aucune référence : tant qu'on ne retrouve pas l'étude, on la traite comme une invention possible." },
      { titre: "Conclusion abusive", explication: "« Seule option viable » : faux dilemme, aucun coût, aucune alternative étudiée. Une recommandation sans options comparées n'est pas une analyse." }
    ],
    lecon: "Un texte bien écrit n'est pas un texte juste. Le manager vérifie les faits, refait les calculs, confronte au dossier et refuse les conclusions sans alternative."
  },

  /* ---------- Fil rouge : Olympique Nordval (fictif) ---------- */
  client: {
    nom: "Olympique Nordval",
    accroche: "Moins de droits TV, plus besoin que jamais de revenus propres.",
    avertissement: "Club et chiffres du club fictifs. Le contexte de la Ligue 2 est réel et sourcé.",
    arrivee: "Le comité de direction vous attend à {heure:cas}",
    teaser: "Un club de Ligue 2 fictif, 12 000 places, des droits TV en baisse. Le président veut une stratégie digitale qui rapporte. Vos cellules ont deux séances pour la lui présenter.",
    seance2Kicker: "Séance 2, {seance2}",
    seance2Titre: "Le comité de direction tranche",
    onglets: ["Le club", "Parties prenantes", "Identité et contraintes", "Le travail", "Le barème", "Journal de chaîne"],
    fiche: [
      ["Club", "Olympique Nordval, Ligue 2 (fictif)"],
      ["Stade", "12 000 places, 6 800 spectateurs en moyenne"],
      ["Budget", "18 M€"],
      ["Revenus", "Sponsoring 4,5 M€, billetterie 3,1 M€, droits TV environ 1,6 M€, merchandising 0,6 M€"],
      ["Abonnés", "4 200 abonnés saison, 180 € en moyenne"],
      ["Audience digitale", "Instagram 48 000, TikTok 31 000, X 22 000, newsletter 9 000"],
      ["Équipe marketing", "5 personnes, usage de l'IA non encadré"],
      ["Commande", "+1,5 M€ de revenus propres d'ici deux saisons"]
    ],
    ficheTexte: "Olympique Nordval (club fictif de Ligue 2). Stade de 12 000 places, 6 800 spectateurs en moyenne. Budget 18 M€. Revenus : sponsoring 4,5 M€, billetterie 3,1 M€, droits TV environ 1,6 M€, merchandising 0,6 M€. 4 200 abonnés saison à 180 € en moyenne. Audience digitale : Instagram 48 000, TikTok 31 000, X 22 000, newsletter 9 000. Équipe marketing de 5 personnes, usage de l'IA non encadré. Contexte : beIN SPORTS seul diffuseur de la Ligue 2 jusqu'en 2029 ; enveloppe de droits TV 2026-2027 projetée en baisse d'environ 25 % par rapport à 2024-2025. Commande de l'actionnaire : +1,5 M€ de revenus propres d'ici deux saisons.",
    objectifsTitre: "La commande du comité",
    objectifs: ["+1,5 M€ de revenus propres en 2 saisons", "+30 % d'abonnés", "Une audience digitale qui achète", "Une équipe qui utilise l'IA sans risque"],
    contexteTitre: "Le contexte réel de la Ligue 2",
    contexte: [
      { t: "beIN SPORTS est le seul diffuseur de la Ligue 2 jusqu'en 2029.", src: "https://www.tv-direct.fr/actualites/diffusion-ligue-2-chaines-tv-saison-2026-2027/", nom: "TV Direct, 8 août 2026" },
      { t: "Enveloppe ordinaire de droits TV 2026-2027 projetée à 29,2 M€ pour 18 clubs (environ 1,6 M€ en moyenne), environ 25 % de moins qu'en 2024-2025. Document LFP indicatif et provisoire.", src: "https://financemercato.fr/droits-tv-ligue-2-repartition-clubs/", nom: "Finance Mercato, 7 août 2026" }
    ],
    cibles: [
      { nom: "Président et actionnaire", d: "Veulent des revenus propres rapidement, sans dégrader l'image du club." },
      { nom: "Directeur financier", d: "Exige un plan chiffré, un point mort et des risques maîtrisés." },
      { nom: "Supporters", d: "Attachés au club, sensibles au prix et à tout ce qui ressemble à un abonnement de plus." },
      { nom: "Sponsors locaux", d: "Cherchent de la visibilité mesurable et des activations auprès d'un public jeune." },
      { nom: "Équipe marketing", d: "Cinq personnes déjà chargées, qui utilisent l'IA chacune à sa façon." },
      { nom: "Collectivités", d: "Soutiennent l'ancrage local, attentives aux retombées pour le territoire." }
    ],
    charte: {
      couleurs: [["Bleu Nordval", "#1B2A4A"], ["Ambre", "#E8A33D"], ["Brume", "#C9D3DE"], ["Blanc", "#FFFFFF"]],
      ton: "Ambitieux mais lucide, proche des supporters.",
      valeurs: ["Ancrage local", "Transparence", "Exigence"],
      interdits: ["Promettre la montée", "Utiliser l'image des joueurs sans accord", "Présenter un contenu IA comme réel"]
    },
    travail: [
      { t: "Diagnostic sourcé", d: "Forces, faiblesses, signaux faibles. Chaque point marqué « fait » ou « hypothèse »." },
      { t: "Trois scénarios contrastés", d: "Principe, coût estimé, risques, indicateurs de succès, pour chacun." },
      { t: "Journal de chaîne", d: "Les quatre prompts, et ce que vous avez vérifié ou corrigé entre chaque étape." },
      { t: "Auto-audit", d: "Au moins trois erreurs ou hypothèses fragiles repérées dans vos propres sorties." }
    ],
    dureeTravail: 55,
    etape: "Point d'étape en fin de séance : dépôt du diagnostic, des scénarios et du journal. Non noté, mais il entre dans la note finale.",
    seance2: "Séance 2 ({seance2}) : recommandation finale, charte d'usage de l'IA pour l'équipe marketing du club, puis présentation au comité de direction avec questions.",
    bareme: [
      { c: "Diagnostic et fiabilité : sources, faits et hypothèses séparés", p: 4 },
      { c: "Qualité des scénarios et de la recommandation", p: 5 },
      { c: "Chaîne de prompts et esprit critique (journal, audit)", p: 4 },
      { c: "Charte d'usage de l'IA pour l'équipe", p: 4 },
      { c: "Présentation au comité et réponses aux questions", p: 3 }
    ],
    baremeNote: "Note unique sur 20 attribuée à la fin de la séance 2. Barème proposé, ajustable.",
    journal: {
      titre: "Journal de chaîne de prompts",
      etapes: [
        { label: "Étape 1 : diagnostic" },
        { label: "Étape 2 : options", changement: true },
        { label: "Étape 3 : contre-analyse", changement: true },
        { label: "Étape 4 : recommandation", changement: true }
      ],
      changementLabel: "Ce que nous avons vérifié ou corrigé avant cette étape",
      critique: "Auto-audit : erreurs ou hypothèses fragiles repérées"
    }
  },

  /* ---------- Simulateur de comité (séance 2), mécanique Pitchcoach ---------- */
  pitch: {
    titre: "Simulateur de comité de direction",
    lede: "Trois minutes pour convaincre le comité. À mi-parcours, un membre du comité pose une question difficile, et quelqu'un de la cellule doit répondre.",
    duree: 180,
    objectionA: 90,
    roles: ["Ouverture et enjeu", "Diagnostic", "Recommandation", "Plan et indicateurs", "Risques et usage de l'IA"],
    objections: [
      "Le DAF : « Combien ça coûte la première saison, et quand est-ce rentable ? »",
      "Le président : « Pourquoi pas les deux autres scénarios ? »",
      "Un administrateur : « Vos chiffres viennent d'une IA : qui les a vérifiés ? »",
      "Le représentant des supporters : « Encore un abonnement de plus ? »",
      "Le directeur sportif : « Et si on descend en National ? »",
      "La responsable marketing : « Mon équipe a cinq personnes. Qui fait tout ça ? »"
    ],
    origine: "Mécanique reprise de ton appli Pitchcoach : chrono, question tirée au hasard à mi-parcours, personne désignée au hasard pour répondre."
  },

  /* ---------- Battle finale ---------- */
  battle: [
    { q: "Hors de la frontière, selon l'étude Harvard et BCG, l'IA…", options: ["Fait gagner 40 % de temps", "Fait baisser de 19 % les chances de bonne réponse", "Est sans effet", "Est interdite"], bonne: 1 },
    { q: "Quelle étape d'une chaîne fait attaquer la recommandation ?", options: ["Le diagnostic", "Les options", "La contre-analyse", "La synthèse"], bonne: 2 },
    { q: "Qui diffuse la Ligue 2 jusqu'en 2029 ?", options: ["DAZN", "Ligue 1+", "beIN SPORTS", "Canal+ seul"], bonne: 2 },
    { q: "4 200 abonnés à 180 € rapportent…", options: ["1,2 M€", "756 000 €", "420 000 €", "1,8 M€"], bonne: 1 },
    { q: "Un chiffre très précis, sans source, dans une sortie IA, c'est…", options: ["Une preuve", "Une donnée à vérifier avant tout usage", "Un signe de qualité", "Obligatoirement faux"], bonne: 1 },
    { q: "Depuis le 2 août 2026, l'article 50 de l'AI Act porte sur…", options: ["La transparence des contenus générés", "Le prix des abonnements", "Les droits TV", "Le télétravail"], bonne: 0 },
    { q: "Premier réflexe face au livrable IA d'un collaborateur ?", options: ["Le valider", "Demander la méthode et les sources", "Le jeter", "Le faire réécrire par une autre IA"], bonne: 1 },
    { q: "Dans une chaîne, pourquoi relire entre deux étapes ?", options: ["Pour gagner du temps", "Parce qu'une erreur au début contamine toute la suite", "Pour changer d'outil", "Ce n'est pas utile"], bonne: 1 }
  ],

  aRetenir: [
    "L'IA a une frontière irrégulière : excellente sur certaines tâches, trompeuse sur d'autres qui semblent proches.",
    "Une décision se construit en chaîne : diagnostic, options, contre-analyse, recommandation.",
    "Entre deux étapes, le manager garde la main : il vérifie, corrige, tranche.",
    "Faits et hypothèses doivent toujours être séparés.",
    "Un texte bien écrit n'est pas un texte juste : on refait les calculs et on confronte au dossier.",
    "Cadrer l'usage de l'IA d'une équipe est un acte de management, pas une option technique."
  ],

  glossaire: [
    ["Frontière irrégulière", "Limite entre les tâches où l'IA améliore le travail et celles où elle le dégrade. Elle n'est pas intuitive."],
    ["Chaîne de prompts", "Raisonnement découpé en étapes successives, chaque sortie servant d'entrée à la suivante."],
    ["Contre-analyse", "Étape où l'on demande à l'IA d'attaquer sa propre recommandation (« red team »)."],
    ["Fait ou hypothèse", "Distinction à exiger de l'IA : ce qui vient d'une source fournie, et ce qu'elle suppose."],
    ["Triangulation", "Vérifier une information auprès d'au moins deux sources indépendantes."],
    ["Signal faible", "Indice encore discret d'une évolution qui peut devenir importante."],
    ["Scénario prospectif", "Hypothèse cohérente d'évolution, utilisée pour comparer des options."],
    ["Hallucination", "Réponse fausse produite avec assurance."],
    ["Human in the loop", "Un humain valide les étapes importantes avant qu'elles soient exécutées."],
    ["Agent", "IA qui exécute une tâche en plusieurs étapes, avec des outils, sous votre validation."],
    ["Charte d'usage de l'IA", "Règles communes d'une équipe : outils autorisés, données interdites, vérifications, mention de l'IA."],
    ["AI Act", "Règlement européen sur l'IA. Article 50 : obligations de transparence depuis le 2 août 2026."]
  ],

  ressources: [
    { titre: "Fiche méthode : la chaîne de prompts", fichier: "ressources/fiche-chaine-prompts.pdf", type: "PDF", dispo: true },
    { titre: "Dossier Olympique Nordval", fichier: "ressources/dossier-nordval.pdf", type: "PDF", dispo: true },
    { titre: "Grille d'évaluation et barème", fichier: "ressources/grille-evaluation.pdf", type: "PDF", dispo: true },
    { titre: "Glossaire de la séance", fichier: "ressources/glossaire.pdf", type: "PDF", dispo: true }
  ],

  /* Les actus de la page Ressources (sources de la séance) */
  actus: [
    { date: "Septembre 2023", titre: "Navigating the Jagged Technological Frontier (Harvard et BCG)", src: "https://www.hbs.edu/faculty/Pages/item.aspx?num=64700", srcNom: "HBS Working Paper 24-013" },
    { date: "8 août 2026", titre: "Diffusion de la Ligue 2 en 2026-2027", src: "https://www.tv-direct.fr/actualites/diffusion-ligue-2-chaines-tv-saison-2026-2027/", srcNom: "TV Direct" },
    { date: "7 août 2026", titre: "Droits TV de la Ligue 2 : répartition entre les clubs", src: "https://financemercato.fr/droits-tv-ligue-2-repartition-clubs/", srcNom: "Finance Mercato" },
    { date: "9 juillet 2026", titre: "ChatGPT Work", src: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", srcNom: "OpenAI release notes" },
    { date: "12 septembre 2026", titre: "Calendrier de l'AI Act après l'omnibus numérique", src: "https://www.donneespersonnelles.fr/omnibus-numerique-ia", srcNom: "donneespersonnelles.fr" }
  ]
};
