import { describe, it, expect } from 'vitest';
import { BooleanUtil } from '../../src/lang/BooleanUtil';

describe('BooleanUtil', () => {
  // 类型检查测试
  describe('type checking', () => {
    it('should check if value is boolean', () => {
      expect(BooleanUtil.isBoolean(true)).toBe(true);
      expect(BooleanUtil.isBoolean(false)).toBe(true);
      expect(BooleanUtil.isBoolean(0)).toBe(false);
      expect(BooleanUtil.isBoolean('true')).toBe(false);
      expect(BooleanUtil.isBoolean(null)).toBe(false);
      expect(BooleanUtil.isBoolean(undefined)).toBe(false);
      expect(BooleanUtil.isBoolean({})).toBe(false);
      expect(BooleanUtil.isBoolean([])).toBe(false);
    });
  });

  // 转换为布尔值测试
  describe('conversion to boolean', () => {
    it('should convert various values to boolean', () => {
      // 数字转换
      expect(BooleanUtil.toBoolean(1)).toBe(true);
      expect(BooleanUtil.toBoolean(0)).toBe(false);
      expect(BooleanUtil.toBoolean(-1)).toBe(true);

      // 字符串转换
      expect(BooleanUtil.toBoolean('true')).toBe(true);
      expect(BooleanUtil.toBoolean('false')).toBe(false);
      expect(BooleanUtil.toBoolean('yes')).toBe(true);
      expect(BooleanUtil.toBoolean('no')).toBe(false);
      expect(BooleanUtil.toBoolean('1')).toBe(true);
      expect(BooleanUtil.toBoolean('0')).toBe(false);
      expect(BooleanUtil.toBoolean(' TRUE ')).toBe(true);
      expect(BooleanUtil.toBoolean(' FALSE ')).toBe(false);

      // 布尔值转换
      expect(BooleanUtil.toBoolean(true)).toBe(true);
      expect(BooleanUtil.toBoolean(false)).toBe(false);

      // null/undefined 转换
      expect(BooleanUtil.toBoolean(null)).toBe(false);
      expect(BooleanUtil.toBoolean(undefined)).toBe(false);

      // 对象转换
      expect(BooleanUtil.toBoolean({})).toBe(true);
      expect(BooleanUtil.toBoolean([])).toBe(true);
    });
  });

  // Y/N 转换测试
  describe('Y/N conversion', () => {
    it('should convert boolean to Y/N', () => {
      expect(BooleanUtil.toYN(true)).toBe('Y');
      expect(BooleanUtil.toYN(false)).toBe('N');
    });

    it('should convert Y/N to boolean', () => {
      expect(BooleanUtil.fromYN('Y')).toBe(true);
      expect(BooleanUtil.fromYN('N')).toBe(false);
      expect(BooleanUtil.fromYN('y')).toBe(true);
      expect(BooleanUtil.fromYN('n')).toBe(false);
      expect(BooleanUtil.fromYN('yes')).toBe(false);
      expect(BooleanUtil.fromYN('no')).toBe(false);
    });
  });

  // 数字转换测试
  describe('number conversion', () => {
    it('should convert boolean to number', () => {
      expect(BooleanUtil.toNumber(true)).toBe(1);
      expect(BooleanUtil.toNumber(false)).toBe(0);
    });

    it('should convert number to boolean', () => {
      expect(BooleanUtil.fromNumber(1)).toBe(true);
      expect(BooleanUtil.fromNumber(0)).toBe(false);
      expect(BooleanUtil.fromNumber(2)).toBe(false);
      expect(BooleanUtil.fromNumber(-1)).toBe(false);
    });
  });

  // 布尔运算测试
  describe('boolean operations', () => {
    it('should negate boolean value', () => {
      expect(BooleanUtil.negate(true)).toBe(false);
      expect(BooleanUtil.negate(false)).toBe(true);
    });

    it('should perform AND operation', () => {
      expect(BooleanUtil.and([true, true])).toBe(true);
      expect(BooleanUtil.and([true, false])).toBe(false);
      expect(BooleanUtil.and([false, false])).toBe(false);
      expect(BooleanUtil.and([])).toBe(true); // 空数组返回 true
    });

    it('should perform OR operation', () => {
      expect(BooleanUtil.or([true, true])).toBe(true);
      expect(BooleanUtil.or([true, false])).toBe(true);
      expect(BooleanUtil.or([false, false])).toBe(false);
      expect(BooleanUtil.or([])).toBe(false); // 空数组返回 false
    });
  });
}); 