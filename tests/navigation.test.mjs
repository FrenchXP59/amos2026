import test from 'node:test';import assert from 'node:assert/strict';
import {isWalkable,moveWithCollisions,findPath} from '../convention/src/navigation.js';
test('Movement cannot tunnel through a thin partition',()=>{const walls=[{x:0,z:0,w:.1,d:10}],p={x:-2,z:0};moveWithCollisions(p,10,0,walls);assert.ok(p.x<-.39);});
test('Guidance goes around the reception desk',()=>{const obstacles=[{x:0,z:23,w:4.6,d:.9}];const path=findPath({x:0,z:26},{x:0,z:18},obstacles);assert.ok(path.length>0);assert.ok(path.some(p=>Math.abs(p.x)>2.8));for(const p of path)assert.equal(isWalkable(p.x,p.z,obstacles,.5),true);});
test('Out-of-bounds points are rejected',()=>{assert.equal(isWalkable(40,0,[]),false);assert.equal(isWalkable(0,0,[]),true);});

test('Running cannot tunnel through a stationary person',()=>{
 const p={x:0,z:4},people=[{x:0,z:0,radius:.4}];moveWithCollisions(p,0,-12,[],people,.4);assert.ok(p.z>=.8-1e-6);
});
test('Two moving people never overlap while crossing',()=>{
 const a={x:-3,z:0},b={x:3,z:0};
 for(let i=0;i<1000;i++){
  moveWithCollisions(a,.035,.004,[],[{...b,radius:.4}],.4);
  moveWithCollisions(b,-.035,-.004,[],[{...a,radius:.4}],.4);
  assert.ok(Math.hypot(a.x-b.x,a.z-b.z)>=.8-1e-6);
 }
});
test('Crowd avoids head-on traffic and resumes its route',async()=>{
 const {steerAroundPeople}=await import('../convention/src/navigation.js'),a={x:-3,z:0},b={x:3,z:0};
 for(let i=0;i<600;i++)for(const [p,other,end] of [[a,b,4],[b,a,-4]]){
  const dx=end-p.x,dz=-p.z,len=Math.hypot(dx,dz);if(len<.1)continue;
  const people=[{...other,radius:.4}],v=steerAroundPeople(p,dx/len,dz/len,people,.4);
  moveWithCollisions(p,v.x*.025,v.z*.025,[],people,.4);
  assert.ok(Math.hypot(a.x-b.x,a.z-b.z)>=.8-1e-6);
 }
 assert.ok(a.x>3&&b.x<-3);
});
test('Teleport chooses a free spot next to an occupied destination',async()=>{
 const {findFreePosition,isFree}=await import('../convention/src/navigation.js');const people=[{x:0,z:0,radius:.4}];
 const p=findFreePosition(0,0,[],people,.4);assert.ok(p);assert.ok(isFree(p.x,p.z,[],people,.4));
});
