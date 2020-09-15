import deno from './file.deno.js';
import node from './file.node.js';
let out = null;
try{
	Deno;
	 out = deno;
} catch {
	 out = node;
}
// const out = Deno ? deno : node;
export default out;