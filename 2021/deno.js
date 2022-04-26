// import SyncFile from './deno/file.sync.js';
// import SyncFolder from './deno/folder.sync.js'
import { SyncFile, SyncFolder } from './deno/mod.js'

export const FS = {
	file: (path, base) => new SyncFile(path, base),
	folder: (path, base) => new SyncFolder(path, base),
}
export default FS
