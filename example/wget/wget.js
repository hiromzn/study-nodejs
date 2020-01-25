"use strict";

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

function saveFile(filename, contents, callback) {
	console.log( `SAVE file: ${filename}` );
	console.log( path.dirname(filename) );
	mkdirp(path.dirname(filename), null, err => {
		if(err) {
			console.log( `ERRR_DATA::::${contents}` );
			return callback(err);
		}
		console.log( `DATA::::${contents}` );
		fs.writeFile(filename, contents, callback);
	});
	fs.writeFile(filename, contents, callback);
	console.log( `END SAVE file: ${filename}` );
}

function download(url, filename, callback) {
	console.log(`Downloading ${url}`);
	request(url, (err, response, body) => {
		if(err) {
			console.log( `ERRR:${response}` );
			return callback(err);
		}
		console.log( `OK: ${filename}` );
		saveFile(filename, body, err => {
			if(err) {
				console.log( `ESSSS:${response}` );
				return callback(err);
			}
			console.log(`Downloaded and saved: ${url}`);
			callback(null, body);
		});
		console.log( `END OK:${response}` );
	});
	console.log(`END Downloading ${url}`);
}

function wget(url, nesting, callback) {
	const filename = utilities.urlToFilename(url);
	fs.readFile(filename, 'utf8', (err, data) => {
		if(err) {
			if(err.code !== 'ENOENT') {
				return callback(err);
			}
			return download(url, filename, (err, data) => {
				if(err) {
					return callback(err);
				}
				wgetLinks(url, data, nesting, callback);
			});
		}
		wgetLinks(url, data, nesting, callback);
	});
}

function wgetLinks(currentUrl, data, nesting, callback) {
	if (nesting <= 0 ) {
		return process.nextTick(callback);
	}
	
	let links = utilities.getPageLInks(currentUrl, body);

	function iterate(index) {
		if (index === links.lengrh) {
			return callcack();
		}
		wget(links[index], nesting - 1, (err) => {
			if (err) {
				return callback(err);
			}
			iterate(index + 1);
		});
	}
	iterate(0);
}

wget(process.argv[2], (err, filename, downloaded) => {
  if(err) {
    console.log(err);
  } else if(downloaded){
    console.log(`Completed the download of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded`);
  }
});
