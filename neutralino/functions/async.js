export async function cwd() {
	try {
		let info = await Neutralino.os.execCommand('pwd');
		return info.stdOut.trim() + '/'
	} catch { }
}

export async function load(p) {
	return await Neutralino.filesystem.readBinaryFile(p);
}

export async function save(p, bytes) {
	return await Neutralino.filesystem.writeBinaryFile(p, bytes);
}

export async function list(p) {
	// console.log('neu list', p)
	return (await Neutralino.filesystem.readDirectory(p))
		.filter(x => !['.', '..'].includes(x.entry))
		.map(x => x.type == 'DIRECTORY' ? x.entry + '/' : x.entry)
}

export async function mkdir(p, o = {}) {
	if (o.recursive) { }
	await Neutralino.filesystem.createDirectory(p);
}

export async function move(p, q) {
	await Neutralino.filesystem.moveFile(p, q);
}

export async function info(p) {
	return await Neutralino.filesystem.getStats(p);
}
