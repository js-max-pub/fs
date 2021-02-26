export default class {
	type = 'folder'
	_path;
	_list = []

	constructor(path = './') {
		// console.log('folder base', path)
		this._path = path.replace('file://', '');;
	}


	/**
	 * watch-events
	 * @param {*} event 
	 */
	fromEvent(event) {
		this.event = event;
		return this;
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