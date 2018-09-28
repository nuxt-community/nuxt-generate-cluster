import consolaDefault from 'consola'
import env from 'std-env'
import { consola } from '../utils'

jest.unmock('../../lib/utils/consola')
jest.unmock('consola')
jest.mock('std-env', () => {
  return {
    minimalCLI: false
  }
})

describe('consola', () => {
  test('extends default', () => {
    Object.keys(consolaDefault).forEach((key) => {
      // our consola should have all properties
      // of default consola except
      // the Class exports
      if (!key.match(/^[A-Z]/)) {
        expect(consola[key]).not.toBeUndefined()
      }
    })
  })

  test('custom props should exists', () => {
    ['defaultLevel', 'maxLevel', 'cluster', 'master', 'worker'].forEach((key) => {
      expect(consola[key]).not.toBeUndefined()
      expect(consolaDefault[key]).toBeUndefined()
    })
  })

  // doesnt work
  test('uses fancy reporter by default', () => {
    jest.resetModules()
    const consola = require('consola')

    expect(Object.keys(env).length).toBe(1)
    expect(consola.reporters[0].constructor.name).toBe('Reporter')
  })
})
