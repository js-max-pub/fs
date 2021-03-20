import { Base } from './mod.js'

export class File extends Base {
	type = 'file'
	get folder() {
		let newURL = this.url.slice(0, this.url.lastIndexOf('/'))
		return this._folder(newURL)
		// console.log(url)
		// console.log(this.url)
		// console.log(this.url.split('/').filter(x => x).slice(0, -1).join('/'))
		// return this._folder(this.url.split('/').filter(x => x).slice(0, -1).join('/'))
	}
	/**
	 * sets append-mode for write
	 */
	get append() {
		this._append = true
		return this;
	}
}