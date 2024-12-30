import { describe, it, expect } from 'vitest';
import { JSONUtil } from '../../src/lang/JSONUtil';

describe('JSONUtil', () => {
  // Basic operations
  describe('basic operations', () => {
    it('should check empty object correctly', () => {
      expect(JSONUtil.isEmpty(null)).toBe(true);
      expect(JSONUtil.isEmpty({})).toBe(true);
      expect(JSONUtil.isEmpty({ name: 'test' })).toBe(false);
    });

    it('should check non-empty object correctly', () => {
      expect(JSONUtil.notEmpty(null)).toBe(false);
      expect(JSONUtil.notEmpty({})).toBe(false);
      expect(JSONUtil.notEmpty({ name: 'test' })).toBe(true);
    });
  });

  // JSON parsing
  describe('json parsing', () => {
    it('should parse valid JSON string correctly', () => {
      expect(JSONUtil.parse('{"name":"test"}')).toEqual({ name: 'test' });
    });

    it('should throw error when parsing invalid JSON', () => {
      expect(() => JSONUtil.parse('invalid')).toThrow(SyntaxError);
    });

    it('should parse JSON array correctly', () => {
      expect(JSONUtil.parseArray('[1,2,3]')).toEqual([1, 2, 3]);
    });

    it('should throw error when parsing non-array JSON', () => {
      expect(() => JSONUtil.parseArray('{"a":1}')).toThrow(TypeError);
    });
  });

  // Object operations
  describe('object operations', () => {
    const testObj = { a: { b: { c: 1 } } };

    it('should get nested object by dot notation', () => {
      expect(JSONUtil.getJSONObject(testObj, 'a.b')).toEqual({ c: 1 });
      expect(JSONUtil.getJSONObject(testObj, 'a.x')).toBeNull();
      expect(JSONUtil.getJSONObject(testObj, '')).toBeNull();
    });

    it('should get nested object by key array', () => {
      expect(JSONUtil.getJSONObjectByKeys(testObj, ['a', 'b'])).toEqual({ c: 1 });
      expect(JSONUtil.getJSONObjectByKeys(testObj, [])).toBeNull();
      expect(JSONUtil.getJSONObjectByKeys(testObj, ['a', 'x'])).toBeNull();
      
      const invalidObj = { a: 'not-an-object' };
      expect(JSONUtil.getJSONObjectByKeys(invalidObj, ['a', 'b'])).toBeNull();
    });
  });

  // String operations
  describe('string operations', () => {
    it('should convert object to JSON string', () => {
      expect(JSONUtil.toJSONString({ name: 'test' })).toBe('{"name":"test"}');
      expect(JSONUtil.toJSONString(null)).toBe('{}');
      expect(JSONUtil.toJSONString(undefined)).toBe('{}');
    });

    it('should convert JSON string to plain string', () => {
      expect(JSONUtil.toPlainString('{"name":"test"}')).toBe('name test');
      expect(JSONUtil.toPlainString(null)).toBe('');
      
      const complexInput = '{"items":["test1","test2"],"count":2}';
      expect(JSONUtil.toPlainString(complexInput)).toBe('items test1 test2 count 2');
    });
  });
}); 