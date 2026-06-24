import { describe, expect, it } from "vitest";
import * as _ from "../../src";

describe("clone 系列函数", () => {
  describe("通用深拷贝能力（四种模式共有）", () => {
    const clones = [
      ["jsonClone", _.jsonClone],
      ["liteClone", _.liteClone],
      ["clone", _.clone],
      ["fullClone", _.fullClone],
    ] as const;

    for (const [name, fn] of clones) {
      it(`${name}：返回与源对象深度相等的副本`, () => {
        const input = { foo: 1, bar: { baz: 2, bat: { hello: "world" } } };
        const output = fn(input);
        expect(output).toEqual(input);
        expect(output).not.toBe(input);
        expect(output.bar).not.toBe(input.bar);
      });

      it(`${name}：修改副本不会影响源对象`, () => {
        const input = { foo: 1, bar: { baz: 2 } };
        const output = fn(input);
        output.bar.baz = 99;
        expect(input.bar.baz).toBe(2);
      });

      it(`${name}：深拷贝数组`, () => {
        const input = [1, [2, 3], { a: 4 }];
        const output = fn(input);
        expect(output).toEqual(input);
        expect(output[1]).not.toBe(input[1]);
      });

      it(`${name}：原始值原样返回`, () => {
        expect(fn(1)).toBe(1);
        expect(fn("abc")).toBe("abc");
        expect(fn(null)).toBe(null);
        expect(fn(undefined)).toBe(undefined);
      });
    }
  });

  describe("liteClone：扩展支持 Date、RegExp、自定义类", () => {
    it("克隆 Date 为独立实例", () => {
      const date = new Date("2026-06-24T00:00:00.000Z");
      const output = _.liteClone(date);
      expect(output).toBeInstanceOf(Date);
      expect(output).not.toBe(date);
      expect(output.getTime()).toBe(date.getTime());
    });

    it("克隆 RegExp 为独立实例", () => {
      const reg = /foo/gi;
      const output = _.liteClone(reg);
      expect(output).toBeInstanceOf(RegExp);
      expect(output).not.toBe(reg);
      expect(output.source).toBe("foo");
      expect(output.flags).toBe("gi");
    });

    it("克隆自定义类实例并保留原型", () => {
      class Foo {
        value = 1;
      }
      const output = _.liteClone(new Foo());
      expect(output).toBeInstanceOf(Foo);
      expect(output.value).toBe(1);
    });
  });

  describe("clone（默认）：扩展支持 Map、Set、TypedArray 等", () => {
    it("克隆 Map 为独立实例", () => {
      const map = new Map([["a", { n: 1 }]]);
      const output = _.clone(map);
      expect(output).toBeInstanceOf(Map);
      expect(output).not.toBe(map);
      expect(output.get("a")).toEqual({ n: 1 });
      expect(output.get("a")).not.toBe(map.get("a"));
    });

    it("克隆 Set 为独立实例", () => {
      const set = new Set([1, 2, 3]);
      const output = _.clone(set);
      expect(output).toBeInstanceOf(Set);
      expect(output).not.toBe(set);
      expect([...output]).toEqual([1, 2, 3]);
    });

    it("克隆 TypedArray 为独立实例", () => {
      const arr = new Uint8Array([1, 2, 3]);
      const output = _.clone(arr);
      expect(output).toBeInstanceOf(Uint8Array);
      expect(output).not.toBe(arr);
      expect([...output]).toEqual([1, 2, 3]);
    });
  });

  describe("fullClone：扩展支持 Symbol 属性与不可枚举属性", () => {
    it("克隆 Symbol 键属性", () => {
      const sym = Symbol("s");
      const input: Record<string | symbol, unknown> = { [sym]: 1 };
      const output = _.fullClone(input);
      expect(output[sym]).toBe(1);
    });

    it("克隆不可枚举属性", () => {
      const input = {};
      Object.defineProperty(input, "hidden", {
        value: 42,
        enumerable: false,
        configurable: true,
        writable: true,
      });
      const output = _.fullClone(input);
      expect(Object.getOwnPropertyDescriptor(output, "hidden")?.value).toBe(42);
    });
  });
});
