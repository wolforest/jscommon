import Cookies from 'js-cookie';

export interface CookieAttributes {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export class CookieUtil {
  /**
   * 设置 cookie
   * @param name - cookie 名称
   * @param value - cookie 值
   * @param options - cookie 配置选项
   * @example
   * ```ts
   * // 设置一个简单的 cookie
   * CookieUtil.set('name', 'value')
   * 
   * // 设置一个7天后过期的 cookie
   * CookieUtil.set('name', 'value', { expires: 7 })
   * 
   * // 设置一个带路径的 cookie
   * CookieUtil.set('name', 'value', { path: '' })
   * ```
   */
  static set(name: string, value: string, options?: CookieAttributes): void {
    Cookies.set(name, value, options);
  }

  /**
   * 获取指定的 cookie
   * @param name - cookie 名称
   * @returns cookie 值,不存在时返回 undefined
   * @example
   * ```ts
   * // 获取名为 'name' 的 cookie
   * const value = CookieUtil.get('name') // => 'value'
   * 
   * // 获取不存在的 cookie
   * const nothing = CookieUtil.get('nothing') // => undefined
   * ```
   */
  static get(name: string): string | undefined {
    return Cookies.get(name);
  }

  /**
   * 获取所有可见的 cookies
   * @returns 包含所有 cookie 的对象
   * @example
   * ```ts
   * // 获取所有 cookies
   * const cookies = CookieUtil.getAll() // => { name: 'value' }
   * ```
   */
  static getAll(): { [key: string]: string } {
    return Cookies.get();
  }

  /**
   * 删除指定的 cookie
   * @param name - cookie 名称
   * @param options - cookie 配置选项
   * @example
   * ```ts
   * // 删除简单的 cookie
   * CookieUtil.remove('name')
   * 
   * // 删除带路径的 cookie
   * CookieUtil.remove('name', { path: '' })
   * 
   * // 删除带域名的 cookie
   * CookieUtil.remove('name', { path: '', domain: '.yourdomain.com' })
   * ```
   */
  static remove(name: string, options?: CookieAttributes): void {
    Cookies.remove(name, options);
  }

  /**
   * 创建一个新的 cookie 实例,使用自定义的默认属性
   * @param defaultAttributes - 默认的 cookie 配置选项
   * @returns 新的 cookie 实例
   * @example
   * ```ts
   * // 创建一个新的实例,所有操作都使用指定的域名和路径
   * const api = CookieUtil.withAttributes({ 
   *   path: '/', 
   *   domain: '.example.com' 
   * })
   * ```
   */
  static withAttributes(defaultAttributes: CookieAttributes): typeof Cookies {
    return Cookies.withAttributes(defaultAttributes);
  }

  /**
   * 创建一个新的 cookie 实例,使用自定义的编码/解码转换器
   * @param converter - 自定义的转换器
   * @returns 新的 cookie 实例
   * @example
   * ```ts
   * // 创建一个使用自定义解码的实例
   * const api = CookieUtil.withConverter({
   *   read: function(value, name) {
   *     if (name === 'escaped') {
   *       return unescape(value)
   *     }
   *     return Cookies.converter.read(value, name)
   *   }
   * })
   * ```
   */
  static withConverter(converter: {
    read?: (value: string, name: string) => any;
    write?: (value: any, name: string) => string;
  }): typeof Cookies {
    return Cookies.withConverter(converter);
  }
} 