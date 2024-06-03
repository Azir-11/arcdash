export function isNumber(value: unknown): value is number {
  try {
    return Number(value) === value
  }
  catch {
    return false
  }
}

export function isInt(value: any): value is number {
  return isNumber(value) && value % 1 === 0
}

export function isFloat(value: any): value is number {
  return isNumber(value) && value % 1 !== 0
}
/**
 * Checks if the value is a negative number smaller than zero.
 */
export function isNegative(value: unknown): boolean {
  return isNumber(value) && value < 0
}

/**
 * Checks if the value is a positive number greater than zero.
 */
export function isPositive(value: unknown): boolean {
  return isNumber(value) && value > 0
}

/**
 * Checks if the first number is less than or equal to the second.
 */
export function max(num: unknown, max: number): boolean {
  return isNumber(num) && isNumber(max) && num <= max
}

/**
 * Checks if the first number is greater than or equal to the second.
 */
export function min(num: unknown, min: number): boolean {
  return isNumber(num) && isNumber(min) && num >= min
}
