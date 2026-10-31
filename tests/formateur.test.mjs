import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../netlify/functions/formateur/index.mjs';

const endpoint='https://example.test/.netlify/functions/formateur';
process.env.FORMATEUR_CODE='TEST-CODE';
process.env.FORMATEUR_SESSION_KEY='test-session-key-with-more-than-32-characters';
const request=(method='GET',body,extra={})=>new Request(endpoint,{method,headers:{...(body?{'Content-Type':'application/json','Origin':'https://example.test'}:{}),...extra},...(body?{body:JSON.stringify(body)}:{})});

test('Accès formateur : code vérifié côté serveur, session signée et déconnexion',async()=>{
  assert.equal((await handler(request())).status,401);
  assert.equal((await handler(request('POST',{code:'wrong'}))).status,401);
  assert.equal((await handler(request('POST',{code:'TEST-CODE'},{Origin:'https://elsewhere.test'}))).status,403);
  const login=await handler(request('POST',{code:'TEST-CODE'}));assert.equal(login.status,200);
  const setCookie=login.headers.get('set-cookie');assert.match(setCookie,/HttpOnly/);assert.match(setCookie,/Secure/);
  const cookie=setCookie.split(';')[0];
  assert.equal((await handler(request('GET',null,{cookie}))).status,200);
  assert.equal((await handler(request('GET',null,{cookie:cookie+'x'}))).status,401);
  const logout=await handler(request('DELETE'));assert.match(logout.headers.get('set-cookie'),/Max-Age=0/);
});
