import SyncFile from './sync/file/deno.js';
import SyncFolder from './sync/folder/deno.js'


export const FS = {
	file: path => new SyncFile(path),
	folder: path => new SyncFolder(path),
}
export default FS
