# Provenance des ressources

## Identité et affiches

Les six affiches Horizon Duo et le portrait de Frédéric Legrand proviennent du dossier fourni par le commanditaire `projet astra-amos/affiches-horizonduo-ai`. Les JPEG du décor sont des versions redimensionnées des PNG fournis. Aucun portrait n’a été envoyé à un service de génération d’avatars.

Le visuel « Badge étudiant futuriste IA » est fourni par le commanditaire. Le PNG original est conservé intact ; l’année d’études est superposée par l’interface et par la texture du badge porté.

L’architecture, la signalétique HORIZON AI, le mobilier, le plan et l’interface ont été créés pour cette expérience.

## Personnage féminin et animations

**Michelle**, personnage Mixamo, fichier récupéré dans les exemples officiels Three.js r180 :
https://github.com/mrdoob/three.js/blob/r180/examples/models/gltf/Michelle.glb

Les animations d’attente, de marche, de course et de geste ont été adaptées au squelette de Michelle à partir de **Xbot**, également dans les exemples officiels :
https://github.com/mrdoob/three.js/blob/r180/examples/models/gltf/Xbot.glb

Les clips adaptés sont stockés dans `female-motion.json`. Les couleurs des vêtements, de la peau et des cheveux sont personnalisables au rendu. Une déformation légère ajuste la largeur du visage. Les lunettes, casquettes, sacs et badges sont des accessoires procéduraux attachés au squelette. Les coiffures et les deux modèles de base restent identiques.

Les personnages et animations Mixamo restent soumis aux conditions Adobe/Mixamo. Adobe autorise leur incorporation dans des projets personnels, commerciaux et éducatifs ; les fichiers ne doivent pas être redistribués comme une bibliothèque d’assets autonome. Ils sont ici incorporés à la convention, avec ses sources destinées à son propriétaire.

Références officielles :
- https://helpx.adobe.com/ie/creative-cloud/faq/mixamo-faq.html
- https://community.adobe.com/questions-696/mixamo-faq-licensing-royalties-ownership-eula-and-tos-589400

La licence MIT de Three.js concerne le moteur ; elle ne remplace pas les conditions propres aux modèles.

## Personnage masculin

**Rigged male camper in plaid flannel shirt**, publié sur VibeAssets, identifiant `zpepqtthci`, déclaré **CC0** par sa page d’origine :
https://vibeassets.io/a/zpepqtthci

Modèle créé avec Meshy, textures et animations de marche/course incluses. Une animation d’attente avec respiration a été créée pour cette expérience (`male-idle.json`). Il représente un personnage générique, pas Frédéric Legrand.

## Logiciels et polices

- Three.js 0.180.0 : MIT, https://github.com/mrdoob/three.js
- Vite 6.3.6 : MIT, https://github.com/vitejs/vite
- DM Sans et Manrope : Google Fonts, SIL Open Font License. Chargement externe avec polices système de repli.
- Icônes SVG simples, ambiance sonore synthétique et éléments procéduraux créés pour cette application.

Les modèles sont servis localement avec l’application. Aucun service externe d’avatar n’est nécessaire pendant la visite.
