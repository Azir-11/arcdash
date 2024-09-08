import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

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
