const fs = require('fs');
const csv = require('csv');

csv.generate( {length: 3, max_word_length: 5} )
	.pipe(csv.parse( (err, data) => {
		console.log(data);
		// JSON : console.log( JSON.stringify(data, "", "\t") );
	}));
