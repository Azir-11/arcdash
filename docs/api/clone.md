# clone

## 说明

默认模式深拷贝数据，在 lite 类型基础上额外支持 Map、Set、DataView、ArrayBuffer 与 TypedArray。

覆盖绝大多数常见数据类型的深拷贝场景。深拷贝会递归遍历源数据，复制实际的值而非引用，因此修改副本不会影响源对象。

底层实现来自 [klona](https://github.com/lukeed/klona) 仓库的 `klona`。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| input | `T` | 需要深拷贝的源数据。 |

## 返回值

- 类型: `T`
- 说明: 与源数据深度相等的独立副本。

## 示例

```ts
import { clone } from 'arcdash'

const input = new Map([['a', { n: 1 }]])
const output = clone(input)

output.get('a') === input.get('a') // false（Map 内部值被深拷贝）
```

