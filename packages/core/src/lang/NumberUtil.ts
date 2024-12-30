import { 
  isNumber, 
  clamp, 
  inRange, 
  random,
  round,
  floor,
  ceil,
  gt,
  gte,
  lt,
  lte,
  isFinite,
  isInteger,
  isLength,
  isNaN,
  isSafeInteger,
  toFinite,
  toInteger,
  toLength,
  toNumber,
  toSafeInteger
} from 'lodash-es';
import Big from 'big.js';

export class NumberUtil {
  /**
   * 判断是否为数字
   * @param value - 要检查的值
   * @returns 是否为数字
   * @example
   * ```ts
   * NumberUtil.isNumber(123) // => true
   * NumberUtil.isNumber('123') // => false
   * ```
   */
  static isNumber = isNumber;

  /**
   * 限制数字在指定范围内
   * @param number - 要限制的数字
   * @param lower - 下限
   * @param upper - 上限
   * @returns 限制后的数字
   * @example
   * ```ts
   * NumberUtil.clamp(5, 0, 10) // => 5
   * NumberUtil.clamp(-5, 0, 10) // => 0
   * ```
   */
  static clamp = clamp;

  /**
   * 检查数字是否在指定范围内
   * @param number - 要检查的数字
   * @param start - 起始值
   * @param end - 结束值
   * @returns 是否在范围内
   * @example
   * ```ts
   * NumberUtil.inRange(3, 2, 4) // => true
   * NumberUtil.inRange(4, 2) // => false
   * ```
   */
  static inRange = inRange;

  /**
   * 生成随机数
   * @param min - 最小值
   * @param max - 最大值
   * @param floating - 是否返回浮点数
   * @returns 随机数
   * @example
   * ```ts
   * NumberUtil.random(0, 5) // => 整数: 0-5
   * NumberUtil.random(1.2, 5.2, true) // => 浮点数: 1.2-5.2
   * ```
   */
  static random = random;

  /**
   * 精确加法
   * @param augend - 被加数
   * @param addend - 加数
   * @returns 和
   * @example
   * ```ts
   * NumberUtil.add(0.1, 0.2) // => 0.3
   * ```
   */
  static add(augend: number, addend: number): number {
    return new Big(augend).plus(addend).toNumber();
  }

  /**
   * 精确减法
   * @param minuend - 被减数
   * @param subtrahend - 减数
   * @returns 差
   * @example
   * ```ts
   * NumberUtil.subtract(0.3, 0.1) // => 0.2
   * ```
   */
  static subtract(minuend: number, subtrahend: number): number {
    return new Big(minuend).minus(subtrahend).toNumber();
  }

  /**
   * 精确乘法
   * @param multiplier - 乘数
   * @param multiplicand - 被乘数
   * @returns 积
   * @example
   * ```ts
   * NumberUtil.multiply(0.1, 0.2) // => 0.02
   * ```
   */
  static multiply(multiplier: number, multiplicand: number): number {
    return new Big(multiplier).times(multiplicand).toNumber();
  }

  /**
   * 精确除法
   * @param dividend - 被除数
   * @param divisor - 除数
   * @returns 商
   * @throws 当除数为0时抛出异常
   * @example
   * ```ts
   * NumberUtil.divide(0.3, 0.1) // => 3
   * ```
   */
  static divide(dividend: number, divisor: number): number {
    if (divisor === 0) {
      throw new Error('Division by zero');
    }
    return new Big(dividend).div(divisor).toNumber();
  }

  /**
   * 四舍五入
   * @param number - 要四舍五入的数字
   * @param precision - 精度
   * @returns 四舍五入后的数字
   * @example
   * ```ts
   * NumberUtil.round(4.006, 2) // => 4.01
   * ```
   */
  static round = round;

