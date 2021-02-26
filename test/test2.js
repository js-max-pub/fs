import FS from './deno.js';

// FS.file('_test.txt').text = 'aa';
// FS.file('_test.json').json = { a: 1 };

// FS.file('_test.txt').remove()

let here = FS.folder()
console.log(here.path)
console.log('size', here.size)

for (let item of here.list) {
	console.log(item.type, item.path, item.name, item.extension, item.size)
}


let test = FS.folder('_test').create()

console.log(test.file('a.txt').path)
console.log(file('_test/a.txt').path)
console.log(file('a.txt').path)
console.log(file('_test/a.txt', import.meta).path)
console.log(file('_test/a.txt', import.meta.url).path)

let sub = test.folder('2/3/4').create()
test.file('a.txt').text = '\x1b[35m' + 'I am cyan' + "\x1b[36m" + ' jo'
test.file('2/a.txt').text = 'asdgfasd'
test.file('2/b.txt').text = ''
test.file('2/3/a.txt').text = 'asdhfdgsdfgfasd'
test.file('2/3/b.txt').text = 'fgdd'
test.file('2/3//4/a.txt').text = 'gfdgh'
// console.log('sub cache list', sub.cache.list)
sub.file('a.txt').remove();
// console.log('sub cache list', sub.cache.list)
// console.log('sub list', sub.list)
// for (let item of sub.list) {
// 	console.log(item.path, item.info)
// }
await new Promise(r => setTimeout(r, 100))
for (let item of sub.list) {
	console.log('sync', item.path, item.name)
}
for await (let item of sub.async.list()) {
	console.log('async', await item.path(), await item.name())
}
console.log('watch', sub.path)
for await (const item of sub.async.events()) {
	console.log('watch-item', item)
}
// // here.list
// console.log('size', test.size, here.size)
// // test.remove()