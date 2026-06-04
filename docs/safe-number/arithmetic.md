# 算术运算

## 四则运算

### 加法

```ts
import { SafeNumber } from 'arcdash'

SafeNumber(2.51).add(0.01).value // 2.52
SafeNumber(10).add(5).value // 15
```

### 减法

```ts
import { SafeNumber } from 'arcdash'

SafeNumber(10).subtract(3.5).value // 6.5
SafeNumber(100).subtract(50).value // 50
```

### 乘法

```ts
import { SafeNumber } from 'arcdash'

SafeNumber(2).multiply(3).value // 6
SafeNumber(10).multiply(1.5).value // 15
```

### 除法

```ts
import { SafeNumber } from 'arcdash'

SafeNumber(10).divide(4).value // 2.5
SafeNumber(100).divide(3).value // 33.33（按默认精度 2 舍入）
```

## 大数运算

加减乘除均支持超过安全整数（`Number.MAX_SAFE_INTEGER`）的大数：底层 number / BigInt 双路径会在运算溢出时自动升级为 `BigInt`，保证精确。大数请用**字符串**或 **BigInt** 传入，并用 `toString()` 无损读取（详见[大数支持](./)）。

```ts
import { SafeNumber } from 'arcdash'

// 加：跨越安全整数边界进位精确
SafeNumber('99999999999999.99').add('0.01').toString() // "100000000000000.00"

// 减：大数借位精确
SafeNumber('100000000000000000000').subtract('0.5').toString() // "99999999999999999999.50"

// 乘：积溢出安全整数自动升级 BigInt
SafeNumber('99999999999999999999').multiply(2).toString() // "199999999999999999998.00"

// 除：大数精确整除
SafeNumber('100000000000000000000').divide(4).toString() // "25000000000000000000.00"
```

> 加减乘除的正确性已用 big.js、decimal.js 的官方测试用例交叉验证。

## 链式调用

所有运算方法都返回新的金额实例，支持链式调用：

```ts
import { SafeNumber } from 'arcdash'

SafeNumber(100).add(50).subtract(30).value // 120
SafeNumber(10).multiply(2).add(5).value // 25

// 更复杂的链式调用
SafeNumber(100)
  .add(50)
  .subtract(30)
  .multiply(2)
  .divide(4)
  .value // 60
```

## 支持的操作数类型

所有算术运算都支持数字、字符串或金额实例作为操作数：

```ts
import { SafeNumber } from 'arcdash'

// 使用数字
SafeNumber(10).add(5).value // 15

// 使用字符串
SafeNumber(10).add('5').value // 15
SafeNumber(10).subtract('2.5').value // 7.5

// 使用金额实例
const tax = SafeNumber(1.5)
SafeNumber(100).add(tax).value // 101.5
```
