import { describe, it, expect } from 'vitest';
import { NullUtil } from '../../src/lang/NullUtil';

describe('NullUtil', () => {
  // 类型检查测试
  describe('type checking', () => {
    it('should check if value is null', () => {
      expect(NullUtil.isNull(null)).toBe(true);
      expect(NullUtil.isNull(undefined)).toBe(false);
      expect(NullUtil.isNull(0)).toBe(false);
      expect(NullUtil.isNull('')).toBe(false);
      expect(NullUtil.isNull(false)).toBe(false);
      expect(NullUtil.isNull({})).toBe(false);
      expect(NullUtil.isNull([])).toBe(false);
    });

    it('should check if value is null or undefined', () => {
      expect(NullUtil.isNullOrUndefined(null)).toBe(true);
      expect(NullUtil.isNullOrUndefined(undefined)).toBe(true);
      expect(NullUtil.isNullOrUndefined(0)).toBe(false);
      expect(NullUtil.isNullOrUndefined('')).toBe(false);
      expect(NullUtil.isNullOrUndefined(false)).toBe(false);
      expect(NullUtil.isNullOrUndefined({})).toBe(false);
      expect(NullUtil.isNullOrUndefined([])).toBe(false);
    });
  });

  // 默认值处理测试
  describe('default value handling', () => {
    it('should return default value if null', () => {
      expect(NullUtil.defaultIfNull(null, 'default')).toBe('default');
      expect(NullUtil.defaultIfNull('value', 'default')).toBe('value');
      expect(NullUtil.defaultIfNull(undefined, 'default')).toBe(undefined);
      expect(NullUtil.defaultIfNull(0, 1)).toBe(0);
      expect(NullUtil.defaultIfNull('', 'default')).toBe('');
    });

    it('should return default value if null or undefined', () => {
      expect(NullUtil.defaultIfNullOrUndefined(null, 'default')).toBe('default');
      expect(NullUtil.defaultIfNullOrUndefined(undefined, 'default')).toBe('default');
      expect(NullUtil.defaultIfNullOrUndefined('value', 'default')).toBe('value');
      expect(NullUtil.defaultIfNullOrUndefined(0, 1)).toBe(0);
      expect(NullUtil.defaultIfNullOrUndefined('', 'default')).toBe('');
    });
  });

  // 空值合并测试
  describe('coalesce', () => {
    it('should return first non-null value', () => {
      expect(NullUtil.coalesce(null, null, null)).toBe(null);  // Expected output: null
      expect(NullUtil.coalesce('first', 'second', null)).toBe('first');  // Expected output: 'first'
    });
  });

  describe('coalesceUndefined', () => {
    it('should return first non-null and non-undefined value', () => {
      expect(NullUtil.coalesceUndefined(null, undefined, 'value')).toBe('value');  // Expected output: 'value'
      expect(NullUtil.coalesceUndefined(null, undefined, null)).toBe(undefined);  // Expected output: undefined
    });
  });

  // 非空检查测试
  describe('non-null requirements', () => {
    it('should throw error if value is null', () => {
      expect(() => NullUtil.requireNonNull(null)).toThrow('Value cannot be null');
      expect(() => NullUtil.requireNonNull(null, 'Custom message')).toThrow('Custom message');
      expect(NullUtil.requireNonNull('value')).toBe('value');
      expect(NullUtil.requireNonNull(undefined)).toBe(undefined);
      expect(NullUtil.requireNonNull(0)).toBe(0);
    });

    it('should throw error if value is null or undefined', () => {
      expect(() => NullUtil.requireNonNullOrUndefined(null))
        .toThrow('Value cannot be null or undefined');
      expect(() => NullUtil.requireNonNullOrUndefined(undefined))
        .toThrow('Value cannot be null or undefined');
      expect(() => NullUtil.requireNonNullOrUndefined(null, 'Custom message'))
        .toThrow('Custom message');
      expect(NullUtil.requireNonNullOrUndefined('value')).toBe('value');
      expect(NullUtil.requireNonNullOrUndefined(0)).toBe(0);
      expect(NullUtil.requireNonNullOrUndefined('')).toBe('');
    });
  });

  // 边界情况测试
  describe('edge cases', () => {
    it('should handle edge cases for default values', () => {
      expect(NullUtil.defaultIfNull(null, null)).toBe(null);
      expect(NullUtil.defaultIfNullOrUndefined(null, null)).toBe(null);
      expect(NullUtil.defaultIfNullOrUndefined(undefined, undefined)).toBe(undefined);
    });

    it('should handle edge cases for coalesce', () => {
      expect(NullUtil.coalesce()).toBe(null);
      expect(NullUtil.coalesceUndefined()).toBe(undefined);
      expect(NullUtil.coalesce(null)).toBe(null);
      expect(NullUtil.coalesceUndefined(null)).toBe(undefined);
    });

    it('should handle various types', () => {
      const obj = {};
      const arr = [];
      const func = () => {};

      expect(NullUtil.defaultIfNull(null, obj)).toBe(obj);
      expect(NullUtil.defaultIfNull(null, arr)).toBe(arr);
      expect(NullUtil.defaultIfNull(null, func)).toBe(func);
      expect(NullUtil.defaultIfNullOrUndefined(undefined, obj)).toBe(obj);
    });
  });
}); 