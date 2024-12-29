import qs from 'qs';

export class URLUtil {
  /**
   * 解析 URL 参数为对象
   * @param url - URL字符串，如果不传则使用当前页面URL
   * @returns 参数对象
   * @example
   * ```ts
   * URLUtil.parseQuery('https://example.com?a=1&b=2') // { a: '1', b: '2' }
   * URLUtil.parseQuery('a=1&b=2') // { a: '1', b: '2' }
   * ```
   */
  static parseQuery(url?: string): Record<string, any> {
    if (!url && typeof window !== 'undefined') {
      url = window.location.search;
    }
    if (!url) return {};
    
    // 如果是完整URL，先尝试提取查询字符串部分
    if (url.includes('://')) {
      try {
        const urlObj = new URL(url);
        return qs.parse(urlObj.search.slice(1));
      } catch {
        return {};
      }
    }
    
    const queryString = url.includes('?') ? url.split('?')[1] : url;
    return qs.parse(queryString);
  }

  /**
   * 将对象转换为 URL 参数字符串
   * @param params - 参数对象
   * @param options - qs 库的配置选项
   * @returns URL 参数字符串
   * @example
   * ```ts
   * URLUtil.stringifyQuery({ a: 1, b: 2 }) // "a=1&b=2"
   * URLUtil.stringifyQuery({ a: [1, 2] }) // "a[]=1&a[]=2"
   * ```
   */
  static stringifyQuery(
    params: Record<string, any>, 
    options: qs.IStringifyOptions = { 
      arrayFormat: 'brackets',
      encode: false
    }
  ): string {
    return qs.stringify(params, options);
  }

  /**
   * 向 URL 添加参数
   * @param url - 原始 URL
   * @param params - 要添加的参数对象
   * @returns 新的 URL
   * @example
   * ```ts
   * URLUtil.addParams('https://example.com', { a: 1 }) 
   * // "https://example.com?a=1"
   * URLUtil.addParams('https://example.com?b=2', { a: 1 }) 
   * // "https://example.com?b=2&a=1"
   * ```
   */
  static addParams(url: string, params: Record<string, any>): string {
    if (!url) return '';
    const [baseUrl, query] = url.split('?');
    const existingParams = query ? qs.parse(query) : {};
    const newParams = { ...existingParams, ...params };
    const queryString = this.stringifyQuery(newParams);
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }

  /**
   * 从 URL 中移除指定参数
   * @param url - 原始 URL
   * @param params - 要移除的参数名数组
   * @returns 新的 URL
   * @example
   * ```ts
   * URLUtil.removeParams('https://example.com?a=1&b=2', ['a']) 
   * // "https://example.com?b=2"
   * ```
   */
  static removeParams(url: string, params: string[]): string {
    if (!url) return '';
    const [baseUrl, query] = url.split('?');
    if (!query) return url;

    const existingParams = qs.parse(query);
    params.forEach(param => delete existingParams[param]);
    const queryString = this.stringifyQuery(existingParams);
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }

  /**
   * 获取 URL 的域名部分
   * @param url - URL字符串
   * @returns 域名
   * @example
   * ```ts
   * URLUtil.getDomain('https://example.com/path') // "example.com"
   * ```
   */
  static getDomain(url: string): string {
    if (!url) return '';
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  }

  /**
   * 获取 URL 的路径部分
   * @param url - URL字符串
   * @returns 路径
   * @example
   * ```ts
   * URLUtil.getPath('https://example.com/path?query') // "/path"
   * ```
   */
  static getPath(url: string): string {
    if (!url) return '';
    try {
      return new URL(url).pathname;
    } catch {
      return '';
    }
  }

  /**
   * 判断是否为绝对 URL
   * @param url - URL字符串
   * @returns 是否为绝对 URL
   * @example
   * ```ts
   * URLUtil.isAbsolute('https://example.com') // true
   * URLUtil.isAbsolute('/path') // false
   * ```
   */
  static isAbsolute(url: string): boolean {
    if (!url) return false;
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }

  /**
   * 拼接 URL 路径
   * @param base - 基础 URL
   * @param paths - 要拼接的路径
   * @returns 完整的 URL
   * @example
   * ```ts
   * URLUtil.join('https://example.com', 'api', 'users') 
   * // "https://example.com/api/users"
   * ```
   */
  static join(base: string, ...paths: string[]): string {
    if (!base) return '';
    const result = paths.reduce((url, path) => {
      if (!path) return url;
      if (!url.endsWith('/')) url += '/';
      if (path.startsWith('/')) path = path.slice(1);
      return url + path;
    }, base.replace(/\/+$/, ''));
    
    // 移除末尾的斜杠
    return result.replace(/\/$/, '');
  }

  /**
   * 规范化 URL（移除重复的斜杠等）
   * @param url - URL字符串
   * @returns 规范化后的 URL
   * @example
   * ```ts
   * URLUtil.normalize('https://example.com//path/') 
   * // "https://example.com/path"
   * ```
   */
  static normalize(url: string): string {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      parsed.pathname = parsed.pathname.replace(/\/+/g, '/').replace(/\/$/, '');
      return parsed.toString();
    } catch {
      return url.replace(/\/+/g, '/').replace(/\/$/, '');
    }
  }

  /**
   * 获取URL的协议部分
   * @param url - URL字符串
   * @returns 协议(如 http:, https:)
   * @example
   * ```ts
   * URLUtil.getProtocol('https://example.com') // "https:"
   * URLUtil.getProtocol('http://example.com') // "http:"
   * ```
   */
  static getProtocol(url: string): string {
    if (!url) return '';
    try {
      return new URL(url).protocol;
    } catch {
      return '';
    }
  }

  /**
   * 获取URL的hash部分
   * @param url - URL字符串
   * @returns hash值(不包含#号)
   * @example
   * ```ts
   * URLUtil.getHash('https://example.com#section1') // "section1"
   * URLUtil.getHash('https://example.com') // ""
   * ```
   */
  static getHash(url: string): string {
    if (!url) return '';
    try {
      return new URL(url).hash.slice(1);
    } catch {
      return '';
    }
  }
}