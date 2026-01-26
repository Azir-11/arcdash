# 算术运算

## 四则运算

### 加法

```ts
import { amount } from 'arcdash'

amount(2.51).add(0.01).valueOf() // 2.52
amount(10).add(5).valueOf() // 15
```

### 减法

```ts
import { amount } from 'arcdash'

amount(10).subtract(3.5).valueOf() // 6.5
amount(100).subtract(50).valueOf() // 50
```

### 乘法

```ts
import { amount } from 'arcdash'

amount(2).multiply(3).valueOf() // 6
amount(10).multiply(1.5).valueOf() // 15
```

### 除法

```ts
import { amount } from 'arcdash'

amount(10).divide(4).valueOf() // 2.5
amount(100).divide(3).valueOf() // 33.333333333333336
```

## 链式调用

所有运算方法都返回新的金额实例，支持链式调用：

```ts
import { amount } from 'arcdash'

amount(100).add(50).subtract(30).valueOf() // 120
amount(10).multiply(2).add(5).valueOf() // 25

// 更复杂的链式调用
amount(100)
  .add(50)
  .subtract(30)
  .multiply(2)
  .divide(4)
  .valueOf() // 60
```

## 支持的操作数类型

所有算术运算都支持数字、字符串或金额实例作为操作数：

```ts
import { amount } from 'arcdash'

// 使用数字
amount(10).add(5).valueOf() // 15

// 使用字符串
amount(10).add('5').valueOf() // 15
amount(10).subtract('2.5').valueOf() // 7.5

// 使用金额实例
const tax = amount(1.5)
amount(100).add(tax).valueOf() // 101.5
```
