# head

## 说明

返回数组的第一个元素，如果数组为空则返回 undefined。 @template T 数组中元素的类型。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| array | `T[]` | 输入数组。 |

## 返回值

- 类型: `T | undefined`
- 说明: 数组的第一个元素，如果数组为空则返回 undefined。

## 示例

```ts
import { head } from 'arcdash'

head([1, 2, 3]) // 1
head(['a', 'b', 'c']) // 'a'
head([]) // undefined
```

