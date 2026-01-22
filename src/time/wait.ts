/**
 * 等待指定时间后resolve
 *
 * @title waitFor
 *
 * @param time 等待时间（毫秒）
 * @returns Promise，在指定时间后resolve
 *
 * @example
 * import { waitFor } from 'arcdash'
 *
 * await waitFor(1000) // 等待1秒后继续执行
 */
export function waitFor(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
