# jsonClone

## 说明

以 JSON 模式深拷贝数据，仅处理 JSON 兼容的数据类型（对象、数组及原始值）。

体积最小、速度最快的克隆方式，适用于纯 JSON 数据结构。深拷贝会递归遍历源数据，复制实际的值而非引用，因此修改副本不会影响源对象。

底层实现来自 [klona](https://github.com/lukeed/klona) 仓库的 `klona/json`。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| input | `T` | 需要深拷贝的源数据。 |

## 返回值

- 类型: `T`
- 说明: 与源数据深度相等的独立副本。

## 示例

```ts
import { jsonClone } from 'arcdash'

const input = { foo: 1, bar: { baz: 2 } }
const output = jsonClone(input)

output.bar.baz = 99
input.bar.baz // 2（源对象不受影响）
```

