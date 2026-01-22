# convertBytesTo

## 说明

手动转换字节大小至指定单位

## 返回值

- 类型: `unknown`
- 说明: 转换后的大小字符串

## 示例

```ts
import { convertBytesTo } from 'arcdash'

convertBytesTo(1024, 'KB') // '1.00 KB'
convertBytesTo(1048576, 'MB') // '1.00 MB'
```

