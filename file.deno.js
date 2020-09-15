import Base from './file.both.js';

export class File extends Base {
	#path;
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
	remove() {
		Deno.removeSync(this.path)
	}
}

export default function (path) { return new File(path) }