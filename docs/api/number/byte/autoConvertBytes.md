# autoConvertBytes

自动转换字节大小至合适的单位。如果输入的大小为NaN或者0，会抛出错误或者返回'0 B'，默认转换精度为2。

## 使用

```typescript
import { autoConvertBytes } from 'arcdash';

// 1024字节转换为KB
autoConvertBytes(1024) // => "1.00 KB"

// 1500字节，自动转换为合适的单位
autoConvertBytes(1500) // => "1.46 KB"

// 1048576字节转换为MB
autoConvertBytes(1048576) // => "1.00 MB"

// 0字节
autoConvertBytes(0) // => "0 B"
```

## 类型声明

```typescript
export declare function autoConvertBytes(size: number, precision?: number): string;
```
