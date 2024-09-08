import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

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
