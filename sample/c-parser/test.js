var parser = require("node-c-parser");

parser.lexer.cppUnit.clearPreprocessors("t.c", function(err, codeText){
    if(err){
        // Error occured during preprocessor removal. Handle it.
	console.log( 'ERROR' );
	console.log( err );
    }
    else{
	// codeText variable contains preprocessor free code. Do something with it.
	console.log( '###### codeText' );
	console.log( codeText );
	var tokens = parser.lexer.lexUnit.tokenize(codeText);
	var parse_tree = parser.parse(tokens);
	console.log( '###### token' );
	console.log( tokens );
	console.log( JSON.stringify( tokens, null, "  " ) );
	console.log( '###### parse' );
	console.log( parse_tree );
	console.log( JSON.stringify( parse_tree, null, "  " ) );
    }
});
