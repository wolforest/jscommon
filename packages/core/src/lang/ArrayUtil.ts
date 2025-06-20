import {
  chunk,
  compact,
  concat,
  difference,
  differenceBy,
  differenceWith,
  drop,
  dropRight,
  dropRightWhile,
  dropWhile,
  fill,
  findIndex,
  findLastIndex,
  head,
  flatten,
  flattenDeep,
  flattenDepth,
  fromPairs,
  indexOf,
  initial,
  intersection,
  intersectionBy,
  intersectionWith,
  join,
  last,
  lastIndexOf,
  nth,
  pull,
  pullAll,
  pullAllBy,
  pullAllWith,
  pullAt,
  remove,
  reverse,
  slice,
  sortedIndex,
  sortedIndexBy,
  sortedIndexOf,
  sortedLastIndex,
  sortedLastIndexBy,
  sortedLastIndexOf,
  sortedUniq,
  sortedUniqBy,
  tail,
  take,
  takeRight,
  takeRightWhile,
  takeWhile,
  union,
  unionBy,
  unionWith,
  uniq,
  uniqBy,
  uniqWith,
  unzip,
  unzipWith,
  without,
  xor,
  xorBy,
  xorWith,
  zip,
  zipObject,
  zipObjectDeep,
  zipWith,
  castArray,
  isArray,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isEmpty,
  toArray
} from 'lodash-es';

export class ArrayUtil {
  /**
   * 将数组拆分成多个指定大小的块
   * @param array - 要处理的数组
   * @param size - 每个块的大小
   * @returns 拆分后的数组块
   * @example
   * ```ts
   * ArrayUtil.chunk(['a', 'b', 'c', 'd'], 2) // => [['a', 'b'], ['c', 'd']]
   * ```
   */
  static chunk: typeof chunk = chunk;

  /**
   * 创建一个移除了所有假值的数组
   * @param array - 要处理的数组
   * @returns 过滤后的数组
   * @example
   * ```ts
   * ArrayUtil.compact([0, 1, false, 2, '', 3]) // => [1, 2, 3]
   * ```
   */
  static compact: typeof compact = compact;

  /**
   * 合并多个数组
   * @param array - 第一个数组
   * @param values - 要合并的值
   * @returns 合并后的数组
   * @example
   * ```ts
   * ArrayUtil.concat([1], 2, [3], [[4]]) // => [1, 2, 3, [4]]
   * ```
   */
  static concat: typeof concat = concat;

  /**
   * 创建一个具有唯一值的数组，每个值不包含在其他给定的数组中
   * @param array - 要检查的数组
   * @param values - 要排除的值
   * @returns 过滤后的数组
   * @example
   * ```ts
   * ArrayUtil.difference([2, 1], [2, 3]) // => [1]
   * ```
   */
  static difference: typeof difference = difference;

  /**
   * 类似于 difference，但支持迭代器
   * @param array - 要检查的数组
   * @param values - 要排除的值
   * @param iteratee - 迭代器函数
   * @example
   * ```ts
   * ArrayUtil.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor) // => [1.2]
   * ```
   */
  static differenceBy: typeof differenceBy = differenceBy;

  /**
   * 类似于 difference，但支持比较器
   * @param array - 要检查的数组
   * @param values - 要排除的值
   * @param comparator - 比较器函数
   * @example
   * ```ts
   * const objects = [{ x: 1 }, { x: 2 }];
   * ArrayUtil.differenceWith(objects, [{ x: 1 }], (a, b) => a.x === b.x) // => [{ x: 2 }]
   * ```
   */
  static differenceWith: typeof differenceWith = differenceWith;

  /**
   * 创建一个切片数组，去除数组的前 n 个元素
   * @param array - 要查询的数组
   * @param n - 要去除的元素个数
   * @returns 切片后的数组
   * @example
   * ```ts
   * ArrayUtil.drop([1, 2, 3], 2) // => [3]
   * ```
   */
  static drop: typeof drop = drop;

  /**
   * 创建一个切片数组，去除数组的后 n 个元素
   * @param array - 要查询的数组
   * @param n - 要去除的元素个数
   * @returns 切片后的数组
   * @example
   * ```ts
   * ArrayUtil.dropRight([1, 2, 3], 2) // => [1]
   * ```
   */
  static dropRight: typeof dropRight = dropRight;

