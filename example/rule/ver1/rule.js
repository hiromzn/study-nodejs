
const fs = require("fs");
const path = require("path");
const rulebook = require(`${__dirname}/rulebook.js`);

function getVariableOpObject(variable, varInfoObject) {
    let retObject = {name: variable};
    const rule = rulebook.getTypeRule(varInfoObject.type, varInfoObject.isStruct);
    if (rule) {
        if (rule.op) retObject.op_prefix = `${rule.op}(`; retObject.op_suffix = ")";
        if (rule.complex_op) {retObject.complex_op_prefix = `${rule.complex_op}(`; retObject.complex_op_suffix = ")";}

        if (rule.rev_op) {retObject.rev_op_prefix = `${rule.rev_op}(`; retObject.rev_op_suffix = ")";}
        if (rule.complex_rev_op) {retObject.complex_rev_op_prefix = `${rule.complex_rev_op}(`; retObject.complex_rev_op_suffix = ")";}
        
        retObject.isArray = varInfoObject.isArray;
        retObject.array_length = varInfoObject.length;
        retObject.isPointer = varInfoObject.isPointer;
    }

    return retObject;
}
