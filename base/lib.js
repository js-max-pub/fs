function url(...p) {
	let u = new URL(...p)
	while (1) {
		let old = u.pathname
		u.pathname = u.pathname.replaceAll('//', '/')
		if (old == u.pathname) break;
	}
	return u
}
export function path2url(path, base, prefix = 'file://') {
	// console.log('path2url', path, base)
	if (path.url) return url(path.url) // path == FS object 
	if (path.href) return url(path.href) // path == URL ... create a new instance though
	if (path.includes('://')) return url(path) // path is a valid URL
	if (base?.url?.includes('://')) return url(path, base.url) // for base = import.meta
	if (base?.includes('://')) return url(path, base) // for base = import.meta.url
	// let prefix = Deno.build.os == 'windows' ? 'file:///' : 'file://' // different prefix on windows
	base = (path.includes(':/') || path.startsWith('/')) ? '' : Deno.cwd() + '/' // absolute or relative path?
	return url(prefix + base + path)
}
// export function url2path(url, OS) {
// }
export function debug(type, mode, action, path, ...x) {
	let date = new Date().toISOString().slice(0, 10)
	let time = new Date().toISOString().slice(11, 19)
	console.log(`%c${date}  %c${time}   %c${type.padEnd(6, ' ')} ${mode.padStart(6, ' ')}     %c${action.padEnd(10, ' ')}   %c${path}    ${x}`, 'color: #444', 'color: #666', 'color: #888', 'color: #fff', 'color: #aaa')
	// console.log(date, time, type, mode, action, path, ...x)
}