// import { consume } from '../../class//lib.js'

export function cwd() {
	// console.log("CWD", Deno.cwd())
	return Deno.cwd() + '/'
}

export function load(p) {
	return Deno.readFileSync(p)
}

export function save(p, bytes, o) {
	return Deno.writeFileSync(p, bytes, o)
}

export function list(p) {
	// console.log('dir', p, Array.from(Deno.readDirSync(p)).map(x => x.isDirectory ? x.name + '/' : x.name))
	return Array.from(Deno.readDirSync(p)).map(x => x.isDirectory ? x.name + '/' : x.name)
}

export function mkdir(p, o = {}) {
	Deno.mkdirSync(p, o)
}

export function move(p, q) {
	Deno.renameSync(p, q);
}

export function info(p) {
	return Deno.statSync(p)
}

export function kill(p) {
	return Deno.removeSync(p)
}