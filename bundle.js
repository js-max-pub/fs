const __default = class {
    type = 'file';
    constructor(path2){
        this._path = path2.replace('file://', '');
    }
    fromEvent(event) {
        this.event = event;
        return this;
    }
    get size() {
        return this.info?.size ?? null;
    }
    get exists() {
        return this.info ? true : false;
    }
    get append() {
        this._append = true;
        return this;
    }
    get json() {
        try {
            return JSON.parse(this.text);
        } catch  {
            return null;
        }
    }
    set json(p) {
        this.text = JSON.stringify(p, null, '\t');
    }
    get lines() {
        return lines(this.text);
    }
    get name() {
        return this.path?.split('/')?.slice(-1)?.[0] ?? null;
    }
    get basename() {
        return this.name?.split('.')?.slice(0, -1)?.join('.') ?? null;
    }
    get extension() {
        return this.name?.split('.')?.slice(-1)?.[0] ?? null;
    }
    toString() {
        return this.path;
    }
};
class File1 extends __default {
    get folder() {
        return new Folder1(this._path.split('/').slice(0, -1).join('/'));
    }
    get text() {
        try {
            return Deno.readTextFileSync(this._path);
        } catch  {
            return null;
        }
    }
    set text(content) {
        try {
            Deno.writeTextFileSync(this._path, content, {
                append: this._append
            });
            this._append = false;
        } catch  {
        }
    }
    get bytes() {
        try {
            return Deno.readFileSync(this._path);
        } catch  {
            return null;
        }
    }
    get info() {
        try {
            return Deno.statSync(this._path);
        } catch  {
            return null;
        }
    }
    get path() {
        try {
            return Deno.realPathSync(this._path).replaceAll('\\', '/');
        } catch  {
            return null;
        }
    }
    remove() {
        try {
            Deno.removeSync(this._path);
        } catch  {
        }
        return this;
    }
}
const __default1 = class {
    type = 'folder';
    _list = [];
    constructor(path1 = './'){
        this._path = path1.replace('file://', '');
    }
    get exists() {
        return this.info ? true : false;
    }
    get size() {
        return this.list.flatMap((x)=>x.size ?? 0
        ).reduce((acc, val)=>acc += val
        , 0);
    }
    toString() {
        return this.path;
    }
    get name() {
        return this.path.split('/').slice(-1)[0];
    }
};
class Folder extends __default1 {
    folder(path = '') {
        return new Folder(this._path + '/' + path);
    }
    file(path = '') {
        return new File1(this._path + '/' + path);
    }
    get parent() {
        return new Folder(this.path.split('/').filter((x)=>x
        ).slice(0, -1).join('/'));
    }
    get async() {
        return new AsyncFolder(this._path);
    }
    get info() {
        try {
            return Deno.statSync(this._path);
        } catch  {
            return null;
        }
    }
    create() {
        Deno.mkdirSync(this._path, {
            recursive: true
        });
        return this;
    }
    get path() {
        return Deno.realPathSync(this._path).replaceAll('\\', '/');
    }
    get list() {
        try {
            var rawList = Deno.readDirSync(this._path);
        } catch  {
            var rawList1 = [];
        }
        var output = [];
        for (let item of rawList){
            if (item.isDirectory) output.push(this.folder(item.name));
            if (item.isFile) output.push(this.file(item.name));
        }
        return output;
    }
    remove() {
        try {
            Deno.removeSync(this._path, {
                recursive: true
            });
        } catch  {
        }
        return this;
    }
}
const Folder1 = Folder;
const __default2 = class {
    type = 'folder';
    _list = [];
    constructor(path3 = './'){
        this._path = path3.replace('file://', '');
    }
    fromEvent(event) {
        this.event = event;
        return this;
    }
    get exists() {
        return this.info ? true : false;
    }
    get size() {
        return this.list.flatMap((x)=>x.size ?? 0
        ).reduce((acc, val)=>acc += val
        , 0);
    }
    toString() {
        return this.path;
    }
    get name() {
        return this.path.split('/').slice(-1)[0];
    }
};
class Folder2 extends __default2 {
    folder(path = '') {
        return new Folder2(this._path + '/' + path);
    }
    file(path = '') {
        return new File3(this._path + '/' + path);
    }
    get parent() {
        return new Folder2(this.path.split('/').filter((x)=>x
        ).slice(0, -1).join('/'));
    }
    get sync() {
        return new Folder(this._path);
    }
    async info() {
        try {
            return Deno.stat(this._path);
        } catch  {
            return null;
        }
    }
    async create() {
        await Deno.mkdir(this._path, {
            recursive: true
        });
        return this;
    }
    async path() {
        return (await Deno.realPath(this._path)).replaceAll('\\', '/');
    }
    async *list() {
        for await (const item of Deno.readDir(this._path)){
            if (item.isDirectory) yield this.folder(item.name);
            if (item.isFile) yield this.file(item.name);
        }
    }
    async *events() {
        let watcher = Deno.watchFs(this._path);
        for await (const event of watcher){
            for (const path4 of event.paths){
                try {
                    var info = Deno.statSync(path4);
                } catch  {
                    var info1 = null;
                }
                if (!info) yield {
                    path: path4,
                    event: event.kind
                };
                if (info?.isFile) yield new File3(path4).fromEvent(event.kind);
                if (info?.isDirectory) yield new Folder2(path4).fromEvent(event.kind);
            }
        }
    }
    async remove() {
        try {
            await Deno.remove(this._path, {
                recursive: true
            });
        } catch  {
        }
        return this;
    }
}
const AsyncFolder = Folder2;
const __default3 = class {
    type = 'file';
    constructor(path4){
        this._path = path4.replace('file://', '');
    }
    fromEvent(event) {
        this.event = event;
        return this;
    }
    get size() {
        return this.info?.size ?? null;
    }
    get exists() {
        return this.info ? true : false;
    }
    get append() {
        this._append = true;
        return this;
    }
    get json() {
        try {
            return JSON.parse(this.text);
        } catch  {
            return null;
        }
    }
    set json(p) {
        this.text = JSON.stringify(p, null, '\t');
    }
    get lines() {
        return lines(this.text);
    }
    get name() {
        return this.path?.split('/')?.slice(-1)?.[0] ?? null;
    }
    get basename() {
        return this.name?.split('.')?.slice(0, -1)?.join('.') ?? null;
    }
    get extension() {
        return this.name?.split('.')?.slice(-1)?.[0] ?? null;
    }
    toString() {
        return this.path;
    }
};
class File2 extends __default3 {
    get folder() {
        return new Folder2(this._path.split('/').slice(0, -1).join('/'));
    }
    async text(content) {
        if (content == undefined) {
            return Deno.readTextFile(this._path);
        } else {
            await Deno.writeTextFile(this._path, content, {
                append: this._append
            });
        }
        return this;
    }
    info() {
        try {
            return Deno.stat(this._path);
        } catch  {
            return null;
        }
    }
    path() {
        try {
            return Deno.realPath(this._path).replaceAll('\\', '/');
        } catch  {
            return null;
        }
    }
    async remove() {
        try {
            await Deno.remove(this._path);
        } catch  {
        }
        return this;
    }
}
const File3 = File2;
const FS1 = {
    file: (path5)=>new File1(path5)
    ,
    folder: (path5)=>new Folder(path5)
};
export { FS1 as default };
export { FS1 as FS,  };

