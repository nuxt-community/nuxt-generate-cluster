import test from 'ava'
import { resolve, sep } from 'path'
import pify from 'pify'
import { exec } from 'child_process'

const execify = pify(exec, { multiArgs: true })
const rootDir = resolve(__dirname, 'fixtures/basic')

test('bin/nuxt-generate', async t => {
  const binGenerate = resolve(__dirname, '..', 'bin', 'nuxt-generate')

  const [ stdout, stderr ] = await execify(`node ${binGenerate} -b ${rootDir} -w 2`)

  t.true(stdout.includes('server-bundle.json'))
  t.true(stderr.includes('Call ready hooks'))
  t.true(stderr.includes('Worker 1 started'))
  t.true(stderr.includes('Worker 2 started'))
  t.true(stderr.includes('generated file'))
  t.true(stderr.includes(`${sep}users${sep}1${sep}index.html`))
  t.true(stderr.includes('Worker 1 exited'))
  t.true(stderr.includes('Worker 2 exited'))
  t.true(stdout.includes('HTML Files generated in'))
  t.true(stderr.includes('==== Error report ===='))
})
