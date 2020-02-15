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

let url = "http://www.google.com/intl/ja/policies/terms/";

request(url, (err, response, body) => {
    if(err) {
	console.log( `ERROR :${response}` );
	console.log( err );
    } else {
	console.log( response );
	saveFile( "out", body, err => {
	    if(err) {
		console.log( `ERROR: ${err}` );
	    } else {
		console.log(`saveFile: OK` );
	    }});
    }
});

