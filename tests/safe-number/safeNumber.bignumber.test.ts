import { describe, expect, it } from "vitest";
import SafeNumber from "../../src/safe-number/safeNumber";

/**
 * 大数 / number↔BigInt 双路径的「担忧清单」。
 *
 * 这些用例就是之前口头担心的失真场景，全部落到 vitest 里：
 * 只要双路径实现正确，它们就该全绿；任何一个变红都说明大数精度回退了。
 *
 * 关键约束：超大数必须以「字符串」传入才能精确——
 * 一个超过 Number.MAX_SAFE_INTEGER 的「数字字面量」在进入构造函数之前就已经被 JS 截断了。
 */
describe("SafeNumber 大数 / 双路径", () => {
  describe("无损表示（字符串入参）", () => {
    it("超大整数通过 toString 精确还原", () => {
      // 9007199254740993 = MAX_SAFE_INTEGER + 2，数字字面量无法精确表示
      expect(SafeNumber("9007199254740993").toString()).toBe("9007199254740993.00");
    });

    it("超大带小数精确还原", () => {
      expect(SafeNumber("12345678901234567890.12").toString()).toBe("12345678901234567890.12");
    });

    it("之前的失真用例 1：99999999999999.99", () => {
      expect(SafeNumber("99999999999999.99").toString()).toBe("99999999999999.99");
    });

    it("之前的失真用例 2：123456789012345.67", () => {
      expect(SafeNumber("123456789012345.67").toString()).toBe("123456789012345.67");
    });

    it("负的超大数", () => {
      expect(SafeNumber("-100000000000000000000").toString()).toBe("-100000000000000000000.00");
    });
  });

  describe("双路径：底层类型按范围切换", () => {
    it("小数走 number 快路径（intValue 仍是 number）", () => {
      expect(typeof SafeNumber(10.99).intValue).toBe("number");
      expect(SafeNumber(10.99).intValue).toBe(1099);
    });

    it("超大数升级为 bigint（intValue 是 bigint）", () => {
      expect(typeof SafeNumber("9007199254740993").intValue).toBe("bigint");
    });

    it("缩放后溢出安全整数即升级（precision 放大窗口被吃掉）", () => {
      // value=1e14，×100=1e16 > MAX_SAFE_INTEGER，必须升级
      expect(typeof SafeNumber("100000000000000").intValue).toBe("bigint");
    });
  });

  describe("跨边界算术保持精确", () => {
    it("加法跨越安全整数边界", () => {
      expect(SafeNumber("9007199254740991").add(1).toString()).toBe("9007199254740992.00");
    });

    it("两个超大数相加", () => {
      expect(SafeNumber("100000000000000000000").add("1").toString()).toBe(
        "100000000000000000001.00",
      );
    });

    it("减法跨越边界", () => {
      expect(SafeNumber("100000000000000000000").subtract("0.5").toString()).toBe(
        "99999999999999999999.50",
      );
    });

    it("乘法溢出自动升级", () => {
      // 1e10 × 1e10 = 1e20，远超安全整数
      expect(SafeNumber("10000000000").multiply(10000000000).toString()).toBe(
        "100000000000000000000.00",
      );
    });

    it("MAX_SAFE_INTEGER + 2 经典坑（减回来精确）", () => {
      expect(SafeNumber("9007199254740993").add(-2).toString()).toBe("9007199254740991.00");
    });

    it("小数仍走快路径且结果不变（回归保护）", () => {
      expect(SafeNumber(2.51).add(0.01).value).toBe(2.52);
      expect(SafeNumber(0.1).multiply(0.2).value).toBe(0.02);
    });
  });

  describe("混合操作数（number 实例 + bigint 实例）", () => {
    const big = SafeNumber("100000000000000000000");
    const small = SafeNumber(5);

    it("bigint.add(number) 精确", () => {
      expect(big.add(small).toString()).toBe("100000000000000000005.00");
    });

    it("number.add(bigint) 精确（关键：必须用 intValue 而非 value 取数）", () => {
      expect(small.add(big).toString()).toBe("100000000000000000005.00");
    });

    it("bigint.subtract(bigint) 精确", () => {
      expect(big.subtract(big).toString()).toBe("0.00");
    });
  });

  describe("其它方法支持大数", () => {
    it("format 对超大数正确分组", () => {
      expect(SafeNumber("1000000000000000000000").format()).toBe(
        "¥1,000,000,000,000,000,000,000.00",
      );
    });

    it("distribute 超大数后求和精确还原", () => {
      const parts = SafeNumber("100000000000000000000").distribute(3);
      expect(parts.length).toBe(3);
      const sum = parts.reduce((acc, p) => acc.add(p), SafeNumber(0));
      expect(sum.toString()).toBe("100000000000000000000.00");
    });

    it("divide 整除超大数精确", () => {
      expect(SafeNumber("100000000000000000000").divide(4).toString()).toBe(
        "25000000000000000000.00",
      );
    });

    it("cents 对 bigint 返回小数部分", () => {
      expect(SafeNumber("99999999999999.99").cents()).toBe(99);
    });
  });

  describe("BigInt 入参", () => {
    it("接受 BigInt 字面量", () => {
      expect(SafeNumber(9007199254740993n).toString()).toBe("9007199254740993.00");
    });

    it("乘以 BigInt 乘子", () => {
      expect(SafeNumber("1000000000000").multiply(1000000000n).toString()).toBe(
        "1000000000000000000000.00",
      );
    });
  });

  // 关键场景：操作数都在 number 快路径内，计算「之后」才越过安全整数 → 必须在运算时即时升级
  describe("运算后才溢出（结果触发升级）", () => {
    it("number + number，和溢出 → 升级为 bigint", () => {
      const a = SafeNumber("90071992547409.91"); // intValue = MAX_SAFE_INTEGER，仍是 number
      expect(typeof a.intValue).toBe("number");

      const r = a.add("0.01");
      expect(typeof r.intValue).toBe("bigint"); // 运算后升级
      expect(r.toString()).toBe("90071992547409.92");
    });

    it("number - number，差溢出（负方向）→ 升级为 bigint", () => {
      const a = SafeNumber("-90071992547409.91");
      expect(typeof a.intValue).toBe("number");

      const r = a.subtract("0.01");
      expect(typeof r.intValue).toBe("bigint");
      expect(r.toString()).toBe("-90071992547409.92");
    });

    it("number × number，积溢出 → 升级为 bigint", () => {
      const a = SafeNumber("30000000000"); // intValue = 3e12，number
      expect(typeof a.intValue).toBe("number");

      const r = a.multiply(1000000); // 3e12 × 1e6 = 3e18，溢出
      expect(typeof r.intValue).toBe("bigint");
      expect(r.toString()).toBe("30000000000000000.00");
    });

    it("number ÷ 小于 1，商放大溢出 → 升级为 bigint", () => {
      const a = SafeNumber("90071992547409"); // intValue = 9007199254740900，number
      expect(typeof a.intValue).toBe("number");

      const r = a.divide(0.01); // ×100 放大
      expect(typeof r.intValue).toBe("bigint");
      expect(r.toString()).toBe("9007199254740900.00");
    });

    it("升级后再算回安全区会降级回 number 快路径", () => {
      const big = SafeNumber("90071992547409.91").add("0.01"); // bigint
      expect(typeof big.intValue).toBe("bigint");

      const back = big.subtract("0.02"); // 拉回安全区
      expect(typeof back.intValue).toBe("number"); // 降级
      expect(back.toString()).toBe("90071992547409.90");
    });
  });

  describe("对抗性边界补充", () => {
    it("小数值的字符串入参仍降级回 number 快路径", () => {
      expect(typeof SafeNumber("100").intValue).toBe("number");
      expect(SafeNumber("100").intValue).toBe(10000);
    });

    it("高精度 + 大数同时成立", () => {
      expect(SafeNumber("123456789.123456789", { precision: 8 }).toString()).toBe(
        "123456789.12345679",
      );
    });

    it("负超大数整除保号且精确", () => {
      expect(SafeNumber("-100000000000000000000").divide(4).toString()).toBe(
        "-25000000000000000000.00",
      );
    });

    it("负超大数 distribute 求和精确还原", () => {
      const parts = SafeNumber("-100000000000000000000").distribute(3);
      const sum = parts.reduce((acc, p) => acc.add(p), SafeNumber(0));
      expect(sum.toString()).toBe("-100000000000000000000.00");
    });

    it("负超大数 format 走负数模板", () => {
      expect(SafeNumber("-1000000000000000000000").format()).toBe(
        "-¥1,000,000,000,000,000,000,000.00",
      );
    });

    it("fromCents 接受超大分值字符串", () => {
      expect(SafeNumber("123456789012345678", { fromCents: true }).toString()).toBe(
        "1234567890123456.78",
      );
    });

    it("value 对超大数为 number 类型（尽力而为，无损用 toString）", () => {
      expect(typeof SafeNumber("100000000000000000000").value).toBe("number");
    });
  });

  // 全场景矩阵：加减乘除 × 负数/小数 × 大数。每条算术均经 Node BigInt oracle 核对。
  // （安全数范围的加减乘除见 vendor-cases(big.js)，大数乘除另见 vendor-decimal(decimal.js)）
  describe("全场景矩阵（大数 × 负数 × 小数）", () => {
    const expectAt = (value: string, precision: number): string =>
      SafeNumber(value, { precision }).toString();

    it.each([
      ["123456789012345.67", "876543210987654.33", "1000000000000000.00", 2], // 大数带小数进位
      ["-1000000000000000000.99", "0.99", "-1000000000000000000.00", 2], // 负大数 + 小数
      ["99999999999999.99", "0.01", "100000000000000.00", 2], // 跨边界进位
      ["-100000000000000000000", "100000000000000000000.01", "0.01", 2], // 负大数 + 正大数
    ] as Array<[string, string, string, number]>)("加: %s + %s = %s", (a, b, expected, p) => {
      expect(SafeNumber(a, { precision: p }).add(b).toString()).toBe(expectAt(expected, p));
    });

    it.each([
      ["-100000000000000000000", "-0.5", "-99999999999999999999.50", 2], // 负大数 - 负小数
      ["1000000000000000000.00", "0.01", "999999999999999999.99", 2], // 大数借位
      ["-50000000000000.50", "49999999999999.50", "-100000000000000.00", 2],
      ["100000000000000.00", "0.01", "99999999999999.99", 2], // 跨边界借位
    ] as Array<[string, string, string, number]>)("减: %s - %s = %s", (a, b, expected, p) => {
      expect(SafeNumber(a, { precision: p }).subtract(b).toString()).toBe(expectAt(expected, p));
    });

    it.each([
      ["-1000000000.5", -2000000000, "2000000001000000000.0", 1], // 负小数 × 负大整数 = 大数
    ] as Array<[string, number, string, number]>)("乘: %s × %d = %s", (a, b, expected, p) => {
      expect(SafeNumber(a, { precision: p }).multiply(b).toString()).toBe(expectAt(expected, p));
    });

    it.each([
      ["-100000000000000000001", 2, "-50000000000000000000.5", 1], // 负大数 ÷ 整数 = 大数带小数
    ] as Array<[string, number, string, number]>)("除: %s ÷ %d = %s", (a, b, expected, p) => {
      expect(SafeNumber(a, { precision: p }).divide(b).toString()).toBe(expectAt(expected, p));
    });
  });
});
