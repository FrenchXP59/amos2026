// Shared by the box and the convention. Access follows the existing static
// content-address mechanism; this is not server-side authentication.
const KEY = 'amos-box';
const validYear = value => /^\d{4}-\d{4}$/.test(value);
const validClass = value => /^(b[123]|m[12])[ab]$/.test(value);
export const normalizeCode = code => String(code || '').trim().toUpperCase().replace(/\s/g, '');
export async function fileId(year, code) {
  if (!validYear(year) || !normalizeCode(code)) throw new Error('invalid-input');
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`amos-box|${year}|${normalizeCode(code)}`));
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('').slice(0, 40);
}
export async function loadClass(year, group, id, {base = new URL('.', import.meta.url), fetcher = fetch} = {}) {
  if (!validYear(year) || !validClass(group) || !/^[a-f0-9]{40}$/.test(id)) throw new Error('invalid-input');
  const response = await fetcher(new URL(`data/${year}/${id}.json`, base), {cache:'no-store'});
  if (!response.ok) throw new Error(response.status === 404 ? 'invalid-code' : 'unavailable');
  const content = await response.json();
  if (content?.annee !== year || content?.k !== group || !Array.isArray(content.seances)) throw new Error('wrong-class');
  return content;
}
export function readAccess(storage) {
  try { const state = JSON.parse(storage.getItem(KEY)); return state && typeof state === 'object' && !Array.isArray(state) ? state : {}; } catch { return {}; }
}
export function rememberGrant(storage, year, group, id) {
  try {
    const state = readAccess(storage);
    state.grants = {...state.grants, [`${year}/${group}`]:id};
    if (state.codes) delete state.codes[`${year}/${group}`];
    storage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch { return false; }
}
export async function unlockClass(year, group, code, options = {}) {
  const id = await fileId(year, code);
  const content = await loadClass(year, group, id, options);
  return {id, content};
}
