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
