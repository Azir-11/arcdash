# isPrimitive

## 说明

检查给定的值是否为原始类型. 原始类型: number , string , boolean , symbol, bigint, undefined, null

## 返回值

- 类型: `boolean`
- 说明: 如果值是原始类型则返回 true, 否则返回 false

## 示例

```ts
import { isPrimitive } from 'arcdash'

isPrimitive(1) // true
isPrimitive('hello') // true
isPrimitive(true) // true
isPrimitive({}) // false
isPrimitive([]) // false
```

