import localforage from 'localforage';

export class StorageUtil {
  /**
   * 获取存储项
   * @param key - 存储键
   * @returns 存储的值
   * @example
   * ```ts
   * // 获取存储的用户信息
   * const userInfo = await StorageUtil.getItem('userInfo');
   * ```
   */
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      return await localforage.getItem<T>(key);
    } catch (err) {
      console.error('StorageUtil getItem error:', err);
      return null;
    }
  }

  /**
   * 设置存储项
   * @param key - 存储键
   * @param value - 要存储的值
   * @returns 存储的值
   * @example
   * ```ts
   * // 存储用户信息
   * await StorageUtil.setItem('userInfo', { id: 1, name: 'John' });
   * ```
   */
  static async setItem<T>(key: string, value: T): Promise<T> {
    try {
      return await localforage.setItem<T>(key, value);
    } catch (err) {
      console.error('StorageUtil setItem error:', err);
      throw err;
    }
  }

  /**
   * 移除存储项
   * @param key - 要移除的键
   * @example
   * ```ts
   * // 移除用户信息
   * await StorageUtil.removeItem('userInfo');
   * ```
   */
  static async removeItem(key: string): Promise<void> {
    try {
      await localforage.removeItem(key);
    } catch (err) {
      console.error('StorageUtil removeItem error:', err);
      throw err;
    }
  }

  /**
   * 清空所有存储
   * @example
   * ```ts
   * // 清空所有存储
   * await StorageUtil.clear();
   * ```
   */
  static async clear(): Promise<void> {
    try {
      await localforage.clear();
    } catch (err) {
      console.error('StorageUtil clear error:', err);
      throw err;
    }
  }

/**
   * 获取存储项数量
   * @returns 存储项数量
   * @example
   * ```ts
   * // 获取存储项数量
   * const count = await StorageUtil.length();
   * console.log(`Storage has ${count} items`);
   * ```
   */
  static async getLength(): Promise<number> {
    try {
      return await localforage.length();
    } catch (err) {
      console.error('StorageUtil length error:', err);
      return 0;
    }
  }

  /**
   * 获取指定索引的键名
   * @param index - 索引
   * @returns 键名
   * @example
   * ```ts
   * // 获取第一个存储项的键名
   * const firstKey = await StorageUtil.key(0);
   * ```
   */
  static async key(index: number): Promise<string | null> {
    try {
      return await localforage.key(index);
    } catch (err) {
      console.error('StorageUtil key error:', err);
      return null;
    }
  }

  /**
   * 获取所有键名
   * @returns 键名数组
   * @example
   * ```ts
   * // 获取所有存储项的键名
   * const keys = await StorageUtil.keys();
   * console.log('Stored keys:', keys);
   * ```
   */
  static async keys(): Promise<string[]> {
    try {
      return await localforage.keys();
    } catch (err) {
      console.error('StorageUtil keys error:', err);
      return [];
    }
  }

  /**
   * 遍历所有存储项
   * @param iteratee - 迭代器函数
   * @example
   * ```ts
   * // 遍历所有存储项并打印
   * await StorageUtil.iterate((value, key, index) => {
   *   console.log(`${key}: ${JSON.stringify(value)} (index: ${index})`);
   * });
   * ```
   */
  static async iterate<T, U>(
    iteratee: (value: T, key: string, iterationNumber: number) => U
  ): Promise<U | undefined> {
    try {
      return await localforage.iterate(iteratee);
    } catch (err) {
      console.error('StorageUtil iterate error:', err);
      return undefined;
    }
  }

  /**
   * 创建新的存储实例
   * @param options - 配置选项
   * @returns 存储实例
   * @example
   * ```ts
   * // 创建一个新的存储实例
   * const userStorage = StorageUtil.createInstance({
   *   name: 'userStorage',
   *   storeName: 'user'
   * });
   * 
   * // 使用新实例存储数据
   * await userStorage.setItem('profile', { name: 'John' });
   * ```
   */
  static createInstance(options: any): typeof localforage {
    try {
      return localforage.createInstance(options);
    } catch (err) {
      console.error('StorageUtil createInstance error:', err);
      throw err;
    }
  }

  /**
   * 配置存储
   * @param options - 配置选项
   * @example
   * ```ts
   * // 配置存储
   * StorageUtil.config({
   *   name: 'myApp',
   *   storeName: 'myStore',
   *   version: 1.0
   * });
   * ```
   */
  static config(options: any): void {
    try {
      localforage.config(options);
    } catch (err) {
      console.error('StorageUtil config error:', err);
      throw err;
    }
  }

  /**
   * 获取当前驱动
   * @returns 当前驱动名称
   * @example
   * ```ts
   * // 获取当前使用的存储驱动
   * const driver = StorageUtil.driver();
   * console.log('Current driver:', driver);
   * ```
   */
  static driver(): string {
    try {
      return localforage.driver();
    } catch (err) {
      console.error('StorageUtil driver error:', err);
      return '';
    }
  }

  /**
   * 设置存储驱动
   * @param drivers - 驱动名称或驱动数组
   * @example
   * ```ts
   * // 设置存储驱动优先级
   * await StorageUtil.setDriver([
   *   localforage.INDEXEDDB,
   *   localforage.WEBSQL,
   *   localforage.LOCALSTORAGE
   * ]);
   * ```
   */
  static async setDriver(
    drivers: string | string[]
  ): Promise<void> {
    try {
      await localforage.setDriver(drivers);
    } catch (err) {
      console.error('StorageUtil setDriver error:', err);
      throw err;
    }
  }
}