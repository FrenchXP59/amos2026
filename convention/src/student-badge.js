import * as THREE from 'three';
export const badgeURL=`${import.meta.env.BASE_URL}assets/badge-amos.png`;
// Le visuel fourni reste intact ; seule l'année d'études occupe la ligne prévue.
export function badgeTexture(image,group){
  const c=document.createElement('canvas');c.width=512;c.height=768;
  const ctx=c.getContext('2d');ctx.drawImage(image,0,0,512,768);
  ctx.fillStyle='#071b10';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 36px Arial';ctx.fillText(group.slice(0,2),256,669);
  const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}
