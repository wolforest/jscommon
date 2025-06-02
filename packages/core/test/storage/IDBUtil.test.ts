import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IDBUtil } from '../../src/storage/IDBUtil';

// Mock IndexedDB
const mockIndexedDB = {
  open: vi.fn(),
  deleteDatabase: vi.fn()
};

const createMockRequest = () => ({
  onsuccess: vi.fn(),
  onerror: vi.fn(),
  result: null,
  error: null
});

const createMockTransaction = () => ({
  objectStore: vi.fn(),
  oncomplete: vi.fn(),
  onerror: vi.fn(),
  onabort: vi.fn()
});

const createMockObjectStore = () => ({
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  clear: vi.fn(),
  count: vi.fn(),
  getAllKeys: vi.fn(),
  getAll: vi.fn()
});

const createMockDB = () => ({
  close: vi.fn(),
  transaction: vi.fn(),
  name: 'testDB',
  version: 1,
  objectStoreNames: ['keyval']
});

// Setup global mocks
global.indexedDB = mockIndexedDB as any;

let mockRequest: any;
let mockTransaction: any;
let mockObjectStore: any;
let mockDB: any;

describe('IDBUtil', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockRequest = createMockRequest();
    mockTransaction = createMockTransaction();
    mockObjectStore = createMockObjectStore();
    mockDB = createMockDB();
    
    mockIndexedDB.open.mockReturnValue(mockRequest);
    mockDB.transaction.mockReturnValue(mockTransaction);
    mockTransaction.objectStore.mockReturnValue(mockObjectStore);
    
    // Reset IDBUtil state
    IDBUtil['db'] = null;
    IDBUtil['currentStoreName'] = 'keyval';
  });

  describe('isSupported', () => {
    it('should return true when IndexedDB is available', () => {
      expect(IDBUtil.isSupported()).toBe(true);
    });

    it('should return false when IndexedDB is not available', () => {
      const originalIndexedDB = global.indexedDB;
      delete (global as any).indexedDB;
      
      expect(IDBUtil.isSupported()).toBe(false);
      
      global.indexedDB = originalIndexedDB;
    });
  });

  describe('init', () => {
    it('should initialize database successfully', async () => {
      mockRequest.result = mockDB;
      
      const initPromise = IDBUtil.init();
      setTimeout(() => mockRequest.onsuccess());
      
      await expect(initPromise).resolves.toBeUndefined();
      expect(mockIndexedDB.open).toHaveBeenCalledWith('jscommon', 1);
    });
  });

  describe('CRUD operations', () => {
    beforeEach(async () => {
      IDBUtil['db'] = mockDB as any;
    });

    describe('getItem', () => {
      it('should get item successfully', async () => {
        const mockValue = 'test value';
        mockObjectStore.get.mockReturnValue({
          result: mockValue,
          onsuccess: vi.fn(),
          onerror: vi.fn()
        });

        const getPromise = IDBUtil.getItem('testKey');
        
        // 模拟异步成功
        setTimeout(() => {
          const request = mockObjectStore.get.mock.results[0].value;
          request.onsuccess();
        });

        const result = await getPromise;
        expect(result).toBe(mockValue);
      });

      it('should return null for non-existent key', async () => {
        mockObjectStore.get.mockReturnValue({
          result: undefined,
          onsuccess: vi.fn(),
          onerror: vi.fn()
        });

        const getPromise = IDBUtil.getItem('nonExistentKey');
        
        setTimeout(() => {
          const request = mockObjectStore.get.mock.results[0].value;
          request.onsuccess();
        });

        const result = await getPromise;
        expect(result).toBeNull();
      });
    });

    describe('setItem', () => {
      it('should set item successfully', async () => {
        const testValue = 'test value';
        mockObjectStore.put.mockReturnValue({
          onsuccess: vi.fn(),
          onerror: vi.fn()
        });

        const setPromise = IDBUtil.setItem('testKey', testValue);
        
        setTimeout(() => {
          const request = mockObjectStore.put.mock.results[0].value;
          request.onsuccess();
        });

        const result = await setPromise;
        expect(result).toBe(testValue);
        expect(mockObjectStore.put).toHaveBeenCalledWith(testValue, 'testKey');
      });
    });

    describe('removeItem', () => {
      it('should remove item successfully', async () => {
        mockObjectStore.delete.mockReturnValue({
          onsuccess: vi.fn(),
          onerror: vi.fn()
        });

        const removePromise = IDBUtil.removeItem('testKey');
        
        setTimeout(() => {
          const request = mockObjectStore.delete.mock.results[0].value;
          request.onsuccess();
        });

        await expect(removePromise).resolves.toBeUndefined();
        expect(mockObjectStore.delete).toHaveBeenCalledWith('testKey');
      });
    });

    describe('clear', () => {
      it('should clear store successfully', async () => {
        mockObjectStore.clear.mockReturnValue({
          onsuccess: vi.fn(),
          onerror: vi.fn()
        });

        const clearPromise = IDBUtil.clear();
        
        setTimeout(() => {
          const request = mockObjectStore.clear.mock.results[0].value;
          request.onsuccess();
        });

        await expect(clearPromise).resolves.toBeUndefined();
        expect(mockObjectStore.clear).toHaveBeenCalled();
      });
    });
  });

  describe('utility methods', () => {
    beforeEach(() => {
      IDBUtil['db'] = mockDB as any;
    });

    describe('getLength', () => {
      it('should get length successfully', async () => {
        const mockCount = 5;
        mockObjectStore.count.mockReturnValue({
          result: mockCount,
          onsuccess: vi.fn(),
          onerror: vi.fn()
        });

        const lengthPromise = IDBUtil.getLength();
        
        setTimeout(() => {
          const request = mockObjectStore.count.mock.results[0].value;
          request.onsuccess();
        });

        const result = await lengthPromise;
        expect(result).toBe(mockCount);
      });
    });

    describe('keys', () => {
      it('should get all keys successfully', async () => {
        const mockKeys = ['key1', 'key2', 'key3'];
        mockObjectStore.getAllKeys.mockReturnValue({
          result: mockKeys,
          onsuccess: vi.fn(),
          onerror: vi.fn()
        });

        const keysPromise = IDBUtil.keys();
        
        setTimeout(() => {
          const request = mockObjectStore.getAllKeys.mock.results[0].value;
          request.onsuccess();
        });

        const result = await keysPromise;
        expect(result).toEqual(mockKeys);
      });
    });

    describe('values', () => {
      it('should get all values successfully', async () => {
        const mockValues = ['value1', 'value2', 'value3'];
        mockObjectStore.getAll.mockReturnValue({
          result: mockValues,
          onsuccess: vi.fn(),
          onerror: vi.fn()
        });

        const valuesPromise = IDBUtil.values();
        
        setTimeout(() => {
          const request = mockObjectStore.getAll.mock.results[0].value;
          request.onsuccess();
        });

        const result = await valuesPromise;
        expect(result).toEqual(mockValues);
      });
    });
  });

  describe('batch operations', () => {
    beforeEach(() => {
      IDBUtil['db'] = mockDB as any;
    });

    describe('setItems', () => {
      it('should set multiple items successfully', async () => {
        mockObjectStore.put.mockReturnValue({
          onsuccess: vi.fn(),
          onerror: vi.fn()
        });
        
        const setItemsPromise = IDBUtil.setItems([
          ['key1', 'value1'],
          ['key2', 'value2']
        ]);
        
        setTimeout(() => mockTransaction.oncomplete());
        
        await expect(setItemsPromise).resolves.toBeUndefined();
        expect(mockObjectStore.put).toHaveBeenCalledTimes(2);
      });
    });

    describe('getItems', () => {
      it('should get multiple items successfully', async () => {
        const mockValues = ['value1', 'value2'];
        let callIndex = 0;
        
        mockObjectStore.get.mockImplementation(() => {
          const request = { 
            result: mockValues[callIndex++], 
            onerror: vi.fn(), 
            onsuccess: vi.fn() 
          };
          setTimeout(() => request.onsuccess());
          return request;
        });

        const result = await IDBUtil.getItems(['key1', 'key2']);
        expect(result).toEqual(mockValues);
      });
    });
  });

  describe('database management', () => {
    it('should close database', () => {
      IDBUtil['db'] = mockDB as any;
      
      IDBUtil.close();
      
      expect(mockDB.close).toHaveBeenCalled();
      expect(IDBUtil['db']).toBeNull();
    });

    it('should delete database', async () => {
      const mockRequest = { 
        onsuccess: vi.fn(), 
        onerror: vi.fn()
      };
      mockIndexedDB.deleteDatabase.mockReturnValue(mockRequest);
      
      const deletePromise = IDBUtil.deleteDatabase('testDB');
      
      setTimeout(() => mockRequest.onsuccess());

      await expect(deletePromise).resolves.toBeUndefined();
      expect(mockIndexedDB.deleteDatabase).toHaveBeenCalledWith('testDB');
    });

    it('should get database info', () => {
      IDBUtil['db'] = mockDB as any;
      
      const info = IDBUtil.getInfo();
      
      expect(info).toEqual({
        name: 'testDB',
        version: 1,
        objectStoreNames: ['keyval']
      });
    });

    it('should return null when no database is initialized', () => {
      IDBUtil['db'] = null;
      
      const info = IDBUtil.getInfo();
      
      expect(info).toBeNull();
    });
  });
}); 