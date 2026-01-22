# isFunction

## 说明

检查值是否为函数

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isFunction } from 'arcdash'

isFunction(() => {}) // true
isFunction(function() {}) // true
isFunction(1) // false
```

