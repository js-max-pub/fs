import deno from "../file/deno"

export default {
	remove: p => Deno.removeSync(p),
	stat: p => Deno.statSync(p),

}