import path from 'path'
import { runCliGenerate } from '../utils'

describe('cli', () => {
  test('bin/nuxt-generate', () => {
    const result = runCliGenerate('basic')

    expect(result.exitCode).toEqual(0)
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
  })

  test('bin/nuxt-generate: no error', () => {
    const result = runCliGenerate('error-testing', ['--params=error=no-error'])

    expect(result.exitCode).toEqual(0)
    expect(result.stdout).toContain('generated: /error/no-error/index.html')
    expect(result.stdout).toContain('worker 1 started')
    expect(result.stdout).toContain('worker 2 started')
    expect(result.stdout).toContain('worker 1 exited')
    expect(result.stdout).toContain('worker 2 exited')
    expect(result.stdout).toContain('HTML Files generated in')
  })

  test('bin/nuxt-generate: unhandled error', () => {
    const result = runCliGenerate('error-testing', ['--params=error=unhandled-error'])

    expect(result.exitCode).toEqual(0)
  })

  test('bin/nuxt-generate: unhandled error with --exit-on-unhandled', () => {
    const result = runCliGenerate('error-testing', ['--params=error=unhandled-error', '--fail-on-error'])

    expect(result.exitCode).toEqual(1)
    expect(result.stderr).toContain('There were 1 unhandled page rendering errors.')
  })

  test('bin/nuxt-generate: killed worker', () => {
    const result = runCliGenerate('error-testing', ['--params=error=kill-process'])

    expect(result.exitCode).toEqual(1)
    expect(result.stderr).toContain('1 workers failed')
  })
})
