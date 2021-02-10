

File Class for both [Node](https://nodejs.org/) and [Deno](https://deno.land)   

loosely inpired by (Dart)[https://api.dart.dev/dart-io/File-class.html]

```javascript
// choose an import depending on your runtime
import file from 'https://js.max.pub/fs/file/deno.js';  // deno 
import file from 'fofi';  // nodejs ... do 'npm i fofi' first

let testFile = file("test.json");
testFile.exists  // -> false
testFile.json = { abc: 1, bcd: 2 };
testFile.json // -> { abc: 1, bcd: 2 }
testFile.exists  // -> true
testFile.size // -> 24
testFile.path  // -> /full/path/to/abc.json
testFile.remove(); 

testFile.text = 'hello world' // writes content SYNChronously
await testFile.async.text // reads content ASYNChronously
```
