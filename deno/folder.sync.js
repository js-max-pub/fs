// import Base from '../base/folder.sync.js';
// import Base from './folder.js'
// import File from './file.sync.js';
// import AsyncFolder from './folder.async.js'

import { Folder, SyncFile, time } from './mod.js'

export class SyncFolder extends Folder {
	mode = 'sync'

	_folder(p) { return new SyncFolder(p) }
	_file(p) { return new SyncFile(p) }

	// get async() {
	// 	return new AsyncFolder(this._url)
	// }


	// same as SyncFile
	get info() {
		return this.exec('info', 'statSync', this._url)
		// this._debug('info')
		// try { return Deno.statSync(this._url) }
		// catch { return null }
	}
	get time() {
		return time(this.info)
	}
	get exists() {
		return this.info ? true : false
	}
	// sync-file-end



	create() {
		this.exec('create', 'mkdirSync', this._url, { recursive: true })
		// this._debug('create')
		// Deno.mkdirSync(this._url, { recursive: true })
		return this;
	}

	get list() {
		let rawList = this.exec('list', 'readDirSync', this._url)
		// try { var rawList = Deno.readDirSync(this._url) }
		// catch { var rawList = [] }
		var output = [];
		for (let item of rawList) {
			if (item.isDirectory) output.push(this.folder(item.name))
			if (item.isFile) output.push(this.file(item.name))
		}
		return output
	}
	get deepList() {
		return this.list.map(x => x.type == 'file' ? x : [x, x.deepList]).flat(3)
	}

	remove() {
		this.exec('remove', 'removeSync', this._url, { recursive: true })
		// try {
		// 	Deno.removeSync(this._url, { recursive: true });
		// } catch { }
		return this;
	}


	async * events() {
		// console.log('watch',this.path)
		try { var watcher = Deno.watchFs(this.path) }
		catch { return null }
		// let watcher = this.exec('watch', 'watchFS', this.path) //?? []
		// console.log(watcher)
		for await (const event of watcher) {
			// console.log('watch-event', event)
			for (const path of event.paths) {
				try { var info = await Deno.stat(path) }
				catch { var info = null }
				// console.log('event', path, info)
				if (!info) yield { path, event: event.kind }
				if (info?.isFile) yield new SyncFile(path).fromEvent(event.kind)
				if (info?.isDirectory) yield new SyncFolder(path).fromEvent(event.kind)
			}
		}
	}

	async * listAndWatch() {
		for (const item of this.list)
			yield item
		for await (const item of this.events())
			yield item
	}
}


