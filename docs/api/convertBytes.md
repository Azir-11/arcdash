# convertBytes

## 说明

将指定的单位大小转化至目标单位大小

## 返回值

- 类型: `unknown`
- 说明: 转换后的大小字符串

## 示例

```ts
import { convertBytes } from 'arcdash'

convertBytes(1024, 'B', 'KB') // '1.00 KB'
convertBytes(1048576, 'B', 'MB') // '1.00 MB'
```

