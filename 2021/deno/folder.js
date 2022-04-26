import { Base } from './mod.js'

export class Folder extends Base {
	type = 'folder'

	folder(path = '') {
		return this._folder(this.url + '/' + path)
	}
	file(path = '') {
		return this._file(this.url + '/' + path)
	}
	get parent() {
		return this._folder(this.url.split('/').slice(0, -1).join('/'))
	}
}