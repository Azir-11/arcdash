# isObject

## 说明

检查值是否为普通对象

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isObject } from 'arcdash'

isObject({}) // true
isObject({ a: 1 }) // true
isObject([]) // false
isObject(null) // false
```

