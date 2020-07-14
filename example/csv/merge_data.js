const fs = require('fs');
const csv = require('csv');

let table = {};

let defaults = {
	table_fname: "data_table.csv",
	data_fname: "data_input.csv"
};

let files = {
	table_fname: defaults.table_fname,
	data_fname: defaults.data_fname
};

if ( undefined != process.argv[2] ) {
	files.table_fname = process.argv[2];
}
if ( undefined != process.argv[3] ) {
	files.data_fname = process.argv[3];
}

const usage = (err) => {
	console.log( "" );
	console.log( `usage : ${process.argv[1]} [table_file] [data_file]` );
	console.log( `        table_file : default ${defaults.table_fname}` );
	console.log( `        data_file  : default ${defaults.data_fname}` );
	console.log( "" );
	throw err;
};

let table_str = fs.createReadStream( files.table_fname ).on('error', (err) => {usage(err)} );
let data_str = fs.createReadStream( files.data_fname ).on('error', (err) => {usage(err)} );

table_str.pipe( csv.parse( {columns: true}, (err, tdata) => {

	console.log('###### table data');
	console.log(tdata);

	tdata.forEach((element, index) => {
		console.log(element);
		table[element.name] = element;
	})

	console.log('>>>>> table');
	console.log(table);

	data_str.pipe( csv.parse( {columns: true}, (err, indata) => {

		if (err) {
			usage(); throw err;
		}

		console.log('##### input data');
		console.log(indata);

		let newData = [];

		indata.forEach((element, index) => {
			if ( undefined != table[element.name] ) {
				element.type = table[element.name].type;
				element.kind = table[element.name].kind;
				console.log( element );
				newData.push(element);
			}
		})

		console.log('>>>>> new data');
		console.log(newData);

	}));
}));
