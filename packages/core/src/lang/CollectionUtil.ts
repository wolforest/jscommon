import {
  countBy,
  forEach,
  forEachRight,
  every,
  filter,
  find,
  findLast,
  flatMap,
  flatMapDeep,
  flatMapDepth,
  groupBy,
  includes,
  invokeMap,
  keyBy,
  map,
  orderBy,
  partition,
  reduce,
  reduceRight,
  reject,
  sample,
  sampleSize,
  shuffle,
  size,
  some,
  sortBy
} from 'lodash-es';

export class CollectionUtil {
  /**
   * 创建一个组成对象，key 是经过 iteratee 执行处理的结果，value 是处理结果相同的元素个数
   * @param collection - 要处理的集合
   * @param iteratee - 迭代函数
   * @returns 组成的聚合对象
   * @example
   * ```ts
   * CollectionUtil.countBy([6.1, 4.2, 6.3], Math.floor) // => { '4': 1, '6': 2 }
   * CollectionUtil.countBy(['one', 'two', 'three'], 'length') // => { '3': 2, '5': 1 }
   * ```
   */
  static countBy: typeof countBy = countBy;

  /**
   * 遍历集合中的元素
   * @param collection - 要遍历的集合
   * @param iteratee - 迭代函数
   * @returns 原集合
   * @example
   * ```ts
   * CollectionUtil.forEach([1, 2], value => console.log(value));
   * // => 输出 1 然后是 2
   * ```
   */
  static forEach: typeof forEach = forEach;

  /**
   * 从右到左遍历集合中的元素
   * @param collection - 要遍历的集合
   * @param iteratee - 迭代函数
   * @returns 原集合
   * @example
   * ```ts
   * CollectionUtil.forEachRight([1, 2], value => console.log(value));
   * // => 输出 2 然后是 1
   * ```
   */
  static forEachRight: typeof forEachRight = forEachRight;

  /**
   * 检查集合中的所有元素是否都通过检查
   * @param collection - 要检查的集合
   * @param predicate - 检查函数
   * @returns 如果所有元素都通过检查则返回 true，否则返回 false
   * @example
   * ```ts
   * CollectionUtil.every([true, 1, null, 'yes'], Boolean) // => false
   * ```
   */
  static every: typeof every = every;

  /**
   * 遍历集合中的元素，返回所有通过检查的元素
   * @param collection - 要遍历的集合
   * @param predicate - 检查函数
   * @returns 过滤后的数组
   * @example
   * ```ts
   * const users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   * CollectionUtil.filter(users, o => !o.active) // => [{ 'user': 'fred', 'age': 40, 'active': false }]
   * ```
   */
  static filter: typeof filter = filter;

  /**
   * 遍历集合中的元素，返回第一个通过检查的元素
   * @param collection - 要遍历的集合
   * @param predicate - 检查函数
   * @param fromIndex - 开始搜索的位置
   * @returns 找到的元素，否则返回 undefined
   * @example
   * ```ts
   * const users = [
   *   { 'user': 'barney',  'age': 36, 'active': true },
   *   { 'user': 'fred',    'age': 40, 'active': false },
   *   { 'user': 'pebbles', 'age': 1,  'active': true }
   * ];
   * CollectionUtil.find(users, o => o.age < 40) // => { 'user': 'barney', 'age': 36, 'active': true }
   * ```
   */
  static find: typeof find = find;

  /**
   * 类似于 find，但是从右到左遍历集合
   * @param collection - 要遍历的集合
   * @param predicate - 检查函数
   * @param fromIndex - 开始搜索的位置
   * @returns 找到的元素，否则返回 undefined
   * @example
   * ```ts
   * CollectionUtil.findLast([1, 2, 3, 4], n => n % 2 === 1) // => 3
   * ```
   */
  static findLast: typeof findLast = findLast;

  /**
   * 创建一个扁平化的数组，每个元素会传入迭代函数，返回的结果会与值合并
   * @param collection - 要处理的集合
   * @param iteratee - 迭代函数
   * @returns 扁平化的新数组
   * @example
   * ```ts
   * function duplicate(n) {
   *   return [n, n];
   * }
   * CollectionUtil.flatMap([1, 2], duplicate) // => [1, 1, 2, 2]
   * ```
   */
  static flatMap: typeof flatMap = flatMap;

