# isPositive

## 概述
`isPositive` 函数用于判断给定的值是否为大于零的正数。该函数首先确认值是否为数字类型，然后检查该数字是否大于零。

## 功能描述
函数接收一个未知类型的值作为参数。它首先使用 `isNumber` 函数检查该值是否为数字类型。如果是数字类型，然后检查该数值是否大于0。如果大于0，则返回 `true` 表示它是正数；否则返回 `false`。

## 函数签名
```typescript
export function isPositive(value: unknown): boolean
```

### 参数
- `value: unknown`: 要检查的值，其类型未知。

### 返回值
- `boolean`: 如果值为大于零的正数，则返回 `true`，否则返回 `false`。

## 示例代码
```typescript
import { isPositive } from 'arcdash'

// 示例1: 正数检查
console.log(isPositive(42)) // 输出: true

// 示例2: 非正数检查
console.log(isPositive(-1)) // 输出: false

// 示例3: 非数字检查
console.log(isPositive('hello')) // 输出: false
```

## 注意事项
1. 该函数依赖于 `isNumber` 函数来首先判断值是否为数字。
2. 函数只确认数字是否大于零，不处理非数字类型的值。
