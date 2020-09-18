import deno from './deno.js';
import node from './node.js';
let out = null;
try {
	Deno;
	out = deno;
} catch {
	out = node;
}
// const out = Deno ? deno : node;
export default out;