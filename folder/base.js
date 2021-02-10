export default class {
	// #path;
	// #cache = [];
	// type = 'folder'
	// constructor(path = './') {
	// 	this.#path = path;
	// }

	// folder(path = '') {
	// 	return new Folder(this.#path + '/' + path)
	// }
	// file(path = '') {
	// 	return new File(this.#path + '/' + path)
	// }

	// get size() {
	// 	return this.list.map(x => x.size ?? 0).flat().reduce((acc, val) => acc += val, 0)
	// }

    // * recList(recursive = false) {
    //     for (const item of Deno.readDirSync(this.#path)) {
    //         if (item.isDirectory) {
    //             yield this.#path + '/' + item.name + '/';
    //             if (recursive)
    //                 yield* new Folder(this.#path + '/' + item.name).list(true);
    //         }
    //         if (item.isFile) {
    //             yield this.#path + '/' + item.name;
    //         }
    //     }
    // }
}



	// * recList(recursive = false) {
	// 	yield Deno.realPathSync(this.#path) + '/';
	// 	for (const item of Deno.readDirSync(this.#path)) {
	// 		if (item.isDirectory) {
	// 			yield Deno.realPathSync(this.#path + '/' + item.name) + '/';
	// 			if (recursive)
	// 				yield* new Folder(this.#path + '/' + item.name).list(true);
	// 		}
	// 		if (item.isFile) {
	// 			yield Deno.realPathSync(this.#path + '/' + item.name);
	// 		}
	// 	}
	// }