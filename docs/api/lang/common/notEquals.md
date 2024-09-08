# notEquals

## 概述
notEquals 函数用于判断两个值是否不相等。它接受两个参数：要比较的两个值。

## 功能描述
此函数使用已定义的 isEqual 函数来比较两个值。如果 isEqual 返回 true（即两值相等），notEquals 则返回 false，表示两值不相等；反之，如果 isEqual 返回 false，则 notEquals 返回 true。

## 函数签名
```typescript
export function notEquals<T>(value: T, comparison: T): boolean
```

### 参数
- value: T: 要比较的第一个值。
- comparison: T: 要比较的第二个值。

### 返回值
boolean: 如果两个值不相等，则返回 true；如果两个值相等，则返回 false。

## 示例代码
```typescript
import { notEquals } from 'arcdash'

console.log(notEquals(10, 10)) // 输出: false
console.log(notEquals(new Date(2020, 1, 1), new Date(2020, 1, 2))) // 输出: true
console.log(notEquals('hello', 'hello')) // 输出: false
console.log(notEquals({ a: 1 }, { a: 1 })) // 输出: true
```

## 注意事项
1. 此函数依赖于 isEqual 函数的准确实现。如果 isEqual 的实现有误，notEquals 的结果也会受到影响。
2. 确保 isEqual 函数能够处理深度比较，以便 notEquals 可以准确地反映两个复杂对象是否不相等。
