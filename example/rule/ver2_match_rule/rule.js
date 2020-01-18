
const rules = require(`${__dirname}/rule.json`);

const in1 = "STRUCT myname 5";
const in2 = "MEMBER mname int";
const in3 = "foo mname int";

console.log( "##### 1" );
console.log( getTypeRule(in1) );
console.log( "##### 2" );
console.log( getTypeRule(in2) );
console.log( "##### 3" );
console.log( getTypeRule(in3) );

function getTypeRule(string) {
	let mary;
    for (rule of rules)
		if (mary = string.match(new RegExp(rule.match))) {
			let ret = { type : rule.type };
			mary.forEach( (val, index) => {
				console.log( index, val );
				if ( index > 0 ) {
					ret[rule.args[index-1]] = val;
				}
			});
			return ret;
		}
    return null;
}
