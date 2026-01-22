/**
 * 检查值是否为数字
 *
 * @title isNumber
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isNumber } from 'arcdash'
 *
 * isNumber(1) // true
 * isNumber('1') // true
 * isNumber('a') // false
 * isNumber(true) // false
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
 *
 * @title isInt
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isInt } from 'arcdash'
 *
 * isInt(1) // true
 * isInt(1.5) // false
 * isInt('1') // true
 * isInt('1.5') // false
 */
export function isInt(value: any): value is number {
  return isNumber(value) && value % 1 === 0
}

/**
 * 检查值是否为浮点数
 *
 * @title isFloat
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isFloat } from 'arcdash'
 *
 * isFloat(1.5) // true
 * isFloat(1) // false
 * isFloat('1.5') // true
 * isFloat('1') // false
 */
export function isFloat(value: any): value is number {
  return isNumber(value) && value % 1 !== 0
}

/**
 * 检查值是否为小于零的负数
 *
 * @title isNegative
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isNegative } from 'arcdash'
 *
 * isNegative(-1) // true
 * isNegative(1) // false
 * isNegative(0) // false
 */
export function isNegative(value: unknown): boolean {
  return isNumber(value) && value < 0
}

/**
 * 检查值是否为大于零的正数
 *
 * @title isPositive
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isPositive } from 'arcdash'
 *
 * isPositive(1) // true
 * isPositive(-1) // false
 * isPositive(0) // false
 */
export function isPositive(value: unknown): boolean {
  return isNumber(value) && value > 0
}

/**
 * 检查第一个数字是否小于或等于第二个数字
 *
 * @title max
 *
 * @param num 要检查的数字
 * @param max 最大值
 * @returns 如果 num <= max 则返回 `true`，否则为 `false`
 *
 * @example
 * import { max } from 'arcdash'
 *
 * max(5, 10) // true
 * max(10, 10) // true
 * max(15, 10) // false
 */
export function max(num: unknown, max: number): boolean {
  return isNumber(num) && isNumber(max) && num <= max
}

/**
 * 检查第一个数字是否大于或等于第二个数字
 *
 * @title min
 *
 * @param num 要检查的数字
 * @param min 最小值
 * @returns 如果 num >= min 则返回 `true`，否则为 `false`
 *
 * @example
 * import { min } from 'arcdash'
 *
 * min(10, 5) // true
 * min(5, 5) // true
 * min(3, 5) // false
 */
export function min(num: unknown, min: number): boolean {
  return isNumber(num) && isNumber(min) && num >= min
}
