import * as THREE from 'three';
import {applyLook,addAccessories} from './avatar-details.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

// Aperçus réels, rendus une seule fois. Aucun moteur ne tourne derrière la fenêtre.
export async function mountAvatarPreviews(cards,appearance,isCurrent=()=>true){
  const cleanups=[];
  await Promise.all(cards.map(async card=>{
    const gender=card.dataset.avatar,base=`${import.meta.env.BASE_URL}assets/models/`;
    let asset,renderer;
    try{
      const [model,clips]=await Promise.all([new GLTFLoader().loadAsync(base+gender+'.glb'),fetch(base+(gender==='female'?'female-motion.json':'male-idle.json')).then(r=>r.json())]);asset=model;
      const cleanup=()=>{const materials=new Set(),textures=new Set();model.scene.traverse(o=>{o.geometry?.dispose();if(o.isSkinnedMesh)o.skeleton.dispose();for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){materials.add(m);for(const value of Object.values(m))if(value?.isTexture)textures.add(value);}});materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer?.dispose();renderer?.domElement.remove();};
      cleanups.push(cleanup);if(!card.isConnected||!isCurrent())return;
      const height=new THREE.Box3().setFromObject(model.scene).getSize(new THREE.Vector3()).y;
      model.scene.scale.setScalar((gender==='female'?1.72:1.85)/height);
      const look=applyLook(model.scene,gender,appearance);
      const mixer=new THREE.AnimationMixer(model.scene);mixer.clipAction(THREE.AnimationClip.parse(clips.find(c=>c.name==='Idle'))).play();mixer.update(.5);
      const scene=new THREE.Scene();scene.add(model.scene);addAccessories(model.scene,gender,look,{badge:false});model.scene.rotation.y=-.2;
      scene.add(new THREE.HemisphereLight('#ffffff','#b8baa9',2.5));const light=new THREE.DirectionalLight('#fff7e8',2);light.position.set(3,4,5);scene.add(light);
      const camera=new THREE.PerspectiveCamera(32,1,.1,20);camera.position.set(0,1.2,3.9);camera.lookAt(0,1,0);
      renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});const w=card.clientWidth,h=card.clientHeight;renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(w,h);renderer.toneMapping=THREE.ACESFilmicToneMapping;camera.aspect=w/h;camera.updateProjectionMatrix();card.append(renderer.domElement);renderer.render(scene,camera);
    }catch{if(asset&&!renderer)asset.scene.traverse(o=>o.geometry?.dispose());}
  }));
  return ()=>cleanups.forEach(dispose=>dispose());
}
