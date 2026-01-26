# Arcdash

Arcdash 是一个现代的 JavaScript/TypeScript 实用库，提供了一系列强大的函数供日常使用。

- 与 `lodash` 等同类型库相比，`arcdash` 提供了显著更小的包体积和支持更好的树摇。
- Arcdash 使用 TypeScript 开发，拥有 **100%** 的类型覆盖，并经过严格测试，确保了100%的测试覆盖率，以保证最大的可靠性。
- 除了自身提供的函数外，Arcdash 还结合了一些较为极致的其他库，如 `klona` 等，保证了最佳的性能和可靠性。

## 功能模块

### 金额处理 (amount)

`amount` 是一个轻量级的金额处理库，用于解决 JavaScript 浮点数运算精度问题。

```ts
import { amount } from 'arcdash'

// 避免浮点误差
amount(2.51).add(0.01) // 2.52（正确）
amount(0.1).multiply(0.2) // 0.02（正确）

// 格式化
amount(1000).format() // "¥1,000.00"

// 平均分配
amount(10).distribute(3) // [3.34, 3.33, 3.33]
```
