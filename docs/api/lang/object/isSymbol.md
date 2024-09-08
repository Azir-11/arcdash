# isSymbol

## 概述
`isSymbol` 函数用于判断给定的值是否为符号类型（Symbol）。这是通过检查值是否存在，并且其构造函数是否严格等于 `Symbol` 来实现的。

## 功能描述
函数接收一个任意类型的值作为参数。首先检查该值是否存在（非空），然后检查其构造函数是否为 `Symbol`。如果两个条件都满足，则返回 `true`，表明该值是一个符号类型；否则返回 `false`。

## 函数签名
```typescript
export function isSymbol(value: any): value is symbol
```

### 参数
- `value: any`: 要检查的值，可以是任何类型。

### 返回值
- `boolean`: 如果值是一个符号类型，则返回 `true`，否则返回 `false`。

## 示例代码
```typescript
import { isSymbol } from 'arcdash'

// 示例1: 符号检查
console.log(isSymbol(Symbol('test'))) // 输出: true

// 示例2: 非符号检查
console.log(isSymbol(42)) // 输出: false

// 示例3: 非符号检查
console.log(isSymbol({})) // 输出: false
```

## 注意事项
1. 函数检查值是否为非空且其构造函数严格等于 `Symbol`。
2. 对于非符号类型的任何其他类型，即使它们在技术上属于对象类型，也会返回 `false`。
