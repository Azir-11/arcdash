import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('lang common module', () => {
  describe('isNumber function', () => {
    it('returns false for null', () => {
      const result = _.isNumber(null)

      expect(result).toBe(false)
    })

    it('returns false for undefined', () => {
      const result = _.isNumber(undefined)

      expect(result).toBe(false)
    })

    it('returns false for boolean', () => {
      const result = _.isNumber(false)

      expect(result).toBe(false)
    })

    it('returns false for class instance', () => {
      class Data {}
      const result = _.isNumber(new Data())

      expect(result).toBe(false)
    })

    it('returns true for int', () => {
      const result = _.isNumber(22)

      expect(result).toBe(true)
    })

    it('returns true for float', () => {
      const result = _.isNumber(22.0567)

      expect(result).toBe(true)
    })

    it('returns false for NaN', () => {
      const result = _.isNumber(Number.NaN)

      expect(result).toBe(false)
    })

    it('returns false for array', () => {
      const result = _.isNumber([1, 2, 3])

      expect(result).toBe(false)
    })

    it('returns false for object', () => {
      const result = _.isNumber({})

      expect(result).toBe(false)
    })

    it('returns false for string', () => {
      const result = _.isNumber('abc')

      expect(result).toBe(false)
    })

    it('returns false for string class', () => {
      const result = _.isNumber(String('abc'))

      expect(result).toBe(false)
    })
  })

  describe('isInt function', () => {
    class Data {}
    it('returns false for non-number values', () => {
      expect(_.isInt(undefined)).toBe(false)
      expect(_.isInt(null)).toBe(false)
      expect(_.isInt(false)).toBe(false)
      expect(_.isInt(new Data())).toBe(false)
      expect(_.isInt(Number.NaN)).toBe(false)
      expect(_.isInt([1, 2, 3])).toBe(false)
      expect(_.isInt({})).toBe(false)
      expect(_.isInt('abc')).toBe(false)
      expect(_.isInt(String('abc'))).toBe(false)
    })

    it('returns true for int', () => {
      const result = _.isInt(22)

      expect(result).toBe(true)
    })

    it('returns false for float', () => {
      const result = _.isInt(22.0567)

      expect(result).toBe(false)
    })
  })

  describe('isFloat function', () => {
    class Data {}
    it('returns false for non-number values', () => {
      expect(_.isFloat(undefined)).toBe(false)
      expect(_.isFloat(null)).toBe(false)
      expect(_.isFloat(false)).toBe(false)
      expect(_.isFloat(new Data())).toBe(false)
      expect(_.isFloat(Number.NaN)).toBe(false)
      expect(_.isFloat([1, 2, 3])).toBe(false)
      expect(_.isFloat({})).toBe(false)
      expect(_.isFloat('abc')).toBe(false)
      expect(_.isFloat(String('abc'))).toBe(false)
    })

    it('returns false for int', () => {
      const result = _.isFloat(22)

      expect(result).toBe(false)
    })

    it('returns true for float', () => {
      const result = _.isFloat(22.0567)

      expect(result).toBe(true)
    })
  })

  describe('isNegative function', () => {
    it('returns true for negative numbers', () => {
      const result = _.isNegative(-1)
      expect(result).toBe(true)
    })

    it('returns false for positive numbers', () => {
      const result = _.isNegative(1)
      expect(result).toBe(false)
    })

    it('returns false for zero', () => {
      const result = _.isNegative(0)
      expect(result).toBe(false)
    })

    it('returns false for non-number values', () => {
      expect(_.isNegative(undefined)).toBe(false)
      expect(_.isNegative(null)).toBe(false)
      expect(_.isNegative(false)).toBe(false)
      expect(_.isNegative('abc')).toBe(false)
      expect(_.isNegative({})).toBe(false)
      expect(_.isNegative([1, 2, 3])).toBe(false)
    })
  })

  describe('isPositive function', () => {
    it('returns true for positive numbers', () => {
      const result = _.isPositive(1)
      expect(result).toBe(true)
    })

    it('returns false for negative numbers', () => {
      const result = _.isPositive(-1)
      expect(result).toBe(false)
    })

    it('returns false for zero', () => {
      const result = _.isPositive(0)
      expect(result).toBe(false)
    })

    it('returns false for non-number values', () => {
      expect(_.isPositive(undefined)).toBe(false)
      expect(_.isPositive(null)).toBe(false)
      expect(_.isPositive(false)).toBe(false)
      expect(_.isPositive('abc')).toBe(false)
      expect(_.isPositive({})).toBe(false)
      expect(_.isPositive([1, 2, 3])).toBe(false)
    })
  })

  describe('max function', () => {
    it('returns true when the first number is less than or equal to the second', () => {
      const result = _.max(1, 2)
      expect(result).toBe(true)
    })

    it('returns false when the first number is greater than the second', () => {
      const result = _.max(2, 1)
      expect(result).toBe(false)
    })

    it('returns false for non-number values', () => {
      expect(_.max(undefined, 1)).toBe(false)
      expect(_.max(null, 1)).toBe(false)
      expect(_.max(false, 1)).toBe(false)
      expect(_.max('abc', 1)).toBe(false)
      expect(_.max({}, 1)).toBe(false)
      expect(_.max([1, 2, 3], 1)).toBe(false)
    })
  })

  describe('min function', () => {
    it('returns true when the first number is greater than or equal to the second', () => {
      const result = _.min(2, 1)
      expect(result).toBe(true)
    })

    it('returns false when the first number is less than the second', () => {
      const result = _.min(1, 2)
      expect(result).toBe(false)
    })

    it('returns false for non-number values', () => {
      expect(_.min(undefined, 1)).toBe(false)
      expect(_.min(null, 1)).toBe(false)
      expect(_.min(false, 1)).toBe(false)
      expect(_.min('abc', 1)).toBe(false)
      expect(_.min({}, 1)).toBe(false)
      expect(_.min([1, 2, 3], 1)).toBe(false)
    })
  })
})
