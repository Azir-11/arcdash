# fullClone

## 说明

以 full 模式深拷贝数据，在默认类型基础上额外支持 Symbol 键属性与不可枚举属性。

功能最完整、体积最大的克隆方式，会保留属性描述符、Symbol 键以及不可枚举属性。深拷贝会递归遍历源数据，复制实际的值而非引用，因此修改副本不会影响源对象。

底层实现来自 [klona](https://github.com/lukeed/klona) 仓库的 `klona/full`。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| input | `T` | 需要深拷贝的源数据。 |

## 返回值

- 类型: `T`
- 说明: 与源数据深度相等的独立副本。

## 示例

```ts
import { fullClone } from 'arcdash'

const sym = Symbol('s')
const output = fullClone({ [sym]: 1 })

output[sym] // 1（Symbol 键属性被保留）
```

