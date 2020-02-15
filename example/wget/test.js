const fs = require('fs');
const mkdirp = require('mkdirp');

let dir = process.argv[2];

console.log( `mkdirp : ${dir}` );
fs.mkdir( dir, null, function(err) {
    if(err) {
	console.log( `mkdirp: ERRR:${dir}` );
	throw err;
    }
    console.log( `mkdirp : OK:${dir}` );
});

function asyncOperation(cb)
{
	setInterval(() => cb(), 2000);
}

function t1(cb) {
	asyncOperation(() => {
		console.log( "t1" );
		t2(cb);
		console.log( "at1" );
	} );
}

function t2(cb) {
	asyncOperation(() => {
		console.log( "  t2" );
		t3(cb);
		console.log( "  at2" );
	} );
}

function t3(cb) {
	asyncOperation(() => {
		console.log( "    t3" );
		cb();
		console.log( "    at3" );
	} );
}

//t1(() => { console.log("DOOOO" ); } );
