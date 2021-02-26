import FS from '../deno.js'
import test from 'https://js.max.pub/test/raw.js'
// import './src/sync/test.url.js'
// console.log(new URL('./url.txt'))

let testFolder = FS.folder('_test').create()
console.log(testFolder.path)
console.log(testFolder.time)

let testFile = testFolder.file('test.txt')

testFile.text = 'aa';
test.equal('read', testFile.text, 'aa')
test.equal('size', testFile.size, 2)

test.equal('bytes', testFile.bytes, new Uint8Array([97, 97]))
console.log('time', testFile.time)
console.log('blocks', testFile.block)

test.equal('exists', testFile.exists, true)
testFile.remove()
test.equal('exists', testFile.exists, false)

test.equal('path', testFile.path, FS.file('_test/test.txt').path)
test.equal('path', testFile.path, FS.file('../test/_test/test.txt').path)
test.equal('path', testFile.path, FS.file('../////test//_test///test.txt').path)
test.equal('path', testFile.path, FS.file(testFile.path).path)
test.equal('path', testFile.path, FS.file(testFile.url).path)
test.equal('path', testFile.path, FS.file(testFile).path)
// test.equal('path', testFile, FS.file('../test//_test///test.txt'))

testFile.text = 'aa';
testFolder.file('bb.txt').text = 'bb'
test.equal('list', testFolder.list.length, 2)
test.equal('exists', testFolder.exists, true)
testFolder.remove()
test.equal('exists', testFolder.exists, false)

console.log('wait for events')
for await (let item of testFolder.events()) {
	console.log('event', item.event, item.path)
}