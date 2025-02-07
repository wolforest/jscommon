import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { IDBUtil } from '../../src/storage/IDBUtil';

// Mock IndexedDB
const indexedDB = {
  open: vi.fn(),
  deleteDatabase: vi.fn()
};

const mockRequest = {
  onerror: null as any,
  onsuccess: null as any,
  onupgradeneeded: null as any,
  error: null,
  result: null as any
};

const mockTransaction = {
  objectStore: vi.fn()
};

const mockObjectStore = {
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  clear: vi.fn(),
  getAllKeys: vi.fn(),
  count: vi.fn()
};

describe('IDBUtil', () => {
  beforeEach(() => {
    // 设置全局 indexedDB mock
    (global as any).indexedDB = indexedDB;

    // 重置所有 mock
    vi.clearAllMocks();

    // 设置基本的 mock 实现
    indexedDB.open.mockReturnValue(mockRequest);
    mockTransaction.objectStore.mockReturnValue(mockObjectStore);
  });

  afterEach(async () => {
    // 清理
    IDBUtil.close();
  });

  describe('init', () => {
    it('should initialize database successfully', async () => {
      const initPromise = IDBUtil.init();
      
      // 模拟成功初始化
      mockRequest.onsuccess({ target: { result: { 
        transaction: vi.fn().mockReturnValue(mockTransaction),
        close: vi.fn()
      }}});

      await expect(initPromise).resolves.toBeUndefined();
    });

    it('should handle initialization error', async () => {
      const initPromise = IDBUtil.init();
      
      // 模拟初始化错误
      mockRequest.onerror({ target: { error: new Error('Init failed') }});

      await expect(initPromise).rejects.toThrow('Init failed');
    });
  });

  describe('CRUD operations', () => {
    beforeEach(async () => {
      // 初始化数据库
      const initPromise = IDBUtil.init();
      mockRequest.onsuccess({ target: { result: { 
        transaction: vi.fn().mockReturnValue(mockTransaction),
        close: vi.fn()
      }}});
      await initPromise;
    });

    describe('getItem', () => {
      it('should get item successfully', async () => {
        const mockValue = { id: 1, name: 'test' };
        mockObjectStore.get.mockImplementation(() => {
          const request = { result: mockValue };
          setTimeout(() => request.onsuccess({ target: request }));
          return request;
        });

        const result = await IDBUtil.getItem('testKey');
        expect(result).toEqual(mockValue);
      });

      it('should return null for non-existent key', async () => {
        mockObjectStore.get.mockImplementation(() => {
          const request = { result: undefined };
          setTimeout(() => request.onsuccess({ target: request }));
          return request;
        });

        const result = await IDBUtil.getItem('nonexistent');
        expect(result).toBeNull();
      });
    });

    describe('setItem', () => {
      it('should set item successfully', async () => {
        const value = { id: 1, name: 'test' };
        mockObjectStore.put.mockImplementation(() => {
          const request = {};
          setTimeout(() => request.onsuccess());
          return request;
        });

        const result = await IDBUtil.setItem('testKey', value);
        expect(result).toEqual(value);
      });
    });

    describe('removeItem', () => {
      it('should remove item successfully', async () => {
        mockObjectStore.delete.mockImplementation(() => {
          const request = {};
          setTimeout(() => request.onsuccess());
          return request;
        });

        await expect(IDBUtil.removeItem('testKey')).resolves.toBeUndefined();
      });
    });

    describe('clear', () => {
      it('should clear store successfully', async () => {
        mockObjectStore.clear.mockImplementation(() => {
          const request = {};
          setTimeout(() => request.onsuccess());
          return request;
        });

        await expect(IDBUtil.clear()).resolves.toBeUndefined();
      });
    });
  });

  describe('utility methods', () => {
    beforeEach(async () => {
      // 初始化数据库
      const initPromise = IDBUtil.init();
      mockRequest.onsuccess({ target: { result: { 
        transaction: vi.fn().mockReturnValue(mockTransaction),
        close: vi.fn()
      }}});
      await initPromise;
    });

    describe('keys', () => {
      it('should get all keys successfully', async () => {
        const mockKeys = ['key1', 'key2'];
        mockObjectStore.getAllKeys.mockImplementation(() => {
          const request = { result: mockKeys };
          setTimeout(() => request.onsuccess({ target: request }));
          return request;
        });

        const result = await IDBUtil.keys();
        expect(result).toEqual(mockKeys);
      });
    });

    describe('count', () => {
      it('should get count successfully', async () => {
        mockObjectStore.count.mockImplementation(() => {
          const request = { result: 5 };
          setTimeout(() => request.onsuccess({ target: request }));
          return request;
        });

        const result = await IDBUtil.count();
        expect(result).toBe(5);
      });
    });
  });

  describe('database management', () => {
    it('should close database', () => {
      const mockClose = vi.fn();
      IDBUtil['db'] = { close: mockClose } as any;
      
      IDBUtil.close();
      
      expect(mockClose).toHaveBeenCalled();
      expect(IDBUtil['db']).toBeNull();
    });

    it('should delete database', async () => {
      const deletePromise = IDBUtil.deleteDatabase();

      mockRequest.onsuccess();

      await expect(deletePromise).resolves.toBeUndefined();
      expect(indexedDB.deleteDatabase).toHaveBeenCalled();
    });
  });
}); 