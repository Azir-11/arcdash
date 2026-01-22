# isBoolean

## 说明

检查值是否为布尔值

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isBoolean } from 'arcdash'

isBoolean(true) // true
isBoolean(false) // true
isBoolean('true') // false
isBoolean(1) // false
```

