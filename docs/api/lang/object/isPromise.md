# isPromise

## 概述
`isPromise` 函数用于尽可能地判断给定的值是否为 Promise 对象。这主要通过检查值是否存在以及是否具有 `then` 方法并且该方法是一个函数来实现的。

## 功能描述
函数接收一个任意类型的值作为参数。首先检查该值是否非空，然后检查是否具有 `then` 方法。如果存在 `then` 方法，再进一步检查 `then` 方法是否为函数。如果这些条件都满足，则返回 `true`，表明该值可能是一个 Promise 对象；否则返回 `false`。

## 函数签名
```typescript
export function isPromise(value: any): value is Promise<any>
```

### 参数
- `value: any`: 要检查的值，可以是任何类型。

### 返回值
- `boolean`: 如果值可能是一个 Promise 对象，则返回 `true`，否则返回 `false`。

## 示例代码
```typescript
import { isPromise } from 'arcdash'

// 示例1: Promise 对象检查
console.log(isPromise(new Promise((resolve, reject) => {}))) // 输出: true

// 示例2: 非 Promise 对象检查
console.log(isPromise({ then: true })) // 输出: false

// 示例3: 非 Promise 对象检查
console.log(isPromise(null)) // 输出: false
```

## 注意事项
1. 该函数通过检查 `then` 方法并验证其是否为函数来尽可能判断对象是否为 Promise。
2. 然而，这只是一个最佳猜测方法。如果想要100%确定一个对象是否为 Promise，应该使用 `Promise.resolve(value)` 来进行处理。
