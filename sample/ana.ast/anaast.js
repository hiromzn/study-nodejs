const fs = require('fs');
let fname = "test.h.ast";

// let regexp = /t(e)(st(\d?))/g;
// let str = 'test1test2';
// let array = [...str.matchAll(regexp)];
// console.log(array);

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(fname)
});
  
lineReader.on('line', function (line) {
	let regex = /\-/;
	let level = (line.search(regex) + 1)/2;
	let lastcp = level*2-2;
	let islast = ( line.substring(lastcp,lastcp+1) == '`' );
	let res1 = [...line.matchAll( /-RecordDecl\s+(\S+)\s+<.*>\s+\S+\s+(struct\s+\S+)\sdefinition/ )];
	console.log(res1);
	let res2 = [...line.matchAll( /-FieldDecl\s+(\S+)\s+<.*>\s+\S+\s+(\S+)\s+'(.+)'/ )];
	console.log(res2);
	let res3 = [...line.matchAll( /-TypedefDecl\s+(\S+)\s+<.*>\s+\S+\s+(\S+)\s+'(.+)':'(.+)'/ )];
	console.log(res3);
	// let type = res[1];
	// let id = res[2];
	// let slocd = res[1];
    console.log('Line from file:', islast, level, line);
});


// |-RecordDecl 0x7fd34c030f48 <test.h:1:9, line:5:1> line:1:16 struct my_test definition
// | |-FieldDecl 0x7fd34c087c00 <line:2:2, col:7> col:7 i 'int'
// | |-FieldDecl 0x7fd34c087c60 <line:3:2, col:8> col:8 p 'char *'
// | `-FieldDecl 0x7fd34c087cc0 <line:4:2, col:7> col:7 l 'long'
// `-TypedefDecl 0x7fd34c087d68 <line:1:1, line:5:3> col:3 MY_TEST 'struct my_test':'struct my_test'
//   `-ElaboratedType 0x7fd34c087d10 'struct my_test' sugar
//     `-RecordType 0x7fd34c030fc0 'struct my_test'
//       `-Record 0x7fd34c030f48 'my_test'