  /**
   * 创建一个切片数组，去除数组中从末尾开始不满足条件的元素
   * @param array - 要查询的数组
   * @param predicate - 判断函数
   * @returns 切片后的数组
   * @example
   * ```ts
   * ArrayUtil.dropRightWhile([1, 2, 3, 4], n => n > 2) // => [1, 2]
   * ```
   */
  static dropRightWhile: typeof dropRightWhile = dropRightWhile;

  /**
   * 创建一个切片数组，去除数组中从开头开始不满足条件的元素
   * @param array - 要查询的数组
   * @param predicate - 判断函数
   * @returns 切片后的数组
   * @example
   * ```ts
   * ArrayUtil.dropWhile([1, 2, 3, 4], n => n < 3) // => [3, 4]
   * ```
   */
  static dropWhile: typeof dropWhile = dropWhile;

  /**
   * 使用给定值填充数组
   * @param array - 要填充的数组
   * @param value - 填充值
   * @param start - 起始位置
   * @param end - 结束位置
   * @returns 填充后的数组
   * @example
   * ```ts
   * ArrayUtil.fill([1, 2, 3], 'a') // => ['a', 'a', 'a']
   * ArrayUtil.fill([1, 2, 3], 'a', 1, 2) // => [1, 'a', 3]
   * ```
   */
  static fill: typeof fill = fill;

  /**
   * 查找数组中第一个满足条件的元素的索引
   * @param array - 要搜索的数组
   * @param predicate - 判断函数
   * @param fromIndex - 开始搜索的位置
   * @returns 找到的索引，否则返回 -1
   * @example
   * ```ts
   * ArrayUtil.findIndex([{ id: 1 }, { id: 2 }], o => o.id === 2) // => 1
   * ```
   */
  static findIndex: typeof findIndex = findIndex;

  /**
   * 查找数组中最后一个满足条件的元素的索引
   * @param array - 要搜索的数组
   * @param predicate - 判断函数
   * @param fromIndex - 开始搜索的位置
   * @returns 找到的索引，否则返回 -1
   * @example
   * ```ts
   * ArrayUtil.findLastIndex([{ id: 1 }, { id: 2 }, { id: 1 }], o => o.id === 1) // => 2
   * ```
   */
  static findLastIndex: typeof findLastIndex = findLastIndex;

  /**
   * 获取数组的第一个元素
   * @param array - 要查询的数组
   * @returns 第一个元素
   * @example
   * ```ts
   * ArrayUtil.head([1, 2, 3]) // => 1
   * ```
   */
  static head: typeof head = head;

  /**
   * 减少一级数组嵌套深度
   * @param array - 要减少嵌套的数组
   * @returns 减少嵌套后的新数组
   * @example
   * ```ts
   * ArrayUtil.flatten([1, [2, [3, [4]], 5]]) // => [1, 2, [3, [4]], 5]
   * ```
   */
  static flatten: typeof flatten = flatten;

  /**
   * 将数组递归为一维数组
   * @param array - 要递归处理的数组
   * @returns 递归处理后的新数组
   * @example
   * ```ts
   * ArrayUtil.flattenDeep([1, [2, [3, [4]], 5]]) // => [1, 2, 3, 4, 5]
   * ```
   */
  static flattenDeep: typeof flattenDeep = flattenDeep;

  /**
   * 根据指定的深度递归减少数组的嵌套层级
   * @param array - 要减少嵌套的数组
   * @param depth - 最大递归深度
   * @returns 减少嵌套后的新数组
   * @example
   * ```ts
   * ArrayUtil.flattenDepth([1, [2, [3, [4]], 5]], 2) // => [1, 2, 3, [4], 5]
   * ```
   */
  static flattenDepth: typeof flattenDepth = flattenDepth;

  /**
   * 将键值对数组转换为对象
   * @param pairs - 键值对数组
   * @returns 转换后的对象
   * @example
   * ```ts
   * ArrayUtil.fromPairs([['a', 1], ['b', 2]]) // => { 'a': 1, 'b': 2 }
   * ```
   */
  static fromPairs: typeof fromPairs = fromPairs;

