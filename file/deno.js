import Base, { CONTENT } from './base.js';
// import folder from '../folder/deno.js';

export class File extends Base {

	get text() {
		let cache = this.CACHE
		if (cache) {
			// console.log('return from cache')
			this._cache = false
			return cache
		}
		// return this._cache
		try {
			if (this._async) {
				this._async = false
				return Deno.readTextFile(this._path).then(content => {
					// return this._cache = x
					// console.log('async content',content)
					this.CACHE = content
					this._cache = false
					return content
					// return this.setContent(x)
				});
			} else {
				// console.log('get text and cache')
				let content = Deno.readTextFileSync(this._path)
				this.CACHE = content
				this._cache = false
				return content
			}
			// return this.setContent(Deno.readTextFileSync(this._path))
			// return this._cache = Deno.readTextFileSync(this._path);
		} catch {
			return this._cache = null
		}
		// return this._cache
	}
	set text(p) {
		try {
			if (this._async) {
				// console.log('async write')
				this._async = false
				Deno.writeTextFile(this._path, p, { append: this._append });
			} else
				Deno.writeTextFileSync(this._path, p, { append: this._append });
			if (this._append) this.CACHE += p
			else this.CACHE = p
			this._append = false
		} catch { }
	}


	get stat() {
		// if (!this.stat)
		// 	this.stat = Deno.statSync(this.path);
		// return this.stat;
		try {
			if (!this._stat)
				this._stat = Deno.statSync(this._path)
		} catch { }
		return this._stat;
	}
	get exists() {
		try {
			this.stat;
			return true;
		} catch {
			return false
		}
	}


	get path() {
		try {
			return Deno.realPathSync(this._path).replaceAll('\\', '/');
		} catch {
			return null
		}
	}


	remove() {
		try {
			Deno.removeSync(this.path)
		} catch { }
		return this
	}
}

export default function (path) { return new File(path) }




	// _path;
	// _cache = null
	// _stats = null
	// _append = false
	// _async = false
	// type = 'file'

	// constructor(path) {
	// 	super();
	// 	this._path = path;
	// }

	// get reload() {
	// 	this._cache = null
	// 	return this
	// }
	// get append() {
	// 	this._append = true
	// 	return this;
	// }
	// get async() {
	// 	this._async = true;
	// 	return this;
	// }



	// get folder() {
	// 	return folder(this._path.split('/').slice(0, -1).join('/'))
	// }


	// get name() {
	// 	return this.path.split('/').slice(-1)[0];
	// }
	// get basename() {
	// 	return this.name.split('.').slice(0, -1).join('.');
	// }
	// get extension() {
	// 	return this.name.split('.').slice(-1)[0];
	// }