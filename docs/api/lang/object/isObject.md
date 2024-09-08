# isObject

## 概述
`isObject` 函数用于判断给定的值是否为纯对象。这是通过检查值是否存在，并且其构造函数是否严格等于 `Object` 来实现的。

## 功能描述
函数接收一个任意类型的值作为参数。首先检查该值是否存在（非空），然后检查其构造函数是否为 `Object`。如果两个条件都满足，则返回 `true`，表明该值是一个纯对象；否则返回 `false`。

## 函数签名
```typescript
export function isObject(value: any): value is object
```

### 参数
- `value: any`: 要检查的值，可以是任何类型。

### 返回值
- `boolean`: 如果值是一个纯对象，则返回 `true`，否则返回 `false`。

## 示例代码
```typescript
import { isObject } from 'arcdash'

// 示例1: 对象检查
console.log(isObject({})) // 输出: true

// 示例2: 非对象检查
console.log(isObject([])) // 输出: false

// 示例3: 非对象检查
console.log(isObject('hello')) // 输出: false
```

## 注意事项
1. 函数检查值是否为非空且其构造函数严格等于 `Object`。
2. 对于数组或其他非纯对象类型（例如由不同构造函数创建的对象），即使它们在技术上属于对象类型，也会返回 `false`。
