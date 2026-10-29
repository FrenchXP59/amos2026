export const LOOK_OPTIONS={
  outfit:[['horizon','Bleu Horizon','#3e6575'],['campus','Campus cuivré','#ac5962'],['sage','Vert sauge','#8ca793']],
  skin:[['original','Teint du modèle',null],['light','Clair','#dab49a'],['medium','Médium','#b8805b'],['deep','Foncé','#71432f']],
  hair:[['original','Naturels',null],['dark','Bruns','#352820'],['copper','Châtains','#7c4e32'],['gold','Blonds','#ba965e']],
  face:[['natural','Naturels',1],['slender','Fins',.94],['soft','Arrondis',1.07]],
  accessory:[['backpack','Sac à dos'],['glasses','Lunettes'],['cap','Casquette'],['none','Sans accessoire supplémentaire']],
};
export const DEFAULT_LOOK={outfit:'horizon',skin:'original',hair:'original',face:'natural',accessory:'backpack'};
export function normalizeLook(input={}){return Object.fromEntries(Object.entries(LOOK_OPTIONS).map(([key,values])=>[key,values.some(v=>v[0]===input[key])?input[key]:DEFAULT_LOOK[key]]));}
export function lookValue(key,id){return LOOK_OPTIONS[key].find(item=>item[0]===id)?.[2];}
export function visitorLook(index){return {outfit:['horizon','campus','sage'][index%3],skin:['original','medium','light','deep'][index%4],hair:['original','dark','copper','gold'][index%4],face:['natural','slender','soft'][index%3],accessory:['backpack','none','glasses','none','cap'][index%5]};}
