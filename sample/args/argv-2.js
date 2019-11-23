var argv = require('argv');

argv.type( 'squared', function( value ) { //squared型を定義
    value = parseFloat( value );
    return value * value;
});
 
argv.option([
    {
        name: 'data',
	short: 'd',
        type: 'csv,int',
	description: 'csv int data',
	example: "'--data=1,2,3' or '-d 1,2,3'"
    },
    {
        name: 'path',
        short: 'p',
        type: 'list,path',
	description: 'path list',
	example: "'-p path1 -p path2' or '--path path1 --path path2' "
    },
    {
    	name: 'square',
    	short: 's',
    	type: 'squared'
    }
]);

console.log(argv.run());
