# isDefined

检查给定的值是否不为空 (!== '', !== null, !== undefined)。

## 使用

```typescript
import { isDefined } from 'arcdash'

console.log(isDefined('abc')) // => true

console.log(isDefined(123)) // => true

console.log(isDefined(new Data())) // => true

console.log(isDefined({ key: 'value' })) // => true

console.log(isDefined(null)) // => false

console.log(isDefined(undefined)) // => false
```

## 类型声明

```typescript
export declare function isDefined(value: unknown): boolean
```
