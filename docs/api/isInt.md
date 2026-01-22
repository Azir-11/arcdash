# isInt

## 说明

检查值是否为整数

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isInt } from 'arcdash'

isInt(1) // true
isInt(1.5) // false
isInt('1') // true
isInt('1.5') // false
```

