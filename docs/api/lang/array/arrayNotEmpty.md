# arrayNotEmpty

## 概述
arrayNotEmpty 函数用于检查传入的值是否为非空数组。该函数接受一个参数：要检查的数组。

## 功能描述
函数首先验证传入的 array 是否为数组类型。然后检查该数组的长度是否大于 0。如果这两个条件都满足，则函数返回 true，表示数组非空；否则返回 false。

## 函数签名
```typescript
export function arrayNotEmpty(array: unknown): boolean
```

### 参数
- array: unknown - 要检查的值，可以是任何类型，但函数会验证其是否为数组。
- boolean: 如果传入的数组非空（即长度大于 0），则返回 true；否则返回 false。

### 返回值
boolean: 如果 array 是数组且长度不为 0， 则返回 true；否则返回 false。

## 示例代码
```typescript
import { arrayNotEmpty } from 'arcdash'

// 示例1: 检查非空数值数组
const numbers = [1, 2, 3]
console.log(arrayNotEmpty(numbers)) // 输出: true

// 示例2: 检查空数组
const emptyArray = []
console.log(arrayNotEmpty(emptyArray)) // 输出: false

// 示例3: 检查非数组类型
const notAnArray = 'not an array'
console.log(arrayNotEmpty(notAnArray)) // 输出: false
```

## 注意事项
1. 函数会首先检查传入的 array 是否为数组类型，如果不是数组则直接返回 false。
2. 即使 array 是数组类型，如果它的长度为 0，函数也会返回 false。
3. 函数对于 null 或 undefined 输入也会返回 false。
4. 函数不会修改原始数组。
