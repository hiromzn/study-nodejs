var Glob = require("glob").Glob;

var pattern = "../../../**/*.[ch]"
console.log(pattern)

var mg = new Glob(pattern, function (er, matches) {
  console.log("matches", matches)
})
console.log("after")
