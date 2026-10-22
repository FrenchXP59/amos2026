# Ce qu'il reste à faire

Box 2026-2027 et premier cours (B3, IA appliquée à la communication).

## 0. Box

- [x] Espace par classe et par année, séances générées depuis le planning, contenu chargé après le code.
- [ ] Déployer sur Netlify et définir `BOX_CODES`.
- [ ] Passer le dépôt en privé pour cloisonner vraiment le contenu.
- [ ] Valider le rattachement des applis existantes aux cours (`contenu/2026-2027.mjs`, rubrique `outils`).
- [ ] Ajouter l'adresse d'AmosBattle si on l'utilise, et celle de l'ancienne box 2025-2026 (`archive.url`).
- [x] Moteur commun des applis (`apps/moteur/`) : adaptation par classe, gabarits tri, chaîne et audit.
- [x] Appli M2 « IA et productivité », séance 1 (`apps/ia-productivite/?classe=m2a` ou `m2b`).

# Cours B1 : concours de vente

Six séances : 4/11 matin, 23/11 après-midi, 24/11 après-midi, 25/11 matin, 27/11 matin et après-midi (concours). Sujet : le défi Kilomètre Nord (enseigne de running fictive), chaque équipe crée une marque fictive à faire référencer.

- [x] Appli séance 1 (`apps/concours-vente/?classe=b1a`) : positionnement, méthodes, tri CAB et SONCAS, sujet, fiche de marge, mission terrain, simulateur avec profil caché.
- [ ] Mail à Bertrand : prérequis (cours Relation client), pondération de la rétrospective, date et jury du concours, effectif, salle.
- [ ] Ajuster le nombre d'équipes (5 par défaut, `config.agences`) quand l'effectif est connu.
- [ ] PDF : fiches méthode, sujet et fiche de marge, grille client mystère, grille du jury, modèle de note réflexive.
- [ ] Séances 2 à 5 et organisation du concours : à construire.
- [ ] Nom « Kilomètre Nord » : recherche web négative, base INPI non consultée.

# Cours M1 : IA et automatisation

Séances : M1A le 3/11 et le 6/11 (9h-12h30). Évaluation : participation. Fil rouge : appel d'offres du Lys Padel Open (tournoi fictif).

- [x] Appli séance 1 (`apps/ia-automatisation/?classe=m1a`).
- [ ] **Vidéo NotebookLM n°1** « Du bricolage au métier » : URL dans `content.js`, rubrique `videos.s1.url`.
- [ ] Préparer le texte de l'audit en PDF (synthèse avec six erreurs volontaires).
- [ ] Séance 2 : déroulé à valider (veille, démo Make ou Zapier, soutenance).

# Cours M2 : IA et productivité

Séances : M2A le 2/11 et le 25/11, M2B le 4/11 et le 26/11 (13h30-17h). Fil rouge : Olympique Nordval (club fictif de Ligue 2).

