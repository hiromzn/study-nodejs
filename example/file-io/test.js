"use strict";

const futil = require("./fileutil");

futil.readFileLineAsync( "input.data", (line) => {
    console.log(line);
});

