export const isArray = Array.isArray

/**
 * 检查给定的数组是否为空。
 * 如果给定null或undefined，则此函数返回false。
 *
 * @title arrayNotEmpty
 *
 * @param array 要检查的数组
 * @returns 如果数组不为空则返回 `true`，否则为 `false`
 *
 * @example
 * import { arrayNotEmpty } from 'arcdash'
 *
 * arrayNotEmpty([1, 2, 3]) // true
 * arrayNotEmpty([]) // false
 * arrayNotEmpty(null) // false
 */
export function arrayNotEmpty(array: unknown): boolean {
  return isArray(array) && array.length > 0
}

/**
 * 检查数组是否不包含任何给定的值。
 * 如果给定null或undefined，则此函数返回false。
 *
 * @title arrayNotContains
 *
 * @param array 要检查的数组
 * @param values 要排除的值数组
 * @returns 如果数组不包含任何给定值则返回 `true`，否则为 `false`
 *
 * @example
 * import { arrayNotContains } from 'arcdash'
 *
 * arrayNotContains([1, 2, 3], [4, 5]) // true
 * arrayNotContains([1, 2, 3], [2, 4]) // false
 */
export function arrayNotContains(array: unknown, values: any[]): boolean {
  if (!isArray(array))
    return false
  return values.every(value => !array.includes(value))
}

/**
 * 检查array是否包含给定值数组中的所有值。
 * 如果给定null或undefined，则此函数返回false。
 *
 * @title arrayContains
 *
 * @param array 要检查的数组
 * @param values 要检查是否都存在的值数组
 * @returns 如果数组包含所有给定值则返回 `true`，否则为 `false`
 *
 * @example
 * import { arrayContains } from 'arcdash'
 *
 * arrayContains([1, 2, 3], [1, 2]) // true
 * arrayContains([1, 2, 3], [1, 4]) // false
 */
export function arrayContains(array: unknown, values: any[]): boolean {
  if (!isArray(array))
    return false
  return values.every(value => array.includes(value))
}

type ArrayUniqueIdentifier<T = any> = (o: T) => any
/**
 * 检查所有数组的值是否唯一。
 * 对象的比较是基于引用的。
 * 如果给定null或undefined，则此函数返回false。
 *
 * @title arrayUnique
 *
 * @param array 要检查的数组
 * @param identifier 用于标识对象的函数
 * @returns 如果所有值唯一则返回 `true`，否则为 `false`
 *
 * @example
 * import { arrayUnique } from 'arcdash'
 *
 * arrayUnique([1, 2, 3]) // true
 * arrayUnique([1, 2, 2]) // false
 * arrayUnique([{ id: 1 }, { id: 2 }], item => item.id) // true
 */
export function arrayUnique(
  array: unknown[],
  identifier?: ArrayUniqueIdentifier,
): boolean {
  if (!Array.isArray(array))
    return false

  if (identifier)
    array = array.map(o => (o != null ? identifier(o) : o))

  const uniqueItems = array.filter((a, b, c) => c.indexOf(a) === b)
  return array.length === uniqueItems.length
}
