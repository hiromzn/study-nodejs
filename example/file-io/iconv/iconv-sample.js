var fs = require('fs');
var iconvLite = require('iconv-lite');
var pump = require('pump');

if (process.argv.length < 6) {
    console.error('lack argument.');
    process.exit(1);
}

if (!iconvLite.encodingExists(process.argv[3]) || !iconvLite.encodingExists(process.argv[5])) {
    console.error('encoding does not exist.');
    process.exit(1);
}

try {
    var readStream = fs.createReadStream(process.argv[2]);
    var decode = iconvLite.decodeStream(process.argv[3]);
    var encode = iconvLite.encodeStream(process.argv[5]);
    var writeSteam = fs.createWriteStream(process.argv[4]);
    pump(readStream, decode, encode, writeSteam, function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        else {
            console.log('finished!!')
        }
    });
}
catch (err) {
    console.error(err);
    process.exit(1);
}
