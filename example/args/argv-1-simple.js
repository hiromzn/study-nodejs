var argv = require('argv');

argv.option({
	name: 'option_long_name',
	short: 'o',
	type : 'string',
	description :'test option with value',
	example: "'script --option=value' or 'script -o value'"
});

console.log(argv.run());
