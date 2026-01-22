/**
 * 将数组中的值连接为字符串, 并使用指定的分隔符分隔
 *
 * @title formatArrayToString
 *
 * @param values - 要连接的值
 * @param options - 选项
 * @param options.separator - 分隔符
 * @param options.fn - 将值转换为字符串的函数
 *
 * @example
 * import { formatArrayToString } from 'arcdash'
 *
 * formatArrayToString(['a', 'b', 'c']) // 'abc'
 * formatArrayToString([1, 2, 3], { separator: '-' }) // '1-2-3'
 * formatArrayToString([{ name: 'A' }, { name: 'B' }], { separator: ',', fn: item => item.name }) // 'A,B'
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
