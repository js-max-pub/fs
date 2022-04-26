// import { SyncFile, SyncFolder } from './deno/mod.js'

import { File } from './file.js'
import { Folder } from './folder.js'

export const FS = {
	File,
	Folder,
	file: (path, base) => new File(path, base),
	folder: (path, base) => new Folder(path, base),
}
export default FS