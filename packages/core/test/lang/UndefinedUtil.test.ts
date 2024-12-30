import { describe, it, expect } from 'vitest';
import { UndefinedUtil } from '../../src/lang/UndefinedUtil';

describe('UndefinedUtil', () => {
  describe('isUndefined', () => {
    it('should return true for undefined values', () => {
      expect(UndefinedUtil.isUndefined(undefined)).toBe(true);
      expect(UndefinedUtil.isUndefined(void 0)).toBe(true);
    });

    it('should return false for non-undefined values', () => {
      expect(UndefinedUtil.isUndefined(null)).toBe(false);
      expect(UndefinedUtil.isUndefined('')).toBe(false);
      expect(UndefinedUtil.isUndefined(0)).toBe(false);
      expect(UndefinedUtil.isUndefined(false)).toBe(false);
      expect(UndefinedUtil.isUndefined({})).toBe(false);
      expect(UndefinedUtil.isUndefined([])).toBe(false);
      expect(UndefinedUtil.isUndefined(() => {})).toBe(false);
    });
  });

  describe('defaultTo', () => {
    it('should return default value for undefined', () => {
      expect(UndefinedUtil.defaultTo(undefined, 'default')).toBe('default');
      expect(UndefinedUtil.defaultTo(void 0, 42)).toBe(42);
    });

    it('should return original value for non-undefined values', () => {
      expect(UndefinedUtil.defaultTo('value', 'default')).toBe('value');
      expect(UndefinedUtil.defaultTo(null, 'default')).toBe(null);
      expect(UndefinedUtil.defaultTo(0, 1)).toBe(0);
      expect(UndefinedUtil.defaultTo(false, true)).toBe(false);
    });
  });

  describe('hasUndefined', () => {
    const testObj = {
      a: {
        b: undefined,
        c: null,
        d: {
          e: undefined
        }
      },
      f: 'value'
    };

    it('should return true for undefined properties', () => {
      expect(UndefinedUtil.hasUndefined(testObj, 'a.b')).toBe(true);
      expect(UndefinedUtil.hasUndefined(testObj, 'a.d.e')).toBe(true);
      expect(UndefinedUtil.hasUndefined(testObj, 'a.x')).toBe(true);
    });

    it('should return false for non-undefined properties', () => {
      expect(UndefinedUtil.hasUndefined(testObj, 'a')).toBe(false);
      expect(UndefinedUtil.hasUndefined(testObj, 'a.c')).toBe(false);
      expect(UndefinedUtil.hasUndefined(testObj, 'f')).toBe(false);
    });
  });

  describe('omitUndefined', () => {
    it('should remove undefined properties', () => {
      const obj = {
        a: 1,
        b: undefined,
        c: null,
        d: {
          e: undefined,
          f: 2
        }
      };

      const result = UndefinedUtil.omitUndefined(obj);

      expect(result).toEqual({
        a: 1,
        c: null,
        d: {
          f: 2
        }
      });
    });

    it('should handle empty object', () => {
      expect(UndefinedUtil.omitUndefined({})).toEqual({});
    });

    it('should handle object with all undefined values', () => {
      expect(UndefinedUtil.omitUndefined({
        a: undefined,
        b: undefined
      })).toEqual({});
    });
  });
}); 