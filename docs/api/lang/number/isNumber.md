# isNumber

## 概述
`isNumber` 函数用于判断给定的值是否为数字类型。该函数尝试将值转换为数字，并检查转换后的结果是否与原始值相等。

## 功能描述
函数接收一个未知类型的值作为参数。它尝试通过 `Number()` 函数转换该值，并比较转换后的结果是否严格等于原始值。如果等于，则认为该值是数字类型。如果在转换过程中出现任何错误，函数将捕获这些错误并返回 `false`。

## 函数签名
```typescript
export function isNumber(value: unknown): value is number
```

### 参数
- `value: unknown`: 要检查的值，其类型未知。

### 返回值
- `boolean`: 如果值为数字类型，则返回 `true`，否则返回 `false`。

## 示例代码
```typescript
import { isNumber } from './path/to/function'

// 示例1: 数字检查
console.log(isNumber(42)) // 输出: true

// 示例2: 非数字检查
console.log(isNumber('hello')) // 输出: false

// 示例3: 使用数字字符串
console.log(isNumber('123')) // 输出: false
```

## 注意事项
1. 函数只验证值是否为数字类型，不对字符串中的数字进行转换和验证。
2. 如果传入的值导致转换过程中抛出异常，则函数会返回 `false`。
