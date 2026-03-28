# 配置选项

`SafeNumber` 函数和 `format` 方法都支持以下配置选项：

## 选项列表

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `symbol` | `string` | `'¥'` | 货币符号 |
| `separator` | `string` | `','` | 千位分隔符 |
| `decimal` | `string` | `'.'` | 小数点字符 |
| `errorOnInvalid` | `boolean` | `false` | 无效输入是否报错 |
| `precision` | `number` | `2` | 精度（小数位数） |
| `pattern` | `string` | `'!#'` | 正数格式模板 |
| `negativePattern` | `string` | `'-!#'` | 负数格式模板 |
| `fromCents` | `boolean` | `false` | 是否以分为单位 |
| `increment` | `number \| null` | `0.01` | 四舍五入增量 |

## symbol

货币符号，出现在金额前后取决于 `pattern` 的设置。

```ts
SafeNumber(100).format() // "¥100.00"
SafeNumber(100).format({ symbol: '$' }) // "$100.00"
```

## separator

千位分隔符，用于美化大数字。

```ts
SafeNumber(1234567).format() // "¥1,234,567.00"
SafeNumber(1234567).format({ separator: ' ' }) // "¥1 234 567.00"
```

## decimal

小数点字符。

```ts
SafeNumber(12.34).format() // "¥12.34"
SafeNumber(12.34).format({ decimal: ',' }) // "¥12,34"
```

## errorOnInvalid

当输入无效时是否抛出错误。

```ts
// 默认不报错
SafeNumber(null).valueOf() // 0
SafeNumber(undefined).valueOf() // 0

// 报错
SafeNumber(null, { errorOnInvalid: true }) // Error: Invalid Input
```

## precision

精度，即小数位数。

```ts
SafeNumber(12.345).format() // "¥12.35"（默认精度 2）
SafeNumber(12.345).format({ precision: 3 }) // "¥12.345"
SafeNumber(12.345).format({ precision: 0 }) // "¥12"
```

## pattern 和 negativePattern

格式模板，`!` 代表符号，`#` 代表金额。

```ts
// 默认格式
SafeNumber(100).format() // "¥100.00"
SafeNumber(-100).format() // "-¥100.00"

// 自定义模板
SafeNumber(100).format({ pattern: '# !' }) // "100.00 ¥"
SafeNumber(-100).format({ negativePattern: '(#) !' }) // "(100.00) ¥"
```

## fromCents

是否以分为单位进行运算。

```ts
SafeNumber(10000, { fromCents: true }).format() // "¥100.00"
```

## increment

四舍五入的增量。

```ts
SafeNumber(1.555).format({ increment: 0.01 }) // "¥1.56"
SafeNumber(1.555).format({ increment: 0.1 }) // "¥1.6"
SafeNumber(1.555).format({ increment: null }) // "¥1.55"（禁用四舍五入）
```
