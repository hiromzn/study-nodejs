"use strict";
const xlsx = require('xlsx');
const utils = xlsx.utils;

let workbook = xlsx.readFile('data.xls', {
    cellDates: true
});
//シートの読み込み
let worksheet = workbook.Sheets['Sheet1'];

//セルの範囲
let range = worksheet['!ref'];
let rangeVal = utils.decode_range(range);
for (let r=rangeVal.s.r ; r <= rangeVal.e.r ; r++) {
    for (let c=rangeVal.s.c ; c <= rangeVal.e.c ; c++) {
        let adr = utils.encode_cell({c:c, r:r});
        let cell = worksheet[adr];
        console.log(`${adr} type:${cell.t} value:${cell.v} text:${cell.w}`);
    }
}
