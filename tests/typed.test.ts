import { describe, expect, it } from 'vitest'
import * as _ from '../src'

describe('typed module', () => {
  describe('isPrimitive function', () => {
    it('returns true for all the primitives', () => {
      const arr = [
        1.1,
        'How you doing?',
        false,
        Symbol('key'),
        BigInt('1'),
        undefined,
        null,
      ]

      for (const elm of arr)
        expect(_.isPrimitive(elm)).toBe(true)
    })

    it('returns false for non-primitives', () => {
      const arr = [new Date(), Number, {}, Object({}), () => 0, [1, 2]]

      for (const elm of arr)
        expect(_.isPrimitive(elm)).toBe(false)
    })
  })

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

  describe('isEqual function', () => {
    class Person {
      name: string
      friends: Person[] = []
      self?: Person
      constructor(name: string) {
        this.name = name
      }
    }
    const jake = new Person('jake')
    jake.self = jake
    jake.friends = [jake, jake]
    const symbolKey = Symbol('symkey')
    const complex = {
      num: 0,
      str: '',
      boolean: true,
      unf: void 0,
      nul: null,
      obj: { name: 'object', id: 1, children: [0, 1, 2] },
      arr: [0, 1, 2],
      func() {
        // maybe have a function here
      },
      loop: null as any,
      person: jake,
      date: new Date(0),
      reg: new RegExp('/regexp/ig'),
      [symbolKey]: 'symbol',
    }
    complex.loop = complex

    it('returns true for equal things', () => {
      expect(_.isEqual(0, 0)).toBe(true)
      expect(_.isEqual('a', 'a')).toBe(true)

      const hello = Symbol('hello')
      expect(_.isEqual(hello, hello)).toBe(true)
      expect(_.isEqual({}, {})).toBe(true)
      expect(_.isEqual(true, true)).toBe(true)
      expect(_.isEqual(new RegExp(/a*s/), new RegExp(/a*s/))).toBe(true)

      const now = new Date()
      expect(_.isEqual(now, now)).toBe(true)
      expect(_.isEqual([], [])).toBe(true)
      expect(_.isEqual(complex, { ...complex })).toBe(true)
      expect(_.isEqual([complex, complex], [{ ...complex }, { ...complex }])).toBe(true)
    })

    it('returns false for non-equal things', () => {
      expect(_.isEqual(0, 1)).toBe(false)
      expect(_.isEqual('a', 'b')).toBe(false)
      expect(_.isEqual(new RegExp(/^http:/), new RegExp(/https/))).toBe(false)
      expect(_.isEqual(Symbol('hello'), Symbol('goodbye'))).toBe(false)
      expect(_.isEqual({ z: 23 }, { a: 1 })).toBe(false)
      expect(_.isEqual(true, false)).toBe(false)
      expect(_.isEqual(new Date(), new Date('2022-09-01T03:25:12.750Z'))).toBe(false)
      expect(_.isEqual([], [1])).toBe(false)
      expect(_.isEqual(complex, { ...complex, num: 222 })).toBe(false)
      expect(_.isEqual([complex], [{ ...complex, num: 222 }])).toBe(false)
    })
  })
})
