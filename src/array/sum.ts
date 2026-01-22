/**
 * 求数组中所有数字的和。可选择提供一个函数将数组中的对象转换为数值
 *
 * @title sum
 *
 * @example
 * import { sum } from 'arcdash'
 *
 * sum([1, 2, 3, 4, 5]) // 15
 * sum([{ value: 1 }, { value: 2 }], item => item.value) // 3
 * sum([]) // 0
 */
export function sum<T extends number>(array: readonly T[]): number
export function sum<T extends object>(
  array: readonly T[],
  fn: (item: T) => number
): number
export function sum<T extends object | number>(
  array: readonly any[],
  fn?: (item: T) => number,
): number {
  return (array || []).reduce((acc, item) => acc + (fn ? fn(item) : item), 0)
}
