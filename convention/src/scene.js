import * as THREE from 'three';
import {applyLook,addAccessories} from './avatar-details.js';
import {visitorLook} from './avatar-options.js';
import {badgeURL,badgeTexture} from './student-badge.js';
import {giveActivity,restoreActivity,animateActivity} from './crowd-life.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {ROOMS, THEMES, PLACES} from './config.js';
import {moveWithCollisions, findPath, findFreePosition, steerAroundPeople} from './navigation.js';

export async function createConvention(container,{onProgress,onPosition,onInteraction,onError,quality='auto',reducedMotion=false,avatar='male',appearance,groupId='B1A',badgeCollected=false}={}){
  const avatarLoader=new GLTFLoader(),root=`${import.meta.env.BASE_URL}assets/models/`;
  const [male,female,maleMotion,femaleMotion]=await Promise.all([
    avatarLoader.loadAsync(root+'male.glb'),avatarLoader.loadAsync(root+'female.glb'),
    fetch(root+'male-idle.json').then(r=>r.json()),fetch(root+'female-motion.json').then(r=>r.json())
  ]);
  const badgeImage=await new THREE.ImageLoader().loadAsync(badgeURL);
  const characterAssets={male,female};male.animations.push(...maleMotion.map(c=>THREE.AnimationClip.parse(c)));
  female.animations=femaleMotion.map(c=>THREE.AnimationClip.parse(c));
  for(const asset of Object.values(characterAssets))asset.height=new THREE.Box3().setFromObject(asset.scene).getSize(new THREE.Vector3()).y;
  const mobile=matchMedia('(max-width: 800px)').matches;
  let low=quality==='low'||(quality==='auto'&&mobile),disposed=false,paused=false,lastTime=0,fpsCount=0,fpsTime=0;
  const disposables=[],obstacles=[],cameraMeshes=[],actors=[],interactions=[];
  const scene=new THREE.Scene();scene.background=new THREE.Color('#e5e9e6');scene.fog=new THREE.Fog('#e5e9e6',38,94);
  const camera=new THREE.PerspectiveCamera(56,1,.1,115);
  const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,low?1:1.65));renderer.setSize(container.clientWidth,container.clientHeight);
  renderer.shadowMap.enabled=!low;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.06;
  container.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','Hall 3D de la convention HORIZON AI');renderer.domElement.tabIndex=0;
  const pmrem=new THREE.PMREMGenerator(renderer),envScene=new RoomEnvironment();
  const env=pmrem.fromScene(envScene,.04);scene.environment=env.texture;scene.environmentIntensity=.32;envScene.dispose();pmrem.dispose();
  const mat=(color,roughness=.7,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
  const palette={floor:mat('#cbd0c9',.54),white:mat('#eeeee6'),navy:mat('#12353d'),wood:mat('#bc9368'),woodDark:mat('#8e7054'),metal:mat('#34494b',.4,.65),soft:mat('#d7d4c9'),green:mat('#4e7961'),soil:mat('#544432'),light:new THREE.MeshStandardMaterial({color:'#fff7da',emissive:'#fff0ce',emissiveIntensity:.65})};
  const boxGeo=new THREE.BoxGeometry(1,1,1),sphereGeo=new THREE.SphereGeometry(1,12,10),cylGeo=new THREE.CylinderGeometry(1,1,1,14),capsGeo=new THREE.CapsuleGeometry(1,1,4,10);
  const add=(geometry,material,x,y,z,sx=1,sy=1,sz=1,parent=scene)=>{const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
  function box(w,h,d,x,y,z,material=palette.white,collision=false){const m=add(boxGeo,material,x,y,z,w,h,d);if(collision){obstacles.push({x,z,w,d});cameraMeshes.push(m);}return m;}
  const cylinder=(r,h,x,y,z,m=palette.metal)=>add(cylGeo,m,x,y,z,r,h,r);
  function label(text,w,h,x,y,z,{bg='#16373d',color='#ffffff',rotate=0,font=74,sub='',align='center'}={}){
    const c=document.createElement('canvas');c.width=1024;c.height=Math.max(128,Math.round(1024*h/w));const cx=c.getContext('2d');cx.fillStyle=bg;cx.fillRect(0,0,c.width,c.height);cx.fillStyle=color;cx.textAlign=align;cx.textBaseline='middle';cx.font=`600 ${font}px Arial, sans-serif`;
    cx.fillText(text,align==='center'?512:42,c.height*(sub?.37:.5),950);if(sub){cx.font=`400 ${font*.38}px Arial, sans-serif`;cx.globalAlpha=.8;cx.fillText(sub,align==='center'?512:42,c.height*.76,950);}
    const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const material=new THREE.MeshBasicMaterial({map:t});const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),material);m.position.set(x,y,z);m.rotation.y=rotate;scene.add(m);disposables.push(t);return m;
  }
  function plant(x,z,size=1){
    obstacles.push({x,z,w:.68*size,d:.68*size});
    cylinder(.38*size,.65*size,x,.33*size,z,palette.soft);cylinder(.31*size,.02,x,.66*size,z,palette.soil);
    cylinder(.045*size,1.1*size,x,1.13*size,z,palette.woodDark);
    for(let i=0;i<6;i++){const a=i*2.4;const leaf=add(sphereGeo,palette.green,x+Math.cos(a)*.23*size,(1.2+i*.09)*size,z+Math.sin(a)*.23*size,.18*size,.52*size,.12*size);leaf.rotation.z=Math.sin(a)*.7;leaf.rotation.y=a;}
  }
  function chair(x,z,rotation=0){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rotation;scene.add(g);add(boxGeo,palette.navy,0,.48,0,.65,.12,.62,g);add(boxGeo,palette.navy,0,.89,.27,.65,.72,.1,g);for(const a of [-.25,.25])for(const b of [-.23,.23])add(cylGeo,palette.metal,a,.23,b,.025,.46,.025,g);return g;}
  function table(x,z,r=.65){cylinder(r,.07,x,.9,z,palette.wood);cylinder(.06,.87,x,.43,z);cylinder(.36,.04,x,.02,z);obstacles.push({x,z,w:r*2,d:r*2});}
  function person(x,z,{style=0,gender=style%2?'female':'male',scale=1,staticPose=false,look=visitorLook(style),student=false}={}){
    const asset=characterAssets[gender],g=new THREE.Group();g.position.set(x,0,z);g.userData.bodyScale=scale;scene.add(g);
    const model=cloneSkeleton(asset.scene);g.add(model);model.scale.setScalar((gender==='female'?1.72:1.85)/asset.height*scale);
    const normalized=applyLook(model,gender,look),mixer=new THREE.AnimationMixer(model),actions={};
    for(const clip of asset.animations)actions[clip.name]=mixer.clipAction(clip);
    actions.Idle?.play();mixer.update(Math.random()*2);
    const bones=addAccessories(model,gender,normalized,{badge:student,badgeMap:student?badgeTexture(badgeImage,groupId):null});
    return {group:g,model,bones,mixer,actions,action:'Idle',phase:Math.random()*6,staticPose,radius:.39*scale,gender};
  }
  scene.add(new THREE.HemisphereLight('#f4fbff','#959a86',1.4));
  const sun=new THREE.DirectionalLight('#fff3da',2.7);sun.position.set(-15,24,17);sun.castShadow=!low;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-34,right:34,top:34,bottom:-34,near:.1,far:75});sun.shadow.bias=-.00035;sun.shadow.normalBias=.035;scene.add(sun);sun.target.position.set(0,0,-5);scene.add(sun.target);
  const fill=new THREE.DirectionalLight('#c8ecf3',.8);fill.position.set(20,14,-20);scene.add(fill);
  // Envelope, terrazzo floor, timber paths and roof structure.
  box(58,.2,60,0,-.12,0,palette.floor);
  box(5,.012,53,0,.005,1,palette.soft);
  for(let x=-28;x<=28;x+=2)box(.016,.008,58,x,.008,0,palette.soft);
  for(let z=-29;z<=29;z+=2)box(56,.008,.016,0,.008,z,palette.soft);
  for(const x of [-2.7,2.7])box(.035,.014,52,x,.012,0,palette.wood);
  box(.35,10,60,-28.4,5,0,palette.white,true);box(.35,10,60,28.4,5,0,palette.white,true);
  box(57,10,.35,0,5,-29.4,palette.white,true);box(57,10,.35,0,5,29.4,palette.white,true);
  // Ceiling coffers and luminous skylights make the scene unmistakably indoors.
  for(let z=-26;z<=26;z+=8){box(57,.42,.38,0,9.1,z,palette.white);for(const x of [-20,20])box(.42,9.2,.42,x,4.6,z,palette.white,true);}
  for(let x=-26;x<=26;x+=6){box(.2,.4,58,x,9.45,0,palette.white);box(5.7,.10,58,x+2.8,9.8,0,mat('#e5ece8')).castShadow=false;}
  for(const x of [-8,8])for(let i=0;i<13;i++)box(.15,.26,52,x+i*.28,8.88,0,palette.wood);
  for(let z=-22;z<=24;z+=9)for(const x of [-18,-5,5,18])box(2.5,.05,.13,x,8.8,z,palette.light);
  // Suspended wayfinding.
  for(const [z,title,sub] of [[18,'HORIZON AI','CONFÉRENCES  ← B1 · B2 · B3     M1 · M2 →'],[2,'LES POSSIBLES COMMENCENT ICI','SCÈNE PRINCIPALE ↑      CONFÉRENCES ← →']]){
    box(8,.95,.13,0,5.9,z,palette.navy);label(title,7.7,.86,0,5.9,z+.075,{font:52,sub});
    for(const x of [-3,3])cylinder(.012,3,x,7.85,z,palette.metal);
  }
  // Reception: slatted timber counter and welcome host.
  box(4.6,1.02,.9,0,.51,23,palette.wood,true);box(4.8,.08,1.05,0,1.06,23,palette.white);
  for(let x=-2.2;x<2.3;x+=.15)box(.035,.85,.03,x,.5,23.47,palette.woodDark);
  label('BIENVENUE',3.5,.43,0,.73,23.50,{bg:'#bc9368',color:'#18353b',font:76});
  label('FRÉDÉRIC LEGRAND  ·  HORIZON DUO',4.8,.55,0,3.5,26.8,{bg:'#e5e8df',color:'#18353b',font:44});
  box(5.2,3.5,.18,0,2.2,29.1,palette.white);label('HORIZON AI',4.7,1.3,0,2.65,28.98,{rotate:Math.PI,bg:'#eeeee6',color:'#193d44',font:95});
  const host=person(0,21.9,{coat:'#34545d',skin:'#bb8d73'});actors.push(host);host.group.rotation.y=Math.PI;
  plant(-3.2,23,1.3);plant(3.2,23,1.3);
  interactions.push({id:'welcome',x:0,z:21,label:'Retirer mon badge',type:'welcome',radius:4.8});
  // Conference suites with glazed facades and wide open doors.
  const glass=new THREE.MeshPhysicalMaterial({color:'#a3c8c5',transparent:true,opacity:.22,roughness:.16,metalness:.1,depthWrite:false,side:THREE.DoubleSide});
  for(const r of ROOMS){
    const side=Math.sign(r.x),wallX=side*20.4;
    box(7.2,.03,10,r.x,.02,r.z,mat('#bbb8a9'));
    box(7.8,4.2,.14,r.x,2.1,r.z-5,palette.white,true);box(7.8,4.2,.14,r.x,2.1,r.z+5,palette.white,true);
    for(const dz of [-3.3,3.3]){box(.09,3.8,3.4,wallX,1.9,r.z+dz,glass,true);for(const off of [-1.7,1.7])box(.10,4,.07,wallX,2,r.z+dz+off,palette.metal);}
    box(.25,.9,10.1,wallX,4.2,r.z,palette.navy);
    label(`${r.id}  /  ${r.name.toUpperCase()}`,8.8,.72,wallX-side*.15,4.23,r.z,{rotate:-side*Math.PI/2,font:70,sub:r.level.toUpperCase()});
    box(.14,.07,2.8,wallX-side*.12,.04,r.z,mat(r.color));
    // Room presentation screen on outer wall, facing the central hall.
    label(r.title,5.7,1.75,side*27.9,2.6,r.z,{rotate:-side*Math.PI/2,bg:'#16373d',font:62,sub:`${r.level}  ·  LA BOX IA · AMOS`});
    for(let row=0;row<2;row++)for(let col=0;col<3;col++){const ch=chair(r.x+(row-0.5)*1.65,r.z+(col-1)*1.45,side*Math.PI/2);obstacles.push({x:ch.position.x,z:ch.position.z,w:.7,d:.7});}
    plant(wallX-side*.8,r.z-4,1);interactions.push({id:r.id,x:r.doorX,z:r.doorZ,label:`Entrer · Salle ${r.name}`,type:'room',radius:3.5});
  }
  // Keynote stage, timber backdrop and projection screen.
  box(16,.5,5.5,0,.25,-26.2,palette.navy,true);box(15.7,.06,5.3,0,.53,-26.2,palette.wood);
  for(let x=-9;x<=9;x+=.23)box(.095,7,.17,x,3.5,-29,palette.wood);
  box(12,4,.23,0,4.5,-28.6,palette.navy);
  label('HORIZON AI',11.7,3.7,0,4.5,-28.45,{font:110,sub:'L’INTELLIGENCE ARTIFICIELLE, ENSEMBLE.'});
  label('LA SCÈNE DES POSSIBLES',8,.65,0,1,-23.4,{font:56});
  box(.8,1.25,.65,-5,1.15,-25,palette.white);plant(-8,-24,1.6);plant(8,-24,1.6);
  const speaker=person(-4.2,-26,{coat:'#7a8579',scale:1.05});speaker.group.position.y=.54;actors.push(speaker);
  for(let row=0;row<4;row++)for(const side of [-1,1])for(let col=0;col<3;col++){
    const x=side*(3.4+col*1.05),z=-16.5-row*1.4;chair(x,z,0);obstacles.push({x,z,w:.68,d:.7});
  }
  interactions.push({id:'stage',x:0,z:-22,label:'Découvrir le programme',type:'stage'});
  // Six exhibition stands, open toward the central circulation.
  const manager=new THREE.LoadingManager();let loaded=0;
  const loader=new THREE.TextureLoader(manager);
  const textures=await Promise.all(THEMES.map(t=>new Promise(resolve=>{
    loader.load(`${import.meta.env.BASE_URL}assets/affiches/${t.file}.jpg`,tex=>{tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();onProgress?.(++loaded/6);resolve(tex);},undefined,()=>{onError?.(`Affiche indisponible : ${t.label}`);onProgress?.(++loaded/6);resolve(null);});
  })));
  for(let i=0;i<THEMES.length;i++){
    const t=THEMES[i],side=Math.sign(t.x),frontZ=t.z+2.3;
    box(6.8,.025,6,t.x,.025,t.z,palette.soft);
    box(6.5,3.45,.22,t.x,1.73,t.z-1.8,palette.wood,true);
    box(6.6,.18,.36,t.x,3.58,t.z-1.8,palette.white);
    box(6.4,.04,.3,t.x,3.45,t.z-1.6,new THREE.MeshStandardMaterial({color:t.color,emissive:t.color,emissiveIntensity:.35}));
    if(textures[i]){const screen=new THREE.Mesh(new THREE.PlaneGeometry(4.9,4.9*9/16),new THREE.MeshBasicMaterial({map:textures[i]}));screen.position.set(t.x,1.94,t.z-1.67);scene.add(screen);}
    label(`${String(i+1).padStart(2,'0')}  /  ${t.label.toUpperCase()}`,6.2,.58,t.x,4.2,t.z-1.75,{font:60,bg:'#eeeee6',color:'#16373d',sub:t.level?`${t.level}  ·  ${(ROOMS.find(r=>r.id===t.level)||{}).level||''}`.toUpperCase():'TOUTES LES CLASSES'});
    box(3.4,.97,.7,t.x,.49,frontZ,palette.white,true);box(3.5,.06,.8,t.x,1.01,frontZ,palette.wood);
    label(t.label,2.9,.5,t.x,.6,frontZ+.36,{font:66,bg:'#eeeee6',color:'#16373d'});
    box(.65,.05,.4,t.x-.6,1.1,frontZ,palette.metal).rotation.x=-.35;
    plant(t.x+side*2.8,frontZ,.85);
    const exhibitor=person(t.x+.6,t.z+.8,{style:i,coat:['#8a806f','#36566b','#698378'][i%3],skin:['#bd8e70','#77513e','#d6a78a'][i%3]});actors.push(exhibitor);
    interactions.push({id:t.id,x:t.x,z:frontZ+1.5,label:`Découvrir · ${t.label}`,type:'theme'});
  }
  // Signature booth — taller, navy and brass.
  box(8,.025,6,-12,.025,24,palette.wood);
  box(8,4.4,.2,-12,2.2,27.5,palette.navy,true);
  label('HORIZON DUO',7.3,1.1,-12,3.9,27.36,{rotate:Math.PI,font:100,sub:'EXPLORER · COMPRENDRE · TRANSMETTRE'});
  // This side faces the arriving visitor (negative Z from backdrop).
  const duoScreen=new THREE.Mesh(new THREE.PlaneGeometry(5.3,2.98),new THREE.MeshBasicMaterial({map:textures[2]}));duoScreen.position.set(-12,2,27.35);duoScreen.rotation.y=Math.PI;scene.add(duoScreen);
  box(5,1,.9,-12,.5,22.8,palette.navy,true);box(5.15,.07,1,-12,1.04,22.8,palette.wood);
  label('HORIZON DUO',4.4,.6,-12,.64,22.33,{rotate:Math.PI,font:85});
  for(const x of [-16.3,-7.7])plant(x,24,1.4);
  interactions.push({id:'duo',x:-12,z:21,label:'Rencontrer Horizon Duo',type:'duo'});
  // Cafe along the warm eastern wall, cups and espresso bar.
  box(7,.025,8,24,.025,18,palette.wood);
  box(.9,1.15,6.8,27,.57,18,palette.white,true);box(1,.06,7,27,1.18,18,palette.woodDark);
  label('LE CAFÉ',6,1.1,27.95,3.7,18,{rotate:-Math.PI/2,font:110,bg:'#eeeee6',color:'#16373d'});
  box(.5,.65,.85,26.9,1.54,16,palette.metal);
  for(let i=0;i<5;i++){cylinder(.07,.14,26.7,1.29,17+i*.35,palette.white);}
  for(const z of [15,20]){table(23,z);chair(22,z,-Math.PI/2);chair(24,z,Math.PI/2);obstacles.push({x:22,z,w:.7,d:.7},{x:24,z,w:.7,d:.7});plant(25.5,z+1,.7);}
  const barista=person(27.8,18,{coat:'#b6a07a'});barista.group.rotation.y=-Math.PI/2;actors.push(barista);
  interactions.push({id:'cafe',x:25,z:18,label:'Prendre un café',type:'cafe'});
  // Short game kiosk.
  box(4.4,.025,4.3,12,.025,24,palette.soft);box(2.6,1,.8,12,.5,25,palette.navy,true);
  const quizScreen=box(2.4,1.7,.13,12,2.1,25,palette.navy);cameraMeshes.push(quizScreen);
  label('LE DÉFI IA',2.3,1.5,12,2.1,24.91,{rotate:Math.PI,font:130,sub:'3 QUESTIONS · 1 MINUTE'});
  label('LE DÉFI IA',2.3,1.5,12,2.1,25.09,{font:130,sub:'3 QUESTIONS · 1 MINUTE'});
  label('DÉFI IA',3.8,.65,12,3.65,24.9,{rotate:Math.PI,font:115,sub:'APPROCHEZ ET APPUYEZ SUR E'});
  label('DÉFI IA',3.8,.65,12,3.65,25.1,{font:115,sub:'APPROCHEZ ET APPUYEZ SUR E'});plant(15,25,1.1);
  interactions.push({id:'quiz',x:12,z:23,label:'Relever le défi IA',type:'quiz'});
  // Lounges fill the quieter edges.
  for(const x of [-25,25]){if(x>0)continue;box(3,.4,.95,x,.35,25,palette.soft,true);box(3,.6,.15,x,.85,25.45,palette.soft);table(x,23.3,.65);plant(x-2,26,1.2);}
  // Small social scenes leave the main circulation and doorways clear.
  for(const [i,x,z] of [[0,-17,17.5],[1,-18.2,18.4],[2,-16.7,19.1]]){
    const a=person(x,z,{style:i+3});a.group.rotation.y=Math.atan2(-17.3-x,18.3-z);giveActivity(a,'talking');actors.push(a);
  }
  for(const [i,x,z] of [[0,3.4,-17.9],[1,-4.45,-19.3],[2,5.5,-20.7],[3,-3.4,-16.5]]){
    const a=person(x,z,{style:i+1,look:{...visitorLook(i+1),accessory:'none'}});a.group.position.y=a.gender==='female'?-.40:-.46;a.group.rotation.y=Math.PI;giveActivity(a,'seated');actors.push(a);
  }
  for(let i=0;i<3;i++){
    const a=person(25.6,17.2+i*1.05,{style:i+5});a.group.rotation.y=i===0?Math.PI/2:Math.PI;giveActivity(a,'queue');actors.push(a);
  }
  const phoneVisitor=person(17,7,{style:7});phoneVisitor.group.rotation.y=-.6;giveActivity(phoneVisitor,'phone');actors.push(phoneVisitor);
  // Visitors follow clear lanes, pausing at their waypoints.
  const coats=['#445967','#a77c68','#7c8b75','#d1bb92','#365c64','#775d6d'];
  const skins=['#c89979','#8d5d42','#e1b695','#b47b57','#6b4638'];
  const npcCount=low?4:8;
  for(let i=0;i<npcCount;i++){
    const lane=i%2===0?-5.4:5.4,z=-13+(i*7.13)%34;
    const actor=person(lane+(i%3)*.6,z,{coat:coats[i%6],skin:skins[i%5],style:i,scale:.9+(i%4)*.035});
    actor.ambientWalker=true;actor.route=[{x:lane,z:20},{x:lane,z:-12},{x:lane+(lane<0?-2:2),z:-12},{x:lane+(lane<0?-2:2),z:20}];actor.target=i%4;actor.wait=i*.12;actor.speed=.65+(i%4)*.12;actors.push(actor);
  }
  const player=person(0,17.5,{gender:avatar==='female'?'female':'male',look:appearance,student:true});
  let wornBadge=null;player.model.traverse(o=>{if(o.name==='studentBadge')wornBadge=o;});
  if(wornBadge)wornBadge.parent.visible=badgeCollected;player.group.rotation.y=Math.PI;
  const bodiesFor=self=>[player,...actors].filter(a=>a!==self&&a.group.visible&&Math.abs(a.group.position.y-self.group.position.y)<.5).map(a=>({x:a.group.position.x,z:a.group.position.z,radius:a.radius}));
  for(const a of actors.filter(a=>a.route)){
    const p=findFreePosition(a.group.position.x,a.group.position.z,obstacles,bodiesFor(a),a.radius);
    if(p)a.group.position.set(p.x,0,p.z);
  }
  // A small halo grounds the visitor without looking like a game health bar.
  const ring=new THREE.Mesh(new THREE.RingGeometry(.38,.44,40),new THREE.MeshBasicMaterial({color:'#399d9b',side:THREE.DoubleSide,transparent:true,opacity:.75}));ring.rotation.x=-Math.PI/2;ring.position.y=.018;scene.add(ring);
  // Fusion des éléments fixes par matériau : réduit fortement les appels de dessin.
  scene.updateMatrixWorld(true);
  const movingRoots=new Set([...actors.map(a=>a.group),player.group,ring]);
  const batches=new Map();
  scene.traverse(o=>{if(!o.isMesh||o.isSkinnedMesh||Array.isArray(o.material)||cameraMeshes.includes(o))return;for(let p=o;p;p=p.parent)if(movingRoots.has(p))return;const key=`${o.material.uuid}-${o.castShadow}-${o.receiveShadow}`;if(!batches.has(key))batches.set(key,[]);batches.get(key).push(o);});
  for(const meshes of batches.values()){if(meshes.length<3)continue;const pieces=meshes.map(m=>m.geometry.clone().applyMatrix4(m.matrixWorld));const geometry=mergeGeometries(pieces,false);pieces.forEach(g=>g.dispose());if(!geometry)continue;const merged=new THREE.Mesh(geometry,meshes[0].material);merged.castShadow=meshes[0].castShadow;merged.receiveShadow=meshes[0].receiveShadow;meshes.forEach(m=>m.removeFromParent());scene.add(merged);}
  const guideGroup=new THREE.Group();scene.add(guideGroup);let guideTarget=null,guidePath=[];
  const guideMaterial=new THREE.MeshBasicMaterial({color:'#329995'}),guideGeo=new THREE.CircleGeometry(.095,10);
  let yaw=0,pitch=.32,distance=4.7,drag=null,nearest=null,cameraReady=false,coffeeUntil=0;
  const keys=new Set(),touch={x:0,y:0};
  const canvas=renderer.domElement;
  const keyDown=e=>{if(paused||/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName))return;const k=e.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(k))e.preventDefault();keys.add(k);};
  const keyUp=e=>keys.delete(e.key.toLowerCase());
  const blur=()=>{keys.clear();touch.x=touch.y=0;};
  const pointerDown=e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);};
  const pointerMove=e=>{if(!drag||paused)return;yaw-=(e.clientX-drag.x)*.004;pitch=THREE.MathUtils.clamp(pitch+(e.clientY-drag.y)*.002,.12,.85);drag={x:e.clientX,y:e.clientY};};
  const pointerUp=()=>{drag=null;};
  const wheel=e=>{e.preventDefault();distance=THREE.MathUtils.clamp(distance+e.deltaY*.004,2.8,8);};
  window.addEventListener('keydown',keyDown);window.addEventListener('keyup',keyUp);window.addEventListener('blur',blur);
  canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointermove',pointerMove);canvas.addEventListener('pointerup',pointerUp);canvas.addEventListener('pointercancel',pointerUp);canvas.addEventListener('wheel',wheel,{passive:false});
  const resize=()=>{const w=container.clientWidth,h=container.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);};const observer=new ResizeObserver(resize);observer.observe(container);resize();
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();paused=true;onError?.('L’affichage 3D a été interrompu. L’accès direct aux cours reste disponible.');});
  const ray=new THREE.Raycaster(),target=new THREE.Vector3(),desired=new THREE.Vector3();let positionClock=0,guideClock=0;
  const animatePerson=(a,speed,time,dt)=>{const name=a===player&&performance.now()<coffeeUntil&&a.actions.Interact?'Interact':speed>3.5?'Run':speed>.15?'Walk':'Idle';if(a.action!==name){const previous=a.actions[a.action],next=a.actions[name];if(next){next.reset().play();previous?.crossFadeTo(next,.2,true);a.action=name;}}a.mixer.update(reducedMotion&&a!==player?0:dt);};
  const coffeeCup=new THREE.Group();scene.add(coffeeCup);coffeeCup.visible=false;
  add(cylGeo,palette.white,0,0,0,.061,.13,.061,coffeeCup);
  add(cylGeo,palette.woodDark,0,.067,0,.051,.006,.051,coffeeCup);
  const handle=new THREE.Mesh(new THREE.TorusGeometry(.035,.009,6,12),palette.white);handle.position.set(.067,0,0);coffeeCup.add(handle);
  const armBones={};player.model.traverse(b=>{if(b.isBone)armBones[b.name.replace(/^mixamorig[:]?/,'').toLowerCase()]=b;});
  function animateCoffee(now){
    const remaining=(coffeeUntil-now)/1000;coffeeCup.visible=remaining>0;if(!coffeeCup.visible)return;
    const upper=armBones.rightarm,lower=armBones.rightforearm,hand=armBones.righthand;if(!upper||!lower||!hand){coffeeCup.visible=false;return;}
    player.group.updateMatrixWorld(true);
    const shoulder=upper.getWorldPosition(new THREE.Vector3()),elbow=lower.getWorldPosition(new THREE.Vector3()),wrist=hand.getWorldPosition(new THREE.Vector3());
    const blend=Math.min(1,(2.5-remaining)*3,remaining*3);
    const sip=player.group.localToWorld(new THREE.Vector3(.11,player.gender==='female'?1.39:1.53,.22));
    const goal=wrist.clone().lerp(sip,Math.max(0,blend)),l1=shoulder.distanceTo(elbow),l2=elbow.distanceTo(wrist),direction=goal.clone().sub(shoulder),d=THREE.MathUtils.clamp(direction.length(),.03,l1+l2-.001);direction.normalize();goal.copy(shoulder).addScaledVector(direction,d);
    const pole=player.group.localToWorld(new THREE.Vector3(-.5,1.15,.35)).sub(shoulder);pole.addScaledVector(direction,-pole.dot(direction)).normalize();
    const reach=(l1*l1-l2*l2+d*d)/(2*d),height=Math.sqrt(Math.max(0,l1*l1-reach*reach));
    const desiredElbow=shoulder.clone().addScaledVector(direction,reach).addScaledVector(pole,height);
    const rotateBone=(bone,from,to)=>{const world=bone.getWorldQuaternion(new THREE.Quaternion());const delta=new THREE.Quaternion().setFromUnitVectors(from.normalize(),to.normalize());bone.quaternion.copy(bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(delta).multiply(world));bone.updateMatrixWorld(true);};
    rotateBone(upper,elbow.clone().sub(shoulder),desiredElbow.clone().sub(shoulder));
    const currentElbow=lower.getWorldPosition(new THREE.Vector3());rotateBone(lower,hand.getWorldPosition(new THREE.Vector3()).sub(currentElbow),goal.clone().sub(currentElbow));
    coffeeCup.position.copy(hand.getWorldPosition(new THREE.Vector3()));coffeeCup.position.y+=.025;coffeeCup.rotation.y=player.group.rotation.y;
  }
  function updateGuide(){guidePath=guideTarget?findPath(player.group.position,guideTarget,obstacles):[];while(guideGroup.children.length)guideGroup.remove(guideGroup.children[0]);for(let i=1;i<guidePath.length;i+=2){const p=guidePath[i],dot=new THREE.Mesh(guideGeo,guideMaterial);dot.rotation.x=-Math.PI/2;dot.position.set(p.x,.035,p.z);guideGroup.add(dot);}}
  function tick(now){
    if(disposed)return;const elapsed=(now-lastTime)/1000||.016;const dt=Math.min(.05,elapsed);lastTime=now;
    if(!paused&&!document.hidden){
      yaw+=((keys.has('l')?1:0)-(keys.has('j')?1:0))*dt*1.8;
      let forward=(keys.has('z')||keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0)-touch.y;
      let right=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('q')||keys.has('a')||keys.has('arrowleft')?1:0)+touch.x;
      const norm=Math.max(1,Math.hypot(forward,right));forward/=norm;right/=norm;const speed=keys.has('shift')?5:2.9;
      // Pas indépendant de la fluidité : jusqu'à 0,25 s rattrapées par sous-pas de 0,05 s (collisions fiables, même sur un PC lent).
      const moveDt=Math.min(.25,elapsed),steps=Math.max(1,Math.ceil(moveDt/.05));
      const dx=(right*Math.cos(yaw)-forward*Math.sin(yaw))*speed*moveDt,dz=(-forward*Math.cos(yaw)-right*Math.sin(yaw))*speed*moveDt;
      const previousPlayer=player.group.position.clone();
      if(dx||dz){const bodies=bodiesFor(player);for(let st=0;st<steps;st++)moveWithCollisions(player.group.position,dx/steps,dz/steps,obstacles,bodies,player.radius);const angle=Math.atan2(dx,dz),diff=THREE.MathUtils.euclideanModulo(angle-player.group.rotation.y+Math.PI,Math.PI*2)-Math.PI;player.group.rotation.y+=diff*Math.min(1,dt*12);}
      animatePerson(player,player.group.position.distanceTo(previousPlayer)/moveDt,now/1000,dt);
      for(const a of actors){
        restoreActivity(a);
        let velocity=0;
        if(a.route&&!reducedMotion&&a.group.visible){
          a.wait-=dt;
          if(a.wait<=0){
            const p=a.group.position,d=a.route[a.target],vx=d.x-p.x,vz=d.z-p.z,len=Math.hypot(vx,vz);
            if(len<.3){a.target=(a.target+1)%a.route.length;a.wait=1.5+(a.phase%2);}
            else{
              const others=bodiesFor(a),v=steerAroundPeople(p,vx/len*a.speed,vz/len*a.speed,others,a.radius),old=p.clone();
              moveWithCollisions(p,v.x*dt,v.z*dt,obstacles,others,a.radius);velocity=p.distanceTo(old)/dt;
              if(velocity>.05){const angle=Math.atan2(p.x-old.x,p.z-old.z),diff=THREE.MathUtils.euclideanModulo(angle-a.group.rotation.y+Math.PI,Math.PI*2)-Math.PI;a.group.rotation.y+=diff*Math.min(1,dt*7);}
            }
          }
        }
        animatePerson(a,reducedMotion?0:velocity,now/1000,dt);animateActivity(a,now/1000,reducedMotion);
      }
      animateCoffee(now);
      ring.position.x=player.group.position.x;ring.position.z=player.group.position.z;
      target.set(player.group.position.x,1.45,player.group.position.z);
      desired.set(target.x+Math.sin(yaw)*distance,target.y+distance*Math.sin(pitch),target.z+Math.cos(yaw)*distance);
      ray.set(target,desired.clone().sub(target).normalize());ray.far=desired.distanceTo(target);const hit=ray.intersectObjects(cameraMeshes,false)[0];if(hit)desired.copy(ray.ray.direction).multiplyScalar(Math.max(.7,hit.distance-.22)).add(target);
      camera.position.lerp(desired,cameraReady&&!reducedMotion?1-Math.exp(-dt*10):1);camera.lookAt(target);cameraReady=true;
      nearest=null;let best=Infinity;for(const item of interactions){const d=Math.hypot(item.x-player.group.position.x,item.z-player.group.position.z);if(d<(item.radius||3)&&d<best){nearest=item;best=d;}}
      onInteraction?.(nearest);
      positionClock+=dt;guideClock+=dt;if(positionClock>.1){onPosition?.({x:player.group.position.x,z:player.group.position.z,angle:player.group.rotation.y,zone:nearest?.label||'Le grand hall'});positionClock=0;}
      if(guideTarget&&guideClock>1.5){updateGuide();guideClock=0;}
      renderer.render(scene,camera);fpsCount++;fpsTime+=elapsed;
      if(fpsTime>2){container.dataset.fps=String(Math.round(fpsCount/fpsTime));container.dataset.drawCalls=String(renderer.info.render.calls);container.dataset.avatar=player.gender;const bodies=[player,...actors].filter(a=>a.group.visible);let minimum=Infinity;for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){const a=bodies[i],b=bodies[j];if(Math.abs(a.group.position.y-b.group.position.y)<.5)minimum=Math.min(minimum,a.group.position.distanceTo(b.group.position)-a.radius-b.radius);}container.dataset.crowdClearance=minimum.toFixed(3);if(import.meta.env.DEV){container.dataset.people=JSON.stringify(bodies.map(a=>({x:+a.group.position.x.toFixed(3),z:+a.group.position.z.toFixed(3),radius:a.radius,player:a===player,activity:a.activity||'walking'})));}fpsCount=0;fpsTime=0;}
    }
  }
  renderer.setAnimationLoop(tick);
  return {
    interact:()=>nearest,
    getPosition:()=>({x:player.group.position.x,z:player.group.position.z}),
    setTouch:(x,y)=>{touch.x=x;touch.y=y;},
    rotateCamera:amount=>{yaw+=amount;},
    pause:value=>{paused=value;blur();if(!value)lastTime=performance.now();},
    guide:(x,z)=>{guideTarget={x,z};updateGuide();},
    teleport:(x,z,viewYaw=0)=>{const p=findFreePosition(x,z,obstacles,bodiesFor(player),player.radius);if(!p)return;player.group.position.set(p.x,0,p.z);yaw=viewYaw;if(viewYaw===Math.PI)player.group.rotation.y=0;cameraReady=false;blur();if(guideTarget)updateGuide();},
    setBadge:(visible,nextGroup)=>{if(!wornBadge)return;wornBadge.parent.visible=visible;if(nextGroup&&nextGroup!==groupId){groupId=nextGroup;wornBadge.material.map?.dispose();wornBadge.material.map=badgeTexture(badgeImage,groupId);}},
    coffee:()=>{coffeeUntil=performance.now()+2500;},
    setReducedMotion:value=>{reducedMotion=value;},
    setQuality:value=>{low=value==='low';renderer.setPixelRatio(Math.min(devicePixelRatio,low?1:1.65));renderer.shadowMap.enabled=!low;sun.castShadow=!low;actors.forEach((a,i)=>{if(a.ambientWalker){const show=!low||Math.floor(i/2)%2===0;if(show&&!a.group.visible){const p=findFreePosition(a.group.position.x,a.group.position.z,obstacles,bodiesFor(a),a.radius);if(p)a.group.position.set(p.x,0,p.z);else return;}a.group.visible=show;}});},
    dispose:()=>{disposed=true;renderer.setAnimationLoop(null);observer.disconnect();window.removeEventListener('keydown',keyDown);window.removeEventListener('keyup',keyUp);window.removeEventListener('blur',blur);canvas.removeEventListener('pointerdown',pointerDown);canvas.removeEventListener('pointermove',pointerMove);canvas.removeEventListener('pointerup',pointerUp);canvas.removeEventListener('pointercancel',pointerUp);canvas.removeEventListener('wheel',wheel);const geometries=new Set(),materials=new Set(),maps=new Set();scene.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.dispose();if(o.geometry)geometries.add(o.geometry);if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material]){materials.add(m);for(const value of Object.values(m))if(value?.isTexture)maps.add(value);}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());maps.forEach(t=>t.dispose());boxGeo.dispose();sphereGeo.dispose();cylGeo.dispose();capsGeo.dispose();guideGeo.dispose();guideMaterial.dispose();env.dispose();renderer.dispose();canvas.remove();},
  };
}
