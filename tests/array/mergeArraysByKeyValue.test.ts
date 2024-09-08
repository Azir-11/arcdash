import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

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
