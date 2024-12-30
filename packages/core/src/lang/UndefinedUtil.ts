import { isUndefined } from 'lodash-es';

export class UndefinedUtil {
  /**
   * 检查值是否是 undefined
   * @param value - 要检查的值
   * @returns 如果值是 undefined 返回 true，否则返回 false
   * @example
   * ```ts
   * UndefinedUtil.isUndefined(void 0) // => true
   * UndefinedUtil.isUndefined(null) // => false
   * UndefinedUtil.isUndefined(undefined) // => true
   * ```
   */
  static isUndefined = isUndefined;

  /**
   * 如果值是 undefined，则返回默认值
   * @param value - 要检查的值
   * @param defaultValue - 默认值
   * @returns 如果值不是 undefined 则返回原值，否则返回默认值
   * @example
   * ```ts
   * UndefinedUtil.defaultTo(undefined, 'default') // => 'default'
   * UndefinedUtil.defaultTo('value', 'default') // => 'value'
   * UndefinedUtil.defaultTo(null, 'default') // => null
   * ```
   */
  static defaultTo<T>(value: T | undefined, defaultValue: T): T {
    return isUndefined(value) ? defaultValue : value;
  }

  /**
   * 检查对象的属性是否是 undefined
   * @param obj - 要检查的对象
   * @param path - 属性路径
   * @returns 如果属性是 undefined 返回 true，否则返回 false
   * @example
   * ```ts
   * const obj = { a: { b: undefined } };
   * UndefinedUtil.hasUndefined(obj, 'a.b') // => true
   * UndefinedUtil.hasUndefined(obj, 'a.c') // => true
   * UndefinedUtil.hasUndefined(obj, 'a') // => false
   * ```
   */
  static hasUndefined(obj: any, path: string): boolean {
    const value = path.split('.').reduce((acc, key) => {
      return acc === undefined ? undefined : acc[key];
    }, obj);
    return isUndefined(value);
  }

  /**
   * 移除对象中所有值为 undefined 的属性
   * @param obj - 要处理的对象
   * @returns 移除 undefined 属性后的新对象
   * @example
   * ```ts
   * const obj = { a: 1, b: undefined, c: null };
   * UndefinedUtil.omitUndefined(obj) // => { a: 1, c: null }
   * ```
   */
  static omitUndefined<T extends object>(obj: T): Partial<T> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (!isUndefined(value)) {
        acc[key as keyof T] = value;
      }
      return acc;
    }, {} as Partial<T>);
  }
} 