/**
 * IndexedDB 工具类,提供对 IndexedDB 数据库的简单封装
 */
export class IDBUtil {
  private static db: IDBDatabase | null = null;
  private static readonly DEFAULT_STORE = 'keyval';
  private static readonly DEFAULT_DB = 'jscommon';
  private static readonly VERSION = 1;
  private static currentStoreName: string = this.DEFAULT_STORE;

  /**
   * 初始化数据库
   * @param dbName - 数据库名称
   * @param storeName - 存储空间名称
   * @returns Promise<void>
   * @example
   * ```ts
   * // 使用默认配置初始化
   * await IDBUtil.init();
   * 
   * // 自定义数据库和存储空间名称
   * await IDBUtil.init('myDB', 'myStore');
   * ```
   */
  static async init(
    dbName: string = this.DEFAULT_DB,
    storeName: string = this.DEFAULT_STORE
  ): Promise<void> {
    if (this.db) return;

    this.currentStoreName = storeName;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, this.VERSION);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };
    });
  }

  /**
   * 获取存储项
   * @param key - 存储键
   * @param storeName - 存储空间名称
   * @returns Promise<T | null>
   * @example
   * ```ts
   * // 获取存储的用户信息
   * const userInfo = await IDBUtil.getItem<UserInfo>('userInfo');
   * ```
   */
  static async getItem<T>(
    key: string,
    storeName: string = this.currentStoreName
  ): Promise<T | null> {
    try {
      await this.ensureInit();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(request.result || null);
        };
      });
    } catch (err) {
      console.error('IDBUtil getItem error:', err);
      return null;
    }
  }

  /**
   * 设置存储项
   * @param key - 存储键
   * @param value - 要存储的值
   * @param storeName - 存储空间名称
   * @returns Promise<T>
   * @example
   * ```ts
   * // 存储用户信息
   * await IDBUtil.setItem('userInfo', { id: 1, name: 'John' });
   * ```
   */
  static async setItem<T>(
    key: string,
    value: T,
    storeName: string = this.currentStoreName
  ): Promise<T> {
    try {
      await this.ensureInit();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(value, key);

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(value);
        };
      });
    } catch (err) {
      console.error('IDBUtil setItem error:', err);
      throw err;
    }
  }

  /**
   * 移除存储项
   * @param key - 要移除的键
   * @param storeName - 存储空间名称
   * @returns Promise<void>
   * @example
   * ```ts
   * // 移除用户信息
   * await IDBUtil.removeItem('userInfo');
   * ```
   */
  static async removeItem(
    key: string,
    storeName: string = this.currentStoreName
  ): Promise<void> {
    try {
      await this.ensureInit();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve();
        };
      });
    } catch (err) {
      console.error('IDBUtil removeItem error:', err);
      throw err;
    }
  }

  /**
   * 清空存储空间
   * @param storeName - 存储空间名称
   * @returns Promise<void>
   * @example
   * ```ts
   * // 清空默认存储空间
   * await IDBUtil.clear();
   * ```
   */
  static async clear(storeName: string = this.currentStoreName): Promise<void> {
    try {
      await this.ensureInit();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve();
        };
      });
    } catch (err) {
      console.error('IDBUtil clear error:', err);
      throw err;
    }
  }

  /**
   * 获取存储项数量
   * @param storeName - 存储空间名称
   * @returns Promise<number>
   * @example
   * ```ts
   * // 获取存储项数量
   * const length = await IDBUtil.getLength();
   * console.log(`Storage has ${length} items`);
   * ```
   */
  static async getLength(storeName: string = this.currentStoreName): Promise<number> {
    try {
      await this.ensureInit();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.count();

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(request.result);
        };
      });
    } catch (err) {
      console.error('IDBUtil getLength error:', err);
      return 0;
    }
  }

  /**
   * 获取指定索引的键名
   * @param index - 索引
   * @param storeName - 存储空间名称
   * @returns Promise<string | null>
   * @example
   * ```ts
   * // 获取第一个存储项的键名
   * const firstKey = await IDBUtil.key(0);
   * ```
   */
  static async key(index: number, storeName: string = this.currentStoreName): Promise<string | null> {
    try {
      const keys = await this.keys(storeName);
      return keys[index] || null;
    } catch (err) {
      console.error('IDBUtil key error:', err);
      return null;
    }
  }

  /**
   * 获取所有键
   * @param storeName - 存储空间名称
   * @returns Promise<string[]>
   * @example
   * ```ts
   * // 获取所有存储键
   * const keys = await IDBUtil.keys();
   * console.log('Stored keys:', keys);
   * ```
   */
  static async keys(storeName: string = this.currentStoreName): Promise<string[]> {
    try {
      await this.ensureInit();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAllKeys();

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(Array.from(request.result) as string[]);
        };
      });
    } catch (err) {
      console.error('IDBUtil keys error:', err);
      return [];
    }
  }

  /**
   * 遍历所有存储项
   * @param iteratee - 迭代器函数
   * @param storeName - 存储空间名称
   * @returns Promise<U | undefined>
   * @example
   * ```ts
   * // 遍历所有存储项并打印
   * await IDBUtil.iterate((value, key, index) => {
   *   console.log(`${key}: ${JSON.stringify(value)} (index: ${index})`);
   * });
   * ```
   */
  static async iterate<T, U>(
    iteratee: (value: T, key: string, iterationNumber: number) => U,
    storeName: string = this.currentStoreName
  ): Promise<U | undefined> {
    try {
      await this.ensureInit();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.openCursor();
        let iterationNumber = 0;
        let result: U | undefined;

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            result = iteratee(cursor.value, cursor.key as string, iterationNumber++);
            cursor.continue();
          } else {
            resolve(result);
          }
        };
      });
    } catch (err) {
      console.error('IDBUtil iterate error:', err);
      return undefined;
    }
  }

  /**
   * 获取所有存储项的值
   * @param storeName - 存储空间名称
   * @returns Promise<T[]>
   * @example
   * ```ts
   * // 获取所有存储项的值
   * const values = await IDBUtil.values();
   * ```
   */
  static async values<T>(storeName: string = this.currentStoreName): Promise<T[]> {
    try {
      await this.ensureInit();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(request.result);
        };
      });
    } catch (err) {
      console.error('IDBUtil values error:', err);
      return [];
    }
  }

  /**
   * 批量设置存储项
   * @param items - 要存储的键值对数组
   * @param storeName - 存储空间名称
   * @returns Promise<void>
   * @example
   * ```ts
   * // 批量存储数据
   * await IDBUtil.setItems([
   *   ['key1', 'value1'],
   *   ['key2', { id: 2, name: 'test' }]
   * ]);
   * ```
   */
  static async setItems<T>(
    items: Array<[string, T]>,
    storeName: string = this.currentStoreName
  ): Promise<void> {
    try {
      await this.ensureInit();

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        let completed = 0;

        transaction.oncomplete = () => {
          resolve();
        };

        transaction.onerror = () => {
          reject(transaction.error);
        };

        items.forEach(([key, value]) => {
          store.put(value, key);
        });
      });
    } catch (err) {
      console.error('IDBUtil setItems error:', err);
      throw err;
    }
  }

  /**
   * 批量获取存储项
   * @param keys - 要获取的键数组
   * @param storeName - 存储空间名称
   * @returns Promise<Array<T | null>>
   * @example
   * ```ts
   * // 批量获取数据
   * const values = await IDBUtil.getItems(['key1', 'key2']);
   * ```
   */
  static async getItems<T>(
    keys: string[],
    storeName: string = this.currentStoreName
  ): Promise<Array<T | null>> {
    try {
      const results: Array<T | null> = [];
      for (const key of keys) {
        const value = await this.getItem<T>(key, storeName);
        results.push(value);
      }
      return results;
    } catch (err) {
      console.error('IDBUtil getItems error:', err);
      return keys.map(() => null);
    }
  }

  /**
   * 关闭数据库连接
   * @example
   * ```ts
   * // 关闭数据库连接
   * IDBUtil.close();
   * ```
   */
  static close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  /**
   * 删除数据库
   * @param dbName - 数据库名称
   * @returns Promise<void>
   * @example
   * ```ts
   * // 删除数据库
   * await IDBUtil.deleteDatabase('myDB');
   * ```
   */
  static async deleteDatabase(dbName: string = this.DEFAULT_DB): Promise<void> {
    try {
      this.close();

      return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(dbName);

        request.onerror = () => {
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve();
        };
      });
    } catch (err) {
      console.error('IDBUtil deleteDatabase error:', err);
      throw err;
    }
  }

  /**
   * 检查浏览器是否支持 IndexedDB
   * @returns boolean
   * @example
   * ```ts
   * // 检查浏览器支持
   * if (IDBUtil.isSupported()) {
   *   await IDBUtil.init();
   * }
   * ```
   */
  static isSupported(): boolean {
    return typeof indexedDB !== 'undefined';
  }

  /**
   * 获取当前数据库信息
   * @returns 数据库信息对象
   * @example
   * ```ts
   * // 获取数据库信息
   * const info = IDBUtil.getInfo();
   * console.log('Database name:', info.name);
   * ```
   */
  static getInfo(): { name: string; version: number; objectStoreNames: string[] } | null {
    if (!this.db) return null;
    
    return {
      name: this.db.name,
      version: this.db.version,
      objectStoreNames: Array.from(this.db.objectStoreNames)
    };
  }

  private static async ensureInit(): Promise<void> {
    if (!this.db) {
      await this.init();
    }
  }
} 