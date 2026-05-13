import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('mask function', () => {
  describe('基本功能', () => {
    it('默认脱敏：保留前2后2，中间用*替换', () => {
      expect(_.mask('13812345678')).toBe('13*******78')
    })

    it('接受数字输入并转为字符串处理', () => {
      expect(_.mask(13812345678)).toBe('13*******78')
    })

    it('空字符串返回空字符串', () => {
      expect(_.mask('')).toBe('')
    })
  })

  describe('position: middle（默认）', () => {
    it('默认保留前2后2', () => {
      expect(_.mask('abcdefghij')).toBe('ab******ij')
    })

    it('自定义 prefixLen 和 suffixLen', () => {
      expect(_.mask('13812345678', { prefixLen: 3, suffixLen: 4 })).toBe('138****5678')
    })

    it('prefixLen 为 0', () => {
      expect(_.mask('12345678', { prefixLen: 0 })).toBe('******78')
    })

    it('suffixLen 为 0', () => {
      expect(_.mask('12345678', { suffixLen: 0 })).toBe('12******')
    })

    it('prefixLen 和 suffixLen 都为 0 时保留 1 位明文', () => {
      expect(_.mask('12345678', { prefixLen: 0, suffixLen: 0 })).toBe('*******8')
    })

    it('prefixLen 和 suffixLen 都为 0 且 minVisibleLen=0 时全部脱敏', () => {
      expect(_.mask('12345678', { prefixLen: 0, suffixLen: 0, minVisibleLen: 0 })).toBe('********')
    })
  })

  describe('position: front', () => {
    it('前部用*替换，尾部保留明文', () => {
      expect(_.mask('13812345678', { position: 'front' })).toBe('*********78')
    })

    it('自定义 suffixLen', () => {
      expect(_.mask('13812345678', { position: 'front', suffixLen: 3 })).toBe('********678')
    })

    it('suffixLen 为 0 时保留 1 位明文', () => {
      expect(_.mask('12345678', { position: 'front', suffixLen: 0 })).toBe('*******8')
    })

    it('suffixLen 为 0 且 minVisibleLen=0 时全部脱敏', () => {
      expect(_.mask('12345678', { position: 'front', suffixLen: 0, minVisibleLen: 0 })).toBe('********')
    })
  })

  describe('position: back', () => {
    it('尾部用*替换，前部保留明文', () => {
      expect(_.mask('13812345678', { position: 'back' })).toBe('13*********')
    })

    it('自定义 prefixLen', () => {
      expect(_.mask('13812345678', { position: 'back', prefixLen: 5 })).toBe('13812******')
    })

    it('prefixLen 为 0 时保留 1 位明文', () => {
      expect(_.mask('12345678', { position: 'back', prefixLen: 0 })).toBe('1*******')
    })

    it('prefixLen 为 0 且 minVisibleLen=0 时全部脱敏', () => {
      expect(_.mask('12345678', { position: 'back', prefixLen: 0, minVisibleLen: 0 })).toBe('********')
    })
  })

  describe('minMaskLen（最小密文位数）', () => {
    it('默认 minMaskLen 为 1', () => {
      expect(_.mask('abc', { prefixLen: 1, suffixLen: 1 })).toBe('a*c')
    })

    it('minMaskLen 大于实际掩码位数时增加掩码', () => {
      expect(_.mask('abcdefghij', { prefixLen: 4, suffixLen: 4, minMaskLen: 4 })).toBe('abc****hij')
    })

    it('minMaskLen 与 position: front 配合', () => {
      expect(_.mask('12345678', { position: 'front', suffixLen: 2, minMaskLen: 4 })).toBe('******78')
    })

    it('minMaskLen 与 position: back 配合', () => {
      expect(_.mask('12345678', { position: 'back', prefixLen: 2, minMaskLen: 4 })).toBe('12******')
    })

    it('minMaskLen 为 0 不影响结果', () => {
      expect(_.mask('12345678', { minMaskLen: 0 })).toBe('12****78')
    })
  })

  describe('minVisibleLen（最少保留明文位数）', () => {
    describe('position: middle', () => {
      it('默认 minVisibleLen 为 1，prefixLen=0, suffixLen=0 时保留 1 位', () => {
        expect(_.mask('12345678', { prefixLen: 0, suffixLen: 0 })).toBe('*******8')
      })

      it('minVisibleLen=0 时可以全部脱敏', () => {
        expect(_.mask('12345678', { prefixLen: 0, suffixLen: 0, minVisibleLen: 0 })).toBe('********')
      })

      it('minVisibleLen=2 时保留至少 2 位明文', () => {
        expect(_.mask('12345678', { prefixLen: 0, suffixLen: 0, minVisibleLen: 2 })).toBe('******78')
      })

      it('明文已经满足 minVisibleLen 时不变', () => {
        expect(_.mask('12345678', { prefixLen: 2, suffixLen: 2, minVisibleLen: 1 })).toBe('12****78')
      })
    })

    describe('position: front', () => {
      it('minVisibleLen=3 时保留至少 3 位尾部明文', () => {
        expect(_.mask('12345678', { position: 'front', suffixLen: 0, minVisibleLen: 3 })).toBe('*****678')
      })

      it('suffixLen 已满足 minVisibleLen 时不变', () => {
        expect(_.mask('12345678', { position: 'front', suffixLen: 4, minVisibleLen: 2 })).toBe('****5678')
      })
    })

    describe('position: back', () => {
      it('minVisibleLen=3 时保留至少 3 位前部明文', () => {
        expect(_.mask('12345678', { position: 'back', prefixLen: 0, minVisibleLen: 3 })).toBe('123*****')
      })

      it('prefixLen 已满足 minVisibleLen 时不变', () => {
        expect(_.mask('12345678', { position: 'back', prefixLen: 4, minVisibleLen: 2 })).toBe('1234****')
      })
    })

    describe('与 minMaskLen 交互', () => {
      it('minMaskLen=3, minVisibleLen=1，字符串足够长', () => {
        expect(_.mask('abcdefgh', { prefixLen: 2, suffixLen: 2, minMaskLen: 3, minVisibleLen: 1 })).toBe('ab****gh')
      })

      it('minMaskLen=3, minVisibleLen=0', () => {
        expect(_.mask('abcdefgh', { prefixLen: 2, suffixLen: 2, minMaskLen: 3, minVisibleLen: 0 })).toBe('ab****gh')
      })

      it('minMaskLen 和 minVisibleLen 都很大但字符串短，minMaskLen 优先', () => {
        expect(_.mask('abc', { prefixLen: 1, suffixLen: 1, minMaskLen: 3, minVisibleLen: 2 })).toBe('***')
      })

      it('minMaskLen 优先级高于 minVisibleLen', () => {
        expect(_.mask('abcdef', { prefixLen: 2, suffixLen: 2, minMaskLen: 4, minVisibleLen: 4 })).toBe('a****f')
      })
    })

    describe('实际场景', () => {
      it('姓名脱敏：张三，密文优先', () => {
        expect(_.mask('张三', { minMaskLen: 3, prefixLen: 1, suffixLen: 0 })).toBe('**')
      })

      it('姓名脱敏：张三，minVisibleLen=0', () => {
        expect(_.mask('张三', { minMaskLen: 3, prefixLen: 1, suffixLen: 0, minVisibleLen: 0 })).toBe('**')
      })

      it('姓名脱敏：欧阳某某', () => {
        expect(_.mask('欧阳某某', { prefixLen: 1, suffixLen: 0 })).toBe('欧***')
      })

      it('短字符串，minMaskLen 优先', () => {
        expect(_.mask('12345', { prefixLen: 1, suffixLen: 1, minMaskLen: 3 })).toBe('1***5')
      })
    })
  })

  describe('短字符串处理', () => {
    it('单字符字符串', () => {
      expect(_.mask('a')).toBe('*')
    })

    it('两字符字符串', () => {
      expect(_.mask('ab')).toBe('*b')
    })

    it('三字符字符串，默认选项', () => {
      expect(_.mask('abc')).toBe('a*c')
    })

    it('四字符字符串，默认选项', () => {
      expect(_.mask('abcd')).toBe('a*cd')
    })

    it('五字符字符串，默认选项', () => {
      expect(_.mask('abcde')).toBe('ab*de')
    })
  })

  describe('长字符串', () => {
    it('身份证号码脱敏', () => {
      expect(_.mask('110101199003074519', { prefixLen: 3, suffixLen: 4 })).toBe('110***********4519')
    })

    it('银行卡号脱敏', () => {
      expect(_.mask('6222021234567890123', { prefixLen: 4, suffixLen: 4 })).toBe('6222***********0123')
    })

    it('邮箱地址脱敏', () => {
      expect(_.mask('test@example.com', { prefixLen: 2, suffixLen: 4 })).toBe('te**********.com')
    })

    it('手机号脱敏', () => {
      expect(_.mask('13800138000')).toBe('13*******00')
    })
  })

  describe('边界情况', () => {
    it('prefixLen + suffixLen >= 字符串长度时减少保留位', () => {
      expect(_.mask('abc', { prefixLen: 2, suffixLen: 2 })).toBe('a*c')
    })

    it('prefixLen 超过字符串长度时自动调整', () => {
      expect(_.mask('abc', { prefixLen: 10 })).toBe('ab*')
    })

    it('suffixLen 超过字符串长度时自动调整', () => {
      expect(_.mask('abc', { suffixLen: 10 })).toBe('*bc')
    })

    it('无选项时使用全部默认值', () => {
      expect(_.mask('1234567890')).toBe('12******90')
    })

    it('options 为空对象', () => {
      expect(_.mask('1234567890', {})).toBe('12******90')
    })
  })

  describe('数值类型输入', () => {
    it('整数', () => {
      expect(_.mask(12345678)).toBe('12****78')
    })

    it('大数', () => {
      expect(_.mask(9876543210)).toBe('98******10')
    })

    it('0', () => {
      expect(_.mask(0)).toBe('*')
    })

    it('负数', () => {
      expect(_.mask(-12345)).toBe('-1**45')
    })
  })

  describe('位置与短字符串组合', () => {
    it('front + 短字符串', () => {
      expect(_.mask('abc', { position: 'front' })).toBe('*bc')
    })

    it('back + 短字符串', () => {
      expect(_.mask('abc', { position: 'back' })).toBe('ab*')
    })

    it('front + suffixLen >= len', () => {
      expect(_.mask('abc', { position: 'front', suffixLen: 5 })).toBe('*bc')
    })

    it('back + prefixLen >= len', () => {
      expect(_.mask('abc', { position: 'back', prefixLen: 5 })).toBe('ab*')
    })
  })
})
