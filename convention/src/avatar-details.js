import * as THREE from 'three';
import {tintClothing} from './avatar-material.js';
import {normalizeLook,lookValue} from './avatar-options.js';
const prepared=new WeakMap();
const boneKey=name=>name.replace(/^mixamorig[:]?/,'').toLowerCase();
export function getBones(model){const bones={};model.traverse(b=>{if(b.isBone)bones[boneKey(b.name)]=b;});return bones;}
export function applyLook(model,gender,input){
  const look=normalizeLook(input);model.updateMatrixWorld(true);
  const rootInverse=model.matrixWorld.clone().invert(),bounds=new THREE.Box3().setFromObject(model),height=bounds.max.y-bounds.min.y;
  model.traverse(mesh=>{
    if(!mesh.isSkinnedMesh)return;
    let variants=prepared.get(mesh.geometry);if(!variants){variants=new Map();prepared.set(mesh.geometry,variants);}
    const cacheKey=gender+'-'+look.face;
    if(!variants.has(cacheKey)){
      const geometry=mesh.geometry.clone(),position=geometry.attributes.position,indices=geometry.attributes.skinIndex,weights=geometry.attributes.skinWeight,mask=new Float32Array(position.count*2);
      const world=new THREE.Vector3(),localMatrix=mesh.matrixWorld.clone(),inverse=localMatrix.clone().invert();
      for(let i=0;i<position.count;i++){
        let exposed=0,head=0;
        for(let j=0;j<4;j++){const bone=mesh.skeleton.bones[indices.getComponent(i,j)],key=bone?boneKey(bone.name):'',weight=weights.getComponent(i,j);if(/head|neck|hand/.test(key)||(gender==='female'&&/arm/.test(key)))exposed+=weight;if(/head/.test(key))head+=weight;}
        world.fromBufferAttribute(position,i).applyMatrix4(localMatrix);const y=(world.y-bounds.min.y)/height;
        mask[i*2]=exposed;mask[i*2+1]=head*THREE.MathUtils.smoothstep(y,.89,.96);
        if(head>.3&&look.face!=='natural'){
          const root=world.clone().applyMatrix4(rootInverse);root.x*=1+(lookValue('face',look.face)-1)*head;
          world.copy(root).applyMatrix4(model.matrixWorld).applyMatrix4(inverse);position.setXYZ(i,world.x,world.y,world.z);
        }
      }
      geometry.setAttribute('horizonMask',new THREE.BufferAttribute(mask,2));if(look.face!=='natural')geometry.computeVertexNormals();variants.set(cacheKey,geometry);
    }
    mesh.geometry=variants.get(cacheKey);
    const update=m=>{const material=m.clone();material.roughness=Math.max(.65,material.roughness);material.metalness=0;tintClothing(material,gender,lookValue('outfit',look.outfit),{skin:lookValue('skin',look.skin),hair:lookValue('hair',look.hair)});return material;};
    mesh.material=Array.isArray(mesh.material)?mesh.material.map(update):update(mesh.material);mesh.castShadow=mesh.receiveShadow=true;
  });
  return look;
}
// Les accessoires sont attachés aux os : ils suivent le corps pendant la marche et les gestes.
export function addAccessories(model,gender,look,{badge=false,name='HORIZON AI',group='VISITEUR',badgeMap=null}={}){
  const bones=getBones(model);model.updateMatrixWorld(true);
  const height=(gender==='female'?1.72:1.85),root=new THREE.Group();model.parent.add(root);
  const mat=color=>new THREE.MeshStandardMaterial({color,roughness:.8});
  const fabric=mat(lookValue('outfit',look.outfit)),dark=mat('#223d43'),cream=mat('#ececdf');
  function attach(bone,items){
    const part=new THREE.Group();root.add(part);for(const item of items)part.add(item);root.updateMatrixWorld(true);bone.attach(part);return part;
  }
  const box=(w,h,d,x,y,z,m)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);return o;};
  // Accessory dimensions are in world metres, converted by Object3D.attach.
  root.position.copy(model.parent.position).multiplyScalar(0);root.scale.setScalar(model.parent.userData.bodyScale||1);
  const chest=bones.spine2||bones.spine,head=bones.head;
  if(look.accessory==='backpack'&&chest){attach(chest,[box(.29,.38,.14,0,height*.66,-.15,fabric),box(.19,.17,.025,0,height*.62,-.235,dark),box(.035,.4,.025,-.13,height*.7,.135,dark),box(.035,.4,.025,.13,height*.7,.135,dark)]);}
  if(look.accessory==='glasses'&&head){
    const pieces=[];for(const x of [-.049,.049]){const lens=new THREE.Mesh(new THREE.TorusGeometry(.041,.006,6,16),dark);lens.position.set(x,height*.91,gender==='female'?.10:.115);pieces.push(lens);}pieces.push(box(.028,.009,.01,0,height*.91,.12,dark));attach(head,pieces);
  }
  if(look.accessory==='cap'&&head){const cap=new THREE.Mesh(new THREE.SphereGeometry(.115,16,10,0,Math.PI*2,0,Math.PI/2),fabric);cap.position.set(0,height*.962,0);const visor=box(.18,.015,.16,0,height*.965,.10,fabric);attach(head,[cap,visor]);}
  if(badge&&chest){
    const canvas=document.createElement('canvas');canvas.width=256;canvas.height=320;const ctx=canvas.getContext('2d');ctx.fillStyle='#173d44';ctx.fillRect(0,0,256,320);ctx.fillStyle='#d4e3c3';ctx.font='bold 30px Arial';ctx.textAlign='center';ctx.fillText('HORIZON AI',128,62);ctx.fillStyle='white';ctx.font='24px Arial';ctx.fillText(name.slice(0,18),128,174,228);ctx.font='bold 26px Arial';ctx.fillText(group,128,238);
    const texture=badgeMap||new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;const card=new THREE.Mesh(new THREE.PlaneGeometry(.135,.2025),new THREE.MeshStandardMaterial({map:texture,roughness:.8,side:THREE.DoubleSide}));card.position.set(0,height*.69,.176);card.name='studentBadge';
    const straps=[-.04,.04].map(x=>{const band=box(.014,.21,.008,x,height*.79,.145,dark);band.rotation.z=x<0?-.23:.23;return band;});attach(chest,[card,...straps]);
  }
  root.removeFromParent();return bones;
}
