// import Base from '../base/folder.async.js';
// import File from './file.async.js';
// import SyncFolder from './folder.sync.js'

export class Folder extends Base {
	// constructor(path) {
	// 	console.log('folder', path)
	// 	super(path)
	// }
	folder(path = '') {
		return new Folder(this._path + '/' + path)
	}
	file(path = '') {
		return new File(this._path + '/' + path)
	}
	get parent() {
		return new Folder(this.path.split('/').filter(x => x).slice(0, -1).join('/'))
	}

	get sync() {
		return new SyncFolder(this._path)
	}

	async info() {
		try { return Deno.stat(this._path) }
		catch { return null }
	}


	async create() {
		await Deno.mkdir(this._path, { recursive: true })
		return this;
	}
	async path() {
		return (await Deno.realPath(this._path)).replaceAll('\\', '/')
	}





	// /**
	//  * access dir-list as object...    
	//  * folder.item['a.txt']
	//  */
	// get item() {
	// 	return Object.fromEntries(this.list.map(x => [x.name, x]))
	// }


	async * list() {
		for await (const item of Deno.readDir(this._path)) {
			if (item.isDirectory) yield this.folder(item.name)
			if (item.isFile) yield this.file(item.name)
		}
	}

	// has to be moved to ASYNC version once its ready
	async * events() {
		let watcher = Deno.watchFs(this._path)
		for await (const event of watcher) {
			// console.log('watch-event', event)
			for (const path of event.paths) {
				try { var info = await Deno.stat(path) }
				catch { var info = null }
				// console.log('event', path, info)
				if (!info) yield { path, event: event.kind }
				if (info?.isFile) yield new File(path).fromEvent(event.kind)
				if (info?.isDirectory) yield new Folder(path).fromEvent(event.kind)
			}
		}
	}

	async remove() {
		try {
			await Deno.remove(this._path, { recursive: true });
		} catch { }
		return this;
	}
}



// export default function (path) { return new Folder(path) }