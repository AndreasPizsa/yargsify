# yargsify

> Test and run [yargs](https://yargs.js.org/) commands.

## Features
`yargsify` lets you define yargs commands and run them as either standalone commands
or as part of a larger cli program.

When running as standalone app, it also adds several options that are common for
many CLI tools and helps manage command execution.

- `--debug`: Enables debug mode. When disabled, `console.debug` will be
  set to a no-op to prevent debug logs from appearing.
- `--quiet` (`-q`): Suppresses non-critical output by setting
  `console.log` to a no-op.
- `--verbose` (`-v`): Enables verbose output. When disabled, `console.info`
  is set to a no-op to suppress additional information.

The function uses `esMain` to ensure that the commands are executed only
when the script is run directly, not when imported as a module.

- **Standalone or Larger CLI Integration**: By using `esMain`, this function
  allows commands to be executed either as standalone scripts or as part of
  a larger CLI application. When used in isolation, the script can run
  independently, but when imported into a larger CLI app, it can contribute
  its functionality without immediate execution, enabling modular
  development of CLI tools.
- **Modularity**: By only executing the command logic when run directly, the
  script can be imported into other projects or modules without triggering
  its main functionality. This makes the code more reusable and easier to
  integrate with other codebases.
- **Testing and Reusability**: If the script is imported into a test
  environment, the functionality does not automatically execute, which allows
  easier unit testing. It also makes it easier to reuse the functions and
  commands elsewhere without worrying about unintended side effects.
- **Clear Separation**: It creates a clear separation between the module’s
  executable logic and its reusable components. When imported, only the
  functions and utilities are available, without executing the primary
  script, promoting better coding practices and maintainability.

It processes command line arguments and sets up the given command along
with additional options using yargs.

## Example usage
```js
import yargsify from 'yargsify'

const yargsCommand = {
  command: 'greet <name>',
  describe: 'Greet a user by name',
  builder: (yargs) => yargs.positional('name', {
    type: 'string',
    describe: 'The name of the user to greet'
  }),
  handler: (argv) => {
    console.log(`Hello, ${argv.name}!`)
  }
}

yargsify(yargsCommand, import.meta)
```
