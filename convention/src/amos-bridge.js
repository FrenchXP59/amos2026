const base = new URL('../', location.href);
const requested = new URLSearchParams(location.search).get('annee');
const accessModule = () => import(/* @vite-ignore */ new URL('access.mjs', base).href);
export async function loadContext() {
  const response = await fetch(new URL('data/annees.json', base));
  if (!response.ok) throw new Error('Catalogue indisponible');
  const index = await response.json();
  const year = index.annees.includes(requested) ? requested : index.courante;
  if (!/^\d{4}-\d{4}$/.test(year)) throw new Error('Année indisponible');
  const info = await fetch(new URL(`data/${year}/public.json`, base));
  if (!info.ok) throw new Error('Programme indisponible');
  return {year, catalog: await info.json()};
}
export const contextPromise = loadContext();
// Attach a handler immediately; the interface also presents the failure.
contextPromise.catch(() => {});
export function boxURL(year, group = '') {
  const url = new URL(base);
  url.hash = /^\d{4}-\d{4}$/.test(year || '') ? `/${year}${group ? '/'+group.toLowerCase() : ''}` : '/';
  return url.href;
}
export async function verifyAccess(group, code) {
  if (!String(code).trim()) return {ok:false,message:'Saisissez le code transmis par votre formateur.'};
  try {
    const {year, catalog} = await contextPromise;
    const key = group.toLowerCase();
    if (!catalog.classes[key]) return {ok:false,message:'Cette classe n’est pas proposée pour cette année.'};
    const {unlockClass, rememberGrant} = await accessModule();
    const {id} = await unlockClass(year, key, code, {base});
    let stored = false;
    try { stored = rememberGrant(localStorage, year, key, id); } catch {}
    if (!stored) return {ok:false,message:'Le navigateur empêche de conserver votre accès. Utilisez « Ouvrir la box IA » ci-dessous pour entrer directement dans votre classe.'};
    return {ok:true,kind:'remote',url:boxURL(year,key)};
  } catch (error) {
    const rejected = ['invalid-code','wrong-class','invalid-input'].includes(error.message);
    return {ok:false,message:rejected?'Ce code ne correspond pas à cette classe. Vérifiez votre classe et réessayez.':'La vérification est indisponible. Réessayez ou ouvrez directement la box IA.'};
  }
}
