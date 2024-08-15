# notEquals

判断两个值是否不相等。

## 使用

```typescript
import { notEquals } from 'arcdash'

console.log(notEquals('abc', 'def')) // => true

console.log(notEquals(123, 456)) // => true

const obj1 = { key: 'value' }
const obj2 = { key: 'value' }
const obj3 = { key: 'value2' }

console.log(notEquals(obj1, obj3)) // => true

console.log(notEquals(obj1, obj2)) // => false

console.log(notEquals('abc', 'abc')) // => false

console.log(notEquals(123, 123)) // => false
```

## 类型声明

```typescript
export declare function notEquals<T>(value: T, comparison: T): boolean
```
