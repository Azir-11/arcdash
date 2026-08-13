import { klona as fullKlona } from "klona/full";
import { klona as jsonKlona } from "klona/json";
import { klona as liteKlona } from "klona/lite";
import { klona } from "klona";

/**
 * 以 JSON 模式深拷贝数据，仅处理 JSON 兼容的数据类型（对象、数组及原始值）。/n
 *
 * 体积最小、速度最快的克隆方式，适用于纯 JSON 数据结构。深拷贝会递归遍历源数据，
 * 复制实际的值而非引用，因此修改副本不会影响源对象。
 *
 * 底层实现来自 [klona](https://github.com/lukeed/klona) 仓库的 `klona/json`。
 *
 * @title jsonClone
 *
 * @param {T} input - 需要深拷贝的源数据。
 * @returns {T} 与源数据深度相等的独立副本。
 *
 * @example
 * import { jsonClone } from 'arcdash'
 *
 * const input = { foo: 1, bar: { baz: 2 } }
 * const output = jsonClone(input)
 *
 * output.bar.baz = 99
 * input.bar.baz // 2（源对象不受影响）
 */
export function jsonClone<T>(input: T): T {
  return jsonKlona(input);
}

/**
 * 以 lite 模式深拷贝数据，在 JSON 类型基础上额外支持 Date、RegExp 与自定义类。/n
 *
 * 相比 `jsonClone` 增加了对时间对象、正则对象与自定义类实例（保留原型）的克隆能力。
 * 深拷贝会递归遍历源数据，复制实际的值而非引用，因此修改副本不会影响源对象。
 *
 * 底层实现来自 [klona](https://github.com/lukeed/klona) 仓库的 `klona/lite`。
 *
 * @title liteClone
 *
 * @param {T} input - 需要深拷贝的源数据。
 * @returns {T} 与源数据深度相等的独立副本。
 *
 * @example
 * import { liteClone } from 'arcdash'
 *
 * const input = { at: new Date(), reg: /foo/gi }
 * const output = liteClone(input)
 *
 * output.at === input.at // false（Date 被克隆为独立实例）
 */
export function liteClone<T>(input: T): T {
  return liteKlona(input);
}

/**
 * 默认模式深拷贝数据，在 lite 类型基础上额外支持 Map、Set、DataView、ArrayBuffer 与 TypedArray。/n
 *
 * 覆盖绝大多数常见数据类型的深拷贝场景。深拷贝会递归遍历源数据，复制实际的值而非引用，
 * 因此修改副本不会影响源对象。
 *
 * 底层实现来自 [klona](https://github.com/lukeed/klona) 仓库的 `klona`。
 *
 * @title clone
 *
 * @param {T} input - 需要深拷贝的源数据。
 * @returns {T} 与源数据深度相等的独立副本。
 *
 * @example
 * import { clone } from 'arcdash'
 *
 * const input = new Map([['a', { n: 1 }]])
 * const output = clone(input)
 *
 * output.get('a') === input.get('a') // false（Map 内部值被深拷贝）
 */
export function clone<T>(input: T): T {
  return klona(input);
}

/**
 * 以 full 模式深拷贝数据，在默认类型基础上额外支持 Symbol 键属性与不可枚举属性。/n
 *
 * 功能最完整、体积最大的克隆方式，会保留属性描述符、Symbol 键以及不可枚举属性。
 * 深拷贝会递归遍历源数据，复制实际的值而非引用，因此修改副本不会影响源对象。
 *
 * 底层实现来自 [klona](https://github.com/lukeed/klona) 仓库的 `klona/full`。
 *
 * @title fullClone
 *
 * @param {T} input - 需要深拷贝的源数据。
 * @returns {T} 与源数据深度相等的独立副本。
 *
 * @example
 * import { fullClone } from 'arcdash'
 *
 * const sym = Symbol('s')
 * const output = fullClone({ [sym]: 1 })
 *
 * output[sym] // 1（Symbol 键属性被保留）
 */
export function fullClone<T>(input: T): T {
  return fullKlona(input);
}

/**
 * 深拷贝数据，支持对象、数组、Map、Set、Date、RegExp 及 TypedArray 等常见类型。/n
 *
 * 此函数是 `clone` 的别名，行为完全一致。深拷贝会递归遍历源数据，
 * 复制实际的值而非引用，因此修改副本不会影响源对象。
 *
 * @title deepClone
 *
 * @param {T} input - 需要深拷贝的源数据。
 * @returns {T} 与源数据深度相等的独立副本。
 *
 * @example
 * import { deepClone } from 'arcdash'
 *
 * const input = { a: [1, 2], b: new Date() }
 * const output = deepClone(input)
 *
 * output.a.push(3)
 * input.a.length // 2（源数组不受影响）
 */
export const deepClone = clone;
