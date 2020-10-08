export default class {
    * list(recursive = false) {
        for (const item of Deno.readDirSync(this.#path)) {
            if (item.isDirectory) {
                yield this.#path + '/' + item.name + '/';
                if (recursive)
                    yield* new Folder(this.#path + '/' + item.name).list(true);
            }
            if (item.isFile) {
                yield this.#path + '/' + item.name;
            }
        }
    }
}