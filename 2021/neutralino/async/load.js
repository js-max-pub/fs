import { Load as BaseLoad } from '../../base/async/load.js'

export class Load extends BaseLoad {
	async bytes() {
		console.log('read bytes from ', this.file.path)
		return await Neutralino.filesystem.readBinaryFile(this.file.path);
	}
}