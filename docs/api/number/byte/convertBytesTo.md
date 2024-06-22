# convertBytesTo

将指定的字节大小转化至目标单位大小。如果输入的大小为NaN，会抛出错误，默认转换精度为2。

## 使用

```typescript
import { convertBytesTo } from 'arcdash';

// 1024字节转换为KB
convertBytesTo(1024, 'KB') // => "1.00 KB"

// 1500字节，转换为MB
convertBytesTo(1500, 'MB') // => "0.00 MB"

// 1048576字节转换为GB
convertBytesTo(1048576, 'GB') // => "0.00 GB"
```

## 类型声明

```typescript
export declare function convertBytesTo(size: number, unit: Unit = 'B', precision: number = DEFAULT_PRECISION): string;
```