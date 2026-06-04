# SafeNumber

一个轻量级的 JavaScript 安全数值计算工具，用于解决 JavaScript 浮点数运算精度问题，并支持格式化输出。

## 为什么需要 SafeNumber？

JavaScript 的浮点数运算存在精度问题：

```ts
0.1 + 0.2 // 0.30000000000000004
0.1 + 0.2 === 0.3 // false
```

`SafeNumber` 通过整数运算来避免这些问题：

```ts
import { SafeNumber } from 'arcdash'

SafeNumber(0.1).add(0.2).value // 0.3
```

## 功能特性

- **精确运算**：避免 JavaScript 浮点数精度问题
- **大数支持**：number / BigInt 双路径，原生支持任意大小的数值，超出安全整数自动切换、永不失真
- **链式调用**：支持流畅的链式 API
- **灵活格式化**：支持自定义货币符号、千位分隔符、小数点等
- **数值分配**：支持将数值按精度规则平均分配
- **多单位支持**：支持以基础单位和最小单位进行运算

## 大数支持（number / BigInt 双路径）

SafeNumber 不只是金额工具，而是能处理**任意大小**数值的安全数字类型——即便超过 JavaScript 的安全整数上限（`Number.MAX_SAFE_INTEGER` ≈ 9.007 × 10¹⁵）也不会失真。

### 双路径：自动在 number 与 BigInt 之间切换

底层通过 `Number.isSafeInteger` 在**每次运算之后**判断结果是否溢出安全整数，从而在两套计算逻辑间自动切换，保证最高效率：

- **安全整数范围内 → 原生 `number`（快路径）**：保持硬件级速度（约 `4ns`/运算），日常小数值零额外开销；
- **一旦溢出 `Number.MAX_SAFE_INTEGER` → 自动升级为 `BigInt`（精确路径）**：保证大数完全精确；
- **结果回到安全区 → 再降级回 `number`**：始终采用最高效的表示。

这样小数值保持原生速度、大数值保证精确，兼顾**效率**与**正确性**。

```ts
import { SafeNumber } from 'arcdash'

// 普通数值走 number 快路径
SafeNumber(2.51).add(0.01).value // 2.52

// 超大数自动升级为 BigInt，精确无误
SafeNumber('99999999999999999999').multiply(2).toString()
// "199999999999999999998.00"

SafeNumber('123456789012345.67').add('0.01').toString()
// "123456789012345.68"
```

::: warning 超大数请用字符串或 BigInt 传入
超过 `Number.MAX_SAFE_INTEGER` 的「数字字面量」在进入函数前就已被 JS 截断，因此大数务必用**字符串**或 **BigInt** 传入。无损读取请用 `toString()`；`value`（number 类型）对超大数为尽力而为的近似值。
:::

### 经过 big.js / decimal.js 测试用例交叉验证

加、减、乘、除的算术正确性，已引入 **big.js** 与 **decimal.js**（两者均为 MIT、业界主流的高精度计算库）的官方测试用例进行交叉验证，并以 Node 原生 `BigInt` 作为 oracle 逐条核对，覆盖**负数、小数、安全数、大数**的完整矩阵。

## 快速上手

```ts
import { SafeNumber } from 'arcdash'

// 创建安全数值实例
SafeNumber(2.51).add(0.01).value // 2.52

// 格式化
SafeNumber(1000).format() // "¥1,000.00"
```

## 兼容说明

为兼容旧版本，当前仍保留 `amount` 与 `Amout` 导出，但调用时会输出错误提示，并说明它们会在 `0.7.0` 版本被移除。新代码应统一改用 `SafeNumber`。

## 文档目录

- [基础用法](basic) - 创建 SafeNumber 实例
- [算术运算](arithmetic) - 加减乘除运算
- [格式化输出](format) - 自定义货币格式
- [数值分配](distribute) - 分配数值到多个结果
- [以分为单位](cents) - 使用分进行运算
- [配置选项](options) - 所有配置项说明
