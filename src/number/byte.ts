export type Unit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB'

const unitArr: Unit[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

const BYTES_IN_KILOBYTE = 1024

const DEFAULT_PRECISION = 2

/**
 * 核心计算实现
 *
 * 与 `convertBytesTo` 的区别：该函数是核心计算实现，不会对结果进行格式化
 * @param size 大小
 * @param fromUnit 来源单位
 * @param toUnit 目标单位
 * @returns 转换后的大小
 * @throws 如果输入的单位无效，则抛出错误
 */
function calculateSize(size: number, fromUnit: Unit, toUnit: Unit): number {
  if (Number.isNaN(size))
    throw new Error('Invalid size: NaN')

  const fromIndex = unitArr.indexOf(fromUnit)
  const toIndex = unitArr.indexOf(toUnit)

  if (fromIndex === -1)
    throw new Error(`Invalid fromUnit: ${fromUnit}`)

  if (toIndex === -1)
    throw new Error(`Invalid toUnit: ${toUnit}`)

  return size * BYTES_IN_KILOBYTE ** (fromIndex - toIndex)
}

/**
 * 格式化输出
 * @param size 大小
 * @param unit 单位
 * @param precision 精度
 * @returns 格式化后的字符串
 */
function formatSize(size: number, unit: Unit, precision: number = DEFAULT_PRECISION): string {
  return `${size.toFixed(precision)} ${unit}`
}

/**
 * 将指定的单位大小转化至目标单位大小
 * @param size 大小
 * @param fromUnit 原单位
 * @param toUnit 目标单位
 * @param precision 精度
 * @returns 转换后的大小字符串
 */
export function convertBytes(size: number, fromUnit: Unit, toUnit: Unit, precision: number = DEFAULT_PRECISION): string {
  const result = calculateSize(size, fromUnit, toUnit)
  return formatSize(result, toUnit, precision)
}

/**
 * 手动转换字节大小至指定单位
 * @param size 大小
 * @param unit 单位
 * @param precision 精度
 * @returns 转换后的大小字符串
 */
export function convertBytesTo(size: number, unit: Unit = 'B', precision: number = DEFAULT_PRECISION): string {
  const result = calculateSize(size, 'B', unit)
  return formatSize(result, unit, precision)
}

/**
 * 自动转换字节大小至合适的单位
 * @param size 大小
 * @param precision 精度
 * @returns 转换后的大小字符串
 */
export function autoConvertBytes(size: number, precision: number = DEFAULT_PRECISION): string {
  if (Number.isNaN(size))
    throw new Error('Invalid size: NaN')

  if (size === 0)
    return '0 B'

  const index = Math.floor(Math.log(size) / Math.log(BYTES_IN_KILOBYTE))
  const result = calculateSize(size, 'B', unitArr[index])

  return formatSize(result, unitArr[index], precision)
}
