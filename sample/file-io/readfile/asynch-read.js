var fs = require("fs");
 
//
// Asynch read
//
fs.readFile("test.json", "utf8", (error, data) => {
  if (error) throw error;
  console.log(data);
});

console.log('after fs.readFile()');
