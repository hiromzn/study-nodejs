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
		//console.log( file + ":" + line );
	});
}

function pattern( line )
{
	const level_regex = /\-/;
	const level = (line.search(level_regex) + 1)/2;

	const lastcp = level*2-2;
	const islast = ( line.substring(lastcp,lastcp+1) == '`' );

    console.log('Line info:', islast, level );

	let res;

	res = line.match( /-RecordDecl\s+(\S+)\s+<.*>\s+\S+\s+(struct\s+\S+)\sdefinition/ );
	if(res) {
		let astid = res[1];
		let struct_name = res[2];
		console.log( "RecordDecl:%s:%s:", astid, struct_name );
	}

	res = line.match( /-FieldDecl\s+(\S+)\s+<.*>\s+\S+\s+(\S+)\s+'(.+)'/ );
	if(res) {
		let astid = res[1];
		let member_name = res[2];
		let type_name = res[3];
		console.log( "FieldDecl:%s:%s:%s:", astid, type_name, member_name );
	}

	res = line.match( /-TypedefDecl\s+(\S+)\s+<.*>\s+\S+\s+(\S+)\s+'(.+)':'(.+)'/ );
	if(res) {
		let astid = res[1];
		let def_name = res[2];
		let org1_name = res[3];
		let org2_name = res[4];
		console.log( "TypedefDecl:%s:%s:%s:%s:", astid, def_name, org1_name, org2_name );
	}
}

glob('data/*.ast', (error, files) => {
	if (error) throw error;
	console.log(`All files: ${JSON.stringify(files)}`);
})
		.on('match', file => {
			console.log(`check file: ${file}`);
			parse_file( file );
		});
