import {
  after,
  ary,
  before,
  bind,
  bindKey,
  curry,
  curryRight,
  debounce,
  defer,
  delay,
  flip,
  isFunction,
  isNative,
  memoize,
  negate,
  once,
  overArgs,
  partial,
  partialRight,
  rearg,
  rest,
  spread,
  throttle,
  unary,
  wrap
} from 'lodash-es';

export class FunctionUtil {
  /**
   * 创建一个函数，当调用次数大于等于 n 次时才执行
   * @param n - 需要调用的次数
   * @param func - 要执行的函数
   * @returns 新函数
   * @example
   * ```ts
   * const saves = ['profile', 'settings'];
   * const done = FunctionUtil.after(saves.length, () => console.log('done saving!'));
   * saves.forEach(type => done());
   * // => 第二次调用 done 时输出 'done saving!'
   * ```
   */
  static after = after;

  /**
   * 创建一个最多接受 n 个参数的函数
   * @param func - 要限制参数个数的函数
   * @param n - 限制的参数个数
   * @returns 新函数
   * @example
   * ```ts
   * FunctionUtil.ary(Math.max, 2)([1, 2, 3, 4]) // => 2
   * ```
   */
  static ary = ary;

  /**
   * 创建一个函数，调用次数不超过 n 次
   * @param n - 允许调用的次数
   * @param func - 要限制的函数
   * @returns 新函数
   * @example
   * ```ts
   * const initialize = FunctionUtil.before(5, () => console.log('init!'));
   * initialize();
   * initialize();
   * // => 只有前 4 次调用会执行
   * ```
   */
  static before = before;

  /**
   * 创建一个绑定了 this 的函数
   * @param func - 要绑定的函数
   * @param thisArg - 绑定的 this 上下文
   * @param partials - 部分应用的参数
   * @returns 新函数
   * @example
   * ```ts
   * const greet = function(greeting, name) {
   *   return greeting + ' ' + this.user + ' ' + name;
   * };
   * const bound = FunctionUtil.bind(greet, { user: 'fred' }, 'hi');
   * bound('barney') // => 'hi fred barney'
   * ```
   */
  static bind = bind;

  /**
   * 创建一个绑定了对象方法的函数
   * @param object - 要绑定的对象
   * @param key - 方法名
   * @param partials - 部分应用的参数
   * @returns 新函数
   * @example
   * ```ts
   * const object = {
   *   user: 'fred',
   *   greet: function(greeting, name) {
   *     return greeting + ' ' + this.user + ' ' + name;
   *   }
   * };
   * const bound = FunctionUtil.bindKey(object, 'greet', 'hi');
   * bound('barney') // => 'hi fred barney'
   * ```
   */
  static bindKey = bindKey;

  /**
   * 创建一个柯里化的函数
   * @param func - 要柯里化的函数
   * @param arity - 参数个数
   * @returns 新函数
   * @example
   * ```ts
   * const abc = (a: string, b: string, c: string) => [a, b, c];
   * const curried = FunctionUtil.curry(abc);
   * curried('a')('b')('c') // => ['a', 'b', 'c']
   * ```
   */
  static curry = curry;

  /**
   * 创建一个从右到左柯里化的函数
   * @param func - 要柯里化的函数
   * @param arity - 参数个数
   * @returns 新函数
   * @example
   * ```ts
   * const abc = (a: string, b: string, c: string) => [a, b, c];
   * const curriedRight = FunctionUtil.curryRight(abc);
   * curriedRight('c')('b')('a') // => ['a', 'b', 'c']
   * ```
   */
  static curryRight = curryRight;

  /**
   * 创建一个防抖动函数，在最后一次调用后延迟执行
   * @param func - 要防抖动的函数
   * @param wait - 延迟时间
   * @param options - 选项
   * @returns 新函数
   * @example
   * ```ts
   * const debounced = FunctionUtil.debounce(() => console.log('debounced'), 300);
   * debounced();
   * debounced();
   * // => 只有最后一次调用会延迟 300ms 后执行
   * ```
   */
  static debounce = debounce;

  /**
   * 延迟执行函数
   * @param func - 要延迟的函数
   * @param args - 函数参数
   * @returns 新函数
   * @example
   * ```ts
   * const deferred = FunctionUtil.defer(() => console.log('deferred'));
   * deferred();
   * // => 延迟到下一个事件循环执行
   * ```
   */
  static defer = defer;

  /**
   * 延迟执行函数
   * @param func - 要延迟的函数
   * @param wait - 延迟时间
   * @param args - 函数参数
   * @returns 新函数
   * @example
   * ```ts
   * const delayed = FunctionUtil.delay(() => console.log('delayed'), 300);
   * delayed();
   * // => 延迟 300ms 后执行
   * ```
   */
  static delay = delay;

  /**
   * 反转函数参数
   * @param func - 要反转参数的函数
   * @returns 新函数
   * @example
   * ```ts
   * const flipped = FunctionUtil.flip((a: string, b: string) => [a, b]);
   * flipped('a', 'b') // => ['b', 'a']
   * ```
   */
  static flip = flip;

  /**
   * 创建一个记忆化函数，缓存函数结果
   * @param func - 要记忆化的函数
   * @param resolver - 自定义缓存键解析器
   * @returns 新函数
   * @example
   * ```ts
   * const memoized = FunctionUtil.memoize((a: number, b: number) => a + b);
   * memoized(1, 2) // => 3
   * memoized(1, 2) // => 从缓存中获取结果
   * ```
   */
  static memoize = memoize;

