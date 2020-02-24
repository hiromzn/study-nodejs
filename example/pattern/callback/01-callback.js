"use strict";

function add(a, b, callback) {
	let ans = a + b;
	callback( ans );
}

console.log('before');
add(1, 2, result => console.log('Result: ' + result));
console.log('after');
