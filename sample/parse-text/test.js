var Parser = require("simple-text-parser");
var parser = new Parser();

parser.addRule(/\#[\S]+/ig, function(tag) {
    // Return the tag minus the `#` and surrond with html tags
    return "<span class=\"tag\">" + tag.substr(1) + "</span>";
});

parser.render("Some text #iamahashtag foo bar.");

var out = parser.toTree("Some text #iamahashtag foo bar.");

console.log( out );