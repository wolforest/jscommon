import { isNull } from 'lodash-es';

/**
 * Null 工具类
 */
export class NullUtil {
  /**
   * 检查值是否为 null
   * @param value - 要检查的值
   * @returns 是否为 null
   * @example
   * ```ts
   * NullUtil.isNull(null) // => true
   * NullUtil.isNull(undefined) // => false
   * NullUtil.isNull(0) // => false
   * ```
   */
  static isNull = isNull;

  /**
   * 检查值是否为 null 或 undefined
   * @param value - 要检查的值
   * @returns 是否为 null 或 undefined
   * @example
   * ```ts
   * NullUtil.isNullOrUndefined(null) // => true
   * NullUtil.isNullOrUndefined(undefined) // => true
   * NullUtil.isNullOrUndefined(0) // => false
   * ```
   */
  static isNullOrUndefined(value: unknown): value is null | undefined {
    return value === null || value === undefined;
  }

  /**
   * 如果值为 null，则返回默认值
   * @param value - 要检查的值
   * @param defaultValue - 默认值
   * @returns 原值或默认值
   * @example
   * ```ts
   * NullUtil.defaultIfNull(null, 'default') // => 'default'
   * NullUtil.defaultIfNull('value', 'default') // => 'value'
   * ```
   */
  static defaultIfNull<T>(value: T | null, defaultValue: T): T {
    return value === null ? defaultValue : value;
  }

  /**
   * 如果值为 null 或 undefined，则返回默认值
   * @param value - 要检查的值
   * @param defaultValue - 默认值
   * @returns 原值或默认值
   * @example
   * ```ts
   * NullUtil.defaultIfNullOrUndefined(null, 'default') // => 'default'
   * NullUtil.defaultIfNullOrUndefined(undefined, 'default') // => 'default'
   * NullUtil.defaultIfNullOrUndefined('value', 'default') // => 'value'
   * ```
   */
  static defaultIfNullOrUndefined<T>(value: T | null | undefined, defaultValue: T): T {
    return value == null ? defaultValue : value;
  }

  /**
   * 获取第一个非 null 值
   * @param values - 值列表
   * @returns 第一个非 null 值，如果都为 null 则返回 null
   * @example
   * ```ts
   * NullUtil.coalesce(null, 'value', 'default') // => 'value'
   * NullUtil.coalesce(null, null, 'default') // => 'default'
   * NullUtil.coalesce(null, null, null) // => null
   * ```
   */
  static coalesce<T>(...values: (T | null)[]): T | null {
    return values.find(value => value !== null) ?? null;
  }

  /**
   * 获取第一个非 null 或 undefined 值
   * @param values - 值列表
   * @returns 第一个非 null 或 undefined 值，如果都为 null 或 undefined 则返回 undefined
   * @example
   * ```ts
   * NullUtil.coalesceUndefined(null, undefined, 'value') // => 'value'
   * NullUtil.coalesceUndefined(null, undefined, null) // => undefined
   * ```
   */
  static coalesceUndefined<T>(...values: (T | null | undefined)[]): T | undefined {
    return values.find(value => value != null); // 查找第一个非 null 和 undefined 的值
  }

  /**
   * 如果值为 null，则抛出错误
   * @param value - 要检查的值
   * @param message - 错误消息
   * @returns 非 null 值
   * @throws {Error} 如果值为 null
   * @example
   * ```ts
   * NullUtil.requireNonNull('value') // => 'value'
   * NullUtil.requireNonNull(null) // throws Error
   * NullUtil.requireNonNull(null, 'Value cannot be null') // throws Error with message
   * ```
   */
  static requireNonNull<T>(value: T | null, message?: string): T {
    if (value === null) {
      throw new Error(message || 'Value cannot be null');
    }
    return value;
  }

  /**
   * 如果值为 null 或 undefined，则抛出错误
   * @param value - 要检查的值
   * @param message - 错误消息
   * @returns 非 null 且非 undefined 值
   * @throws {Error} 如果值为 null 或 undefined
   * @example
   * ```ts
   * NullUtil.requireNonNullOrUndefined('value') // => 'value'
   * NullUtil.requireNonNullOrUndefined(null) // throws Error
   * NullUtil.requireNonNullOrUndefined(undefined) // throws Error
   * ```
   */
  static requireNonNullOrUndefined<T>(value: T | null | undefined, message?: string): T {
    if (value == null) {
      throw new Error(message || 'Value cannot be null or undefined');
    }
    return value;
  }
} 