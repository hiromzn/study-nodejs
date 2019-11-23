const nums = [1, 2, 3];

function sum( a, b, c )
{
    return( a + b + c );
}
console.log( nums );
console.log( ... nums );

console.log( sum( nums ) );
console.log( sum( ... nums ) );