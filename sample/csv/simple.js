const fs = require('fs');
const csv = require('csv');

const parser = csv.parse((error, data) => {

    console.log('initial data');
    console.log(data);

    let newData = [];

    data.forEach((element, index, array) => {
        let row = [];
        row.push(element[0].toUpperCase());
        row.push(element[1]);
        row.push(element[2]);
        row.push(element[3]);
        newData.push(row);
    })

    console.log('new data');
    console.log(newData);

    csv.stringify(newData,(error,output)=>{
        fs.writeFile('out.csv',output,(error)=>{
            console.log('output new csv data');
        })
    })
})

fs.createReadStream('test.csv').pipe(parser);
