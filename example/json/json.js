var json3 = [
    {
        "name": "太郎",
        "age": "30",
        "tel": "090-0123-4567"
    },
    {
        "name": "花子",
        "age": "23",
        "tel": "080-4567-8901"
    },
    {
        "name": "三郎",
        "age": "18",
        "tel": "070-3456-7890"
    }
]

var json = {
        "name": "太郎",
        "age": "30",
        "tel": "090-0123-4567"
}

console.log(json);
console.log(json.name);

json.area = "Tokyo";
console.log(json);

console.log(json3);
json3.push({name: "goro"});
console.log(json3);
json3[1].area = 'kyoto';
console.log(json3);
delete json3[1].age;
console.log(json3);
