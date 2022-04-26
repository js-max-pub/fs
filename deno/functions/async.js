import { consume } from '../../class/async/lib.js'

export async function cwd() {
	// console.log("CWD", Deno.cwd())
	return Deno.cwd() + '/'
}

export async function load(p) {
	return await Deno.readFile(p)
}

export async function save(p, bytes) {
	return await Deno.writeFile(p, bytes)
}

export async function list(p) {
	return (await consume(Deno.readDir(p))).map(x => x.isDirectory ? x.name + '/' : x.name)
}

export async function mkdir(p, o = {}) {
	await Deno.mkdir(p, o)
}

export async function move(p, q) {
	await Deno.rename(p, q);
}

export async function info(p) {
	return await Deno.stat(p)
}

export async function kill(p) {
	return await Deno.remove(p)
}