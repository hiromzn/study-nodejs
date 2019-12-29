var fs = require("fs");

let fname = "g.js";

fs.readFile( fname, "utf8", function (error, data) {
    if (error) throw error;
    console.log( "## function:" + data); 
});
  
