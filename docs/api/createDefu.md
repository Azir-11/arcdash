# createDefu

## 说明

使用自定义合并函数创建一个定制化的 defu 实例。

传入的 `merger` 会在合并每个键时被调用，可据此实现追加、累加、去重等专属合并策略；返回`true` 表示该键已被自行处理、跳过默认逻辑。返回值是一个与 `defu` 用法一致的函数。

底层实现来自 [defu](https://github.com/unjs/defu) 仓库的 `createDefu`。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| merger | `Merger` | 自定义合并函数；返回 `true` 表示该键已处理。 |

## 返回值

- 类型: `DefuFn`
- 说明: 一个使用自定义合并策略的 defu 函数。

## 示例

```ts
import { createDefu } from 'arcdash'

// 对数字字段执行累加而非覆盖
const ext = createDefu((obj, key, value) => {
  if (typeof obj[key] === 'number' && typeof value === 'number') {
    obj[key] += value
    return true
  }
})

ext({ cost: 15 }, { cost: 10 }) // { cost: 25 }
```

