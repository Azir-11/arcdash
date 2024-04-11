export function isEmptyValue<T = string | number>(value: T): boolean {
  // 对于null和undefined，直接使用严格相等性检查
  if (value === null || value === undefined) return true

  // 对于数字，检查是否为0
  if (typeof value === 'number' && value === 0) return true

  // 对于字符串，检查是否为'0'或空字符串
  if (typeof value === 'string' && (value === '0' || value === '')) return true

  // 如果都不是，则认为值不为空 判断
  return false
}
