# isPromise

## 说明

检查值是否为 Promise

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isPromise } from 'arcdash'

isPromise(Promise.resolve()) // true
isPromise(new Promise(() => {})) // true
isPromise({ then: 1 }) // false
isPromise(1) // false
```

