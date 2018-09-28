const isAppveyor = !!process.env.APPVEYOR
describe.skip.appveyor = isAppveyor ? describe.skip : describe
test.skip.appveyor = isAppveyor ? test.skip : test

const isWin = process.platform === 'win32'
describe.skip.win = isWin ? describe.skip : describe
test.skip.win = isWin ? test.skip : test

jest.setTimeout(60000)

jest.mock('consola', () => {
  const levels = [
    'fatal', 'error', 'warn', 'log', 'info',
    'start', 'success', 'ready', 'debug', 'trace',
    'cluster', 'master', 'worker'
  ]

  const consola = {}
  for (const level of levels) {
    consola[level] = jest.fn()
  }

  Object.assign(consola, {
    defaultLevel: 3,
    maxLevel: 6,
    Consola: jest.fn().mockImplementation(() => {
      const mock = {
        level: 5,
        maxLevel: 6,
        add: jest.fn()
      }
      for (const level of levels) {
        mock[level] = consola[level]
      }
      return mock
    }),
    BasicReporter: jest.fn(),
    FancyReporter: jest.fn(),

    reset: () => {
      for (const level of levels) {
        consola[level].mockReset()
      }
    }
  })

  return consola
})

jest.mock('../../lib/utils/consola', () => {
  const levels = [
    'fatal', 'error', 'warn', 'log', 'info',
    'start', 'success', 'ready', 'debug', 'trace',
    'cluster', 'master', 'worker'
  ]

  const consola = {}
  for (const level of levels) {
    consola[level] = jest.fn()
  }

  Object.assign(consola, {
    defaultLevel: 3,
    maxLevel: 6,
    Consola: jest.fn().mockImplementation(() => {
      const mock = {
        level: 5,
        maxLevel: 6,
        add: jest.fn()
      }
      for (const level of levels) {
        mock[level] = consola[level]
      }
      return mock
    }),
    BasicReporter: jest.fn(),
    FancyReporter: jest.fn(),

    reset: () => {
      for (const level of levels) {
        consola[level].mockReset()
      }
    }
  })

  return consola
})
