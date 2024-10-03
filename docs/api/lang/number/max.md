# max

## 概述
`max` 函数用于判断第一个给定的值（数字）是否小于或等于第二个给定的值（数字）。

## 功能描述
函数接收两个参数，第一个是未知类型的可能的数字，第二个是已知为数字的最大值。它首先使用 `isNumber` 函数分别检查这两个值是否为数字类型。如果两个值都是数字，然后比较第一个数是否小于或等于第二个数。如果是，则返回 `true`；否则返回 `false`。

## 函数签名
```typescript
export function max(num: unknown, max: number): boolean
```

### 参数
- `num: unknown`: 第一个要检查的值，其类型未知。
- `max: number`: 第二个值，指定的最大数值，类型为数字。

### 返回值
- `boolean`: 如果第一个值小于或等于第二个值，则返回 `true`，否则返回 `false`。

## 示例代码
```typescript
import { max } from 'arcdash'

// 示例1: 数值比较
console.log(max(3, 5)) // 输出: true

// 示例2: 数值比较
console.log(max(5, 5)) // 输出: true

// 示例3: 数值比较
console.log(max(7, 5)) // 输出: false
```

## 注意事项
1. 函数依赖于 `isNumber` 函数来判断两个参数是否都为数字类型。
2. 只有当两个参数都是数字并且第一个数字小于或等于第二个数字时，才返回 `true`。