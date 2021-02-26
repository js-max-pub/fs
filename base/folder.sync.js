export default class {
	type = 'folder'

	constructor(path, base) {
		this._url = path2url(path, base, URL_PREFIX)
		this._debug('new')
		// this._path = path.replace('file://', '');;
	}

	_debug(action, ...x) {
		debug('folder', 'sync', action, this.path, ...x)
	}

	get url() {
		return this._url.href
	}
	get path() {
		return this.url.replace(URL_PREFIX, '')
	}


	get exists() {
		return this.info ? true : false
	}

	/**
	 * recursively determine the size of all files in all subfolders
	 */
	get size() {
		return this.list.flatMap(x => x.size ?? 0).reduce((acc, val) => acc += val, 0)
	}

	/**
	 * JS string representation of object
	 */
	toString() {
		return this.path
	}

	get name() {
		return this.path.split('/').slice(-1)[0];
	}
}