import { describe, expect, it } from "vitest";
import SafeNumber from "../../src/safe-number/safeNumber";

/**
 * 以下测试用例「改编」自 decimal.js 的官方测试套件，重点覆盖 SafeNumber 的
 * 大数乘法 / 精确除法（number↔BigInt 双路径），并补全负数、小数、安全数、大数的矩阵。
 *
 * ─── 来源 (Source) ────────────────────────────────────────────────────────────
 *   decimal.js   https://github.com/MikeMcl/decimal.js
 *   文件         test/modules/times.js · div.js
 *   分支         master（获取于 2026-06-04）
 *   作者         Michael Mclaughlin
 *   许可         MIT
 *
 * ─── 改编说明 (Adaptation) ────────────────────────────────────────────────────
 *   decimal.js 是「任意精度（有效数字）」库，本库 SafeNumber 是「定点精度（小数位）+
 *   number/BigInt 双路径」模型。因此并非逐字照搬，而是挑选可精确映射的子集并适配：
 *     • times：取「整数 × 任意数」用例（SafeNumber.multiply 的精确路径），
 *       原库的「小数 × 小数」不属于本库 multiply 语义；带整数因子的用例已把整数因子放在第二参。
 *     • div：仅取结果「精确/有限小数」的用例，排除任意精度（除不尽）与按有效数字四舍五入的用例。
 *     • 排除使用科学计数法的用例（SafeNumber 暂不解析科学计数法）与 -0 语义用例。
 *     • 大数除法（DIV_BIG）由已核对的大数乘法「精确反推」得到：a×b=c ⟹ c÷b=a、c÷a=b。
 *   ★ 所有用例的算术均已用 Node 原生 BigInt 作为 oracle 逐条核对（见提交说明），
 *     断言方式：运算结果的 toString 等于直接解析 expected 的 toString。
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

const expectAt = (value: string, precision: number): string =>
  SafeNumber(value, { precision }).toString();

// [a, b(整数因子), expected, precision] —— a × b = expected
// 含「中等整数 × 中等整数 = 大数」的用例，触发 number×number→BigInt 升级。
const TIMES: Array<[string, number, string, number]> = [
  ["-906235823", 169450901242, "-153562476945135592166", 0], // 积溢出安全整数 → 升级 BigInt
  ["-85793626", -403556966, "34622615410698716", 0], // 负 × 负 = 正（大数）
  ["-1310633", -9, "11795697", 0],
  ["-2830933", -1, "2830933", 0],
  ["-1013851164640", -116895, "118514131890592800", 0], // 大整数 × 整数
  ["-240695", 2, "-481390", 0],
  ["-661.167", 453, "-299508.651", 3], // 小数 × 整数
  ["-3030148.8", 229674, "-695946395491.2", 1],
  ["18.5077", -208355, "-3856171.8335", 4],
  ["-65667302.5", 7, "-459671117.5", 1],
  ["-1693481.437", -27743783, "46983581502656.171", 3], // 小数 × 大整数 = 大数（带小数）
  ["-299.7692790", -2, "599.538558", 7],
  ["224979.5", -2, "-449959", 1],
  ["-1098478.95443", -104436, "114720748084.85148", 5],
];

// [a, b(除数), expected, precision] —— a ÷ b = expected（精确/有限小数）
const DIV: Array<[string, number, string, number]> = [
  ["1", 1, "1", 0],
  ["-1", 1, "-1", 0],
  ["-0.01", 0.01, "-1", 2],
  ["54", -54, "-1", 0],
  ["9.99", -9.99, "-1", 2],
  ["100", 100, "1", 0],
  ["-999.99", 0.01, "-99999", 2],
  ["10", 4, "2.5", 1],
  ["3.333", -4, "-0.83325", 5],
  ["-1", -0.1, "10", 1],
  ["99999", 1, "99999", 0],
  ["2", 4, "0.5", 1],
  ["-1", 2, "-0.5", 1],
];

// 大数精确除法：由上面已核对的大数乘法反推（a×b=c ⟹ c÷b=a）。被除数为大数（走 BigInt 路径）。
const DIV_BIG: Array<[string, number, string]> = [
  ["-153562476945135592166", 169450901242, "-906235823"],
  ["-153562476945135592166", -906235823, "169450901242"],
  ["34622615410698716", -403556966, "-85793626"],
  ["34622615410698716", -85793626, "-403556966"],
  ["118514131890592800", -116895, "-1013851164640"],
  ["118514131890592800", -1013851164640, "-116895"],
];

describe("SafeNumber 交叉验证（用例来源: decimal.js, MIT）", () => {
  describe("times（整数因子，含大数）—— 来源 decimal.js test/modules/times.js", () => {
    it.each(TIMES)("%s × %d = %s (precision %i)", (a, b, expected, precision) => {
      expect(SafeNumber(a, { precision }).multiply(b).toString()).toBe(
        expectAt(expected, precision),
      );
    });
  });

  describe("div（精确结果）—— 来源 decimal.js test/modules/div.js", () => {
    it.each(DIV)("%s ÷ %s = %s (precision %i)", (a, b, expected, precision) => {
      expect(SafeNumber(a, { precision }).divide(b).toString()).toBe(expectAt(expected, precision));
    });
  });

  describe("div 大数（由 times 反推的精确除法）", () => {
    it.each(DIV_BIG)("%s ÷ %d = %s", (a, b, expected) => {
      expect(SafeNumber(a, { precision: 0 }).divide(b).toString()).toBe(expectAt(expected, 0));
    });
  });
});
