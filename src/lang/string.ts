/**
 * 检查值是否为字符串
 *
 * @title isString
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isString } from 'arcdash'
 *
 * isString('hello') // true
 * isString('') // true
 * isString(1) // false
 * isString(true) // false
 */
export function isString(value: any): value is string {
  return typeof value === 'string' || value instanceof String
}
