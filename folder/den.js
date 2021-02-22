import deno from "../file/deno"

export default {
	remove: {
		sync: function (...p) { Deno.removeSync(...p) },
		async: function (...p) { Deno.remove(...p) }
	},
	stat: {
		sync: p => Deno.statSync(p),
		async: p => Deno.stat(p),
	}
}