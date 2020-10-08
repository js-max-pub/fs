import deno from '../file/deno.js';
import Base from './base.js';

export class Folder extends Base {
    #path;
    constructor(path) {
        super();
        this.#path = path;
    }

    get exists() {

    }
    create(recursive = false) {
        Deno.mkdirSync(this.#path, { recursive })
    }

    * list(recursive = false) {
        yield Deno.realPathSync(this.#path) + '/';
        for (const item of Deno.readDirSync(this.#path)) {
            if (item.isDirectory) {
                yield Deno.realPathSync(this.#path + '/' + item.name) + '/';
                if (recursive)
                    yield* new Folder(this.#path + '/' + item.name).list(true);
            }
            if (item.isFile) {
                yield Deno.realPathSync(this.#path + '/' + item.name);
            }
        }
    }
}
export default function (path) { return new Folder(path) }