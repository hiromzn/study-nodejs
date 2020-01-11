const fs = require('fs');
const readline = require('readline');

const fname = process.argv[1];

const streamAll = fs.createReadStream(fname);
const lineReaderAll = readline.createInterface({ input: streamAll });

const streamPart = fs.createReadStream(fname, {start: 20, end: 100});
const lineReaderPart = readline.createInterface({ input: streamPart });

console.log( "###### start all" );

lineReaderAll.on('line', function (line) {
    console.log('dump all :', line);
});

console.log( "###### start part" );

lineReaderPart.on('line', function (line) {
    console.log('dump part ==> ', line);
});
