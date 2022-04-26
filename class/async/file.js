// import { Folder } from '../folder/deno.js';
// import { lines } from 'https://js.max.pub/string/mod.js'

import { Base } from './base.js'
import { Load } from './load.js'

export const file = (path, base) => new File(path, base)

export class File extends Base {
	type = 'file'

	get load() {
		return new Load(this)
	}

	// get folder() {
	// 	return new Folder(this._path.split('/').slice(0, -1).join('/'))
	// }

	async size() {
		return (await this.info())?.size ?? null
	}
	async exists() {
		return (await this.info()) ? true : false
	}

	/**
	 * sets append-mode for write
	 */
	// get append() {
	// 	this._append = true
	// 	return this;
	// }

	// get json() {
	// 	try {
	// 		return JSON.parse(this.text)
	// 	} catch {
	// 		return null
	// 	}
	// }
	// set json(p) {
	// 	this.text = JSON.stringify(p, null, '\t')
	// }
	// get lines() {
	// 	return lines(this.text)
	// }



	get name() {
		return this.path?.split('/')?.slice(-1)?.[0] ?? null;
	}
	get basename() {
		return this.name?.split('.')?.slice(0, -1)?.join('.') ?? null;
	}
	get extension() {
		return this.name?.split('.')?.slice(-1)?.[0] ?? null;
	}


}

// async name() {
// 	return (await this.path())?.split('/')?.slice(-1)?.[0] ?? null;
// }
// async basename() {
// 	return (await this.name())?.split('.')?.slice(0, -1)?.join('.') ?? null;
// }
// async extension() {
// 	return (await this.name())?.split('.')?.slice(-1)?.[0] ?? null;
// }


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