  /**
   * 向下取整
   * @param number - 要向下取整的数字
   * @param precision - 精度
   * @returns 向下取整后的数字
   * @example
   * ```ts
   * NumberUtil.floor(4.006, 2) // => 4.00
   * ```
   */
  static floor = floor;

  /**
   * 向上取整
   * @param number - 要向上取整的数字
   * @param precision - 精度
   * @returns 向上取整后的数字
   * @example
   * ```ts
   * NumberUtil.ceil(4.006, 2) // => 4.01
   * ```
   */
  static ceil = ceil;

  /**
   * 格式化数字
   * @param number - 要格式化的数字
   * @param options - 格式化选项
   * @returns 格式化后的字符串
   * @example
   * ```ts
   * NumberUtil.format(1234.5678, { precision: 2, thousand: ',', decimal: '.' })
   * // => "1,234.57"
   * ```
   */
  static format(
    num: number,
    options: {
      // 精度，小数点后的位数
      precision?: number;
      // 千位分隔符
      thousandsSeparator?: string;
      // 小数点分隔符
      decimalSeparator?: string;
  } = {}): string {
    const {
      precision = 2,
      thousandsSeparator = ',',
      decimalSeparator = '.'
    } = options;

    // 处理数字格式化
    const fixed = num.toFixed(precision);
    const [intPart, decimalPart] = fixed.split('.');
    
    // 添加千位分隔符
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    
    return decimalPart ? `${formattedInt}${decimalSeparator}${decimalPart}` : `${formattedInt}${decimalSeparator}${'0'.repeat(precision)}`;
  }

  /**
   * 检查第一个值是否大于第二个值
   * @param value - 要比较的值
   * @param other - 另一个要比较的值
   * @returns 如果value大于other返回true，否则返回false
   * @example
   * ```ts
   * NumberUtil.gt(3, 1) // => true
   * NumberUtil.gt(3, 3) // => false
   * ```
   */
  static gt = gt;

  /**
   * 检查第一个值是否大于等于第二个值
   * @param value - 要比较的值
   * @param other - 另一个要比较的值
   * @returns 如果value大于等于other返回true，否则返回false
   * @example
   * ```ts
   * NumberUtil.gte(3, 1) // => true
   * NumberUtil.gte(3, 3) // => true
   * NumberUtil.gte(1, 3) // => false
   * ```
   */
  static gte = gte;

  /**
   * 检查第一个值是否小于第二个值
   * @param value - 要比较的值
   * @param other - 另一个要比较的值
   * @returns 如果value小于other返回true，否则返回false
   * @example
   * ```ts
   * NumberUtil.lt(1, 3) // => true
   * NumberUtil.lt(3, 3) // => false
   * NumberUtil.lt(3, 1) // => false
   * ```
   */
  static lt = lt;

  /**
   * 检查第一个值是否小于等于第二个值
   * @param value - 要比较的值
   * @param other - 另一个要比较的值
   * @returns 如果value小于等于other返回true，否则返回false
   * @example
   * ```ts
   * NumberUtil.lte(1, 3) // => true
   * NumberUtil.lte(3, 3) // => true
   * NumberUtil.lte(3, 1) // => false
   * ```
   */
  static lte = lte;

  /**
   * 检查值是否是有限数字
   * @param value - 要检查的值
   * @returns 如果值是有限数字返回true，否则返回false
   * @example
   * ```ts
   * NumberUtil.isFinite(3) // => true
   * NumberUtil.isFinite(Number.MIN_VALUE) // => true
   * NumberUtil.isFinite(Infinity) // => false
   * NumberUtil.isFinite('3') // => false
   * ```
   */
  static isFinite = isFinite;

  /**
   * 检查值是否是整数
   * @param value - 要检查的值
   * @returns 如果值是整数返回true，否则返回false
   * @example
   * ```ts
   * NumberUtil.isInteger(3) // => true
   * NumberUtil.isInteger(3.0) // => true
   * NumberUtil.isInteger(3.1) // => false
   * NumberUtil.isInteger('3') // => false
   * ```
   */
  static isInteger = isInteger;

