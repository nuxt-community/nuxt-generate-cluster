import path from 'path'
import { execFile } from 'promisify-child-process'
import 'jest-extended'

describe('cli', () => {
  test('bin/nuxt-generate no error', async () => {
    const result = await runGenerate('no-error')

    expect(result.stdout).toContain('generated: /my_page/index.html')
    expect(result.stdout).toContain('worker 1 started')
    expect(result.stdout).toContain('worker 2 started')
    expect(result.stdout).toContain('worker 1 exited')
    expect(result.stdout).toContain('worker 2 exited')
    expect(result.stdout).toContain('HTML Files generated in')
  })

  test('bin/nuxt-generate with unhandled rendering error', async () => {
    await expect(runGenerate('unhandled-error')).rejects.toSatisfy((result) => {
      expect(result.code).toEqual(1)
      expect(result.stderr).toContain('There were 1 unhandled page rendering errors.')
      return true
    })
  })

  test('bin/nuxt-generate with killed worker', async () => {
    await expect(runGenerate('kill-error')).rejects.toSatisfy((result) => {
      expect(result.code).toEqual(1)
      expect(result.stderr).toContain('1 workers failed')
      return true
    })
  })

  test('bin/nuxt-generate with a complex site', async () => {
    await expect(runGenerate('basic')).rejects.toSatisfy((result) => {
      expect(result.code).toEqual(1)
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
      return true
    })
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
  const env = Object.assign(process.env, {
    'NODE_ENV': 'production'
  })
  const binGenerate = path.resolve(__dirname, '..', '..', 'bin', 'nuxt-generate')
  return execFile(binGenerate, args, { env })
}
