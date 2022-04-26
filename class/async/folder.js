import { Base } from './base.js'
import { File } from './file.js'

export const folder = (path, base) => new Folder(path, base)

export class Folder extends Base {
	// static current
	type = 'folder'

	async list(depth = 1, o = {}) {
		if (depth == 0) return []
		let out = []
		let items = await Base.binding.list(this.url)
		// console.log('list items',items)
		for (let item of items) {
			item = item.endsWith('/')
				? new Folder(item, this.url)
				: new File(item, this.url)
			out.push(item)
			if (item.type == 'folder') out = out.concat(await item.list(depth - 1))
		}
		return out.filter(x => Object.entries(o).every(([k, v]) => x[k] == v))
	}

	async create() {
		await Base.binding.mkdir(this.url)
		return this
	}
	async kill() {
		await Base.binding.kill(this.url)
		return this
	}
}