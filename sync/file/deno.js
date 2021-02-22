import Base from './base.js';
import Folder from '../folder/deno.js';


export default class File extends Base {
	get folder() {
		return new Folder(this._path.split('/').slice(0, -1).join('/'))
	}
	
	get text() {
		try { return Deno.readTextFileSync(this._path) }
		catch { return null }
	}

	set text(content) {
		try {
			Deno.writeTextFileSync(this._path, content, { append: this._append });
			this._append = false
		} catch { }
	}

	get bytes() {
		try { return Deno.readFileSync(this._path) }
		catch { return null }
	}

	get info() {
		try { return Deno.statSync(this._path) }
		catch { return null }
	}





	get path() {
		try {
			return Deno.realPathSync(this._path).replaceAll('\\', '/');
		} catch {
			return null
		}
	}


	remove() {
		try { Deno.removeSync(this._path) }
		catch { }
		return this
	}
}

// export default function (path) { return new File(path) }


