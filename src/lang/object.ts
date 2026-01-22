/**
 * 检查值是否为普通对象
 *
 * @title isObject
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isObject } from 'arcdash'
 *
 * isObject({}) // true
 * isObject({ a: 1 }) // true
 * isObject([]) // false
 * isObject(null) // false
 */
export function isObject(value: any): value is object {
  return !!value && value.constructor === Object
}

/**
 * 检查值是否为 Symbol 类型
 *
 * @title isSymbol
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isSymbol } from 'arcdash'
 *
 * isSymbol(Symbol('a')) // true
 * isSymbol(Symbol.iterator) // true
 * isSymbol(1) // false
 */
export function isSymbol(value: any): value is symbol {
  return !!value && value.constructor === Symbol
}

type AnyFunction = (...args: any[]) => any

/**
 * 检查值是否为函数
 *
 * @title isFunction
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isFunction } from 'arcdash'
 *
 * isFunction(() => {}) // true
 * isFunction(function() {}) // true
 * isFunction(1) // false
 */
export function isFunction(value: any): value is AnyFunction {
  return !!(value && value.constructor && value.call && value.apply)
}

/**
 * 检查值是否为 Date 类型
 *
 * @title isDate
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isDate } from 'arcdash'
 *
 * isDate(new Date()) // true
 * isDate('2024-01-01') // false
 * isDate(Date.now()) // false
 */
export function isDate(value: any): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]'
}

/**
 * 检查值是否为 Promise
 *
 * @title isPromise
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isPromise } from 'arcdash'
 *
 * isPromise(Promise.resolve()) // true
 * isPromise(new Promise(() => {})) // true
 * isPromise({ then: 1 }) // false
 * isPromise(1) // false
 */
export function isPromise(value: any): value is Promise<any> {
  if (!value)
    return false
  if (!value.then)
    return false
  return isFunction(value.then)
}
