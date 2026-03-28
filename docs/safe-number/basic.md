# 基础用法

## 创建 SafeNumber 实例

`SafeNumber` 函数可以接受数字、字符串或另一个 SafeNumber 实例作为参数。

### 从数字创建

```ts
import { SafeNumber } from 'arcdash'

SafeNumber(2.51) // SafeNumber 实例
SafeNumber(100) // SafeNumber 实例
SafeNumber(0.5) // SafeNumber 实例
```

### 从字符串创建

支持解析各种字符串格式：

```ts
import { SafeNumber } from 'arcdash'

SafeNumber('2.51') // SafeNumber 实例
SafeNumber('100.50') // SafeNumber 实例

// 支持括号表示负数
SafeNumber('(100)') // SafeNumber 实例，相当于 -100

// 支持货币符号和分隔符，会自动解析
SafeNumber('$1,000.00') // SafeNumber 实例，相当于 1000
```

### 从另一个 SafeNumber 实例创建

```ts
import { SafeNumber } from 'arcdash'

const price = SafeNumber(100)
SafeNumber(price) // SafeNumber 实例，值为 100
```

## 转换为其他类型

SafeNumber 实例可以转换为数字或字符串：

```ts
import { SafeNumber } from 'arcdash'

const price = SafeNumber(12.34)

// 转换为数字
price.valueOf() // 12.34
price.toJSON() // 12.34

// 转换为字符串
price.toString() // "12.34"

// 直接使用
Number(price) // 12.34
String(price) // "12.34"
```

## instanceof 检查

```ts
import { SafeNumber } from 'arcdash'

const price = SafeNumber(100)

price instanceof SafeNumber // true
```
