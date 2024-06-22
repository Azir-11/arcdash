# arrayContains

检查array是否包含给定值数组中的所有值,如果给定null或undefined，则此函数返回false。

## 使用

```typescript
import { arrayContains } from 'arcdash'

console.log(arrayContains([], [''])) // false

console.log(arrayContains([], [])) // true

console.log(arrayContains([1], [2])) // false

console.log(arrayContains([1], [1])) // true

console.log(arrayContains(['1', 2, '34', null], ['7', 8, '90', undefined])) // false

console.log(arrayContains(['1', 2, '34', null], ['1', 2])) // true
```

## 类型声明

```typescript
declare function arrayContains(array: unknown, values: any[]): boolean
```
