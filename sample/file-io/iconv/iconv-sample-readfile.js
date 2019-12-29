var fs = require('fs');
var iconvLite = require('iconv-lite');

if (process.argv.length < 6) {
    console.error('lack argument.');
    process.exit(1);
}

if (!iconvLite.encodingExists(process.argv[3]) || !iconvLite.encodingExists(process.argv[5])) {
    console.error('encoding does not exist.');
    process.exit(1);
}

fs.readFile(process.argv[2], function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else {
        fs.writeFile(process.argv[4], iconvLite.encode(iconvLite.decode(data, process.argv[3]), process.argv[5]), function (err) {
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
