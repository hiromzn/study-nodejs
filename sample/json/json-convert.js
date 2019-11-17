const fs = require('fs');

const jsonObject = JSON.parse(fs.readFileSync('./input.json', 'utf8'));
const result = {};

jsonObject.list.forEach((obj) => {
    result[obj.id] = obj;
});

fs.writeFile(
	'./output.json',
	JSON.stringify(result),
 	(err)=>{
            if(err) console.log(`error!::${err}`);
	}
);

