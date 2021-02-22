import SyncFile from './sync/file/deno.js';
import SyncFolder from './sync/folder/deno.js'

export default FS
export const FS = {
	file: path => new SyncFile(path),
	folder: path => new SyncFolder(path),
}

