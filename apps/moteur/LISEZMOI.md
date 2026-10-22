# Moteur commun des applis de cours

Toutes les applis de cours partagent ce moteur : chrono, agences et dossards, tirage au sort, quiz, jeux de classement, actus, générateur de prompt, vrai/faux, dossier client, journal de prompts, battle finale, simulateur de pitch.

Une appli de cours = un dossier dans `apps/` avec seulement :

- `index.html` (copie de celui de `ia-communication`, qui pointe vers `../moteur/`)
- `content.js` (tout le contenu du cours)
- `assets/` et `ressources/` propres au cours

## Créer une nouvelle appli de cours

1. Copier `apps/ia-communication/` sous un nouveau nom (ex. `apps/ia-productivite/`).
2. Dans `content.js` : changer `config.id` (sauvegarde locale distincte), `config.cours`, `config.classes` (date et heure de début par classe), puis le contenu.
3. Chaque étape du parcours a un `type` qui choisit son gabarit (par défaut, son `id`) :
   `accueil`, `iahumain`, `video`, `rupture`, `panorama`, `prompt`, `pause`, `critique`, `cas`, `final`.
4. Les textes peuvent contenir des variables : `{heure:cas}` (heure d'une étape), `{debut}`, `{fin}`, et celles définies dans `config.variables` ou `config.classes.<classe>.variables`.
5. Ouvrir l'appli avec `?classe=m2a` : date, horaires du parcours et sauvegarde s'adaptent à la classe.

Toute amélioration du moteur profite à tous les cours : tester chaque appli après une modification.

## Motion design (moteur commun)

- **Tirages en machine à sous** : objection et personne désignée (simulateur), carte du profil battue, ordre de passage, duel des objections.
- **Points volants** : chaque bouton « +1 » envoie le point jusqu'au dossard de l'équipe.
- **Compte à rebours géant** sur les 10 dernières secondes du chrono et du simulateur.
- **Cérémonies** : palmarès (roulement de tambour, compteur, fanfare, confettis) et bouton « Révéler le vainqueur » en battle finale.
- **Transitions** entre étapes (glissement selon le sens), **lever de rideau** du client à la première ouverture du dossier (bouton pour le rejouer).
- **Écran d'attente** (lien dans le menu) avec compte à rebours jusqu'au début, puis **générique** de 5 secondes.
- **Ambiance** de fond par cours (`config.ambiance` : `frontales`, `piste`, `donnees`, `flux`), visible seulement à l'accueil, à la pause, au dossier client, au palmarès et à la battle finale.
- Bouton **Son/Muet** en haut à droite. Si l'ordinateur demande de réduire les animations, les effets sont coupés.
