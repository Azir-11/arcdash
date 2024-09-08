import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('map function', () => {
  it('returns callback not return', () => {
    const arr = [{ ids: 1 }, { id: 3 }, { ids: 2 }]
    const result = _.map(arr, (item, _index, _array) => {
      if (item.ids) {
        return item
      }
    })

    expect(result).toStrictEqual([{ ids: 1 }, { ids: 2 }])
  })

  it('returns undefined for empty array', () => {
    const result = _.map([], () => {})
    expect(result).toStrictEqual([])
  })
})
