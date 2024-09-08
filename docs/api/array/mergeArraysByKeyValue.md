# mergeArraysByKeyValue

## 概述
`mergeArraysByKeyValue` 函数用于合并两个数组中的对象，通过指定的键值对进行匹配和合并。如果对象中包含子数组，还可以递归合并子数组。

## 功能描述
该函数接收两个数组（本地数组和远程数组），通过指定的键（`key`）匹配两个数组中的对象，并将远程数组中对应的对象属性合并到本地数组对象中。如果对象包含子数组（通过 `childrenKey` 指定），则递归合并子数组。

## 函数签名
```typescript
export function mergeArraysByKeyValue<T extends { [key: string]: any }>(
  localArray: T[],
  remoteArray: T[],
  key: string,
  childrenKey?: keyof T,
): T[]
```

### 参数
- `localArray: T[]`: 本地数组，包含需要合并的对象。
- `remoteArray: T[]`: 远程数组，包含将被合并的对象。
- `key: string`: 用于匹配两个数组中对象的唯一键。
- `childrenKey?: keyof T`: 可选参数，指定对象中的子数组键，递归合并子数组时使用。

### 返回值
- `T[]`: 返回合并后的数组，包含本地数组中的对象，并附加远程数组中匹配对象的属性。

## 示例代码
```typescript
import { mergeArraysByKeyValue } from 'arcdash'

// 示例1: 合并两个对象数组
const localArray = [
  { id: 1, name: 'Local A', children: [{ id: 3, name: 'Local C' }] },
  { id: 2, name: 'Local B' },
]

const remoteArray = [
  { id: 1, name: 'Remote A', value: 100 },
  { id: 3, name: 'Remote C', value: 200 },
]

console.log(mergeArraysByKeyValue(localArray, remoteArray, 'id', 'children'))
// 输出: [
//   { id: 1, name: 'Remote A', value: 100, children: [{ id: 3, name: 'Remote C', value: 200 }] },
//   { id: 2, name: 'Local B' }
// ]

// 示例2: 处理无匹配键的情况
console.log(mergeArraysByKeyValue(localArray, [], 'id'))
// 输出: [
//   { id: 1, name: 'Local A', children: [{ id: 3, name: 'Local C' }] },
//   { id: 2, name: 'Local B' }
// ]

// 示例3: 空数组输入
console.log(mergeArraysByKeyValue([], remoteArray, 'id'))
// 输出: []
```

## 注意事项
1. 当本地数组为空时，函数直接返回空数组。
2. 函数通过指定的键值进行对象合并，因此键值必须是对象中唯一的标识符。
3. 如果指定了 `childrenKey`，函数会递归合并子数组，因此确保子数组的结构与主数组一致。
4. 使用 `Object.assign` 方法合并对象属性，后者属性会覆盖前者的同名属性。
