import { describe, it, expect } from 'vitest';
import { CollectionUtil } from '../../src/lang/CollectionUtil';

describe('CollectionUtil', () => {
  // 遍历相关方法测试
  describe('iteration methods', () => {
    it('should iterate with forEach', () => {
      const array: number[] = [];
      CollectionUtil.forEach([1, 2], value => array.push(value));
      expect(array).toEqual([1, 2]);
    });

    it('should iterate from right with forEachRight', () => {
      const array: number[] = [];
      CollectionUtil.forEachRight([1, 2], value => array.push(value));
      expect(array).toEqual([2, 1]);
    });
  });

  // 查找相关方法测试
  describe('find methods', () => {
    const users = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: false },
      { user: 'pebbles', age: 1, active: true }
    ];

    it('should find elements', () => {
      expect(CollectionUtil.find(users, o => o.age < 40))
        .toEqual({ user: 'barney', age: 36, active: true });
    });

    it('should find from right', () => {
      expect(CollectionUtil.findLast(users, o => o.active))
        .toEqual({ user: 'pebbles', age: 1, active: true });
    });
  });

  // 过滤相关方法测试
  describe('filter methods', () => {
    const users = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: false }
    ];

    it('should filter elements', () => {
      expect(CollectionUtil.filter(users, o => !o.active))
        .toEqual([{ user: 'fred', age: 40, active: false }]);
    });

    it('should reject elements', () => {
      expect(CollectionUtil.reject(users, o => o.active))
        .toEqual([{ user: 'fred', age: 40, active: false }]);
    });
  });

  // 映射相关方法测试
  describe('map methods', () => {
    it('should map values', () => {
      const square = (n: number) => n * n;
      expect(CollectionUtil.map([4, 8], square)).toEqual([16, 64]);
    });

    it('should handle flatMap', () => {
      const duplicate = (n: number) => [n, n];
      expect(CollectionUtil.flatMap([1, 2], duplicate)).toEqual([1, 1, 2, 2]);
    });

    it('should handle flatMapDeep', () => {
      const duplicate = (n: number) => [[[n, n]]];
      expect(CollectionUtil.flatMapDeep([1, 2], duplicate)).toEqual([1, 1, 2, 2]);
    });

    it('should handle flatMapDepth', () => {
      const duplicate = (n: number) => [[[n, n]]];
      expect(CollectionUtil.flatMapDepth([1, 2], duplicate, 2))
        .toEqual([[1, 1], [2, 2]]);
    });
  });

  // 分组相关方法测试
  describe('grouping methods', () => {
    it('should group by values', () => {
      expect(CollectionUtil.groupBy([6.1, 4.2, 6.3], Math.floor))
        .toEqual({ '4': [4.2], '6': [6.1, 6.3] });
    });

    it('should handle keyBy', () => {
      const array = [
        { dir: 'left', code: 97 },
        { dir: 'right', code: 100 }
      ];
      expect(CollectionUtil.keyBy(array, 'dir')).toEqual({
        left: { dir: 'left', code: 97 },
        right: { dir: 'right', code: 100 }
      });
    });

    it('should partition array', () => {
      const users = [
        { user: 'barney', age: 36, active: false },
        { user: 'fred', age: 40, active: true },
        { user: 'pebbles', age: 1, active: false }
      ];
      const [active, inactive] = CollectionUtil.partition(users, o => o.active);
      expect(active).toEqual([{ user: 'fred', age: 40, active: true }]);
      expect(inactive).toEqual([
        { user: 'barney', age: 36, active: false },
        { user: 'pebbles', age: 1, active: false }
      ]);
    });
  });

  // 归并相关方法测试
  describe('reduce methods', () => {
    it('should reduce values', () => {
      expect(CollectionUtil.reduce([1, 2], (sum, n) => sum + n, 0)).toBe(3);
    });

    it('should reduce from right', () => {
      const array = [[0, 1], [2, 3], [4, 5]];
      expect(CollectionUtil.reduceRight(array, 
        (flattened, other) => flattened.concat(other), []))
        .toEqual([4, 5, 2, 3, 0, 1]);
    });
  });

  // 排序相关方法测试
  describe('sorting methods', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 34 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 36 }
    ];

    it('should sort by single property', () => {
      expect(CollectionUtil.sortBy(users, [o => o.user]))
        .toEqual([
          { user: 'barney', age: 34 },
          { user: 'barney', age: 36 },
          { user: 'fred', age: 48 },
          { user: 'fred', age: 40 }
        ]);
    });

    it('should order by multiple properties', () => {
      expect(CollectionUtil.orderBy(users, ['user', 'age'], ['asc', 'desc']))
        .toEqual([
          { user: 'barney', age: 36 },
          { user: 'barney', age: 34 },
          { user: 'fred', age: 48 },
          { user: 'fred', age: 40 }
        ]);
    });
  });

  // 随机相关方法测试
  describe('random methods', () => {
    const array = [1, 2, 3, 4];

    it('should sample single element', () => {
      const result = CollectionUtil.sample(array);
      expect(array).toContain(result);
    });

    it('should sample multiple elements', () => {
      const result = CollectionUtil.sampleSize(array, 2);
      expect(result).toHaveLength(2);
      result.forEach(item => expect(array).toContain(item));
    });

    it('should shuffle array', () => {
      const result = CollectionUtil.shuffle(array);
      expect(result).toHaveLength(array.length);
      result.forEach(item => expect(array).toContain(item));
    });
  });

  // 其他方法测试
  describe('other methods', () => {
    it('should check size', () => {
      expect(CollectionUtil.size([1, 2, 3])).toBe(3);
      expect(CollectionUtil.size({ a: 1, b: 2 })).toBe(2);
    });

    it('should check if some elements match', () => {
      expect(CollectionUtil.some([null, 0, 'yes', false], Boolean)).toBe(true);
      expect(CollectionUtil.some([null, 0, '', false], Boolean)).toBe(false);
    });

    it('should check if all elements match', () => {
      expect(CollectionUtil.every([true, 1, 'yes'], Boolean)).toBe(true);
      expect(CollectionUtil.every([true, 1, null, 'yes'], Boolean)).toBe(false);
    });
  });
});