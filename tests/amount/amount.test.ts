import { describe, expect, it } from 'vitest'
import amount from '../../src/amount/amount'

describe('amount function', () => {
  // 基础功能测试
  describe('基础功能', () => {
    it('不可变性：操作应返回新实例', () => {
      const a = amount(10)
      const b = a.add(5)
      expect(a.value).toBe(10)
      expect(b.value).toBe(15)
    })

    it('实例检查：使用 new 创建实例', () => {
      const a = amount(10)
      expect(a).toBeInstanceOf(amount)
    })

    it('实例检查：直接调用返回新实例', () => {
      const a = amount(10)
      const b = amount(10)
      expect(a).not.toBe(b)
    })

    it('实例检查：返回值为对象类型', () => {
      const a = amount(10)
      expect(typeof a).toBe('object')
      expect(a.value).toBe(10)
    })

    it('接受数字输入', () => {
      expect(amount(10).value).toBe(10)
    })

    it('接受字符串输入', () => {
      expect(amount('10').value).toBe(10)
    })

    it('处理货币字符串', () => {
      expect(amount('$10').value).toBe(10)
    })

    it('处理带逗号的字符串', () => {
      expect(amount('$1,000').value).toBe(1000)
    })

    it('过滤非法字符', () => {
      expect(amount('$10abc').value).toBe(10)
    })

    it('处理负数', () => {
      expect(amount('-10').value).toBe(-10)
    })

    it('处理括号负数格式', () => {
      expect(amount('(10)').value).toBe(-10)
    })

    it('无效输入返回 0', () => {
      expect(amount(null as unknown as number).value).toBe(0)
    })

    it('错误输入时抛出异常', () => {
      expect(() => amount(undefined as unknown as number, { errorOnInvalid: true })).toThrow('Invalid Input')
    })
  })

  // 数值操作测试
  describe('数值操作', () => {
    it('加法', () => {
      expect(amount(2.51).add(0.01).value).toBe(2.52)
    })

    it('减法', () => {
      expect(amount(2.52).subtract(0.01).value).toBe(2.51)
    })

    it('乘法', () => {
      expect(amount(0.1).multiply(0.2).value).toBe(0.02)
    })

    it('除法', () => {
      expect(amount(0.3).divide(0.1).value).toBe(3)
    })

    it('正确处理浮点数精度', () => {
      expect(amount(0.07).multiply(100).value).toBe(7)
    })

    it('半入半出舍入', () => {
      expect(amount(1.555).multiply(100).value).toBe(156)
    })

    it('distribute 方法平均分配', () => {
      const result = amount(10).distribute(3)
      expect(result.length).toBe(3)
      expect(result[0].value + result[1].value + result[2].value).toBe(10)
    })

    it('distribute 方法处理剩余分', () => {
      const result = amount(10).distribute(3)
      expect(result[0].value).toBe(3.34)
      expect(result[1].value).toBe(3.33)
      expect(result[2].value).toBe(3.33)
    })
  })

  // 属性访问测试
  describe('属性访问', () => {
    it('value 属性返回小数值', () => {
      expect(amount(10).value).toBe(10)
    })

    it('intValue 属性返回整数值', () => {
      expect(amount(10.99).intValue).toBe(1099)
    })

    it('dollars 方法返回整数部分', () => {
      expect(amount(123.45).dollars()).toBe(123)
    })

    it('cents 方法返回小数部分', () => {
      expect(amount(123.45).cents()).toBe(45)
    })
  })

  // 精度测试
  describe('精度', () => {
    it('默认精度为 2 位小数', () => {
      expect(amount(10.1234).value).toBe(10.12)
    })

    it('支持自定义精度', () => {
      expect(amount(10.1234, { precision: 4 }).value).toBe(10.1234)
    })

    it('支持高进度', () => {
      expect(amount(10.123456789, { precision: 8 }).value).toBe(10.12345679)
    })

    it('混合精度运算', () => {
      const a = amount(10, { precision: 4 })
      const b = amount(10.12345, { precision: 4 })
      expect(a.add(b).value).toBe(20.1235)
    })
  })

  // 格式测试
  describe('格式化', () => {
    it('默认格式使用 ¥ 符号', () => {
      expect(amount(1000).format()).toBe('¥1,000.00')
    })

    it('负数格式', () => {
      expect(amount(-1000).format()).toBe('-¥1,000.00')
    })

    it('自定义符号', () => {
      expect(amount(1000, { symbol: '$' }).format()).toBe('$1,000.00')
    })

    it('自定义千位分隔符', () => {
      expect(amount(1000000, { separator: '.' }).format()).toBe('¥1.000.000.00')
    })

    it('自定义小数点', () => {
      expect(amount(10.5, { decimal: ',' }).format()).toBe('¥10,50')
    })

    it('自定义模式', () => {
      expect(amount(1000, { pattern: '# !' }).format()).toBe('1,000.00 ¥')
    })

    it('自定义负数模式', () => {
      expect(amount(-1000, { negativePattern: '# !-' }).format()).toBe('1,000.00 ¥-')
    })

    it('欧元格式示例', () => {
      expect(amount(1234.567, { symbol: '€', decimal: ',', separator: '.' }).format()).toBe('€1.234,57')
    })

    it('格式函数自定义', () => {
      const result = amount(1000).format((v, _) => `$${v.value}`)
      expect(result).toBe('$1000')
    })
  })

  // 增量舍入测试
  describe('增量舍入', () => {
    it('默认增量 0.01', () => {
      expect(amount(10.555).multiply(1).value).toBe(10.56)
    })

    it('自定义增量 0.05', () => {
      const amt = amount(10.55, { increment: 0.05 })
      expect(amt.multiply(1).value).toBe(10.55)
      expect(amt.add(0.05).value).toBe(10.6)
    })

    it('任意舍入增量', () => {
      expect(amount(10.52, { increment: 0.1 }).add(0.04).value).toBe(10.56)
    })
  })

  // 其他测试
  describe('其他功能', () => {
    it('toString 方法', () => {
      expect(amount(10).toString()).toBe('10.00')
    })

    it('toJSON 方法', () => {
      expect(amount(10).toJSON()).toBe(10)
    })

    it('接受 currency 对象输入', () => {
      const a = amount(10)
      const b = amount(a)
      expect(b.value).toBe(10)
    })

    it('fromCents 选项', () => {
      expect(amount(100, { fromCents: true }).value).toBe(1)
    })

    it('从分创建并格式化', () => {
      expect(amount(1000, { fromCents: true, symbol: '$' }).format()).toBe('$10.00')
    })

    it('处理分格式的输入字符串', () => {
      expect(amount('100', { fromCents: true }).value).toBe(1)
    })
  })
})
