import * as FS from 'fs';
import Base from './base.js';

export class File extends Base {
	#path;
	constructor(path) {
		super();
		this.#path = path;
	}
	get text() {
		return FS.readFileSync(this.#path, 'utf8')
	}
	set text(p) {
		FS.writeFileSync(this.#path, p)
	}

	get stat() {
		return FS.statSync(this.#path)
	}
	get exists() {
		return FS.existsSync(this.#path)
	}
	get path() {
		return FS.realpathSync(this.#path);
	}
	remove() {
		FS.unlinkSync(this.path)
	}
}

export default function (path) { return new File(path) }
