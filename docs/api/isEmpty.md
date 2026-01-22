# isEmpty

## 说明

检查给定的值是否为空.

## 返回值

- 类型: `boolean`
- 说明: 如果值为空则返回 true, 否则返回 false

## 示例

```ts
import { isEmpty } from 'arcdash'

isEmpty('') // true
isEmpty(null) // true
isEmpty(undefined) // true
isEmpty(0) // true
isEmpty('hello') // false
isEmpty({}) // true
isEmpty([]) // true
```

