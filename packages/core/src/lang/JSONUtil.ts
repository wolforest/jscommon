import { isEmpty as _isEmpty } from 'lodash-es';
import { StringUtil } from './StringUtil';
import { ArrayUtil } from './ArrayUtil';

/**
 * JSON 工具类，提供 JSON 相关的常用操作方法
 */
export class JSONUtil {
  static readonly EMPTY_JSON = '{}';
  static readonly KEY_SEPARATOR = '.';

  /**
   * 判断 JSON 对象是否为空
   * @param obj - 要检查的对象
   * @returns 如果对象为 null 或空对象则返回 true
   * @example
   * ```ts
   * JSONUtil.isEmpty(null) // true
   * JSONUtil.isEmpty({}) // true
   * JSONUtil.isEmpty({ name: 'test' }) // false
   * ```
   */
  static isEmpty(obj: Record<string, any> | null): boolean {
    if (obj === null) {
      return true;
    }
    return _isEmpty(obj);
  }

  /**
   * 判断 JSON 对象是否非空
   * @param obj - 要检查的对象
   * @returns 如果对象不为 null 且不为空对象则返回 true
   * @example
   * ```ts
   * JSONUtil.notEmpty(null) // false
   * JSONUtil.notEmpty({}) // false
   * JSONUtil.notEmpty({ name: 'test' }) // true
   * ```
   */
  static notEmpty(obj: Record<string, any> | null): boolean {
    return !this.isEmpty(obj);
  }

  /**
   * 解析 JSON 字符串为对象
   * @param str - JSON 字符串
   * @returns 解析后的对象
   * @throws 如果解析失败会抛出 SyntaxError
   * @example
   * ```ts
   * JSONUtil.parse<User>('{"name":"test"}') // { name: 'test' }
   * ```
   */
  static parse<T = Record<string, any>>(str: string): T {
    try {
      return JSON.parse(str);
    } catch (e) {
      throw new SyntaxError(`Invalid JSON string: ${str}`);
    }
  }

  /**
   * 解析 JSON 字符串为数组
   * @param str - JSON 数组字符串
   * @returns 解析后的数组
   * @throws 如果解析失败或结果不是数组会抛出错误
   * @example
   * ```ts
   * JSONUtil.parseArray<number>('[1,2,3]') // [1,2,3]
   * ```
   */
  static parseArray<T = any>(str: string): T[] {
    const result = this.parse<T[]>(str);
    if (!Array.isArray(result)) {
      throw new TypeError('Parsed result is not an array');
    }
    return result;
  }

  /**
   * 获取嵌套的 JSON 对象
   * @param obj - 源对象
   * @param keyString - 以点号分隔的键路径
   * @returns 找到的嵌套对象，未找到返回 null
   * @example
   * ```ts
   * const obj = { a: { b: { c: 1 } } };
   * JSONUtil.getJSONObject(obj, 'a.b') // { c: 1 }
   * ```
   */
  static getJSONObject(
    obj: Record<string, any>,
    keyString: string
  ): Record<string, any> | null {
    const keys = StringUtil.split(keyString, this.KEY_SEPARATOR);
    return this.getJSONObjectByKeys(obj, keys);
  }

  /**
   * 通过键数组获取嵌套的 JSON 对象
   * @param obj - 源对象
   * @param keys - 键数组
   * @returns 找到的嵌套对象，未找到返回 null
   * @example
   * ```ts
   * const obj = { a: { b: { c: 1 } } };
   * JSONUtil.getJSONObjectByKeys(obj, ['a', 'b']) // { c: 1 }
   * ```
   */
  static getJSONObjectByKeys(
    obj: Record<string, any>,
    keys: string[]
  ): Record<string, any> | null {
    if (ArrayUtil.isEmpty(keys)) {
      return null;
    }

    let current = obj;
    for (const key of keys) {
      if (current == null || typeof current !== 'object') {
        return null;
      }
      current = current[key];
    }

    return current ?? null;
  }

  /**
   * 转换为 JSON 字符串
   * @param o - 要转换的对象
   * @returns JSON 字符串
   * @example
   * ```ts
   * JSONUtil.toJSONString({ name: 'test' }) // '{"name":"test"}'
   * JSONUtil.toJSONString(null) // '{}'
   * ```
   */
  static toJSONString(o: any): string {
    if (o == null) {
      return this.EMPTY_JSON;
    }
    return JSON.stringify(o);
  }

  /**
   * 将 JSON 字符串转换为普通字符串
   * @param jsonString - JSON 字符串
   * @returns 普通字符串
   * @example
   * ```ts
   * JSONUtil.toPlainString('{"name":"test"}') // => 'name test'
   * JSONUtil.toPlainString('{"items":["test1","test2"],"count":2}') // => 'items test1 test2 count 2'
   * JSONUtil.toPlainString(null) // => ''
   * ```
   */
  static toPlainString(jsonString: string | null): string {
    if (!jsonString) return '';
    try {
      const obj = JSON.parse(jsonString);
      if (typeof obj === 'object' && obj !== null) {
        // 将对象的键值对连接成字符串
        return Object.entries(obj)
          .filter(([_, value]) => value !== null && value !== undefined)
          .map(([key, value]) => {
            // 如果值是数组，将数组元素用空格连接
            const valueStr = Array.isArray(value) ? value.join(' ') : value;
            return `${key} ${valueStr}`;
          })
          .join(' ');
      }
      return String(obj);
    } catch {
      return jsonString;
    }
  }
} 