# amount

一个轻量级的 JavaScript 金额处理库，用于解决 JavaScript 浮点数运算精度问题。

## 为什么需要 amount？

JavaScript 的浮点数运算存在精度问题：

```ts
0.1 + 0.2 // 0.30000000000000004
0.1 + 0.2 === 0.3 // false
```

`amount` 通过整数运算来避免这些问题：

```ts
import { amount } from 'arcdash'

amount(0.1).add(0.2).valueOf() // 0.3
```

## 功能特性

- **精确运算**：避免 JavaScript 浮点数精度问题
- **链式调用**：支持流畅的链式 API
- **灵活格式化**：支持自定义货币符号、千位分隔符、小数点等
- **金额分配**：支持将金额平均分配给多个人
- **多单位支持**：支持以元和分为单位进行运算

## 快速上手

```ts
import { amount } from 'arcdash'

// 创建金额
amount(2.51).add(0.01).valueOf() // 2.52

// 格式化
amount(1000).format() // "¥1,000.00"
```

## 文档目录

- [基础用法](basic) - 创建金额实例
- [算术运算](arithmetic) - 加减乘除运算
- [格式化输出](format) - 自定义货币格式
- [金额分配](distribute) - 分配金额给多人
- [以分为单位](cents) - 使用分进行运算
- [配置选项](options) - 所有配置项说明
