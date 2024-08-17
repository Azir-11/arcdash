# formatArrayToString

## 概述
formatArrayToString 函数用于将数组中的元素连接为一个字符串，元素之间用指定的分隔符分隔。如果提供了转换函数，它将应用于数组的每个元素，以获取用于连接的字符串表示。

## 功能描述
函数首先从提供的选项中提取分隔符和转换函数。如果数组为空，函数将返回空字符串。接着，函数使用 map 方法将数组中的每个元素应用转换函数（如果有提供），并使用 filter 方法排除任何 null 或 undefined 的值。最后，函数使用 join 方法将剩余的元素连接为一个字符串。

## 函数签名
``` typescript
export function formatArrayToString<T>(
  values: readonly T[],
  options?: {
    separator?: string;
    fn?: (item: T) => string | number;
  }
): string;
```

### 参数
- values: readonly T[]: 要连接的数组，元素类型为 T。
- options?: { separator?: string, fn?: (item: T) => string | number }: 一个包含选项的对象。 
  - separator?: string: 元素之间的分隔符，默认为空字符串。 
  - fn?: (item: T) => string | number: 一个可选的函数，用于将数组元素转换为字符串或数字。

### 返回值
string: 连接后的字符串。

## 示例代码
```typescript
import { formatArrayToString } from 'arcdash';

// 示例1: 基本使用，使用默认分隔符
const numbers = [1, 2, 3, 4];
console.log(formatArrayToString(numbers)); // 输出: "1234"

// 示例2: 自定义分隔符
console.log(formatArrayToString(numbers, { separator: ',' })); // 输出: "1,2,3,4"

// 示例3: 使用转换函数
const items = [{ id: 1, name: 'Item1' }, { id: 2, name: 'Item2' }];
console.log(formatArrayToString(items, {
  separator: ', ',
  fn: item => `${item.id}: ${item.name}`
})); // 输出: "1: Item1, 2: Item2"
```

## 注意事项
1. 如果提供了转换函数 fn，它将应用于数组的每个元素以生成字符串表示。 
2. 函数会排除数组中的 null 或 undefined 值。 
3. 分隔符 separator 默认为空字符串，如果不提供将没有分隔。 
4. 函数不会修改原始数组。