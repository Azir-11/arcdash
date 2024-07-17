import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('lang common module', () => {
  describe('isObject function', () => {
    it('returns false for null', () => {
      const result = _.isObject(null)

      expect(result).toBe(false)
    })

    it('returns false for undefined', () => {
      const result = _.isObject(undefined)

      expect(result).toBe(false)
    })

    it('returns false for boolean', () => {
      const result = _.isObject(false)

      expect(result).toBe(false)
    })

    it('returns false for class instance', () => {
      class Data {}
      const result = _.isObject(new Data())

      expect(result).toBe(false)
    })

    it('returns false for number', () => {
      const result = _.isObject(22)

      expect(result).toBe(false)
    })

    it('returns false for string', () => {
      const result = _.isObject('abc')

      expect(result).toBe(false)
    })

    it('returns false for array', () => {
      const result = _.isObject([1, 2, 3])

      expect(result).toBe(false)
    })

    it('returns true for object', () => {
      const result = _.isObject({})

      expect(result).toBe(true)
    })
  })

  describe('isSymbol function', () => {
    it('returns false for null', () => {
      const input = null
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for undefined', () => {
      const input = undefined
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for empty class instance', () => {
      class Data {}
      const input = new Data()
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for class instance with properties', () => {
      class Data {
        name: string = 'ray'
      }
      const input = new Data()
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for number greater than 0', () => {
      const input = 22
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for number 0', () => {
      const input = 0
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for array with values', () => {
      const input = [1, 2, 3]
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for empty array', () => {
      const input: unknown[] = []
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for true', () => {
      const input = true
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for false', () => {
      const input = false
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for empty object', () => {
      const input = {}
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for object with values', () => {
      const input = { name: 'x' }
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for string with chars', () => {
      const input = 'abc'
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for empty string', () => {
      const input = ''
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for empty string class', () => {
      const input = ''
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for string class with chars', () => {
      const input = 'abc'
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns false for empty Map', () => {
      const input = new Map()
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })

    it('returns true for empty Symbol', () => {
      const input = Symbol('')
      const result = _.isSymbol(input)

      expect(result).toBe(true)
    })

    it('returns true for Symbol instance', () => {
      const input = Symbol('hello')
      const result = _.isSymbol(input)

      expect(result).toBe(true)
    })

    it('returns false for Map with values', () => {
      const input = new Map()
      input.set('a', 1)
      input.set('b', 2)
      input.set('c', 3)
      const result = _.isSymbol(input)

      expect(result).toBe(false)
    })
  })

  describe('isFunction function', () => {
    it('returns false for null', () => {
      const result = _.isFunction(null)

      expect(result).toBe(false)
    })

    it('returns false for undefined', () => {
      const result = _.isFunction(undefined)

      expect(result).toBe(false)
    })

    it('returns false for boolean', () => {
      const result = _.isFunction(false)

      expect(result).toBe(false)
    })

    it('returns false for class instance', () => {
      class Data {}
      const result = _.isFunction(new Data())

      expect(result).toBe(false)
    })

    it('returns false for number', () => {
      const result = _.isFunction(22)

      expect(result).toBe(false)
    })

    it('returns false for string', () => {
      const result = _.isFunction('abc')

      expect(result).toBe(false)
    })

    it('returns false for array', () => {
      const result = _.isFunction([1, 2, 3])

      expect(result).toBe(false)
    })

    it('returns false for object', () => {
      const result = _.isFunction({})

      expect(result).toBe(false)
    })

    it('returns true for anonymous function', () => {
      const result = _.isFunction(() => {
        return 'hello'
      })

      expect(result).toBe(true)
    })

    it('returns true for arrow function', () => {
      const result = _.isFunction(() => {
        return 'hello'
      })

      expect(result).toBe(true)
    })

    it('returns true for named function', () => {
      function sayHello() {
        return 'hello'
      }
      const result = _.isFunction(sayHello)

      expect(result).toBe(true)
    })
  })

  describe('isDate function', () => {
    it('return true for Date values', () => {
      expect(_.isDate(new Date())).toBe(true)
      expect(_.isDate(new Date('2022-09-01T02:19:55.976Z'))).toBe(true)
      expect(_.isDate(new Date('invalid value'))).toBe(true)
    })

    it('return false for non-Date values', () => {
      expect(_.isDate(22)).toBe(false)
      expect(_.isDate({ name: 'x' })).toBe(false)
      expect(_.isDate('abc')).toBe(false)
      expect(_.isDate(String('abc'))).toBe(false)
      expect(_.isDate([1, 2, 3])).toBe(false)
      expect(_.isDate(() => {})).toBe(false)
      expect(_.isDate(() => {})).toBe(false)
      expect(_.isDate(Symbol(''))).toBe(false)
      expect(_.isDate(Symbol('hello'))).toBe(false)
    })
  })

  describe('isPromise function', () => {
    it('return true for Promise values', () => {
      expect(_.isPromise(new Promise(res => res(0)))).toBe(true)
      expect(_.isPromise(new Promise(res => res('')))).toBe(true)
      expect(_.isPromise((async () => {})())).toBe(true)
    })

    it('return false for non-Date values', () => {
      expect(_.isPromise(22)).toBe(false)
      expect(_.isPromise({ name: 'x' })).toBe(false)
      expect(_.isPromise('abc')).toBe(false)
      expect(_.isPromise(String('abc'))).toBe(false)
      expect(_.isPromise([1, 2, 3])).toBe(false)
      expect(_.isPromise(() => {})).toBe(false)
      expect(_.isPromise(() => {})).toBe(false)
      expect(_.isPromise(Symbol(''))).toBe(false)
      expect(_.isPromise(Symbol('hello'))).toBe(false)
      expect(_.isPromise({ then: 2 })).toBe(false)
    })
  })
})
