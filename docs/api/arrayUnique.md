# arrayUnique

## 说明

检查所有数组的值是否唯一。 对象的比较是基于引用的。 如果给定null或undefined，则此函数返回false。

## 返回值

- 类型: `unknown`
- 说明: 如果所有值唯一则返回 `true`，否则为 `false`

## 示例

```ts
import { arrayUnique } from 'arcdash'

arrayUnique([1, 2, 3]) // true
arrayUnique([1, 2, 2]) // false
arrayUnique([{ id: 1 }, { id: 2 }], item => item.id) // true
```

