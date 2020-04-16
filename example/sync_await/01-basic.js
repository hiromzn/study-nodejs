const fs = require('fs');
const readdirAsync = require("util").promisify(fs.readdir);


async function pr(str) {
	console.log( str );
}

console.log("#before");


const ans = async _ => {
	try {
		let promises = [];

        for (file of await readdirAsync("./")) if (file.endsWith(".js"))
            promises.push(pr(file));

		console.log("before");
		await Promise.all(promises);
		console.log("after");
	} catch (err) { 
		console.log(err);
	}
}

ans();
console.log("#END")
