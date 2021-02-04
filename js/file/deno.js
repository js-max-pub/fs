import Base from './base.js';

export class File extends Base {
	#path;
	type = 'file'
	constructor(path) {
		super();
		this.#path = path;
	}
	get text() {
		return Deno.readTextFileSync(this.#path);
	}
	set text(p) {
		Deno.writeTextFileSync(this.#path, p);
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
		return Deno.realPathSync(this.#path);
	}
	toString() {
		return this.path
	}
	get name() {
		return this.path.split('/').slice(-1)[0];
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