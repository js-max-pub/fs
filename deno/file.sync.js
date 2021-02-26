// import Base from '../base/file.sync.js';
// import Base from './file.js'
// import Folder from './folder.sync.js';
// import { path2url } from '../base/lib.js'
import { File, SyncFolder, time } from './mod.js'
// import { time } from './lib.js'
import { lines } from './deps.js'

export class SyncFile extends File {
	// type = 'file'
	mode = 'sync'

	// constructor(...p) { super(...p) }
	_folder(p) { return new SyncFolder(p) }
	// get folder() {
	// 	return new Folder(this.url.split('/').slice(0, -1).join('/'))
	// }

	get text() {
		return this.exec('read', 'readTextFileSync', this._url)
		// this._debug('read')
		// try { return Deno.readTextFileSync(this._url) }
		// catch { return null }
	}

	set text(content) {
		this.exec('write', 'writeTextFileSync', this._url, content, { append: this._append })
		// this._debug('write')
		// try { Deno.writeTextFileSync(this._url, content, { append: this._append }); }
		// catch { }
		this._append = false
	}

	get bytes() {
		return this.exec('read', 'readFileSync', this._url)
		// this._debug('read')
		// try { return Deno.readFileSync(this._url) }
		// catch { return null }
	}


	get json() {
		try {
			return JSON.parse(this.text)
		} catch {
			return null
		}
	}
	set json(p) {
		this.text = JSON.stringify(p, null, '\t')
	}

	get lines() {
		return lines(this.text)
	}

	set lines(p) {
		this.text = p.join('\n')
	}

	get info() {
		return this.exec('info', 'statSync', this._url)
		// this._debug('info')
		// try { return Deno.statSync(this._url) }
		// catch { return null }
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
		this.exec('remove', 'removeSync', this._url)
		// this._debug('remove')
		// try { Deno.removeSync(this._url) }
		// catch { }
		return this
	}
}

// export default function (path) { return new File(path) }


