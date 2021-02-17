import file from './deno.js';
import test from 'https://js.max.pub/test/raw.js'

let tmp = file('_test/tmp.txt')
tmp.folder.create()
tmp.cache.text = 'aaa'
test.equal('sync-read', tmp.text, 'aaa')
test.equal('sync-cache', tmp.cache.text, 'aaa')

tmp.async.cache.text = 'bbb'
// console.log('b',b)
test.equal('async-read', await tmp.async.text, 'bbb')
test.equal('async-cache', await tmp.async.cache.text, 'bbb')

console.log(file(import.meta.url).folder.list);

file(import.meta.url).folder.file('_test.txt').text = 'jo'