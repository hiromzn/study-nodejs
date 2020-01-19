"use strict";

var isON = true;
var isON = false;
const debug = isON;
const trace = isON;

const fs = require('fs');
const readline = require('readline');
const glob = require('glob');

const rules = require(`${__dirname}/rule.json`);

// main
glob('data/*.ast', (error, files) => {
	if (error) {
		throw error;
	} else {
		console.log(`DONE : All files: ${JSON.stringify(files)}`);
	}
}).on('match', parse_file );

const structs = [];
const typedefs = [];
let current_struct = null;

function parse_file( file )
{
	const lineReader = readline.createInterface({input : fs.createReadStream( file )});
	if (debug) console.log(`check file >>>${file}`);
	lineReader.on( 'line', function( line ) {
		pattern( line );
	});
	lineReader.on( 'close', function( line ) {
		console.log( "###### RESULT : FILE:%s", file );
		console.log( JSON.stringify( { structs : structs }, null, '\t') );
		console.log( JSON.stringify( { typedefs : typedefs }, null, '\t') );
	});
}

function pattern( line )
{
	const level_regex = /\-/;
	const level = (line.search(level_regex) + 1)/2;

	const lastcp = level*2-2;
	const islast = ( line.substring(lastcp,lastcp+1) == '`' );

    //console.log('Line info:', islast, level );

	let obj = null;
	let mary;
	let rule;
    for (rule of rules)
		if (mary = line.match(new RegExp(rule.match))) {
			obj = {}
			if (debug) obj.ruletype = rule.type;
			if (debug) obj.line = line;
			if (debug) console.log( "## TYPE: %s :%s", rule.type, line );
			mary.forEach( (val, index) => {
				if ( index > 0 ) {
					if (trace) console.log( index, rule.args[index-1], val );
					obj[rule.args[index-1]] = val;
				}
			});
			delete obj.dummy;
			if ( !debug ) { delete obj.position; delete obj.ruletype; }
			if ( obj.position ) obj.position = parse_position(obj.position);
			if ( rule.type == "STRUCT" ) {
				obj.member = [];
				current_struct = obj;
				structs.push( current_struct );
			}
			if ( rule.type == "MEMBER" ) {
				if (current_struct) {
					current_struct.member.push( obj );
					if (islast && current_struct.name != null ) {
						if (trace) console.log( 'current_struct = null;' );
						current_struct = null;
					}
				}
			}
			if ( rule.type == "TYPEDEF" ) {
				if (current_struct) {
					current_struct.name = obj.name;
					current_struct = null;
				}
				typedefs.push( obj );
			}
			if (trace) console.log( obj );
		}
}

function parse_position(str)
{
	const item = /\S+:\d+/g;
	const item_parse = /([^:|\s]+):(\d+)(:(\d+))*$/;
	let allpos = [];

	str.match( item ).forEach( item => {
		let pos = {};
		let args = item.match( item_parse );
		if ( args[3] ) {
			if ( ! args[1].match( "line" ) ) pos.fname = args[1];
			pos.line = Number(args[2]);
			pos.col = Number(args[4]);
		} else {
			pos.col = Number(args[2]);
		}
		allpos.push( pos );
	});
	if (trace) console.log( allpos );
	return( allpos );
}

/*
  type
  [unsigned] <base_type> <opt>

  base_type
    int
    char
	short
	float
	double
	long
	long long
	int long
	struct <struct_name>

  option
    pointer
      *
 	  **
	  []
	  (*) .... function pointer
	array
	  [n]
	  [n][m]
	  *[n]
	function : ( argument part )
	  (aaa, bbb, ccc)
	  (aaa *, bbb, ccc *)
	  (aaa *)

*/
