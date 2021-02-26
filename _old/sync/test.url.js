// export default function (path, base = import.meta.url) {
// 	console.log(Deno.cwd())
// 	return new URL(path, base)
// }

import FS from '../../deno.js'

FS.file('../url.txt', import.meta)