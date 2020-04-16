var obj = { 'a':10, 'b':20 };

console.log( obj );
console.log( obj['a'] );
console.log( obj["a"] );
console.log( obj['b'] );
obj['b'] = 99;
console.log( obj['b'] );

var obj = new Object();

obj.a=10;
console.log( obj );


for ( var i in obj ) {
    console.log( i + ':' + obj[i] );
}
console.log(JSON.stringify(obj));

var array = [ 1, 2, 3 ];
for ( var i in array ) {
    console.log( i + ':' + array[i] );
}

// define function
const carTypes = function( com ) { return( com + "_car" ); };
const special = (type => 'special_is_' + type);

var car = { myCar: 'Saturn', getCar: carTypes('Honda'), special: special( 'sale' ) };
console.log( car );
var car = { manyCars: {a: 'Saab', b: 'Jeep'}, 7: 'Mazda' };
console.log( car );

var unusualPropertyNames = {
    '': 'NULL',
    '!': 'Bikkuri'
  };
console.log(unusualPropertyNames['']);  // 空文字列
console.log(unusualPropertyNames['!']); // バン！

var car = {};
// let car; // ERROR pattern
car.type = "1box";
car.size = "big";

console.log( car );

