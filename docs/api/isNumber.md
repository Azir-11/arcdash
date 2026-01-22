# isNumber

## 说明

检查值是否为数字

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isNumber } from 'arcdash'

isNumber(1) // true
isNumber('1') // true
isNumber('a') // false
isNumber(true) // false
```

