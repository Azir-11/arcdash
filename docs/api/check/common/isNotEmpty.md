# isNotEmpty

检查给定的值是否不为空 (!== '', !== null, !== undefined).

## 使用

```typescript
import { isNotEmpty } from 'arcdash'

console.log(isNotEmpty('azir')) // => true

console.log(isNotEmpty(0)) // => true

console.log(isNotEmpty(1)) // => true

console.log(isNotEmpty({ key: 'value' })) // => true

console.log(isNotEmpty([])) // => true

console.log(isNotEmpty({})) // => true

console.log(isNotEmpty('')) // => false

console.log(isNotEmpty(null)) // => false

console.log(isNotEmpty(undefined)) // => false
```

## 类型声明

```typescript
export declare function isNotEmpty(value: unknown): boolean
```
