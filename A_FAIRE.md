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
- [x] Réponse de Bertrand (22/10) : cours de vente déjà suivis (rappel suffit), 27 étudiants, concours le 27/11 après-midi, barème libre.
- [x] Barème validé : soutenance 14 (collective) + rétrospective 6 (compte-rendu terrain 2, note réflexive individuelle 4).
- [x] Séances 2 à 6 (`apps/concours-vente-s2` à `-s6`) + sujet commun (`apps/concours-vente/commun.js`), grille du jury, palmarès.
- [ ] Mail final à Bertrand avec les documents (sujet, grille, consignes rétrospective, fiche de marge) : jury (Bertrand ? ancien élève ?) toujours à confirmer.
- [x] Décidé le 22/10 : note réflexive rédigée le matin du concours (séance 5, 30 min, sans IA) ; fiches de notes tolérées mais leur lecture pénalise l'aisance à l'oral ; profils tirés sans remise (un par équipe).
- [x] L'acheteur est joué par un membre du jury : scénarios fournis (pack intervenant, `scenarios-acheteur.pdf` ; données dans `prive/`, hors dépôt).
- [ ] Choisir le juré qui joue l'acheteur et lui envoyer les scénarios et les cartes quelques jours avant.
- [ ] Vidéos NotebookLM des séances 2, 3 et 4 (docs NotebookLM du 23, 24 et 25 novembre).
- [x] PDF : fiches méthode, sujet et fiche de marge, grille client mystère, grille du jury, grille d'auto-évaluation, fiche objections, consignes de note réflexive.
- [x] Cartes de l'acheteur à imprimer (pack intervenant, hors dépôt).
- [ ] Nom « Kilomètre Nord » : recherche web négative, base INPI non consultée.

# Cours M1 : IA et automatisation

Séances : M1A le 3/11 et le 6/11 (9h-12h30). Évaluation : participation. Fil rouge : appel d'offres du Lys Padel Open (tournoi fictif).

- [x] Appli séance 1 (`apps/ia-automatisation/?classe=m1a`).
- [ ] **Vidéo NotebookLM n°1** « Du bricolage au métier » : URL dans `content.js`, rubrique `videos.s1.url`.
- [x] Texte de l'audit et corrigé en PDF (pack intervenant).
- [x] Appli séance 2 (`apps/ia-automatisation-s2/?classe=m1a`) : agences et scores conservés.
- [ ] **Vidéo NotebookLM séance 2** « Veiller et automatiser » : URL dans `apps/ia-automatisation-s2/content.js`.
- [ ] Préparer la démo Make ou Zapier (flux de veille du lundi) sur ton compte, avec une capture vidéo de secours.

# Cours M2 : IA et productivité

Séances : M2A le 2/11 et le 25/11, M2B le 4/11 et le 26/11 (13h30-17h). Fil rouge : Olympique Nordval (club fictif de Ligue 2).

- [ ] **Vidéo NotebookLM n°1** « Le manager augmenté : orchestrer l'IA pour décider » : URL dans `content.js`, rubrique `videos.s1.url`.
- [ ] Tester la chaîne de prompts de bout en bout sur un outil gratuit avec la fiche Nordval (vérifier que 7 à 8 min suffisent).
- [ ] Imprimer ou projeter le texte de l'audit : les étudiants doivent pouvoir le lire en cellule (le prévoir aussi en PDF).
- [ ] L'étude « Deloitte 2026 » de l'audit est **volontairement inventée** (erreur n°6) : ne pas la reprendre ailleurs.
- [x] Séance 2 (`apps/ia-productivite-s2/?classe=m2a` ou `m2b`) : modélisation en chaîne, audit d'un modèle (7 erreurs), tri des usages, charte IA, comité, grille d'évaluation (page Jury).
- [ ] Vidéo NotebookLM n°2 « Manager une équipe augmentée » (doc NotebookLM 25 novembre ; la même pour les M2B le 26).
- [ ] Dire aux cellules d'apporter leur scénario de la séance 1 (le journal n'est repris que sur le même navigateur).
- [x] Ressources PDF : fiche méthode chaîne de prompts, dossier Nordval, grille, glossaire, fiche modélisation, modèle de charte IA. Textes et corrigés des audits : pack intervenant.

# Premier cours : B3, IA appliquée à la communication

Cours AMOS, B3 Bachelor marketing, commercial & événementiel sport (B3A et B3B).
Séances : B3B le 2/11 (9h-12h30) et le 5/11 (13h30-17h) ; B3A le 3/11 (13h30-17h) et le 23/11 (9h-12h30).
Fil rouge : CITANUIT Trail Lille (événement fictif).

État : **V1 de l'application** dans `apps/ia-communication/`. Tout le texte se modifie dans `apps/ia-communication/content.js`. Ouvrir avec `?classe=b3a` ou `?classe=b3b`.

---

## 1. Avant le 2 novembre (bloquant)

- [x] **Logo AMOS** : fichier repris de ton dépôt Pitchteams (`public/logo-amos.png`, 887×140, fond transparent). Un SVG officiel serait encore mieux.
- [x] **Palette AMOS (verts du site, validée)** : vert du logo #008B57 (lu dans le fichier). Verts secondaires #2C675B et #52A86F relevés sur une capture d'écran, donc approximatifs. À confirmer avec la charte (variables en haut de `apps/ia-communication/styles.css`).
- [x] **Vidéo de la séance 1** « De l'IA passive à l'IA active » (3 min) : https://youtu.be/GjL48ZArdU0, intégrée dans l'appli et la box (27/10). Quiz aligné sur la vidéo.
- [ ] **Jeu « IA ou humain ? »** : préparer 6 contenus (4 visuels, 2 textes), moitié générés par IA, moitié humains. Les déposer dans `apps/ia-communication/assets/` et renseigner `src` et `reponse` dans `content.js`, rubrique `iaHumain`. Les réponses actuelles sont des exemples à corriger.
- [ ] **Déploiement** : l'appli est publiée avec la box (Netlify, depuis ce dépôt).
- [ ] **Test en salle** : projection en thème Nuit puis Jour, son du chrono, wifi.
- [ ] **Ajouter un plan B hors ligne** : l'appli fonctionne en ouvrant `apps/ia-communication/index.html` directement (les polices sont embarquées). Seule la vidéo en ligne a besoin du réseau : garder une copie .mp4 locale.

