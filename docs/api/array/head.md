# head

## 概述
`head` 函数用于获取数组的第一个元素。如果数组为空，则返回 `undefined`。

## 功能描述
该函数接收一个数组作为参数，并返回该数组的第一个元素。如果数组为空，函数返回 `undefined`。它是一种简洁且安全的方法，用于访问数组的第一个元素。

## 函数签名
```typescript
export function head<T>(array: T[]): T | undefined
```

### 参数
- `array: T[]`: 输入数组，数组的元素类型为 `T`，可以是任意类型。

### 返回值
- `T | undefined`: 返回数组的第一个元素。如果数组为空，则返回 `undefined`。

## 示例代码
```typescript
import { head } from 'arcdash'

// 示例1: 获取非空数组的第一个元素
console.log(head([1, 2, 3])) // 输出: 1

// 示例2: 获取空数组的第一个元素
console.log(head([])) // 输出: undefined

// 示例3: 获取字符串数组的第一个元素
console.log(head(['apple', 'banana', 'cherry'])) // 输出: 'apple'
```

## 注意事项
1. 当数组为空时，函数返回 `undefined`，这在处理数组时需要特别注意。
2. 适用于任何类型的数组元素，保持类型安全。
