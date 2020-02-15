"use strict";

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

function saveFile(filename, contents, callback) {
	mkdirp(path.dirname(filename)).then(
		made => {
			console.log(`mkdir :${filename}` );
			fs.writeFile(filename, contents, callback);
			return callback();
		},
		err => {
			console.log( err );
			return callback(err);
		});
}

function download(url, filename, callback) {
    console.log(`Downloading ${url}:${filename}`);
    request(url, (err, response, body) => {
		if(err) {
			console.log( `request ERRR:${response}` );
			return callback(err);
		}
		saveFile(filename, body, err => {
			if(err) {
				console.log( `ERROR: ${err}` );
				return callback(err);
			}
			console.log(`saveFile: OK : ${filename}`);
			return callback(null, body);
		});
	});
}

function wgetLinks(currentUrl, data, nesting, callback) {
	if (nesting <= 0 ) {
		console.log( `############ END:${currentUrl}:${nesting}` );
		return process.nextTick(callback);
	}
	
	let links = utilities.getPageLinks(currentUrl, data);

	function iterate(index) {
		if (index === links.lengrh) {
			return callback();
		}
		if (links[index]) wget(links[index], nesting - 1, (err) => {
			if (err) {
			    console.log( `ERROR: wgetLinks: nes=${nesting}: ${links[index]}` );
			    return callback(err);
			} else {
				iterate(index + 1);
			}
		});
	}
	iterate(0);
}

function wget(url, nesting, callback) {
	console.log( `URL: nes=${nesting}: ${url}` );
	const filename = utilities.urlToFilename(url);
	fs.readFile(filename, 'utf8', (err, data) => {

		if(err) {
			if(err.code !== 'ENOENT') {
				return callback(err);
			}
			if ( ! fs.existsSync(filename)) {
				return download(url, filename, (err, data) => {
					if(err) {
						console.log( `ERROR : readFile : nes=${nesting}:${filename}` );
						console.log( err );
						return callback( err );
					}
					wgetLinks(url, data, nesting, callback);
				});
			}
		}
		wgetLinks(url, data, nesting, callback);
	});
}

wget(process.argv[2], 1, (err, filename, downloaded) => {
  if(err) {
    console.log(err);
  } else if(downloaded){
    console.log(`Completed the download of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded`);
  }
});
