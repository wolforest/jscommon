import { describe, it, expect, vi } from 'vitest';
import { FunctionUtil } from '../../src/lang/FunctionUtil';

describe('FunctionUtil', () => {
  // 函数调用次数相关测试
  describe('invocation count methods', () => {
    it('should handle after', () => {
      const calls: number[] = [];
      const fn = FunctionUtil.after(2, () => calls.push(1));
      
      fn();
      expect(calls).toEqual([]);
      fn();
      expect(calls).toEqual([1]);
    });

    it('should handle before', () => {
      const calls: number[] = [];
      const fn = FunctionUtil.before(2, () => calls.push(1));
      
      fn();
      expect(calls).toEqual([1]);
      fn();
      expect(calls).toEqual([1]);
    });

    it('should handle once', () => {
      const calls: number[] = [];
      const fn = FunctionUtil.once(() => calls.push(1));
      
      fn();
      fn();
      expect(calls).toEqual([1]);
    });
  });

  // 参数处理相关测试
  describe('argument handling methods', () => {
    it('should handle ary', () => {
      const fn = FunctionUtil.ary((...args: number[]) => args, 2);
      expect(fn(1, 2, 3)).toEqual([1, 2]);
    });

    it('should handle unary', () => {
      const fn = FunctionUtil.unary((...args: number[]) => args);
      expect(fn(1, 2, 3)).toEqual([1]);
    });

    it('should handle rearg', () => {
      const fn = FunctionUtil.rearg(
        (a: string, b: string, c: string) => [a, b, c],
        [2, 0, 1]
      );
      expect(fn('a', 'b', 'c')).toEqual(['c', 'a', 'b']);
    });

    it('should handle spread', () => {
      const fn = FunctionUtil.spread((a: string, b: string) => [a, b]);
      expect(fn(['a', 'b'])).toEqual(['a', 'b']);
    });
  });

  // 函数绑定相关测试
  describe('binding methods', () => {
    it('should handle bind', () => {
      const obj = { user: 'fred' };
      const fn = function(this: typeof obj, greeting: string) {
        return `${greeting} ${this.user}`;
      };
      const bound = FunctionUtil.bind(fn, obj, 'hi');
      expect(bound()).toBe('hi fred');
    });

    it('should handle bindKey', () => {
      const obj = {
        user: 'fred',
        greet(greeting: string) {
          return `${greeting} ${this.user}`;
        }
      };
      const bound = FunctionUtil.bindKey(obj, 'greet', 'hi');
      expect(bound()).toBe('hi fred');
    });
  });

  // 柯里化相关测试
  describe('currying methods', () => {
    it('should handle curry', () => {
      const fn = (a: string, b: string, c: string) => [a, b, c];
      const curried = FunctionUtil.curry(fn);
      expect(curried('a')('b')('c')).toEqual(['a', 'b', 'c']);
    });

    it('should handle curryRight', () => {
      const fn = (a: string, b: string, c: string) => [a, b, c];
      const curried = FunctionUtil.curryRight(fn);
      expect(curried('c')('b')('a')).toEqual(['a', 'b', 'c']);
    });
  });

  // 延迟执行相关测试
  describe('delay methods', () => {
    it('should handle debounce', async () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const debounced = FunctionUtil.debounce(fn, 100);
      
      debounced();
      debounced();
      expect(fn).not.toBeCalled();
      
      await vi.runAllTimersAsync();
      expect(fn).toBeCalledTimes(1);
      vi.useRealTimers();
    });

    it('should handle throttle', async () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const throttled = FunctionUtil.throttle(fn, 100);
      
      throttled();
      throttled();
      expect(fn).toBeCalledTimes(1);
      
      await vi.advanceTimersByTimeAsync(50);
      throttled();
      expect(fn).toBeCalledTimes(1);
      
      await vi.advanceTimersByTimeAsync(50);
      throttled();
      expect(fn).toBeCalledTimes(2);
      
      vi.useRealTimers();
    });

    it('should handle defer', async () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      FunctionUtil.defer(fn);
      expect(fn).not.toBeCalled();
      await vi.runAllTimersAsync();
      expect(fn).toBeCalled();
      vi.useRealTimers(); 
    });

    it('should handle delay', async () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      FunctionUtil.delay(fn, 100);
      expect(fn).not.toBeCalled();
      await vi.advanceTimersByTimeAsync(100);
      expect(fn).toBeCalled();
      vi.useRealTimers();
    });
  });

  // 函数转换相关测试
  describe('transformation methods', () => {
    it('should handle flip', () => {
      const fn = FunctionUtil.flip((a: string, b: string) => [a, b]);
      expect(fn('a', 'b')).toEqual(['b', 'a']);
    });

    it('should handle negate', () => {
      const isEven = (n: number) => n % 2 === 0;
      const isOdd = FunctionUtil.negate(isEven);
      expect(isOdd(3)).toBe(true);
      expect(isOdd(2)).toBe(false);
    });

    it('should handle overArgs', () => {
      const doubled = (n: number) => n * 2;
      const square = (n: number) => n * n;
      const fn = FunctionUtil.overArgs(
        (a: number, b: number) => [a, b],
        [doubled, square]
      );
      expect(fn(1, 2)).toEqual([2, 4]);
    });
  });

  // 部分应用相关测试
  describe('partial application methods', () => {
    it('should handle partial', () => {
      const greet = (greeting: string, name: string) => `${greeting} ${name}`;
      const sayHello = FunctionUtil.partial(greet, 'hello');
      expect(sayHello('world')).toBe('hello world');
    });

    it('should handle partialRight', () => {
      const greet = (greeting: string, name: string) => `${greeting} ${name}`;
      const greetWorld = FunctionUtil.partialRight(greet, 'world');
      expect(greetWorld('hello')).toBe('hello world');
    });
  });

  // 缓存相关测试
  describe('caching methods', () => {
    it('should handle memoize', () => {
      let calls = 0;
      const fn = FunctionUtil.memoize((a: number, b: number) => {
        calls++;
        return a + b;
      });
      
      expect(fn(1, 2)).toBe(3);
      expect(fn(1, 2)).toBe(3);
      expect(calls).toBe(1);
    });
  });

  // 包装相关测试
  describe('wrapping methods', () => {
    it('should handle wrap', () => {
      const fn = FunctionUtil.wrap('hello', (value) => `wrapped ${value}`);
      expect(fn()).toBe('wrapped hello');
    });
  });
}); 