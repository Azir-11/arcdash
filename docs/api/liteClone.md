# liteClone

## 说明

以 lite 模式深拷贝数据，在 JSON 类型基础上额外支持 Date、RegExp 与自定义类。

相比 `jsonClone` 增加了对时间对象、正则对象与自定义类实例（保留原型）的克隆能力。深拷贝会递归遍历源数据，复制实际的值而非引用，因此修改副本不会影响源对象。

底层实现来自 [klona](https://github.com/lukeed/klona) 仓库的 `klona/lite`。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| input | `T` | 需要深拷贝的源数据。 |

## 返回值

- 类型: `T`
- 说明: 与源数据深度相等的独立副本。

## 示例

```ts
import { liteClone } from 'arcdash'

const input = { at: new Date(), reg: /foo/gi }
const output = liteClone(input)

output.at === input.at // false（Date 被克隆为独立实例）
```

