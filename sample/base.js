'use strict';

// if not NODE_ENV, then use 'development'
var env = process.env.NODE_ENV || 'development'

// check module is main
if (require.main === module) {
  main({ argv: process.argv })
}

//---------------------------------
// argument
//---------------------------------
// arg[0] is path of node command
// arg[1] is path of this program
// arg[2] is first argument of program

function main(options) {
  var argv = options.argv
  var name = argv[2]

  if (env === 'development') {
    console.log('Hello, world!')
  } else if (env === 'production') {
    console.log('Hello, ' + name + '!')
  } else {
    throw new Error('invalid env')
  }
}
