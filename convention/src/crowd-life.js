import * as THREE from 'three';
const v=()=>new THREE.Vector3(),q=()=>new THREE.Quaternion();
function turnWorld(bone,axis,angle){
  if(!bone)return;
  const world=bone.getWorldQuaternion(q()),delta=new THREE.Quaternion().setFromAxisAngle(axis,angle);
  bone.quaternion.copy(bone.parent.getWorldQuaternion(q()).invert().multiply(delta).multiply(world));bone.updateMatrixWorld(true);
}
function reach(actor,side,point){
  const upper=actor.bones[side+'arm'],lower=actor.bones[side+'forearm'],hand=actor.bones[side+'hand'];if(!upper||!lower||!hand)return;
  actor.group.updateMatrixWorld(true);
  const shoulder=upper.getWorldPosition(v()),elbow=lower.getWorldPosition(v()),wrist=hand.getWorldPosition(v());
  const goal=actor.group.localToWorld(point),l1=shoulder.distanceTo(elbow),l2=elbow.distanceTo(wrist),direction=goal.clone().sub(shoulder),d=THREE.MathUtils.clamp(direction.length(),.03,l1+l2-.001);direction.normalize();goal.copy(shoulder).addScaledVector(direction,d);
  const pole=actor.group.localToWorld(new THREE.Vector3(side==='right'?-.5:.5,.9,.2)).sub(shoulder);pole.addScaledVector(direction,-pole.dot(direction)).normalize();
  const along=(l1*l1-l2*l2+d*d)/(2*d),height=Math.sqrt(Math.max(0,l1*l1-along*along)),desired=shoulder.clone().addScaledVector(direction,along).addScaledVector(pole,height);
  const aim=(bone,from,to)=>{const world=bone.getWorldQuaternion(q()),delta=q().setFromUnitVectors(from.normalize(),to.normalize());bone.quaternion.copy(bone.parent.getWorldQuaternion(q()).invert().multiply(delta).multiply(world));bone.updateMatrixWorld(true);};
  aim(upper,elbow.clone().sub(shoulder),desired.clone().sub(shoulder));const current=lower.getWorldPosition(v());aim(lower,hand.getWorldPosition(v()).sub(current),goal.sub(current));
}
export function giveActivity(actor,activity){
  actor.activity=activity;actor.restPose=Object.values(actor.bones).map(bone=>[bone,bone.quaternion.clone()]);
  if(activity==='phone'){
    const phone=new THREE.Group(),body=new THREE.Mesh(new THREE.BoxGeometry(.074,.14,.012),new THREE.MeshStandardMaterial({color:'#142a30',roughness:.45}));phone.add(body);
    const screen=new THREE.Mesh(new THREE.PlaneGeometry(.061,.116),new THREE.MeshBasicMaterial({color:'#a6cec5'}));screen.position.z=-.007;screen.rotation.y=Math.PI;phone.add(screen);actor.group.add(phone);actor.phone=phone;
  }
}
export function restoreActivity(actor){actor.restPose?.forEach(([bone,rotation])=>bone.quaternion.copy(rotation));}
export function animateActivity(actor,time,reduced){
  if(!actor.activity)return;
  const t=reduced?actor.phase:time+actor.phase,b=actor.bones,group=actor.group;group.updateMatrixWorld(true);
  const right=new THREE.Vector3(1,0,0).applyQuaternion(group.quaternion),up=new THREE.Vector3(0,1,0);
  if(actor.activity==='seated'){
    for(const side of ['left','right']){turnWorld(b[side+'upleg'],right,-Math.PI*.48);turnWorld(b[side+'leg'],right,Math.PI*.48);}
    reach(actor,'right',new THREE.Vector3(.19,1.02,.27));reach(actor,'left',new THREE.Vector3(-.19,1.02,.27));
    turnWorld(b.head,up,Math.sin(t*.4)*.06);
  }else if(actor.activity==='phone'){
    const h=actor.gender==='female'?1.72:1.85;
    reach(actor,'right',new THREE.Vector3(.12,h*.69,.31));reach(actor,'left',new THREE.Vector3(-.03,h*.7,.35));turnWorld(b.head,right,.18);
    group.updateMatrixWorld(true);const point=b.righthand?.getWorldPosition(v());if(point){actor.phone.position.copy(group.worldToLocal(point));actor.phone.position.y+=.055;actor.phone.rotation.set(-.28,0,.06);}
  }else if(actor.activity==='talking'){
    turnWorld(b.head,up,Math.sin(t*.8)*.08);turnWorld(b.head,right,Math.sin(t*1.3)*.035);
    if(Math.sin(t*.65)>-.1)reach(actor,'right',new THREE.Vector3(.24,1.15+Math.sin(t*2)*.04,.25));
  }else if(actor.activity==='queue'){
    turnWorld(b.head,up,Math.sin(t*.35)*.13);
  }
}
