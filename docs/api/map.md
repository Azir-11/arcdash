# map

## 说明

增强型map, 返回一个新数组, 原本的map如果在循环内不使用return, 则会返回undefined占位,该map则解决了该问题,输入空数组则返回空数组 @template T 数组中元素的类型。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| array | `T[]` | 输入数组 |

## 返回值

- 类型: `unknown`
- 说明: array

## 示例

```ts
import { map } from 'arcdash'

map([1, 2, 3], n => n * 2) // [2, 4, 6]
map(['a', 'b', 'c'], (item, index) => `${index}:${item}`) // ['0:a', '1:b', '2:c']
map([1, 2, 3, 4, 5], n => n > 2 ? n : undefined) // [undefined, undefined, 3, 4, 5]
```

