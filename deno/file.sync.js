// import Base from '../base/file.sync.js';
// import Base from './file.js'
// import Folder from './folder.sync.js';
// import { path2url } from '../base/lib.js'
import { File, SyncFolder, time } from './mod.js'
// import { time } from './lib.js'

export class SyncFile extends File {
	// type = 'file'
	mode = 'sync'

	// constructor(...p) { super(...p) }
	_folder(p) { return new SyncFolder(p) }
	// get folder() {
	// 	return new Folder(this.url.split('/').slice(0, -1).join('/'))
	// }

	get text() {
		this._debug('read')
		// return exec('readTextFileSync', this._url)
		try { return Deno.readTextFileSync(this._url) }
		catch { return null }
	}

	set text(content) {
		this._debug('write')
		// exec('writeTextFileSync', this._url, content, { append: this._append })
		try { Deno.writeTextFileSync(this._url, content, { append: this._append }); }
		catch { }
		this._append = false
	}

	get bytes() {
		this._debug('read')
		// return exec('readFileSync', this._url)
		try { return Deno.readFileSync(this._url) }
		catch { return null }
	}

	get info() {
		this._debug('info')
		// return exec('statSync', this._url)
		try { return Deno.statSync(this._url) }
		catch { return null }
	}

	get size() {
		return this.info?.size ?? null
	}
	get time() {
		// console.log('time', this.info)
		// return 
		return time(this.info)
	}
	get block() {
		let i = this.info
		return {
			size: i?.blksize,
			count: i?.blocks,
		}
	}
	get exists() {
		return this.info ? true : false
	}




	// get realpath() {
	// 	try {
	// 		return Deno.realPathSync(this.path)//.replaceAll('\\', '/');
	// 	} catch {
	// 		return null
	// 	}
	// }


	remove() {
		this._debug('remove')
		// exec('removeSync', this._url)
		try { Deno.removeSync(this._url) }
		catch { }
		return this
	}
}

// export default function (path) { return new File(path) }


