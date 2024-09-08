# isString

## 概述
`isString` 函数用于判断给定的值是否为字符串。该函数通过检查值的类型是否为 'string' 或值是否为 `String` 对象的实例来实现。

## 功能描述
函数接收一个任意类型的值作为参数。它检查该值的类型是否明确声明为 'string' 或该值是否为 `String` 对象的实例。如果任一条件满足，则返回 `true` 表明该值是一个字符串；否则返回 `false`。

## 函数签名
```typescript
export function isString(value: any): value is string
```

### 参数
- `value: any`: 要检查的值，可以是任何类型。

### 返回值
- `boolean`: 如果值是一个字符串，则返回 `true`，否则返回 `false`。

## 示例代码
```typescript
import { isString } from 'arcdash'

// 示例1: 字符串检查
console.log(isString('hello')) // 输出: true

// 示例2: String 对象检查
console.log(isString(String('hello'))) // 输出: true

// 示例3: 非字符串检查
console.log(isString(123)) // 输出: false
```

## 注意事项
1. 函数能够区分普通字符串和 `String` 对象。
2. 这是一个全面的字符串检测方法，适用于所有类型的字符串表达。
