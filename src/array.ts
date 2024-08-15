/**
 * 将数组中的值连接为字符串, 并使用指定的分隔符分隔
 * @param values - 要连接的值
 * @param options - 选项
 * @param options.separator - 分隔符
 * @param options.fn - 将值转换为字符串的函数
 */
export function formatArrayToString<T = string | number>(
  values: readonly T[],
  options: { separator?: string, fn?: (item: T) => string | number } = {},
): string {
  const { separator = '', fn } = options

  if (values.length === 0)
    return ''

  // 使用 filter 过滤掉 undefined 和 null 的值
  const filteredValues = values
    .map(value => (fn ? fn(value) : value))
    .filter(value => value !== null && value !== undefined)

  // 使用 join 方法将数组连接为字符串
  return filteredValues.join(separator)
}

/**
 * 求数组中所有数字的和。可选择提供一个函数将数组中的对象转换为数值
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

export function mergeArraysByKeyValue<T extends { [key: string]: any }>(
  localArray: T[],
  remoteArray: T[],
  key: string,
  childrenKey?: keyof T,
): T[] {
  // 如果第一个数组为空，则直接返回空数组
  if (!localArray || localArray.length === 0)
    return []

  // 创建一个映射，用于存储remoteArray中项目的key值
  const remoteMap = new Map<string, T>()
  remoteArray.forEach((item) => {
    remoteMap.set(item[key], item)
  })

  const result: T[] = []

  // 遍历localArray，合并对象，并递归处理children数组
  localArray.forEach((localItem) => {
    const remoteItem = remoteMap.get(localItem[key])
    if (remoteItem) {
      // 合并本地和远程对象
      Object.assign(localItem, remoteItem)

      // 如果有children，递归合并children数组
      if (childrenKey && localItem[childrenKey] && remoteItem[childrenKey]) {
        Reflect.set(
          localItem,
          childrenKey,
          mergeArraysByKeyValue(
            localItem[childrenKey],
            remoteItem[childrenKey],
            key,
            childrenKey,
          ),
        )
      }

      // 从映射中删除已处理的远程项目
      remoteMap.delete(localItem[key])
    }
    result.push(localItem)
  })

  return result
}

/**
 * 返回数组的第一个元素，如果数组为空则返回 undefined。
 * @template T 数组中元素的类型。
 * @param {T[]} array - 输入数组。
 * @returns {T | undefined} 数组的第一个元素，如果数组为空则返回 undefined。
 */
export function head<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined
}

/**
 * 返回数组的最后一个元素，如果数组为空则返回 undefined。
 * @template T 数组中元素的类型。
 * @param {T[]} array - 输入数组。
 * @returns {T | undefined} 数组的最后一个元素，如果数组为空则返回 undefined。
 */
export function last<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[array.length - 1] : undefined
}

/**
 * 增强型map, 返回一个新数组, 原本的map如果在循环内不使用return, 则会返回undefined占位,该map则解决了该问题,输入空数组则返回空数组
 * @template T 数组中元素的类型。
 * @param {T[]} array - 输入数组
 * @param fn 回调函数 类型和map一样
 * @returns array
 */
export function map<T,U>(array: T[], fn: (value: T, index: number, array: T[]) => U): U[] {
    if (array.length === 0 && !array) return []

    const resultArray:U[] = [];

    array.forEach((item, index, array) => {
        const result = fn(item, index, array)

        if(typeof result !== "undefined") resultArray.push(result)
    })

    return resultArray
}
