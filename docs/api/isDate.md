# isDate

## 说明

检查值是否为 Date 类型

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isDate } from 'arcdash'

isDate(new Date()) // true
isDate('2024-01-01') // false
isDate(Date.now()) // false
```

