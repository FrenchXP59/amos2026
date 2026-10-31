import {login} from './formateur/index.mjs';
export default req => req.method==='POST' ? login(req) : new Response(null,{status:405});
export const config={rateLimit:{action:'rate_limit',aggregateBy:'ip',windowSize:60,windowLimit:10}};
