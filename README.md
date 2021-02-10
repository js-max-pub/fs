

File Class for both [Node](https://nodejs.org/) and [Deno](https://deno.land)   

loosely inpired by [Dart](https://api.dart.dev/dart-io/File-class.html)


## folder
```js
import {folder} from 'https://js.max.pub/fs/deno.js';  // deno 

let testFolder = folder('test/folder/').remove().create() // removes and recreates the folder
testFolder.list // -> an array of file and folder objects
testFolder.size // -> recursively determine the size of all contained files and folders
testFolder.remove() // -> recursive deletion
```



## file
```js
// choose an import depending on your runtime
import {file} from 'https://js.max.pub/fs/deno.js';  // deno 
import file from 'fofi';  // nodejs ... do 'npm i fofi' first

let testFile = file("test.json");
testFile.exists  // -> false
testFile.json = { abc: 1, bcd: 2 }; // stringify JSON and write to disk
testFile.json // -> { abc: 1, bcd: 2 }
testFile.exists  // -> true
testFile.size // -> 24
testFile.path  // -> /full/path/to/abc.json
testFile.remove(); 

testFile.text = 'hello world' // writes content SYNChronously
await testFile.async.text // reads content ASYNChronously

testFile.cache.text = "another greeting" // writes and caches 
testFile.append.text = " from jupyter" // appends to file
testFile.cache.text // -> "another greeting from jupyter" -> reads content from cache if available

testFile.remove().append.text = 'first line' // method chaining

testFile.folder // -> enclosing folder object
testFile.name // -> "test.json"
```


