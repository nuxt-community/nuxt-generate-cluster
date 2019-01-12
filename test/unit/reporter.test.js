import consola from 'consola'
import messaging from '../../lib/utils/messaging'
import { Reporters } from '../utils'

let reporter

jest.mock('consola')
jest.mock('../../lib/utils/messaging')

describe('basic reporter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    reporter = new Reporters.BasicReporter()
  })

  // this test is not really a test
  test('nuxt success generated msg is ignored', () => {
    reporter.superLog({
      type: 'success',
      args: ['Generated TEST']
    })

    expect(consola.success).not.toHaveBeenCalled()
  })

  test('log is received by messaging', () => {
    reporter.log({
      type: 'debug',
      args: ['Something']
    })

    expect(messaging.send).toHaveBeenCalledTimes(1)
  })
})

describe('fancy reporter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    reporter = new Reporters.FancyReporter()
  })

  // this test is not really a test
  test('nuxt success generated msg is ignored', () => {
    reporter.superLog({
      type: 'success',
      args: ['Generated TEST']
    })

    expect(consola.success).not.toHaveBeenCalled()
  })

  test('log is received by messaging', () => {
    reporter.log({
      type: 'debug',
      args: ['Something']
    })

    expect(messaging.send).toHaveBeenCalledTimes(1)
  })
})
