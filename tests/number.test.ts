import { describe, expect, test } from 'vitest'
import * as _ from '../src'

describe('number module', () => {
  describe('convertToBase26', () => {

    test('10以内', () => {
      expect(_.convertToBase26(1)).toBe('A')
    })

    test('26以内', () => {
      expect(_.convertToBase26(12)).toBe('L')
    })

    test('27', () => {
      expect(_.convertToBase26(27)).toBe('AA')
    })

    test('非数字', () => {
      expect(_.convertToBase26('cnm')).toBe('')
    })

  })
})
