import FS from '../deno.js'
import test from 'https://js.max.pub/test/raw.js'
// import './src/sync/test.url.js'
// console.log(new URL('./url.txt'))

let testFolder = FS.folder('_test').create().debug
console.log(testFolder.path)
console.log(testFolder.time)

let file1 = testFolder.file('1.txt')

file1.text = 'aa';
test.equal('read', file1.text, 'aa')
test.equal('size', file1.size, 2)
test.equal('bytes', file1.bytes, new Uint8Array([97, 97]))
file1.append.text = 'bb'
test.equal('read', file1.text, 'aabb')



let file2 = testFolder.file('2.txt')
file2.lines = ['a', 'b'];
test.equal('lines', file2.lines, ['a', 'b'])


console.log('time', file1.time)
console.log('blocks', file1.block)

test.equal('exists', file1.exists, true)
// file1.remove()
test.equal('exists', file1.exists, false)

test.equal('name', file1.name, 'test.txt')
test.equal('basename', file1.basename, 'test')
test.equal('extension', file1.extension, 'txt')
test.equal('path', file1.path, FS.file('_test/test.txt').path)
test.equal('path', file1.path, FS.file('../test/_test/test.txt').path)
test.equal('path', file1.path, FS.file('../////test//_test///test.txt').path)
test.equal('path', file1.path, FS.file(file1.path).path)
test.equal('path', file1.path, FS.file(file1.url).path)
test.equal('path', file1.path, FS.file(file1).path)
// test.equal('path', file1, FS.file('../test//_test///test.txt'))

let file3 = testFolder.file('3.json')
file3.json = { a: 1 }
test.equal('json', file3.json, { a: 1 })


// file1.text = 'aa';
testFolder.file('bb.txt').text = 'bb'
test.equal('list', testFolder.list.length, 2)
test.equal('exists', testFolder.exists, true)
// testFolder.remove()
test.equal('exists', testFolder.exists, false)
let sub = testFolder.folder('sub').create()
sub.file('more.txt').text = 'jo'
console.log('deepList', testFolder.deepList.sort(FS.pathSort).map(x => x.path))

console.log('wait for events')
for await (let item of testFolder.events()) {
	console.log('event', item.event, item.path)
}