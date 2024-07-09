import { isNumber } from './number'
import { isDate, isFunction, isSymbol } from './object'

/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
export function isNotEmpty(value: unknown): boolean {
  return value !== '' && value !== null && value !== undefined
}

/**
 * Checks if value is defined (!== undefined, !== null).
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

/**
 * Checks if the given value is primitive.
 *
 * Primitive Types: number , string , boolean , symbol, bigint, undefined, null
 *
 * @param {*} value value to check
 * @returns {boolean} result
 */
export function isPrimitive(value: any): boolean {
  return (
    value === undefined
    || value === null
    || (typeof value !== 'object' && typeof value !== 'function')
  )
}

export function isEmpty(value: any) {
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
 * @param {*} value 第一个值
 * @param {*} comparison 第二个值
 * @return {boolean} 如果两个值相等则返回 true, 否则返回 false
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
 */
export function notEquals<TType>(value: TType, comparison: TType): boolean {
  return !isEqual(value, comparison)
}

export function isNil(value: unknown) {
  return value == null
}
