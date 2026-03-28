# SafeNumber

## 说明

一个轻量级的 JavaScript 安全数值计算工具，用于解决 JavaScript 浮点数运算精度问题

## 返回值

- 类型: `unknown`
- 说明: SafeNumber 实例

## 示例

```ts
import { SafeNumber } from 'arcdash'

SafeNumber(2.51).add(0.01) // 2.52（正确，避免浮点误差）
SafeNumber(1000).format() // "¥1,000.00"
/

/** SafeNumber 配置选项 */
export interface SafeNumberOptions {
  /** 货币符号，默认 "¥" */
  symbol?: string
  /** 千位分隔符，默认 "," */
  separator?: string
  /** 小数点，默认 "." */
  decimal?: string
  /** 无效输入是否报错，默认 false */
  errorOnInvalid?: boolean
  /** 精度（小数位数），默认 2 */
  precision?: number
  /** 格式模板，默认 "!#" */
  pattern?: string
  /** 负数格式，默认 "-!#" */
  negativePattern?: string
  /** 是否接受分为单位，默认 false */
  fromCents?: boolean
  /** 四舍五入增量，默认 null */
  increment?: number | null
}

const defaults: Required<SafeNumberOptions> = {
  symbol: '¥',
  separator: ',',
  decimal: '.',
  errorOnInvalid: false,
  precision: 2,
  pattern: '!#',
  negativePattern: '-!#',
  fromCents: false,
  increment: 0.01,
}

const round = (v: number): number => Math.round(v)
const pow = (p: number): number => 10 ** p
function rounding(value: number, increment: number): number {
  return round(value / increment) * increment
}

const groupRegex = /(\d)(?=(\d{3})+\b)/g

function parseSafeNumber(value: number | string | SafeNumberClass, opts: SafeNumberOptions, useRounding = true): number {
  let v = 0
  const { decimal, errorOnInvalid, precision: decimals, fromCents } = opts
  const precision = pow(decimals ?? 2)
  const isNumber = typeof value === 'number'
  const isSafeNumber = value instanceof SafeNumberClass

  if (isSafeNumber && fromCents) {
    return value.intValue
  }

  if (isNumber) {
    v = value
  } else if (isSafeNumber) {
    v = value.value
  } else if (typeof value === 'string') {
    const regex = new RegExp(`[^-\\d${decimal ?? '.'}]`, 'g')
    const decimalString = new RegExp(`\\${decimal ?? '.'}`, 'g')
    const processed = value
      .replace(/\((.*)\)/, '-$1')
      .replace(regex, '')
      .replace(decimalString, '.')
    v = Number(processed) || 0
  } else {
    if (errorOnInvalid) {
      throw new Error('Invalid Input')
    }
    v = 0
  }

  if (!fromCents) {
    v *= precision
    v = Number(v.toFixed(4))
  }

  return useRounding ? round(v) : v
}

function formatCurrency(currency: SafeNumberClass, settings: Required<SafeNumberOptions>): string {
  const { pattern, negativePattern, symbol, separator, decimal } = settings
  const split = (`${currency}`).replace(/^-/, '').split('.')
  const dollars = split[0]
  const cents = split[1]

  return (currency.value >= 0 ? pattern : negativePattern)
    .replace('!', symbol)
    .replace('#', dollars.replace(groupRegex, `$1${separator}`) + (cents ? decimal + cents : ''))
}

class SafeNumberClass {
  intValue: number
  value: number
  _settings: Required<SafeNumberOptions>
  _precision: number

  constructor(value: number | string | SafeNumberClass, opts?: SafeNumberOptions) {
    const settings: Required<SafeNumberOptions> = { ...defaults, ...opts }
    const precision = 10 ** settings.precision
    const v = parseSafeNumber(value, settings)

    this.intValue = v
    this.value = v / precision
    this._settings = settings
    this._precision = precision
  }

  add(number: number | string | SafeNumberClass): SafeNumberClass {
    const { _settings, _precision, intValue } = this
    const newIntValue = intValue + parseSafeNumber(number, _settings)
    const newValue = newIntValue / (_settings.fromCents ? 1 : _precision)
    return new SafeNumberClass(newValue, _settings)
  }

  subtract(number: number | string | SafeNumberClass): SafeNumberClass {
    const { _settings, _precision, intValue } = this
    const newIntValue = intValue - parseSafeNumber(number, _settings)
    const newValue = newIntValue / (_settings.fromCents ? 1 : _precision)
    return new SafeNumberClass(newValue, _settings)
  }

  multiply(number: number): SafeNumberClass {
    const { _settings, intValue } = this
    const newIntValue = intValue * number
    const precision = _settings.precision ?? 2
    const newValue = newIntValue / (_settings.fromCents ? 1 : pow(precision))
    return new SafeNumberClass(newValue, _settings)
  }

  divide(number: number | string | SafeNumberClass): SafeNumberClass {
    const { _settings, intValue } = this
    const newIntValue = intValue / parseSafeNumber(number, _settings, false)
    return new SafeNumberClass(newIntValue, _settings)
  }

  distribute(count: number): SafeNumberClass[] {
    const { intValue, _precision, _settings } = this
    const distribution: SafeNumberClass[] = []
    const split = Math[intValue >= 0 ? 'floor' : 'ceil'](intValue / count)
    let pennies = Math.abs(intValue - split * count)
    const precision = _settings.fromCents ? 1 : _precision
    const increment = 1 / precision

    for (; count !== 0; count--) {
      let item = new SafeNumberClass(split / precision, _settings)

      if (pennies-- > 0) {
        item = intValue >= 0 ? item.add(increment) : item.subtract(increment)
      }

      distribution.push(item)
    }

    return distribution
  }

  dollars(): number {
    return ~~this.value
  }

  cents(): number {
    const { intValue, _precision } = this
    return ~~(intValue % _precision)
  }

  format(options?: SafeNumberOptions | ((value: SafeNumberClass, settings: Required<SafeNumberOptions>) => string)): string {
    const { _settings } = this

    if (typeof options === 'function') {
      return options(this, _settings)
    }

    if (options) {
      return formatCurrency(this, { ..._settings, ...options })
    }

    return formatCurrency(this, _settings)
  }

  toString(): string {
    const { intValue, _precision, _settings } = this
    return rounding(intValue / _precision, _settings.increment ?? 0.01).toFixed(_settings.precision)
  }

  toJSON(): number {
    return this.value
  }
}

type SafeNumberInput = number | string | SafeNumberClass

const deprecationMessage = (name: string): string =>
  `[arcdash] \`${name}\` has been deprecated and will be removed in v0.7.0. Use \`SafeNumber\` instead.`

/**
创建一个 SafeNumber 实例

SafeNumber(2.51).add(0.01) // 2.52
```

