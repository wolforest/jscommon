import { isSymbol } from 'lodash-es';

/**
 * Symbol 工具类
 */
export class SymbolUtil {
  /**
   * 检查值是否是 Symbol
   * @param value - 要检查的值
   * @returns 如果值是 Symbol 返回 true，否则返回 false
   * @example
   * ```ts
   * SymbolUtil.isSymbol(Symbol()) // => true
   * SymbolUtil.isSymbol(Symbol.iterator) // => true
   * SymbolUtil.isSymbol('abc') // => false
   * ```
   */
  static isSymbol = isSymbol;

  /**
   * 创建一个 Symbol
   * @param description - Symbol 的描述
   * @returns 新的 Symbol
   * @example
   * ```ts
   * SymbolUtil.create('test') // => Symbol(test)
   * SymbolUtil.create() // => Symbol()
   * ```
   */
  static create(description?: string): symbol {
    return Symbol(description);
  }

  /**
   * 获取 Symbol 的描述
   * @param symbol - Symbol 值
   * @returns Symbol 的描述
   * @example
   * ```ts
   * SymbolUtil.getDescription(Symbol('test')) // => 'test'
   * SymbolUtil.getDescription(Symbol()) // => undefined
   * ```
   */
  static getDescription(symbol: symbol): string | undefined {
    return symbol.description;
  }

  /**
   * 将 Symbol 转换为字符串
   * @param symbol - Symbol 值
   * @returns Symbol 的字符串表示
   * @example
   * ```ts
   * SymbolUtil.toString(Symbol('test')) // => 'Symbol(test)'
   * SymbolUtil.toString(Symbol()) // => 'Symbol()'
   * ```
   */
  static toString(symbol: symbol): string {
    return symbol.toString();
  }

  /**
   * 获取对象的 Symbol 属性键
   * @param obj - 要获取 Symbol 键的对象
   * @returns Symbol 键数组
   * @example
   * ```ts
   * const sym = Symbol('test');
   * const obj = { [sym]: 'value' };
   * SymbolUtil.getSymbolKeys(obj) // => [Symbol(test)]
   * ```
   */
  static getSymbolKeys(obj: object): symbol[] {
    return Object.getOwnPropertySymbols(obj);
  }

  /**
   * 检查对象是否包含指定的 Symbol 键
   * @param obj - 要检查的对象
   * @param symbol - 要检查的 Symbol 键
   * @returns 是否包含该 Symbol 键
   * @example
   * ```ts
   * const sym = Symbol('test');
   * const obj = { [sym]: 'value' };
   * SymbolUtil.hasSymbol(obj, sym) // => true
   * ```
   */
  static hasSymbol(obj: object, symbol: symbol): boolean {
    return Object.getOwnPropertySymbols(obj).includes(symbol);
  }

  /**
   * 创建一个全局 Symbol
   * @param key - Symbol 的键
   * @returns 全局 Symbol
   * @example
   * ```ts
   * SymbolUtil.createGlobal('test') // => Symbol.for('test')
   * ```
   */
  static createGlobal(key: string): symbol {
    return Symbol.for(key);
  }

  /**
   * 获取全局 Symbol 的键
   * @param symbol - 全局 Symbol
   * @returns Symbol 的键，如果不是全局 Symbol 则返回 undefined
   * @example
   * ```ts
   * const sym = Symbol.for('test');
   * SymbolUtil.getGlobalKey(sym) // => 'test'
   * SymbolUtil.getGlobalKey(Symbol('test')) // => undefined
   * ```
   */
  static getGlobalKey(symbol: symbol): string | undefined {
    return Symbol.keyFor(symbol);
  }

  /**
   * 检查 Symbol 是否为全局 Symbol
   * @param symbol - 要检查的 Symbol
   * @returns 是否为全局 Symbol
   * @example
   * ```ts
   * SymbolUtil.isGlobal(Symbol.for('test')) // => true
   * SymbolUtil.isGlobal(Symbol('test')) // => false
   * ```
   */
  static isGlobal(symbol: symbol): boolean {
    return Symbol.keyFor(symbol) !== undefined;
  }
} 