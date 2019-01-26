import path from 'path'
import { execFile } from 'promisify-child-process'

describe('cli', () => {
  test('bin/nuxt-generate', async () => {
    const result = await runGenerate('basic')

    expect(result.stderr).toContain('==== Error report ====')
    expect(result.stdout).toContain('Nuxt files generated')
    expect(result.stdout).toContain('worker 1 started')
    expect(result.stdout).toContain('worker 2 started')
    expect(result.stdout).not.toContain('worker 3 started')
    expect(result.stdout).toContain('generated: ')
    expect(result.stdout).toContain(`${path.sep}users${path.sep}1${path.sep}index.html`)
    expect(result.stdout).toContain('worker 1 exited')
    expect(result.stdout).toContain('worker 2 exited')
    expect(result.stdout).toContain('HTML Files generated in')
  })

  test('bin/nuxt-generate no error', async () => {
    const result = await runGenerate('no-error')

    expect(result.stdout).toContain('generated: /my_page/index.html')
    expect(result.stdout).toContain('worker 1 started')
    expect(result.stdout).toContain('worker 2 started')
    expect(result.stdout).toContain('worker 1 exited')
    expect(result.stdout).toContain('worker 2 exited')
    expect(result.stdout).toContain('HTML Files generated in')
  })

})

/**
 * @param {String} fixtureName
 * @returns {Promise<{stdout: string, stderr: string}>}
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
  const env = {
    NODE_ENV: 'production'
  }
  const binGenerate = path.resolve(__dirname, '..', '..', 'bin', 'nuxt-generate')
  return execFile(binGenerate, args, { env })
}
