var fs = require("fs");
var iconv = require("iconv-lite");
 
for(var i = 2;i < process.argv.length; i++){
	var fname = process.argv[i];
	console.log('##### file name:' + fname);
	fs.readFile( fname, function (error, data) {
  		if (error) {
    		return;
  		}
  		console.log( iconv.decode(data, "euc-jp").replace( /(\W)int(\W)/g, '$1long$2' ).replace( /^int(\W)/g, 'long$1' ) );
	});
}
