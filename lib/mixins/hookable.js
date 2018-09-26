import { consola, sequence } from '../utils'

export default (Base) => {
  if (!Base) {
    Base = class {}
  }

  return class extends Base {
    initHooks() {
      if (!this._hooks) {
        this._hooks = {}
      }
    }

    hook(name, fn) {
      /* istanbul ignore if */
      if (!name || typeof fn !== 'function') {
        return
      }
      this.initHooks()

      this._hooks[name] = this._hooks[name] || []
      this._hooks[name].push(fn)
    }

    async callHook(name, ...args) {
      if (!this.hasHooks(name)) {
        return
      }
      // debug(`Call ${name} hooks (${this._hooks[name].length})`)
      const ret = []
      try {
        ret.push(await sequence(this._hooks[name], fn => fn(...args)))
      } catch (err) {
        consola.error(`> Error on hook "${name}":`)
        consola.error(err.message)
      }
      return ret.length === 1 ? ret[0] : ret
    }

    hasHooks(name) {
      return this._hooks && !!this._hooks[name]
    }
  }
}
