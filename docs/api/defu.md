# defu

## 说明

递归合并对象，使用后续参数作为前者缺失字段的默认值。

第一个参数 `source` 优先级最高，其后的每个 `defaults` 依次作为兜底来源。仅当 `source`中对应字段为 `undefined`/`null` 时才会采用默认值；同名的对象会递归合并，数组会拼接。合并过程不会修改任何入参，始终返回全新对象。

底层实现来自 [defu](https://github.com/unjs/defu) 仓库的 `defu`。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| source | `Source` | 优先级最高的源对象。 |
| defaults | `Defaults` | 一个或多个作为兜底的默认对象。 |

## 返回值

- 类型: `Defu`
- 说明: 合并后的全新对象。

## 示例

```ts
import { defu } from 'arcdash'

const options = defu({ a: { b: 2 } }, { a: { b: 1, c: 3 }, d: 4 })
// { a: { b: 2, c: 3 }, d: 4 }
```

