# isDefined

## 概述
isDefined 函数用于检查传入的值是否已定义，即不是 `undefined` 也不是 `null`。它接受一个参数：需要验证的值。

## 功能描述
此函数检查传入的 value 是否不等于 `undefined` 和 `null`。如果满足这两个条件，则认为值已定义，并返回 true；否则返回 false。

## 函数签名
```typescript
export function isDefined<T>(value: T | undefined | null): value is T
```

### 参数
- value: T | undefined | null: 需要验证是否已定义的值，可以是任何类型，但主要关注是否为 undefined 或 null。

### 返回值
value is T: 类型谓词，指示 value 确实是类型 T，并非 undefined 或 null。

## 示例代码
```typescript
import { isNotEmpty } from 'arcdash'

const maybeNumber: number | undefined = 10
console.log(isDefined(maybeNumber)) // 输出: true

const maybeString: string | null = null
console.log(isDefined(maybeString)) // 输出: false
```

## 注意事项
1. 函数专注于检查值是否不为 undefined 和 null，不进行任何其他类型的验证。
2. 该函数可以用作类型守卫，帮助 TypeScript 在编译时确认变量的类型。
3. 确保在调用此函数时处理所有可能的值类型，以避免类型错误。
