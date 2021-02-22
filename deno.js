import SyncFile from './sync/file/deno.js';
import SyncFolder from './sync/folder/deno.js'

const FS = {
	file: path => new SyncFile(path),
	folder: path => new SyncFolder(path),
}

export default FS