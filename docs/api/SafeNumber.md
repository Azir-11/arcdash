# SafeNumber

## 说明

一个轻量级的 JavaScript 安全数值计算工具，用于解决浮点数运算精度问题，并原生支持任意大小的数值。底层采用 number / BigInt 双路径：通过 `Number.isSafeInteger` 在每次运算后判断结果是否溢出安全整数，自动在原生 number（快路径，保持最高效率，约 4ns/运算）与 BigInt（精确路径，处理超大数）之间切换，结果回到安全区时再降级回 number——因此小数值保持原生速度、大数值保证精确。加减乘除的算术正确性已用 big.js、decimal.js（均为 MIT）的官方测试用例交叉验证，并以 Node 原生 BigInt 作为 oracle 逐条核对。注意：超大数请用「字符串」或「BigInt」传入才能精确（超过 MAX_SAFE_INTEGER 的数字字面量在进入前已被 JS 截断），无损读取请用 `toString()`。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| value | `any` | 数值（超大数请用 string 或 bigint 传入以保证精确） |
| opts | `any` | 配置选项 |

## 返回值

- 类型: `unknown`
- 说明: SafeNumber 实例

## 示例

```ts
import { SafeNumber } from 'arcdash'

// 解决浮点精度问题
SafeNumber(2.51).add(0.01).value // 2.52

// 大数精确（务必用字符串/BigInt 传入）
SafeNumber('123456789012345.67').toString() // "123456789012345.67"
SafeNumber('99999999999999999999').multiply(2).toString() // "199999999999999999998.00"

// 格式化
SafeNumber(1000).format() // "¥1,000.00"
```

