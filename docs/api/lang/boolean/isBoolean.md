# isBoolean

## 概述
isBoolean 函数用于判断给定的值是否为布尔类型。

## 功能描述
该函数使用 typeof 操作符来检查传入的 value 是否具有 'boolean' 类型。如果 value 是布尔类型，则返回 true；否则返回 false。

## 函数签名
``` typescript
export function isBoolean(value: unknown): boolean;
```

## 参数
- value: unknown - 需要检查的值，可以是任何 JavaScript 数据类型。

## 返回值
boolean: 如果传入的值是布尔类型，则返回 true；否则返回 false。

## 示例代码
```typescript
import { arrayUnique } from 'arcdash';

// 示例1: 检查布尔值
console.log(isBoolean(true));  // 输出: true
console.log(isBoolean(false)); // 输出: true

// 示例2: 检查非布尔值
console.log(isBoolean("true"));  // 输出: false
console.log(isBoolean(0));       // 输出: false
console.log(isBoolean("false")); // 输出: false
console.log(isBoolean(null));    // 输出: false
```

## 注意事项
1. isBoolean 函数仅检查值的类型是否为布尔类型，不进行任何转换或逻辑判断。 
2. 字符串形式的 'true' 或 'false' 并不被视为布尔类型，即使它们在逻辑上可能代表布尔值。 
3. 函数对于 null、undefined、数字、对象等非布尔类型都会返回 false。 
4. 该函数是一个简单的类型检查工具，不涉及复杂的类型判断逻辑。