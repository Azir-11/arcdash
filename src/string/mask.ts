export interface MaskOptions {
  prefixLen?: number
  suffixLen?: number
  minMaskLen?: number
  minVisibleLen?: number
  position?: 'front' | 'middle' | 'back'
}

/**
 * 对字符串进行数据脱敏处理，将指定位置的字符替换为掩码字符（*）。/n
 *
 * 脱敏规则：
 * 1. 字符串为空时直接返回空字符串。
 * 2. 长度为 1 的字符串始终返回 '*'（密文优先级高于明文）。
 * 3. position 决定掩码区域：'front'（前部掩码）、'middle'（中部掩码）、'back'（后部掩码）。
 * 4. prefixLen / suffixLen 控制前后保留的明文位数（默认各 2）。
 * 5. minMaskLen 控制至少需要的密文位数（默认 1），当明文位数与密文位数冲突时，密文优先。
 * 6. minVisibleLen 控制至少需要保留的明文位数（默认 1），当与 minMaskLen 冲突时，minMaskLen 优先。
 *
 * @title mask
 *
 * @param {string | number} value - 需要脱敏的字符串或数字。
 * @param {MaskOptions} [options] - 脱敏配置选项。
 * @returns {string} 脱敏后的字符串。
 *
 * @example
 * import { mask } from 'arcdash'
 *
 * mask('13812345678')                                          // '13*******78'
 * mask('13812345678', { position: 'front', suffixLen: 4 })    // '*******5678'
 * mask('13812345678', { position: 'back', prefixLen: 4 })     // '1381*******'
 * mask('13812345678', { prefixLen: 3, suffixLen: 4 })         // '138****5678'
 * mask('张三', { minMaskLen: 3 })                              // '**'
 * mask('张三', { minMaskLen: 3, minVisibleLen: 0 })            // '**'
 * mask(12345678)                                              // '12****78'
 */
export function mask(value: string | number, options?: MaskOptions): string {
  const str = String(value)
  const len = str.length

  if (len === 0)
    return str

  const {
    prefixLen = 2,
    suffixLen = 2,
    minMaskLen = 1,
    minVisibleLen = 1,
    position = 'middle',
  } = options ?? {}

  if (len === 1)
    return minMaskLen > 0 ? '*'.repeat(minMaskLen) : str

  // 根据 position 计算初始明文保留长度
  let p = position !== 'front' ? prefixLen : 0
  let s = position !== 'back' ? suffixLen : 0

  // 约束一（最高优先级）：为密文保留至少 minMaskLen 位，即 p + s ≤ len - minMaskLen
  const maxVisible = Math.max(len - minMaskLen, 0)
  if (p + s > maxVisible) {
    if (position === 'front') {
      s = maxVisible
    }
    else if (position === 'back') {
      p = maxVisible
    }
    else {
      // 均衡削减两侧，超出部分由 p 兜底
      const excess = p + s - maxVisible
      const fromP = Math.min(p, Math.ceil(excess / 2))
      p -= fromP
      const fromS = Math.min(s, excess - fromP)
      s -= fromS
      p -= excess - fromP - fromS
    }
  }

  // 约束二（软约束）：明文至少保留 minVisibleLen 位，受约束一上限制约
  const effectiveMinVisible = Math.min(minVisibleLen, maxVisible)
  if (p + s < effectiveMinVisible) {
    const deficit = effectiveMinVisible - p - s
    if (position === 'back') {
      p += deficit
    }
    else if (position === 'front') {
      s += deficit
    }
    else {
      // 均衡补充两侧，剩余给 s
      const addToP = Math.min(p, Math.ceil(deficit / 2))
      p += addToP
      s = effectiveMinVisible - p
    }
  }

  const maskLen = len - p - s
  return str.slice(0, p) + '*'.repeat(maskLen) + str.slice(len - s)
}
