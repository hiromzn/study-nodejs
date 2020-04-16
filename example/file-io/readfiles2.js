var fs = require("fs");

for(var i = 2; i < process.argv.length; i++){
	var fname = process.argv[i];
	console.log('## file name:' + fname);
    fs.readFileSync( fname, "utf8" ).split("\n").forEach( function( value ) {
        console.log( value );
   });
}

for(var i = 2; i < process.argv.length; i++){
	var fname = process.argv[i];
	console.log('## file name:' + fname);
    console.log( fs.readFileSync( fname, "utf8" ).split("\n") );
}

for(var i = 2; i < process.argv.length; i++){
	var fname = process.argv[i];
	console.log('## file name:' + fname);
    console.log( fs.readFileSync( fname, "utf8" ).split("\n").filter(line => line.match( /if/ )) );
}