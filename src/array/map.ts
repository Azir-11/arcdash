/**
 * 增强型map, 返回一个新数组, 原本的map如果在循环内不使用return, 则会返回undefined占位,该map则解决了该问题,输入空数组则返回空数组
 * @template T 数组中元素的类型。
 * @param {T[]} array - 输入数组
 * @param fn 回调函数 类型和map一样
 * @returns array
 */
export function map<T, U>(array: T[], fn: (value: T, index: number, array: T[]) => U): U[] {
  if (array.length === 0 && !array)
    return []

  const resultArray: U[] = []

  array.forEach((item, index, array) => {
    const result = fn(item, index, array)

    if (typeof result !== 'undefined')
      resultArray.push(result)
  })

  return resultArray
}
