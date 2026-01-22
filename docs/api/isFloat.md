# isFloat

## 说明

检查值是否为浮点数

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isFloat } from 'arcdash'

isFloat(1.5) // true
isFloat(1) // false
isFloat('1.5') // true
isFloat('1') // false
```

