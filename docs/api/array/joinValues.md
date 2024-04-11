# joinValues

将数组中的值连接为字符串, 并使用指定的分隔符分隔

# 使用

给定一个数组，返回合并后的内容，自动省略`null`和`undefined`，可选择传入分隔符，合并的时候将自动使用拼入拼接符

```TypeScript
import { joinValues } from 'arcash';

joinValues([],'-') // => ''
joinValues(['a', null, 'b', undefined, 'c'], '-') // => a-b-c
```

# 类型声明

```typescript
declare function joinValues<T = string | number>(
  values: readonly T[],
  separator?: string
): string
```
