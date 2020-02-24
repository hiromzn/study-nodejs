const fs = require('fs');
const iconv = require("iconv-lite");
const readFile = require("util").promisify(fs.readFile);
const writeFile = require("util").promisify(fs.writeFile);

const filterFile = function(fname, filter, code) {
    console.log( `do filterFile( fname:${fname}, filter:${filter.name}, code:${code} )` );
    readFile(fname).then(
	(data) => {
	    let newData = iconv.decode(data, code)
	    if (filter) {
		newData = filter(newData);
	    }
	    writeFile(fname + '.out', iconv.encode(newData, code));
	},
	(err) => {
	    console.log( err );
	});
};	

const filter_func = (data) => {
    return( data.replace( /data/g, '_DATA_' ) );
};

filterFile( "test.data", filter_func, "eucjp" ); // filter case
