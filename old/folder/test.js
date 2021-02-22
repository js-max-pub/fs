import folder from './deno.js';
// import file from '../file/deno.js';

let here = folder()
console.log(here.path)
console.log(here.cache)
console.log('size', here.size)
for (let item of here.list) {
	console.log(item.type, item.path, item.name, item.extension, item.size)
}


let test = here.folder('_test').create()

let sub = test.folder('2/3/4').create()
test.file('a.txt').text = 'jo'
test.file('2/a.txt').text = 'asdgfasd'
test.file('2/b.txt').text = ''
test.file('2/3/a.txt').text = 'asdhfdgsdfgfasd'
test.file('2/3/b.txt').text = 'fgdd'
test.file('2/3//4/a.txt').text = 'gfdgh'
console.log('sub cache list', sub.cache.list)
sub.file('a.txt').remove();
console.log('sub cache list', sub.cache.list)
console.log('sub list', sub.list)
await new Promise(r => setTimeout(r, 100))

console.log('watch', sub.path)
for await (const item of sub.events) {
	console.log('watch-item', item)
}
// here.list
console.log('size', test.size, here.size)
// test.remove()