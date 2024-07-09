# isEmpty

检查给定的值是否为空。

## 使用

```typescript
import { isEmpty } from 'arcdash'

console.log(isEmpty(null)) // => true

console.log(isEmpty(undefined)) // => true

console.log(isEmpty(new Data())) // => true

console.log(isEmpty(0)) // => true

console.log(isEmpty(true)) // => true

console.log(isEmpty(false)) // => true

console.log(isEmpty([])) // => true

console.log(isEmpty({})) // => true

console.log(isEmpty('')) // => true

console.log(isEmpty(String())) // => true

console.log(isEmpty(new Map())) // => true

console.log(isEmpty(new Date('invalid value'))) // => true

console.log(isEmpty('true')) // => false

console.log(isEmpty(Symbol(''))) // => false

console.log(isEmpty(1)) // => false

console.log(isEmpty({ name: 'azir' })) // => false
```

## 类型声明

```typescript
export declare function isEmpty(value: unknown): boolean
```
