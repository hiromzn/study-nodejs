/*
 * Solaris2Linux telegram code generator
 */
const fs = require("fs");
const path = require("path");
const Hairyone = require("mustache");
const utils = require(`${CONSTANTS.LIBDIR}/utils.js`);
const unlinkAsync = require("util").promisify(fs.unlink);
const {os_cmd} = require(`${CONSTANTS.EXTDIR}/os_cmd.js`);
const {dirs, cmds} = require(`${__dirname}/common.xf.js`);
const readdirAsync = require("util").promisify(fs.readdir);
const readfileAsync = require("util").promisify(fs.readFile);
const writefileAsync = require("util").promisify(fs.writeFile);
const rulebook = require(`${__dirname}/telegram_converter/rulebook.js`);
const {c_cpp_compile} = require(`${CONSTANTS.EXTDIR}/c_cpp_compiler.js`);
const endian_only_c = fs.readFileSync(`${__dirname}/telegram_converter/endian_only.c.mustache`, "utf8");
const endian_only_h = fs.readFileSync(`${__dirname}/telegram_converter/endian_only.h.mustache`, "utf8");
const master_code_h = fs.readFileSync(`${__dirname}/telegram_converter/master_code.h.mustache`, "utf8");
const master_code_c = fs.readFileSync(`${__dirname}/telegram_converter/master_code.c.mustache`, "utf8");

const doubleProcessStructs = false;
let structsProcessing = [];

let build_files = {
	// AST JSON files for telegrams
    ast_json_files: [],

    // Will contain the c files we want to compile
    c_files: [],

    // Will contain the o files we want to link
    o_files: [], 

    // final output
	out_file : `${dirs.lib_dir}/sol2linux.a`
}

// build
exports.make = async _ => {
	try {
		// create output directories, if needed
        await CONSTANTS.SHELL.mkdir("-p", [dirs.o_dirs.obj]);
        await CONSTANTS.SHELL.mkdir("-p", [dirs.lib_dir]);
        await CONSTANTS.SHELL.mkdir("-p", [dirs.sol2lin_c_dir]);
        await CONSTANTS.SHELL.mkdir("-p", [dirs.sol2lin_h_dir]);

        // get all AST files
        for (file of await readdirAsync(dirs.sol2lin_json_dir)) if (file.endsWith("ce10118.ast.json"))
            build_files.ast_json_files.push(`${dirs.sol2lin_json_dir}/${file}`);

        // generate the c code and h code for each telegram
        let promises = []; let allTelegramStructs = [];
        for (astJSON of build_files.ast_json_files) promises.push( genSol2LinuxC(astJSON, `${path.basename(astJSON,".ast.json")}.h`,
            dirs.sol2lin_h_dir, dirs.sol2lin_c_dir, allTelegramStructs) );

        await Promise.all(promises);

        // generate master include and C files for switching
        await Promise.all([genMasterIncludeFile(dirs.sol2lin_h_dir, allTelegramStructs),  genMasterCFile(dirs.sol2lin_c_dir, allTelegramStructs)]);

        // now parallel compile C code, these files have no dependencies on each other
        //await c_cpp_compile(build_files.c_files, cmds.cc, dirs.c_inc_dirs, dirs.o_dirs.obj);

        // now link all the objects into the .a file
        //await genLibrary();

		CONSTANTS.LOGSUCCESS();
	} catch (err) { 
		CONSTANTS.HANDLE_BUILD_ERROR(err); 
	}
}

async function genLibrary() {
    //  use a temp file and xargs as the list is too long
    let tmpFile = await utils.createTempfile("ar_list",build_files.o_files.join(" "),"utf8");
    CONSTANTS.LOGINFO(`[TGC] Launching ar using temp file: ${tmpFile}`);
    await os_cmd([`cat '${tmpFile}' | xargs`, cmds.ar, build_files.out_file].join(" "));
    await unlinkAsync(tmpFile); // delete our garbage
}

async function genSol2LinuxC(astFile, header, hFileDir, cFileDir, allTelegramStructs) {
    CONSTANTS.LOGINFO(`[TGC] Processing telegram header: ${astFile}`);
    let astObj;
    try {astObj = JSON.parse(await readfileAsync(astFile, {encoding : "utf8"}))} catch (e) {
        CONSTANTS.LOGERROR(`Bad AST JSON file: ${astFile}`);
        throw e;
    }

    const headers = []; headers.push(...astObj.headers);

    for (ast of astObj.structs) {
        if (structsProcessing.includes(ast.struct) && !doubleProcessStructs) continue;   // no need to double process
        else structsProcessing.push(ast.struct);

        CONSTANTS.LOGINFO(`[TGC] Processing telegram: ${ast.struct}`);
        let convObject = {headers, date: new Date().toString(), struct: ast.struct}; allTelegramStructs.push(ast.struct); 
        delete ast.struct;

        let variables = []; for (key of Object.keys(ast)) variables.push(getVariableOpObject(key, ast[key]));
        convObject.variables = variables;

        Hairyone.parse(endian_only_c); Hairyone.parse(endian_only_h); 
        const hCode = Hairyone.render(endian_only_h, convObject); const cCode = Hairyone.render(endian_only_c, convObject);
        const hFile = `${hFileDir}/${convObject.struct}.h`; const cFile = `${cFileDir}/${convObject.struct}.c`; const oFile = `${dirs.o_dirs.obj}/${convObject.struct}.o`; 
        await Promise.all([writefileAsync(hFile, hCode), writefileAsync(cFile, cCode)]);
        build_files.c_files.push(cFile); build_files.o_files.push(oFile);
    }
}

