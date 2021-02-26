function url(...p) {
    let u = new URL(...p);
    while(1){
        let old = u.pathname;
        u.pathname = u.pathname.replaceAll('//', '/');
        if (old == u.pathname) break;
    }
    return u;
}
function path2url(path, base, prefix = 'file://') {
    if (path.url) return url(path.url);
    if (path.href) return url(path.href);
    if (path.includes('://')) return url(path);
    if (base?.url?.includes('://')) return url(path, base.url);
    if (base?.includes('://')) return url(path, base);
    base = path.includes(':/') || path.startsWith('/') ? '' : Deno.cwd() + '/';
    return url(prefix + base + path);
}
const path2url1 = path2url;
function debug(type, mode, action, path, ...x) {
    let date = new Date().toISOString().slice(0, 10);
    let time = new Date().toISOString().slice(11, 19);
    console.log(`%c${date}  %c${time}   %c${type.padEnd(6, ' ')} ${mode.padStart(6, ' ')}     %c${action.padEnd(10, ' ')}   %c${path}    ${x}`, 'color: #444', 'color: #666', 'color: #888', 'color: #fff', 'color: #aaa');
}
const URL_PREFIX = Deno.build.os == 'windows' ? 'file:///' : 'file://';
class Base {
    constructor(path1, base){
        this._url = path2url1(path1, base, URL_PREFIX);
    }
    get url() {
        return this._url.href;
    }
    get path() {
        return this.url.replace(URL_PREFIX, '');
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
    _debug(action, ...x) {
        debug(this.type, this.mode, action, this.path, ...x);
    }
    fromEvent(event) {
        this.event = event;
        return this;
    }
    exec(action, func, ...p) {
        this._debug(action);
        try {
            return Deno[func](...p);
        } catch  {
            return null;
        }
    }
}
const Base1 = Base;
function time(info) {
    return [
        info.birthtime,
        info.mtime,
        info.atime, 
    ];
}
class File1 extends Base1 {
    type = 'file';
    get folder() {
        return this._folder(this.url.split('/').filter((x)=>x
        ).slice(0, -1).join('/'));
    }
    get append() {
        this._append = true;
        return this;
    }
}
class SyncFile extends File1 {
    mode = 'sync';
    _folder(p) {
        return new SyncFolder1(p);
    }
    get text() {
        return this.exec('read', 'readTextFileSync', this._url);
    }
    set text(content) {
        this.exec('write', 'writeTextFileSync', this._url, content, {
            append: this._append
        });
        this._append = false;
    }
    get bytes() {
        return this.exec('read', 'readFileSync', this._url);
    }
    get info() {
        return this.exec('info', 'statSync', this._url);
    }
    get size() {
        return this.info?.size ?? null;
    }
    get time() {
        return time(this.info);
    }
    get block() {
        let i = this.info;
        return {
            size: i?.blksize,
            count: i?.blocks
        };
    }
    get exists() {
        return this.info ? true : false;
    }
    remove() {
        this.exec('remove', 'removeSync', this._url);
        return this;
    }
}
class Folder extends Base1 {
    type = 'folder';
    folder(path = '') {
        return this._folder(this.url + '/' + path);
    }
    file(path = '') {
        return this._file(this.url + '/' + path);
    }
    get parent() {
        return this._folder(this.url.split('/').slice(0, -1).join('/'));
    }
}
class SyncFolder extends Folder {
    mode = 'sync';
    _folder(p) {
        return new SyncFolder(p);
    }
    _file(p) {
        return new SyncFile(p);
    }
    get info() {
        return this.exec('info', 'statSync', this._url);
    }
    get time() {
        return time(this.info);
    }
    get exists() {
        return this.info ? true : false;
    }
    create() {
        this.exec('create', 'mkdirSync', this._url, {
            recursive: true
        });
        return this;
    }
    get list() {
        let rawList = this.exec('list', 'readDirSync', this._url);
        var output = [];
        for (let item of rawList){
            if (item.isDirectory) output.push(this.folder(item.name));
            if (item.isFile) output.push(this.file(item.name));
        }
        return output;
    }
    remove() {
        this.exec('remove', 'removeSync', this._url, {
            recursive: true
        });
        return this;
    }
    async *events() {
        let watcher = this.exec('watch', 'watchFS', this.path) ?? [];
        for await (const event of watcher){
            for (const path2 of event.paths){
                try {
                    var info = await Deno.stat(path2);
                } catch  {
                    var info1 = null;
                }
                if (!info) yield {
                    path: path2,
                    event: event.kind
                };
                if (info?.isFile) yield new SyncFile(path2).fromEvent(event.kind);
                if (info?.isDirectory) yield new SyncFolder(path2).fromEvent(event.kind);
            }
        }
    }
}
const SyncFolder1 = SyncFolder;
const FS1 = {
    file: (path2, base1)=>new SyncFile(path2, base1)
    ,
    folder: (path2, base1)=>new SyncFolder(path2, base1)
};
export { FS1 as default };
export { FS1 as FS,  };

