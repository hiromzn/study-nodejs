"use strict";

const debug = false;

const fs = require('fs');
const readline = require('readline');
const glob = require('glob');

// main
glob('data/*.ast', (error, files) => {
	if (error) throw error;
	console.log(`DONE : All files: ${JSON.stringify(files)}`);
})
		.on('match', file => {
			console.log(`check file >>>${file}`);
			parse_file( file );
		});


const structs = [];
const typedefs = [];
let current_struct = null;

function parse_file( file )
{
	const lineReader = readline.createInterface({input : fs.createReadStream( file )});
	lineReader.on( 'line', function( line ) {
		pattern( line );
	});
	lineReader.on( 'close', function( line ) {
		console.log( "###### FILE :%s", file );
		console.log( JSON.stringify(structs, null, '\t') );
		console.log( JSON.stringify(typedefs, null, '\t') );
	});
}

function pattern( line )
{
	const level_regex = /\-/;
	const level = (line.search(level_regex) + 1)/2;

	const lastcp = level*2-2;
	const islast = ( line.substring(lastcp,lastcp+1) == '`' );

    //console.log('Line info:', islast, level );

	let res;
	if ( res = line.match( /-RecordDecl\s+(\S+)\s+<.*>\s+.*(struct\s+\S+)\sdefinition/ ) ) {
		current_struct = {
			level : level,
			astid : res[1],
			name  : res[2],
			member : []
		};
		structs.push( current_struct );
		if (debug) console.log( "RecordDecl:%s", current_struct );
	}

	if ( (res = line.match( /-FieldDecl\s+(\S+)\s+<.*>\s+\S+\s+(\S+)\s+'(.+)'/ )) ||
		 (res = line.match( /-FieldDecl\s+(\S+)\s+<.*>\s+.*(\S+)\s+'(.+)'/ )) ) {
		let mem = {
			level : level,
			astid : res[1],
			name  : res[2],
			type  : res[3]
		};
		if (current_struct) {
			current_struct.member.push( mem );
			if (debug) console.log( "FieldDecl:%s", mem );
			if (islast) current_struct = null;
		}
	}

	if ( (res = line.match( /-TypedefDecl\s+(\S+)\s+<.*>\s+\S+\s+(\S+)\s+'(.+)':'(.+)'/ )) ||
		 (res = line.match( /-TypedefDecl\s+(\S+)\s+<.*>\s+.*(\S+)\s+'(.+)':'(.+)'/ )) ) {
		let tdef = {
			level : level,
			astid : res[1],
			name  : res[2],
			org   : res[3],
			org2  : res[4]
		};
		typedefs.push( tdef );
		if (debug) console.log( "TypedefDecl:%s", tdef );
	}
}
