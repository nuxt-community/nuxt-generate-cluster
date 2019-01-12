import cluster from 'cluster'
import consola from 'consola'
import { MessageBroker } from '../utils'

const masterConf = { isMaster: true, alias: 'm' }
const childConf = { isMaster: false, alias: 'c' }

let mb
let cb

jest.mock('cluster')
jest.mock('consola')

describe('messaging', () => {
  beforeEach(() => {
    mb = new MessageBroker(masterConf)
    cb = new MessageBroker(childConf, mb)
  })

  afterEach(() => {
    mb.close()
    cb.close()
    jest.clearAllMocks()
  })

  test('child can register with master', () => {
    mb.registerProxy = jest.fn()
    cb = new MessageBroker(childConf, mb)

    expect(mb.registerProxy).toHaveBeenCalledTimes(1)
  })

  test('error on send to unknown', () => {
    mb.send('SOME ID', 'test')

    expect(consola.error).toHaveBeenCalledTimes(1)
    expect(consola.error.mock.calls[0][0]).toMatch(/Unable to send message/)
  })

  test('warns on unknown proxy', () => {
    cb.send('SOME ID', 'test')

    expect(consola.warn).toHaveBeenCalledTimes(1)
    expect(consola.warn.mock.calls[0][0]).toMatch(/Proxy SOME ID not registered/)
    expect(consola.error).not.toHaveBeenCalled()
  })

  test('can send to self', () => {
    mb.callService = jest.fn()

    mb.send(mb.id, 'test')
    expect(consola.error).not.toHaveBeenCalled()
    expect(mb.callService).toHaveBeenCalledTimes(1)

    mb.send(mb.alias, 'test')
    expect(consola.error).not.toHaveBeenCalled()
    expect(mb.callService).toHaveBeenCalledTimes(2)
  })

  test('can send from master to child', () => {
    cb.callService = jest.fn()

    mb.send(cb.id, 'test')

    expect(consola.error).not.toHaveBeenCalled()
    expect(cb.callService).toHaveBeenCalledTimes(1)
  })

  test('can send from child to master', () => {
    mb.callService = jest.fn()

    cb.send(mb.id, 'test')

    expect(consola.error).not.toHaveBeenCalled()
    expect(mb.callService).toHaveBeenCalledTimes(1)
  })

  test('can send from child to child', () => {
    const cb2 = new MessageBroker(childConf, mb)
    cb2.alias = 'c2'
    cb2.callService = jest.fn()

    cb.send(cb2.id, 'test')

    expect(consola.error).not.toHaveBeenCalled()
    expect(cb2.callService).toHaveBeenCalledTimes(1)
  })

  test('warns on unregistered service', () => {
    mb.send(cb.id, 'test')

    expect(consola.error).not.toHaveBeenCalled()
    expect(consola.warn).toHaveBeenCalledTimes(1)
    expect(consola.warn.mock.calls[0][0]).toMatch(/Service test not registered/)
  })

  test('warns on already registered service', () => {
    mb.on('test')
    expect(consola.warn).not.toHaveBeenCalled()

    mb.on('test')
    expect(consola.warn).toHaveBeenCalledTimes(1)
    expect(consola.warn.mock.calls[0][0]).toMatch(/Service test already registered/)
    expect(consola.error).not.toHaveBeenCalled()
  })

  test('receives data on service (m -> c)', () => {
    expect.assertions(3)

    const data = 'test data'
    cb.on('test', (message) => {
      expect(message).toBe(data)
    })
    mb.send(cb.id, 'test', data)

    expect(consola.warn).not.toHaveBeenCalled()
    expect(consola.error).not.toHaveBeenCalled()
  })

  test('receives data on service (c -> m)', () => {
    expect.assertions(3)

    const data = 'test data'
    mb.on('test', (message) => {
      expect(message).toBe(data)
    })
    cb.send(mb.id, 'test', data)

    expect(consola.warn).not.toHaveBeenCalled()
    expect(consola.error).not.toHaveBeenCalled()
  })

  test('receives data on service (c -> c)', () => {
    expect.assertions(3)
    const cb2 = new MessageBroker(childConf, mb)
    cb2.alias = 'c2'

    const data = 'test data'
    cb2.on('test', (message) => {
      expect(message).toBe(data)
    })
    cb.send(cb2.id, 'test', data)

    expect(consola.warn).not.toHaveBeenCalled()
    expect(consola.error).not.toHaveBeenCalled()
  })

  test('sends message through process for cluster worker', () => {
    cluster.isMaster = false

    process.send = jest.fn()

    cb.send(mb.id, 'test')

    expect(process.send).toHaveBeenCalledTimes(1)
    expect(consola.warn).not.toHaveBeenCalled()
    expect(consola.error).not.toHaveBeenCalled()
  })
})
