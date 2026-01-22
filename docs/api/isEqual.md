# isEqual

## 说明

检查传入的两个值是否相等.

## 返回值

- 类型: `boolean`
- 说明: 如果两个值相等则返回 true, 否则返回 false

## 示例

```ts
import { isEqual } from 'arcdash'

isEqual(1, 1) // true
isEqual('hello', 'hello') // true
isEqual({ a: 1 }, { a: 1 }) // true
isEqual([1, 2], [1, 2]) // true
isEqual(1, 2) // false
```

