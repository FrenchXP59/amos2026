export const MISSIONS=[
  {id:'badge',label:'Récupérer mon badge'},
  {id:'cafe',label:'Prendre un café'},
  {id:'stand',label:'Découvrir un stand'},
  {id:'quiz',label:'Terminer le défi IA'},
  {id:'room',label:'Rejoindre ma salle'},
];
const valid=new Set(MISSIONS.map(m=>m.id));
export function readMissions(storage,group){
  try{const value=JSON.parse(storage.getItem('horizon-missions-v1-'+group));return new Set(Array.isArray(value)?value.filter(id=>valid.has(id)):[]);}catch{return new Set();}
}
export function completeMission(done,id,storage,group){
  if(!valid.has(id)||done.has(id))return false;
  done.add(id);
  try{storage.setItem('horizon-missions-v1-'+group,JSON.stringify([...done]));}catch{/* La visite reste utilisable si le stockage est indisponible. */}
  return true;
}
