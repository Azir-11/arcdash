# arrayNotEmpty

## 说明

检查给定的数组是否为空。 如果给定null或undefined，则此函数返回false。

## 返回值

- 类型: `unknown`
- 说明: 如果数组不为空则返回 `true`，否则为 `false`

## 示例

```ts
import { arrayNotEmpty } from 'arcdash'

arrayNotEmpty([1, 2, 3]) // true
arrayNotEmpty([]) // false
arrayNotEmpty(null) // false
```

