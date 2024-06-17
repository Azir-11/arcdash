import { describe, expect, it } from 'vitest'
import * as _ from '../src'

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
      expect(_.convertToBase26('cnm')).toBe('')
    })
  })

  describe('autoConvertBytes', () => {
    it('0', () => {
      expect(_.autoConvertBytes(0)).toBe('0 B')
    })

    it('1 KB', () => {
      expect(_.autoConvertBytes(1024)).toBe('1.00 KB')
    })

    it('1.5 KB', () => {
      expect(_.autoConvertBytes(1536)).toBe('1.50 KB')
    })

    it('other KB', () => {
      expect(_.autoConvertBytes(121987)).toBe('119.13 KB')
    })

    it('1 MB', () => {
      expect(_.autoConvertBytes(1048576)).toBe('1.00 MB')
    })

    it('1.5 MB', () => {
      expect(_.autoConvertBytes(1572864)).toBe('1.50 MB')
    })

    it('1 GB', () => {
      expect(_.autoConvertBytes(1073741824)).toBe('1.00 GB')
    })

    it('1.5 GB', () => {
      expect(_.autoConvertBytes(1610612736)).toBe('1.50 GB')
    })

    it('1 TB', () => {
      expect(_.autoConvertBytes(1099511627776)).toBe('1.00 TB')
    })

    it('1.5 TB', () => {
      expect(_.autoConvertBytes(1649267441664)).toBe('1.50 TB')
    })

    it('1 PB', () => {
      expect(_.autoConvertBytes(1125899906842624)).toBe('1.00 PB')
    })

    it('1.5 PB', () => {
      expect(_.autoConvertBytes(1688849860263936)).toBe('1.50 PB')
    })
  })
})
