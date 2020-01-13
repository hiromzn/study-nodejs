var fs = require('fs');
var iconvLite = require('iconv-lite');

if (process.argv.length < 6) {
    console.error('lack argument.');
    process.exit(1);
}

var infile = process.argv[2];
var incode = process.argv[3];
var outfile = process.argv[4];
var outcode = process.argv[5];

if (!iconvLite.encodingExists(process.argv[3]) || !iconvLite.encodingExists(process.argv[5])) {
    console.error('encoding does not exist.');
    process.exit(1);
}

fs.readFile( infile, function (err, indata) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else {
        fs.writeFile( outfile, iconvLite.encode( iconvLite.decode( indata, incode ), outcode ), function ( err ) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            else {
                console.log('finished!!');
            }
        });
    }
});
