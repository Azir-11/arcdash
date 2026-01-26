# 格式化输出

## 默认格式

```ts
import { amount } from 'arcdash'

amount(1000).format() // "¥1,000.00"
amount(1234.5).format() // "¥1,234.50"
amount(0.5).format() // "¥0.50"
amount(-100).format() // "-¥100.00"
```

## 自定义格式

### 货币符号

```ts
import { amount } from 'arcdash'

amount(1000).format({ symbol: '$' }) // "$1,000.00"
amount(1000).format({ symbol: '€' }) // "€1,000.00"
amount(1000).format({ symbol: '' }) // "1,000.00"
```

### 千位分隔符

```ts
import { amount } from 'arcdash'

amount(1234567).format({ separator: ',' }) // "¥1,234,567.00"
amount(1234567).format({ separator: ' ' }) // "¥1 234 567.00"
amount(1234567).format({ separator: '' }) // "¥1234567.00"
```

### 小数点

```ts
import { amount } from 'arcdash'

amount(12.34).format({ decimal: '.' }) // "¥12.34"
amount(12.34).format({ decimal: ',' }) // "¥12,34"
```

### 精度

```ts
import { amount } from 'arcdash'

amount(12.345).format({ precision: 2 }) // "¥12.35"（四舍五入）
amount(12.345).format({ precision: 3 }) // "¥12.345"
amount(12.345).format({ precision: 0 }) // "¥12"
amount(12.9).format({ precision: 0 }) // "¥13"
```

### 四舍五入增量

```ts
import { amount } from 'arcdash'

// 按 0.01 四舍五入
amount(1.555).format({ increment: 0.01 }) // "¥1.56"

// 按 0.1 四舍五入
amount(1.555).format({ increment: 0.1 }) // "¥1.6"

// 按 0.5 四舍五入
amount(1.555).format({ increment: 0.5 }) // "¥1.5"

// 禁用四舍五入
amount(1.555).format({ increment: null }) // "¥1.55"
```

## 格式模板

使用 `pattern` 和 `negativePattern` 自定义正数和负数的格式：

- `!` 代表货币符号
- `#` 代表金额数字

```ts
import { amount } from 'arcdash'

// 默认格式
amount(100).format() // "¥100.00"

// 金额在前，符号在后
amount(100).format({ pattern: '# !' }) // "100.00 ¥"
amount(-100).format({ pattern: '# !' }) // "-100.00 ¥"

// 带括号的负数
amount(100).format({ negativePattern: '(#) !' }) // "100.00 ¥"
amount(-100).format({ negativePattern: '(#) !' }) // "(100.00) ¥"

// 无符号
amount(100).format({ pattern: '#' }) // "100.00"
amount(-100).format({ negativePattern: '#' }) // "-100.00"
```

## 完整配置示例

```ts
import { amount } from 'arcdash'

// 欧元格式（欧洲风格：空格分隔，逗号小数点）
amount(1234567.89, {
  symbol: '€',
  separator: ' ',
  decimal: ',',
  precision: 2,
}).format() // "€1 234 567,89"

// 美元格式
amount(1234567.89, {
  symbol: '$',
  separator: ',',
  decimal: '.',
  precision: 2,
}).format() // "$1,234,567.89"
```

## 自定义格式化函数

可以传入函数来自定义格式化逻辑：

```ts
import { amount } from 'arcdash'

amount(1234.56).format((value, settings) => {
  return `总价: ${settings.symbol}${value.toString()}`
}) // "总价: ¥1234.56"

amount(100).format((value, settings) => {
  if (value.value >= 1000) {
    return `高级套餐: ${settings.symbol}${(value.value / 1000).toFixed(1)}k`
  }
  return `${settings.symbol}${value.toString()}`
}) // "¥1.0k"
```
