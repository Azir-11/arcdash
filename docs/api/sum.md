# sum

## 说明

求数组中所有数字的和。可选择提供一个函数将数组中的对象转换为数值

## 示例

```ts
import { sum } from 'arcdash'

sum([1, 2, 3, 4, 5]) // 15
sum([{ value: 1 }, { value: 2 }], item => item.value) // 3
sum([]) // 0
```

