# 基础用法

## 创建金额实例

`amount` 函数可以接受数字、字符串或另一个金额实例作为参数。

### 从数字创建

```ts
import { amount } from 'arcdash'

amount(2.51) // 金额实例
amount(100) // 金额实例
amount(0.5) // 金额实例
```

### 从字符串创建

支持解析各种字符串格式：

```ts
import { amount } from 'arcdash'

amount('2.51') // 金额实例
amount('100.50') // 金额实例

// 支持括号表示负数
amount('(100)') // 金额实例，相当于 -100

// 支持货币符号和分隔符，会自动解析
amount('$1,000.00') // 金额实例，相当于 1000
```

### 从另一个金额实例创建

```ts
import { amount } from 'arcdash'

const price = amount(100)
amount(price) // 金额实例，值为 100
```

## 转换为其他类型

金额实例可以转换为数字或字符串：

```ts
import { amount } from 'arcdash'

const price = amount(12.34)

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
import { amount } from 'arcdash'

const price = amount(100)

price instanceof amount // true
```
