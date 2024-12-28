import { describe, it, expect } from 'vitest';
import { ObjectUtil } from '../../src/lang/ObjectUtil';

describe('ObjectUtil', () => {
  // assign 相关方法测试
  describe('assign methods', () => {
    it('should assign properties', () => {
      expect(ObjectUtil.assign({ a: 0 }, { b: 1 }, { c: 2 }))
        .toEqual({ a: 0, b: 1, c: 2 });
    });

    it('should assign inherited properties', () => {
      function Foo() {
        this.a = 1;
      }
      Foo.prototype.b = 2;
      expect(ObjectUtil.assignIn({ c: 3 }, new (Foo as any)()))
        .toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should work with customizer', () => {
      const customizer = (objValue: any, srcValue: any) => {
        return typeof objValue === 'number' ? objValue + srcValue : srcValue;
      };
      expect(ObjectUtil.assignWith({ a: 1, b: 2 }, { a: 3, b: 4 }, customizer))
        .toEqual({ a: 4, b: 6 });
    });
  });

  // at 方法测试
  describe('at', () => {
    it('should get values at paths', () => {
      const object = { a: [{ b: { c: 3 } }, 4] };
      expect(ObjectUtil.at(object, ['a[0].b.c', 'a[1]']))
        .toEqual([3, 4]);
    });
  });

  // defaults 相关方法测试
  describe('defaults methods', () => {
    it('should assign default properties', () => {
      expect(ObjectUtil.defaults({ a: 1 }, { b: 2 }, { a: 3 }))
        .toEqual({ a: 1, b: 2 });
    });

    it('should assign nested default properties', () => {
      expect(ObjectUtil.defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 4 } }))
        .toEqual({ a: { b: 2, c: 4 } });
    });
  });

  // find 相关方法测试
  describe('find methods', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true }
    };

    it('should find key by predicate', () => {
      expect(ObjectUtil.findKey(users, o => o.age < 40)).toBe('barney');
    });

    it('should find last key by predicate', () => {
      expect(ObjectUtil.findLastKey(users, o => o.active)).toBe('pebbles');
    });
  });

  // for 循环相关方法测试
  describe('for methods', () => {
    it('should iterate own and inherited properties', () => {
      function Foo() {
        this.a = 1;
        this.b = 2;
      }
      Foo.prototype.c = 3;
      const keys: string[] = [];
      ObjectUtil.forIn(new (Foo as any)(), (value, key) => keys.push(key));
      expect(keys).toEqual(['a', 'b', 'c']);
    });

    it('should iterate own properties', () => {
      function Foo() {
        this.a = 1;
        this.b = 2;
      }
      Foo.prototype.c = 3;
      const keys: string[] = [];
      ObjectUtil.forOwn(new (Foo as any)(), (value, key) => keys.push(key));
      expect(keys).toEqual(['a', 'b']);
    });
  });

  // get/set 相关方法测试
  describe('get/set methods', () => {
    it('should get value at path', () => {
      const object = { a: [{ b: { c: 3 } }] };
      expect(ObjectUtil.get(object, 'a[0].b.c')).toBe(3);
      expect(ObjectUtil.get(object, ['a', '0', 'b', 'c'])).toBe(3);
      expect(ObjectUtil.get(object, 'a.b.c', 'default')).toBe('default');
    });

    it('should set value at path', () => {
      const object = { a: [{ b: { c: 3 } }] };
      ObjectUtil.set(object, 'a[0].b.c', 4);
      expect(object.a[0].b.c).toBe(4);
    });
  });

  // has 相关方法测试
  describe('has methods', () => {
    it('should check if path exists', () => {
      const object = { a: { b: 2 } };
      expect(ObjectUtil.has(object, 'a')).toBe(true);
      expect(ObjectUtil.has(object, 'a.b')).toBe(true);
      expect(ObjectUtil.has(object, 'a.b.c')).toBe(false);
    });
  });

  // keys/values 相关方法测试
  describe('keys/values methods', () => {
    it('should get keys', () => {
      function Foo() {
        this.a = 1;
        this.b = 2;
      }
      Foo.prototype.c = 3;
      expect(ObjectUtil.keys(new (Foo as any)())).toEqual(['a', 'b']);
      expect(ObjectUtil.keysIn(new (Foo as any)())).toEqual(['a', 'b', 'c']);
    });

    it('should get values', () => {
      function Foo() {
        this.a = 1;
        this.b = 2;
      }
      Foo.prototype.c = 3;
      expect(ObjectUtil.values(new (Foo as any)())).toEqual([1, 2]);
      expect(ObjectUtil.valuesIn(new (Foo as any)())).toEqual([1, 2, 3]);
    });
  });

  // transform 方法测试
  describe('transform', () => {
    it('should transform object', () => {
      expect(ObjectUtil.transform({ a: 1, b: 2 }, (result: any, value, key) => {
        result[key] = value * 2;
      }, {})).toEqual({ a: 2, b: 4 });
    });
  });

  // pick/omit 相关方法测试
  describe('pick/omit methods', () => {
    const object = { a: 1, b: '2', c: 3 };

    it('should pick properties', () => {
      expect(ObjectUtil.pick(object, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('should omit properties', () => {
      expect(ObjectUtil.omit(object, ['a', 'c'])).toEqual({ b: '2' });
    });
  });

  // merge 相关方法测试
  describe('merge methods', () => {
    it('should merge objects', () => {
      const object = { a: [{ b: 2 }, { d: 4 }] };
      const other = { a: [{ c: 3 }, { e: 5 }] };
      expect(ObjectUtil.merge(object, other))
        .toEqual({ a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] });
    });
  });
});