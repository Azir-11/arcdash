# arrayNotEmpty

检查数组是否**不**为空。

## 使用

```typescript
import { arrayNotEmpty } from 'arcdash'

// 空数组
console.log(arrayNotEmpty([])) // => false

// 非空数组
console.log(arrayNotEmpty([1, 2, 3])) // => true
```

## 类型声明

```typescript
declare function arrayNotEmpty(array: unknown): boolean
```
