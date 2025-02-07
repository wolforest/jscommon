/**
 * IndexedDB 工具类,提供对 IndexedDB 数据库的简单封装
 */
export class IDBUtil {
  private static db: IDBDatabase | null = null;
  private static readonly DEFAULT_STORE = 'keyval';
  private static readonly DEFAULT_DB = 'jscommon';
  private static readonly VERSION = 1;

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
    storeName: string = this.DEFAULT_STORE
  ): Promise<T | null> {
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
    storeName: string = this.DEFAULT_STORE
  ): Promise<T> {
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
    storeName: string = this.DEFAULT_STORE
  ): Promise<void> {
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
  static async clear(storeName: string = this.DEFAULT_STORE): Promise<void> {
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
  }

  /**
   * 获取所有键
   * @param storeName - 存储空间名称
   * @returns Promise<string[]>
   * @example
   * ```ts
   * // 获取所有存储键
   * const keys = await IDBUtil.keys();
   * ```
   */
  static async keys(storeName: string = this.DEFAULT_STORE): Promise<string[]> {
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
  }

  /**
   * 获取存储项数量
   * @param storeName - 存储空间名称
   * @returns Promise<number>
   * @example
   * ```ts
   * // 获取存储项数量
   * const count = await IDBUtil.count();
   * ```
   */
  static async count(storeName: string = this.DEFAULT_STORE): Promise<number> {
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
  }

  private static async ensureInit(): Promise<void> {
    if (!this.db) {
      await this.init();
    }
  }
} 