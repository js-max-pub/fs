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
}