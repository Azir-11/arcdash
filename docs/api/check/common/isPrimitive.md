# isPrimitive

检查给定的值是否为原始类型.

> 原始类型: number , string , boolean , symbol, bigint, undefined, null

## 使用

```typescript
import { isPrimitive } from 'arcdash'

console.log(isPrimitive('azir')) // => true

console.log(isPrimitive(0)) // => true

console.log(isPrimitive(null)) // => true

console.log(isPrimitive(undefined)) // => true

console.log(isPrimitive([])) // => false

console.log(isPrimitive({})) // => false
```

## 类型声明

```typescript
export declare function isPrimitive(value: unknown): boolean
```
