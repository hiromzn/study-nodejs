const fs = require('fs');
let fname = "g.js";

let text1 = fs.readFileSync(fname);
console.log(text1);

let text2 = fs.readFileSync(fname, 'utf-8');
console.log(text2);

let text3 = fs.readFileSync( fname, {encoding: 'utf-8'});
console.log( "text3:", text3);
