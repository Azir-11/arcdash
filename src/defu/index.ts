import {
  createDefu as _createDefu,
  defu as _defu,
  defuArrayFn as _defuArrayFn,
  defuFn as _defuFn,
} from "defu";
import type { Defu, DefuFn } from "defu";

export type { Defu, DefuFn } from "defu";

/**
 * 递归合并对象，使用后续参数作为前者缺失字段的默认值。/n
 *
 * 第一个参数 `source` 优先级最高，其后的每个 `defaults` 依次作为兜底来源。仅当 `source`
 * 中对应字段为 `undefined`/`null` 时才会采用默认值；同名的对象会递归合并，数组会拼接。
 * 合并过程不会修改任何入参，始终返回全新对象。
 *
 * 底层实现来自 [defu](https://github.com/unjs/defu) 仓库的 `defu`。
 *
 * @title defu
 *
 * @param {Source} source - 优先级最高的源对象。
 * @param {Defaults} defaults - 一个或多个作为兜底的默认对象。
 * @returns {Defu} 合并后的全新对象。
 *
 * @example
 * import { defu } from 'arcdash'
 *
 * const options = defu({ a: { b: 2 } }, { a: { b: 1, c: 3 }, d: 4 })
 * // { a: { b: 2, c: 3 }, d: 4 }
 */
export function defu<Source extends Input, Defaults extends Array<Input | IgnoredInput>>(
  source: Source | IgnoredInput,
  ...defaults: Defaults
): Defu<Source, Defaults> {
  return _defu(source, ...defaults);
}

/**
 * 与 `defu` 相同，但当默认值是函数时，会以源值作为参数调用该函数得到最终结果。/n
 *
 * 适用于需要基于已有值动态计算默认值的场景，例如对源数组做转换或追加。函数的入参为源对象中
 * 对应位置的值，返回值将作为合并结果。
 *
 * 底层实现来自 [defu](https://github.com/unjs/defu) 仓库的 `defuFn`。
 *
 * @title defuFn
 *
 * @param {Source} source - 优先级最高的源对象。
 * @param {Defaults} defaults - 一个或多个作为兜底的默认对象，其中的函数值会被调用。
 * @returns {Defu} 合并后的全新对象。
 *
 * @example
 * import { defuFn } from 'arcdash'
 *
 * const result = defuFn(
 *   { ignore: (val) => val.filter((i) => i !== 'dist') },
 *   { ignore: ['node_modules', 'dist'] },
 * )
 * // { ignore: ['node_modules'] }
 */
export function defuFn<Source extends Input, Defaults extends Array<Input | IgnoredInput>>(
  source: Source,
  ...defaults: Defaults
): Defu<Source, Defaults> {
  return _defuFn(source, ...defaults);
}

/**
 * 与 `defuFn` 类似，但仅对数组类型的字段启用「函数即合并器」的行为。/n
 *
 * 相比 `defuFn` 限制更小：只有当字段值为数组时，函数才会被当作合并器调用，其余字段保持普通
 * `defu` 合并逻辑。适合只想自定义数组合并、而对象字段维持默认行为的场景。
 *
 * 底层实现来自 [defu](https://github.com/unjs/defu) 仓库的 `defuArrayFn`。
 *
 * @title defuArrayFn
 *
 * @param {Source} source - 优先级最高的源对象。
 * @param {Defaults} defaults - 一个或多个作为兜底的默认对象，其中针对数组的函数值会被调用。
 * @returns {Defu} 合并后的全新对象。
 *
 * @example
 * import { defuArrayFn } from 'arcdash'
 *
 * const result = defuArrayFn(
 *   { arr: (val) => ['c', ...val] },
 *   { arr: ['a', 'b'] },
 * )
 * // { arr: ['c', 'a', 'b'] }
 */
export function defuArrayFn<Source extends Input, Defaults extends Array<Input | IgnoredInput>>(
  source: Source,
  ...defaults: Defaults
): Defu<Source, Defaults> {
  return _defuArrayFn(source, ...defaults);
}

/**
 * 使用自定义合并函数创建一个定制化的 defu 实例。/n
 *
 * 传入的 `merger` 会在合并每个键时被调用，可据此实现追加、累加、去重等专属合并策略；返回
 * `true` 表示该键已被自行处理、跳过默认逻辑。返回值是一个与 `defu` 用法一致的函数。
 *
 * 底层实现来自 [defu](https://github.com/unjs/defu) 仓库的 `createDefu`。
 *
 * @title createDefu
 *
 * @param {Merger} merger - 自定义合并函数；返回 `true` 表示该键已处理。
 * @returns {DefuFn} 一个使用自定义合并策略的 defu 函数。
 *
 * @example
 * import { createDefu } from 'arcdash'
 *
 * // 对数字字段执行累加而非覆盖
 * const ext = createDefu((obj, key, value) => {
 *   if (typeof obj[key] === 'number' && typeof value === 'number') {
 *     obj[key] += value
 *     return true
 *   }
 * })
 *
 * ext({ cost: 15 }, { cost: 10 }) // { cost: 25 }
 */
export function createDefu(merger?: Merger): DefuFn {
  return _createDefu(merger);
}

// 以下类型声明置于所有函数之后：func2md 会把「紧邻函数之前的 /** */ 注释」识别为该函数的说明，
// 若类型注释排在函数前会被误并入说明。放到末尾后其后无函数，不会污染文档。

/** 可参与合并的对象类型。 */
type Input = Record<string | number | symbol, any>;

/** 合并时会被忽略（直接跳过）的输入类型。 */
type IgnoredInput = boolean | number | null | any[] | Record<never, any> | undefined;

/**
 * 自定义合并函数。返回 `true` 表示该键已被处理（跳过默认合并逻辑）。
 *
 * @param object - 正在被合并的目标对象。
 * @param key - 当前处理的键。
 * @param value - 来自默认对象的值。
 * @param namespace - 当前键的嵌套命名空间（点分路径）。
 */
export type Merger = <T extends Input, K extends keyof T>(
  object: T,
  key: keyof T,
  value: T[K],
  namespace: string,
) => any;
