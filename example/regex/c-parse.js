
/*
  \    escape
  ^    top
  $    end
  *    repeat 0+alpha (= {0,})
  +    repeat 1+alpha (= {1,})
  ?    repeat 0 or 1
         123abc /\d+/  ==> match 123
		 123abc /\d+?/ ==> match 1
  .    any one char
  (x)  match x and record it.
         reference in match pattern : \1, \2, ...
		 reference in replscement   : $1, $2, ..., $&
		   $& ... all match string
  (?:x)   match x and NOT record it.
  x(?=y)  match x when next of x is y.
  x(?!y)  match x when next of x is NOT y.
  (?<=y)x match x when before of x is y.
  (?<!y)x match x when before of x is NOT y.
  x|y  x or y
  {n}     repeat n.
  {n,}    repeat >=n.
  {n,m}   repeat n<=...<=m
  [xyz]   x or y or z (=[x-z])
  [^xyz]  not( x and y and z )
  \b      match word separator (size is ZERO) (ex: "mam" /\bm/ => first "m")
  [\b]    match backspace (U+0008)
  \B      match NOT word separator. (ex: "aay yes" /y\B./ => "ye");
  \d
  \s
  \w      word (=[A-Za-z0-9_])
  \0      null (U+0000)
  \xhh    2 HEX code
  \uhhhh  4 HEX code
  \u{hhhh} unicode of 4 HEX.
*/

const msg = str => {
	console.log( "\n##### %s #####", str );
};

const ck = (regex, str) => {
	console.log( "regex:%s, pattern:%s => ans:%s", regex, str, str.match(regex) );
};
const mall = (regex, str) => {
	console.log( "regex:%s, pattern:%s => ans:", regex, str );
	console.log( [...str.matchAll(regex)] );
};
const split = (regex, str) => {
	console.log( "regex:%s, pattern:%s => ans:", regex, str );
	console.log( [...str.split(regex)] );
};

var r1 = /(foo)\d*(bar)/;

ck( r1, "foo123bar" ); // OK
ck( r1, "foobar" ); // OK
ck( r1, "foo123 bar" ); // NG

var r1 = /(foo)\s+\S*\s*(bar)/;
ck( r1, "foo 123 bar" );
ck( r1, "foo 1 bar" );
ck( r1, "foo bar" );
ck( r1, "foo bar other" );
ck( r1, "foobar" );
ck( r1, "foo 123 aaa bar" );

var r1 = /(foo)\s*\S*\s+(bar)(:(tail))*$/;
ck( r1, "foo 123 bar" );
ck( r1, "foo 123 bar:tail" );
ck( r1, "foo 123 bar tail" );

var r1 = /(\S+):(\d+)/g;
ck( r1, "f_name:12, line:34" );
ck( r1, "foo 123 bar tail" );

var s = "A111A A222A A333A";
ck( /A\S+A/, s );
ck( /A\S+A/g, s );
ck( /(A\S+A)/, s );
ck( /(A\S+A)/g, s );
ck( /(A)(\S+A)/g, s );
console.log( [...s.matchAll( /A\S+A/g )] );

var r1 = /A\S+A/g;
mall( r1, "A111A A222A A333A" );
// ans.forEach(o => { console.log(o); });

const arsize = (regex, str) => {
	var size = 0;
	[...str.matchAll(regex)].forEach( (val, index) => {
		if (!size) size=1;
		size *= val[1];
		//console.log( "[%d]=%d => %d", index, val[1], size );
	});
	console.log( "SIZE:%d", size );
	//return( size );
};

msg( "arry size" );
var r1 = /\[(\d+)\]/g;
mall( r1, "int [2]");    // a[0][1] = '2';
arsize( r1, "int [2]");    // a[0][1] = '2';
mall( r1, "int [2][3]"); // a[0][1] = '2'; a[1][1] = '3';
arsize( r1, "int [2][3]"); // a[0][1] = '2'; a[1][1] = '3';
mall( r1, "int [2][3][4]"); // a[0][1] = '2'; a[1][1] = '3'; a[2][1] = '4';
arsize( r1, "int [2][3][4]"); // a[0][1] = '2'; a[1][1] = '3'; a[2][1] = '4';
mall( r1, "int []");    // NO
arsize( r1, "int []");    // NO
mall( r1, "int [][]");    // NO
arsize( r1, "int [][]");    // NO

msg( 'type name' );
var r2 = /^([^\*\[\(]+)(?:[^\*\[\(])*/;
ck( r2, "unsigned long");
ck( r2, "long");
ck( r2, "int [2][3]");
ck( r2, "int *");
ck( r2, "struct name [2][3]");
ck( r2, "struct name *");
ck( r2, "unsigned long int [2][3]");
ck( r2, "unsigned long int *");
ck( r2, "int (void*)");
ck( r2, "int (*)(void*)");

msg( 'function pointer' );
var r2 = /\(\*\)/;
ck( r2, "int (*)(void*)");
ck( r2, "int (void*)");
ck( r2, "int (void*, int, char *)");

msg( 'pointer' );
var r2 = /\*(?:\[.*)*$/;
ck( r2, "int *"); // Y
ck( r2, "int **"); // Y
ck( r2, "int *[2]"); // Y
ck( r2, "int [2]"); // array
ck( r2, "int (void*)"); // func
ck( r2, "int (void*, int, char *)"); // func

msg( 'STRUCT' );
var r2 = /^struct\s+/;
ck( r2, "struct mystr"); // Y
ck( r2, "int (struct mystr)"); // func

msg( "split TEST" );
var r1 = /[\s-,]/;
split( r1, "int 2, 3");
split( r1, "int 2-3");
split( r1, "int [2][3]");

