export async function loadFolder(folder) {
	// console.log('load folder', folder);
	let list = [];
	for await (const entry of folder.values()) {
		list.push(entry);
		// if (entry.kind == 'file')
		// 	list[entry.name] = entry;
		// if (entry.kind == 'directory')
		// 	list[entry.name] = await loadFolder(entry)
	}
	return list;
}