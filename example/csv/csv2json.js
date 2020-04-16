var fs = require('fs');
var Converter=require("csvtojson").Converter;

var simple = new Converter({
	delimiter: ',',
	constructResult: false,
});

// advanced usage
var test1 = new Converter({
	delimiter: ':',
	constructResult: false,
	toArrayString: true,
	noheader: true,
    headers: ['kind','map','tid','mapid','strname']
});

//var readStream = fs.createReadStream(process.argv[2]);
//var writeStream = fs.createWriteStream(process.argv[3]);

var readStream = fs.createReadStream('test.csv');
var writeStream = fs.createWriteStream('test.json');

readStream.pipe(simple).pipe(writeStream);
console.log("END");