  /**
   * 类似于 flatMap，但会递归扁平化所有嵌套数组
   * @param collection - 要处理的集合
   * @param iteratee - 迭代函数
   * @returns 扁平化的新数组
   * @example
   * ```ts
   * function duplicate(n) {
   *   return [[[n, n]]];
   * }
   * CollectionUtil.flatMapDeep([1, 2], duplicate) // => [1, 1, 2, 2]
   * ```
   */
  static flatMapDeep: typeof flatMapDeep = flatMapDeep;

  /**
   * 类似于 flatMap，可以指定扁平化的深度
   * @param collection - 要处理的集合
   * @param iteratee - 迭代函数
   * @param depth - 最大递归深度
   * @returns 扁平化的新数组
   * @example
   * ```ts
   * function duplicate(n) {
   *   return [[[n, n]]];
   * }
   * CollectionUtil.flatMapDepth([1, 2], duplicate, 2) // => [[1, 1], [2, 2]]
   * ```
   */
  static flatMapDepth: typeof flatMapDepth = flatMapDepth;

  /**
   * 创建一个对象，key 是迭代函数返回的结果，value 是原始元素组成的数组
   * @param collection - 要处理的集合
   * @param iteratee - 迭代函数
   * @returns 分组后的对象
   * @example
   * ```ts
   * CollectionUtil.groupBy([6.1, 4.2, 6.3], Math.floor) // => { '4': [4.2], '6': [6.1, 6.3] }
   * ```
   */
  static groupBy: typeof groupBy = groupBy;

  /**
   * 检查值是否在集合中
   * @param collection - 要检查的集合
   * @param value - 要检查的值
   * @param fromIndex - 开始搜索的位置
   * @returns 如果值在集合中返回 true，否则返回 false
   * @example
   * ```ts
   * CollectionUtil.includes([1, 2, 3], 1) // => true
   * CollectionUtil.includes([1, 2, 3], 1, 2) // => false
   * ```
   */
  static includes: typeof includes = includes;

  /**
   * 调用集合中每个元素的方法
   * @param collection - 要处理的集合
   * @param path - 要调用的方法路径
   * @param args - 调用方法的参数
   * @returns 调用结果数组
   * @example
   * ```ts
   * CollectionUtil.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort')
   * // => [[1, 5, 7], [1, 2, 3]]
   * ```
   */
  static invokeMap: typeof invokeMap = invokeMap;

  /**
   * 创建一个对象，key 是迭代函数返回的结果，value 是集合中对应的元素
   * @param collection - 要处理的集合
   * @param iteratee - 迭代函数
   * @returns 组合后的对象
   * @example
   * ```ts
   * const array = [
   *   { 'dir': 'left', 'code': 97 },
   *   { 'dir': 'right', 'code': 100 }
   * ];
   * CollectionUtil.keyBy(array, 'dir') // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
   * ```
   */
  static keyBy: typeof keyBy = keyBy;

  /**
   * 创建一个数组，值是迭代函数处理的结果
   * @param collection - 要处理的集合
   * @param iteratee - 迭代函数
   * @returns 映射后的新数组
   * @example
   * ```ts
   * function square(n) {
   *   return n * n;
   * }
   * CollectionUtil.map([4, 8], square) // => [16, 64]
   * ```
   */
  static map: typeof map = map;

  /**
   * 创建一个元素数组，以指定的条件进行排序
   * @param collection - 要排序的集合
   * @param iteratees - 迭代函数数组
   * @param orders - 排序顺序数组
   * @returns 排序后的新数组
   * @example
   * ```ts
   * const users = [
   *   { 'user': 'fred',   'age': 48 },
   *   { 'user': 'barney', 'age': 34 },
   *   { 'user': 'fred',   'age': 40 },
   *   { 'user': 'barney', 'age': 36 }
   * ];
   * CollectionUtil.orderBy(users, ['user', 'age'], ['asc', 'desc'])
   * // => [{ 'user': 'barney', 'age': 36 }, { 'user': 'barney', 'age': 34 },
   * //     { 'user': 'fred',   'age': 48 }, { 'user': 'fred',   'age': 40 }]
   * ```
   */
  static orderBy: typeof orderBy = orderBy;

  /**
   * 创建一个分成两组的元素数组，第一组包含所有满足条件的元素，第二组包含所有不满足条件的元素
   * @param collection - 要分组的集合
   * @param predicate - 分组条件
   * @returns 分组后的数组
   * @example
   * ```ts
   * const users = [
   *   { 'user': 'barney',  'age': 36, 'active': false },
   *   { 'user': 'fred',    'age': 40, 'active': true },
   *   { 'user': 'pebbles', 'age': 1,  'active': false }
   * ];
   * CollectionUtil.partition(users, o => o.active)
   * // => [[{ 'user': 'fred', 'age': 40, 'active': true }],
   * //     [{ 'user': 'barney', 'age': 36, 'active': false },
   * //      { 'user': 'pebbles', 'age': 1, 'active': false }]]
   * ```
   */
  static partition: typeof partition = partition;

