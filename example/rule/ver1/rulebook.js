/*
 * Rulebook reader for Sol2Linux 
 */

const rules = require(`${__dirname}/rulebook.json`);

exports.getTypeRule = (type, isStruct = false) => {
    if (isStruct) return {match: type, complex_op: `sol2linux_convert${type}EndianOnly`, complex_rev_op: `linux2sol_convert${type}EndianOnly`};

    for (rule of rules) if (type.match(new RegExp(rule.match))) return rule;

    return null;
}