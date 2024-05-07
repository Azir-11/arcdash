/**
 * 将数组中的值连接为字符串, 并使用指定的分隔符分隔
 * @param values - 要连接的值
 * @param separator - 分隔符
 */
export function joinValues<T = string | number>(values: readonly T[], separator: string = ''): string {
  if (values.length === 0)
    return ''

  // 使用 filter 过滤掉 undefined 和 null 的值
  const filteredValues = values.filter(value => value !== null && value !== undefined)

  // 使用 join 方法将数组连接为字符串
  return filteredValues.join(separator)
}

/**
 * 求数组中所有数字的和。可选择提供一个函数将数组中的对象转换为数值
 */
export function sum<T extends number>(array: readonly T[]): number
export function sum<T extends object>(array: readonly T[], fn: (item: T) => number): number
export function sum<T extends object | number>(array: readonly any[], fn?: (item: T) => number): number {
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
      if (childrenKey && localItem[childrenKey] && remoteItem[childrenKey])
        Reflect.set(localItem, childrenKey, mergeArraysByKeyValue(localItem[childrenKey], remoteItem[childrenKey], key, childrenKey))

      // 从映射中删除已处理的远程项目
      remoteMap.delete(localItem[key])
    }
    result.push(localItem)
  })

  return result
}
