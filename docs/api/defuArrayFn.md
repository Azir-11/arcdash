# defuArrayFn

## 说明

与 `defuFn` 类似，但仅对数组类型的字段启用「函数即合并器」的行为。

相比 `defuFn` 限制更小：只有当字段值为数组时，函数才会被当作合并器调用，其余字段保持普通`defu` 合并逻辑。适合只想自定义数组合并、而对象字段维持默认行为的场景。

底层实现来自 [defu](https://github.com/unjs/defu) 仓库的 `defuArrayFn`。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| source | `Source` | 优先级最高的源对象。 |
| defaults | `Defaults` | 一个或多个作为兜底的默认对象，其中针对数组的函数值会被调用。 |

## 返回值

- 类型: `Defu`
- 说明: 合并后的全新对象。

## 示例

```ts
import { defuArrayFn } from 'arcdash'

const result = defuArrayFn(
  { arr: (val) => ['c', ...val] },
  { arr: ['a', 'b'] },
)
// { arr: ['c', 'a', 'b'] }
```

