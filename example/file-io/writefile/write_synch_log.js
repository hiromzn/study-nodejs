const fs = require('fs');
let text = "write data with log\n";
console.log("##### start...");
fs.writeFileSync("output.txt", text, (err, data) => {
  if (err) throw err;
  console.log("##### complete...");
});
