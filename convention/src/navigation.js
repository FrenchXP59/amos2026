export const BOUNDS={minX:-28,maxX:28,minZ:-29,maxZ:29};
export function isWalkable(x,z,obstacles,radius=.34){
  if(x<BOUNDS.minX+radius||x>BOUNDS.maxX-radius||z<BOUNDS.minZ+radius||z>BOUNDS.maxZ-radius)return false;
  return !obstacles.some(o=>x>o.x-o.w/2-radius&&x<o.x+o.w/2+radius&&z>o.z-o.d/2-radius&&z<o.z+o.d/2+radius);
}
// Disques au sol : les bras restent libres, mais les corps ne se traversent pas.
export function isFree(x,z,obstacles,people=[],radius=.38){
  return isWalkable(x,z,obstacles,radius)&&people.every(p=>Math.hypot(x-p.x,z-p.z)>=radius+(p.radius??.38)-1e-6);
}
export function moveWithCollisions(pos,dx,dz,obstacles,people=[],radius=.38){
  const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.09));
  const sx=dx/steps,sz=dz/steps;
  for(let i=0;i<steps;i++){
    if(isFree(pos.x+sx,pos.z+sz,obstacles,people,radius)){pos.x+=sx;pos.z+=sz;continue;}
    // Glisser tangentiellement contre une personne, sans déplacer cette personne.
    const hit=people.find(p=>Math.hypot(pos.x+sx-p.x,pos.z+sz-p.z)<radius+(p.radius??.38));
    if(hit){
      const nx=pos.x-hit.x,nz=pos.z-hit.z,len=Math.hypot(nx,nz)||1;
      const dot=(sx*nx+sz*nz)/(len*len),tx=sx-Math.min(0,dot)*nx,tz=sz-Math.min(0,dot)*nz;
      if(isFree(pos.x+tx,pos.z+tz,obstacles,people,radius)){pos.x+=tx;pos.z+=tz;continue;}
    }
    if(isFree(pos.x+sx,pos.z,obstacles,people,radius))pos.x+=sx;
    if(isFree(pos.x,pos.z+sz,obstacles,people,radius))pos.z+=sz;
  }
  return pos;
}
export function findFreePosition(x,z,obstacles,people=[],radius=.38){
  if(isFree(x,z,obstacles,people,radius))return {x,z};
  for(let ring=1;ring<=30;ring++)for(let n=0;n<24;n++){
    const angle=n*Math.PI/12,px=x+Math.cos(angle)*ring*.22,pz=z+Math.sin(angle)*ring*.22;
    if(isFree(px,pz,obstacles,people,radius))return {x:px,z:pz};
  }
  return null;
}
export function steerAroundPeople(pos,vx,vz,people,radius=.38){
  const speed=Math.hypot(vx,vz);if(!speed)return {x:0,z:0};
  const ux=vx/speed,uz=vz/speed;let side=0,repelX=0,repelZ=0;
  for(const p of people){
    const dx=p.x-pos.x,dz=p.z-pos.z,d=Math.hypot(dx,dz),forward=dx*ux+dz*uz,lateral=dx*(-uz)+dz*ux;
    const safe=radius+(p.radius??.38);
    if(forward>0&&forward<safe+1.1&&Math.abs(lateral)<safe+.22){
      // Tous cèdent à leur droite : deux visiteurs face à face choisissent des côtés opposés.
      side=Math.max(side,(1-forward/(safe+1.1))*1.8);
    }
    if(d>0&&d<safe+.22){const force=(safe+.22-d)/(safe+.22);repelX-=dx/d*force;repelZ-=dz/d*force;}
  }
  const x=ux-uz*side+repelX,z=uz+ux*side+repelZ,len=Math.hypot(x,z)||1;
  return {x:x/len*speed,z:z/len*speed};
}
// Grille A* utilisée pour dessiner un guidage qui contourne le mobilier.
export function findPath(start,end,obstacles){
  const step=.75, key=(x,z)=>`${x},${z}`, snap=v=>Math.round(v/step);
  const sx=snap(start.x),sz=snap(start.z),ex=snap(end.x),ez=snap(end.z);
  const first={x:sx,z:sz,g:0,f:0,parent:null},open=[first],seen=new Map([[key(sx,sz),first]]),closed=new Set();
  let goal;
  for(let n=0;open.length&&n<18000;n++){
    open.sort((a,b)=>a.f-b.f);const cur=open.shift(),k=key(cur.x,cur.z);if(closed.has(k))continue;closed.add(k);
    if(cur.x===ex&&cur.z===ez){goal=cur;break;}
    for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const x=cur.x+dx,z=cur.z+dz,nk=key(x,z);if(closed.has(nk)||!isWalkable(x*step,z*step,obstacles,.5))continue;
      const g=cur.g+1,old=seen.get(nk);if(old&&old.g<=g)continue;
      const next={x,z,g,f:g+Math.abs(x-ex)+Math.abs(z-ez),parent:cur};seen.set(nk,next);open.push(next);
    }
  }
  const path=[];for(let p=goal;p;p=p.parent)path.unshift({x:p.x*step,z:p.z*step});return path;
}
