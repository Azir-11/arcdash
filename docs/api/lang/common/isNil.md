# isNil

判断给定的值是否为 null 或 undefined。

## 使用

```typescript
import { isNil } from 'arcdash'

console.log(isNil(null)) // => true

console.log(isNil(undefined)) // => true

console.log(isNil('arcdash')) // => false

console.log(isNil(123)) // => false

console.log(isNil({ key: 'value' })) // => false
```

## 类型声明

```typescript
export declare function isNil(value: unknown): boolean
```
