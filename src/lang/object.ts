export function isObject(value: any): value is object {
  return !!value && value.constructor === Object
}

export function isSymbol(value: any): value is symbol {
  return !!value && value.constructor === Symbol
}

type AnyFunction = (...args: any[]) => any

export function isFunction(value: any): value is AnyFunction {
  return !!(value && value.constructor && value.call && value.apply)
}

export function isDate(value: any): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]'
}

/**
 * This is really a _best guess_ promise checking. You
 * should probably use Promise.resolve(value) to be 100%
 * sure you're handling it correctly.
 */
export function isPromise(value: any): value is Promise<any> {
  if (!value)
    return false
  if (!value.then)
    return false
  return isFunction(value.then)
}