  /**
   * 获取元素在数组中的索引
   * @param array - 要搜索的数组
   * @param value - 要搜索的值
   * @param fromIndex - 开始搜索的位置
   * @returns 找到的索引，否则返回 -1
   * @example
   * ```ts
   * ArrayUtil.indexOf([1, 2, 1, 2], 2) // => 1
   * ```
   */
  static indexOf: typeof indexOf = indexOf;

  /**
   * 获取数组中除了最后一个元素之外的所有元素
   * @param array - 要查询的数组
   * @returns 截取后的新数组
   * @example
   * ```ts
   * ArrayUtil.initial([1, 2, 3]) // => [1, 2]
   * ```
   */
  static initial: typeof initial = initial;

  /**
   * 创建一个包含所有数组唯一值的新数组
   * @param arrays - 要检查的数组
   * @returns 交集数组
   * @example
   * ```ts
   * ArrayUtil.intersection([2, 1], [2, 3]) // => [2]
   * ```
   */
  static intersection: typeof intersection = intersection;

  /**
   * 类似于 intersection，但支持迭代器
   * @param arrays - 要检查的数组
   * @param iteratee - 迭代器函数
   * @returns 交集数组
   * @example
   * ```ts
   * ArrayUtil.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor) // => [2.1]
   * ```
   */
  static intersectionBy: typeof intersectionBy = intersectionBy;

  /**
   * 类似于 intersection，但支持比较器
   * @param arrays - 要检查的数组
   * @param comparator - 比较器函数
   * @returns 交集数组
   * @example
   * ```ts
   * const objects = [{ x: 1 }];
   * ArrayUtil.intersectionWith(objects, [{ x: 1 }], (a, b) => a.x === b.x) // => [{ x: 1 }]
   * ```
   */
  static intersectionWith: typeof intersectionWith = intersectionWith;

  /**
   * 将数组转换为由分隔符连接的字符串
   * @param array - 要转换的数组
   * @param separator - 分隔符
   * @returns 连接后的字符串
   * @example
   * ```ts
   * ArrayUtil.join(['a', 'b', 'c'], '~') // => 'a~b~c'
   * ```
   */
  static join: typeof join = join;

  /**
   * 获取数组的最后一个元素
   * @param array - 要查询的数组
   * @returns 最后一个元素
   * @example
   * ```ts
   * ArrayUtil.last([1, 2, 3]) // => 3
   * ```
   */
  static last: typeof last = last;

  /**
   * 获取元素在数组中的最后一个索引
   * @param array - 要搜索的数组
   * @param value - 要搜索的值
   * @param fromIndex - 开始搜索的位置
   * @returns 找到的索引，否则返回 -1
   * @example
   * ```ts
   * ArrayUtil.lastIndexOf([1, 2, 1, 2], 2) // => 3
   * ```
   */
  static lastIndexOf: typeof lastIndexOf = lastIndexOf;

  /**
   * 获取数组的第 n 个元素
   * @param array - 要查询的数组
   * @param n - 索引
   * @returns 第 n 个元素
   * @example
   * ```ts
   * ArrayUtil.nth(['a', 'b', 'c', 'd'], 1) // => 'b'
   * ArrayUtil.nth(['a', 'b', 'c', 'd'], -2) // => 'c'
   * ```
   */
  static nth: typeof nth = nth;

  /**
   * 移除数组中所有给定值的元素
   * @param array - 要修改的数组
   * @param values - 要移除的值
   * @returns 修改后的数组
   * @example
   * ```ts
   * const array = ['a', 'b', 'c', 'a', 'b', 'c'];
   * ArrayUtil.pull(array, 'a', 'c') // => ['b', 'b']
   * ```
   */
  static pull: typeof pull = pull;

  /**
   * 移除数组中所有给定数组中的元素
   * @param array - 要修改的数组
   * @param values - 要移除的值的数组
   * @returns 修改后的数组
   * @example
   * ```ts
   * const array = ['a', 'b', 'c', 'a', 'b', 'c'];
   * ArrayUtil.pullAll(array, ['a', 'c']) // => ['b', 'b']
   * ```
   */
  static pullAll: typeof pullAll = pullAll;

