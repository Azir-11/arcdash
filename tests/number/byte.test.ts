import { describe, expect, it } from 'vitest'
import * as _ from '../../src'

describe('bytes module', () => {
  describe('convertBytes', () => {
    it('throws error when size is NaN', () => {
      expect(() => _.convertBytes(Number.NaN, 'B', 'B')).toThrow('Invalid size: NaN')
    })

    it('0 B to B', () => {
      expect(_.convertBytes(0, 'B', 'B')).toBe('0.00 B')
    })

    it('1024 B to KB', () => {
      expect(_.convertBytes(1024, 'B', 'KB')).toBe('1.00 KB')
    })

    it('1536 B to KB', () => {
      expect(_.convertBytes(1536, 'B', 'KB')).toBe('1.50 KB')
    })

    it('1048576 B to MB', () => {
      expect(_.convertBytes(1048576, 'B', 'MB')).toBe('1.00 MB')
    })

    it('1 KB to B', () => {
      expect(_.convertBytes(1, 'KB', 'B')).toBe('1024.00 B')
    })
  })

  describe('covertBytesTo', () => {
    it('throws error when size is NaN', () => {
      expect(() => _.autoConvertBytes(Number.NaN)).toThrow('Invalid size: NaN')
    })

    it('0 B', () => {
      expect(_.convertBytesTo(0, 'B')).toBe('0.00 B')
    })

    it('1024 B', () => {
      expect(_.convertBytesTo(1024, 'B')).toBe('1024.00 B')
    })

    it('1 KB', () => {
      expect(_.convertBytesTo(1024, 'KB')).toBe('1.00 KB')
    })

    it('1.5 KB', () => {
      expect(_.convertBytesTo(1536, 'KB')).toBe('1.50 KB')
    })

    it('1 MB', () => {
      expect(_.convertBytesTo(1048576, 'MB')).toBe('1.00 MB')
    })

    it('accuracy verification', () => {
      expect(_.convertBytesTo(1024, 'MB', 8)).toBe('0.00097656 MB')
    })
  })

  describe('autoConvertBytes', () => {
    it('throws error when size is NaN', () => {
      expect(() => _.autoConvertBytes(Number.NaN)).toThrow('Invalid size: NaN')
    })

    it('0', () => {
      expect(_.autoConvertBytes(0)).toBe('0 B')
    })

    it('1 KB', () => {
      expect(_.autoConvertBytes(1024)).toBe('1.00 KB')
    })

    it('1.5 KB', () => {
      expect(_.autoConvertBytes(1536)).toBe('1.50 KB')
    })

    it('other KB', () => {
      expect(_.autoConvertBytes(121987)).toBe('119.13 KB')
    })

    it('1 MB', () => {
      expect(_.autoConvertBytes(1048576)).toBe('1.00 MB')
    })

    it('1.5 MB', () => {
      expect(_.autoConvertBytes(1572864)).toBe('1.50 MB')
    })

    it('1 GB', () => {
      expect(_.autoConvertBytes(1073741824)).toBe('1.00 GB')
    })

    it('1.5 GB', () => {
      expect(_.autoConvertBytes(1610612736)).toBe('1.50 GB')
    })

    it('1 TB', () => {
      expect(_.autoConvertBytes(1099511627776)).toBe('1.00 TB')
    })

    it('1.5 TB', () => {
      expect(_.autoConvertBytes(1649267441664)).toBe('1.50 TB')
    })

    it('1 PB', () => {
      expect(_.autoConvertBytes(1125899906842624)).toBe('1.00 PB')
    })

    it('1.5 PB', () => {
      expect(_.autoConvertBytes(1688849860263936)).toBe('1.50 PB')
    })

    it('accuracy verification', () => {
      expect(_.autoConvertBytes(1294538.1654528, 7)).toBe('1.2345678 MB')
    })
  })
})
