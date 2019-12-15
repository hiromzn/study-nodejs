var fs = require("fs");
 
fs.readFile("test.json", "utf8", (error, data) => {
  if (error) thwow error;
  console.log(data);
});
