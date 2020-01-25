
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

t1(() => { console.log("DOOOO" ); } );
