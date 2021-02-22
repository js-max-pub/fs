import SyncFile from './sync/file/deno.js';
import SyncFolder from './sync/folder/deno.js'

export default {
	file: path => new SyncFile(path),
	folder: path => new SyncFolder(path),
}

