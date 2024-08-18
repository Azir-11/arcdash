# isNil

## 概述
isNil 函数用于检查传入的值是否为 `null` 或 `undefined`。它接受一个参数：需要验证的值。

## 功能描述
此函数简单地检查传入的 value 是否等于 `null` 或 `undefined`。这通过使用 `==` 操作符来实现，该操作符会同时匹配 `null` 和 `undefined`。

## 函数签名
``` typescript
export function isNil(value: unknown): boolean
```

### 参数
- value: unknown: 需要验证是否为 `null` 或 `undefined` 的值，可以是任何类型。

### 返回值
boolean: 如果传入值为 `null` 或 `undefined`，则返回 true；否则返回 false。

## 示例代码
``` typescript
import { isNil } from 'arcdash'

console.log(isNil(null)) // 输出: true
console.log(isNil(undefined)) // 输出: true
console.log(isNil(0)) // 输出: false
console.log(isNil(false)) // 输出: false
```

## 注意事项
1. 由于使用了 `==` 而非 `===`，此函数会同时识别 `null` 和 `undefined`。
2. 函数不适用于检查其他类型的“空值”条件，如空字符串或零。
