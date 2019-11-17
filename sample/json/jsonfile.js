var jsonfile = require('jsonfile');

var data = { foo: 'aaa', bar: 'bbb' };

jsonfile.writeFile(
	'tmp.json',
	data,
	{
    	encoding: 'utf-8', 
    	replacer: null, 
    	spaces: null
	},
	function (err) {
});

jsonfile.writeFile(
	'tmp_2.json',
	data,
	{
    	encoding: 'utf-8', 
    	replacer: null, 
    	spaces: 2
	},
	function (err) {
});
