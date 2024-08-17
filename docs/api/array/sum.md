# sum

## 概述
sum 函数用于计算数组中所有元素的总和。它支持两种使用方式：一种是对基本数值类型的数组求和；另一种是对对象数组求和，此时需要提供一个函数来提取对象的数值属性。

## 功能描述
函数首先检查数组是否为空，如果为空，则返回 0。然后使用 reduce 方法来累加数组中的元素。如果提供了 fn 函数，则该函数将应用于数组的每个元素，以获取用于求和的数值；如果没有提供 fn，则直接累加数组中的元素值。

## 函数签名
``` typescript
export function sum<T extends number>(
  array: readonly T[]
): number;

export function sum<T extends object>(
  array: readonly T[],
  fn: (item: T) => number
): number;

export function sum<T extends object | number>(
  array: readonly any[],
  fn?: (item: T) => number
): number;
```

### 参数
- array: readonly T[]: 要进行求和的数组。
- fn?: (item: T) => number: （可选）一个函数，当数组元素为对象时，用于从每个对象中提取用于求和的数值。

### 返回值
number: 数组元素的总和。

## 示例代码
```typescript
import { sum } from 'arcdash';

// 示例1: 对数值数组求和
const numbers = [1, 2, 3, 4];
console.log(sum(numbers)); // 输出: 10

// 示例2: 对对象数组求和，使用属性值
const items = [{ value: 5 }, { value: 10 }];
console.log(sum(items, item => item.value)); // 输出: 15

// 示例3: 对对象数组求和，使用自定义函数
const people = [{ age: 25 }, { age: 30 }];
console.log(sum(people, person => person.age)); // 输出: 55
```

## 注意事项
1. 当数组元素为基本数值类型时，可以直接求和，无需提供 fn 函数。 
2. 当数组元素为对象时，必须提供 fn 函数来指定如何从对象中提取数值。 
3. 如果数组为空或未提供数组，则函数返回 0。 
4. 函数不会修改原始数组。