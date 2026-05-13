# mask

## 说明

对字符串进行数据脱敏处理，将指定位置的字符替换为掩码字符（*）。 脱敏规则： 1. 字符串为空时直接返回空字符串。 2. 长度为 1 的字符串始终返回 '*'（密文优先级高于明文）。 3. position 决定掩码区域：'front'（前部掩码）、'middle'（中部掩码）、'back'（后部掩码）。 4. prefixLen / suffixLen 控制前后保留的明文位数（默认各 2）。 5. minMaskLen 控制至少需要的密文位数（默认 1），当明文位数与密文位数冲突时，密文优先。 6. minVisibleLen 控制至少需要保留的明文位数（默认 1），当与 minMaskLen 冲突时，minMaskLen 优先。

## 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| value | `string | number` | 需要脱敏的字符串或数字。 |

## 返回值

- 类型: `string`
- 说明: 脱敏后的字符串。

## 示例

```ts
import { mask } from 'arcdash'

mask('13812345678') // '13*******78'
mask('13812345678', { position: 'front', suffixLen: 4 }) // '*******5678'
mask('13812345678', { position: 'back', prefixLen: 4 }) // '1381*******'
mask('13812345678', { prefixLen: 3, suffixLen: 4 }) // '138****5678'
mask('张三', { minMaskLen: 3 }) // '**'
mask('张三', { minMaskLen: 3, minVisibleLen: 0 }) // '**'
mask(12345678) // '12****78'
```
