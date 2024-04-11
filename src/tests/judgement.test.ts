import { describe, expect, test } from 'vitest'
import * as _ from '..'

describe('judgement module', () => {
  describe('isEmptyValue', () => {
    test('1', () => {
      expect(_.isEmptyValue(1)).toBe(false)
    })

    test('null', () => {
      expect(_.isEmptyValue(null)).toBe(true)
    })

    test('undefined', () => {
      expect(_.isEmptyValue(undefined)).toBe(true)
    })

    test('空字符串', () => {
      expect(_.isEmptyValue(null)).toBe(true)
    })

    test('0', () => {
      expect(_.isEmptyValue(null)).toBe(true)
    })
  })
})
