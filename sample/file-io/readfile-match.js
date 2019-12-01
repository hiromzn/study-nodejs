var fs = require("fs");

var fname = process.argv[1];
console.log('## file name:' + fname);

console.log('## readFileSync' );
console.log( fs.readFileSync( fname, "utf8" ) );

console.log('## split by "\n"' );
console.log( fs.readFileSync( fname, "utf8" ).split("\n") );

console.log('## match split' );
console.log( fs.readFileSync( fname, "utf8" ).split("\n").filter(line => line.match( /split/ )) );

