// import { Folder } from '../folder/deno.js';
// import { lines } from 'https://js.max.pub/string/mod.js'



export class File {
	type = 'file'
	url;

	constructor(url, base) {
		console.log('new file with url', url, 'and base', base)
		if (!base && !url?.includes('://')) url = 'file://' + url
		if (base && !base?.includes('://')) base = 'file://' + base
		console.log('now file with url', url, 'and base', base)
		this.url = new URL(url, base)
	}

	/**
	 * watch-events
	 * @param {*} event 
	 */
	fromEvent(event) {
		this.event = event;
		return this;
	}
	get path() {
		return this.url.pathname
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



	async name() {
		return (await this.path())?.split('/')?.slice(-1)?.[0] ?? null;
	}
	async basename() {
		return (await this.name())?.split('.')?.slice(0, -1)?.join('.') ?? null;
	}
	async extension() {
		return (await this.name())?.split('.')?.slice(-1)?.[0] ?? null;
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