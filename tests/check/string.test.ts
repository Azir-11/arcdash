import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('check common module', () => {
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
})
