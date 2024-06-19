import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('number module', () => {
  describe('convertToBase26', () => {
    it('10以内', () => {
      expect(_.convertToBase26(1)).toBe('A')
    })

    it('26以内', () => {
      expect(_.convertToBase26(12)).toBe('L')
    })

    it('27', () => {
      expect(_.convertToBase26(27)).toBe('AA')
    })

    it('非数字', () => {
      expect(_.convertToBase26('azir')).toBe('0')
    })
  })
})
