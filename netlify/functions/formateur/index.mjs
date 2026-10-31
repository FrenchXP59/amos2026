import {createHmac, createHash, timingSafeEqual} from 'node:crypto';

const env = name => globalThis.Netlify?.env?.get(name) ?? process.env[name];
const digest = value => createHash('sha256').update(String(value)).digest();
const same = (a,b) => timingSafeEqual(digest(a),digest(b));
const sign = (value,key) => createHmac('sha256',key).update(value).digest('hex');
const headers = {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const json = (body,status=200,extra={}) => Response.json(body,{status,headers:{...headers,...extra}});
const cookieName='amos_formateur';
const cookie = value => `${cookieName}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`;
function authenticated(req,key){
  const value=(req.headers.get('cookie')||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(cookieName+'='))?.slice(cookieName.length+1);
  if(!value)return false; const [expires,signature,...rest]=value.split('.');
  return !rest.length && /^\d{10}$/.test(expires||'') && Number(expires)>Math.floor(Date.now()/1000) && /^[a-f0-9]{64}$/.test(signature||'') && same(signature,sign(expires,key));
}
export async function login(req){
  const codeHash=env('FORMATEUR_CODE_HASH'),key=env('FORMATEUR_SESSION_KEY');
  if(!codeHash||!key||key.length<32)return json({error:'Service formateur indisponible'},503);
    if(req.headers.get('origin')!==new URL(req.url).origin)return json({error:'Requête refusée'},403);
    let payload;try{payload=await req.json()}catch{return json({error:'Requête invalide'},400)}
    if(typeof payload.code!=='string'||payload.code.length>64||!same(sign(payload.code.trim(),key),codeHash))return json({error:'Code incorrect'},401);
    const expires=String(Math.floor(Date.now()/1000)+28800);
    return json({ok:true},200,{'Set-Cookie':cookie(`${expires}.${sign(expires,key)}`)});
}
export default async function handler(req){
  const codeHash=env('FORMATEUR_CODE_HASH'),key=env('FORMATEUR_SESSION_KEY');
  if(!codeHash||!key||key.length<32)return json({error:'Service formateur indisponible'},503);
  if(req.method==='DELETE')return json({ok:true},200,{'Set-Cookie':`${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`});
  if(req.method!=='GET')return json({error:'Méthode non autorisée'},405);
  if(!authenticated(req,key))return json({authenticated:false},401);
  const url=new URL(req.url),year=url.searchParams.get('annee'),group=url.searchParams.get('classe');
  if(!year&&!group)return json({authenticated:true});
  if(!/^\d{4}-\d{4}$/.test(year||'')||!/^(b[123]|m[12])[ab]$/.test(group||''))return json({error:'Classe invalide'},400);
  const {default:classes}=await import('./classes.generated.mjs');
  const id=classes[year]?.[group];return id?json({id}):json({error:'Classe introuvable'},404);
}
