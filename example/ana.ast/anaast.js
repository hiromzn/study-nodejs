"use strict";

const debug = false;
const trace = false;

const fs = require('fs');
const readline = require('readline');
const glob = require('glob');

const rules = require(`${__dirname}/rule.json`);

// main
glob('data/test2.ast', (error, files) => {
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

	let ret = null;
	let mary;
	let rule;
    for (rule of rules)
		if (mary = line.match(new RegExp(rule.match))) {
			ret = { type : rule.type };
			mary.forEach( (val, index) => {
				if (trace) console.log( index, val );
				if ( index > 0 ) {
					ret[rule.args[index-1]] = val;
				}
			});
			if (debug) console.log( "## TYPE: " + rule.type );
			if ( rule.type == "STRUCT" ) {
				ret.member = [];
				current_struct = ret;
				structs.push( current_struct );
			}
			if ( rule.type == "STRUCT_NONAME" ) {
				ret.member = [];
				current_struct = ret;
				structs.push( current_struct );
			}
			if ( rule.type == "MEMBER" ) {
				if (current_struct) {
					current_struct.member.push( ret );
					if (islast && current_struct.name) current_struct = null;
				}
			}
			if ( rule.type == "TYPEDEF" ) {
				if (current_struct) {
					current_struct.name = ret.name;
					current_struct = null;
				}
				typedefs.push( ret );
			}
		}
}
