# defuFn

## 说明

与 `defu` 相同，但当默认值是函数时，会以源值作为参数调用该函数得到最终结果。

适用于需要基于已有值动态计算默认值的场景，例如对源数组做转换或追加。函数的入参为源对象中对应位置的值，返回值将作为合并结果。

底层实现来自 [defu](https://github.com/unjs/defu) 仓库的 `defuFn`。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| source | `Source` | 优先级最高的源对象。 |
| defaults | `Defaults` | 一个或多个作为兜底的默认对象，其中的函数值会被调用。 |

## 返回值

- 类型: `Defu`
- 说明: 合并后的全新对象。

## 示例

```ts
import { defuFn } from 'arcdash'

const result = defuFn(
  { ignore: (val) => val.filter((i) => i !== 'dist') },
  { ignore: ['node_modules', 'dist'] },
)
// { ignore: ['node_modules'] }
```

