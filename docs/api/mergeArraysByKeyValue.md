# mergeArraysByKeyValue

## 说明

根据指定的键值合并两个数组

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| localArray | `any` | 本地数组 |
| remoteArray | `any` | 远程数组 |
| key | `any` | 用于匹配的键 |
| childrenKey | `any` | 子数组的键（可选） |

## 返回值

- 类型: `unknown`
- 说明: 合并后的数组

## 示例

```ts
import { mergeArraysByKeyValue } from 'arcdash'

const local = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]
const remote = [{ id: 1, age: 20 }, { id: 3, name: 'C' }]

mergeArraysByKeyValue(local, remote, 'id')
// [{ id: 1, name: 'A', age: 20 }, { id: 2, name: 'B' }]
```