async function genMasterIncludeFile(hDir, allStructs) {
    CONSTANTS.LOGINFO(`[TGC] Generating master include file: ${hDir}/sol2linux.h`);
    Hairyone.parse(master_code_h); const hCode = Hairyone.render(master_code_h, {date: new Date().toString(), allStructs});
    await writefileAsync(`${hDir}/sol2linux.h`, hCode);
}

async function genMasterCFile(cDir, allStructs) {
    CONSTANTS.LOGINFO(`[TGC] Generating master c file: ${cDir}/sol2linux.c`);
    let convObj = {date: new Date().toString(), allStructs: []};
    for (struct of allStructs) {
        const match = /CE(\d+)Body/.exec(struct);
        if (match && match[1]) convObj.allStructs.push({telegramID: match[1], struct});
        else CONSTANTS.LOGWARN(`[TGC] Skipping structure from master routing table, missing telegram ID: ${struct}`);
    }

    Hairyone.parse(master_code_c); const cCode = Hairyone.render(master_code_c, convObj); const cFile = `${cDir}/sol2linux.c`; const oFile = `${dirs.o_dirs.obj}/sol2linux.o`;
    await writefileAsync(cFile, cCode);
    build_files.c_files.push(cFile); build_files.o_files.push(oFile);
}

async function getHeadersFor(header) {  // find corresponding C file and add its headers too
    let headers = [header];
    try {
        const cFile = await readfileAsync(`${dirs.c_dir}/${path.basename(header,".h")}.c`, "utf8");
        const additionalHeadersRE = /^\s*#include\s+"(.+?)"\s*$/gm; 
        while (match = additionalHeadersRE.exec(cFile)) headers.push(match[1]);
        return headers;
    } catch (e) {return headers;}    // can't read the C file
}

function getVariableOpObject(variable, varInfoObject) {
	// variable : variable_name
	// varInfoObject :
	//   { type : 'int' }
	//   { type : 'double' }
	//   { type : 'MyStruct', isStruct : true }
	console.log( `DEBUG: ${variable}` );
	console.log( varInfoObject );
    let retObject = {name: variable};
    const rule = rulebook.getTypeRule(varInfoObject.type, varInfoObject.isStruct);
	console.log( rule );
	// rule :
	//   { match: '\\s*double\\s*', op: 'ntohl', rev_op: 'htonl' }
	//   {
	//     match: 'CE10168Body',
	//     complex_op: 'sol2linux_convertCE10168BodyEndianOnly',
	//     complex_rev_op: 'linux2sol_convertCE10168BodyEndianOnly'
	//   }
    if (rule) {
        if (rule.op) retObject.op_prefix = `${rule.op}(`; retObject.op_suffix = ")";
        if (rule.complex_op) {retObject.complex_op_prefix = `${rule.complex_op}(`; retObject.complex_op_suffix = ")";}

        if (rule.rev_op) {retObject.rev_op_prefix = `${rule.rev_op}(`; retObject.rev_op_suffix = ")";}
        if (rule.complex_rev_op) {retObject.complex_rev_op_prefix = `${rule.complex_rev_op}(`; retObject.complex_rev_op_suffix = ")";}
        
        retObject.isArray = varInfoObject.isArray;
        retObject.array_length = varInfoObject.length;
        retObject.isPointer = varInfoObject.isPointer;
    }

	console.log( retObject );
    // {
    //   name: 'body',
    //   op_suffix: ')',
    //   complex_op_prefix: 'sol2linux_convertCE10168BodyEndianOnly(',
    //   complex_op_suffix: ')',
    //   complex_rev_op_prefix: 'linux2sol_convertCE10168BodyEndianOnly(',
    //   complex_rev_op_suffix: ')',
    //   isArray: undefined,
    //   array_length: undefined,
    //   isPointer: undefined
    // }
    // {
    //   name: 'ac_powers',
    //   op_prefix: 'ntohl(',
    //   op_suffix: ')',
    //   rev_op_prefix: 'htonl(',
    //   rev_op_suffix: ')',
    //   isArray: undefined,
    //   array_length: undefined,
    //   isPointer: undefined
    // }
    return retObject;
}
