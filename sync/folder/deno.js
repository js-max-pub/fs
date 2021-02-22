import Base from './base.js';
import File from '../file/deno.js';
import AsyncFolder from '../../async/folder/deno.js'

export default class Folder extends Base {

	folder(path = '') {
		return new Folder(this._path + '/' + path)
	}
	file(path = '') {
		return new File(this._path + '/' + path)
	}
	get parent() {
		return new Folder(this.path.split('/').filter(x => x).slice(0, -1).join('/'))
	}

	get async() {
		return new AsyncFolder(this._path)
	}

	get info() {
		try { return Deno.statSync(this._path) }
		catch { return null }
	}


	create() {
		Deno.mkdirSync(this._path, { recursive: true })
		return this;
	}
	get path() {
		return Deno.realPathSync(this._path).replaceAll('\\', '/')
	}





	// /**
	//  * access dir-list as object...    
	//  * folder.item['a.txt']
	//  */
	// get item() {
	// 	return Object.fromEntries(this.list.map(x => [x.name, x]))
	// }


	get list() {
		try { var rawList = Deno.readDirSync(this._path) }
		catch { var rawList = [] }
		var output = [];
		for (let item of rawList) {
			if (item.isDirectory) output.push(this.folder(item.name))
			if (item.isFile) output.push(this.file(item.name))
		}
		return output
	}

	// has to be moved to ASYNC version once its ready
	// get events() {
	// 	return this._events()
	// }
	// async * _events() {
	// 	let watcher = Deno.watchFs(this._path)
	// 	for await (const event of watcher) {
	// 		// console.log('watch-event', event)
	// 		for (const path of event.paths) {
	// 			try { var info = Deno.statSync(path) }
	// 			catch { var info = null }
	// 			// console.log('event', path, info)
	// 			if (!info) yield { path, event: event.kind }
	// 			if (info?.isFile) yield new File(path).fromEvent(event.kind)
	// 			if (info?.isDirectory) yield new Folder(path).fromEvent(event.kind)
	// 		}
	// 	}
	// }

	remove() {
		try {
			Deno.removeSync(this._path, { recursive: true });
		} catch { }
		return this;
	}
}



// export default function (path) { return new Folder(path) }