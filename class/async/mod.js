import { Base, ready } from './base.js'
import { File, file } from './file.js'
import { Folder, folder } from './folder.js'

export {
	Base, File, Folder, file, folder, ready
	// file: (path, base) => new File(path, base),
	// folder: (path, base) => new Folder(path, base),
}

