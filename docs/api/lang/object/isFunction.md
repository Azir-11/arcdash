# isFunction

## 概述
`isFunction` 函数用于判断给定的值是否为函数类型。这是通过检查值是否存在，其构造函数是否定义，以及是否具有 `call` 和 `apply` 方法来实现的。

## 功能描述
函数接收一个任意类型的值作为参数。首先检查该值是否存在且其构造函数是否已定义。接着，进一步检查该值是否具有 `call` 和 `apply` 方法。如果所有这些条件都满足，则返回 `true`，表明该值是一个函数类型；否则返回 `false`。

## 函数签名
```typescript
type AnyFunction = (...args: any[]) => any

export function isFunction(value: any): value is AnyFunction
```

### 参数
- `value: any`: 要检查的值，可以是任何类型。

### 返回值
- `boolean`: 如果值是一个函数类型，则返回 `true`，否则返回 `false`。

## 示例代码
```typescript
import { isFunction } from 'arcdash'

// 示例1: 函数检查
console.log(isFunction(() => {})) // 输出: true

// 示例2: 函数检查
console.log(isFunction(() => {})) // 输出: true

// 示例3: 非函数检查
console.log(isFunction(123)) // 输出: false

// 示例4: 非函数检查
console.log(isFunction({})) // 输出: false
```

## 注意事项
1. 函数检查值是否非空，且其构造函数定义，并具有 `call` 和 `apply` 方法。
2. 这种方法确保仅针对真正的函数类型返回 `true`，排除了其他可能具有类似特性的对象（如具有 `call` 属性的对象）。
