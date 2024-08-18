# arrayContains

## 概述
arrayContains 函数用于检查一个数组是否包含一组特定的值。它接受两个参数：要检查的数组和需要确认包含的值的数组。

## 功能描述
函数首先验证传入的 array 是否为数组类型。如果不是数组，函数将立即返回 false。如果是数组，函数将使用 every 方法检查 values 数组中的每个值是否都被 array 包含。如果所有值都在 array 中，every 方法将返回 true，否则返回 false。

## 函数签名
``` typescript
export function arrayContains(
  array: unknown,
  values: any[]
): boolean
```

### 参数
- array: unknown: 要检查的数组，可以是任何类型，但函数会验证其是否为数组。
- values: any[]: 需要检查是否被 array 包含的值的数组。

### 返回值
boolean: 如果 array 包含 values 数组中的所有值，则返回 true；否则返回 false。

## 示例代码
```typescript
import { arrayContains } from 'arcdash'

const numbers = [1, 2, 3, 4]
const valuesToCheck = [2, 4]
console.log(arrayContains(numbers, valuesToCheck)) // 输出: true

// 示例2: 检查包含非数组类型的数组
const notAnArray = 'not an array'
console.log(arrayContains(notAnArray, [1, 2])) // 输出: false

// 示例3: 检查对象数组
const people = [{ name: 'Alice' }, { name: 'Bob' }]
const peopleToCheck = [{ name: 'Alice' }]
console.log(arrayContains(people, peopleToCheck)) // 输出: false，因为对象的比较是引用比较
```

## 注意事项
1. 函数会首先检查传入的 array 是否为数组类型，不是数组则直接返回 false。
2. array 参数可以是任何类型，但函数只处理数组类型的参数。
3. values 参数应该是一个数组，包含要检查的值。
4. 如果 values 数组为空，函数将返回 true，因为空数组被认为是被任何数组包含的。
5. 函数不会修改原始数组或 values 数组。
