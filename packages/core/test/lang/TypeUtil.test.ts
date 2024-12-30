import { describe, it, expect } from 'vitest';
import { TypeUtil } from '../../src/lang/TypeUtil';

describe('TypeUtil', () => {
  describe('isArguments', () => {
    it('should identify arguments objects', () => {
      function test() {
        return TypeUtil.isArguments(arguments);
      }
      expect(test()).toBe(true);
      expect(TypeUtil.isArguments([1, 2, 3])).toBe(false);
    });
  });

  describe('isBuffer', () => {
    it('should identify Buffer objects', () => {
      expect(TypeUtil.isBuffer(new Uint8Array(2))).toBe(false);
      expect(TypeUtil.isBuffer(null)).toBe(false);
    });
  });

  describe('isDate', () => {
    it('should identify Date objects', () => {
      expect(TypeUtil.isDate(new Date())).toBe(true);
      expect(TypeUtil.isDate('2024-01-01')).toBe(false);
      expect(TypeUtil.isDate(Date.now())).toBe(false);
    });
  });

  describe('isElement', () => {
    it('should identify DOM elements', () => {
      // 由于在 Node 环境中没有 DOM，这里只测试非元素情况
      expect(TypeUtil.isElement({})).toBe(false);
      expect(TypeUtil.isElement('<div>')).toBe(false);
      expect(TypeUtil.isElement(null)).toBe(false);
    });
  });

  describe('isError', () => {
    it('should identify Error objects', () => {
      expect(TypeUtil.isError(new Error())).toBe(true);
      expect(TypeUtil.isError(new TypeError())).toBe(true);
      expect(TypeUtil.isError(Error)).toBe(false);
      expect(TypeUtil.isError({ name: 'Error', message: 'test' })).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('should identify functions', () => {
      expect(TypeUtil.isFunction(function() {})).toBe(true);
      expect(TypeUtil.isFunction(() => {})).toBe(true);
      expect(TypeUtil.isFunction(class {})).toBe(true);
      expect(TypeUtil.isFunction(/abc/)).toBe(false);
      expect(TypeUtil.isFunction({})).toBe(false);
    });
  });

  describe('isMap', () => {
    it('should identify Map objects', () => {
      expect(TypeUtil.isMap(new Map())).toBe(true);
      expect(TypeUtil.isMap(new WeakMap())).toBe(false);
      expect(TypeUtil.isMap({})).toBe(false);
      expect(TypeUtil.isMap([])).toBe(false);
    });
  });

  describe('isNative', () => {
    it('should identify native functions', () => {
      expect(TypeUtil.isNative(Array.prototype.push)).toBe(true);
      expect(TypeUtil.isNative(function() {})).toBe(false);
    });
  });

  describe('isRegExp', () => {
    it('should identify RegExp objects', () => {
      expect(TypeUtil.isRegExp(/abc/)).toBe(true);
      expect(TypeUtil.isRegExp(new RegExp('abc'))).toBe(true);
      expect(TypeUtil.isRegExp('/abc/')).toBe(false);
      expect(TypeUtil.isRegExp({})).toBe(false);
    });
  });

  describe('isSet', () => {
    it('should identify Set objects', () => {
      expect(TypeUtil.isSet(new Set())).toBe(true);
      expect(TypeUtil.isSet(new WeakSet())).toBe(false);
      expect(TypeUtil.isSet([])).toBe(false);
      expect(TypeUtil.isSet({})).toBe(false);
    });
  });

  describe('isSymbol', () => {
    it('should identify Symbols', () => {
      expect(TypeUtil.isSymbol(Symbol())).toBe(true);
      expect(TypeUtil.isSymbol(Symbol.iterator)).toBe(true);
      expect(TypeUtil.isSymbol('abc')).toBe(false);
      expect(TypeUtil.isSymbol(123)).toBe(false);
    });
  });

  describe('isTypedArray', () => {
    it('should identify TypedArray objects', () => {
      expect(TypeUtil.isTypedArray(new Uint8Array())).toBe(true);
      expect(TypeUtil.isTypedArray(new Float32Array())).toBe(true);
      expect(TypeUtil.isTypedArray(new Int16Array())).toBe(true);
      expect(TypeUtil.isTypedArray([])).toBe(false);
      expect(TypeUtil.isTypedArray({})).toBe(false);
    });
  });

  describe('isWeakMap', () => {
    it('should identify WeakMap objects', () => {
      expect(TypeUtil.isWeakMap(new WeakMap())).toBe(true);
      expect(TypeUtil.isWeakMap(new Map())).toBe(false);
      expect(TypeUtil.isWeakMap({})).toBe(false);
    });
  });

  describe('isWeakSet', () => {
    it('should identify WeakSet objects', () => {
      expect(TypeUtil.isWeakSet(new WeakSet())).toBe(true);
      expect(TypeUtil.isWeakSet(new Set())).toBe(false);
      expect(TypeUtil.isWeakSet([])).toBe(false);
    });
  });
}); 