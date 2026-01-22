# formatArrayToString

## 说明

将数组中的值连接为字符串, 并使用指定的分隔符分隔

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| values | `any` | 要连接的值 |
| options | `any` | 选项 |

## 示例

```ts
import { formatArrayToString } from 'arcdash'

formatArrayToString(['a', 'b', 'c']) // 'abc'
formatArrayToString([1, 2, 3], { separator: '-' }) // '1-2-3'
formatArrayToString([{ name: 'A' }, { name: 'B' }], { separator: ',', fn: item => item.name }) // 'A,B'
```

