import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('array check module', () => {
  describe('isArray function', () => {
    it('returns false for null', () => {
      const result = _.isArray(null)

      expect(result).toBe(false)
    })

    it('returns false for undefined', () => {
      const result = _.isArray(undefined)

      expect(result).toBe(false)
    })

    it('returns false for boolean', () => {
      const result = _.isArray(false)

      expect(result).toBe(false)
    })

    it('returns false for object', () => {
      const result = _.isArray({})

      expect(result).toBe(false)
    })

    it('returns false for class instance', () => {
      class Data {}
      const result = _.isArray(new Data())

      expect(result).toBe(false)
    })

    it('returns false for number', () => {
      const result = _.isArray(22)

      expect(result).toBe(false)
    })

    it('returns false for string', () => {
      const result = _.isArray('abc')

      expect(result).toBe(false)
    })

    it('returns true for array', () => {
      const result = _.isArray([1, 2, 3])

      expect(result).toBe(true)
    })

    it('returns true for empty array', () => {
      const result = _.isArray([])

      expect(result).toBe(true)
    })
  })

  describe('arrayNotEmpty function', () => {
    it('returns false for empty array', () => {
      const result = _.arrayNotEmpty([])

      expect(result).toBe(false)
    })

    it('returns true for non-empty array', () => {
      const result = _.arrayNotEmpty([''])

      expect(result).toBe(true)
    })

    it('returns true for Array object', () => {
      const result = _.arrayNotEmpty([{}])

      expect(result).toBe(true)
    })
  })

  describe('arrayNotContains function', () => {
    it('returns true for empty first array', () => {
      const result = _.arrayNotContains([], [''])

      expect(result).toBe(true)
    })

    it('returns true for two empty array', () => {
      const result = _.arrayNotContains([], [])

      expect(result).toBe(true)
    })

    it('returns false for same number arrays', () => {
      const result = _.arrayNotContains([1], [1])

      expect(result).toBe(false)
    })

    it('returns true for different number arrays', () => {
      const result = _.arrayNotContains([1], [2])

      expect(result).toBe(true)
    })

    it('returns false for same string arrays', () => {
      const result = _.arrayNotContains(['1'], ['1'])

      expect(result).toBe(false)
    })

    it('returns true for different string arrays', () => {
      const result = _.arrayNotContains(['1'], ['2'])

      expect(result).toBe(true)
    })

    it('returns true for different arrays', () => {
      const result = _.arrayNotContains(['1', 2, '34', null], ['7', 8, '90', undefined])

      expect(result).toBe(true)
    })

    it('returns false for have an identical arrays', () => {
      const result = _.arrayNotContains(['1', 2, '34', null], ['7', 8, '90', 2])

      expect(result).toBe(false)
    })

    it('returns true for different other arrays', () => {
      const result = _.arrayNotContains([null], ['2'])

      expect(result).toBe(true)
    })
  })

  describe('arrayContains function', () => {
    it('returns false for empty first array', () => {
      const result = _.arrayContains([], [''])

      expect(result).toBe(false)
    })

    it('returns true for two empty array', () => {
      const result = _.arrayContains([], [])

      expect(result).toBe(true)
    })

    it('returns false for different number arrays', () => {
      const result = _.arrayContains([1], [2])

      expect(result).toBe(false)
    })

    it('returns true for same number arrays', () => {
      const result = _.arrayContains([1], [1])

      expect(result).toBe(true)
    })

    it('returns false for different string arrays', () => {
      const result = _.arrayContains(['1'], ['2'])

      expect(result).toBe(false)
    })

    it('returns true for same string arrays', () => {
      const result = _.arrayContains(['1'], ['1'])

      expect(result).toBe(true)
    })

    it('returns false for different arrays', () => {
      const result = _.arrayContains(['1', 2, '34', null], ['7', 8, '90', undefined])

      expect(result).toBe(false)
    })

    it('returns false for same arrays', () => {
      const result = _.arrayContains(['1', 2, '34', null], ['7', 8, '90', 2])

      expect(result).toBe(false)
    })

    it('returns true for all contained arrays', () => {
      const result = _.arrayContains(['1', 2, '34', null], ['1', 2])

      expect(result).toBe(true)
    })

    it('returns false for different other arrays', () => {
      const result = _.arrayContains([null], ['2'])

      expect(result).toBe(false)
    })
  })

  describe('arrayUnique function', () => {
    it('returns true for empty array', () => {
      const result = _.arrayUnique([])

      expect(result).toBe(true)
    })

    it('returns false for array with duplicate numbers', () => {
      const result = _.arrayUnique([1, 2, 2, 3])

      expect(result).toBe(false)
    })

    it('returns true for array with unique numbers', () => {
      const result = _.arrayUnique([1, 2, 3, 4])

      expect(result).toBe(true)
    })

    it('returns false for array with duplicate strings', () => {
      const result = _.arrayUnique(['a', 'b', 'b', 'c'])

      expect(result).toBe(false)
    })

    it('returns true for array with unique strings', () => {
      const result = _.arrayUnique(['a', 'b', 'c', 'd'])

      expect(result).toBe(true)
    })

    it('returns false for array with duplicate objects (reference-based)', () => {
      const obj = { key: 'value' }
      const result = _.arrayUnique([obj, obj])

      expect(result).toBe(false)
    })

    it('returns true for array with unique objects (reference-based)', () => {
      const result = _.arrayUnique([{ key: 'value1' }, { key: 'value2' }])

      expect(result).toBe(true)
    })

    it('returns false for array with duplicate objects (using identifier function)', () => {
      const result = _.arrayUnique([{ id: 1 }, { id: 1 }], o => o.id)

      expect(result).toBe(false)
    })

    it('returns true for array with unique objects (using identifier function)', () => {
      const result = _.arrayUnique([{ id: 1 }, { id: 2 }], o => o.id)

      expect(result).toBe(true)
    })
  })

  describe('head function', () => {
    it('returns first element for array', () => {
      const result = _.head([1, 2, 3])

      expect(result).toBe(1)
    })

    it('returns undefined for empty array', () => {
      const result = _.head([])

      expect(result).toBeUndefined()
    })
  })

  describe('last function', () => {
    it('returns last element for array', () => {
      const result = _.last([1, 2, 3])

      expect(result).toBe(3)
    })

    it('returns undefined for empty array', () => {
      const result = _.last([])

      expect(result).toBeUndefined()
    })
  })
})
