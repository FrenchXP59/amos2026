import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const script=readFileSync(new URL('../site/intro-gate.js',import.meta.url),'utf8');
function open(href,preference,blocked=false){let destination=null;const url=new URL(href);runInNewContext(script,{URL,window:{__BOX_ANNEES:{courante:'2026-2027'}},location:{href,hash:url.hash,replace:value=>destination=value},localStorage:{getItem(){if(blocked)throw Error('blocked');return preference;}}});return destination;}
test('Intro only intercepts the bare entry and preserves direct class and year links',()=>{
 assert.equal(open('https://example.test/box/',null),'https://example.test/box/convention/?annee=2026-2027');
 assert.equal(open('https://example.test/box/#/2026-2027/b3b',null),null);
 assert.equal(open('https://example.test/box/#/2026-2027',null),null);
 assert.equal(open('https://example.test/box/', 'yes'),null);
 assert.equal(open('https://example.test/box/',null,true),'https://example.test/box/convention/?annee=2026-2027');
});

test('Voluntary home visit bypasses the access modal while preserving the next normal visit',()=>{
 const source=readFileSync(new URL('../convention/src/main.js',import.meta.url),'utf8');
 const guard=source.match(/if\(new URLSearchParams\(location.search\)[^\n]+openAccess\(\);/)[0];
 for(const preference of [null,'no','yes']){
  let calls=0;
  const context={URLSearchParams,location:{search:'?accueil=1&annee=2026-2027'},store:{get:()=>preference},openAccess:()=>calls++};
  runInNewContext(guard,context);
  assert.equal(calls,0);
  context.location.search='?annee=2026-2027';
  runInNewContext(guard,context);
  assert.equal(calls,preference==='yes'?1:0);
 }
});
