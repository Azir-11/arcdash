# isDefined

## 说明

检查给定值是否定义 (!== undefined, !== null).

## 返回值

- 类型: `boolean`
- 说明: 如果值已定义则返回 true, 否则返回 false

## 示例

```ts
import { isDefined } from 'arcdash'

isDefined(0) // true
isDefined('') // true
isDefined(null) // false
isDefined(undefined) // false
```

