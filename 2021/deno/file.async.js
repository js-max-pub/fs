// import Base from '../base/file.async.js';
// import Base from './file.js'
// import Folder from './folder.async.js';


export default class File extends Base {
	// get folder() {
	// 	return new Folder(this._url.split('/').slice(0, -1).join('/'))
	// }
	_folder(p) { return new Folder(p) }

	async text(content) {
		if (content == undefined) { // read
			try { return await Deno.readTextFile(this._url) }
			catch { return null }
		} else { // write
			try { return await Deno.writeTextFile(this._url, content, { append: this._append }); }
			catch { return null }
		}
		// return this;
	}


	// async bytes() {
	// 	try { return Deno.readFile(this._url) }
	// 	catch { return null }
	// }

	info() {
		try { return Deno.stat(this._url) }
		catch { return null }
	}

	open(mode = { read: true }) {
		return new Open(this, mode)
	}



	// async path() {
	// 	try {
	// 		return (await Deno.realPath(this._url)).replaceAll('\\', '/');
	// 	} catch {
	// 		return null
	// 	}
	// }


	async remove() {
		try { await Deno.remove(this._url) }
		catch { }
		return this
	}
}

// export default function (path) { return new File(path) }


// class Text {
// }