  /**
   * 类似于 pullAll，但支持迭代器
   * @param array - 要修改的数组
   * @param values - 要移除的值的数组
   * @param iteratee - 迭代器函数
   * @returns 修改后的数组
   * @example
   * ```ts
   * const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
   * ArrayUtil.pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x') // => [{ x: 2 }]
   * ```
   */
  static pullAllBy: typeof pullAllBy = pullAllBy;

  /**
   * 类似于 pullAll，但支持比较器
   * @param array - 要修改的数组
   * @param values - 要移除的值的数组
   * @param comparator - 比较器函数
   * @returns 修改后的数组
   * @example
   * ```ts
   * const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
   * ArrayUtil.pullAllWith(array, [{ x: 1 }], (a, b) => a.x === b.x) // => [{ x: 2 }, { x: 3 }]
   * ```
   */
  static pullAllWith: typeof pullAllWith = pullAllWith;

  /**
   * 根据索引移除数组中的元素
   * @param array - 要修改的数组
   * @param indexes - 要移除的索引
   * @returns 移除的元素数组
   * @example
   * ```ts
   * const array = ['a', 'b', 'c', 'd'];
   * const pulled = ArrayUtil.pullAt(array, [1, 3]); // array => ['a', 'c'], pulled => ['b', 'd']
   * ```
   */
  static pullAt: typeof pullAt = pullAt;

  /**
   * 移除数组中满足条件的元素
   * @param array - 要修改的数组
   * @param predicate - 判断函数
   * @returns 移除的元素数组
   * @example
   * ```ts
   * const array = [1, 2, 3, 4];
   * const evens = ArrayUtil.remove(array, n => n % 2 === 0); // array => [1, 3], evens => [2, 4]
   * ```
   */
  static remove: typeof remove = remove;

  /**
   * 反转数组
   * @param array - 要反转的数组
   * @returns 反转后的数组
   * @example
   * ```ts
   * ArrayUtil.reverse([1, 2, 3]) // => [3, 2, 1]
   * ```
   */
  static reverse: typeof reverse = reverse;

  /**
   * 创建数组的切片
   * @param array - 要切片的数组
   * @param start - 起始位置
   * @param end - 结束位置
   * @returns 切片数组
   * @example
   * ```ts
   * ArrayUtil.slice([1, 2, 3, 4], 1, 3) // => [2, 3]
   * ```
   */
  static slice: typeof slice = slice;

  /**
   * 查找值应该插入有序数组的位置
   * @param array - 有序数组
   * @param value - 要插入的值
   * @returns 插入位置的索引
   * @example
   * ```ts
   * ArrayUtil.sortedIndex([30, 50], 40) // => 1
   * ```
   */
  static sortedIndex: typeof sortedIndex = sortedIndex;

  /**
   * 类似于 sortedIndex，但支持迭代器
   * @param array - 有序数组
   * @param value - 要插入的值
   * @param iteratee - 迭代器函数
   * @returns 插入位置的索引
   * @example
   * ```ts
   * ArrayUtil.sortedIndexBy([{ x: 30 }, { x: 50 }], { x: 40 }, 'x') // => 1
   * ```
   */
  static sortedIndexBy: typeof sortedIndexBy = sortedIndexBy;

  /**
   * 查找值在有序数组中的位置
   * @param array - 有序数组
   * @param value - 要查找的值
   * @returns 找到的索引，否则返回 -1
   * @example
   * ```ts
   * ArrayUtil.sortedIndexOf([4, 5, 5, 5, 6], 5) // => 1
   * ```
   */
  static sortedIndexOf: typeof sortedIndexOf = sortedIndexOf;

  /**
   * 查找值应该插入有序数组的最高位置
   * @param array - 有序数组
   * @param value - 要插入的值
   * @returns 插入位置的索引
   * @example
   * ```ts
   * ArrayUtil.sortedLastIndex([4, 5, 5, 5, 6], 5) // => 4
   * ```
   */
  static sortedLastIndex: typeof sortedLastIndex = sortedLastIndex;

