/* =========================================================================
   CONTENU — B3 « IA appliquée à la communication », séance 2.
   Mêmes agences et mêmes scores qu'en séance 1 (config.idEquipes).
   Ouvrir avec ?classe=b3b ou ?classe=b3a.
   ========================================================================= */

window.CONTENT = {

  config: {
    id: "amos-ia-com-s2",
    idEquipes: "amos-ia-com-s1",
    ambiance: "frontales",
    ecole: "AMOS",
    logo: "../moteur/assets/logo-amos.png",
    cours: "IA appliquée à la communication",
    classe: "B3 Bachelor marketing, commercial & événementiel sport",
    seance: "Séance 2 sur 2",
    intervenant: "Frédéric Legrand",
    dateSeance: "Séance de 3h30",
    classes: {
      b3b: { date: "Jeudi 5 novembre 2026, 13h30 – 17h00", debut: "13:30" },
      b3a: { date: "Lundi 23 novembre 2026, 9h00 – 12h30", debut: "9:00" }
    },
    agences: ["Agence 1", "Agence 2", "Agence 3", "Agence 4"],
    equipes: "agences",
    tirageNote: "Les agences de la séance 1 sont conservées : ne refaites le tirage que si la classe a changé."
  },

  videos: {
    s1: { titre: "Du brief au visuel : l'IA au service d'une identité", duree: "4 à 5 min", url: "" }
  },
  videoDebat: {
    question: "L'IA va-t-elle remplacer le graphiste de l'agence ?",
    relances: ["Qu'est-ce que l'IA fait mieux, plus vite, moins cher ?", "Qu'est-ce qu'elle ne sait pas faire : une identité, un parti pris, une validation ?", "Quel métier ferez-vous dans une agence en 2028 ?"],
    minutes: 8
  },

  parcours: [
    { id: "accueil", heure: "13:30", duree: 10, titre: "Le client revient", sous: "Agences et brief du jour" },
    { id: "video", heure: "13:40", duree: 20, titre: "Vidéo et débat", sous: "Du brief au visuel",
      lede: "Cinq minutes sur la création visuelle avec l'IA, puis un débat : le graphiste a-t-il encore un avenir ?" },
    { id: "outils", type: "fiches", data: "outilsVisuels", heure: "14:00", duree: 25, titre: "Image, vidéo, motion", sous: "Démonstration",
      lede: "Ce que les outils savent faire en 2026, en démonstration : image, retouche, mise en page, vidéo et motion design." },
    { id: "prompt", heure: "14:25", duree: 35, titre: "Le prompt visuel", sous: "Décrire une image",
      lede: "Un visuel se décrit comme un plan de photographe : sujet, style, composition, lumière, contraintes. Trois défis, puis la battle visuelle." },
    { id: "pause", heure: "15:00", duree: 15, titre: "Pause", sous: "Ravitaillement" },
    { id: "coherence", type: "tri", data: "coherence", heure: "15:15", duree: 15, titre: "Cohérence de marque", sous: "Conforme ou à corriger ?",
      lede: "L'IA produit vite, mais pas forcément dans la charte. Huit visuels générés pour le CITANUIT : on les garde ou on les corrige ?" },
    { id: "cas", heure: "15:30", duree: 55, titre: "Le mini-kit CITANUIT", sous: "Atelier final",
      lede: "Le brief imposé est tombé. Une affiche, trois posts, un mail sponsor, un storyboard : votre mini-kit, validé avant d'être présenté." },
    { id: "pitch", type: "pitch", heure: "16:25", duree: 25, titre: "Pitch devant le client", sous: "3 minutes par agence",
      lede: "Chaque agence présente son mini-kit au client. À mi-parcours, il pose une question, et quelqu'un de l'agence doit répondre." },
    { id: "final", heure: "16:50", duree: 10, titre: "Le client choisit", sous: "Classement et à retenir",
      lede: "Le client désigne son agence. Le classement cumule les deux séances." }
  ],

  /* ---------- Panorama des outils visuels (démonstration) ---------- */
  outilsVisuels: {
    intro: "Démonstration par l'intervenant avec ses comptes. Les étudiants travaillent ensuite sur des outils gratuits, dont les limites changent souvent.",
    items: [
      { sigle: "IMG", titre: "Générer une image", sous: "Midjourney, Adobe Firefly, ChatGPT, Gemini, Copilot",
        points: ["Du texte à l'image : affiches, visuels de posts, ambiances.", "Retouche : changer un fond, une couleur, ajouter un élément.", "Limite connue : le texte écrit dans l'image est souvent déformé. On l'ajoute après, dans un outil de mise en page."],
        exemple: "Démonstration : la même consigne dans deux outils, puis comparaison avec la charte CITANUIT." },
      { sigle: "PAGE", titre: "Mettre en page", sous: "Canva et ses fonctions IA",
        points: ["Composer l'affiche : visuel, accroche, logo, informations pratiques.", "Décliner un même visuel en formats : post carré ou 4:5, story 9:16, bannière.", "Garder une charte : couleurs et typographies enregistrées."] },
      { sigle: "VID", titre: "Générer une vidéo", sous: "Veo, Kling, Runway",
        points: ["Quelques secondes de vidéo à partir d'un texte ou d'une image.", "Utile pour un teaser ou une ambiance, pas pour filmer le vrai événement.", "Sora (OpenAI) a fermé en 2026 : ne pas bâtir son flux sur un seul outil."] },
      { sigle: "MOT", titre: "Animer un visuel", sous: "Motion design et montage",
        points: ["Animer une affiche fixe : texte qui apparaît, halo de lampe frontale qui bouge.", "Monter un reel de 15 secondes : plans, rythme, musique libre de droits, sous-titres.", "Le storyboard d'abord : on décide des plans avant de générer."],
        exemple: "Démonstration de l'intervenant : de l'affiche CITANUIT à un reel animé." },
      { sigle: "!", titre: "Les règles", sous: "Ce qu'un visuel IA ne doit jamais faire",
        points: ["Pas de logo de marque ni de personne réelle reconnaissable.", "Pas de visuel IA présenté comme une photo de l'événement réel.", "Mention de l'IA quand le visuel pourrait tromper (AI Act, article 50).", "Vérifier les biais : âges, genres, corps, diversité."] }
    ]
  },

  /* ---------- Prompt visuel (gabarit « prompt ») ---------- */
  blocs: [
    { k: "sujet", nom: "Sujet", aide: "Qui, quoi, où ?", ex: "Un groupe de coureurs de tous âges, de nuit, sur les pavés du Vieux-Lille, lampes frontales allumées." },
    { k: "style", nom: "Style", aide: "Photo, illustration, rendu.", ex: "Photographie de reportage sportif, réaliste, légère profondeur de champ." },
    { k: "composition", nom: "Composition", aide: "Cadrage, point de vue, place du texte.", ex: "Plan large en légère contre-plongée, coureurs à gauche, espace libre en haut à droite pour le titre." },
    { k: "lumiere", nom: "Lumière et couleurs", aide: "La charte en images.", ex: "Nuit bleu profond (#14213D), halos jaune chaud des frontales (#FFC93C), reflets sur les pavés." },
    { k: "contraintes", nom: "Contraintes", aide: "Ce qu'on ne veut pas, le format.", ex: "Format 4:5. Aucun texte dans l'image, aucun logo de marque, pas de visage reconnaissable au premier plan." }
  ],
  blocsNote: "Même logique qu'en séance 1 : rien d'implicite. Pour une image, le format et ce qu'on ne veut pas comptent autant que le sujet.",
  iterations: [
    { v: "V1", prompt: "Une affiche pour un trail de nuit à Lille.", probleme: "L'IA choisit tout : jour ou nuit, style, couleurs, et elle écrit un texte déformé dans l'image." },
    { v: "V2", prompt: "Photo réaliste de coureurs de nuit dans le Vieux-Lille, lampes frontales, ambiance bleu nuit et jaune.", probleme: "L'ambiance est là, mais pas de place pour le titre, et les coureurs se ressemblent tous." },
    { v: "V3", prompt: "V2 + « coureurs de tous âges et morphologies, plan large, espace libre en haut à droite, format 4:5, aucun texte, aucun logo ». Le titre est ajouté ensuite dans l'outil de mise en page.", probleme: "Un visuel exploitable, dans la charte, prêt pour la mise en page." }
  ],
  techniques: [
    { t: "La référence de style", d: "Décrire un style plutôt que copier une œuvre ou un photographe." },
    { t: "Le négatif", d: "Dire ce qu'on ne veut pas : texte, logo, foule floue, visages déformés." },
    { t: "Le format", d: "4:5 pour un post, 9:16 pour une story : à préciser dès le départ." },
    { t: "La série", d: "Réutiliser la même description de lieu et de lumière pour que les visuels se ressemblent." },
    { t: "Le texte à part", d: "Le titre et les infos pratiques s'ajoutent dans l'outil de mise en page, jamais dans l'image." }
  ],
  defisNote: "Outils gratuits au choix (ChatGPT, Gemini, Copilot, Adobe Firefly, Canva). Les limites gratuites varient : si un outil bloque, passez à un autre.",
  defis: [
    { n: 1, titre: "Le visuel de l'affiche", min: 7, consigne: "Générez le visuel principal en trois itérations, en suivant la charte. Gardez les trois prompts pour le journal." },
    { n: 2, titre: "La série de posts", min: 7, consigne: "Trois visuels qui se ressemblent : même lieu, même lumière, trois moments (départ, course, arrivée)." },
    { n: 3, titre: "Le format story", min: 5, consigne: "Déclinez le visuel principal en 9:16 sans perdre la composition." }
  ],

  /* ---------- Tri : cohérence de marque ---------- */
  coherence: {
    intro: "Rappel de la charte : nuit, frontale, brique, pavé ; ton complice et inclusif ; ni promesse de performance, ni jargon, ni corps stéréotypés.",
    categories: [{ k: "ok", label: "Conforme" }, { k: "ko", label: "À corriger" }],
    items: [
      { t: "Affiche bleu nuit, halos jaunes de frontales, titre en typographie épaisse", cat: "ok", why: "Couleurs et ambiance de la charte." },
      { t: "Visuel de coureurs en plein soleil sur une plage", cat: "ko", why: "C'est un trail nocturne en ville : contresens complet." },
      { t: "Groupe de coureurs : uniquement des hommes jeunes et très minces", cat: "ko", why: "Biais classique de l'IA, contraire à une cible inclusive." },
      { t: "Titre généré dans l'image : « CITANIUT Trial »", cat: "ko", why: "Texte déformé par l'IA. Le titre s'ajoute dans la mise en page." },
      { t: "Une marque de chaussures connue bien visible au premier plan", cat: "ko", why: "Logo de marque : problème de droits et faux partenariat." },
      { t: "Famille avec un enfant au village d'arrivée, guirlandes lumineuses", cat: "ok", why: "Cible famille, ambiance nocturne, ton complice." },
      { t: "Post : « Pulvérisez votre record ! »", cat: "ko", why: "Promesse de performance : interdite par la charte, et elle exclut les néo-coureurs." },
      { t: "Légende : « Visuel créé avec l'IA »", cat: "ok", why: "Transparence : bonne pratique, et parfois obligation." }
    ]
  },

  /* ---------- Atelier final : le mini-kit ---------- */
  client: {
    nom: "CITANUIT Trail Lille",
    accroche: "La ville s'éteint, les frontales s'allument.",
    avertissement: "Événement et client fictifs, créés pour le cours.",
    arrivee: "Le brief du mini-kit tombe à {heure:cas}",
    teaser: "Le client a lu vos personas et vos plateformes de message. Il passe commande : un mini-kit pour lancer les inscriptions. Il choisira son agence à {heure:final}.",
    seance2Kicker: "Fin du module",
    seance2Titre: "Le client a choisi",
    onglets: ["Le brief imposé", "Les cibles", "La charte", "Le kit à produire", "La grille", "Journal de la séance"],
    fiche: [
      ["Commande", "Campagne d'ouverture des inscriptions"],
      ["Cible prioritaire", "Néo-coureurs de 20 à 35 ans, puis familles"],
      ["Message", "Une course pour tous, une expérience à vivre ensemble, de nuit, dans la ville"],
      ["Date et lieu", "Samedi 18 septembre 2027, départ 20h30, Citadelle et Vieux-Lille"],
      ["Formats", "10 km, 21 km, course enfants de 2 km"],
      ["Contrainte du client", "Aucun visuel IA présenté comme une photo de l'édition 2026"],
      ["Rendu", "Le mini-kit présenté au client à {heure:pitch}"]
    ],
    objectifsTitre: "Ce que le client veut voir",
    objectifs: ["Un kit cohérent avec la charte", "Des néo-coureurs qui se reconnaissent", "Des informations exactes", "Une agence qui sait dire comment elle a utilisé l'IA"],
    cibles: [
      { nom: "Néo-coureurs 20–35 ans", d: "Priorité de la campagne. Courent un peu, jamais fait de course officielle." },
      { nom: "Familles", d: "Course enfants, village d'arrivée, horaires." },
      { nom: "Sponsors locaux", d: "Visibilité, activation, image jeune et urbaine." }
    ],
    charte: {
      couleurs: [["Nuit", "#14213D"], ["Frontale", "#FFC93C"], ["Brique", "#B5452B"], ["Pavé", "#8A8F98"], ["Lueur", "#F4F7FB"]],
      ton: "Complice, nocturne, inclusif. Jamais élitiste.",
      valeurs: ["Lumière", "Ville", "Collectif"],
      interdits: ["Promesse de performance", "Jargon de coureur", "Visuels de corps stéréotypés", "Logos de marques", "Texte généré dans l'image"]
    },
    travail: [
      { t: "Une affiche", d: "Visuel IA dans la charte, titre et infos pratiques ajoutés en mise en page." },
      { t: "Trois posts", d: "Une série cohérente (départ, course, arrivée), avec leurs textes." },
      { t: "Un mail sponsor", d: "Une demi-page, ton professionnel, une proposition claire." },
      { t: "Un storyboard vidéo", d: "Un reel de 15 secondes en 6 plans : image, texte, durée." }
    ],
    dureeTravail: 45,
    etape: "Avant de pitcher, chaque agence passe sa checklist : charte, exactitude, biais, droits, mention de l'IA. Un kit non vérifié perd des points.",
    seance2: "Fin du module. Le journal des deux séances et le mini-kit sont déposés pour la note finale.",
    bareme: [
      { c: "Journal de prompts et qualité de l'itération (séances 1 et 2)", p: 5 },
      { c: "Stratégie : personas et plateforme de message (séance 1)", p: 4 },
      { c: "Mini-kit : qualité et adaptation aux cibles", p: 5 },
      { c: "Cohérence graphique et respect du brief", p: 3 },
      { c: "Regard critique et conformité (mention IA, droits, RGPD)", p: 3 }
    ],
    baremeNote: "Note unique sur 20, attribuée à la fin de cette séance.",
    journal: {
      titre: "Journal de la séance 2",
      champ: "Notre prompt",
      etapes: [
        { label: "Visuel de l'affiche : version finale" },
        { label: "Série de posts", changement: true },
        { label: "Storyboard du reel (6 plans)", changement: true }
      ],
      changementLabel: "Ce que nous avons corrigé pour respecter la charte",
      critique: "Checklist : ce que nous avons vérifié (charte, exactitude, biais, droits, mention IA)"
    }
  },

  /* ---------- Pitch devant le client ---------- */
  pitch: {
    titre: "Pitch devant le client",
    lede: "Trois minutes pour présenter le mini-kit. À mi-parcours, le client pose une question, et quelqu'un de l'agence doit y répondre.",
    duree: 180,
    objectionA: 90,
    roles: ["Le parti pris créatif", "L'affiche", "Les posts et le reel", "Le mail sponsor", "Comment nous avons utilisé l'IA"],
    objections: [
      "« Ce visuel, c'est une vraie photo ou c'est l'IA ? Mes coureurs vont le demander. »",
      "« Pourquoi ces couleurs-là ? »",
      "« Les néo-coureurs, vous êtes sûrs qu'ils se reconnaissent là-dedans ? »",
      "« Combien de temps vous a pris ce kit, honnêtement ? »",
      "« Et si un sponsor veut voir son logo sur l'affiche ? »",
      "« Qu'est-ce que vous avez corrigé après l'IA ? »"
    ],
    origine: "Mécanique reprise de ton appli Pitchcoach : chrono, question tirée au hasard à mi-parcours, personne désignée au hasard pour répondre."
  },

  battle: [
    { q: "Où ajoute-t-on le titre d'une affiche générée par IA ?", options: ["Dans le prompt", "Dans l'outil de mise en page", "Nulle part", "Dans la légende"], bonne: 1 },
    { q: "Quel format pour une story ?", options: ["1:1", "4:5", "9:16", "16:9"], bonne: 2 },
    { q: "Des coureurs tous jeunes et minces sur un visuel IA, c'est…", options: ["Un choix de style", "Un biais à corriger", "Obligatoire", "Sans importance"], bonne: 1 },
    { q: "Peut-on montrer un logo de marque connue sur un visuel IA de l'événement ?", options: ["Oui", "Non : droits et faux partenariat", "Oui, s'il est petit", "Oui, en story"], bonne: 1 },
    { q: "Pour qu'une série de posts se ressemble, on…", options: ["Change d'outil à chaque post", "Garde la même description de lieu et de lumière", "Ajoute des émojis", "Utilise des couleurs différentes"], bonne: 1 },
    { q: "Avant de générer une vidéo, on fait d'abord…", options: ["Le montage", "Le storyboard", "La musique", "Les sous-titres"], bonne: 1 },
    { q: "Quel outil vidéo d'OpenAI a fermé en 2026 ?", options: ["Sora", "DALL·E", "Whisper", "Codex"], bonne: 0 },
    { q: "Un visuel IA présenté comme une photo de l'édition 2026, c'est…", options: ["Astucieux", "Trompeur, et refusé par le client", "Obligatoire", "Plus rapide"], bonne: 1 }
  ],

  aRetenir: [
    "Un visuel se prompte comme un plan photo : sujet, style, composition, lumière, contraintes.",
    "Le texte ne va jamais dans l'image : on l'ajoute en mise en page.",
    "La charte se vérifie à chaque visuel : couleurs, ton, interdits.",
    "L'IA a des biais visuels : âges, genres, corps. On les corrige.",
    "Pas de logo, pas de personne réelle, pas de faux reportage.",
    "Le storyboard avant la vidéo : on décide, puis on génère."
  ],

  glossaire: [
    ["Prompt visuel", "Description d'une image : sujet, style, composition, lumière, contraintes."],
    ["Prompt négatif", "Ce qu'on ne veut pas voir dans l'image."],
    ["Ratio", "Proportion d'une image : 1:1, 4:5 (post), 9:16 (story), 16:9 (vidéo horizontale)."],
    ["Charte graphique", "Règles visuelles d'une marque : couleurs, typographies, ton, interdits."],
    ["Mise en page", "Assemblage du visuel, du texte et du logo dans un format final."],
    ["Storyboard", "Suite de plans dessinés ou décrits avant de produire une vidéo."],
    ["Motion design", "Animation de visuels et de textes."],
    ["Reel", "Vidéo verticale courte pour les réseaux sociaux."],
    ["Biais visuel", "Stéréotypes reproduits par l'IA dans les images (âge, genre, corps)."],
    ["Deepfake", "Contenu généré qui imite une personne ou un fait réel ; à signaler (AI Act)."]
  ],

  ressources: [
    { titre: "Fiche méthode : le prompt visuel", fichier: "ressources/fiche-prompt-visuel.pdf", type: "PDF", dispo: true },
    { titre: "Brief du mini-kit et charte CITANUIT", fichier: "ressources/brief-mini-kit.pdf", type: "PDF", dispo: true },
    { titre: "Checklist de validation d'un visuel IA", fichier: "ressources/checklist-visuel-ia.pdf", type: "PDF", dispo: true }
  ],

  actus: [
    { date: "24 mars 2026", titre: "OpenAI ferme Sora", src: "https://engadget.com/ai/openai-is-shutting-down-its-sora-video-generation-app-211023358.html", srcNom: "Engadget" },
    { date: "12 septembre 2026", titre: "Calendrier de l'AI Act après l'omnibus numérique", src: "https://www.donneespersonnelles.fr/omnibus-numerique-ia", srcNom: "donneespersonnelles.fr" }
  ]
};
