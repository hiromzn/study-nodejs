const fs = require('fs');
let fname = "g.js";

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(fname)
});
  
lineReader.on('line', function (line) {
    console.log('Line from file:', line);
});
