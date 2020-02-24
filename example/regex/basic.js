const runMatch = (regex, str) => {
	console.log( "runMatch: regex:%s, pattern:%s => ans:%s", regex, str, str.match(regex) );
};
const runMatchAll = (regex, str) => {
	console.log( "runMatchAll: regex:%s, pattern:%s => ans:", regex, str );
	console.log( [...str.matchAll(regex)] );
};
const runSplit = (regex, str) => {
	console.log( "runSplit: regex:%s, pattern:%s => ans:", regex, str );
	console.log( [...str.split(regex)] );
};

let str = "  foo123   foo345 bar foo999  ";

runMatch( /foo\d+/, str );
runMatch( /foo\d+/g, str );

runMatchAll( /foo\d+/g, str );

runSplit( /foo\d+/g, str );
