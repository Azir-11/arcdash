# isInt

## 概述
`isInt` 函数用于判断给定的值是否为整数类型。该函数首先检查值是否为数字类型，再检查是否为整数。

## 功能描述
函数接收一个任意类型的值作为参数。它首先使用 `isNumber` 函数检查该值是否为数字类型。如果是数字类型，接着检查该值除以1的余数是否为0来确定是否为整数。如果余数为0，则返回 `true` 表示它是整数；否则返回 `false`。

## 函数签名
```typescript
export function isInt(value: any): value is number
```

### 参数
- `value: any`: 要检查的值，可以是任何类型。

### 返回值
- `boolean`: 如果值为整数类型，则返回 `true`，否则返回 `false`。

## 示例代码
```typescript
import { isInt } from 'arcdash'

// 示例1: 整数检查
console.log(isInt(42)) // 输出: true

// 示例2: 非整数数字检查
console.log(isInt(3.14)) // 输出: false

// 示例3: 非数字检查
console.log(isInt('hello')) // 输出: false
```

## 注意事项
1. 该函数依赖于 `isNumber` 函数来首先判断值是否为数字。
2. 只有当值是数字并且除以1后没有余数时，才认定为整数。
