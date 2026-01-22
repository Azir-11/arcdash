# arrayContains

## 说明

检查array是否包含给定值数组中的所有值。 如果给定null或undefined，则此函数返回false。

## 返回值

- 类型: `unknown`
- 说明: 如果数组包含所有给定值则返回 `true`，否则为 `false`

## 示例

```ts
import { arrayContains } from 'arcdash'

arrayContains([1, 2, 3], [1, 2]) // true
arrayContains([1, 2, 3], [1, 4]) // false
```

