# isArray

这个函数实质上就是Array.isArray，没有进行过任何加工。

## 函数签名
```typescript
export const isArray: (value: any) => boolean
```

### 参数
- value: any - 需要检查的值，可以是任何 JavaScript 数据类型。

### 返回值
boolean: 如果传入的值是一个数组，则返回 true；否则返回 false。

## 示例代码

```typescript
import { isArray } from 'arcdash'

// 示例1: 检查数组
const numbers = [1, 2, 3]
console.log(isArray(numbers)) // 输出: true

// 示例2: 检查非数组对象
const notAnArray = {}
console.log(isArray(notAnArray)) // 输出: false

// 示例3: 检查 null
console.log(isArray(null)) // 输出: false
```
