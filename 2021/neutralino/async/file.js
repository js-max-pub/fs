import { File as BaseFile } from '../../base/async/file.js'
import { Load } from './load.js'
import { Folder } from './folder.js'
// import cwd from './cwd.js'

export class File extends BaseFile {
	constructor(path, base) {
		if(Folder.cwd && !base?.startsWith('/')) base = Folder.cwd
		// if (!base) base = 'file://' + cwd
		super(path, base)
	}
	get load() {
		return new Load(this)
	}
}



export class Save {
	async bytes(p) {
		return await Neutralino.filesystem.writeBinaryFile(this.file.path, p);
	}
}