import { 
  isNumber, 
  clamp, 
  inRange, 
  random,
  round,
  floor,
  ceil
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
} 