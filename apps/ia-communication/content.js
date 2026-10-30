/* =========================================================================
   CONTENU DE L'APPLICATION — tout le texte modifiable est ici.
   Fred : tu peux éditer ce fichier sans toucher au reste.
   ========================================================================= */

window.CONTENT = {

  /* ---------- Réglages généraux ---------- */
  config: {
    id: "amos-ia-com-s1",          // identifiant de sauvegarde locale (unique par appli)
    ambiance: "frontales",
    ecole: "AMOS",
    logo: "../moteur/assets/logo-amos.png",
    cours: "IA appliquée à la communication",
    classe: "B3 Bachelor marketing, commercial & événementiel sport",
    seance: "Séance 1 sur 2",
    intervenant: "Frédéric Legrand",
    dateSeance: "Lundi 2 novembre 2026, 9h00 – 12h30",
    // Adaptation par classe : ouvrir l'appli avec ?classe=b3a ou ?classe=b3b
    // date affichée, heure de début (les horaires du parcours sont recalculés) et variables de texte
    classes: {
      b3b: { date: "Lundi 2 novembre 2026, 9h00 – 12h30", debut: "9:00", variables: { seance2: "jeudi 5 novembre, après-midi" } },
      b3a: { date: "Mardi 3 novembre 2026, 13h30 – 17h00", debut: "13:30", variables: { seance2: "lundi 23 novembre, matin" } }
    },
    variables: { seance2: "date à venir" },   // valeur par défaut sans ?classe=
    agences: ["Agence 1", "Agence 2", "Agence 3", "Agence 4"],
    equipes: "agences",
    tirageNote: "Mêmes agences jusqu'au pitch de la séance 2."
  },

  /* ---------- Vidéos NotebookLM (colle l'URL YouTube, Drive ou .mp4) ---------- */
  videos: {
    s1: {
      titre: "De l'IA passive à l'IA active",
      duree: "3 min",
      url: "https://youtu.be/GjL48ZArdU0"
    }
  },

  /* ---------- Le parcours de la séance (horaires = checkpoints) ---------- */
  parcours: [
    { id: "accueil",   heure: "9:00",  duree: 10, titre: "Départ",                     sous: "Agences et brief teaser" },
    { id: "iahumain",  heure: "9:10",  duree: 20, titre: "IA ou humain ?",             sous: "Le jeu d'ouverture", lede: "Six contenus de sport. Pour chacun : IA ou humain ? Votez à main levée, puis révélez. Une agence qui a juste marque un point." },
    { id: "video",     heure: "9:30",  duree: 20, titre: "Vidéo et quiz flash",        sous: "De l'IA qui répond à l'IA qui agit", lede: "Trois minutes pour comprendre la rupture de l'année, puis six questions éclair et une question bonus. Chaque bonne réponse rapporte un point à l'agence la plus rapide." },
    { id: "rupture",   heure: "9:50",  duree: 25, titre: "Rupture 2026",               sous: "L'escalier de l'autonomie", lede: "Jusqu'ici, l'IA répondait. En 2026, elle exécute. La question n'est plus « quel prompt ? » mais « jusqu'où je lui donne la main ? »." },
    { id: "panorama",  heure: "10:15", duree: 10, titre: "Outils et actus",            sous: "Ce qui a changé cette année", lede: "Les outils changent tous les trois mois. Ce qui reste : savoir choisir selon le besoin, le coût, les droits et la confidentialité." },
    { id: "prompt",    heure: "10:25", duree: 30, titre: "Prompt engineering",         sous: "Méthode, défis, battle", lede: "Le cœur de la séance. Une méthode simple, une démonstration d'itération, trois défis chronométrés sur vos outils gratuits, puis la battle." },
    { id: "pause",     heure: "10:55", duree: 15, titre: "Pause",                      sous: "Ravitaillement" },
    { id: "critique",  heure: "11:10", duree: 20, titre: "Regard critique",            sous: "Droit, biais, bad buzz", lede: "Produire avec l'IA, c'est facile. Savoir ce qu'on a le droit de publier, et ce qui va faire rire tout le réseau, c'est le métier." },
    { id: "cas",       heure: "11:30", duree: 45, titre: "Fil rouge CITANUIT",         sous: "Partie 1 en agence", lede: "Votre client arrive. Partie 1 aujourd'hui : stratégie et prompts. Partie 2, {seance2} : le mini-kit et le pitch." },
    { id: "final",     heure: "12:15", duree: 15, titre: "Battle finale",              sous: "À retenir et suite", lede: "Huit questions sur toute la séance. L'agence qui lève la main la première et répond juste prend le point." }
  ],

  /* ---------- Jeu « IA ou humain ? » ----------
     Remplace chaque emplacement par un vrai visuel (dépose-le dans assets/)
     ou un texte. reponse : "ia" ou "humain". */
  iaHumain: [
    { type: "image", src: "assets/iahumain/1-tribune.jpg", legende: "Visuel 1 : une tribune de supporters du LOSC", reponse: "ia", indice: "Textes déformés sur les écharpes et les drapeaux, un loup à la place du dogue lillois, une foule trop homogène." },
    { type: "image", src: "assets/iahumain/2-frontale.jpg", legende: "Visuel 2 : une traileuse de nuit à la frontale", reponse: "humain", indice: "Vraie lumière de flash, ombres cohérentes, bois et sol imparfaits : une photo prise sur place." },
    { type: "image", src: "assets/iahumain/3-affiche-club.jpg", legende: "Visuel 3 : l'affiche d'un club de trail", reponse: "ia", indice: "Rendu trop parfait, typographie « pinceau » générique, visages lisses, décor de carte postale." },
    { type: "image", src: "assets/iahumain/4-article.jpg", legende: "Visuel 4 : un article de presse sur un trail à Chamonix", reponse: "humain", indice: "Un média, un athlète nommé, une date : tout se vérifie en deux clics. C'est ce réflexe qu'on veut." },
    { type: "image", src: "assets/iahumain/5-course-lac.jpg", legende: "Visuel 5 : une course en montagne au-dessus d'un lac", reponse: "ia", indice: "Lumière idéale partout, dossards tous identiques, coureurs clonés au second plan." },
    { type: "image", src: "assets/iahumain/6-village.jpg", legende: "Visuel 6 : un coureur acclamé dans un village de montagne", reponse: "humain", indice: "Des dizaines de visages et de mains nets et tous différents, des téléphones, des détails imparfaits : une vraie photo de presse." }
  ],

  /* Vidéo de clôture du jeu : fichier de Fred lu depuis son PC (non publié en ligne, droits RTBF). */
  iaHumainVideo: {
    titre: "Pour finir : un photojournaliste fait le test",
    intro: "Un photojournaliste chevronné face à des photos réelles et générées par IA. Regardez ce qui le trompe, ce qui le sauve, et ce que ça lui fait.",
    fichier: "testphotojournaliste.mp4, 2 min 38, dans Documents/AMOS",
    source: "Source : RTBF, « Réalité ou IA ? Un photojournaliste fait le test ». Projetée en classe, non diffusée en ligne.",
    minutes: 5,
    questions: [
      "Il a des décennies de métier et il hésite. Que vaut notre œil à nous ?",
      "Ses indices : les cheveux, la lumière, le reflet d'un flash. Lesquels marcheront encore dans un an ?",
      "« Le mensonge va devenir la référence. » D'accord ou pas ? Qu'est-ce qui peut garder des repères communs : sources, mention IA, loi ?",
      "Vous êtes chargé de com : publiez-vous un visuel IA réaliste sans le dire ? (On y revient à {heure:critique}.)"
    ]
  },

  /* ---------- Quiz flash après la vidéo ---------- */
  /* Quiz aligné sur la vidéo « De l'IA passive à l'IA active » (version de Fred, 27/10/2026).
     bonus: true = question hors vidéo ; complement = ce que l'intervenant ajoute à l'oral. */
  quizFlash: [
    { q: "LLM signifie…", options: ["Large Language Model", "Logiciel de Langage Multiple", "Learning Logic Machine", "Long Language Memory"], bonne: 0,
      explication: "Un grand modèle de langage : il génère du texte à partir de ce qu'il a appris et du contexte qu'on lui donne.",
      complement: "ChatGPT, Claude, Gemini, Le Chat ou Copilot reposent tous sur un LLM." },
    { q: "Une « hallucination » d'IA, c'est…", options: ["Un bug qui fait planter l'outil", "Une information inventée ou une erreur donnée avec aplomb", "Une image trop colorée", "Une réponse refusée par l'IA"], bonne: 1,
      explication: "Une réponse convaincante n'est pas forcément vraie. D'où la règle : chaque date, chaque chiffre se vérifie." },
    { q: "Pour le CITANUIT, quelle est la différence entre un assistant et un agent ?", options: ["Aucune, c'est le même outil", "L'assistant rédige un texte ; l'agent s'organise et exécute toute une mission", "L'agent est gratuit, l'assistant payant", "L'assistant fait les visuels, l'agent les textes"], bonne: 1,
      explication: "L'assistant répond : un post. L'agent enchaîne : il analyse le brief, prépare trois publications, propose les visuels et range le tout dans un dossier.",
      complement: "Exemples d'agents en 2026 : ChatGPT Work, lancé le 9 juillet 2026, et Claude Cowork." },
    { q: "Un skill, c'est…", options: ["Un abonnement premium", "Un mode d'emploi réutilisable : ton, règles, formats, contrôles qualité", "Un plugin de réseau social", "Une note attribuée à l'IA"], bonne: 1,
      explication: "On formalise une fois la méthode, l'agent la réapplique : cohérence et temps gagné.",
      complement: "Sur Claude, les skills sont disponibles sur toutes les offres, y compris gratuite, avec l'exécution de code activée." },
    { q: "Sur l'escalier de l'autonomie, la troisième marche, ce sont…", options: ["Les fichiers", "Les connecteurs vers des applications autorisées", "Le chat", "L'agent"], bonne: 1,
      explication: "Chat, puis fichiers, puis connecteurs (mail, stockage, agenda), puis l'agent qui combine les trois.",
      complement: "Le chat seul a des limites d'import de fichiers, qui changent souvent selon les offres : l'agent, lui, travaille directement dans un dossier." },
    { q: "Plus l'agent agit seul…", options: ["Moins il faut vérifier", "Plus la validation humaine est indispensable", "Plus il devient responsable du résultat", "Plus il coûte cher"], bonne: 1,
      explication: "On gère les accès, on vérifie les choix et les droits à l'image, on approuve. L'humain reste responsable du résultat." },
    { q: "Avant de confier les 1 300 photos du CITANUIT à un agent, on…", options: ["Lui donne accès à tout l'ordinateur", "Travaille dans un dossier dédié, avec une sauvegarde", "Supprime les originaux pour gagner de la place", "Le laisse publier directement"], bonne: 1, bonus: true,
      explication: "Un dossier dédié plutôt que tout l'ordinateur, une sauvegarde avant toute action en masse, une validation avant de publier.",
      complement: "Jamais de données personnelles sensibles (liste des inscrits, certificats médicaux) dans un outil non validé." }
  ],

  /* ---------- Rupture 2026 : l'escalier de l'autonomie ---------- */
  marches: [
    { n: 1, titre: "Chat",                    fait: "Répond et rédige à partir de ce que vous tapez.",                         ex: "Écrire le post d'annonce du CITANUIT." },
    { n: 2, titre: "Chat + fichiers",         fait: "Analyse quelques documents que vous envoyez (copies).",                  ex: "Résumer le règlement de course en PDF." },
    { n: 3, titre: "Chat + connecteurs",      fait: "Va chercher dans vos outils : mail, Drive, agenda.",                     ex: "Faire le point sur tous les échanges avec le sponsor." },
    { n: 4, titre: "Agent avec accès dossier", fait: "Agit dans vos fichiers, enchaîne les étapes, travaille dans la durée.", ex: "Renommer et classer 1 300 photos de course." }
  ],
  marchesOutils: "Marche 4 en 2026 : ChatGPT Work (9 juillet 2026, offres payantes hors Free et Go), Claude Cowork (janvier 2026 sur ordinateur, offres payantes Pro, Max et Enterprise), Codex et Claude Code côté développement.",

  quelleMarcheIntro: "Huit tâches du CITANUIT. Pour chacune, la classe choisit une marche, puis on révèle.",
  quelleMarche: [
    { t: "Trouver 10 idées de slogan pour la course", m: 1, why: "Rien à lire, rien à aller chercher : un simple chat suffit." },
    { t: "Résumer le règlement de course (PDF de 12 pages)", m: 2, why: "Un document à envoyer, une analyse : chat + fichier." },
    { t: "Comparer les cahiers des charges de 2 sponsors", m: 2, why: "Deux PDF, on reste sous les limites d'import." },
    { t: "Retrouver tous les mails du sponsor principal et faire le point", m: 3, why: "Les données vivent dans la boîte mail : il faut un connecteur." },
    { t: "Préparer le planning bénévoles à partir de l'agenda partagé", m: 3, why: "Lecture de l'agenda via connecteur, puis rédaction." },
    { t: "Renommer et classer les 1 300 photos de l'édition 2026", m: 4, why: "Travail en masse dans le vrai dossier. En chat, il faudrait zipper, envoyer puis tout retélécharger (faisable avec l'exécution de code, mais hors de vos fichiers)." },
    { t: "Chaque lundi, compiler les inscriptions et envoyer un rapport", m: 4, why: "Tâche programmée et répétée : c'est le terrain des agents." },
    { t: "Réécrire un post trop long en version story", m: 1, why: "Copier-coller le texte suffit." }
  ],

  limites: [
    { outil: "Claude", val: "20 fichiers par conversation, 500 Mo par fichier", src: "https://support.claude.com/en/articles/8241126-upload-files-to-claude" },
    { outil: "ChatGPT gratuit", val: "3 fichiers importés par jour", src: "https://help.openai.com/en/articles/8555545-file-uploads-faq" },
    { outil: "ChatGPT payant", val: "jusqu'à 80 fichiers toutes les 3 heures (réduit aux heures de pointe)", src: "https://help.openai.com/en/articles/8555545-file-uploads-faq" }
  ],

  securite: [
    { t: "Un dossier dédié plutôt que tout le PC", d: "Principe du moindre privilège : l'agent n'accède qu'à ce dont il a besoin." },
    { t: "Une sauvegarde avant toute action en masse", d: "Renommer 1 300 fichiers, ça se rate aussi en masse." },
    { t: "Valider avant d'agir", d: "Sur Claude, supprimer des fichiers exige une autorisation explicite. C'est le bon réflexe." },
    { t: "Pas de données sensibles", d: "Inscrits, certificats médicaux, coordonnées : RGPD d'abord." }
  ],

  /* ---------- Panorama des outils 2026 ---------- */
  panorama: [
    { usage: "Texte",         outils: ["ChatGPT", "Claude", "Gemini", "Le Chat (Mistral)", "Copilot"], note: "Rédaction, synthèse, idéation, reformulation." },
    { usage: "Image",         outils: ["Midjourney", "Adobe Firefly", "Canva"], note: "Visuels, déclinaisons, retouches. Attention aux droits et à la cohérence de charte." },
    { usage: "Vidéo",         outils: ["Veo 3 (Google)", "Kling 3.0", "Runway Gen-4"], note: "Sora (OpenAI) a fermé le 24 mars 2026." },
    { usage: "Présentation",  outils: ["Gamma"], note: "Deck généré à partir d'un plan ou d'un document." },
    { usage: "Synthèse de sources", outils: ["NotebookLM"], note: "La vidéo de tout à l'heure en sort." },
    { usage: "Agents",        outils: ["ChatGPT Work", "Claude Cowork", "Codex", "Claude Code"], note: "L'IA qui exécute : fichiers, connecteurs, tâches programmées." }
  ],
  panoramaCriteres: ["Le besoin", "Le coût", "Les droits sur ce qui est produit", "La confidentialité des données"],

  /* ---------- Actus vérifiées (date + source) ---------- */
  actus: [
    {
      date: "2 août 2026", tag: "Droit",
      titre: "L'AI Act impose la transparence des contenus IA",
      texte: "L'article 50 s'applique : étiquetage des deepfakes, information quand on parle à un chatbot, marquage des contenus synthétiques. Seul le marquage lisible par machine a un délai au 2 décembre 2026, pour les systèmes sortis avant le 2 août. L'omnibus numérique reporte le « haut risque » au 2 décembre 2027, pas l'article 50.",
      question: "Un visuel IA du CITANUIT doit-il porter une mention ?",
      src: "https://www.donneespersonnelles.fr/omnibus-numerique-ia", srcNom: "donneespersonnelles.fr (mis à jour le 12/09/2026)"
    },
    {
      date: "24 mars 2026", tag: "Outils",
      titre: "OpenAI ferme Sora",
      texte: "L'application de vidéo IA ferme le 26 avril, l'API le 24 septembre. Le marché se partage entre Veo 3, Kling 3.0 et Runway Gen-4.",
      question: "Que se passe-t-il si tout votre flux vidéo reposait sur un seul outil ?",
      src: "https://engadget.com/ai/openai-is-shutting-down-its-sora-video-generation-app-211023358.html", srcNom: "Engadget"
    },
    {
      date: "Juillet 2026", tag: "Agents",
      titre: "ChatGPT Work et Claude Cowork : l'IA qui exécute",
      texte: "ChatGPT Work arrive le 9 juillet (offres payantes hors Free et Go). Claude Cowork, lancé en janvier sur ordinateur pour les offres payantes, passe sur web et mobile le 7 juillet. Sur 1,2 million de sessions Cowork, la création de contenu pèse 16,4 %, le développement 8,7 %.",
      question: "Quelles tâches de votre stage pourriez-vous déléguer à un agent ?",
      src: "https://venturebeat.com/technology/anthropic-brings-claude-cowork-to-mobile-and-web-as-usage-data-shows-most-users-arent-coding", srcNom: "VentureBeat, OpenAI release notes"
    },
    {
      date: "Déc. 2025 → 2026", tag: "Skills",
      titre: "Les skills deviennent un standard",
      texte: "Anthropic publie les Agent Skills en standard ouvert (décembre 2025). Sur Claude, ils sont accessibles y compris en gratuit. ChatGPT généralise ses Skills avec ChatGPT Work en juillet 2026.",
      question: "Quelle méthode de votre métier mériterait d'être écrite une fois pour toutes ?",
      src: "https://support.claude.com/en/articles/12512180-use-skills-in-claude", srcNom: "Centre d'aide Claude, OpenAI release notes"
    },
    {
      date: "Juin–juillet 2026", tag: "Pub",
      titre: "Coupe du monde : l'IA dans les pubs, et contre",
      texte: "Adidas ajoute un Beckham par IA, jugé discret et réussi. Coca-Cola et Pepsi sont critiqués pour des plans IA génériques. Lego fait campagne sans IA : #HonestlyItsnotai.",
      question: "« Sans IA » devient-il un argument marketing ?",
      src: "https://www.creativebloq.com/design/advertising/the-good-the-bad-and-the-ai-of-world-cup-2026-adverts", srcNom: "Creative Bloq"
    },
    {
      date: "Août 2026", tag: "Fans",
      titre: "Rapport IBM : 69 % des fans utilisent l'IA générative",
      texte: "20 589 fans interrogés dans 12 pays. En France, seuls 45 % font confiance aux contenus générés par IA ; la traduction en temps réel est la fonction jugée la plus utile (35 %).",
      question: "Avec 45 % de confiance, comment communiquer sur un contenu IA ?",
      src: "https://patrickbayeux.com/actualites/revolution-numerique-et-nouveaux-usages-dans-la-consommation-du-sport-mondial-dapres-le-rapport-ibm-2026/", srcNom: "Patrick Bayeux, Décideurs du Sport"
    },
    {
      date: "19–21 octobre 2026", tag: "Sport business",
      titre: "Sportel Monaco : l'IA au cœur du programme",
      texte: "Le salon des médias sportifs fait de l'IA un thème majeur : une masterclass sur la stratégie IA des organisations (création de contenus, engagement des fans, monétisation, opérations) et une session sur les résumés vidéo « pilotés par l'humain, accélérés par l'IA », produits quelques minutes après l'action.",
      question: "Où en est un club pro que vous connaissez ?",
      src: "https://www.sportcal.com/?p=154073", srcNom: "SportCal, programme publié le 6 octobre 2026"
    }
  ],

  /* ---------- Prompt engineering ---------- */
  blocs: [
    { k: "role",        nom: "Rôle",        aide: "Qui l'IA doit-elle être ?",                 ex: "Tu es chargé·e de communication d'un événement sportif grand public." },
    { k: "contexte",    nom: "Contexte",    aide: "Ce qu'elle doit savoir.",                    ex: "Le CITANUIT Trail Lille est un trail nocturne de 10 et 21 km autour de la Citadelle, le samedi 18 septembre 2027 à 20h30. Cible : néo-coureurs de 20 à 35 ans." },
    { k: "tache",       nom: "Tâche",       aide: "Ce qu'elle doit produire.",                  ex: "Rédige le post Instagram qui annonce l'ouverture des inscriptions." },
    { k: "format",      nom: "Format",      aide: "La forme attendue.",                         ex: "3 versions de 60 mots maximum, avec une accroche en première ligne et 3 hashtags." },
    { k: "contraintes", nom: "Contraintes", aide: "Ton, interdits, critères de réussite.",       ex: "Ton complice et inclusif, pas de jargon de coureur, pas de promesse de performance. Pose-moi d'abord 2 questions si une info te manque." }
  ],
  blocsNote: "Ce cadre en 5 blocs est un outil pédagogique, pas une norme. Il en existe d'autres ; l'important est de ne rien laisser implicite.",

  iterations: [
    { v: "V1", prompt: "Écris un post pour un trail de nuit à Lille.", probleme: "Aucun contexte, aucune cible : l'IA invente tout, y compris la date." },
    { v: "V2", prompt: "Tu es chargé·e de com. Écris un post Instagram pour le CITANUIT Trail Lille (10 et 21 km, 18 septembre 2027, 20h30) destiné aux néo-coureurs de 20 à 35 ans.", probleme: "Mieux ciblé, mais le format et le ton restent libres : résultats inégaux." },
    { v: "V3", prompt: "V2 + « 3 versions de 60 mots max, accroche en 1re ligne, 3 hashtags, ton complice et inclusif, pas de jargon. Pose-moi 2 questions avant si besoin. Puis critique ta meilleure version selon la grille et améliore-la. »", probleme: "Format maîtrisé, ton cadré, auto-critique intégrée : c'est exploitable." }
  ],

  techniques: [
    { t: "Le persona", d: "Faire parler la cible : « Réagis à ce post comme Léa, 26 ans, qui n'a jamais couru plus de 5 km. »" },
    { t: "Le registre", d: "Même message, plusieurs supports : Instagram, mail sponsor, communiqué." },
    { t: "Les exemples", d: "Donner 1 ou 2 modèles du résultat attendu (few-shot)." },
    { t: "Les questions d'abord", d: "« Avant de répondre, pose-moi les questions qui te manquent. »" },
    { t: "L'auto-critique", d: "« Critique ta réponse selon ces critères, puis améliore-la. »" }
  ],

  defis: [
    { n: 1, titre: "Le persona", min: 5, consigne: "Faites créer par l'IA le persona « néo-coureur 20-35 ans » du CITANUIT. Puis demandez-lui de jouer ce persona et de réagir au post d'annonce. Gardez la meilleure réaction." },
    { n: 2, titre: "Changer de registre", min: 5, consigne: "Même information (ouverture des inscriptions) en 3 versions : post Instagram, mail à un sponsor local, début de communiqué de presse. Comparez le ton." },
    { n: 3, titre: "L'IA se critique", min: 5, consigne: "Demandez à l'IA de critiquer son propre post selon la grille (pertinence, cible, exactitude, cohérence, biais, conformité), puis de l'améliorer. Notez ce qui a changé." }
  ],
  defisNote: "Outils gratuits au choix : ChatGPT, Claude, Gemini, Le Chat, Copilot. Pas d'import de fichier nécessaire.",

  /* ---------- Regard critique ---------- */
  vraiFaux: [
    { s: "Depuis le 2 août 2026, un deepfake diffusé dans l'UE doit être signalé comme tel.", v: true,  e: "Article 50 de l'AI Act, en vigueur depuis le 2 août 2026." },
    { s: "L'omnibus numérique a reporté l'article 50 de l'AI Act à 2027.", v: false, e: "C'est le « haut risque » qui est reporté (2 décembre 2027). L'article 50 s'applique ; seul le marquage lisible par machine a un délai au 2 décembre 2026 pour les systèmes antérieurs." },
    { s: "On peut coller la liste des inscrits avec leurs certificats médicaux dans un chatbot gratuit pour gagner du temps.", v: false, e: "Données personnelles et de santé : RGPD. Jamais dans un outil non validé." },
    { s: "Les sanctions de l'AI Act peuvent atteindre 35 M€ ou 7 % du chiffre d'affaires mondial.", v: true, e: "Pour les pratiques interdites. 15 M€ ou 3 % pour la plupart des autres manquements." },
    { s: "Lego a mis en avant l'IA dans sa pub Coupe du monde 2026.", v: false, e: "Au contraire : #HonestlyItsnotai, une pub revendiquée sans IA." },
    { s: "Une IA peut affirmer quelque chose de faux avec beaucoup d'assurance.", v: true, e: "C'est l'hallucination. Le ton assuré n'est pas une preuve." }
  ],

  grille: [
    { k: "Pertinence",  q: "Répond-il vraiment au brief ?" },
    { k: "Cible",       q: "Le ton et le support sont-ils adaptés au public ?" },
    { k: "Exactitude",  q: "Dates, lieux, chiffres, noms : tout est-il vérifié ?" },
    { k: "Cohérence",   q: "Respecte-t-il l'identité et la charte ?" },
    { k: "Biais",       q: "Stéréotypes de genre, d'âge, de corps ?" },
    { k: "Conformité",  q: "Droits, mention IA, données personnelles ?" }
  ],

  casEcole: [
    { titre: "Chamonix, 2023", texte: "Campagne « Reconnecter à la nature » avec des animaux et skieurs générés sous Midjourney. 850 000 vues de moqueries sur X en 24 h. Réponse de l'office : « ça fait parler de la station ».", src: "https://www.dynamique-mag.com/article/un-bad-buzz-pour-la-campagne-de-pub-de-chamonix-generee-parlintelligence-artificielle" },
    { titre: "Coupe du monde, 2026", texte: "Même technologie, réceptions opposées : Adidas salué, Coca-Cola et Pepsi critiqués. La différence ne tient pas à l'outil mais à l'idée et au dosage.", src: "https://www.creativebloq.com/design/advertising/the-good-the-bad-and-the-ai-of-world-cup-2026-adverts" }
  ],


  /* ---------- Cas de biais repris d'AmosBattle ---------- */
  casBiais: {
    titre: "Recrutement d'un coach adjoint en académie",
    contexte: "Un centre de formation recrute un coach adjoint pour encadrer des joueurs U17. L'accent est mis sur la pédagogie, l'éthique et la progression individuelle.",
    mauvais: "Rédige une offre d'emploi pour recruter un jeune homme de moins de 30 ans, ancien joueur, capable d'imposer son autorité dans un vestiaire U19 masculin.",
    defauts: ["Critère d'âge discriminant (moins de 30 ans)", "Critère de genre implicite (« jeune homme »)", "Vision stéréotypée du leadership", "Compétences pédagogiques absentes", "Risque juridique majeur"],
    corrige: [
      ["Rôle", "Directeur de l'académie d'un club professionnel."],
      ["Contexte", "Recrutement d'un coach adjoint pour un centre de formation U17-U19."],
      ["Objectif", "Identifier un profil qui combine performance sportive et excellence pédagogique."],
      ["Contraintes", "Rédaction inclusive, mise en avant des soft skills (leadership, pédagogie, éthique)."],
      ["Livrable", "Annonce complète et structurée, compétences techniques et éducatives, grille d'évaluation des candidats."]
    ],
    lecon: "L'IA exécute le biais qu'on lui donne, sans le signaler. Le regard critique commence par relire son propre prompt.",
    origine: "Cas repris de ton appli AmosBattle."
  },

  /* ---------- Simulateur de pitch (séance 2), inspiré de Pitchcoach ---------- */
  pitch: {
    lede: "Deux minutes devant le client CITANUIT. À mi-parcours, une objection tombe, et quelqu'un de l'agence doit y répondre.",
    duree: 120,
    objectionA: 60,
    roles: ["Introduction", "Besoin du client", "Solution", "Bénéfices", "Conclusion et appel à l'action"],
    objections: [
      "« 15 000 €, c'est tout notre budget : pourquoi en mettre autant sur les réseaux ? »",
      "« Nos coureurs réguliers ne sont pas sur Instagram. »",
      "« Des visuels faits par IA, ça fait bas de gamme pour un événement local. »",
      "« Les riverains vont se plaindre du bruit la nuit : votre com en parle ? »",
      "« Pourquoi viser les néo-coureurs plutôt que les clubs de course ? »",
      "« Comment saurez-vous que votre campagne a marché ? »"
    ],
    origine: "Mécanique reprise de ton appli Pitchcoach : 2 minutes, objection tirée au hasard à mi-parcours, personne désignée au hasard pour répondre."
  },

  questionOuverte: "Le CITANUIT doit-il annoncer que ses visuels sont générés par IA, même dans les cas où la loi ne l'impose pas ?",

  /* ---------- Fil rouge : dossier client CITANUIT (fictif) ---------- */
  client: {
    nom: "CITANUIT Trail Lille",
    accroche: "La ville s'éteint, les frontales s'allument.",
    arrivee: "Votre client arrive à {heure:cas}",
    teaser: "Un trail nocturne de 10 et 21 km au pied de la Citadelle. Quatre agences, un seul budget de communication. D'ici là, faites le plein de méthode.",
    seance2Kicker: "Séance 2, {seance2}",
    seance2Titre: "Le client revient",
    avertissement: "Événement et client fictifs, créés pour le cours.",
    fiche: [
      ["Date", "Samedi 18 septembre 2027, départ 20h30"],
      ["Lieu", "Citadelle et Vieux-Lille, village d'arrivée au Champ de Mars"],
      ["Formats", "10 km, 21 km, course enfants de 2 km"],
      ["Édition", "2e édition (1re en 2026 : 1 300 photos, 1 400 coureurs)"],
      ["Budget com", "15 000 €"],
      ["Organisateur", "Comité d'organisation CITANUIT (association)"]
    ],
    objectifsTitre: "Objectifs de l'édition 2027",
    objectifs: ["2 500 inscrits", "40 % de néo-coureurs", "3 sponsors locaux", "10 000 abonnés Instagram"],
    cibles: [
      { nom: "Néo-coureurs 20–35 ans", d: "Courent 1 à 2 fois par semaine, jamais fait de course officielle. Cherchent une expérience à partager." },
      { nom: "Coureurs réguliers", d: "Chronos, classements, parcours technique. Comparent avec les autres trails de la région." },
      { nom: "Familles", d: "Course enfants, ambiance du village, horaires compatibles." },
      { nom: "Sponsors locaux", d: "Visibilité, image jeune et urbaine, activation sur place." },
      { nom: "Presse et riverains", d: "Sécurité, nuisances nocturnes, retombées pour la ville." }
    ],
    charte: {
      couleurs: [["Nuit", "#14213D"], ["Frontale", "#FFC93C"], ["Brique", "#B5452B"], ["Pavé", "#8A8F98"], ["Lueur", "#F4F7FB"]],
      ton: "Complice, nocturne, inclusif. Jamais élitiste.",
      valeurs: ["Lumière", "Ville", "Collectif"],
      interdits: ["Promesse de performance", "Jargon de coureur", "Visuels de corps stéréotypés"]
    },
    dureeTravail: 35,
    travail: [
      { t: "Deux personas", d: "Le néo-coureur, plus une cible au choix. Générés avec l'IA puis retravaillés par vous." },
      { t: "Plateforme de message", d: "Une promesse, puis 3 messages clés par cible retenue." },
      { t: "Journal de prompts", d: "Au moins 3 prompts itérés (V1 → V3), avec ce que vous avez changé et pourquoi." },
      { t: "Critique argumentée", d: "Un output de l'IA évalué avec la grille en 6 critères." }
    ],
    etape: "Point d'étape en fin de séance : dépôt du journal et de la plateforme de message. Non noté, mais il entre dans la note finale.",
    seance2: "Séance 2 ({seance2}) : mini-kit de communication (affiche, 3 posts, mail sponsor, storyboard vidéo) et pitch devant le client.",
    bareme: [
      { g: "Note d'équipe, par agence (18 points)" },
      { c: "Journal de prompts et qualité de l'itération", p: 5 },
      { c: "Stratégie : personas et plateforme de message", p: 3 },
      { c: "Mini-kit : qualité et adaptation aux cibles", p: 4 },
      { c: "Cohérence graphique et respect du brief", p: 3 },
      { c: "Regard critique et conformité (mention IA, droits, RGPD)", p: 3 },
      { g: "Participation individuelle (2 points)" },
      { c: "Participation individuelle : implication, prise de parole, contribution au travail d'équipe", p: 2 }
    ],
    baremeNote: "Note sur 20 attribuée à la fin de la séance 2 : 18 points communs à l'agence, 2 points de participation individuelle."
  },

  /* ---------- Battle finale ---------- */
  battle: [
    { q: "Quelle marche de l'escalier pour « classer 1 300 photos dans leur dossier » ?", options: ["Chat", "Chat + fichiers", "Chat + connecteurs", "Agent avec accès dossier"], bonne: 3 },
    { q: "Quel bloc manque dans « Écris un post pour un trail de nuit » ?", options: ["Le contexte", "Le format", "La cible", "Tous ces blocs"], bonne: 3 },
    { q: "Quel outil vidéo d'OpenAI a fermé en 2026 ?", options: ["DALL·E", "Sora", "Codex", "Whisper"], bonne: 1 },
    { q: "Selon IBM (2026), quelle part des fans français fait confiance aux contenus IA ?", options: ["25 %", "45 %", "69 %", "80 %"], bonne: 1 },
    { q: "Depuis quand l'article 50 de l'AI Act s'applique-t-il ?", options: ["1er janvier 2026", "2 août 2026", "2 décembre 2027", "Pas encore"], bonne: 1 },
    { q: "Quel réflexe avant de laisser un agent renommer des fichiers en masse ?", options: ["Lui donner tout le PC", "Faire une sauvegarde", "Désactiver la validation", "Utiliser la version gratuite"], bonne: 1 },
    { q: "Quelle technique consiste à faire réagir la cible au contenu ?", options: ["Few-shot", "Le persona", "Le registre", "Le format"], bonne: 1 },
    { q: "Quel critère de la grille vérifie dates et chiffres ?", options: ["Pertinence", "Cohérence", "Exactitude", "Conformité"], bonne: 2 }
  ],

  aRetenir: [
    "L'IA prédit du texte plausible, pas du vrai : on vérifie tout ce qui est factuel.",
    "2026 : on passe de l'assistant qui répond à l'agent qui exécute.",
    "Choisir la bonne marche : chat, fichiers, connecteurs ou agent.",
    "Un bon prompt ne laisse rien d'implicite : rôle, contexte, tâche, format, contraintes.",
    "Le premier jet n'est jamais le livrable : on itère et on critique.",
    "Transparence, droits, RGPD : l'AI Act s'applique depuis le 2 août 2026."
  ],

  /* ---------- Glossaire ---------- */
  glossaire: [
    ["IA générative", "IA qui produit du contenu nouveau (texte, image, son, vidéo) à partir d'une consigne."],
    ["IA prédictive", "IA qui classe ou prévoit à partir de données (ex. prévoir l'affluence)."],
    ["LLM", "Large Language Model : grand modèle de langage qui prédit la suite d'un texte."],
    ["Token", "Morceau de mot traité par le modèle. Les limites des outils se comptent en tokens."],
    ["Fenêtre de contexte", "Quantité de texte que le modèle peut prendre en compte en une fois."],
    ["Modèle de diffusion", "Technique de génération d'images qui part d'un bruit et le « débruite » vers l'image décrite."],
    ["Multimodal", "Qui comprend ou produit plusieurs types de contenus : texte, image, son, vidéo."],
    ["Prompt", "La consigne donnée à l'IA."],
    ["Hallucination", "Réponse fausse produite avec assurance."],
    ["Biais", "Déformation systématique héritée des données (stéréotypes de genre, d'âge, de corps…)."],
    ["Agent", "IA qui exécute une tâche en plusieurs étapes, avec des outils, sous votre validation."],
    ["Skill", "Compétence réutilisable (instructions, exemples, code) que l'IA charge pour une tâche."],
    ["Connecteur", "Lien sécurisé entre l'IA et un de vos outils : mail, Drive, agenda, CRM."],
    ["Human in the loop", "Un humain valide les étapes importantes avant qu'elles soient exécutées."],
    ["Deepfake", "Contenu image, son ou vidéo généré ou manipulé qui imite une personne ou un fait réel."],
    ["AI Act", "Règlement européen sur l'IA. Article 50 : obligations de transparence depuis le 2 août 2026."]
  ],

  /* ---------- Ressources à télécharger ----------
     Dépose les fichiers dans le dossier ressources/ puis passe dispo à true. */
  /* Documents proposés au téléchargement directement dans l'étape (clé = id de l'étape). */
  docsEtapes: {"prompt": ["fiche-methode-prompt"], "cas": ["dossier-client-citanuit", "grille-evaluation"], "final": ["glossaire", "sources-seance-1"]},
  ressources: [
    { titre: "Fiche méthode : le prompt en 5 blocs", fichier: "ressources/fiche-methode-prompt.pdf", type: "PDF", dispo: true },
    { titre: "Dossier client CITANUIT", fichier: "ressources/dossier-client-citanuit.pdf", type: "PDF", dispo: true },
    { titre: "Grille d'évaluation et barème", fichier: "ressources/grille-evaluation.pdf", type: "PDF", dispo: true },
    { titre: "Glossaire de la séance", fichier: "ressources/glossaire.pdf", type: "PDF", dispo: true },
    { titre: "Sources et actus de la séance", fichier: "ressources/sources-seance-1.pdf", type: "PDF", dispo: true }
  ]
};
