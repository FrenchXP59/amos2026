import test from 'node:test';
import assert from 'node:assert/strict';
import {readMissions,completeMission} from '../convention/src/missions.js';
function memory(){const data=new Map();return {getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};}
test('Progress survives reload, belongs to the selected class and counts each action once',()=>{
  const storage=memory(),done=readMissions(storage,'B1A');
  assert.equal(completeMission(done,'badge',storage,'B1A'),true);
  assert.equal(completeMission(done,'badge',storage,'B1A'),false);
  assert.deepEqual([...readMissions(storage,'B1A')],['badge']);
  assert.equal(readMissions(storage,'M2B').size,0);
  assert.equal(completeMission(done,'access',storage,'B1A'),false);
  assert.equal(done.size,1);
});
test('Malformed or outdated saved progress cannot validate unrelated steps',()=>{
  const storage=memory();storage.setItem('horizon-missions-v1-B1A','not-json');assert.equal(readMissions(storage,'B1A').size,0);
  storage.setItem('horizon-missions-v1-B1A','["badge","badge","made-up"]');assert.deepEqual([...readMissions(storage,'B1A')],['badge']);
});
test('The optional journey works when browser storage is unavailable',()=>{
  const storage={getItem(){throw Error('Unavailable');},setItem(){throw Error('Unavailable');}},done=readMissions(storage,'B1A');
  assert.equal(completeMission(done,'cafe',storage,'B1A'),true);assert.ok(done.has('cafe'));
});
