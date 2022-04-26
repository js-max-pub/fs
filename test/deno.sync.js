import * as FS from '../deno/sync.js'

console.log('bytes', FS.file('_test/3.json').bytes)
console.log('text', FS.file('_test/3.json').text)
console.log('json', FS.file('_test/3.json').json)
console.log('ndjson', FS.file('_test/test.ndjson').ndjson)

console.log('list', FS.folder('.').list.map(x => x.path))
console.log('deep list', FS.folder('.').deep.list.map(x => x.path))

console.log('folder c     ',FS.folder().path)
console.log('folder       ',FS.folder('.').path)
console.log('folder ppp   ',FS.folder('.').parent.parent.parent.path)
console.log('folder ppp ss',FS.folder('.').parent.parent.parent.folder('_js/fs').path)
// console.log('ext', FS.File.path)

console.log('file    ',FS.file('_test/3.json').path)
console.log('file p  ',FS.file('_test/3.json').parent.path)
console.log('file pp ',FS.file('_test/3.json').parent.parent.path)
console.log('file p s',FS.file('_test/3.json').parent.file('b.json').path)
