# isPositive

## 说明

检查值是否为大于零的正数

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isPositive } from 'arcdash'

isPositive(1) // true
isPositive(-1) // false
isPositive(0) // false
```

