import consola from './consola'

export {
  consola
}

export const reassignConsola = (target, source) => {
  Object.keys((source || consola)).forEach((key) => {
    target[key] = (source || consola)[key]
  })
}

export const consolaSetScope = (scope) => {
  reassignConsola(consola, consola.withScope(scope))
}

// Copied from Nuxt.Utils
export const sequence = function sequence(tasks, fn) {
  return tasks.reduce(
    (promise, task) => promise.then(() => fn(task)),
    Promise.resolve()
  )
}
