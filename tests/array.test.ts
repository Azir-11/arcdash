import { describe, expect, it } from 'vitest'
import * as _ from '../src'

describe('array module', () => {
  describe('joinValues', () => {
    it('单个元素', () => {
      expect(_.joinValues(['only'])).toBe('only')
    })

    it('单个元素带连接符', () => {
      expect(_.joinValues(['only'], '-')).toBe('only')
    })

    it('空数组', () => {
      expect(_.joinValues([])).toBe('')
    })

    it('空数组带连接符', () => {
      expect(_.joinValues([], '-')).toBe('')
    })

    it('含有 null 和 undefined 元素', () => {
      expect(_.joinValues(['a', null, 'b', undefined, 'c'])).toBe('abc')
    })

    it('含有 null 和 undefined 元素带连接符', () => {
      expect(_.joinValues(['a', null, 'b', undefined, 'c'], '-')).toBe('a-b-c')
    })

    it('全是null', () => {
      expect(_.joinValues([null, null, null], '-')).toBe('')
    })

    it('全是undefined', () => {
      expect(_.joinValues([undefined, undefined, undefined], '-')).toBe('')
    })

    it('含有字符串和数字元素', () => {
      expect(_.joinValues(['a', 1, 'b', 2, 'c'])).toBe('a1b2c')
    })

    it('含有字符串和数字元素带连接符', () => {
      expect(_.joinValues(['a', 1, 'b', 2, 'c'], '-')).toBe('a-1-b-2-c')
    })

    it('单元素 + 连接符', () => {
      expect(_.joinValues(['a'], '-')).toBe('a')
    })
  })

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
})
