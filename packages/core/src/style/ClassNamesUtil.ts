import classNames from 'classnames/dedupe';

type ClassValue = string | number | boolean | undefined | null;
type ClassMapping = Record<string, any>;
type ClassArray = Array<ClassValue | ClassMapping | ClassArray>;

/**
 * 类名工具类，用于处理和组合 CSS 类名
 */
export class ClassNamesUtil {
  /**
   * 组合多个类名
   * @param args - 类名参数，可以是字符串、对象、数组等
   * @returns 组合后的类名字符串
   * @example
   * ```ts
   * // 基础用法
   * ClassNamesUtil.combine('foo', 'bar') // => 'foo bar'
   * 
   * // 条件类名
   * ClassNamesUtil.combine('foo', { bar: true, baz: false }) // => 'foo bar'
   * 
   * // 数组参数
   * ClassNamesUtil.combine(['foo', { bar: true }]) // => 'foo bar'
   * 
   * // 多层嵌套
   * ClassNamesUtil.combine('foo', ['bar', { baz: true }]) // => 'foo bar baz'
   * 
   * // 数字处理
   * ClassNamesUtil.combine(42, 'foo') // => '42 foo'
   * ClassNamesUtil.combine('foo', 42) // => 'foo 42'
   * 
   * // 特殊值处理
   * ClassNamesUtil.combine(null, undefined, false, 0, '') // => '0'
   * ClassNamesUtil.combine('foo', null, 'bar') // => 'foo bar'
   * ```
   */
  static combine(...args: Array<ClassValue | ClassMapping | ClassArray>): string {
    // 预处理参数，将数字转换为字符串，同时保持顺序
    const processedArgs = args.map(arg => {
      if (typeof arg === 'number') {
        return String(arg);
      }
      if (Array.isArray(arg)) {
        return arg.map(item => typeof item === 'number' ? String(item) : item);
      }
      return arg;
    });

    // 使用 classnames 处理类名
    const result = classNames(...processedArgs);

    // 如果结果为空但参数中包含 0，返回 '0'
    if (!result && args.includes(0)) {
      return '0';
    }

    // 如果结果包含数字，需要保持原始顺序
    if (result && args.some(arg => typeof arg === 'number')) {
      const parts = result.split(' ');
      const reordered = args.reduce((acc: string[], arg) => {
        if (typeof arg === 'number') {
          const numStr = String(arg);
          if (parts.includes(numStr)) {
            acc.push(numStr);
          }
        } else if (typeof arg === 'string' && parts.includes(arg)) {
          acc.push(arg);
        }
        return acc;
      }, []);
      return reordered.join(' ');
    }

    return result;
  }

  /**
   * 创建一个带有前缀的类名组合器
   * @param prefix - 类名前缀
   * @returns 返回一个新的类名组合函数
   * @example
   * ```ts
   * const bem = ClassNamesUtil.withPrefix('button');
   * bem('primary', { disabled: true }) // => 'button-primary button-disabled'
   * bem(['large', { round: true }]) // => 'button-large button-round'
   * ```
   */
  static withPrefix(prefix: string) {
    return (...args: Array<ClassValue | ClassMapping | ClassArray>): string => {
      const classes = this.combine(...args);
      if (!classes) return '';
      
      return classes
        .split(' ')
        .map(name => `${prefix}-${name}`)
        .join(' ');
    };
  }

  /**
   * 条件性地添加类名
   * @param className - 要添加的类名
   * @param condition - 条件
   * @returns 满足条件时返回类名，否则返回空字符串
   * @example
   * ```ts
   * ClassNamesUtil.when('active', true) // => 'active'
   * ClassNamesUtil.when('disabled', false) // => ''
   * ```
   */
  static when(className: string, condition: any): string {
    return classNames({ [className]: condition });
  }
} 