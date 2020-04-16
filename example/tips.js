
//
// arguments : arguments of function
// slice.call : convert like array data to array data
//
let funca = function() {
	const args = [].slice.call(arguments);
	console.log( args );
}

funca( 1,2,3 );
funca( 1,2,3, funca );

