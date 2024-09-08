import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('formatArrayToString', () => {
  it('单个元素', () => {
    expect(_.formatArrayToString(['only'])).toBe('only')
  })

  it('单个元素带连接符', () => {
    expect(_.formatArrayToString(['only'], { separator: '-' })).toBe('only')
  })

  it('空数组', () => {
    expect(_.formatArrayToString([])).toBe('')
  })

  it('空数组带连接符', () => {
    expect(_.formatArrayToString([], { separator: '-' })).toBe('')
  })

  it('含有 null 和 undefined 元素', () => {
    expect(_.formatArrayToString(['a', null, 'b', undefined, 'c'])).toBe('abc')
  })

  it('含有 null 和 undefined 元素带连接符', () => {
    expect(_.formatArrayToString(['a', null, 'b', undefined, 'c'], { separator: '-' })).toBe('a-b-c')
  })

  it('全是null', () => {
    expect(_.formatArrayToString([null, null, null], { separator: '-' })).toBe('')
  })

  it('全是undefined', () => {
    expect(_.formatArrayToString([undefined, undefined, undefined], { separator: '-' })).toBe('')
  })

  it('含有字符串和数字元素', () => {
    expect(_.formatArrayToString(['a', 1, 'b', 2, 'c'])).toBe('a1b2c')
  })

  it('含有字符串和数字元素带连接符', () => {
    expect(_.formatArrayToString(['a', 1, 'b', 2, 'c'], { separator: '-' })).toBe('a-1-b-2-c')
  })

  it('单元素 + 连接符', () => {
    expect(_.formatArrayToString(['a'], { separator: '-' })).toBe('a')
  })

  it('使用转换函数', () => {
    expect(_.formatArrayToString([1, 2, 3], { fn: item => `#${item}` })).toBe('#1#2#3')
  })

  it('使用转换函数和连接符', () => {
    expect(_.formatArrayToString([1, 2, 3], { separator: '-', fn: item => `#${item}` })).toBe('#1-#2-#3')
  })
})
