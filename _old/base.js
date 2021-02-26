export function path2url(path, base) {
	// console.log('path2url', path, base)
	if (path.href) return new URL(path.href) // path == URL ... create a new instance though
	if (path.includes('://')) return new URL(path) // path is a valid URL
	if (base?.url?.includes('://')) return new URL(path, base.url) // for base = import.meta
	if (base?.includes('://')) return new URL(path, base) // for base = import.meta.url
	let prefix = Deno.build.os == 'windows' ? 'file:///' : 'file://' // different prefix on windows
	base = (path.includes(':/') || path.startsWith('/')) ? '' : Deno.cwd() + '/' // absolute or relative path?
	return new URL(prefix + base + path)

}
export function debug(type, action, path, ...x) {
	let date = new Date().toISOString().slice(0, 10)
	let time = new Date().toISOString().slice(11, 19)
	console.log(date, time, type, action, path, ...x)
}