"use strict";

const fs = require('fs');
const readline = require('readline');

const glob = require('glob');

const regex = /const/g;

function parse_file( file )
{
	const lineReader = readline.createInterface({input : fs.createReadStream( file )});
	lineReader.on( 'line', function( line ) {
		pattern( line );
	});
}

function pattern( line )
{
	let match;
	if (match = line.match(regex)) {
		match.forEach(elem => console.log('##### found ele', line, elem));
	}
}

glob('data/*', (error, files) => {
	if (error) throw error;
	console.log(`All files: ${JSON.stringify(files)}`);
})
		.on('match', file => {
			console.log(`check file: ${file}`);
			parse_file( file );
		});
