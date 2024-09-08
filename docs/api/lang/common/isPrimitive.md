# isPrimitive

## 概述
isPrimitive 函数用于检查传入的值是否为原始数据类型。它接受一个参数：需要验证的值。

## 功能描述
此函数会检查传入的 value 是否属于 JavaScript 的原始数据类型（`undefined`、`null`、`boolean`、`number`、`string`、`symbol` 和 `bigint`）。如果是这些类型之一，函数将返回 true；否则返回 false。

## 函数签名
```typescript
export function isPrimitive(value: any): boolean
```

### 参数
- value: any: 需要验证是否为原始数据类型的值。

### 返回值
boolean: 如果传入值为原始数据类型，则返回 true；否则返回 false。

## 示例代码
```typescript
import { isPrimitive } from 'arcdash'

console.log(isPrimitive(2)) // 输出: true
console.log(isPrimitive(false)) // 输出: true
console.log(isPrimitive('Hello')) // 输出: true
console.log(isPrimitive({})) // 输出: false
console.log(isPrimitive(() => {})) // 输出: false
```

## 注意事项
1. 函数识别所有 JavaScript 基本数据类型。
2. 对于对象类型和函数类型，即使它们可能包含或表示原始值，此函数也会返回 false。
3. 此函数有助于快速检测变量的基本数据类型状态，避免在处理复杂数据结构时出错。