  /**
   * 类似于 sortedLastIndex，但支持迭代器
   * @param array - 有序数组
   * @param value - 要插入的值
   * @param iteratee - 迭代器函数
   * @returns 插入位置的索引
   * @example
   * ```ts
   * ArrayUtil.sortedLastIndexBy([{ x: 4 }, { x: 5 }, { x: 5 }], { x: 5 }, 'x') // => 3
   * ```
   */
  static sortedLastIndexBy: typeof sortedLastIndexBy = sortedLastIndexBy;

  /**
   * 查找值在有序数组中的最后位置
   * @param array - 有序数组
   * @param value - 要查找的值
   * @returns 找到的索引，否则返回 -1
   * @example
   * ```ts
   * ArrayUtil.sortedLastIndexOf([4, 5, 5, 5, 6], 5) // => 3
   * ```
   */
  static sortedLastIndexOf: typeof sortedLastIndexOf = sortedLastIndexOf;

  /**
   * 创建一个有序数组的唯一值数组
   * @param array - 要去重的数组
   * @returns 去重后的数组
   * @example
   * ```ts
   * ArrayUtil.sortedUniq([1, 1, 2, 3, 3]) // => [1, 2, 3]
   * ```
   */
  static sortedUniq: typeof sortedUniq = sortedUniq;

  /**
   * 类似于 sortedUniq，但支持迭代器
   * @param array - 要去重的数组
   * @param iteratee - 迭代器函数
   * @returns 去重后的数组
   * @example
   * ```ts
   * ArrayUtil.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor) // => [1.1, 2.3]
   * ```
   */
  static sortedUniqBy: typeof sortedUniqBy = sortedUniqBy;

  /**
   * 获取除了数组第一个元素以外的所有元素
   * @param array - 要查询的数组
   * @returns 剩余元素数组
   * @example
   * ```ts
   * ArrayUtil.tail([1, 2, 3]) // => [2, 3]
   * ```
   */
  static tail: typeof tail = tail;

  /**
   * 创建一个数组切片，从数组开头提取 n 个元素
   * @param array - 要查询的数组
   * @param n - 提取的元素个数
   * @returns 提取的元素数组
   * @example
   * ```ts
   * ArrayUtil.take([1, 2, 3], 2) // => [1, 2]
   * ```
   */
  static take: typeof take = take;

  /**
   * 创建一个数组切片，从数组末尾提取 n 个元素
   * @param array - 要查询的数组
   * @param n - 提取的元素个数
   * @returns 提取的元素数组
   * @example
   * ```ts
   * ArrayUtil.takeRight([1, 2, 3], 2) // => [2, 3]
   * ```
   */
  static takeRight: typeof takeRight = takeRight;

  /**
   * 从数组末尾开始提取元素，直到 predicate 返回假值
   * @param array - 要查询的数组
   * @param predicate - 判断函数
   * @returns 提取的元素数组
   * @example
   * ```ts
   * ArrayUtil.takeRightWhile([1, 2, 3, 4], n => n > 2) // => [3, 4]
   * ```
   */
  static takeRightWhile: typeof takeRightWhile = takeRightWhile;

  /**
   * 从数组开头提取元素，直到 predicate 返回假值
   * @param array - 要查询的数组
   * @param predicate - 判断函数
   * @returns 提取的元素数组
   * @example
   * ```ts
   * ArrayUtil.takeWhile([1, 2, 3, 4], n => n < 3) // => [1, 2]
   * ```
   */
  static takeWhile: typeof takeWhile = takeWhile;

  /**
   * 创建一个包含所有给定数组唯一值的数组
   * @param arrays - 要合并的数组
   * @returns 合并后的数组
   * @example
   * ```ts
   * ArrayUtil.union([2], [1, 2]) // => [2, 1]
   * ```
   */
  static union: typeof union = union;

  /**
   * 类似于 union，但支持迭代器
   * @param arrays - 要合并的数组
   * @param iteratee - 迭代器函数
   * @returns 合并后的数组
   * @example
   * ```ts
   * ArrayUtil.unionBy([2.1], [1.2, 2.3], Math.floor) // => [2.1, 1.2]
   * ```
   */
  static unionBy: typeof unionBy = unionBy;

