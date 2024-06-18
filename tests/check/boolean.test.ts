import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('isBoolean', () => {
  it('returns true for true', () => {
    const result = _.isBoolean(true)

    expect(result).toBeTruthy()
  })

  it('returns true for false', () => {
    const result = _.isBoolean(false)

    expect(result).toBeTruthy()
  })

  it('returns false for string', () => {
    const result = _.isBoolean('true')

    expect(result).toBeFalsy()
  })

  it('returns false for number', () => {
    const result = _.isBoolean(1)

    expect(result).toBeFalsy()
  })

  it('returns false for object', () => {
    const result = _.isBoolean({})

    expect(result).toBeFalsy()
  })

  it('returns false for array', () => {
    const result = _.isBoolean([])

    expect(result).toBeFalsy()
  })

  it('returns false for function', () => {
    const result = _.isBoolean(() => {})

    expect(result).toBeFalsy()
  })

  it('returns false for null', () => {
    const result = _.isBoolean(null)

    expect(result).toBeFalsy()
  })

  it('returns false for undefined', () => {
    const result = _.isBoolean(undefined)

    expect(result).toBeFalsy()
  })

  it('returns false for NaN', () => {
    const result = _.isBoolean(Number.NaN)

    expect(result).toBeFalsy()
  })
})
