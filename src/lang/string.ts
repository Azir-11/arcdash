/**
 * 检查值是否为字符串
 *
 * @title isString
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isString } from 'arcdash'
 *
 * isString('hello') // true
 * isString('') // true
 * isString(1) // false
 * isString(true) // false
 */
export function isString(value: any): value is string {
  return typeof value === 'string' || value instanceof String
}

const ID_CARD_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
const ID_CARD_CHECK_CODES = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

/**
 * 检查值是否为合法的 18 位中国居民身份证号码
 *
 * @title isIdCard
 *
 * @param value 要检查的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 * import { isIdCard } from 'arcdash'
 *
 * isIdCard('11010519491231002X') // true
 * isIdCard('110105194912310021') // false
 * isIdCard('123456') // false
 */
export function isIdCard(value: unknown): boolean {
  if (!isString(value))
    return false

  const idCard = String(value)
  if (!/^\d{17}[\dX]$/i.test(idCard))
    return false

  if (!isValidIdCardChecksum(idCard))
    return false

  if (!isValidIdCardAreaCode(idCard.slice(0, 6)))
    return false

  return isValidIdCardBirthDate(idCard.slice(6, 14))
}

function isValidIdCardChecksum(idCard: string): boolean {
  const sum = idCard
    .slice(0, 17)
    .split('')
    .reduce((total, char, index) => total + Number(char) * ID_CARD_WEIGHTS[index], 0)

  return ID_CARD_CHECK_CODES[sum % 11] === idCard[17].toUpperCase()
}

function isValidIdCardAreaCode(areaCode: string): boolean {
  const province = Number(areaCode.slice(0, 2))

  return province >= 11 && province <= 71 && areaCode !== '000000'
}

function isValidIdCardBirthDate(birthDate: string): boolean {
  const year = Number(birthDate.slice(0, 4))
  const month = Number(birthDate.slice(4, 6))
  const day = Number(birthDate.slice(6, 8))
  const currentYear = new Date().getFullYear()

  if (year < 1900 || year > currentYear)
    return false
  if (month < 1 || month > 12)
    return false

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

    if (day > (isLeapYear ? 29 : 28))
      return false
  }
  else if (day > daysInMonth[month - 1]) {
    return false
  }

  return day >= 1
}
