import { describe, expect, test } from 'vitest'
import * as _ from '..'

describe('judgement module', () => {
  describe('isEmptyValue', () => {
    test('null', () => {
      expect(_.isEmptyValue(null)).toBe(true)
    })

    test('undefined', () => {
      expect(_.isEmptyValue(void 0)).toBe(true)
    })

    test('数字0', () => {
      expect(_.isEmptyValue(0)).toBe(true)
    })

    test('字符串0', () => {
      expect(_.isEmptyValue('0')).toBe(true)
    })

    test('空字符串', () => {
      expect(_.isEmptyValue('')).toBe(true)
    })

    test('直接的NaN', () => {
      expect(_.isEmptyValue(NaN)).toBe(true)
    })

    test('转化出的NaN', () => {
      expect(_.isEmptyValue(Number("abc"))).toBe(true)
    })

    test('包含实际内容的字符串', () => {
      expect(_.isEmptyValue('test')).toBe(false)
    })

    test('负数', () => {
      expect(_.isEmptyValue(-1)).toBe(false)
    })
  })
})
