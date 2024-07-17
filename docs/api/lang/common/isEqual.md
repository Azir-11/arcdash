# isEqual

检查传入的两个值是否相等。

## 使用

```typescript
import { isEqual } from 'arcdash'

console.log(isEqual('abc', 'abc')) // => true

console.log(isEqual('abc', 'def')) // => false

console.log(isEqual(123, 123)) // => true

console.log(isEqual(123, 456)) // => false

const obj1 = { key: 'value' }
const obj2 = { key: 'value' }

console.log(isEqual(obj1, obj2)) // => true

const obj3 = obj1

console.log(isEqual(obj1, obj3)) // => true

const obj4 = { key: 'value1' }
const obj5 = { key: 'value2' }

console.log(isEqual(obj4, obj5)) // => false
```

## 类型声明

```typescript
export declare function isEqual<TType>(x: TType, y: TType): boolean
```