  /**
   * 创建一个取反函数
   * @param predicate - 要取反的函数
   * @returns 新函数
   * @example
   * ```ts
   * const isEven = (n: number) => n % 2 === 0;
   * const isOdd = FunctionUtil.negate(isEven);
   * isOdd(3) // => true
   * ```
   */
  static negate = negate;

  /**
   * 创建一个只执行一次的函数
   * @param func - 要执行的函数
   * @returns 新函数
   * @example
   * ```ts
   * const initialize = FunctionUtil.once(() => console.log('init!'));
   * initialize();
   * initialize();
   * // => 只有第一次调用会执行
   * ```
   */
  static once = once;

  /**
   * 创建一个函数，可以对指定参数应用转换函数
   * @param func - 要转换参数的函数
   * @param transforms - 转换函数数组
   * @returns 新函数
   * @example
   * ```ts
   * const doubled = (n: number) => n * 2;
   * const square = (n: number) => n * n;
   * const overArgs = FunctionUtil.overArgs((a: number, b: number) => [a, b], [doubled, square]);
   * overArgs(1, 2) // => [2, 4]
   * ```
   */
  static overArgs = overArgs;

  /**
   * 创建一个部分应用的函数
   * @param func - 要部分应用的函数
   * @param partials - 部分应用的参数
   * @returns 新函数
   * @example
   * ```ts
   * const greet = (greeting: string, name: string) => greeting + ' ' + name;
   * const sayHello = FunctionUtil.partial(greet, 'hello');
   * sayHello('world') // => 'hello world'
   * ```
   */
  static partial = partial;

  /**
   * 创建一个从右到左部分应用的函数
   * @param func - 要部分应用的函数
   * @param partials - 部分应用的参数
   * @returns 新函数
   * @example
   * ```ts
   * const greet = (greeting: string, name: string) => greeting + ' ' + name;
   * const greetWorld = FunctionUtil.partialRight(greet, 'world');
   * greetWorld('hello') // => 'hello world'
   * ```
   */
  static partialRight = partialRight;

  /**
   * 创建一个重新排列参数的函数
   * @param func - 要重新排列参数的函数
   * @param indexes - 新的参数索引
   * @returns 新函数
   * @example
   * ```ts
   * const rearg = FunctionUtil.rearg((a: string, b: string, c: string) => [a, b, c], [2, 0, 1]);
   * rearg('a', 'b', 'c') // => ['c', 'a', 'b']
   * ```
   */
  static rearg = rearg;

  /**
   * 创建一个接受剩余参数的函数
   * @param func - 要接受剩余参数的函数
   * @param start - 开始接受剩余参数的索引
   * @returns 新函数
   * @example
   * ```ts
   * const rest = FunctionUtil.rest((a: string, b: string, ...args: string[]) => [a, b, args]);
   * rest('a', 'b', 'c', 'd') // => ['a', 'b', ['c', 'd']]
   * ```
   */
  static rest = rest;

  /**
   * 创建一个展开参数的函数
   * @param func - 要展开参数的函数
   * @param start - 开始展开参数的索引
   * @returns 新函数
   * @example
   * ```ts
   * const spread = FunctionUtil.spread((a: string, b: string, c: string) => [a, b, c]);
   * spread(['a', 'b', 'c']) // => ['a', 'b', 'c']
   * ```
   */
  static spread = spread;

  /**
   * 创建一个节流函数，在一定时间内只执行一次
   * @param func - 要节流的函数
   * @param wait - 节流时间
   * @param options - 选项
   * @returns 新函数
   * @example
   * ```ts
   * const throttled = FunctionUtil.throttle(() => console.log('throttled'), 300);
   * throttled();
   * throttled();
   * // => 每 300ms 最多执行一次
   * ```
   */
  static throttle = throttle;

  /**
   * 创建一个只接受一个参数的函数
   * @param func - 要限制参数个数的函数
   * @returns 新函数
   * @example
   * ```ts
   * const unary = FunctionUtil.unary((a: string, b: string) => [a, b]);
   * unary('a', 'b') // => ['a', undefined]
   * ```
   */
  static unary = unary;

  /**
   * 创建一个包裹函数
   * @param value - 要包裹的值
   * @param wrapper - 包裹函数
   * @returns 新函数
   * @example
   * ```ts
   * const wrapped = FunctionUtil.wrap('a', (value) => `wrapped ${value}`);
   * wrapped() // => 'wrapped a'
   * ```
   */
  static wrap = wrap;

  /**
   * 检查值是否是函数
   * @param value - 要检查的值
   * @returns 如果值是函数返回true，否则返回false
   * @example
   * ```ts
   * FunctionUtil.isFunction(function() {}) // => true
   * FunctionUtil.isFunction(() => {}) // => true
   * FunctionUtil.isFunction(class {}) // => true
   * FunctionUtil.isFunction(/abc/) // => false
   * ```
   */
  static isFunction = isFunction;

  /**
   * 检查值是否是原生函数
   * @param value - 要检查的值
   * @returns 如果值是原生函数返回true，否则返回false
   * @example
   * ```ts
   * FunctionUtil.isNative(Array.prototype.push) // => true
   * FunctionUtil.isNative(function() {}) // => false
   * ```
   */
  static isNative = isNative;
}
