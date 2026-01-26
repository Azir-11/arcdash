# 以分为单位

`fromCents` 选项允许你以分为单位进行金额运算，避免大数精度问题。

## 为什么使用分？

在金融系统中，通常使用整数来表示金额（以最小货币单位）：
- 人民币：以分为单位（100 分 = 1 元）
- 美元：以美分为单位（100 美分 = 1 美元）

这可以避免浮点数运算带来的精度问题。

## 基本用法

```ts
import { amount } from 'arcdash'

// 创建 100 元（10000 分）
amount(10000, { fromCents: true }) // 金额实例

// 运算
amount(10000, { fromCents: true })
  .add(500, { fromCents: true })
  .valueOf() // 10500 分

// 格式化时自动转换为元
amount(10000, { fromCents: true }).format() // "¥100.00"
amount(10500, { fromCents: true }).format() // "¥105.00"
```

## 混合使用

如果操作数单位不一致，`amount` 会自动处理：

```ts
import { amount } from 'arcdash'

// 分 + 元
amount(10000, { fromCents: true })
  .add(5) // 5 元
  .valueOf() // 10500（分）

// 分 + 字符串
amount(10000, { fromCents: true })
  .add('5.50') // 5.50 元
  .valueOf() // 10550（分）
```

## 获取金额部分

```ts
import { amount } from 'arcdash'

const price = amount(1234.56)

// 获取整数部分（元）
price.dollars() // 1234

// 获取小数部分（分）
price.cents() // 56

// 对于以分存储的金额
const cents = amount(123456, { fromCents: true })
cents.dollars() // 1234
cents.cents() // 56
```

## 实际应用场景

### 订单金额计算

```ts
import { amount } from 'arcdash'

// 商品价格（分）
const price = amount(9999, { fromCents: true }) // 99.99 元

// 运费（分）
const shipping = amount(500, { fromCents: true }) // 5.00 元

// 总价
const total = price.add(shipping).format() // "¥104.99"
```

### 折扣计算

```ts
import { amount } from 'arcdash'

// 原价 100 元
const original = amount(10000, { fromCents: true })

// 9 折
const discount = original.multiply(0.9)
discount.valueOf() // 9000 分
discount.format() // "¥90.00"
```

### 分摊金额

```ts
import { amount } from 'arcdash'

// 总费用 100 元，分给 3 个人
const total = amount(10000, { fromCents: true })
const share = total.distribute(3)

share[0].format() // "¥3.33"
share[1].format() // "¥3.34"
share[2].format() // "¥3.33"
```
