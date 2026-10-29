import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileId,loadClass,unlockClass,rememberGrant,readAccess,normalizeCode} from '../site/access.mjs';
const year='2026-2027',group='b3b',code='TEST-ONLY';
const id=createHash('sha256').update(`amos-box|${year}|${code}`).digest('hex').slice(0,40);
const content={annee:year,k:group,seances:[{n:1}],cours:{},outils:{}};
const mock=payload=>({base:new URL('https://example.test/box/'),fetcher:async()=>({ok:true,json:async()=>payload})});
test('Shared code normalization produces the same address as the existing build',async()=>{
 assert.equal(normalizeCode(' test- only '),code);assert.equal(await fileId(year,' test- only '),id);
});
test('Unlock validates the selected class and uses the hosting subdirectory',async()=>{
 let requested;const result=await unlockClass(year,group,code,{base:new URL('https://example.test/box/'),fetcher:async url=>{requested=url.href;return {ok:true,json:async()=>content};}});
 assert.equal(result.id,id);assert.equal(result.content,content);assert.equal(requested,`https://example.test/box/data/${year}/${id}.json`);
 await assert.rejects(()=>unlockClass(year,'b3a',code,mock(content)),/wrong-class/);
 await assert.rejects(()=>loadClass('2027-2028',group,id,mock(content)),/wrong-class/);
});
test('Wrong codes, server failures and malformed responses never grant access',async()=>{
 await assert.rejects(()=>unlockClass(year,group,code,{...mock(content),fetcher:async()=>({ok:false,status:404})}),/invalid-code/);
 await assert.rejects(()=>loadClass(year,group,id,{...mock(content),fetcher:async()=>({ok:false,status:503})}),/unavailable/);
 await assert.rejects(()=>loadClass(year,group,id,mock({...content,seances:null})),/wrong-class/);
 await assert.rejects(()=>loadClass('../escape',group,id,mock(content)),/invalid-input/);
});
test('Convention handoff stores only the validated fingerprint and preserves existing preferences',()=>{
 let text=JSON.stringify({theme:'jour',codes:{[`${year}/${group}`]:code,'2026-2027/b1a':'ANOTHER-TEST'},grants:{'2026-2027/m2b':'b'.repeat(40)}});
 const storage={getItem:()=>text,setItem:(key,value)=>{assert.equal(key,'amos-box');text=value;}};
 assert.equal(rememberGrant(storage,year,group,id),true);
 const state=readAccess(storage);assert.equal(state.theme,'jour');assert.equal(state.grants[`${year}/${group}`],id);assert.equal(state.codes[`${year}/${group}`],undefined);assert.equal(state.codes['2026-2027/b1a'],'ANOTHER-TEST');
 assert.equal(text.includes(code),false);
});
test('Unavailable storage is reported without exposing or storing the code',()=>{
 const storage={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};
 assert.deepEqual(readAccess(storage),{});assert.equal(rememberGrant(storage,year,group,id),false);
});
