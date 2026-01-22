# isNotEmpty

## 说明

检查给定的值是否不为空 (!== '', !== null, !== undefined).

## 返回值

- 类型: `boolean`
- 说明: 如果值不为空则返回 true, 否则返回 false

## 示例

```ts
import { isNotEmpty } from 'arcdash'

isNotEmpty('hello') // true
isNotEmpty('') // false
isNotEmpty(null) // false
isNotEmpty(undefined) // false
isNotEmpty(0) // true
```

