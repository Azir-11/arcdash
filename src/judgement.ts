/**
 * 判断 value 是否为空值
 * 空值的情况包括：
 * null, undefined, 0, '0', '' 以及 NaN
 * @param value - 要判断的值
 * @param checkValues - 要检查的值组成的字符串，以逗号分隔
 * @returns 是否为空值
 */
export function isEmptyValue(
  value: string | number | null | undefined,
  checkValues?: string
): boolean {
  if (
    value == null ||
    value == void 0 ||
    value == 0 ||
    value === '' ||
    Number.isNaN(value)
  )
    return true

  if (!checkValues) {
    return false
  }

  const valuesArray: string[] = checkValues.split(',').map(v => v.trim())
  return valuesArray.includes(String(value))
}
