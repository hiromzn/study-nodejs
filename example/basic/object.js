var obj = { 'a':10, 'b':20 };

for ( var i in obj ) {
    console.log( i + ':' + obj[i] );
}
console.log(JSON.stringify(obj));

var array = [ 1, 2, 3 ];
for ( var i in array ) {
    console.log( i + ':' + array[i] );
}

var car = { myCar: 'Saturn', getCar: carTypes('Honda'), special: sales };
var car = { manyCars: {a: 'Saab', b: 'Jeep'}, 7: 'Mazda' };

var unusualPropertyNames = {
    '': '空文字列',
    '!': 'バン！'
  };
console.log(unusualPropertyNames['']);  // 空文字列
console.log(unusualPropertyNames['!']); // バン！
