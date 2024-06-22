# sum

求数组中所有数字的和。可选择提供一个函数将数组中的对象转换为数值

# 使用

传入一个数组，返回数组中所有数字的和。可选择传入一个函数，将数组中的对象转换为数值

```TypeScript
import { sum } from 'arcash';

const listA = [5, 5, 10, 2];
sum(listA) // => 22

const listB = [{ value: 5 }, { value: 5 }, { value: 10 }, { value: 2 }]
sum(list, (x: { value: number }) => x.value) // => 22

// 空数组时返回0
sum([]) // => 0
```

# 类型声明

```typescript
export declare function sum<T extends number>(array: readonly T[]): number
export declare function sum<T extends object>(array: readonly T[], fn: (item: T) => number): number
```
