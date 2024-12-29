import { describe, it, expect } from 'vitest';
import { URLUtil } from '../../src/net/URLUtil';

describe('URLUtil', () => {
  describe('parseQuery', () => {
    it('should parse query string from URL', () => {
      expect(URLUtil.parseQuery('https://example.com?a=1&b=2')).toEqual({ a: '1', b: '2' });
      expect(URLUtil.parseQuery('a=1&b=2')).toEqual({ a: '1', b: '2' });
    });

    it('should handle empty query', () => {
      expect(URLUtil.parseQuery('')).toEqual({});
      expect(URLUtil.parseQuery('https://example.com')).toEqual({});
    });

    it('should parse array parameters', () => {
      expect(URLUtil.parseQuery('arr[]=1&arr[]=2')).toEqual({ arr: ['1', '2'] });
    });
  });

  describe('stringifyQuery', () => {
    it('should convert object to query string', () => {
      expect(URLUtil.stringifyQuery({ a: 1, b: 2 })).toBe('a=1&b=2');
    });

    it('should handle array values', () => {
      expect(URLUtil.stringifyQuery({ arr: [1, 2] })).toBe('arr[]=1&arr[]=2');
    });

    it('should handle empty object', () => {
      expect(URLUtil.stringifyQuery({})).toBe('');
    });
  });

  describe('addParams', () => {
    it('should add parameters to URL', () => {
      expect(URLUtil.addParams('https://example.com', { a: 1 }))
        .toBe('https://example.com?a=1');
      expect(URLUtil.addParams('https://example.com?b=2', { a: 1 }))
        .toBe('https://example.com?b=2&a=1');
    });

    it('should handle empty params', () => {
      expect(URLUtil.addParams('https://example.com', {}))
        .toBe('https://example.com');
    });

    it('should handle empty URL', () => {
      expect(URLUtil.addParams('', { a: 1 })).toBe('');
    });
  });

  describe('removeParams', () => {
    it('should remove specified parameters from URL', () => {
      expect(URLUtil.removeParams('https://example.com?a=1&b=2', ['a']))
        .toBe('https://example.com?b=2');
    });

    it('should handle non-existent parameters', () => {
      expect(URLUtil.removeParams('https://example.com?a=1', ['b']))
        .toBe('https://example.com?a=1');
    });

    it('should handle empty URL', () => {
      expect(URLUtil.removeParams('', ['a'])).toBe('');
    });
  });

  describe('getDomain', () => {
    it('should extract domain from URL', () => {
      expect(URLUtil.getDomain('https://example.com/path')).toBe('example.com');
    });

    it('should handle invalid URL', () => {
      expect(URLUtil.getDomain('invalid-url')).toBe('');
    });

    it('should handle empty URL', () => {
      expect(URLUtil.getDomain('')).toBe('');
    });
  });

  describe('getPath', () => {
    it('should extract path from URL', () => {
      expect(URLUtil.getPath('https://example.com/path/to/resource'))
        .toBe('/path/to/resource');
    });

    it('should handle URL without path', () => {
      expect(URLUtil.getPath('https://example.com')).toBe('/');
    });

    it('should handle empty URL', () => {
      expect(URLUtil.getPath('')).toBe('');
    });
  });

  describe('isAbsolute', () => {
    it('should identify absolute URLs', () => {
      expect(URLUtil.isAbsolute('https://example.com')).toBe(true);
      expect(URLUtil.isAbsolute('http://example.com')).toBe(true);
    });

    it('should identify relative URLs', () => {
      expect(URLUtil.isAbsolute('/path')).toBe(false);
      expect(URLUtil.isAbsolute('path')).toBe(false);
    });

    it('should handle empty URL', () => {
      expect(URLUtil.isAbsolute('')).toBe(false);
    });
  });

  describe('join', () => {
    it('should join URL parts correctly', () => {
      expect(URLUtil.join('https://example.com', 'api', 'users'))
        .toBe('https://example.com/api/users');
    });

    it('should handle trailing slashes', () => {
      expect(URLUtil.join('https://example.com/', '/api/', '/users/'))
        .toBe('https://example.com/api/users');
    });

    it('should handle empty parts', () => {
      expect(URLUtil.join('https://example.com', '', 'users'))
        .toBe('https://example.com/users');
    });
  });

  describe('normalize', () => {
    it('should normalize URL paths', () => {
      expect(URLUtil.normalize('https://example.com//path//to///resource'))
        .toBe('https://example.com/path/to/resource');
    });

    it('should handle invalid URLs', () => {
      expect(URLUtil.normalize('invalid//url//path'))
        .toBe('invalid/url/path');
    });

    it('should handle empty URL', () => {
      expect(URLUtil.normalize('')).toBe('');
    });
  });

  describe('getProtocol', () => {
    it('should extract protocol from URL', () => {
      expect(URLUtil.getProtocol('https://example.com')).toBe('https:');
      expect(URLUtil.getProtocol('http://example.com')).toBe('http:');
    });

    it('should handle invalid URL', () => {
      expect(URLUtil.getProtocol('invalid-url')).toBe('');
    });

    it('should handle empty URL', () => {
      expect(URLUtil.getProtocol('')).toBe('');
    });
  });

  describe('getHash', () => {
    it('should extract hash from URL', () => {
      expect(URLUtil.getHash('https://example.com#section1')).toBe('section1');
    });

    it('should handle URL without hash', () => {
      expect(URLUtil.getHash('https://example.com')).toBe('');
    });

    it('should handle empty URL', () => {
      expect(URLUtil.getHash('')).toBe('');
    });
  });
});