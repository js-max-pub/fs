import folder from './deno.js';
// import file from '../file/deno.js';

let here = folder()
console.log(here.path)
console.log(here.cache)
console.log('size',here.size)
for(let item of here.list){
	console.log(item.type, item.path, item.name, item.extension, item.size)
}


let test = here.folder('-test').create()

let sub = test.folder('2/3/4').create()
test.file('a.txt').text = 'jo'
test.file('2/a.txt').text = 'asdgfasd'
test.file('2/b.txt').text = ''
test.file('2/3/a.txt').text = 'asdhfdgsdfgfasd'
test.file('2/3/b.txt').text = 'fgdd'
test.file('2/3//4/a.txt').text = 'gfdgh'
// here.list
console.log('size',test.size, here.size)
// test.remove()