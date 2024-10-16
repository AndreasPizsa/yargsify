import process from 'node:process'
import esMain from 'es-main'
import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

const yargsMain = ({command, ...remainder}, importMeta) => {
  if (!esMain(importMeta)) {
    return
  }

  const argv = yargs(hideBin(process.argv))
    .option('debug', {
      type    : 'boolean',
      default : false,
      describe: 'Enable debug mode',
      global  : true,
      coerce(value) {
        if (!value) {
          console.debug = () => {}
        }

        return value
      },
    })
    .option('quiet', {
      alias   : 'q',
      type    : 'boolean',
      default : false,
      describe: 'Suppress non-critical output',
      global  : true,
      coerce(value) {
        if (value) {
          console.log = () => {}
        }

        return value
      },
    })
    .option('verbose', {
      alias   : 'v',
      type    : 'boolean',
      default : false,
      describe: 'Enable verbose output',
      global  : true,
      coerce(value) {
        if (!value) {
          console.info = () => {}
        }

        return value
      },
    })
    .command({
      command: command.replace(/^\S+/, '$0'),
      ...remainder,
    })
    .help()
    .argv

  return argv
}

export default yargsMain
