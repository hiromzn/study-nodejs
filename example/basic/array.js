//
// array
//

// ref : https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Indexed_collections

//-------------
// definition
//-------------
var arr1 = new Array( 1, 2, 3 );
var arr2 = Array( 1, 2, 3 );
var arr3 = [ 1, 2, 3 ];

var obj = {};
obj.prop = [ 1, 2, 3 ];

var obj2 = {};
var obj2 = {prop: [ 1, 2, 3 ]};

// -- define fix length array with no contents  --
var arrayLength = 10;
var arr4 = new Array(arrayLength);
var arr5= Array(arrayLength);
// or
var arr6 = [];
arr6.length = arrayLength;

// with value
var myArray1 = new Array('Hello', arr6, 3.14159);
var myArray2 = ['Mango', 'Apple', 'Orange'];
var emp = [];
emp[0] = 'Casey Jones';
emp[1] = 'Phil Lesh';
emp[2] = 'August West';

{
var arr = ['one', 'two', 'three'];
arr[2];  // three
arr['length'];  // 3
};

//-------------------
// loop : for : use
//-------------------
var colors = ['red', 'green', ,'blue'];
for (var i = 0; i < colors.length; i++) { // access all element
  console.log(colors[i]);
}

for ( var i in colors ) { // no element is skipped !!!
    console.log( i + ':' + colors[i] );
}

colors.forEach(function(color) { // no element is skipped !!!
    console.log(color);
  });

// arrow function
colors.forEach(color => console.log(color));  // no element is skipped !!!

//
// undefined VS no_element
//
console.log( '#### sample of no element' );
var array = ['first', 'second', , 'fourth'];
array.forEach(function(element) {
    console.log(element + ' : ' + ( element == undefined ) );
});
console.log( 'no element is undefined ??? : ' + ( array[2] == undefined ) );

console.log( '#### sample of undefined' );
array2 = ['first', 'second', undefined, 'fourth'];
array2.forEach(function(element) {
    console.log(element + ' : ' + ( element == undefined ) );
}); 
let list = [];
let list2 = [ 10, 20 ];

list.push( "1" );
list.push( "2" );
list.forEach( val => { console.log( val ) });
list2.forEach( (val, index) => {
	console.log( `index:${index} : val:${val}` );
});
