// Les cinq conférences ci-dessous sont des exemples, pas le programme officiel AMOS.
export const SETTINGS = {
  event: 'HORIZON AI', host: 'Frédéric Legrand', mode: 'remote',
  // En production : mode: 'remote' et endpoint HTTPS de votre application.
  accessEndpoint: '/api/access',
  // Les destinations renvoyées par votre serveur doivent appartenir à ces origines.
  allowedCourseOrigins: [],
};
export const ROOMS = [
  {id:'B1',level:'Bachelor 1',name:'Turing',title:'Premiers pas avec l’IA',subtitle:'Comprendre, essayer, prendre du recul.',color:'#368b96',x:-24,z:14,doorX:-19.3,doorZ:14,lesson:'Une IA générative propose un résultat à partir de régularités apprises. Elle peut aider à explorer des idées, mais ses réponses doivent être vérifiées.',task:'Imaginez un événement sportif étudiant. Formulez une demande à une IA en précisant le public, l’objectif et trois contraintes.'},
  {id:'B2',level:'Bachelor 2',name:'Lovelace',title:'Créer avec l’IA',subtitle:'De l’idée au contenu qui fait sens.',color:'#b4688e',x:-24,z:-1,doorX:-19.3,doorZ:-1,lesson:'Un bon brief donne un objectif, un public, un format et des critères de réussite. La création assistée gagne en qualité grâce aux itérations et à la vérification humaine.',task:'Rédigez le brief d’une campagne de communication pour un club sportif. Définissez les critères qui permettront de choisir une proposition.'},
  {id:'B3',level:'Bachelor 3',name:'Shannon',title:'Automatiser avec méthode',subtitle:'Relier les outils, garder le contrôle.',color:'#c18b43',x:-24,z:-16,doorX:-19.3,doorZ:-16,lesson:'Une automatisation associe un déclencheur, des actions et des contrôles. Les exceptions doivent être prévues avant sa mise en service.',task:'Décrivez le traitement d’une inscription à un événement : déclencheur, données, actions et contrôle humain.'},
  {id:'M1',level:'Master 1',name:'Hopper',title:'Piloter un projet IA',subtitle:'Transformer un besoin en projet utile.',color:'#637ac0',x:24,z:0,doorX:19.3,doorZ:0,lesson:'Un projet IA commence par un problème précis et un résultat mesurable. Un prototype permet de tester les hypothèses avant d’élargir l’usage.',task:'Choisissez un problème d’organisation d’un événement sportif. Définissez un indicateur de réussite et une limite à ne pas dépasser.'},
  {id:'M2',level:'Master 2',name:'Curie',title:'IA, stratégie & responsabilité',subtitle:'Décider avec discernement.',color:'#578675',x:24,z:-16,doorX:19.3,doorZ:-16,lesson:'La valeur d’un projet IA dépend de son utilité, de la fiabilité de ses résultats, de son coût et de la maîtrise des risques pour les personnes concernées.',task:'Préparez une recommandation sur l’usage de l’IA dans une organisation sportive : valeur attendue, risques et conditions de déploiement.'},
];
export const THEMES = [
  {id:'agents',label:'Agents IA',title:'L’IA qui agit',file:'01-ia-qui-agit',color:'#35c6dc',x:-11,z:10,body:'Des assistants capables d’enchaîner des actions : rechercher, organiser et préparer. Un objectif clair et une validation humaine gardent le travail sous contrôle.'},
  {id:'auto',label:'Automatisation',title:'Des idées aux actions',file:'02-automatisation',color:'#e6a545',x:11,z:10,body:'Relier les outils pour simplifier les tâches répétitives. Commencez par un processus court, vérifiable et facile à interrompre.'},
  {id:'humain',label:'Humain + IA',title:'L’intelligence se partage',file:'03-humain-plus-ia',color:'#d6b66d',x:-11,z:-1,body:'La machine propose, l’humain met en contexte. Curiosité, jugement et connaissance du terrain restent au cœur du travail.'},
  {id:'creation',label:'Création de contenu',title:'Ouvrir les possibles',file:'04-creation-contenu',color:'#d779ae',x:11,z:-1,body:'Explorer une idée, varier les formats et améliorer un brouillon. La qualité vient d’un brief précis et d’un regard éditorial.'},
  {id:'responsable',label:'IA responsable',title:'Innover avec discernement',file:'05-ia-responsable',color:'#59b9a1',x:-11,z:-12,body:'Vérifier les sources, limiter les données partagées et s’interroger sur les biais. Une réponse convaincante n’est pas toujours une réponse juste.'},
  {id:'travail',label:'Travail augmenté',title:'Plus de place pour l’essentiel',file:'06-travail-augmente',color:'#e79c59',x:11,z:-12,body:'Réserver les tâches automatisables aux outils et consacrer davantage de temps à la relation, à la création et aux décisions.'},
];
export const PLACES = [
  {id:'welcome',label:'Accueil & badges',x:0,z:24},
  {id:'duo',label:'Horizon Duo',x:-12,z:24},
  {id:'cafe',label:'Le café',x:24,z:18},
  {id:'quiz',label:'Le défi IA',x:12,z:24},
  {id:'stage',label:'Scène principale',x:0,z:-22},
];
export function getRoom(id){return ROOMS.find(r=>r.id===id)||ROOMS[0];}

export const GROUPS = ['B1A','B2A','B3A','B3B','M1A','M2A','M2B'].map(id=>({id,roomId:id.slice(0,2)}));
