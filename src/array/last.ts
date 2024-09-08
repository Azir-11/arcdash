/**
 * 返回数组的最后一个元素，如果数组为空则返回 undefined。
 * @template T 数组中元素的类型。
 * @param {T[]} array - 输入数组。
 * @returns {T | undefined} 数组的最后一个元素，如果数组为空则返回 undefined。
 */
export function last<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[array.length - 1] : undefined
}
