export const URL_PREFIX = Deno.build.os == 'windows' ? 'file:///' : 'file://'

// export const date = x => new Date(Date.parse(x))

// export const time = info => [
// 	date(info.birthtime),
// 	date(info.mtime),
// 	date(info.atime),
// ].sort()

export function time(info) {
	return [
		info.birthtime,
		info.mtime,
		info.atime,
	]
}

// export function exec(name, ...p) {
// 	try { return Deno[name](...p) }
// 	catch { return null }
// }

export function pathSort(a, b) {
	if (a.path > b.path) return 1
	if (a.path < b.path) return -1
	return 0
}