  /**
   * 归并集合中的元素
   * @param collection - 要归并的集合
   * @param iteratee - 迭代函数
   * @param accumulator - 初始值
   * @returns 归并后的值
   * @example
   * ```ts
   * CollectionUtil.reduce([1, 2], (sum, n) => sum + n, 0) // => 3
   * ```
   */
  static reduce: typeof reduce = reduce;

  /**
   * 从右到左归并集合中的元素
   * @param collection - 要归并的集合
   * @param iteratee - 迭代函数
   * @param accumulator - 初始值
   * @returns 归并后的值
   * @example
   * ```ts
   * const array = [[0, 1], [2, 3], [4, 5]];
   * CollectionUtil.reduceRight(array, (flattened, other) => flattened.concat(other), [])
   * // => [4, 5, 2, 3, 0, 1]
   * ```
   */
  static reduceRight: typeof reduceRight = reduceRight;

  /**
   * 返回所有不满足条件的元素
   * @param collection - 要过滤的集合
   * @param predicate - 过滤条件
   * @returns 过滤后的新数组
   * @example
   * ```ts
   * const users = [
   *   { 'user': 'barney', 'age': 36, 'active': false },
   *   { 'user': 'fred',   'age': 40, 'active': true }
   * ];
   * CollectionUtil.reject(users, o => !o.active)
   * // => [{ 'user': 'fred', 'age': 40, 'active': true }]
   * ```
   */
  static reject: typeof reject = reject;

  /**
   * 从集合中随机获取一个元素
   * @param collection - 要获取的集合
   * @returns 随机元素
   * @example
   * ```ts
   * CollectionUtil.sample([1, 2, 3, 4]) // => 2
   * ```
   */
  static sample: typeof sample = sample;

  /**
   * 从集合中获取 n 个随机元素
   * @param collection - 要获取的集合
   * @param n - 要获取的数量
   * @returns 随机元素数组
   * @example
   * ```ts
   * CollectionUtil.sampleSize([1, 2, 3], 2) // => [3, 1]
   * ```
   */
  static sampleSize: typeof sampleSize = sampleSize;

  /**
   * 创建一个打乱的数组
   * @param collection - 要打乱的集合
   * @returns 打乱后的新数组
   * @example
   * ```ts
   * CollectionUtil.shuffle([1, 2, 3, 4]) // => [4, 1, 3, 2]
   * ```
   */
  static shuffle: typeof shuffle = shuffle;

  /**
   * 获取集合的长度
   * @param collection - 要获取长度的集合
   * @returns 集合的长度
   * @example
   * ```ts
   * CollectionUtil.size([1, 2, 3]) // => 3
   * CollectionUtil.size({ 'a': 1, 'b': 2 }) // => 2
   * ```
   */
  static size: typeof size = size;

  /**
   * 检查集合中是否存在满足条件的元素
   * @param collection - 要检查的集合
   * @param predicate - 检查函数
   * @returns 如果存在满足条件的元素则返回 true，否则返回 false
   * @example
   * ```ts
   * CollectionUtil.some([null, 0, 'yes', false], Boolean) // => true
   * const users = [
   *   { 'user': 'barney', 'active': true },
   *   { 'user': 'fred',   'active': false }
   * ];
   * CollectionUtil.some(users, { 'user': 'barney', 'active': false }) // => false
   * ```
   */
  static some: typeof some = some;

  /**
   * 创建一个元素数组，以指定的条件进行排序
   * @param collection - 要排序的集合
   * @param iteratees - 迭代函数数组
   * @returns 排序后的新数组
   * @example
   * ```ts
   * const users = [
   *   { 'user': 'fred',   'age': 48 },
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 40 },
   *   { 'user': 'barney', 'age': 34 }
   * ];
   * CollectionUtil.sortBy(users, [o => o.user]) 
   * // => [{ 'user': 'barney', 'age': 36 }, { 'user': 'barney', 'age': 34 },
   * //     { 'user': 'fred',   'age': 48 }, { 'user': 'fred',   'age': 40 }]
   * ```
   */
  static sortBy: typeof sortBy = sortBy;
}