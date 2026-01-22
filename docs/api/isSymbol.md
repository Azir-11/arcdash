# isSymbol

## 说明

检查值是否为 Symbol 类型

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isSymbol } from 'arcdash'

isSymbol(Symbol('a')) // true
isSymbol(Symbol.iterator) // true
isSymbol(1) // false
```

