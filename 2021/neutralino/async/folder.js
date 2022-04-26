import { Folder as BaseFolder } from '../../base/async/folder.js'

export class Folder extends BaseFolder {
	constructor(path, base) {
		if (Folder.cwd && !base?.startsWith('/')) base = Folder.cwd
		// if (!base) base = 'file://' + cwd
		super(path, base)
	}
	
	static cwd
	static async findCWD() {
		try {
			let info = await Neutralino.os.execCommand('pwd');
			Folder.cwd = info.stdOut.trim() + '/'
			return Folder.cwd
			// console.log(`pwd: ${info.stdOut}`);
		} catch (e) { console.log('exec error', e) }
	}

	async list() {
		return await Neutralino.filesystem.readDirectory(this.path)
	}
}