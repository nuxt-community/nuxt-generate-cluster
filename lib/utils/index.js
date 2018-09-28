import consola from './consola'
import MessageBroker from './message-broker'
import messaging from './messaging'

export {
  consola,
  messaging,
  MessageBroker
}

// Copied from Nuxt.Utils
export const sequence = function sequence(tasks, fn) {
  return tasks.reduce(
    (promise, task) => promise.then(() => fn(task)),
    Promise.resolve()
  )
}
