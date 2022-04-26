// import { Folder } from '../folder/deno.js';
// import { lines } from 'https://js.max.pub/string/mod.js'

function path2url(path, base) {
	// console.log('path2url', path, base)
	if (path.href) return new URL(path.href) // path == URL ... create a new instance though
	if (path.includes('://')) return new URL(path) // path is a valid URL
	if (base?.url?.includes('://')) return new URL(path, base.url) // for base = import.meta
	if (base?.includes('://')) return new URL(path, base) // for base = import.meta.url
	let prefix = Deno.build.os == 'windows' ? 'file:///' : 'file://' // different prefix on windows
	base = (path.includes(':/') || path.startsWith('/')) ? '' : Deno.cwd() + '/' // absolute or relative path?
	return new URL(prefix + base + path)

}
function debug(type, action, path, ...x) {
	let date = new Date().toISOString().slice(0, 10)
	let time = new Date().toISOString().slice(11, 19)
	console.log(date, time, type, action, path, ...x)
}
export default class {
	type = 'file'
	// _path;

	constructor(path, base) {
		this._url = path2url(path, base)
		this._debug('new')
		// this._path = path.replace('file://', '');;
	}
	get url() {
		return this._url.href
	}
	get path() {
		return Deno.build.os == 'windows'
			? this.url.replace('file:///', '')
			: this.url.replace('file://', '')
	}
	_debug(action, ...x) {
		debug('file', action, this.path, ...x)
	}

	// get folder() {
	// 	return new Folder(this._path.split('/').slice(0, -1).join('/'))
	// }



	/**
	 * sets append-mode for write
	 */
	get append() {
		this._append = true
		return this;
	}

	get json() {
		try {
			return JSON.parse(this.text)
		} catch {
			return null
		}
	}
	set json(p) {
		this.text = JSON.stringify(p, null, '\t')
	}
	get lines() {
		return lines(this.text)
	}



	get name() {
		return this.path?.split('/')?.slice(-1)?.[0] ?? null;
	}
	get basename() {
		return this.name?.split('.')?.slice(0, -1)?.join('.') ?? null;
	}
	get extension() {
		return this.name?.split('.')?.slice(-1)?.[0] ?? null;
	}

	toString() {
		return this.path
	}
}



	// get csv() {

	// }
	// set csv() {

	// }

	// get tsv() {
	// 	return this.lines.map(x => tsv(x))
	// }

	// get size() {
	// 	return this.stat?.size ?? null;
	// }