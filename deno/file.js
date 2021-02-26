import { Base } from './mod.js'

export class File extends Base {
	type = 'file'
	get folder() {
		return this._folder(this.url.split('/').filter(x => x).slice(0, -1).join('/'))
	}
	/**
	 * sets append-mode for write
	 */
	get append() {
		this._append = true
		return this;
	}
}