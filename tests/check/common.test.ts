import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('common check module', () => {
  describe('isNil function', () => {
    it('returns true for null', () => {
      const result = _.isNil(null)

      expect(result).toBeTruthy()
    })

    it('returns true for undefined', () => {
      const result = _.isNil(undefined)

      expect(result).toBeTruthy()
    })

    it('returns true for boolean', () => {
      const result = _.isNil(false)

      expect(result).toBeFalsy()
    })

    it('returns false for string', () => {
      const result = _.isNil('true')

      expect(result).toBeFalsy()
    })

    it('returns false for number', () => {
      const result = _.isNil(1)

      expect(result).toBeFalsy()
    })

    it('returns false for object', () => {
      const result = _.isNil({})

      expect(result).toBeFalsy()
    })

    it('returns false for array', () => {
      const result = _.isNil([])

      expect(result).toBeFalsy()
    })

    it('returns false for function', () => {
      const result = _.isNil(() => {})

      expect(result).toBeFalsy()
    })

    it('returns false for NaN', () => {
      const result = _.isNil(Number.NaN)

      expect(result).toBeFalsy()
    })
  })
})
