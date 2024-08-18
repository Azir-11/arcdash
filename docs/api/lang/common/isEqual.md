# isEqual

## 概述
isEqual 函数用于比较两个值是否相等，支持深度比较。它接受两个参数：要比较的值。

## 功能描述
此函数进行严格的比较以确定两个值是否完全相同。特殊情况处理包括：
- 直接使用 `Object.is` 进行比较，适用于大多数原始类型和引用相同的对象。
- 如果两个值都是 `Date` 对象，比较它们的时间戳。
- 如果两个值都是 `RegExp` 对象，比较它们的字符串表示。
- 如果任一值是 `null` 或者不是对象，函数返回 `false`。

## 函数签名
``` typescript
export function isEqual<T>(value: T, comparison: T): boolean
```

### 参数
- value: T: 要比较的第一个值。
- comparison: T: 要比较的第二个值。

### 返回值
boolean: 如果两个值相等，则返回 true；否则返回 false。

## 示例代码
``` typescript
import { isEqual } from 'arcdash'

console.log(isEqual(10, 10)) // 输出: true
console.log(isEqual(new Date(2020, 1, 1), new Date(2020, 1, 1))) // 输出: true
console.log(isEqual(/abc/, /abc/)) // 输出: true
console.log(isEqual({ a: 1 }, { a: 1 })) // 输出: false (未实现深度比较)
```

## 注意事项
1. 此函数实现了部分类型的深度比较，但不全面。
2. 对于对象和数组，除非它们引用相同，否则即使内容相同也返回 `false`，除非实现了深度比较的逻辑。
3. 此示例中未完全展示如何处理复杂的深度比较，需要根据具体需求实现。
