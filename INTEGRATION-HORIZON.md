# HORIZON AI dans la box AMOS

Version préparée le 29 octobre 2026.

## Parcours

L’entrée `…/` ouvre la page HORIZON AI. Le moteur 3D et les modèles ne sont chargés qu’après le choix d’explorer. L’accès direct est proposé dès l’accueil. Les liens `…/#/2026-2027/b3b`, les applications et leurs paramètres de classe restent valables.

La convention est construite dans `dist/convention/`. Elle lit le catalogue public de l’année et reprend les intitulés réels pour les salles. Le badge et les missions restent facultatifs. Les noms Turing, Lovelace, Shannon, Hopper et Curie servent à la signalétique du hall ; les contenus viennent de la box.

Le formulaire d’accès partage `site/access.mjs` avec la box. Après validation du fichier de contenu et de sa classe, il mémorise son empreinte dans `amos-box.grants` puis ouvre la route de classe. Aucun code n’est mis dans l’URL. Le code saisi est vidé après vérification. Les anciennes entrées `amos-box.codes` sont migrées en empreinte lors d’une connexion réussie ; les autres préférences restent conservées. « Verrouiller sur cet appareil » efface cet accès.

Si le stockage du navigateur est bloqué, le formulaire propose d’ouvrir la box directement, où la connexion fonctionne en mémoire pour la page courante.

## Construction et Netlify

- `npm ci`, puis `npm run build` avec la variable **BOX_CODES** déjà utilisée par la box.
- Commande Netlify conservée : `node outils/build.mjs`. Dossier publié conservé : `dist`. Node passe à 22.
- Three.js et Vite sont installés via le `package-lock.json` versionné.
- Les fichiers JSON d’année et de classe sont ajoutés ; les fichiers JavaScript existants restent générés pour compatibilité.
- Pas de fonction Netlify ni de seconde liste de codes à configurer.
- Les avatars, affiches et le badge sont servis depuis le même site. Provenance dans `convention/CREDITS.md`.
- `npm run preview` sert le résultat construit sur le port 8080 ; `PORT=8180 npm run preview` choisit un autre port.

La configuration d’intégration est prête pour Netlify. Aucun déploiement en production n’a été effectué dans cette recette.

## Vérifications réalisées

- 16 tests automatisés réussis : calcul d’empreinte, classe/année, refus d’accès incohérents, transfert sans code en clair, stockage indisponible, accès direct conservé, missions, déplacements et collisions.
- Construction complète avec les codes lus depuis un fichier privé **extérieur au dépôt**.
- Les sept classes vérifiées sur le serveur local ; code B3B refusé pour B3A. Les valeurs n’apparaissent pas dans les résultats.
- 16 liens locaux vers les applications et ressources de séance vérifiés avec réponse HTTP 200.
- Analyse des sources et du résultat construit : aucune valeur privée fournie par le commanditaire.
- Chrome : entrée depuis `/`, accès direct B3B, ouverture des vraies séances, rechargement, verrouillage et reconnexion.
- Chrome : lien retour de la box vers la convention avec classe préselectionnée ; chargement du hall, choix M2B, plan, porte Curie, puis ouverture des vraies séances « IA et productivité » sans seconde saisie.
- Application de séance M2B ouverte et contexte de classe constaté.
- Préférence d’accès direct activée : l’entrée sans fragment ouvre ensuite la box, sans redirection vers la convention.

## Limites et point à traiter avant diffusion

Le mécanisme d’accès statique de la box est conservé : connaître l’empreinte donne accès au fichier de contenu. Ce n’est pas une session authentifiée côté serveur. Les cours restent lisibles dans le dépôt public. L’intégration ne prétend pas ajouter une protection forte des contenus.

Un code réel de B3B se trouvait dans un commentaire du script de construction dans le dépôt d’origine. Il est retiré du fichier dans cette version, sans être recopié ici. L’historique distant n’est pas réécrit : remplacer ce code dans la configuration privée avant diffusion reste nécessaire.

La visite conserve les limites de son prototype : deux modèles de base personnalisables, collisions par volumes simplifiés, activités sociales mises en scène, accueil écrit. Aucun nouveau film de bienvenue n’est ajouté. La lecture complète des vidéos de cours, tous les exercices et tous les navigateurs n’ont pas été retestés. Le contrôle mobile de cette intégration n’a pas pu être confirmé avec l’outil de redimensionnement ; la convention seule avait été contrôlée à 390 × 844 lors de sa recette précédente.
