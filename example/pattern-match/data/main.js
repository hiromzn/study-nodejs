"use strict";

const fs = require('fs');
const glob = require('glob');
const regex = /c*t/;

glob('data/*', (error, files) => {
	if (error) throw error;
	console.log(`All files: ${JSON.stringify(files)}`);
})
	 .on('match', file => {
		 let match;
		 console.log(`check file: ${file}`);
		 fs.readFile(file, 'utf8', (err, data) => {
			 if (err) throw err;
//			 console.log(`##### found: ${file}`);
			 if (match = data.match(regex)) {
				 match.forEach(elem => console.log('##### found ele', file, elem));
				 }
			 }
		 );
	 });
