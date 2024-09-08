# isNotEmpty

## 概述
isNotEmpty 函数用于检查传入的值是否非空。它接受一个参数：需要验证的值。

## 功能描述
函数会检查传入的 value 是否不等于空字符串 `''`、`null` 或者 `undefined`。如果值为非空，则函数返回 true，否则返回 false。

## 函数签名
```typescript
export function isNotEmpty(value: unknown): boolean
```

### 参数
- value: unknown: 需要验证是否非空的值，可以是任何类型。

### 返回值
boolean: 如果传入值为非空，则返回 true；否则返回 false。

## 示例代码
```typescript
import { isNotEmpty } from 'arcdash'

console.log(isNotEmpty('hello')) // 输出: true
console.log(isNotEmpty('')) // 输出: false
console.log(isNotEmpty(null)) // 输出: false
console.log(isNotEmpty(undefined)) // 输出: false
```

## 注意事项
1. 函数只验证是否不等于空字符串 ''、null 或者 undefined。
2. 对于其他空值判断（如空数组或空对象），此函数不会返回 false。
3. 函数的判断逻辑非常简单，不涉及类型转换。
