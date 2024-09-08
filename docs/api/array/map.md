# map

## 概述
`map` 函数是一个增强版的 `Array.map` 方法，用于生成一个新的数组。与原生 `map` 方法不同的是，当回调函数未显式返回值时，原生 `map` 会返回 `undefined` 占位符，而该增强版的 `map` 会跳过 `undefined`，只返回有效的值。如果输入为空数组，则返回空数组。

## 功能描述
该函数接收一个数组和一个回调函数。回调函数的作用与原生 `map` 相同，但本函数能够过滤掉回调函数返回 `undefined` 的情况，从而避免无效占位符的产生。

## 函数签名
```typescript
export function map<T, U>(array: T[], fn: (value: T, index: number, array: T[]) => U): U[]
```

### 参数
- `array: T[]`: 输入数组，数组的元素类型为 `T`。
- `fn: (value: T, index: number, array: T[]) => U`: 回调函数，处理数组中的每个元素，并返回新的值。回调函数接受三个参数：
    - `value`: 当前元素的值。
    - `index`: 当前元素的索引。
    - `array`: 原始数组。

### 返回值
- `U[]`: 返回一个新的数组，包含回调函数返回的所有有效值。如果输入为空数组，则返回空数组。

## 示例代码
```typescript
import { map } from 'arcdash'

// 示例1: 正常使用，返回新数组
console.log(map([1, 2, 3], x => x * 2)) // 输出: [2, 4, 6]

// 示例2: 回调函数返回 undefined 的情况
console.log(map([1, 2, 3], (x) => {
  if (x > 2)
    return x
})) // 输出: [3]

// 示例3: 处理空数组
console.log(map([], x => x * 2)) // 输出: []
```

## 注意事项
1. 与原生 `map` 不同，当回调函数不显式返回值时，结果数组不会包含 `undefined` 占位符。
2. 如果输入为空数组，则直接返回空数组，不会执行回调函数。
3. 适用于所有类型的数组和回调函数，确保返回有效的数据。
