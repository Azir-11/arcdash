/**
 * 将十进制数字转换为26进制
 * @param decimalNumber 十进制数字
 */
export function convertToBase26(decimalNumber: number | string): string {
  decimalNumber = Number(decimalNumber)
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''

  while (decimalNumber > 0) {
    const remainder = decimalNumber % 26
    result = alphabet[remainder - 1] + result
    decimalNumber = Math.floor(decimalNumber / 26)
  }

  return result || '0' // 如果传入的数字为0，则返回'0'
}

export type Unit = 'B' | 'KB' | 'MB' | 'GB' | 'TB'

export function autoConvertBytes(size: number): string {
  if (size == null || size === 0)
    return '0 B'

  const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const index = Math.floor(Math.log(size) / Math.log(1024))
  const result = size / 1024 ** index

  // 使用 toFixed(2) 保持两位小数
  return `${result.toFixed(2)} ${unitArr[index]}`
}
