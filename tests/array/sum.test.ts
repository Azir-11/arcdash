import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('sum function', () => {
  it('正确地添加number数组', () => {
    const list = [5, 5, 10, 2]
    const result = _.sum(list)
    expect(result).toBe(22)
  })

  it('使用 getter fn 添加对象数组', () => {
    const list = [{ value: 5 }, { value: 5 }, { value: 10 }, { value: 2 }]
    const result = _.sum(list, (x: { value: number }) => x.value)
    expect(result).toBe(22)
  })

  it('优雅地处理空数组', () => {
    const result = _.sum(null as unknown as readonly number[])
    expect(result).toBe(0)
  })
})
