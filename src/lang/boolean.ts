/**
 * 检查值是否为布尔值
 *
 * @title isBoolean
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isBoolean } from 'arcdash'
 *
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean('true') // false
 * isBoolean(1) // false
 */
export function isBoolean(value: unknown) {
  return typeof value === 'boolean'
}
