"use strict";

const fs = require("fs");
const readline = require('readline');
const stream = require('stream');
const path = require("path");
const unlinkAsync = require("util").promisify(fs.unlink);
const readDirAsync = require("util").promisify(fs.readdir);
const readFileAsync = require("util").promisify(fs.readFile);
const writeFileAsync = require("util").promisify(fs.writeFile);

module.exports.readFileLineAsync = async ( fname, do_line ) => {
	let input = fs.createReadStream( fname );
	for await (const line of readLines({ input })) {
		do_line(line);
	}
};

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
