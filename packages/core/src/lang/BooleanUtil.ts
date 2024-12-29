import {
  isBoolean,
} from 'lodash-es';
/**
 * 布尔值工具类
 */
export class BooleanUtil {
  /**
   * 检查值是否为布尔值
   * @param value - 要检查的值
   * @returns 是否为布尔值
   * @example
   * ```ts
   * BooleanUtil.isBoolean(true) // => true
   * BooleanUtil.isBoolean(false) // => true
   * BooleanUtil.isBoolean(0) // => false
   * BooleanUtil.isBoolean('true') // => false
   * ```
   */
  static isBoolean = isBoolean;

  /**
   * 将值转换为布尔值
   * @param value - 要转换的值
   * @returns 转换后的布尔值
   * @example
   * ```ts
   * BooleanUtil.toBoolean(1) // => true
   * BooleanUtil.toBoolean(0) // => false
   * BooleanUtil.toBoolean('true') // => true
   * BooleanUtil.toBoolean('false') // => false
   * BooleanUtil.toBoolean('yes') // => true
   * BooleanUtil.toBoolean('no') // => false
   * BooleanUtil.toBoolean(null) // => false
   * ```
   */
  static toBoolean(value: unknown): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'number') {
      return value !== 0;
    }

    if (typeof value === 'string') {
      const lowercased = value.toLowerCase().trim();
      return lowercased === 'true' || lowercased === 'yes' || lowercased === '1';
    }

    return Boolean(value);
  }

  /**
   * 将布尔值转换为 'Y'/'N' 字符
   * @param value - 要转换的布尔值
   * @returns 'Y' 或 'N'
   * @example
   * ```ts
   * BooleanUtil.toYN(true) // => 'Y'
   * BooleanUtil.toYN(false) // => 'N'
   * ```
   */
  static toYN(value: boolean): 'Y' | 'N' {
    return value ? 'Y' : 'N';
  }

  /**
   * 将布尔值转换为 1/0
   * @param value - 要转换的布尔值
   * @returns 1 或 0
   * @example
   * ```ts
   * BooleanUtil.toNumber(true) // => 1
   * BooleanUtil.toNumber(false) // => 0
   * ```
   */
  static toNumber(value: boolean): 1 | 0 {
    return value ? 1 : 0;
  }

  /**
   * 将 'Y'/'N' 字符转换为布尔值
   * @param value - 要转换的字符
   * @returns 转换后的布尔值
   * @example
   * ```ts
   * BooleanUtil.fromYN('Y') // => true
   * BooleanUtil.fromYN('N') // => false
   * BooleanUtil.fromYN('y') // => true
   * BooleanUtil.fromYN('n') // => false
   * ```
   */
  static fromYN(value: string): boolean {
    return value.toUpperCase() === 'Y';
  }

  /**
   * 将 1/0 转换为布尔值
   * @param value - 要转换的数字
   * @returns 转换后的布尔值
   * @example
   * ```ts
   * BooleanUtil.fromNumber(1) // => true
   * BooleanUtil.fromNumber(0) // => false
   * ```
   */
  static fromNumber(value: number): boolean {
    return value === 1;
  }

  /**
   * 对布尔值取反
   * @param value - 要取反的布尔值
   * @returns 取反后的布尔值
   * @example
   * ```ts
   * BooleanUtil.negate(true) // => false
   * BooleanUtil.negate(false) // => true
   * ```
   */
  static negate(value: boolean): boolean {
    return !value;
  }

  /**
   * 检查所有值是否都为 true
   * @param values - 要检查的布尔值数组
   * @returns 是否都为 true
   * @example
   * ```ts
   * BooleanUtil.and([true, true]) // => true
   * BooleanUtil.and([true, false]) // => false
   * BooleanUtil.and([]) // => true
   * ```
   */
  static and(values: boolean[]): boolean {
    return values.every(value => value === true);
  }

  /**
   * 检查是否存在 true 值
   * @param values - 要检查的布尔值数组
   * @returns 是否存在 true
   * @example
   * ```ts
   * BooleanUtil.or([false, true]) // => true
   * BooleanUtil.or([false, false]) // => false
   * BooleanUtil.or([]) // => false
   * ```
   */
  static or(values: boolean[]): boolean {
    return values.some(value => value === true);
  }
}