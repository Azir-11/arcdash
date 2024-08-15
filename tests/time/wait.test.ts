import { describe, expect, it, vi } from 'vitest'
import * as _ from '../../src'

describe('waitFor function', () => {
  it('在指定时间后resolve', async () => {
    vi.useFakeTimers()
    const promise = _.waitFor(1000)
    vi.advanceTimersByTime(1000)
    await expect(promise).resolves.toBeUndefined()
    vi.useRealTimers()
  })

  it('在指定时间之前不会resolve', async () => {
    vi.useFakeTimers()
    const promise = _.waitFor(1000)
    let resolved = false
    promise.then(() => {
      resolved = true
    })
    vi.advanceTimersByTime(500)
    expect(resolved).toBe(false)
    vi.useRealTimers()
  })
})
