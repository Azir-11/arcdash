# arrayNotContains

## 说明

检查数组是否不包含任何给定的值。 如果给定null或undefined，则此函数返回false。

## 返回值

- 类型: `unknown`
- 说明: 如果数组不包含任何给定值则返回 `true`，否则为 `false`

## 示例

```ts
import { arrayNotContains } from 'arcdash'

arrayNotContains([1, 2, 3], [4, 5]) // true
arrayNotContains([1, 2, 3], [2, 4]) // false
```

