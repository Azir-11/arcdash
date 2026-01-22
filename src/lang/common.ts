import { isNumber } from './number'
import { isDate, isFunction, isSymbol } from './object'

/**
 * 检查给定的值是否不为空 (!== '', !== null, !== undefined).
 *
 * @title isNotEmpty
 *
 * @param {*} value 用于检查的值
 * @return {boolean} 如果值不为空则返回 true, 否则返回 false
 *
 * @example
 * import { isNotEmpty } from 'arcdash'
 *
 * isNotEmpty('hello') // true
 * isNotEmpty('') // false
 * isNotEmpty(null) // false
 * isNotEmpty(undefined) // false
 * isNotEmpty(0) // true
 */
export function isNotEmpty(value: unknown): boolean {
  return value !== '' && value !== null && value !== undefined
}

/**
 * 检查给定值是否定义 (!== undefined, !== null).
 *
 * @title isDefined
 *
 * @param {*} value 用于检查的值
 * @return {boolean} 如果值已定义则返回 true, 否则返回 false
 *
 * @example
 * import { isDefined } from 'arcdash'
 *
 * isDefined(0) // true
 * isDefined('') // true
 * isDefined(null) // false
 * isDefined(undefined) // false
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

/**
 * 检查给定的值是否为原始类型.
 *
 * 原始类型: number , string , boolean , symbol, bigint, undefined, null
 *
 * @title isPrimitive
 *
 * @param {*} value 用于检查的值
 * @return {boolean} 如果值是原始类型则返回 true, 否则返回 false
 *
 * @example
 * import { isPrimitive } from 'arcdash'
 *
 * isPrimitive(1) // true
 * isPrimitive('hello') // true
 * isPrimitive(true) // true
 * isPrimitive({}) // false
 * isPrimitive([]) // false
 */
export function isPrimitive(value: any): boolean {
  return (
    value === undefined
    || value === null
    || (typeof value !== 'object' && typeof value !== 'function')
  )
}

/**
 * 检查给定的值是否为空.
 *
 * @title isEmpty
 *
 * @param {*} value 用于检查的值
 * @return {boolean} 如果值为空则返回 true, 否则返回 false
 *
 * @example
 * import { isEmpty } from 'arcdash'
 *
 * isEmpty('') // true
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty(0) // true
 * isEmpty('hello') // false
 * isEmpty({}) // true
 * isEmpty([]) // true
 */
export function isEmpty(value: unknown): boolean {
  if (value === true || value === false)
    return true
  if (value === null || value === undefined)
    return true
  if (isNumber(value))
    return value === 0
  if (isDate(value))
    return Number.isNaN(value.getTime())
  if (isFunction(value))
    return false
  if (isSymbol(value))
    return false
  const length = (value as any).length
  if (isNumber(length))
    return length === 0
  const size = (value as any).size
  if (isNumber(size))
    return size === 0
  const keys = Object.keys(value).length
  return keys === 0
}

/**
 * 检查传入的两个值是否相等.
 *
 * @title isEqual
 *
 * @param {*} value 第一个值
 * @param {*} comparison 第二个值
 * @return {boolean} 如果两个值相等则返回 true, 否则返回 false
 *
 * @example
 * import { isEqual } from 'arcdash'
 *
 * isEqual(1, 1) // true
 * isEqual('hello', 'hello') // true
 * isEqual({ a: 1 }, { a: 1 }) // true
 * isEqual([1, 2], [1, 2]) // true
 * isEqual(1, 2) // false
 */
export function isEqual<TType>(value: TType, comparison: TType): boolean {
  if (Object.is(value, comparison))
    return true
  if (value instanceof Date && comparison instanceof Date)
    return value.getTime() === comparison.getTime()

  if (value instanceof RegExp && comparison instanceof RegExp)
    return value.toString() === comparison.toString()

  if (
    typeof value !== 'object'
    || value === null
    || typeof comparison !== 'object'
    || comparison === null
  ) {
    return false
  }

  const keysX = Reflect.ownKeys(value as unknown as object) as (keyof typeof value)[]

  const keysY = Reflect.ownKeys(comparison as unknown as object)
  if (keysX.length !== keysY.length)
    return false
  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(comparison as unknown as object, keysX[i]))
      return false
    if (!isEqual(value[keysX[i]], comparison[keysX[i]]))
      return false
  }
  return true
}

/**
 * 判断两个值是否不相等
 *
 * @title notEquals
 *
 * @param value 用于检查的值
 * @param comparison 用于比较的值
 *
 * @example
 * import { notEquals } from 'arcdash'
 *
 * notEquals(1, 2) // true
 * notEquals('hello', 'world') // true
 * notEquals(1, 1) // false
 */
export function notEquals<T>(value: T, comparison: T): boolean {
  return !isEqual(value, comparison)
}

/**
 * 判断给定的值是否为 null 或 undefined
 *
 * @title isNil
 *
 * @param value 用于检查的值
 *
 * @example
 * import { isNil } from 'arcdash'
 *
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil(0) // false
 * isNil('') // false
 */
export function isNil(value: unknown): boolean {
  return value == null
}
