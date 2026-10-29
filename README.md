# La box IA AMOS

Un espace par classe et par année pour les cours IA de Frédéric Legrand à AMOS Sport Business School : séances datées, vidéos NotebookLM, applis interactives et documents.

Site statique avec une introduction HORIZON AI facultative en Three.js. Node 22 et `npm ci` sont nécessaires au build ; aucun serveur applicatif supplémentaire n’est requis sur Netlify.

## Organisation

| Dossier | Contenu |
|---|---|
| `contenu/2026-2027.mjs` | **Le contenu de l'année** : cours (repris des syllabus), applis, classes, séances. C'est le fichier à modifier au quotidien. |
| `apps/` | Les applis interactives des cours (une par cours). `apps/ia-communication/` : B3, IA appliquée à la communication. |
| `convention/` | Introduction 3D, avatars, badge AMOS et parcours facultatif. |
| `site/` | La box elle-même (accueil, page de classe, styles, logo, polices). |
| `ressources/` | Les PDF à télécharger (à créer, un sous-dossier par classe conseillé). |
| `outils/build.mjs` | Génère le site publié dans `dist/`. |
| `codes.json` | Les codes des classes. **Jamais versionné** (voir `codes.exemple.json`). |

Adresses : `…/` (introduction facultative), `…/convention/` (visite), `…/#/` (année courante), `…/#/2026-2027/b3b` (une classe, à mettre en QR code).

## Accès par code

- Les codes ne sont pas dans le dépôt : le build les lit dans la variable d'environnement `BOX_CODES` (Netlify) ou dans `codes.json` (en local).
- Le contenu de chaque classe est écrit dans un fichier dont le nom est l'empreinte de son code. Sans le code, la box n'affiche que les dossards et les dates.
- **Limite** : tant que ce dépôt est public, le contenu des cours reste lisible sur GitHub. Pour un vrai cloisonnement, passer le dépôt en privé (Netlify fonctionne pareil).
- Aucune donnée personnelle d'étudiant dans la box.

## Travailler en local

```bash
npm ci
cp codes.exemple.json codes.json   # codes de démonstration uniquement, fichier ignoré
npm run build                      # génère dist/
npm run preview                    # http://127.0.0.1:8080
npm test
```

Pour les codes personnels, utiliser `BOX_CODES` depuis un fichier extérieur au dépôt ou la variable Netlify existante. Aucun code personnel ne doit être ajouté aux sources. Le mode `file://` n’est plus pris en charge : utiliser le serveur de prévisualisation.

## Introduction HORIZON AI

- L’adresse d’entrée sans fragment ouvre la convention. Les liens existants vers une année ou une classe restent directs.
- L’accès direct, disponible dès l’accueil, fonctionne sans charger le moteur 3D.
- Le plan et les portes reprennent les vrais intitulés depuis le catalogue de la box.
- Le code validé dans la convention ouvre la page de classe dans la box, sans seconde saisie.
- Le menu « Convention 3D » permet le retour depuis la box.
- Le choix de privilégier l’accès direct est conservé sur cet appareil.

Voir [INTEGRATION-HORIZON.md](INTEGRATION-HORIZON.md) pour les changements, vérifications et limites.

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
