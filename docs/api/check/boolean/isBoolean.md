# isBoolean

检查给定的值是否为布尔值。

## 使用

```typescript
import { isBoolean } from 'arcdash'

console.log(isBoolean(true)) // => true

console.log(isBoolean(false)) // => true

console.log(isBoolean('true')) // => false

console.log(isBoolean(1)) // => false

console.log(isBoolean([])) // => false

console.log(isBoolean({})) // => false

console.log(isBoolean(null)) // => false

console.log(isBoolean(undefined)) // => false
```

## 类型声明

```typescript
export declare function isBoolean(value: unknown): boolean
```
