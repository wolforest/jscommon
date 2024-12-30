import Big from 'big.js';

export class DecimalUtil {
  /**
   * 创建一个 Big 实例
   * @param value - 数值
   * @returns Big 实例
   * @example
   * ```ts
   * DecimalUtil.of('123.45') // => Big
   * ```
   */
  static of(value: number | string): Big {
    return new Big(value);
  }

  /**
   * 精确加法
   * @param numbers - 要相加的数字列表
   * @returns 相加的结果
   * @example
   * ```ts
   * DecimalUtil.add(0.1, 0.2) // => "0.3"
   * DecimalUtil.add(0.1, 0.2, 0.3) // => "0.6"
   * ```
   */
  static add(...numbers: (number | string)[]): string | number {
    return numbers.reduce((sum, num) => new Big(sum).plus(num).toString());
  }

  /**
   * 精确减法
   * @param minuend - 被减数
   * @param subtrahend - 减数
   * @returns 减法的结果
   * @example
   * ```ts
   * DecimalUtil.subtract(0.3, 0.1) // => "0.2"
   * ```
   */
  static subtract(minuend: number | string, subtrahend: number | string): string {
    return new Big(minuend).minus(subtrahend).toString();
  }

  /**
   * 精确乘法
   * @param numbers - 要相乘的数字列表
   * @returns 乘法的结果
   * @example
   * ```ts
   * DecimalUtil.multiply(0.1, 0.2) // => "0.02"
   * DecimalUtil.multiply(0.1, 0.2, 0.3) // => "0.006"
   * ```
   */
  static multiply(...numbers: (number | string)[]): string | number {
    return numbers.reduce((product, num) => new Big(product).times(num).toString());
  }

  /**
   * 精确除法
   * @param dividend - 被除数
   * @param divisor - 除数
   * @param precision - 精度，默认为 10
   * @returns 除法的结果
   * @example
   * ```ts
   * DecimalUtil.divide(0.3, 0.1) // => "3"
   * DecimalUtil.divide(1, 3, 2) // => "0.33"
   * ```
   */
  static divide(dividend: number | string, divisor: number | string, precision: number = 10): string {
    if (new Big(divisor).eq(0)) {
      throw new Error('Division by zero');
    }
    return new Big(dividend).div(divisor).toFixed(precision);
  }

  /**
   * 四舍五入
   * @param number - 要四舍五入的数字
   * @param precision - 精度，默认为 0
   * @returns 四舍五入后的结果
   * @example
   * ```ts
   * DecimalUtil.round(3.45) // => "3"
   * DecimalUtil.round(3.45, 1) // => "3.5"
   * ```
   */
  static round(number: number | string, precision: number = 0): string {
    return new Big(number).round(precision).toString();
  }

  /**
   * 向上取整
   * @param number - 要向上取整的数字
   * @param precision - 精度，默认为 0
   * @returns 向上取整的结果
   * @example
   * ```ts
   * DecimalUtil.ceil(3.1) // => "4"
   * DecimalUtil.ceil(3.1, 1) // => "3.2"
   * ```
   */
  static ceil(number: number | string, precision: number = 0): string {
    const multiplier = new Big(10).pow(precision);
    const result = new Big(number).times(multiplier);
    return result.plus(0.5).round(0).div(multiplier).toString();
  }

  /**
   * 向下取整
   * @param number - 要向下取整的数字
   * @param precision - 精度，默认为 0
   * @returns 向下取整的结果
   * @example
   * ```ts
   * DecimalUtil.floor(3.9) // => "3"
   * DecimalUtil.floor(3.9, 1) // => "3.9"
   * DecimalUtil.floor(-3.1) // => "-4"
   * ```
   */
  static floor(number: number | string, precision: number = 0): string {
    const multiplier = new Big(10).pow(precision);
    const result = new Big(number).times(multiplier);
    // 对于负数，需要特殊处理
    const rounded = result.round(0, 0);
    if (result.lt(0) && !result.eq(rounded)) {
      return rounded.minus(1).div(multiplier).toString();
    }
    return rounded.div(multiplier).toString();
  }

  /**
   * 取绝对值
   * @param number - 要取绝对值的数字
   * @returns 绝对值
   * @example
   * ```ts
   * DecimalUtil.abs(-3.2) // => "3.2"
   * DecimalUtil.abs(3.2) // => "3.2"
   * ```
   */
  static abs(number: number | string): string {
    return new Big(number).abs().toString();
  }

  /**
   * 取最大值
   * @param numbers - 数字列表
   * @returns 最大值
   * @example
   * ```ts
   * DecimalUtil.max(1, 2, 3) // => "3"
   * DecimalUtil.max(-1, -2, -3) // => "-1"
   * ```
   */
  static max(...numbers: (number | string)[]): string | number {
    return numbers.reduce((max, num) => 
      new Big(num).gt(max) ? num.toString() : max.toString()
    );
  }

  /**
   * 取最小值
   * @param numbers - 数字列表
   * @returns 最小值
   * @example
   * ```ts
   * DecimalUtil.min(1, 2, 3) // => "1"
   * DecimalUtil.min(-1, -2, -3) // => "-3"
   * ```
   */
  static min(...numbers: (number | string)[]): string | number {
    return numbers.reduce((min, num) => 
      new Big(num).lt(min) ? num.toString() : min.toString()
    );
  }

  /**
   * 比较两个数值
   * @param a - 第一个数
   * @param b - 第二个数
   * @returns -1, 0, 1
   * @example
   * ```ts
   * DecimalUtil.compare(0.1, 0.2) // => -1
   * DecimalUtil.compare(0.2, 0.2) // => 0
   * DecimalUtil.compare(0.3, 0.2) // => 1
   * ```
   */
  static compare(a: number | string, b: number | string): number {
    return new Big(a).cmp(b);
  }

  /**
   * 判断两个数是否相等
   * @param a - 第一个数
   * @param b - 第二个数
   * @returns 是否相等
   * @example
   * ```ts
   * DecimalUtil.equals(0.1, 0.1) // => true
   * DecimalUtil.equals(0.1, 0.2) // => false
   * ```
   */
  static equals(a: number | string, b: number | string): boolean {
    return new Big(a).eq(b);
  }

  /**
   * 检查第一个值是否大于第二个值
   * @param value - 要比较的值
   * @param other - 另一个要比较的值
   * @returns 如果value大于other返回true，否则返回false
   * @example
   * ```ts
   * DecimalUtil.gt(0.2, 0.1) // => true
   * DecimalUtil.gt(0.1, 0.2) // => false
   * ```
   */
  static gt(value: number | string, other: number | string): boolean {
    return new Big(value).gt(other);
  }

  /**
   * 检查第一个值是否小于第二个值
   * @param value - 要比较的值
   * @param other - 另一个要比较的值
   * @returns 如果value小于other返回true，否则返回false
   * @example
   * ```ts
   * DecimalUtil.lt(0.1, 0.2) // => true
   * DecimalUtil.lt(0.2, 0.1) // => false
   * ```
   */
  static lt(value: number | string, other: number | string): boolean {
    return new Big(value).lt(other);
  }

  /**
   * 计算百分比
   * @param number - 数值
   * @param total - 总数
   * @param precision - 精度，默认为 2
   * @returns 百分比值
   * @example
   * ```ts
   * MathUtil.percentage(1, 2) // "50.00"
   * MathUtil.percentage(1, 3, 1) // "33.3"
   * ```
   */
  static percentage(number: number | string, total: number | string, precision: number = 2): string {
    return new Big(number).div(total).times(100).toFixed(precision);
  }
}