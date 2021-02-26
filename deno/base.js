import { path2url, debug } from '../base/lib.js'

const URL_PREFIX = Deno.build.os == 'windows' ? 'file:///' : 'file://'

export class Base {
	constructor(path, base) {
		// super()
		this._url = path2url(path, base, URL_PREFIX)
		// console.log(this._url)
		// this._debug('new')
		// this._path = path.replace('file://', '');;
	}
	get url() {
		return this._url.href
	}
	get path() {
		return this.url.replace(URL_PREFIX, '')
	}
	get name() {
		return this.path?.split('/')?.slice(-1)?.[0] ?? null;
	}
	get basename() {
		return this.name?.split('.')?.slice(0, -1)?.join('.') ?? null;
	}
	get extension() {
		return this.name?.split('.')?.slice(-1)?.[0] ?? null;
	}

	toString() {
		return this.path
	}

	_debug(action, ...x) {
		debug(this.type, this.mode, action, this.path, ...x)
	}

	/**
 * watch-events
 * @param {*} event 
 */
	fromEvent(event) {
		this.event = event;
		return this;
	}

	exec(action, func, ...p) {
		this._debug(action)
		try { return Deno[func](...p) }
		catch { return null }
	}
}