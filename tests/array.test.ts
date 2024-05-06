import { describe, expect, it } from 'vitest'
import * as _ from '../src'

describe('array module', () => {
  describe('joinValues', () => {
    it('单个元素', () => {
      expect(_.joinValues(['only'])).toBe('only')
    })

    it('单个元素带连接符', () => {
      expect(_.joinValues(['only'], '-')).toBe('only')
    })

    it('空数组', () => {
      expect(_.joinValues([])).toBe('')
    })

    it('空数组带连接符', () => {
      expect(_.joinValues([], '-')).toBe('')
    })

    it('含有 null 和 undefined 元素', () => {
      expect(_.joinValues(['a', null, 'b', undefined, 'c'])).toBe('abc')
    })

    it('含有 null 和 undefined 元素带连接符', () => {
      expect(_.joinValues(['a', null, 'b', undefined, 'c'], '-')).toBe('a-b-c')
    })

    it('全是null', () => {
      expect(_.joinValues([null, null, null], '-')).toBe('')
    })

    it('全是undefined', () => {
      expect(_.joinValues([undefined, undefined, undefined], '-')).toBe('')
    })

    it('含有字符串和数字元素', () => {
      expect(_.joinValues(['a', 1, 'b', 2, 'c'])).toBe('a1b2c')
    })

    it('含有字符串和数字元素带连接符', () => {
      expect(_.joinValues(['a', 1, 'b', 2, 'c'], '-')).toBe('a-1-b-2-c')
    })

    it('单元素 + 连接符', () => {
      expect(_.joinValues(['a'], '-')).toBe('a')
    })
  })

  describe('sum function', () => {
    it('正确地添加number数组', () => {
      const list = [5, 5, 10, 2]
      const result = _.sum(list)
      expect(result).toBe(22)
    })

    it('使用 getter fn 添加对象数组', () => {
      const list = [{ value: 5 }, { value: 5 }, { value: 10 }, { value: 2 }]
      const result = _.sum(list, (x: { value: number }) => x.value)
      expect(result).toBe(22)
    })

    it('优雅地处理空数组', () => {
      const result = _.sum(null as unknown as readonly number[])
      expect(result).toBe(0)
    })
  })

  describe('mergeArraysByKeyValue function', () => {
    it('单层数组', () => {
      const localColumn = [
        {
          sortable: true,
          field: 'order_no',
          title: '染整通知单号',
          fixed: 'left',
          minWidth: 100,
          order: 1,
          slots: {},
        },
        {
          sortable: true,
          field: 'order_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 2,
          slots: {},
        },
      ]

      const remoteColumn = [
        {
          sortable: true,
          field: 'order_no',
          title: '染整通知单号',
          fixed: 'right',
          minWidth: 200,
          order: 2,
          slots: {},
        },
        {
          sortable: true,
          field: 'order_type_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 1,
          slots: {},
        },
      ]

      const result = _.mergeArraysByKeyValue(localColumn, remoteColumn, 'field')

      const shouldBe = [
        {
          sortable: true,
          field: 'order_no',
          title: '染整通知单号',
          fixed: 'right',
          minWidth: 200,
          order: 2,
          slots: {},
        },
        {
          sortable: true,
          field: 'order_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 2,
          slots: {},
        },
      ]

      expect(result).toStrictEqual(shouldBe)
    })

    it('多层数组', () => {
      const localColumn = [
        {
          sortable: true,
          field: 'order_no',
          title: '染整通知单号',
          fixed: 'left',
          minWidth: 100,
          order: 1,
          childrenList: [
            {
              sortable: true,
              field: 'order_name',
              title: '单据类型',
              fixed: 'left',
              minWidth: 180,
              order: 2,
              slots: {},
            }
          ],
          slots: {},
        },
        {
          sortable: true,
          field: 'order_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 2,
          slots: {},
        },
      ]

      const remoteColumn = [
        {
          sortable: true,
          field: 'order_no',
          title: '染整通知单号',
          fixed: 'right',
          minWidth: 200,
          order: 2,
          slots: {},
        },
        {
          sortable: true,
          field: 'order_type_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 1,
          slots: {},
        },
      ]

      const result = _.mergeArraysByKeyValue(localColumn, remoteColumn, 'field')

      const shoutBe = [
        {
          sortable: true,
          field: 'order_no',
          title: '染整通知单号',
          fixed: 'right',
          minWidth: 200,
          order: 2,
          childrenList: [
            {
              sortable: true,
              field: 'order_name',
              title: '单据类型',
              fixed: 'left',
              minWidth: 180,
              order: 2,
              slots: {},
            }
          ],
          slots: {},
        },
        {
          sortable: true,
          field: 'order_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 2,
          slots: {},
        },
      ]

      expect(result).toStrictEqual(shoutBe)
    })
  })
})
