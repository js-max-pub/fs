# file.js

File Class for both [Node](https://nodejs.org/) and [Deno](https://deno.land)

```javascript
// choose an import depending on your runtime
import File from "./file.deno.js";
// import File from 'https://git.max.pub/fs.js/file.deno.js';
// import File from './file.node.js';

let testFile = File("abc.json");
testFile.exists  // -> false
testFile.json = { abc: 1, bcd: 2 };
testFile.json; // -> { abc: 1, bcd: 2 }
testFile.exists  // -> true
testFile.size // -> 24
testFile.path  // -> /full/path/to/abc.json
testFile.remove(); 
```
