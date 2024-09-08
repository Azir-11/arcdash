# isDate

## 概述
`isDate` 函数用于判断给定的值是否为日期对象。这是通过使用 `Object.prototype.toString.call` 方法检查值的内部 `[object Date]` 字符串来实现的。

## 功能描述
函数接收一个任意类型的值作为参数。它使用 `Object.prototype.toString.call` 方法来获取该值的类标签，然后比较这个类标签是否等于 `[object Date]`。如果等于，则返回 `true` 表明该值是一个日期对象；否则返回 `false`。

## 函数签名
```typescript
export function isDate(value: any): value is Date
```

### 参数
- `value: any`: 要检查的值，可以是任何类型。

### 返回值
- `boolean`: 如果值是一个日期对象，则返回 `true`，否则返回 `false`。

## 示例代码
```typescript
import { isDate } from 'arcdash'

// 示例1: 日期对象检查
console.log(isDate(new Date())) // 输出: true

// 示例2: 非日期对象检查
console.log(isDate('2023-09-07')) // 输出: false

// 示例3: 非日期对象检查
console.log(isDate({})) // 输出: false
```

## 注意事项
1. 该函数精确判断一个值是否为 JavaScript 的 `Date` 对象。
2. 使用 `Object.prototype.toString.call` 方法可以有效区分日期对象与其他可能具有日期属性或方法的普通对象。
