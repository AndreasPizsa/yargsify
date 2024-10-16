import yargsify from './index.js'

// Define a yargs command for testing
const yargsCommand = {
  command : 'greet <name>',
  describe: 'Greet a user by name',
  builder(yargs) {
    return yargs
      .positional('name', {
        type    : 'string',
        describe: 'The name of the user to greet',
      })
  },
  handler(argv) {
    console.debug('Debug mode enabled')
    console.info('Verbose mode enabled')
    console.log(`Hello, ${argv.name}!`)
  },
}

// Use yargsify to run the command
yargsify(yargsCommand, import.meta)
