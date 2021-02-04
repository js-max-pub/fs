import { File } from '../file/deno.js';
import Base from './base.js';

export class Folder extends Base {
	#path;
	#cache = [];
	type = 'folder'
	constructor(path = './') {
		super();
		this.#path = path;
	}
	folder(path = '') {
		return new Folder(this.#path + '/' + path)
	}
	file(path = '') {
		return new File(this.#path + '/' + path)
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

	get size() {
		// console.log('why', this, this.cache)
		return this.cache.map(x => x.size ?? 0).flat().reduce((acc, val) => acc += val, 0)
	}

	create(path = '') {
		Deno.mkdirSync(this.#path + '/' + path, { recursive: true })
		return this;
	}
	get path() {
		return Deno.realPathSync(this.#path)
	}
	toString() {
		return this.path
	}
	get name() {
		return this.path.split('/').slice(-1)[0];
	}

	get item() {
		return Object.fromEntries(this.cache.map(x => [x.name, x]))
	}
	get cache() {
		// console.log('load cache',this.path)
		return this.#cache.length ? this.#cache : this.list
	}
	get list() {
		this.#cache = [];
		for (let item of Deno.readDirSync(this.#path)) {
			// return Deno.readDirSync(this.#path).map(item => {
			if (item.isDirectory) this.#cache.push(this.folder(item.name))
			if (item.isFile) this.#cache.push(this.file(item.name))
		}
		return this.#cache;
	}
	remove() {
		Deno.removeSync(this.#path, { recursive: true });
		return this;
	}
}
export default function (path) { return new Folder(path) }