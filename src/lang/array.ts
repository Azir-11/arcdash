export const isArray = Array.isArray

/**
 * 检查给定的数组是否为空。
 * 如果给定null或undefined，则此函数返回false。
 */
export function arrayNotEmpty(array: unknown): boolean {
  return isArray(array) && array.length > 0
}

/**
 * 检查数组是否不包含任何给定的值。
 * 如果给定null或undefined，则此函数返回false。
 */
export function arrayNotContains(array: unknown, values: any[]): boolean {
  if (!isArray(array))
    return false
  return values.every(value => !array.includes(value))
}

/**
 * 检查array是否包含给定值数组中的所有值。
 * 如果给定null或undefined，则此函数返回false。
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
 * @param array 要检查的数组
 * @param identifier 用于标识对象的函数
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
