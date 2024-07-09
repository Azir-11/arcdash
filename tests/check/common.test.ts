import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('check common module', () => {
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

  describe('isNotEmpty function', () => {
    it('returns false for empty string', () => {
      expect(_.isNotEmpty('')).toBeFalsy()
    })

    it('returns true for non-empty string', () => {
      expect(_.isNotEmpty('abc')).toBeTruthy()
    })

    it('returns false for null', () => {
      expect(_.isNotEmpty(null)).toBeFalsy()
    })

    it('returns false for undefined', () => {
      expect(_.isNotEmpty(undefined)).toBeFalsy()
    })

    it('returns true for non-empty object', () => {
      expect(_.isNotEmpty({ key: 'value' })).toBeTruthy()
    })

    it('returns true for number 1', () => {
      expect(_.isNotEmpty(1)).toBeTruthy()
    })

    it('returns true for number 0', () => {
      expect(_.isNotEmpty(0)).toBeTruthy()
    })

    it('returns true for empty array', () => {
      expect(_.isNotEmpty([])).toBeTruthy()
    })

    it('returns true for empty object', () => {
      expect(_.isNotEmpty({})).toBeTruthy()
    })
  })

  describe('isEmpty function', () => {
    class Data {}
    class Person {
      name: string = 'ray'
    }

    it('returns true for empty values', () => {
      expect(_.isEmpty(null)).toBeTruthy()
      expect(_.isEmpty(undefined)).toBeTruthy()
      expect(_.isEmpty(new Data())).toBeTruthy()
      expect(_.isEmpty(0)).toBeTruthy()
      expect(_.isEmpty(true)).toBeTruthy()
      expect(_.isEmpty([])).toBeTruthy()
      expect(_.isEmpty(false)).toBeTruthy()
      expect(_.isEmpty({})).toBeTruthy()
      expect(_.isEmpty('')).toBeTruthy()
      expect(_.isEmpty(String())).toBeTruthy()
      expect(_.isEmpty(new Map())).toBeTruthy()
      expect(_.isEmpty(new Date('invalid value'))).toBeTruthy()
    })

    it('returns false for non-empty values', () => {
      expect(_.isEmpty(new Date())).toBeFalsy()
      expect(_.isEmpty(new Date('2022-09-01T02:19:55.976Z'))).toBeFalsy()
      expect(_.isEmpty(22)).toBeFalsy()
      expect(_.isEmpty(new Person())).toBeFalsy()
      expect(_.isEmpty({ name: 'x' })).toBeFalsy()
      expect(_.isEmpty('abc')).toBeFalsy()
      expect(_.isEmpty(String('abc'))).toBeFalsy()
      expect(_.isEmpty([1, 2, 3])).toBeFalsy()
      expect(_.isEmpty(() => {})).toBeFalsy()
      expect(_.isEmpty(() => {})).toBeFalsy()
      expect(_.isEmpty(Symbol(''))).toBeFalsy()
      expect(_.isEmpty(Symbol('hello'))).toBeFalsy()
      const map = new Map()
      map.set('a', 1)
      expect(_.isEmpty(map)).toBeFalsy()
    })
  })

  describe('isEqual function', () => {
    it('returns true for equal strings', () => {
      expect(_.isEqual('abc', 'abc')).toBeTruthy()
    })

    it('returns false for non-equal strings', () => {
      expect(_.isEqual('abc', 'def')).toBeFalsy()
    })

    it('returns true for equal numbers', () => {
      expect(_.isEqual(123, 123)).toBeTruthy()
    })

    it('returns false for non-equal numbers', () => {
      expect(_.isEqual(123, 456)).toBeFalsy()
    })

    it('returns true for equal objects', () => {
      const obj1 = { key: 'value' }
      const obj2 = { key: 'value' }
      expect(_.isEqual(obj1, obj2)).toBeTruthy()
    })

    it('returns true for equal objects B', () => {
      const obj1 = { key: 'value' }
      const obj2 = obj1
      expect(_.isEqual(obj1, obj2)).toBeTruthy()
    })

    it('returns false for non-equal objects', () => {
      const obj1 = { key: 'value1' }
      const obj2 = { key: 'value2' }
      expect(_.isEqual(obj1, obj2)).toBeFalsy()
    })
  })

  describe('notEquals function', () => {
    it('returns false for equal strings', () => {
      expect(_.notEquals('abc', 'abc')).toBeFalsy()
    })

    it('returns true for non-equal strings', () => {
      expect(_.notEquals('abc', 'def')).toBeTruthy()
    })

    it('returns false for equal numbers', () => {
      expect(_.notEquals(123, 123)).toBeFalsy()
    })

    it('returns true for non-equal numbers', () => {
      expect(_.notEquals(123, 456)).toBeTruthy()
    })

    it('returns false for equal objects', () => {
      const obj1 = { key: 'value' }
      const obj2 = { key: 'value' }
      expect(_.notEquals(obj1, obj2)).toBeFalsy()
    })

    it('returns true for non-equal objects', () => {
      const obj1 = { key: 'value1' }
      const obj2 = { key: 'value2' }
      expect(_.notEquals(obj1, obj2)).toBeTruthy()
    })
  })

  describe('isPrimitive function', () => {
    it('returns true for string', () => {
      expect(_.isPrimitive('abc')).toBeTruthy()
    })

    it('returns true for number', () => {
      expect(_.isPrimitive(123)).toBeTruthy()
    })

    it('returns true for boolean', () => {
      expect(_.isPrimitive(true)).toBeTruthy()
      expect(_.isPrimitive(false)).toBeTruthy()
    })

    it('returns true for null', () => {
      expect(_.isPrimitive(null)).toBeTruthy()
    })

    it('returns true for undefined', () => {
      expect(_.isPrimitive(undefined)).toBeTruthy()
    })

    it('returns false for object', () => {
      expect(_.isPrimitive({ key: 'value' })).toBeFalsy()
    })

    it('returns false for array', () => {
      expect(_.isPrimitive([1, 2, 3])).toBeFalsy()
    })

    it('returns false for function', () => {
      expect(_.isPrimitive(() => {})).toBeFalsy()
    })

    // TODO: 完善测试用例
  })

  describe('isDefined function', () => {
    it('returns false for null', () => {
      expect(_.isDefined(null)).toBeFalsy()
    })

    it('returns false for undefined', () => {
      expect(_.isDefined(undefined)).toBeFalsy()
    })

    it('returns true for non-empty string', () => {
      expect(_.isDefined('abc')).toBeTruthy()
    })

    it('returns true for number', () => {
      expect(_.isDefined(123)).toBeTruthy()
    })

    it('returns true for object', () => {
      expect(_.isDefined({ key: 'value' })).toBeTruthy()
    })
  })
})
