# La box IA AMOS

Un espace par classe et par année pour les cours IA de Frédéric Legrand à AMOS Sport Business School : séances datées, vidéos NotebookLM, applis interactives et documents.

Site statique, aucune dépendance. Seul le build (Node 20) est nécessaire.

## Organisation

| Dossier | Contenu |
|---|---|
| `contenu/2026-2027.mjs` | **Le contenu de l'année** : cours (repris des syllabus), applis, classes, séances. C'est le fichier à modifier au quotidien. |
| `apps/` | Les applis interactives des cours (une par cours). `apps/ia-communication/` : B3, IA appliquée à la communication. |
| `site/` | La box elle-même (accueil, page de classe, styles, logo, polices). |
| `ressources/` | Les PDF à télécharger (à créer, un sous-dossier par classe conseillé). |
| `outils/build.mjs` | Génère le site publié dans `dist/`. |
| `codes.json` | Les codes des classes. **Jamais versionné** (voir `codes.exemple.json`). |

Adresses : `…/#/` (année courante), `…/#/2026-2027/b3b` (une classe, à mettre en QR code).

## Accès par code

- Les codes ne sont pas dans le dépôt : le build les lit dans la variable d'environnement `BOX_CODES` (Netlify) ou dans `codes.json` (en local).
- Le contenu de chaque classe est écrit dans un fichier dont le nom est l'empreinte de son code. Sans le code, la box n'affiche que les dossards et les dates.
- **Limite** : tant que ce dépôt est public, le contenu des cours reste lisible sur GitHub. Pour un vrai cloisonnement, passer le dépôt en privé (Netlify fonctionne pareil).
- Aucune donnée personnelle d'étudiant dans la box.

## Travailler en local

```bash
cp codes.exemple.json codes.json   # puis mettre les vrais codes
npm run build                      # génère dist/
open dist/index.html               # ou : npm run preview → http://localhost:8080
```

## Ajouter du contenu à une séance

Dans `contenu/2026-2027.mjs`, rubrique `classes > <classe> > seances` :

```js
"video": "https://youtu.be/XXXX",
"apps": [{ "label": "Appli de la séance", "url": "apps/ia-communication/index.html?classe=b3b" }],
"ressources": [{ "titre": "Slides", "type": "PDF", "url": "ressources/b3b/slides-s1.pdf" }]
```

Les applis communes à un cours se déclarent une fois dans `cours > <cours> > outils` (catalogue dans `outils`).

## Nouvelle année

1. Créer `contenu/2027-2028.mjs` (nouveau planning).
2. Ajouter ses codes dans `codes.json` et dans `BOX_CODES` sur Netlify.
3. Les années précédentes restent consultables : la box affiche un sélecteur d'année.

## Mise en ligne sur Netlify

1. Netlify > Add new site > Import from GitHub > `FrenchXP59/amos2026`.
2. Build command et publish directory sont lus dans `netlify.toml`.
3. Site settings > Environment variables > `BOX_CODES` = contenu de `codes.json` sur une ligne.
4. Domaine personnalisé : Domain management > Add domain.
