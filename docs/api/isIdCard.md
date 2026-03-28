# isIdCard

## 说明

检查值是否为合法的 18 位中国居民身份证号码

## 返回值

- 类型: `unknown`
- 说明: 是则返回 `true`，否则为 `false`

## 示例

```ts
import { isIdCard } from 'arcdash'

isIdCard('11010519491231002X') // true
isIdCard('110105194912310021') // false
isIdCard('123456') // false
```

