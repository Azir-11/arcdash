# waitFor

大部分时候都可以用，除了约会。

## 概述
`waitFor` 函数用于创建一个在指定时间后解决的 Promise，这可以用于实现延迟或等待效果。

## 功能描述
函数接收一个数字类型的参数，表示延迟的时间（以毫秒为单位）。它返回一个 Promise，该 Promise 将在经过指定的时间后被解决。这是通过使用 JavaScript 的 `setTimeout` 函数实现的。

## 函数签名
```typescript
export function waitFor(time: number): Promise<void>
```

### 参数
- `time: number`: 延迟时间，单位为毫秒。

### 返回值
- `Promise<void>`: 一个在指定时间后解决的 Promise。

## 示例代码
```typescript
import { waitFor } from 'arcdash'

// 示例: 使用 waitFor 实现延迟
waitFor(1000).then(() => console.log('1 second has passed.')) // 1秒后输出: 1 second has passed.

// 示例: 结合 async await 实现延迟
async function delay() {
  console.log('Waiting for 2 seconds...')
  await waitFor(2000)
  console.log('2 seconds have passed.')
}
```

## 注意事项
1. 该函数不处理错误情况，只负责在指定时间后解决 Promise。
2. 使用该函数可以方便地在异步操作中引入延迟，比如在测试中模拟网络延迟等场景。
