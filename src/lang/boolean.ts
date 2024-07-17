/**
 * 检查值是否为布尔值
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export function isBoolean(value: unknown) {
  return typeof value === 'boolean'
}
