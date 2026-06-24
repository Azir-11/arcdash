import { describe, expect, it } from "vitest";
import * as _ from "../../src";

describe("defu 系列函数", () => {
  describe("defu：递归合并默认值", () => {
    it("源对象字段优先级最高", () => {
      const output = _.defu({ a: { b: 2 } }, { a: { b: 1, c: 3 }, d: 4 });
      expect(output).toEqual({ a: { b: 2, c: 3 }, d: 4 });
    });

    it("仅在源字段为 undefined/null 时采用默认值", () => {
      const output = _.defu({ a: undefined, b: null, c: 0 }, { a: 1, b: 2, c: 3 });
      expect(output).toEqual({ a: 1, b: 2, c: 0 });
    });

    it("数组按拼接方式合并", () => {
      const output = _.defu({ arr: ["a"] }, { arr: ["b", "c"] });
      expect(output.arr).toEqual(["a", "b", "c"]);
    });

    it("支持多个默认对象依次兜底", () => {
      const output = _.defu({ a: 1 }, { b: 2 }, { c: 3 });
      expect(output).toEqual({ a: 1, b: 2, c: 3 });
    });

    it("不修改任何入参", () => {
      const source = { a: { b: 1 } };
      const defaults = { a: { c: 2 } };
      _.defu(source, defaults);
      expect(source).toEqual({ a: { b: 1 } });
      expect(defaults).toEqual({ a: { c: 2 } });
    });
  });

  describe("defuFn：默认值为函数时以源值调用", () => {
    it("函数接收源值并返回合并结果", () => {
      const output = _.defuFn(
        { ignore: (val: string[]) => val.filter((i) => i !== "dist") },
        { ignore: ["node_modules", "dist"] },
      );
      expect(output.ignore).toEqual(["node_modules"]);
    });

    it("非函数字段保持普通 defu 合并", () => {
      const output = _.defuFn({ a: 1 }, { a: 2, b: 3 });
      expect(output).toEqual({ a: 1, b: 3 });
    });
  });

  describe("defuArrayFn：仅对数组字段启用函数合并器", () => {
    it("数组字段的函数被当作合并器调用", () => {
      const output = _.defuArrayFn({ arr: (val: string[]) => ["c", ...val] }, { arr: ["a", "b"] });
      expect(output.arr).toEqual(["c", "a", "b"]);
    });

    it("非数组字段的函数原样保留", () => {
      const fn = () => "noop";
      const output = _.defuArrayFn({ handler: fn }, { handler: () => "default" });
      expect(output.handler).toBe(fn);
    });
  });

  describe("createDefu：自定义合并策略", () => {
    it("可实现数字累加而非覆盖", () => {
      const ext = _.createDefu((obj, key, value) => {
        if (typeof obj[key] === "number" && typeof value === "number") {
          (obj as Record<string, number>)[key as string] += value;
          return true;
        }
        return false;
      });
      expect(ext({ cost: 15 }, { cost: 10 })).toEqual({ cost: 25 });
    });

    it("merger 返回非 true 时回退到默认合并", () => {
      const ext = _.createDefu(() => false);
      expect(ext({ a: { b: 1 } }, { a: { c: 2 } })).toEqual({ a: { b: 1, c: 2 } });
    });

    it("不传 merger 时行为等价于 defu", () => {
      const ext = _.createDefu();
      expect(ext({ a: 1 }, { a: 2, b: 3 })).toEqual({ a: 1, b: 3 });
    });
  });
});
