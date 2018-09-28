import { resolve, sep } from 'path'
import { spawn } from 'cross-spawn'

const rootDir = resolve(__dirname, '..', 'fixtures', 'basic')

describe('cli', () => {
  test('bin/nuxt-generate', async () => {
    const binGenerate = resolve(__dirname, '..', '..', 'bin', 'nuxt-generate')
    const env = process.env

    const { stdout, stderr, error } = await new Promise((resolve) => {
      let stdout = ''
      let stderr = ''
      let error

      // Nuxt sets log level to 0 for CI and env=TEST
      // -v offsets from default log level, not current level
      // hence one -v is enough
      const nuxtGenerate = spawn('nyc', ['--reporter', 'none', 'node', binGenerate, '-b', rootDir, '-w', '2', '-v'], { env })

      nuxtGenerate.stdout.on('data', (data) => { stdout += data.toString() })
      nuxtGenerate.stderr.on('data', (data) => { stderr += data.toString() })
      nuxtGenerate.on('error', (err) => { error = err })
      nuxtGenerate.on('close', () => {
        resolve({ stdout, stderr, error })
      })
    })

    expect(stderr).toBe('')
    expect(error).toBe(undefined)
    expect(stdout).toContain('Nuxt files generated')
    expect(stdout).toContain('Compiled client')
    expect(stdout).toContain('Compiled server')
    expect(stdout).toContain('worker 1 started')
    expect(stdout).toContain('worker 2 started')
    expect(stdout).not.toContain('worker 3 started')
    expect(stdout).toContain('generated: ')
    expect(stdout).toContain(`${sep}users${sep}1${sep}index.html`)
    expect(stdout).toContain('worker 1 exited')
    expect(stdout).toContain('worker 2 exited')
    expect(stdout).toContain('HTML Files generated in')
    expect(stdout).toContain('==== Error report ====')
  })
})
