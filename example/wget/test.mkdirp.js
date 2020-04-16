//const fs = require('fs');
const mkdirp = require('mkdirp');

let dir = process.argv[2];

console.log( `mkdirp : ${dir}` );

mkdirp( dir ).then(
    made => {
	console.log( `now mkdir : ${made}`);
	},
    err => {
	console.log(err);
    });

