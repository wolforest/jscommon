import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StorageUtil } from '../../src/storage/StorageUtil';
import localforage from "localforage";

// Mock localforage
vi.mock('localforage', () => {
  return {
    default: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: vi.fn(),
      key: vi.fn(),
      keys: vi.fn(),
      iterate: vi.fn(),
      createInstance: vi.fn(),
      config: vi.fn(),
      driver: vi.fn(),
      setDriver: vi.fn()
    }
  };
});

describe('StorageUtil', () => {
  let consoleErrorSpy: any;

  beforeEach(() => {
    // Clear all mock records
    vi.clearAllMocks();
    // Spy on console.error
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  describe('getItem', () => {
    it('should successfully get storage item', async () => {
      const mockValue = { id: 1, name: 'Test' };
      (localforage.getItem as any).mockResolvedValue(mockValue);

      const result = await StorageUtil.getItem('testKey');
      
      expect(localforage.getItem).toHaveBeenCalledWith('testKey');
      expect(result).toEqual(mockValue);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should return null and log error when error occurs', async () => {
      const error = new Error('Test error');
      (localforage.getItem as any).mockRejectedValue(error);

      const result = await StorageUtil.getItem('testKey');
      
      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith('StorageUtil getItem error:', error);
    });
  });

  describe('setItem', () => {
    it('should successfully set storage item', async () => {
      const mockValue = { id: 1, name: 'Test' };
      (localforage.setItem as any).mockResolvedValue(mockValue);

      const result = await StorageUtil.setItem('testKey', mockValue);
      
      expect(localforage.setItem).toHaveBeenCalledWith('testKey', mockValue);
      expect(result).toEqual(mockValue);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should throw error and log error when operation fails', async () => {
      const error = new Error('Test error');
      (localforage.setItem as any).mockRejectedValue(error);

      await expect(StorageUtil.setItem('testKey', 'value')).rejects.toThrow(error);
      expect(consoleErrorSpy).toHaveBeenCalledWith('StorageUtil setItem error:', error);
    });
  });

  describe('removeItem', () => {
    it('should successfully remove storage item', async () => {
      (localforage.removeItem as any).mockResolvedValue(undefined);

      await StorageUtil.removeItem('testKey');
      
      expect(localforage.removeItem).toHaveBeenCalledWith('testKey');
    });

    it('should throw error when operation fails', async () => {
      const error = new Error('Test error');
      (localforage.removeItem as any).mockRejectedValue(error);

      await expect(StorageUtil.removeItem('testKey')).rejects.toThrow(error);
    });
  });

  describe('clear', () => {
    it('should successfully clear storage', async () => {
      (localforage.clear as any).mockResolvedValue(undefined);

      await StorageUtil.clear();
      
      expect(localforage.clear).toHaveBeenCalled();
    });

    it('should throw error when operation fails', async () => {
      const error = new Error('Test error');
      (localforage.clear as any).mockRejectedValue(error);

      await expect(StorageUtil.clear()).rejects.toThrow(error);
    });
  });

  describe('length', () => {
    it('should return correct storage length', async () => {
      (localforage.length as any).mockResolvedValue(5);

      const result = await StorageUtil.getLength();
      
      expect(localforage.length).toHaveBeenCalled();
      expect(result).toBe(5);
    });

    it('should return 0 when error occurs', async () => {
      (localforage.length as any).mockRejectedValue(new Error('Test error'));

      const result = await StorageUtil.getLength();
      
      expect(result).toBe(0);
    });
  });

  describe('key', () => {
    it('should return key at specified index', async () => {
      (localforage.key as any).mockResolvedValue('testKey');

      const result = await StorageUtil.key(0);
      
      expect(localforage.key).toHaveBeenCalledWith(0);
      expect(result).toBe('testKey');
    });

    it('should return null when error occurs', async () => {
      (localforage.key as any).mockRejectedValue(new Error('Test error'));

      const result = await StorageUtil.key(0);
      
      expect(result).toBeNull();
    });
  });

  describe('keys', () => {
    it('should return all storage keys', async () => {
      const mockKeys = ['key1', 'key2', 'key3'];
      (localforage.keys as any).mockResolvedValue(mockKeys);

      const result = await StorageUtil.keys();
      
      expect(localforage.keys).toHaveBeenCalled();
      expect(result).toEqual(mockKeys);
    });

    it('should return empty array when error occurs', async () => {
      (localforage.keys as any).mockRejectedValue(new Error('Test error'));

      const result = await StorageUtil.keys();
      
      expect(result).toEqual([]);
    });
  });

  describe('iterate', () => {
    it('should correctly iterate through storage items', async () => {
      const mockResult = 'iterationResult';
      const iteratee = vi.fn();
      (localforage.iterate as any).mockResolvedValue(mockResult);

      const result = await StorageUtil.iterate(iteratee);
      
      expect(localforage.iterate).toHaveBeenCalledWith(iteratee);
      expect(result).toBe(mockResult);
    });

    it('should return undefined when error occurs', async () => {
      (localforage.iterate as any).mockRejectedValue(new Error('Test error'));

      const result = await StorageUtil.iterate(vi.fn());
      
      expect(result).toBeUndefined();
    });
  });

  describe('createInstance', () => {
    it('should create new storage instance', () => {
      const mockInstance = {};
      const options = { name: 'testInstance' };
      (localforage.createInstance as any).mockReturnValue(mockInstance);

      const result = StorageUtil.createInstance(options);
      
      expect(localforage.createInstance).toHaveBeenCalledWith(options);
      expect(result).toBe(mockInstance);
    });

    it('should throw error when operation fails', () => {
      const error = new Error('Test error');
      (localforage.createInstance as any).mockImplementation(() => {
        throw error;
      });

      expect(() => StorageUtil.createInstance({})).toThrow(error);
    });
  });

  describe('config', () => {
    it('should correctly configure storage', () => {
      const options = { name: 'testApp' };

      StorageUtil.config(options);
      
      expect(localforage.config).toHaveBeenCalledWith(options);
    });

    it('should throw error when operation fails', () => {
      const error = new Error('Test error');
      (localforage.config as any).mockImplementation(() => {
        throw error;
      });

      expect(() => StorageUtil.config({})).toThrow(error);
    });
  });

  describe('driver', () => {
    it('should return current driver name', () => {
      const mockDriver = 'INDEXEDDB';
      (localforage.driver as any).mockReturnValue(mockDriver);

      const result = StorageUtil.driver();
      
      expect(localforage.driver).toHaveBeenCalled();
      expect(result).toBe(mockDriver);
    });
  });

  describe('setDriver', () => {
    it('should successfully set driver', async () => {
      const drivers = ['INDEXEDDB'];
      (localforage.setDriver as any).mockResolvedValue(undefined);

      await StorageUtil.setDriver(drivers);
      
      expect(localforage.setDriver).toHaveBeenCalledWith(drivers);
    });

    it('should throw error when operation fails', async () => {
      const error = new Error('Test error');
      (localforage.setDriver as any).mockRejectedValue(error);

      await expect(StorageUtil.setDriver(['INDEXEDDB'])).rejects.toThrow(error);
    });
  });
}); 