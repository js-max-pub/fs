import * as FS from '../deno/async.js'
// export async function sleep(t) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(resolve, t)
// 	})
// }
// await sleep(500)
await FS.ready()

console.log('list', (await FS.folder('.').list(3, { extension: 'txt' })).map(x => x.path))

console.log('read', await FS.file('_test/test.ndjson').load.text())

// console.log('ext', FS.File.path)