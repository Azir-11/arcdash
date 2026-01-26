# 金额分配

`distribute` 方法可以将金额平均分配给多个人，自动处理余数。

## 基本用法

```ts
import { amount } from 'arcdash'

// 将 100 平均分配给 3 个人
amount(100).distribute(3)
// 返回 [amount(34), amount(33), amount(33)]
// 总和为 100，余数 1 会分配给前面的人

// 验证结果
const parts = amount(100).distribute(3)
parts[0].add(parts[1]).add(parts[2]).valueOf() // 100
```

## 负数金额

```ts
import { amount } from 'arcdash'

// 负数金额的分配
amount(-100).distribute(3)
// 返回 [amount(-34), amount(-33), amount(-33)]
// 总和为 -100
```

## 分配给多人

```ts
import { amount } from 'arcdash'

// 分配给 5 个人
amount(100).distribute(5)
// 返回 [amount(20), amount(20), amount(20), amount(20), amount(20)]

// 分配给 7 个人
amount(100).distribute(7)
// 返回 [amount(15), amount(14), amount(14), amount(14), amount(14), amount(14), amount(14)]
// 总和为 99，剩余 1 分
```

## 实际应用场景

### 分摊费用

```ts
import { amount } from 'arcdash'

// 三人分摊 100 元费用
const share = amount(100).distribute(3)
// 每个人应付: 34, 33, 33
```

### 计算每人股息

```ts
import { amount } from 'arcdash'

// 1000 股息分给 7 个股东
const dividends = amount(1000).distribute(7)
// 返回 [143, 143, 143, 143, 143, 143, 142]
```
