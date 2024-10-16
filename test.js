import {fileURLToPath} from 'node:url'
import path from 'node:path'
import {exec} from 'node:child_process'
import {promisify} from 'node:util'
import test from 'ava'
import './testing-command.js' // eslint-disable-line import/no-unassigned-import

const execAsync = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const yargsifyPath = `${__dirname}/testing-command.js`

// Helper function to run the script
async function runYargsify(arguments_ = '') {
  try {
    const {stdout, stderr} = await execAsync(`node ${yargsifyPath} ${arguments_}`)
    return {stdout, stderr}
  } catch (error) {
    return {stdout: error.stdout, stderr: error.stderr}
  }
}

test('should run with no arguments', async t => {
  const {stderr} = await runYargsify()
  t.true(stderr.includes('Options'))
})

test('should display debug information with --debug', async t => {
  const {stdout, stderr} = await runYargsify('--debug John')
  t.true(stdout.includes('Debug mode enabled'))
  t.is(stderr.trim(), '')
})

test('should suppress output with --quiet', async t => {
  const {stdout, stderr} = await runYargsify('--quiet John')
  t.is(stdout.trim(), '')
  t.is(stderr.trim(), '')
})

test('should enable verbose output with --verbose', async t => {
  const {stdout, stderr} = await runYargsify('--verbose John')
  t.true(stdout.includes('Verbose mode enabled'))
  t.is(stderr.trim(), '')
})

test('should run command with argument', async t => {
  const {stdout, stderr} = await runYargsify('John')
  t.true(stdout.includes('Hello, John!'))
  t.is(stderr.trim(), '')
})
