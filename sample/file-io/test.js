const fs = require("fs");
const infile = fs.readFileSync( process.argv[2], { encoding: 'euc-jp' });

console.log( infile );
