var fs = require("fs");
 
fs.readFile("test.json", "utf8", (error, data) => {
  if (error) {
    return;
  }
  console.log(data);
});