  /**
   * 类似于 union，但支持比较器
   * @param arrays - 要合并的数组
   * @param comparator - 比较器函数
   * @returns 合并后的数组
   * @example
   * ```ts
   * ArrayUtil.unionWith([{ x: 1 }], [{ x: 2 }, { x: 1 }], (a, b) => a.x === b.x) // => [{ x: 1 }, { x: 2 }]
   * ```
   */
  static unionWith: typeof unionWith = unionWith;

  /**
   * 创建一个去重后的数组
   * @param array - 要去重的数组
   * @returns 去重后的数组
   * @example
   * ```ts
   * ArrayUtil.uniq([2, 1, 2]) // => [2, 1]
   * ```
   */
  static uniq: typeof uniq = uniq;

  /**
   * 类似于 uniq，但支持迭代器
   * @param array - 要去重的数组
   * @param iteratee - 迭代器函数
   * @returns 去重后的数组
   * @example
   * ```ts
   * ArrayUtil.uniqBy([2.1, 1.2, 2.3], Math.floor) // => [2.1, 1.2]
   * ```
   */
  static uniqBy: typeof uniqBy = uniqBy;

  /**
   * 类似于 uniq，但支持比较器
   * @param array - 要去重的数组
   * @param comparator - 比较器函数
   * @returns 去重后的数组
   * @example
   * ```ts
   * ArrayUtil.uniqWith([{ x: 1 }, { x: 2 }, { x: 1 }], (a, b) => a.x === b.x) // => [{ x: 1 }, { x: 2 }]
   * ```
   */
  static uniqWith: typeof uniqWith = uniqWith;

  /**
   * 将打包的数组还原为分组的数组
   * @param array - 要还原的数组
   * @returns 还原后的数组
   * @example
   * ```ts
   * ArrayUtil.unzip([['a', 1], ['b', 2]]) // => [['a', 'b'], [1, 2]]
   * ```
   */
  static unzip: typeof unzip = unzip;

  /**
   * 类似于 unzip，但支持迭代器
   * @param array - 要还原的数组
   * @param iteratee - 迭代器函数
   * @returns 还原后的数组
   * @example
   * ```ts
   * ArrayUtil.unzipWith([[1, 10], [2, 20]], (a, b) => a + b) // => [3, 30]
   * ```
   */
  static unzipWith: typeof unzipWith = unzipWith;

  /**
   * 创建一个排除所有给定值的数组
   * @param array - 要筛选的数组
   * @param values - 要排除的值
   * @returns 筛选后的数组
   * @example
   * ```ts
   * ArrayUtil.without([2, 1, 2, 3], 1, 2) // => [3]
   * ```
   */
  static without: typeof without = without;

  /**
   * 创建一个给定数组唯一值的数组
   * @param arrays - 要检查的数组
   * @returns 过滤后的数组
   * @example
   * ```ts
   * ArrayUtil.xor([2, 1], [2, 3]) // => [1, 3]
   * ```
   */
  static xor: typeof xor = xor;

  /**
   * 类似于 xor，但支持迭代器
   * @param arrays - 要检查的数组
   * @param iteratee - 迭代器函数
   * @returns 过滤后的数组
   * @example
   * ```ts
   * ArrayUtil.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor) // => [1.2, 3.4]
   * ```
   */
  static xorBy: typeof xorBy = xorBy;

  /**
   * 类似于 xor，但支持比较器
   * @param arrays - 要检查的数组
   * @param comparator - 比较器函数
   * @returns 过滤后的数组
   * @example
   * ```ts
   * const objects = [{ x: 1 }, { x: 2 }];
   * ArrayUtil.xorWith(objects, [{ x: 1 }], (a, b) => a.x === b.x) // => [{ x: 2 }]
   * ```
   */
  static xorWith: typeof xorWith = xorWith;

  /**
   * 创建一个分组元素的数组
   * @param arrays - 要处理的数组
   * @returns 打包后的数组
   * @example
   * ```ts
   * ArrayUtil.zip(['a', 'b'], [1, 2]) // => [['a', 1], ['b', 2]]
   * ```
   */
  static zip: typeof zip = zip;

  /**
   * 创建一个对象，key 来自第一个数组，value 来自第二个数组
   * @param props - 属性数组
   * @param values - 值数组
   * @returns 组合后的对象
   * @example
   * ```ts
   * ArrayUtil.zipObject(['a', 'b'], [1, 2]) // => { 'a': 1, 'b': 2 }
   * ```
   */
  static zipObject: typeof zipObject = zipObject;

