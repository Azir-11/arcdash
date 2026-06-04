# 金额分配

`distribute` 方法可以将金额平均分配给多个人，自动处理余数。

## 基本用法

```ts
import { SafeNumber } from 'arcdash'

// 将 100 平均分配给 3 个人（默认精度 2 位小数）
SafeNumber(100).distribute(3)
// 返回 [SafeNumber(33.34), SafeNumber(33.33), SafeNumber(33.33)]
// 总和为 100，余数 0.01 会分配给前面的人

// 验证结果
const parts = SafeNumber(100).distribute(3)
parts[0].add(parts[1]).add(parts[2]).value // 100
```

## 负数金额

```ts
import { SafeNumber } from 'arcdash'

// 负数金额的分配
SafeNumber(-100).distribute(3)
// 返回 [SafeNumber(-33.34), SafeNumber(-33.33), SafeNumber(-33.33)]
// 总和为 -100
```

## 分配给多人

```ts
import { SafeNumber } from 'arcdash'

// 分配给 5 个人（可整除）
SafeNumber(100).distribute(5)
// 返回 [SafeNumber(20), SafeNumber(20), SafeNumber(20), SafeNumber(20), SafeNumber(20)]

// 分配给 7 个人（不可整除，余数按 0.01 分摊到前面的人）
SafeNumber(100).distribute(7)
// 返回 [SafeNumber(14.29), SafeNumber(14.29), SafeNumber(14.29), SafeNumber(14.29), SafeNumber(14.28), SafeNumber(14.28), SafeNumber(14.28)]
// 总和为 100
```

## 实际应用场景

### 分摊费用

```ts
import { SafeNumber } from 'arcdash'

// 三人分摊 100 元费用
const share = SafeNumber(100).distribute(3)
// 每个人应付: 33.34, 33.33, 33.33
```

### 计算每人股息

```ts
import { SafeNumber } from 'arcdash'

// 1000 股息分给 7 个股东
const dividends = SafeNumber(1000).distribute(7)
// 返回 [142.86, 142.86, 142.86, 142.86, 142.86, 142.85, 142.85]，总和为 1000
```
