import path from 'path'
import { runCliGenerate } from '../utils'

describe('cli', () => {
  test('bin/nuxt-generate no error', () => {
    const result = runCliGenerate('no-error')

    expect(result.exitCode).toEqual(0)
    expect(result.stdout).toContain('generated: /my_page/index.html')
    expect(result.stdout).toContain('worker 1 started')
    expect(result.stdout).toContain('worker 2 started')
    expect(result.stdout).toContain('worker 1 exited')
    expect(result.stdout).toContain('worker 2 exited')
    expect(result.stdout).toContain('HTML Files generated in')
  })

  test('bin/nuxt-generate with unhandled rendering error', () => {
    const result = runCliGenerate('unhandled-error')

    expect(result.exitCode).toEqual(1)
    expect(result.stderr).toContain('There were 1 unhandled page rendering errors.')
  })

  test('bin/nuxt-generate with killed worker', () => {
    const result = runCliGenerate('kill-error')

    expect(result.exitCode).toEqual(1)
    expect(result.stderr).toContain('1 workers failed')
  })

  test('bin/nuxt-generate with a complex site', () => {
    const result = runCliGenerate('basic')

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
