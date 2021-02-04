import Base from './base.js';
import folder from '../folder/deno.js';

export class File extends Base {
	#path;
	#cache = null
	type = 'file'
	constructor(path) {
		super();
		this.#path = path;
	}
	get text() {
		if (this.#cache) return this.#cache
		try {
			return Deno.readTextFileSync(this.#path);
		} catch {
			return null
		}
	}
	set text(p) {
		try {
			Deno.writeTextFileSync(this.#path, p);
		} catch { }
	}
	get clearCache() {
		this.#cache = null
		return this
	}
	get folder() {
		return folder(this.#path.split('/').slice(0, -1).join('/'))
	}

	get stat() {
		// if (!this.stat)
		// 	this.stat = Deno.statSync(this.path);
		// return this.stat;
		return Deno.statSync(this.#path);
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
		return Deno.realPathSync(this.#path).replaceAll('\\', '/');
	}
	toString() {
		return this.path
	}
	get name() {
		return this.path.split('/').slice(-1)[0];
	}
	get basename() {
		return this.name.split('.').slice(0, -1).join('.');
	}
	get extension() {
		return this.name.split('.').slice(-1)[0];
	}
	remove() {
		try {
			Deno.removeSync(this.path)
		} catch { }
		return this
	}
}

export default function (path) { return new File(path) }