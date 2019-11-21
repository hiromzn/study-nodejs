var obj = { 'a':10, 'b':20 };

for ( var i in obj ) {
    console.log( i + ':' + obj[i] );
}
console.log(JSON.stringify(obj));

var array = [ 1, 2, 3 ];
for ( var i in array ) {
    console.log( i + ':' + array[i] );
}
