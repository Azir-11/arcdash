# autoConvertBytes

## 说明

自动转换字节大小至合适的单位

## 返回值

- 类型: `unknown`
- 说明: 转换后的大小字符串

## 示例

```ts
import { autoConvertBytes } from 'arcdash'

autoConvertBytes(1024) // '1.00 KB'
autoConvertBytes(1048576) // '1.00 MB'
autoConvertBytes(1073741824) // '1.00 GB'
```

