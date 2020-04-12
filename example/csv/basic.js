const fs = require('fs');
const csv = require('csv');

console.log( __dirname );
console.log( __dirname + '/test.csv' );

console.log("##### print : test.csv");
fs.createReadStream(__dirname + '/test.csv')
  .pipe(process.stdout);
  
fs.createReadStream(__dirname + '/test.csv')
  .pipe(csv.parse(function(err, data) {
    console.log(data);
	console.log("##### END: print : csv.parse()");
}));

fs.createReadStream(__dirname + '/test.csv')
  .pipe(csv.parse({columns: true}, function(err, data) {
    console.log(data);
	console.log("##### END: print : csv.parse( {columns:true},... )");
}));

fs.createReadStream(__dirname + '/test.csv')
  .pipe(csv.parse({columns: true}, function(err, data) {
    console.log(JSON.stringify(data));
	console.log("##### END: print : csv.parse( {columns:true}, function() {JSON} )");
}));

csv.generate({length: 3,max_word_length:5})
  .pipe(csv.parse(function(err, data) {
    console.log(data);
	console.log("##### END: csv.generate");
}));

csv.generate({length: 3,max_word_length:5})
  .pipe(csv.parse({columns: true}, function(err, data) {
    console.log(JSON.stringify(data));
	console.log("##### END: print : csv.generate, JSON");
}));
