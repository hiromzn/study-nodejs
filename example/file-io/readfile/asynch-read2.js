var fs = require("fs");

let fname = process.argv[1];

fs.readFile( fname, "utf8", (error, data) => {
  if (error) throw error;
  console.log( "## simple:" + data); 
});

fs.readFile( fname, "utf8", function (error, data) {
    if (error) throw error;
    console.log( "## function:" + data); 
});
