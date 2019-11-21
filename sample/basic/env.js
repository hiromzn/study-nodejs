var env = process.env;

console.log( env[0] );
for ( var i in env ) {
    console.log( i + env[i] );
}

// console.log(JSON.stringify(process.env));
