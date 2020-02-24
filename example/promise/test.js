
const fs = require('fs');
const readFile = require("util").promisify(fs.readFile);
const writeFile = require("util").promisify(fs.writeFile);

const p_readFile = function(fname, filter_cb) {
	console.log( `do p_readFile( fname:${fname} )` );
	readFile(fname).then(
	(data) => {
		console.log( "##### OK:" + fname );
		console.log( data );
		if (filter_cb) {
			console.log( `##### OK: filter callback : ${filter_cb}` );
			writeFile(fname + '.out', filter_cb(data));
		}
	},
	(err) => {
		console.log( "##### NG:" + fname );
		console.log( err );
	});
};	

const filter_func = (data) => {
	return( `filter function results:\n${data}` );
};

p_readFile( "bad.file" );  // error case
p_readFile( "test.data" ); // read only case
p_readFile( "test.data", filter_func ); // filter case
