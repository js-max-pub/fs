// import { Folder } from '../folder/deno.js';
// import { lines } from 'https://js.max.pub/string/mod.js'



export default class {
	type = 'file'
	_path;

	constructor(path) {
		this._path = path.replace('file://', '');;
	}

	/**
	 * watch-events
	 * @param {*} event 
	 */
	fromEvent(event) {
		this.event = event;
		return this;
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
	get append() {
		this._append = true
		return this;
	}

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