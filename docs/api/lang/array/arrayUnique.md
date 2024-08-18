# arrayUnique

## 概述
arrayUnique 函数用于检查一个数组中的元素是否都是唯一的。如果提供了 identifier 函数，它将基于该函数返回的值来判断元素的唯一性。

## 功能描述
函数会先验证输入是否为数组。如果提供了 identifier 函数，它会应用于数组的每个元素，以获取用于判断的唯一标识。接着，函数通过过滤出数组中首次出现的元素来创建一个临时数组 uniqueItems。最后，通过比较原数组和 uniqueItems 的长度来判断数组元素是否唯一。

## 函数签名
``` typescript
export function arrayUnique<T>(
  array: T[],
  identifier?: (item: T) => any
): boolean
```

## 参数
- array: T[]: 要检查的数组，元素类型为 T。
- identifier?: (item: T) => any: 一个可选的函数，用于从数组元素中提取用于比较的唯一标识符。如果元素为 null 或 undefined，则不应用此函数。

## 返回值
boolean: 如果数组中的所有元素都是唯一的，返回 true；否则返回 false。

## 示例代码
``` typescript
// 示例1: 基本使用
const numbers = [1, 2, 3, 4]
console.log(arrayUnique(numbers)) // 输出: true

// 示例2: 使用 identifier 函数
interface Item {
  id: number
  name: string
}

const items = [{ id: 1, name: 'Item1' }, { id: 2, name: 'Item2' }, { id: 1, name: 'Duplicate' }]
console.log(arrayUnique<Item>(items, item => item.id)) // 输出: false，因为有两个 id 相同的元素
```

## 注意事项

1. identifier 函数应该能够为每个元素提供一个可靠的、用于比较的唯一标识。
2. 如果数组元素是基本数据类型（如数字、字符串等），则 identifier 函数是不必要的，因为可以直接比较元素值。
3. 函数不会修改原始数组。
