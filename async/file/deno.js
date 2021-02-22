import Base from './base.js';
import Folder from '../folder/deno.js';


export default class File extends Base {
	get folder() {
		return new Folder(this._path.split('/').slice(0, -1).join('/'))
	}


	async text(content) {
		if (content == undefined) { // read
			return Deno.readTextFile(this._path)
		} else { // write
			await Deno.writeTextFile(this._path, content, { append: this._append });
		}
		return this;
	}


	// async bytes() {
	// 	try { return Deno.readFile(this._path) }
	// 	catch { return null }
	// }

	info() {
		try { return Deno.stat(this._path) }
		catch { return null }
	}





	async path() {
		try {
			return (await Deno.realPath(this._path)).replaceAll('\\', '/');
		} catch {
			return null
		}
	}


	async remove() {
		try { await Deno.remove(this._path) }
		catch { }
		return this
	}
}

// export default function (path) { return new File(path) }


class Text {

}