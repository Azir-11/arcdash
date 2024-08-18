# isEmpty

## 概述
isEmpty 函数用于检查传入的值是否为空。它接受一个参数：需要验证的值。

## 功能描述
此函数对传入的 value 进行一系列检查以确定其是否为空。定义为空的情况包括：
- 布尔值 `true` 或 `false`
- 值为 `null` 或 `undefined`
- 数字为 0
- 日期无效
- 函数和符号不被视为空
- 具有长度或大小属性的对象，其值为 0
- 对象无属性

## 函数签名
``` typescript
export function isEmpty(value: unknown): boolean
```

### 参数
- value: unknown: 需要验证是否为空的值，可以是任何类型。

### 返回值
boolean: 如果传入值为空，则返回 true；否则返回 false。

## 示例代码
``` typescript
import { isEmpty } from 'arcdash'

console.log(isEmpty(false)) // 输出: true
console.log(isEmpty(0)) // 输出: true
console.log(isEmpty({})) // 输出: true
console.log(isEmpty(new Date(''))) // 输出: true
console.log(isEmpty(() => {})) // 输出: false
console.log(isEmpty(Symbol('arcdash'))) // 输出: false
```

## 注意事项
1. 函数中“空”的定义取决于传入值的类型。
2. 为了判断复杂类型是否为空，函数会检查对象的属性数量、数组的长度、集合的大小等。
3. 对于函数和符号，即使没有关联的值或属性，也不被视为为空。
