const xlsx = require('xlsx');
const utils = xlsx.utils;

let workbook = xlsx.readFile('data.xls');

let sheetNames = workbook.SheetNames;
console.log(sheetNames);

let worksheet = workbook.Sheets['Sheet1'];
console.log(worksheet);

let range = worksheet['!ref'];
console.log(range);

console.log(worksheet['B2']);


//セルアドレスを数値表記に変換
console.log(utils.decode_cell('AZ123'));
/*
    { c: 51, r: 122 }
*/

console.log(utils.encode_col(10));
console.log(utils.encode_row(10));
console.log(utils.encode_cell({c:10, r:10}));

/*
    range = A1:F2
*/
console.log(utils.decode_range(range));
