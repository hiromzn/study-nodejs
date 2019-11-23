var env = process.env;

// print all environment
for ( var i in env ) {
    console.log( i + env[i] );
}

// print json format
console.log(JSON.stringify(process.env));
