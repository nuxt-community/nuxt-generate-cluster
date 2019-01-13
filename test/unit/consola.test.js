import consolaDefault from 'consola'
import env from 'std-env'
import { consola } from '../utils'

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
      // the Class exports and _internal props
      if (!key.match(/^[A-Z_]/)) {
        expect(consola[key]).not.toBeUndefined()
      }
    })
  })

  test('custom props should exists', () => {
    ['_defaultLevel', '_maxLevel', 'cluster', 'master', 'cluster'].forEach((key) => {
      expect(consola[key]).not.toBeUndefined()
      expect(consolaDefault[key]).toBeUndefined()
    })
  })

  // doesnt work
  test('uses fancy reporter by default', () => {
    expect(Object.keys(env).length).toBe(1)
    expect(consola._reporters[0].constructor.name).toBe('Reporter')
  })
})