- [ ] **Vidéo NotebookLM n°1** « Le manager augmenté : orchestrer l'IA pour décider » : URL dans `content.js`, rubrique `videos.s1.url`.
- [ ] Tester la chaîne de prompts de bout en bout sur un outil gratuit avec la fiche Nordval (vérifier que 7 à 8 min suffisent).
- [ ] Imprimer ou projeter le texte de l'audit : les étudiants doivent pouvoir le lire en cellule (le prévoir aussi en PDF).
- [ ] L'étude « Deloitte 2026 » de l'audit est **volontairement inventée** (erreur n°6) : ne pas la reprendre ailleurs.
- [ ] Séance 2 : déroulé à valider (recommandation, charte d'usage de l'IA de l'équipe, comité de direction avec le simulateur).
- [ ] Ressources PDF : fiche méthode chaîne de prompts, dossier Nordval, grille, glossaire.

# Premier cours : B3, IA appliquée à la communication

Cours AMOS, B3 Bachelor marketing, commercial & événementiel sport (B3A et B3B).
Séances : B3B le 2/11 (9h-12h30) et le 5/11 (13h30-17h) ; B3A le 3/11 (13h30-17h) et le 23/11 (9h-12h30).
Fil rouge : CITANUIT Trail Lille (événement fictif).

État : **V1 de l'application** dans `apps/ia-communication/`. Tout le texte se modifie dans `apps/ia-communication/content.js`. Ouvrir avec `?classe=b3a` ou `?classe=b3b`.

---

## 1. Avant le 2 novembre (bloquant)

- [x] **Logo AMOS** : fichier repris de ton dépôt Pitchteams (`public/logo-amos.png`, 887×140, fond transparent). Un SVG officiel serait encore mieux.
- [x] **Palette AMOS (verts du site, validée)** : vert du logo #008B57 (lu dans le fichier). Verts secondaires #2C675B et #52A86F relevés sur une capture d'écran, donc approximatifs. À confirmer avec la charte (variables en haut de `apps/ia-communication/styles.css`).
- [ ] **Vidéo NotebookLM de la séance 1** (4-5 min), thème « 2026 : de l'IA qui répond à l'IA qui agit ». Coller l'URL (YouTube non répertorié, Drive ou .mp4) dans `content.js`, rubrique `videos.s1.url`.
- [ ] **Jeu « IA ou humain ? »** : préparer 6 contenus (4 visuels, 2 textes), moitié générés par IA, moitié humains. Les déposer dans `apps/ia-communication/assets/` et renseigner `src` et `reponse` dans `content.js`, rubrique `iaHumain`. Les réponses actuelles sont des exemples à corriger.
- [ ] **Déploiement** : l'appli est publiée avec la box (Netlify, depuis ce dépôt).
- [ ] **Test en salle** : projection en thème Nuit puis Jour, son du chrono, wifi.
- [ ] **Ajouter un plan B hors ligne** : l'appli fonctionne en ouvrant `apps/ia-communication/index.html` directement (les polices sont embarquées). Seule la vidéo en ligne a besoin du réseau : garder une copie .mp4 locale.

## 2. Vérifications de fond (à faire avant de projeter)

- [ ] **Skills dans ChatGPT** : tu les vois sur ton compte Plus, alors que les notes officielles d'OpenAI ne citent qu'Enterprise et Edu (9/07/2026). Noter le menu exact pour la démo et ajuster l'actu « Skills » si besoin.
- [ ] **Claude Cowork** : vérifier quelles offres y ont accès aujourd'hui (gratuit ou non).
- [ ] **Claude Code** : confirmer la date de lancement si tu la cites (non vérifiée).
- [ ] **Limites des offres gratuites** (ChatGPT, Claude, Gemini, Le Chat, Copilot) : les revérifier la semaine du cours, elles changent souvent.
- [ ] **Hypothèse « zip en chat »** : tester qu'on peut envoyer une archive de photos à ChatGPT ou Claude, les faire renommer et récupérer le zip. Si un étudiant pose la question, tu as la réponse.
- [ ] **Droit d'auteur des contenus 100 % IA en droit français** : non vérifié, volontairement absent de l'appli. À sourcer avant d'en parler.
- [ ] **Fiche RNCP41995 (bloc 1)** : récupérer l'intitulé exact pour aligner la grille de notation.
- [ ] **Nom CITANUIT** : recherche web négative, mais base INPI non consultée.
- [ ] **Sportel Monaco (19-21/10/2026)** : lire les comptes rendus et mettre à jour l'actu correspondante.

## 3. Ressources à produire (dossier `apps/ia-communication/ressources/`)

Une fois un fichier déposé, passer `dispo: true` dans `content.js`, rubrique `ressources`.

- [ ] Fiche méthode : le prompt en 5 blocs (PDF)
- [ ] Dossier client CITANUIT (PDF)
- [ ] Grille d'évaluation et barème sur 20 (PDF)
- [ ] Glossaire de la séance (PDF)
- [ ] Sources et actus de la séance 1 (PDF)

## 4. Séance 2 (5/11 pour B3B, 23/11 pour B3A) : nouvelle partie de l'appli

- [ ] Déroulé minuté de la séance 2 (3h30), à valider ensemble.
- [x] Simulateur de pitch (mécanique Pitchcoach) prêt : lien « Pitch » dans l'appli.
- [ ] Rééquilibrer l'étape « Regard critique » (trop chargée pour 15 min).
- [ ] **Vidéo NotebookLM n°2** (4-5 min), thème proposé : « Cohérence graphique et IA : du brief au kit visuel », suivie d'un débat.
- [ ] Démo par toi : image (Midjourney, Firefly, Canva), **motion design et montage vidéo IA**, skills (ton skill storyboard).
- [ ] Atelier mini-kit CITANUIT : affiche, 3 posts, mail sponsor, storyboard vidéo, avec contrôle de cohérence de charte.
- [ ] Pitch des agences devant « le client », vote, puis note finale sur 20.
- [ ] Rappel du point d'étape de la séance 1 (journal de prompts déposé).

## 5. Évolutions possibles de l'appli (V2 et suivantes)

- [ ] **Mode étudiant** : version sans les commandes du formateur (chrono, scores), à ouvrir aux étudiants après la séance.
- [ ] **Dépôt du travail en ligne** : aujourd'hui le journal se télécharge en .txt. Option : base Supabase pour recevoir les dépôts et afficher les scores en direct (attention au RGPD sur les données des étudiants).
- [ ] **Vote en direct sur téléphone** pour « IA ou humain ? » et la prompt battle (QR code au tableau).
- [ ] **Animations motion design supplémentaires** : transitions entre étapes, révélation animée du podium, intro du client CITANUIT.
- [ ] Réutiliser le moteur pour les autres cours du planning (M1 IA et automatisation, M2 IA et productivité, B1 Concours de vente).

## 6. Ce qu'on peut récupérer de tes applis existantes (GitHub)

- [x] **Pitchteams** : tirage au sort des groupes, intégré à l'étape « Départ » (liste collée, tirage animé, impression). Amélioration par rapport à l'original : un nom par ligne, plus besoin de JSON.
- [ ] **Pitchcoach**, pour la séance 2 (pitch devant le client) :
  - répartition des 5 rôles du pitch (introduction, besoin, solution, bénéfices, conclusion) ;
  - chrono de 2 min avec **objection tirée au hasard à 60 s** et désignation aléatoire de la personne qui répond ;
  - exercices verrouillés par code ;
  - grille d'auto-évaluation.
- [ ] **AmosBattle** (prompt battle à 2 équipes) : 4 scénarios sport (TikTok Ligue 2, recrutement discriminant, crise rumeur capitaine, activation sponsor data), chacun avec un mauvais prompt, ses défauts et une version optimisée. Réutilisable comme défis supplémentaires dans « Prompt engineering », surtout le cas du recrutement discriminant pour la partie biais.
- [ ] **AmosIA-ethique** : cas « recrutement d'un attaquant de Ligue 1 » (prompt flou contre prompt chiffré). Bon exemple de hallucination plausible, à reprendre dans « Regard critique ».
- [ ] **amos.box** : ton hub de modules (vidéo, applis, PDF par séance). Il serait logique d'y ajouter ce cours comme module, pour que les étudiants retrouvent tout au même endroit.
- [ ] **amos-lab** : export PDF du livrable (jsPDF) et vitrine des meilleurs travaux, à reprendre pour le mode étudiant et pour le journal de prompts (aujourd'hui en .txt).
- [ ] **Harmoniser les couleurs** : amos-lab (#0F5132 et #FF7A00), Pitchteams et Pitchcoach (#0F7A4B) et amos.box (bleu nuit et couleurs par sport) n'ont pas la même palette. Si tu veux une identité commune, aligner tout le monde sur les verts du logo.

## 7. Autres applis et contenus à prévoir

- [ ] Vidéos NotebookLM : une par séance, revue avec ton skill storyboard.
- [ ] Appli ou module **Concours de vente (B1A)**, du 4 au 27/11.
- [ ] Appli **IA et productivité (M2A, M2B)** et **IA et automatisation (M1A)**, à partir du 2/11.
