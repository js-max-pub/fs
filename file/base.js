import { Folder } from '../folder/deno.js';
// import { lines, tsv } from 'https://max.pub/lib/string/raw.mjs'

export var CONTENT = {}
var STAT = {}

export default class {
	_path;
	// _content = null
	// _stats = null
	type = 'file'

	_cache = false
	_append = false
	_async = false

	constructor(path) {
		this._path = path;
	}

	get folder() {
		return new Folder(this._path.split('/').slice(0, -1).join('/'))
	}

	// get reload() {
	// 	this._cache = null
	// 	return this
	// }

	/**
	 * sets append-mode for write
	 */
	get append() {
		this._append = true
		return this;
	}
	get async() {
		this._async = true;
		return this;
	}
	get cache() {
		this._cache = true;
		return this;
	}

	set CACHE(content) {
		// console.log('SET CACHE', this._path, this._cache, content, CONTENT)
		if (this._cache)
			CONTENT[this._path] = content
		// return content
	}
	get CACHE() {
		// console.log('GET CACHE', this._path, this._cache, CONTENT)
		if (this._cache)
			return CONTENT[this._path] ?? null
		else return null
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

	// get csv() {

	// }
	// set csv() {

	// }

	// get tsv() {
	// 	return lines(this.text).map(x => tsv(x))
	// }

	get size() {
		return this.stat?.size ?? null;
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