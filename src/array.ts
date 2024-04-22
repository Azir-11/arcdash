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
