import { urlFrom } from "../lib.js"
// import { folder } from "./folder.js"

export class Base {
	static binding
	static cwd
	type
	url
	static log = { warning: function () { }, error: function () { } } // placeholder...

	constructor(url = '', base) {
		this.url = urlFrom(url, base, Base.cwd)
		// console.log('create', this.path, 'from', url, base)
	}

	static bind(x) {
		// console.log('bind', x)
		Base.binding = x
		Base.cwd = x.cwd()
	}

	get href() {
		return this.url.href
	}
	get path() {
		return this.url.pathname
		// return this.url.href
	}

	get info() {
		try {
			return Base.binding.info(this.url)
		}
		catch {
			return
		}
	}
	get exists() {
		return this.info ? true : false
	}

	toString() {
		return this.href
	}

	get name() {
		// console.log('name', this.href?.split('/')?.filter(x => x.trim()))
		return this.href?.split('/')?.filter(x => x.trim())?.slice(-1)?.[0] ?? null;
	}
	get basename() {
		return this.name?.split('.')?.slice(0, -1)?.join('.') ?? null;
	}
	get extension() {
		return this.name?.split('.')?.slice(-1)?.[0] ?? null;
	}
}
