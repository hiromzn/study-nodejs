const fs = require('fs');
const csv = require('csv');

fs.createReadStream('test.csv')
	.pipe( csv.parse( (err, data) => {
		console.log(data);
	}));
