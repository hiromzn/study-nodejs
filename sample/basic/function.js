// standard
function square(number) {
    return number * number;
}
console.log( square(4) );

// no name function
var square2 = function(number) { return number * number };
console.log( square2(4) );

var factorial = function fac_name(n) { return n<2 ? 1 : n * fac_name(n-1) };
console.log(factorial(3)); // 3 * (2 * 1) = 6
console.log(factorial(4)); // 4 * (3 * (2 * 1)) = 24
