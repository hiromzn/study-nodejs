const fs = require('fs');
const csv = require('csv');

fs.createReadStream('test.csv')
	.pipe( csv.parse( {columns: true}, (err, data) => {
		console.log(data);
	}));
