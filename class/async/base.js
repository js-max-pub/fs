import { sleep } from "./lib.js"
import { urlFrom } from "../lib.js"

export class Base {
	static binding
	static cwd
	type
	url

	constructor(url, base) {
		this.url = urlFrom(url, base)
	}
	static async bind(x) {
		// console.log('bind', x)
		Base.binding = x
		Base.cwd = await x.cwd()
	}

	static async ready() {
		for (let i = 0; i < 100; i++) {
			if (Base.cwd) return true
			else await sleep(10)
			// console.log('wait for cwd', (i + 1) * 10, 'ms', Base.cwd)
		}
	}

	get path() {
		return this.url.pathname
	}
	toString() {
		return this.path
	}
}
export const ready = Base.ready
