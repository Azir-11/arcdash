# arrayNotContains

检查数组是否**不包含**任何给定的值,如果给定null或undefined，则此函数返回false。

## 使用

```typescript
import { arrayNotContains } from 'arcdash'

console.log(arrayNotContains([], [''])) // => true

console.log(arrayNotContains([], [])) // => true

console.log(arrayNotContains([1], [1])) // => false

console.log(arrayNotContains([1], [2])) // => true

console.log(arrayNotContains(['1', 2, '34', null], ['7', 8, '90', undefined])) // => true
```

## 类型声明

```typescript
declare function arrayNotContains(array: unknown, values: any[]): boolean
```
