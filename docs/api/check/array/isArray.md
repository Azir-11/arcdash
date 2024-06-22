# isArray

检查给定的值是否为数组。

## 使用

```typescript
import { isArray } from 'arcdash'

// 数组
console.log(isArray([1, 2, 3])) // => true

// 非数组
console.log(isArray('not an array')) // => false
```

## 类型声明

```typescript
export declare function isArray(value: unknown): boolean
```
