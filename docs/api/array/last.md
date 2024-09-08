# last

## 概述
`last` 函数用于获取数组的最后一个元素。如果数组为空，则返回 `undefined`。

## 功能描述
该函数接收一个数组作为参数，并返回该数组的最后一个元素。如果数组为空，函数返回 `undefined`。这是一个方便的方法，用于安全地访问数组的最后一个元素。

## 函数签名
```typescript
export function last<T>(array: T[]): T | undefined
```

### 参数
- `array: T[]`: 输入数组，数组的元素类型为 `T`，可以是任意类型。

### 返回值
- `T | undefined`: 返回数组的最后一个元素。如果数组为空，则返回 `undefined`。

## 示例代码
```typescript
import { last } from 'arcdash'

// 示例1: 获取非空数组的最后一个元素
console.log(last([1, 2, 3])) // 输出: 3

// 示例2: 获取空数组的最后一个元素
console.log(last([])) // 输出: undefined

// 示例3: 获取字符串数组的最后一个元素
console.log(last(['apple', 'banana', 'cherry'])) // 输出: 'cherry'
```

## 注意事项
1. 当数组为空时，函数返回 `undefined`，在使用时需要注意对返回值进行处理。
2. 适用于任何类型的数组元素，保持类型安全。
