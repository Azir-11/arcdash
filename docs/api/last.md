# last

## 说明

返回数组的最后一个元素，如果数组为空则返回 undefined。 @template T 数组中元素的类型。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| array | `T[]` | 输入数组。 |

## 返回值

- 类型: `T | undefined`
- 说明: 数组的最后一个元素，如果数组为空则返回 undefined。

## 示例

```ts
import { last } from 'arcdash'

last([1, 2, 3]) // 3
last(['a', 'b', 'c']) // 'c'
last([]) // undefined
```