  /**
   * 检查值是否是有效的数组类长度
   * @param value - 要检查的值
   * @returns 如果值是有效的数组类长度返回true，否则返回false
   * @example
   * ```ts
   * NumberUtil.isLength(3) // => true
   * NumberUtil.isLength(Number.MAX_SAFE_INTEGER) // => true
   * NumberUtil.isLength(-1) // => false
   * NumberUtil.isLength(1.1) // => false
   * ```
   */
  static isLength = isLength;

  /**
   * 检查值是否是NaN
   * @param value - 要检查的值
   * @returns 如果值是NaN返回true，否则返回false
   * @example
   * ```ts
   * NumberUtil.isNaN(NaN) // => true
   * NumberUtil.isNaN(new Number(NaN)) // => true
   * NumberUtil.isNaN(undefined) // => false
   * NumberUtil.isNaN(1) // => false
   * ```
   */
  static isNaN = isNaN;

  /**
   * 检查值是否是安全整数
   * @param value - 要检查的值
   * @returns 如果值是安全整数返回true，否则返回false
   * @example
   * ```ts
   * NumberUtil.isSafeInteger(3) // => true
   * NumberUtil.isSafeInteger(Number.MAX_SAFE_INTEGER) // => true
   * NumberUtil.isSafeInteger(3.1) // => false
   * NumberUtil.isSafeInteger(Number.MAX_VALUE) // => false
   * ```
   */
  static isSafeInteger = isSafeInteger;

  /**
   * 将值转换为有限数字
   * @param value - 要转换的值
   * @returns 转换后的数字
   * @example
   * ```ts
   * NumberUtil.toFinite(3.2) // => 3.2
   * NumberUtil.toFinite(Number.MIN_VALUE) // => 5e-324
   * NumberUtil.toFinite(Infinity) // => 1.7976931348623157e+308
   * NumberUtil.toFinite('3.2') // => 3.2
   * ```
   */
  static toFinite = toFinite;

  /**
   * 将值转换为整数
   * @param value - 要转换的值
   * @returns 转换后的整数
   * @example
   * ```ts
   * NumberUtil.toInteger(3.2) // => 3
   * NumberUtil.toInteger('3.2') // => 3
   * NumberUtil.toInteger(Infinity) // => 1.7976931348623157e+308
   * NumberUtil.toInteger('') // => 0
   * ```
   */
  static toInteger = toInteger;

  /**
   * 将值转换为有效的数组类长度
   * @param value - 要转换的值
   * @returns 转换后的长度
   * @example
   * ```ts
   * NumberUtil.toLength(3.2) // => 3
   * NumberUtil.toLength('3.2') // => 3
   * NumberUtil.toLength(-1) // => 0
   * NumberUtil.toLength(Number.MAX_VALUE) // => 4294967295
   * ```
   */
  static toLength = toLength;

  /**
   * 将值转换为数字
   * @param value - 要转换的值
   * @returns 转换后的数字
   * @example
   * ```ts
   * NumberUtil.toNumber(3.2) // => 3.2
   * NumberUtil.toNumber('3.2') // => 3.2
   * NumberUtil.toNumber(Number.MIN_VALUE) // => 5e-324
   * NumberUtil.toNumber(Infinity) // => Infinity
   * ```
   */
  static toNumber = toNumber;

  /**
   * 将值转换为安全整数
   * @param value - 要转换的值
   * @returns 转换后的安全整数
   * @example
   * ```ts
   * NumberUtil.toSafeInteger(3.2) // => 3
   * NumberUtil.toSafeInteger(Number.MAX_VALUE) // => 9007199254740991
   * NumberUtil.toSafeInteger(Infinity) // => 9007199254740991
   * NumberUtil.toSafeInteger('3.2') // => 3
   * ```
   */
  static toSafeInteger = toSafeInteger;
} 