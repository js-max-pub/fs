import { Base } from './base.js'
import { File, file } from './file.js'

export const folder = (path, base) => new Folder(path + '/', base)

export class Folder extends Base {
	// static current
	type = 'folder'

	folder(path = '') {
		return folder(path + '/', this.url.href)
	}
	file(path = '') {
		return file(path, this.url.href)
	}

	get parent() {
		// console.log('parent',this.href)
		return folder(this.url.href + '../')
	}

	deepList() {
		// console.log('deep list', this.href)
		return this.flatList().map(x => x.type == 'file' ? x : [x, x.deepList()]).flat(5)
	}
	flatList() {
		try {
			return Base.binding
				.list(this.url)
				.map(item => item.endsWith('/')
					? new Folder(item, this.url)
					: new File(item, this.url)
				)
		} catch (e) {
			// console.log('error',e)
			return []
		}
	}

	get deep() {
		this._deep = true
		return this
	}
	get list() {
		if (this._deep) {
			this._deep = false
			return this.deepList()
		} else {
			// console.log("FLAT LIST")
			return this.flatList()
		}
	}

	load({ mode = 'text', depth = 1 } = {}) {
		try {
			return Object.fromEntries(Base.binding
				.list(this.url)
				.map(item => [item, item.endsWith('/')
					? null
					: file(item, this.url)[mode]
				]))
		} catch (e) {
			return {}
		}
	}
	get make() {
		try {
			Base.binding.mkdir(this.url, { recursive: true })
		} catch { }
		return this
	}

	get kill() {
		Base.binding.kill(this.url)
		return this
	}
}