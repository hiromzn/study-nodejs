var fs = require("fs");

for(var i = 2; i < process.argv.length; i++){
	var fname = process.argv[i];
	console.log('## file name:' + fname);
	fs.readFile( fname, "utf8", (error, data) => {
  		if (error) {
    		return;
  		}
  		console.log(data);
	});
}
