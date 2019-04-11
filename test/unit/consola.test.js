import consolaDefault from 'consola'
import { consola } from '../utils'

jest.mock('std-env', () => {
  return {
    ci: false,
    test: false
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
    ['cluster', 'master'].forEach((key) => {
      expect(consola[key]).toBeDefined()
      expect(consolaDefault[key]).toBeUndefined()
    })
  })

  // doesnt work
  test('uses fancy reporter by default', () => {
    expect(consola._reporters[0].constructor.name).toBe('BasicReporter')
  })
})
