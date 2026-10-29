// Salles alignées sur les cours AMOS 2026-2027 ; les titres réels sont relus dans la box au chargement.
export const SETTINGS = {
  event: 'HORIZON AI', host: 'Frédéric Legrand', mode: 'remote',
  // En production : mode: 'remote' et endpoint HTTPS de votre application.
  accessEndpoint: '/api/access',
  // Les destinations renvoyées par votre serveur doivent appartenir à ces origines.
  allowedCourseOrigins: [],
};
export const ROOMS = [
  {id:'B1',level:'Bachelor 1',name:'Turing',title:'Concours de vente · Fondamentaux de l’IA',subtitle:'Écouter, convaincre, puis découvrir l’IA.',color:'#368b96',x:-24,z:14,doorX:-19.3,doorZ:14},
  {id:'B2',level:'Bachelor 2',name:'Lovelace',title:'IA et marketing',subtitle:'Cibler, créer, mesurer avec l’IA.',color:'#b4688e',x:-24,z:-1,doorX:-19.3,doorZ:-1},
  {id:'B3',level:'Bachelor 3',name:'Shannon',title:'IA appliquée à la communication',subtitle:'Du brief au contenu, avec une IA qui agit sous contrôle.',color:'#c18b43',x:-24,z:-16,doorX:-19.3,doorZ:-16},
  {id:'M1',level:'Master 1',name:'Hopper',title:'IA et automatisation',subtitle:'Veiller, automatiser, garder la main.',color:'#637ac0',x:24,z:0,doorX:19.3,doorZ:0},
  {id:'M2',level:'Master 2',name:'Curie',title:'IA et productivité',subtitle:'Décider avec l’IA, manager une équipe augmentée.',color:'#578675',x:24,z:-16,doorX:19.3,doorZ:-16},
];
// Un stand par niveau, placé face à la salle de ce niveau ; le stand « IA responsable » concerne toutes les classes.
export const THEMES = [
  {id:'humain',level:'B1',label:'Humain + IA',title:'L’intelligence se partage',file:'03-humain-plus-ia',color:'#368b96',x:-11,z:10,body:'Avant l’outil, il y a l’écoute : comprendre un client, convaincre, puis découvrir ce que l’IA change. La machine propose, l’humain met en contexte.'},
  {id:'creation',level:'B2',label:'Création de contenu',title:'Ouvrir les possibles',file:'04-creation-contenu',color:'#b4688e',x:-11,z:-1,body:'Cibler, varier les formats, améliorer un brouillon : l’IA accélère le marketing, la qualité vient d’un brief précis et d’un regard éditorial.'},
  {id:'agents',level:'B3',label:'Agents IA',title:'L’IA qui agit',file:'01-ia-qui-agit',color:'#c18b43',x:-11,z:-12,body:'Des assistants capables d’enchaîner des actions : analyser un brief, préparer des publications, ranger des fichiers. Un objectif clair et une validation humaine gardent le travail sous contrôle.'},
  {id:'auto',level:'M1',label:'Automatisation',title:'Des idées aux actions',file:'02-automatisation',color:'#637ac0',x:11,z:-1,body:'Veiller, relier les outils, simplifier les tâches répétitives. Commencez par un flux court, vérifiable et facile à interrompre, avec une validation avant tout envoi au client.'},
  {id:'travail',level:'M2',label:'Travail augmenté',title:'Plus de place pour l’essentiel',file:'06-travail-augmente',color:'#578675',x:11,z:-12,body:'Confier à l’IA ce qui peut l’être, garder pour soi le jugement et la décision. Manager une équipe augmentée, c’est aussi fixer ses règles d’usage.'},
  {id:'responsable',level:null,label:'IA responsable',title:'Innover avec discernement',file:'05-ia-responsable',color:'#59b9a1',x:11,z:10,body:'Vérifier les sources, limiter les données partagées, s’interroger sur les biais. Une réponse convaincante n’est pas toujours une réponse juste. Pour toutes les classes.'},
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
