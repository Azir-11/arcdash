import { describe, expect, it } from "vitest";
import SafeNumber from "../../src/safe-number/safeNumber";

/**
 * 以下测试用例「改编」自 big.js 的官方测试套件，用于以成熟库的用例交叉验证
 * SafeNumber 的算术正确性（覆盖正负号、零、进位/借位、定点小数等边界）。
 *
 * ─── 来源 (Source) ────────────────────────────────────────────────────────────
 *   big.js   https://github.com/MikeMcl/big.js
 *   文件     test/methods/plus.js · minus.js · times.js
 *   分支     main（获取于 2026-06-04）
 *   作者     Michael Mclaughlin
 *   许可     MIT
 *
 * ─── 改编说明 (Adaptation) ────────────────────────────────────────────────────
 *   big.js 是「任意精度」库，而 SafeNumber 是「定点精度 + number/BigInt 双路径」模型，
 *   因此并非逐字照搬，而是挑选可精确映射的子集并做如下适配：
 *     • 每条用例标注 precision，取操作数/结果所需的小数位；
 *     • 排除使用科学计数法的用例（如 8e5、1e-14、-7.12e-14）——SafeNumber 暂不解析科学计数法；
 *     • 排除超出所选 precision 的任意精度用例，以及 big.js 的 -0 语义用例；
 *     • times 仅取「整数乘子」用例（SafeNumber.multiply 的精确路径），
 *       原库的「小数 × 小数」不属于本库 multiply 的语义；
 *     • 参数顺序统一为 SafeNumber API：SafeNumber(a).op(b) 应等于 expected。
 *   每条用例的算术均已人工核对，断言方式为：运算结果的 toString 等于直接解析 expected 的 toString。
 *
 * ─── 许可证全文 (License) ─────────────────────────────────────────────────────
 *   MIT License
 *
 *   Copyright (c) 2025 Michael Mclaughlin
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

/** 用「直接解析 expected 的 toString」作为期望，避免手工补零 */
const expectAt = (value: string, precision: number): string =>
  SafeNumber(value, { precision }).toString();

// [a, b, expected, precision] —— a + b = expected
const PLUS: Array<[string, string, string, number]> = [
  ["1", "1", "2", 0],
  ["1", "-45", "-44", 0],
  ["1", "22", "23", 0],
  ["1", "6.1915", "7.1915", 4],
  ["1", "-1.02", "-0.02", 2],
  ["1", "0.09", "1.09", 2],
  ["1", "-0.0001", "0.9999", 4],
  ["9.654", "0", "9.654", 3],
  ["0", "0.001", "0.001", 3],
  ["-1", "1", "0", 0],
  ["-0.01", "0.01", "0", 2],
  ["54", "-54", "0", 0],
  ["100", "100", "200", 0],
  ["-999.99", "0.01", "-999.98", 2],
  ["3.333", "-4", "-0.667", 3],
  ["-1", "-0.1", "-1.1", 1],
  ["43534.5435", "0.054645", "43534.598145", 6],
  ["99999", "1", "100000", 0],
  ["-5.1", "1", "-4.1", 1],
  ["1.3", "2", "3.3", 1],
  ["1.02", "1.2", "2.22", 2],
  ["3", "31.9", "34.9", 1],
  ["7", "-37", "-30", 0],
  ["1.5", "5", "6.5", 1],
  ["1.2", "-0.0000194", "1.1999806", 7],
];

// [a, b, expected, precision] —— a - b = expected
const MINUS: Array<[string, string, string, number]> = [
  ["1", "0", "1", 0],
  ["-1", "0", "-1", 0],
  ["1", "-45", "46", 0],
  ["1", "22", "-21", 0],
  ["1", "6.1915", "-5.1915", 4],
  ["1", "-1.02", "2.02", 2],
  ["1", "0.09", "0.91", 2],
  ["1", "-0.0001", "1.0001", 4],
  ["9.654", "0", "9.654", 3],
  ["0", "0.001", "-0.001", 3],
  ["-1", "1", "-2", 0],
  ["-0.01", "0.01", "-0.02", 2],
  ["54", "-54", "108", 0],
  ["9.99", "-9.99", "19.98", 2],
  ["100", "100", "0", 0],
  ["-999.99", "0.01", "-1000", 2],
  ["3.333", "-4", "7.333", 3],
  ["-1", "-0.1", "-0.9", 1],
  ["43534.5435", "0.054645", "43534.488855", 6],
  ["99999", "1", "99998", 0],
  ["-2", "1.5", "-3.5", 1],
  ["7", "-3", "10", 0],
  ["2.3", "-3", "5.3", 1],
];

// [a, b(整数乘子), expected, precision] —— a * b = expected
const TIMES: Array<[string, number, string, number]> = [
  ["1", 1, "1", 0],
  ["2", 2, "4", 0],
  ["2", -2, "-4", 0],
  ["-2", 2, "-4", 0],
  ["-3", -3, "9", 0],
  ["54", -54, "-2916", 0],
  ["100", 100, "10000", 0],
  ["99999", 1, "99999", 0],
  ["-443850607", -1, "443850607", 0],
  ["-25379.8", 3, "-76139.4", 1],
  ["1", -1, "-1", 0],
  ["-1", 1, "-1", 0],
];

describe("SafeNumber 交叉验证（用例来源: big.js, MIT）", () => {
  describe("plus —— 来源 big.js test/methods/plus.js", () => {
    it.each(PLUS)("%s + %s = %s (precision %i)", (a, b, expected, precision) => {
      expect(SafeNumber(a, { precision }).add(b).toString()).toBe(expectAt(expected, precision));
    });
  });

  describe("minus —— 来源 big.js test/methods/minus.js", () => {
    it.each(MINUS)("%s - %s = %s (precision %i)", (a, b, expected, precision) => {
      expect(SafeNumber(a, { precision }).subtract(b).toString()).toBe(
        expectAt(expected, precision),
      );
    });
  });

  describe("times（整数乘子）—— 来源 big.js test/methods/times.js", () => {
    it.each(TIMES)("%s × %d = %s (precision %i)", (a, b, expected, precision) => {
      expect(SafeNumber(a, { precision }).multiply(b).toString()).toBe(
        expectAt(expected, precision),
      );
    });
  });
});