  /**
   * 类似于 zipObject，但支持属性路径
   * @param paths - 属性路径数组
   * @param values - 值数组
   * @returns 组合后的对象
   * @example
   * ```ts
   * ArrayUtil.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2])
   * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
   * ```
   */
  static zipObjectDeep: typeof zipObjectDeep = zipObjectDeep;

  /**
   * 类似于 zip，但支持迭代器
   * @param arrays - 要处理的数组
   * @param iteratee - 迭代器函数
   * @returns 组合后的数组
   * @example
   * ```ts
   * ArrayUtil.zipWith([1, 2], [10, 20], (a, b) => a + b) // => [11, 22]
   * ```
   */
  static zipWith: typeof zipWith = zipWith;

  /**
   * 将值转换为数组
   * @param value - 要转换的值
   * @returns 转换后的数组
   * @example
   * ```ts
   * ArrayUtil.castArray(1) // => [1]
   * ArrayUtil.castArray([1, 2, 3]) // => [1, 2, 3]
   * ArrayUtil.castArray({ a: 1 }) // => [{ a: 1 }]
   * ArrayUtil.castArray('abc') // => ['abc']
   * ```
   */
  static castArray: typeof castArray = castArray;

  /**
   * 检查值是否是 Array 对象
   * @param value - 要检查的值
   * @returns 如果值是数组返回 true，否则返回 false
   * @example
   * ```ts
   * ArrayUtil.isArray([1, 2, 3]) // => true
   * ArrayUtil.isArray('abc') // => false
   * ArrayUtil.isArray(document.body.children) // => false
   * ```
   */
  static isArray: typeof isArray = isArray;

  /**
   * 检查值是否是 ArrayBuffer 对象
   * @param value - 要检查的值
   * @returns 如果值是 ArrayBuffer 返回 true，否则返回 false
   * @example
   * ```ts
   * ArrayUtil.isArrayBuffer(new ArrayBuffer(2)) // => true
   * ArrayUtil.isArrayBuffer(new Array(2)) // => false
   * ```
   */
  static isArrayBuffer: typeof isArrayBuffer = isArrayBuffer;

  /**
   * 检查值是否是类数组
   * @param value - 要检查的值
   * @returns 如果值是类数组返回 true，否则返回 false
   * @example
   * ```ts
   * ArrayUtil.isArrayLike([1, 2, 3]) // => true
   * ArrayUtil.isArrayLike(document.body.children) // => true
   * ArrayUtil.isArrayLike('abc') // => true
   * ArrayUtil.isArrayLike(() => {}) // => false
   * ```
   */
  static isArrayLike: typeof isArrayLike = isArrayLike;

  /**
   * 检查值是否是类数组对象
   * @param value - 要检查的值
   * @returns 如果值是类数组对象返回 true，否则返回 false
   * @example
   * ```ts
   * ArrayUtil.isArrayLikeObject([1, 2, 3]) // => true
   * ArrayUtil.isArrayLikeObject(document.body.children) // => true
   * ArrayUtil.isArrayLikeObject('abc') // => false
   * ```
   */
  static isArrayLikeObject: typeof isArrayLikeObject = isArrayLikeObject;

  /**
   * 检查数组是否为空
   * @param value - 要检查的数组
   * @returns 如果数组为空返回 true，否则返回 false
   * @example
   * ```ts
   * ArrayUtil.isEmpty([]) // => true
   * ArrayUtil.isEmpty([1, 2, 3]) // => false
   * ```
   */
  static isEmpty: typeof isEmpty = isEmpty;

  /**
   * 转换值为数组
   * @param value - 要转换的值
   * @returns 转换后的数组
   * @example
   * ```ts
   * ArrayUtil.toArray({ a: 1, b: 2 }) // => [1, 2]
   * ArrayUtil.toArray('abc') // => ['a', 'b', 'c']
   * ArrayUtil.toArray(1) // => []
   * ArrayUtil.toArray(null) // => []
   * ```
   */
  static toArray: typeof toArray = toArray;
} 