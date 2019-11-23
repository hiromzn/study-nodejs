
// 1 line comment
 
/* log line comment
   log line comment
 */

var myvar = 'initial value';  // define global or local var
let localvar = 'initial  value'; // define local var
const constant_var = 'initial value'; // define read only constant

// data type
/*
- Primitive
    - Boolean : true or false
    - null : special keyword
    - undefined : no defined value
    - Number : ex) 42 or 3.14159
    - BigInt : long integer : ex) 9007199254740992n
    - String : ex) "Howdy"
    - Symbol : (ECMAScript 2015) fixed instance
- Object
*/

var intvar = parseInt( '123' );
var floatvar = parseFloat( '1.234' );

var a = '1.1' + '1.1' // '1.11.1'
var b = (+'1.1') + (+'1.1') // 2.2

/*
0, 117, -345, 123456789123456789n             (10進数)
015, 0001, -0o77, 0o777777777777n             (8進数) 
0x1123, 0x00111, -0xF1A7, 0x123456789ABCDEFn  (16進数)
0b11, 0b0011, -0b11, 0b11101001010101010101n  (2進数)
*/

//-------------------
// regexp
//-------------------
var re = /ab+c/;
