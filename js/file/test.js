import file from './deno.js';
import test from 'https://max.pub/lib/test/raw.js'

let tmp = file('-test/tmp.txt')
tmp.cache.text = 'aaa'
test.equal('sync-read', tmp.text, 'aaa')
test.equal('sync-cache', tmp.cache.text, 'aaa')

tmp.async.cache.text = 'bbb'
// console.log('b',b)
test.equal('async-read', await tmp.async.text, 'bbb')
test.equal('async-cache', await tmp.async.cache.text, 'bbb')
