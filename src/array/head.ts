/**
 * 返回数组的第一个元素，如果数组为空则返回 undefined。
 *
 * @title head
 *
 * @template T 数组中元素的类型。
 * @param {T[]} array - 输入数组。
 * @returns {T | undefined} 数组的第一个元素，如果数组为空则返回 undefined。
 *
 * @example
 * import { head } from 'arcdash'
 *
 * head([1, 2, 3]) // 1
 * head(['a', 'b', 'c']) // 'a'
 * head([]) // undefined
 */
export function head<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined
}
