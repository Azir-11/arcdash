export const isArray = Array.isArray

/**
 * Checks if given array is not empty.
 * If null or undefined is given then this function returns false.
 */
export function arrayNotEmpty(array: unknown): boolean {
  return isArray(array) && array.length > 0
}

/**
 * Checks if array does not contain any of the given values.
 * If null or undefined is given then this function returns false.
 */
export function arrayNotContains(array: unknown, values: any[]): boolean {
  if (!isArray(array))
    return false
  return values.every(value => !array.includes(value))
}

/**
 * Checks if array contains all values from the given array of values.
 * If null or undefined is given then this function returns false.
 */
export function arrayContains(array: unknown, values: any[]): boolean {
  if (!isArray(array))
    return false
  return values.every(value => array.includes(value))
}

type ArrayUniqueIdentifier<T = any> = (o: T) => any
/**
 * Checks if all array's values are unique. Comparison for objects is reference-based.
 * If null or undefined is given then this function returns false.
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

/**
 * 获取数组的第一个元素
 * @param array 数组
 */
export const head = <T>(array: T[]) => array[0]

/**
 * 获取数组的最后一个元素
 * @param array 数组
 */
export const last = <T>(array: T[]) => array[array.length - 1]
