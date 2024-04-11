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