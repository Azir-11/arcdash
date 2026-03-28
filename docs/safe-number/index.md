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

SafeNumber(0.1).add(0.2).valueOf() // 0.3
```

## 功能特性

- **精确运算**：避免 JavaScript 浮点数精度问题
- **链式调用**：支持流畅的链式 API
- **灵活格式化**：支持自定义货币符号、千位分隔符、小数点等
- **数值分配**：支持将数值按精度规则平均分配
- **多单位支持**：支持以基础单位和最小单位进行运算

## 快速上手

```ts
import { SafeNumber } from 'arcdash'

// 创建安全数值实例
SafeNumber(2.51).add(0.01).valueOf() // 2.52

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
