
export async function loadFile(fileHandle) {
	const file = await fileHandle.getFile();
	return await file.text();
}
export async function saveFile(fileHandle, contents) {
	// Create a FileSystemWritableFileStream to write to.
	const writable = await fileHandle.createWritable();
	// Write the contents of the file to the stream.
	await writable.write(contents);
	// Close the file and write the contents to disk.
	await writable.close();
}

export async function verifyPermission(fileHandle, readWrite) {
	const opts = {};
	if (readWrite) {
		opts.mode = 'readwrite';
	}
	// Check if permission was already granted. If so, return true.
	if ((await fileHandle.queryPermission(opts)) === 'granted') {
		return true;
	}
	// Request permission. If the user grants permission, return true.
	if ((await fileHandle.requestPermission(opts)) === 'granted') {
		return true;
	}
	// The user didn't grant permission, so return false.
	return false;
}


export default {
	loadFolder,
	loadFile,
	saveFile,
	verifyPermission,
}