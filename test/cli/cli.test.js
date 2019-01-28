import path from 'path'
import spawn from 'cross-spawn'

describe('cli', () => {
  test('bin/nuxt-generate no error', () => {
    const result = runGenerate('no-error')

    expect(result.exitCode).toEqual(0)
    expect(result.stdout).toContain('generated: /my_page/index.html')
    expect(result.stdout).toContain('worker 1 started')
    expect(result.stdout).toContain('worker 2 started')
    expect(result.stdout).toContain('worker 1 exited')
    expect(result.stdout).toContain('worker 2 exited')
    expect(result.stdout).toContain('HTML Files generated in')
  })

  test('bin/nuxt-generate with unhandled rendering error', () => {
    const result = runGenerate('unhandled-error')

    expect(result.exitCode).toEqual(1)
    expect(result.stderr).toContain('There were 1 unhandled page rendering errors.')
  })

  test('bin/nuxt-generate with killed worker', () => {
    const result = runGenerate('kill-error')

    expect(result.exitCode).toEqual(1)
    expect(result.stderr).toContain('1 workers failed')
  })

  test('bin/nuxt-generate with a complex site', () => {
    const result = runGenerate('basic')

    expect(result.exitCode).toEqual(1)
    expect(result.stdout).toContain('Nuxt files generated')
    expect(result.stdout).toContain('worker 1 started')
    expect(result.stdout).toContain('worker 2 started')
    expect(result.stdout).not.toContain('worker 3 started')
    expect(result.stdout).toContain('generated: ')
    expect(result.stdout).toContain(`${path.sep}users${path.sep}1${path.sep}index.html`)
    expect(result.stdout).toContain('worker 1 exited')
    expect(result.stdout).toContain('worker 2 exited')
    expect(result.stdout).toContain('HTML Files generated in')
    expect(result.stderr).toContain('==== Error report ====')
    expect(result.stderr).toContain('There were 3 unhandled page rendering errors.')
  })
})

/**
 * @param {String} fixtureName
 * @returns {{stdout: string, stderr: string, exitCode: number}}
 */
function runGenerate(fixtureName) {
  const rootDir = path.resolve(__dirname, '..', 'fixtures', fixtureName)
  // Nuxt sets log level to 0 for CI and env=TEST
  // -v offsets from default log level, not current level
  // hence one -v is enough
  const args = [
    rootDir,
    '--build',
    '--workers=2',
    `--config-file=nuxt.config.js`,
    '-v'
  ]
  const env = Object.assign(process.env, {
    'NODE_ENV': 'production'
  })
  const binGenerate = path.resolve(__dirname, '..', '..', 'bin', 'nuxt-generate')
  const result = spawn.sync(binGenerate, args, { env })
  return {
    stdout: result.stdout.toString(),
    stderr: result.stderr.toString(),
    exitCode: result.status
  }
}
