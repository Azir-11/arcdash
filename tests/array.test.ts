import { describe, expect, it } from 'vitest'
import * as _ from '../src'

describe('array module', () => {
  describe('formatArrayToString', () => {
    it('单个元素', () => {
      expect(_.formatArrayToString(['only'])).toBe('only')
    })

    it('单个元素带连接符', () => {
      expect(_.formatArrayToString(['only'], { separator: '-' })).toBe('only')
    })

    it('空数组', () => {
      expect(_.formatArrayToString([])).toBe('')
    })

    it('空数组带连接符', () => {
      expect(_.formatArrayToString([], { separator: '-' })).toBe('')
    })

    it('含有 null 和 undefined 元素', () => {
      expect(_.formatArrayToString(['a', null, 'b', undefined, 'c'])).toBe('abc')
    })

    it('含有 null 和 undefined 元素带连接符', () => {
      expect(_.formatArrayToString(['a', null, 'b', undefined, 'c'], { separator: '-' })).toBe('a-b-c')
    })

    it('全是null', () => {
      expect(_.formatArrayToString([null, null, null], { separator: '-' })).toBe('')
    })

    it('全是undefined', () => {
      expect(_.formatArrayToString([undefined, undefined, undefined], { separator: '-' })).toBe('')
    })

    it('含有字符串和数字元素', () => {
      expect(_.formatArrayToString(['a', 1, 'b', 2, 'c'])).toBe('a1b2c')
    })

    it('含有字符串和数字元素带连接符', () => {
      expect(_.formatArrayToString(['a', 1, 'b', 2, 'c'], { separator: '-' })).toBe('a-1-b-2-c')
    })

    it('单元素 + 连接符', () => {
      expect(_.formatArrayToString(['a'], { separator: '-' })).toBe('a')
    })

    it('使用转换函数', () => {
      expect(_.formatArrayToString([1, 2, 3], { fn: item => `#${item}` })).toBe('#1#2#3')
    })

    it('使用转换函数和连接符', () => {
      expect(_.formatArrayToString([1, 2, 3], { separator: '-', fn: item => `#${item}` })).toBe('#1-#2-#3')
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
            },
          ],
        },
        {
          sortable: true,
          field: 'order_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 2,
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
        },
        {
          sortable: true,
          field: 'order_type_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 1,
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
            },
          ],
        },
        {
          sortable: true,
          field: 'order_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 2,
        },
      ]

      expect(result).toStrictEqual(shoutBe)
    })

    it('多层数组，都包含children', () => {
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
              title: '单据类型1',
              fixed: 'left',
              minWidth: 180,
              order: 2,
            },
          ],
        },
        {
          sortable: true,
          field: 'order_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 2,
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
          childrenList: [
            {
              sortable: true,
              field: 'order_type_name',
              title: '单据类型2',
              fixed: 'right',
              minWidth: 200,
              order: 1,
            },
          ],
        },
        {
          sortable: true,
          field: 'order_type_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 1,
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
              field: 'order_type_name',
              title: '单据类型2',
              fixed: 'right',
              minWidth: 200,
              order: 1,
            },
          ],
        },
        {
          sortable: true,
          field: 'order_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 2,
        },
      ]

      expect(result).toStrictEqual(shoutBe)
    })

    // 以第一个数组为本
    it('第一个数组为空', () => {
      const remoteColumn = [
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
              title: '单据类型1',
              fixed: 'left',
              minWidth: 180,
              order: 2,
            },
          ],
        },
        {
          sortable: true,
          field: 'order_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 2,
        },
      ]

      const result = _.mergeArraysByKeyValue([], remoteColumn, 'field')

      expect(result).toStrictEqual([])
    })

    // 第二个数组有没有没关系
    it('第二个数组为空', () => {
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
              title: '单据类型1',
              fixed: 'left',
              minWidth: 180,
              order: 2,
            },
          ],
        },
        {
          sortable: true,
          field: 'order_name',
          title: '单据类型',
          fixed: 'left',
          minWidth: 180,
          order: 2,
        },
      ]

      const result = _.mergeArraysByKeyValue(localColumn, [], 'field')

      expect(result).toStrictEqual(localColumn)
    })

    it('单个方法，不丢失', () => {
      const Array1 = [
        {
          field: 'function',
          fun: () => {
            return 'function'
          },
        },
      ]

      const result = _.mergeArraysByKeyValue(Array1, [], 'function')

      expect(result[0].fun()).toStrictEqual('function')
    })

    it('合并方法，执行第二个', () => {
      const Array1 = [
        {
          field: 'function',
          fun: () => {
            return 'function1'
          },
        },
      ]

      const Array2 = [
        {
          field: 'function',
          fun: () => {
            return 'function2'
          },
        },
      ]

      const result = _.mergeArraysByKeyValue(Array1, Array2, 'function')

      expect(result[0].fun()).toStrictEqual('function2')
    })

    it('都有方法，但是第二个被JSON序列化影响了', () => {
      const Array1 = [
        {
          field: 'function',
          fun: () => {
            return 'function1'
          },
        },
      ]

      const Array2 = [
        {
          field: 'function',
          fun: () => {
            return 'function2'
          },
        },
      ]

      const result = _.mergeArraysByKeyValue(Array1, JSON.parse(JSON.stringify(Array2)), 'function')

      // 这里除了fun和field，其他普通属性都是第二个的，上面已经测过了，这里就不用测了
      expect(result).toStrictEqual(Array1)
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

  describe('map function', () => {
    it("returns callback not return",()=>{
      const arr=[{ids:1},{id:3},{ids:2}]
      const result=_.map(arr,(item,index,array)=>{
        if(item.ids){
          return item
        }
      })

      expect(result).toStrictEqual([{ids:1},{ids:2}])
    })

    it('returns undefined for empty array', () => {
      const result = _.map([],()=>{})
      expect(result).toStrictEqual([])
    })
  })
})
