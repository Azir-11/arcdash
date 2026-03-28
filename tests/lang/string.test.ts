import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

function createIdCard(prefix17: string): string {
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  const sum = prefix17
    .split('')
    .reduce((total, char, index) => total + Number(char) * weights[index], 0)

  return `${prefix17}${checkCodes[sum % 11]}`
}

describe('lang common module', () => {
  describe('isString function', () => {
    it('returns false for null', () => {
      const result = _.isString(null)

      expect(result).toBe(false)
    })

    it('returns false for undefined', () => {
      const result = _.isString(undefined)

      expect(result).toBe(false)
    })

    it('returns false for boolean', () => {
      const result = _.isString(false)

      expect(result).toBe(false)
    })

    it('returns false for class instance', () => {
      class Data {}
      const result = _.isString(new Data())

      expect(result).toBe(false)
    })

    it('returns false for number', () => {
      const result = _.isString(22)

      expect(result).toBe(false)
    })

    it('returns false for array', () => {
      const result = _.isString([1, 2, 3])

      expect(result).toBe(false)
    })

    it('returns false for object', () => {
      const result = _.isString({})

      expect(result).toBe(false)
    })

    it('returns true for string', () => {
      const result = _.isString('abc')

      expect(result).toBe(true)
    })

    it('returns true for string class', () => {
      const result = _.isString(String('abc'))

      expect(result).toBe(true)
    })
  })

  describe('isIdCard function', () => {
    it('returns false for non-string values', () => {
      expect(_.isIdCard(null)).toBe(false)
      expect(_.isIdCard(undefined)).toBe(false)
      expect(_.isIdCard(11010519491231002)).toBe(false)
      expect(_.isIdCard({ value: '11010519491231002X' })).toBe(false)
    })

    it('returns false for invalid length', () => {
      expect(_.isIdCard('123456')).toBe(false)
      expect(_.isIdCard('11010519491231002XX')).toBe(false)
    })

    it('returns false for invalid format', () => {
      expect(_.isIdCard('1101051949123100AX')).toBe(false)
      expect(_.isIdCard('11010519491231002*')).toBe(false)
    })

    it('returns true for a valid id card ending with uppercase X', () => {
      expect(_.isIdCard('11010519491231002X')).toBe(true)
    })

    it('returns true for a valid id card ending with lowercase x', () => {
      expect(_.isIdCard('11010519491231002x')).toBe(true)
    })

    it('returns true for a valid id card ending with a number', () => {
      expect(_.isIdCard(createIdCard('32031119770706001'))).toBe(true)
    })

    it('returns false for invalid checksum', () => {
      expect(_.isIdCard('110105194912310021')).toBe(false)
    })

    it('returns false for invalid area code', () => {
      expect(_.isIdCard(createIdCard('00000019491231002'))).toBe(false)
      expect(_.isIdCard(createIdCard('72000019491231002'))).toBe(false)
    })

    it('returns true for area codes allowed by the reference implementation', () => {
      expect(_.isIdCard(createIdCard('66000019491231002'))).toBe(true)
      expect(_.isIdCard(createIdCard('71000019491231002'))).toBe(true)
    })

    it('returns false for invalid birth date', () => {
      expect(_.isIdCard(createIdCard('11010520010229002'))).toBe(false)
      expect(_.isIdCard(createIdCard('11010520261301002'))).toBe(false)
      expect(_.isIdCard(createIdCard('11010518991231002'))).toBe(false)
    })

    it('returns true for leap day birth dates', () => {
      expect(_.isIdCard(createIdCard('11010520000229002'))).toBe(true)
    })
  })
})
