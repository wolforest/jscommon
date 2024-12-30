import {
  isArguments,
  isBuffer,
  isDate,
  isElement,
  isError,
  isFunction,
  isMap,
  isNative,
  isRegExp,
  isSet,
  isSymbol,
  isTypedArray,
  isWeakMap,
  isWeakSet
} from 'lodash-es';

export class TypeUtil {
  /**
   * 检查值是否是arguments对象
   * @param value - 要检查的值
   * @returns 如果值是arguments对象返回true，否则返回false
   * @example
   * ```ts
   * function test() {
   *   return TypeUtil.isArguments(arguments);
   * }
   * test(); // => true
   * TypeUtil.isArguments([1, 2, 3]) // => false
   * ```
   */
  static isArguments = isArguments;

  /**
   * 检查值是否是Buffer对象
   * @param value - 要检查的值
   * @returns 如果值是Buffer对象返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isBuffer(new Buffer(2)) // => true
   * TypeUtil.isBuffer(new Uint8Array(2)) // => false
   * ```
   */
  static isBuffer = isBuffer;

  /**
   * 检查值是否是Date对象
   * @param value - 要检查的值
   * @returns 如果值是Date对象返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isDate(new Date) // => true
   * TypeUtil.isDate('Mon April 23 2012') // => false
   * ```
   */
  static isDate = isDate;

  /**
   * 检查值是否是DOM元素
   * @param value - 要检查的值
   * @returns 如果值是DOM元素返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isElement(document.body) // => true
   * TypeUtil.isElement('<body>') // => false
   * ```
   */
  static isElement = isElement;

  /**
   * 检查值是否是Error对象
   * @param value - 要检查的值
   * @returns 如果值是Error对象返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isError(new Error) // => true
   * TypeUtil.isError(Error) // => false
   * TypeUtil.isError({ name: 'Error', message: 'error' }) // => false
   * ```
   */
  static isError = isError;

  /**
   * 检查值是否是函数
   * @param value - 要检查的值
   * @returns 如果值是函数返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isFunction(function() {}) // => true
   * TypeUtil.isFunction(/abc/) // => false
   * TypeUtil.isFunction(class C {}) // => true
   * ```
   */
  static isFunction = isFunction;

  /**
   * 检查值是否是Map对象
   * @param value - 要检查的值
   * @returns 如果值是Map对象返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isMap(new Map) // => true
   * TypeUtil.isMap(new WeakMap) // => false
   * TypeUtil.isMap({}) // => false
   * ```
   */
  static isMap = isMap;

  /**
   * 检查值是否是原生函数
   * @param value - 要检查的值
   * @returns 如果值是原生函数返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isNative(Array.prototype.push) // => true
   * TypeUtil.isNative(function() {}) // => false
   * ```
   */
  static isNative = isNative;

  /**
   * 检查值是否是RegExp对象
   * @param value - 要检查的值
   * @returns 如果值是RegExp对象返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isRegExp(/abc/) // => true
   * TypeUtil.isRegExp('/abc/') // => false
   * TypeUtil.isRegExp(new RegExp('abc')) // => true
   * ```
   */
  static isRegExp = isRegExp;

  /**
   * 检查值是否是Set对象
   * @param value - 要检查的值
   * @returns 如果值是Set对象返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isSet(new Set) // => true
   * TypeUtil.isSet(new WeakSet) // => false
   * TypeUtil.isSet([]) // => false
   * ```
   */
  static isSet = isSet;

  /**
   * 检查值是否是Symbol
   * @param value - 要检查的值
   * @returns 如果值是Symbol返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isSymbol(Symbol()) // => true
   * TypeUtil.isSymbol(Symbol.iterator) // => true
   * TypeUtil.isSymbol('abc') // => false
   * ```
   */
  static isSymbol = isSymbol;

  /**
   * 检查值是否是TypedArray
   * @param value - 要检查的值
   * @returns 如果值是TypedArray返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isTypedArray(new Uint8Array) // => true
   * TypeUtil.isTypedArray(new Float32Array) // => true
   * TypeUtil.isTypedArray([]) // => false
   * ```
   */
  static isTypedArray = isTypedArray;

  /**
   * 检查值是否是WeakMap对象
   * @param value - 要检查的值
   * @returns 如果值是WeakMap对象返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isWeakMap(new WeakMap) // => true
   * TypeUtil.isWeakMap(new Map) // => false
   * TypeUtil.isWeakMap({}) // => false
   * ```
   */
  static isWeakMap = isWeakMap;

  /**
   * 检查值是否是WeakSet对象
   * @param value - 要检查的值
   * @returns 如果值是WeakSet对象返回true，否则返回false
   * @example
   * ```ts
   * TypeUtil.isWeakSet(new WeakSet) // => true
   * TypeUtil.isWeakSet(new Set) // => false
   * ```
   */
  static isWeakSet = isWeakSet;
} 