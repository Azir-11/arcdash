# isString

## 说明

检查值是否为字符串

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isString } from 'arcdash'

isString('hello') // true
isString('') // true
isString(1) // false
isString(true) // false
```

