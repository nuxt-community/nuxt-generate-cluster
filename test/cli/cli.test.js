import path from 'path'
import spawn from 'cross-spawn'
import fs from 'fs'

const rootDir = path.resolve(__dirname, '..', 'fixtures', 'basic')

describe('cli', () => {
  test('bin/nuxt-generate', async () => {
    const { stdout, stderr, error } = await new Promise((resolve) => {
      let stdout = ''
      let stderr = ''
      let error

      // Nuxt sets log level to 0 for CI and env=TEST
      // -v offsets from default log level, not current level
      // hence one -v is enough
      const binGenerate = path.resolve(__dirname, '..', '..', 'bin', 'nuxt-generate')
      const binNyc = path.resolve(__dirname, '..', '..', 'node_modules', '.bin', 'nyc')
      console.log(binNyc, fs.existsSync(binNyc))
      console.log(binGenerate, fs.existsSync(binGenerate))
      const nuxtGenerate = spawn(binNyc, [
        '--reporter', 'none',
        'node',
        binGenerate, '-b', rootDir, '-w', '2', '-v'
      ], {
        env: {
          NODE_ENV: 'test'
        }
      })

      nuxtGenerate.stdout.on('data', (data) => { stdout += data.toString() })
      nuxtGenerate.stderr.on('data', (data) => { stderr += data.toString() })
      nuxtGenerate.on('error', (err) => { error = err })
      nuxtGenerate.on('close', () => {
        resolve({ stdout, stderr, error })
      })
    })
    
    console.log('stderr', stderr)
    console.log('stdout', stdout)
    expect(error).toBeUndefined()
    expect(stderr).toContain('==== Error report ====')
    expect(stdout).toContain('Nuxt files generated')
    expect(stdout).toContain('worker 1 started')
    expect(stdout).toContain('worker 2 started')
    expect(stdout).not.toContain('worker 3 started')
    expect(stdout).toContain('generated: ')
    expect(stdout).toContain(`${path.sep}users${path.sep}1${path.sep}index.html`)
    expect(stdout).toContain('worker 1 exited')
    expect(stdout).toContain('worker 2 exited')
    expect(stdout).toContain('HTML Files generated in')
  })
})
