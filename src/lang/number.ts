/**
 * 检查值是否为数字
 */
export function isNumber(value: unknown): value is number {
  try {
    return Number(value) === value
  }
  catch {
    return false
  }
}

/**
 * 检查值是否为整数
 */
export function isInt(value: any): value is number {
  return isNumber(value) && value % 1 === 0
}

/**
 * 检查值是否为浮点数
 */
export function isFloat(value: any): value is number {
  return isNumber(value) && value % 1 !== 0
}

/**
 * 检查值是否为小于零的负数
 */
export function isNegative(value: unknown): boolean {
  return isNumber(value) && value < 0
}

/**
 * 检查值是否为大于零的正数
 */
export function isPositive(value: unknown): boolean {
  return isNumber(value) && value > 0
}

/**
 * 检查第一个数字是否小于或等于第二个数字
 */
export function max(num: unknown, max: number): boolean {
  return isNumber(num) && isNumber(max) && num <= max
}

/**
 * 检查第一个数字是否大于或等于第二个数字
 */
export function min(num: unknown, min: number): boolean {
  return isNumber(num) && isNumber(min) && num >= min
}
