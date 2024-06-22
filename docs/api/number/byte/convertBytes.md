# convertBytes

将指定的单位大小转化至目标单位大小。如果输入的大小为NaN，会抛出错误，默认转换精度为2。

## 使用

```typescript
import { convertBytes } from 'arcdash'

// 1024字节转换为KB
convertBytes(1024, 'B', 'KB') // => "1.00 KB"

// 1500字节，转换为MB
convertBytes(1500, 'B', 'MB') // => "0.00 MB"

// 1048576字节转换为GB
convertBytes(1048576, 'B', 'GB') // => "0.00 GB"
```
## 类型声明

```typescript
export declare function convertBytes(size: number, fromUnit: Unit, toUnit: Unit, precision?: number): string
```
