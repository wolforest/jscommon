import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CookieUtil } from '../../src/storage/CookieUtil';
import Cookies from 'js-cookie';

// Mock js-cookie
vi.mock('js-cookie', () => {
  return {
    default: {
      set: vi.fn(),
      get: vi.fn(),
      remove: vi.fn(),
      withAttributes: vi.fn(),
      withConverter: vi.fn()
    }
  };
});

describe('CookieUtil', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('set', () => {
    it('should set cookie with name and value', () => {
      CookieUtil.set('name', 'value');
      expect(Cookies.set).toHaveBeenCalledWith('name', 'value', undefined);
    });

    it('should set cookie with options', () => {
      const options = { expires: 7, path: '/' };
      CookieUtil.set('name', 'value', options);
      expect(Cookies.set).toHaveBeenCalledWith('name', 'value', options);
    });
  });

  describe('get', () => {
    it('should get cookie value by name', () => {
      (Cookies.get as any).mockReturnValue('value');
      
      const result = CookieUtil.get('name');
      
      expect(Cookies.get).toHaveBeenCalledWith('name');
      expect(result).toBe('value');
    });

    it('should return undefined for non-existent cookie', () => {
      (Cookies.get as any).mockReturnValue(undefined);
      
      const result = CookieUtil.get('nonexistent');
      
      expect(result).toBeUndefined();
    });
  });

  describe('getAll', () => {
    it('should get all cookies', () => {
      const mockCookies = { name1: 'value1', name2: 'value2' };
      (Cookies.get as any).mockReturnValue(mockCookies);
      
      const result = CookieUtil.getAll();
      
      expect(Cookies.get).toHaveBeenCalled();
      expect(result).toEqual(mockCookies);
    });

    it('should return empty object when no cookies exist', () => {
      (Cookies.get as any).mockReturnValue({});
      
      const result = CookieUtil.getAll();
      
      expect(result).toEqual({});
    });
  });

  describe('remove', () => {
    it('should remove cookie by name', () => {
      CookieUtil.remove('name');
      expect(Cookies.remove).toHaveBeenCalledWith('name', undefined);
    });

    it('should remove cookie with options', () => {
      const options = { path: '/', domain: '.example.com' };
      CookieUtil.remove('name', options);
      expect(Cookies.remove).toHaveBeenCalledWith('name', options);
    });
  });

  describe('withAttributes', () => {
    it('should create new instance with default attributes', () => {
      const attributes = { path: '/', domain: '.example.com' };
      const mockInstance = { set: vi.fn() };
      (Cookies.withAttributes as any).mockReturnValue(mockInstance);
      
      const result = CookieUtil.withAttributes(attributes);
      
      expect(Cookies.withAttributes).toHaveBeenCalledWith(attributes);
      expect(result).toBe(mockInstance);
    });
  });

  describe('withConverter', () => {
    it('should create new instance with custom converter', () => {
      const converter = {
        read: (value: string) => value.toUpperCase(),
        write: (value: string) => value.toLowerCase()
      };
      const mockInstance = { set: vi.fn() };
      (Cookies.withConverter as any).mockReturnValue(mockInstance);
      
      const result = CookieUtil.withConverter(converter);
      
      expect(Cookies.withConverter).toHaveBeenCalledWith(converter);
      expect(result).toBe(mockInstance);
    });
  });
}); 