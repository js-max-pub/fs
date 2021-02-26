// import { Folder } from '../folder/deno.js';
// import { lines } from 'https://js.max.pub/string/mod.js'

import { path2url, debug } from './lib.js'



export default class {
	type = 'file'


	get url() {
		return this._url.href
	}

	_debug(action, ...x) {
		debug(this.type, this.mode, action, this.path, ...x)
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



			// return Deno.build.os == 'windows'
		// 	? this.url.replace('file:///', '')
		// 	: this.url.replace('file://', '')