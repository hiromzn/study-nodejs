//
// reference :
// https://medium.com/@wietsevenema/node-js-using-for-await-to-read-lines-from-a-file-ead1f4dd8c6f
// 

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

readFileLine( "input.txt" );

async function readFileLine( fname ) {
	let input = fs.createReadStream( fname );
	for await (const line of readLines({ input })) {
		console.log(line);
	}
}

function readLines({ input }) {
	const output = new stream.PassThrough({ objectMode: true });
	const rl = readline.createInterface({ input });
	rl.on("line", line => { 
		output.write(line);
	}).on("close", () => {
		output.push(null);
	}); 
	return output;
}
