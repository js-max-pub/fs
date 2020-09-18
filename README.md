

File Class for both [Node](https://nodejs.org/) and [Deno](https://deno.land)

```javascript
// choose an import depending on your runtime
import File from "./js/file/deno.js";   // local deno import
import File from 'https://max.pub/fs/js/file/deno.js';  // deno import directly from github
import File from './js/file/node.js';  // local nodejs import

let testFile = File("test.json");
testFile.exists  // -> false
testFile.json = { abc: 1, bcd: 2 };
testFile.json; // -> { abc: 1, bcd: 2 }
testFile.exists  // -> true
testFile.size // -> 24
testFile.path  // -> /full/path/to/abc.json
testFile.remove(); 
```