## 2. Vérifications de fond (à faire avant de projeter)

- [ ] **Skills dans ChatGPT** : tu les vois sur ton compte Plus, alors que les notes officielles d'OpenAI ne citent qu'Enterprise et Edu (9/07/2026). Noter le menu exact pour la démo et ajuster l'actu « Skills » si besoin.
- [x] **Claude Cowork** : offres payantes seulement (Max le 12/01/2026, Pro le 16/01, Enterprise ; web et mobile le 7/07 en commençant par Max). Source : notes de version Claude. Appli mise à jour.
- [x] **Claude Code** : annoncé le 24/02/2025 (avec Claude 3.7 Sonnet), disponible pour tous le 22/05/2025 (annonce Claude 4). Sources : anthropic.com/news. Pas de date citée dans l'appli.
- [ ] **Limites des offres gratuites** (ChatGPT, Claude, Gemini, Le Chat, Copilot) : les revérifier la semaine du cours, elles changent souvent.
- [ ] **Hypothèse « zip en chat »** : tester qu'on peut envoyer une archive de photos à ChatGPT ou Claude, les faire renommer et récupérer le zip. Si un étudiant pose la question, tu as la réponse.
- [ ] **Droit d'auteur des contenus 100 % IA en droit français** : non vérifié, volontairement absent de l'appli. À sourcer avant d'en parler.
- [ ] **Fiche RNCP41995 (bloc 1)** : récupérer l'intitulé exact pour aligner la grille de notation.
- [ ] **Nom CITANUIT** : recherche web négative, mais base INPI non consultée.
- [x] **Sportel Monaco** : actu réécrite d'après le programme (SportCal, 6/10/2026 : masterclass stratégie IA, résumés vidéo « human-led, AI-accelerated »). Aucun compte rendu post-salon trouvé le 22/10 : à compléter si tu en lis un.

## 3. Ressources à produire (dossier `apps/ia-communication/ressources/`)

Tous les PDF de novembre sont générés par `node outils/pdf/generer.mjs` à partir des applis : modifier l'appli, puis relancer. Le pack intervenant (corrigés d'audit, cartes de l'acheteur) se génère hors du dépôt avec `--intervenant <dossier>`.

- [x] Fiche méthode : le prompt en 5 blocs (PDF)
- [x] Dossier client CITANUIT (PDF)
- [x] Grille d'évaluation et barème sur 20 (PDF)
- [x] Glossaire de la séance (PDF)
- [x] Sources et actus de la séance 1 (PDF)

## 4. Séance 2 (5/11 pour B3B, 23/11 pour B3A) : nouvelle partie de l'appli

- [x] Appli séance 2 (`apps/ia-communication-s2/?classe=b3b` ou `b3a`) : agences et scores de la séance 1 conservés.
- [ ] **Vidéo NotebookLM séance 2** « Du brief au visuel » : URL dans `apps/ia-communication-s2/content.js`.
- [ ] Tester les outils image gratuits (ChatGPT, Gemini, Copilot, Firefly, Canva) la semaine du cours, sur le wifi de l'école.
- [ ] Préparer la démo de l'intervenant : même consigne dans deux outils, affiche animée, reel de 15 s.
- [x] Simulateur de pitch (mécanique Pitchcoach) prêt : lien « Pitch » dans l'appli.
- [x] « Regard critique » (séance 1) passé à 20 min, fil rouge à 45 min (dont 35 de travail).
- [ ] **Vidéo NotebookLM n°2** (4-5 min), thème proposé : « Cohérence graphique et IA : du brief au kit visuel », suivie d'un débat.
- [ ] Démo par toi : image (Midjourney, Firefly, Canva), **motion design et montage vidéo IA**, skills (ton skill storyboard).
- [ ] Atelier mini-kit CITANUIT : affiche, 3 posts, mail sponsor, storyboard vidéo, avec contrôle de cohérence de charte.
- [ ] Pitch des agences devant « le client », vote, puis note finale sur 20.
- [ ] Rappel du point d'étape de la séance 1 (journal de prompts déposé).

## 5. Évolutions possibles de l'appli (V2 et suivantes)

- [ ] **Mode étudiant** : version sans les commandes du formateur (chrono, scores), à ouvrir aux étudiants après la séance.
- [ ] **Dépôt du travail en ligne** : aujourd'hui le journal se télécharge en .txt. Option : base Supabase pour recevoir les dépôts et afficher les scores en direct (attention au RGPD sur les données des étudiants).
- [ ] **Vote en direct sur téléphone** pour « IA ou humain ? » et la prompt battle (QR code au tableau).
- [x] **Motion design** (22/10) : lots 1 à 3 faits dans le moteur commun (voir `apps/moteur/LISEZMOI.md`). À tester en salle : son, projecteur, fluidité sur le PC de l'école.
- [ ] Retrouver le skill motion design de Claude Code (`~/.claude/skills`, à copier dans Documents) pour aligner le style.
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
