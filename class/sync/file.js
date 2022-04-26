// import { Folder } from '../folder/deno.js';
// import { lines } from 'https://js.max.pub/string/mod.js'

import { Base } from './base.js'
// import { Load } from './load.js'
import { bytes_to_string, string_to_bytes } from '../lib.js'
import { lines } from '../deps.js'
import { Folder, folder } from './folder.js'

export const file = (path, base) => new File(path, base)



export class File extends Base {
	type = 'file'

	get parent() {
		return folder('./', this.url.href)
	}

	get load() {
		return new Load(this)
	}

	/**
	 * sets append-mode for write
	 */
	get append() {
		this._append = true
		return this;
	}

	// get folder() {
	// 	return new Folder(this._path.split('/').slice(0, -1).join('/'))
	// }
	get bytes() {
		try {
			return Base.binding.load(this.url)
		} catch (e) {
			Base.log.warning('couldnt read file', this.href)
			// console.log('file read bytes error', e)
		}
	}
	set bytes(p) {
		// let t0 = Date.now()
		if (this._append && !this.exists)
			Base.binding.save(this.url, p)
		else
			Base.binding.save(this.url, p, { append: this._append })
		this._append = false
		// Base.log.debug('saved', this.href, t0)
	}
	get text() {
		return bytes_to_string(this.bytes)
	}
	set text(p) {
		this.bytes = string_to_bytes(p)
		// this._append = false
	}



	get json() {
		try {
			return JSON.parse(this.text)
		} catch (e) {
			Base.log.warning('json decoding error', this.href)
			// console.log("JSON ERROR:", e)
			return null
		}
	}
	set json(p) {
		this.text = JSON.stringify(p, null, '\t')
	}

	get lines() {
		return lines(this.text)
	}

	set lines(p) {
		this.text = p.join('\n') + '\n'
	}

	get tsv() {
		return this.lines.map(x => x.split('\t'))
	}

	get ndjson() {
		return this.lines.filter(x => x).map(x => {
			try { return JSON.parse(x) }
			catch { return null }
		})
	}

	set ndjson(p) {
		this.lines = p.map(x => JSON.stringify(x))
	}


	get size() {
		return this.info?.size ?? null
	}









	moveTo(destination) {
		if (destination instanceof File) destination = destination.href
		if (destination instanceof Folder) destination = destination.href + this.name
		if (typeof destination == 'string') destination = new URL(destination)
		console.log("MOVE", this.href, 'to', destination.href)
		try {
			Base.binding.move(this.url, destination)
		} catch (e) { console.log('couldnt move from', this.href, 'to', destination.href) }
	}
}





//  name() {
// 	return ( this.href())?.split('/')?.slice(-1)?.[0] ?? null;
// }
//  basename() {
// 	return ( this.name())?.split('.')?.slice(0, -1)?.join('.') ?? null;
// }
//  extension() {
// 	return ( this.name())?.split('.')?.slice(-1)?.[0] ?? null;
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