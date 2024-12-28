import {
  assign,
  assignIn,
  assignInWith,
  assignWith,
  at,
  create,
  defaults,
  defaultsDeep,
  findKey,
  findLastKey,
  forIn,
  forInRight,
  forOwn,
  forOwnRight,
  functions,
  functionsIn,
  get,
  has,
  hasIn,
  invert,
  invertBy,
  invoke,
  keys,
  keysIn,
  mapKeys,
  mapValues,
  merge,
  mergeWith,
  omit,
  omitBy,
  pick,
  pickBy,
  result,
  set,
  setWith,
  toPairs,
  toPairsIn,
  transform,
  unset,
  update,
  updateWith,
  values,
  valuesIn
} from 'lodash-es';

export class ObjectUtil {
  /**
   * 分配源对象的可枚举属性到目标对象
   * @param object - 目标对象
   * @param sources - 源对象
   * @returns 目标对象
   * @example
   * ```ts
   * ObjectUtil.assign({ a: 0 }, { b: 1 }, { c: 2 }) // => { a: 0, b: 1, c: 2 }
   * ```
   */
  static assign = assign;

  /**
   * 分配源对象的可枚举和继承的属性到目标对象
   * @param object - 目标对象
   * @param sources - 源对象
   * @returns 目标对象
   * @example
   * ```ts
   * function Foo() { this.a = 1; }
   * Foo.prototype.b = 2;
   * ObjectUtil.assignIn({ c: 3 }, new Foo) // => { a: 1, b: 2, c: 3 }
   * ```
   */
  static assignIn = assignIn;

  /**
   * 类似于 assignIn，但支持自定义处理程序
   * @param object - 目标对象
   * @param sources - 源对象
   * @param customizer - 自定义处理程序
   * @returns 目标对象
   */
  static assignInWith = assignInWith;

  /**
   * 类似于 assign，但支持自定义处理程序
   * @param object - 目标对象
   * @param sources - 源对象
   * @param customizer - 自定义处理程序
   * @returns 目标对象
   */
  static assignWith = assignWith;

  /**
   * 根据对象路径获取值数组
   * @param object - 要查询的对象
   * @param paths - 要获取的属性路径
   * @returns 属性值数组
   * @example
   * ```ts
   * const object = { a: [{ b: { c: 3 } }, 4] };
   * ObjectUtil.at(object, ['a[0].b.c', 'a[1]']) // => [3, 4]
   * ```
   */
  static at = at;

  /**
   * 创建一个继承 prototype 的对象
   * @param prototype - 要继承的对象
   * @param properties - 要分配的属性
   * @returns 新对象
   */
  static create = create;

  /**
   * 分配源对象的可枚举属性到目标对象（仅当目标对象的属性未定义时）
   * @param object - 目标对象
   * @param sources - 源对象
   * @returns 目标对象
   * @example
   * ```ts
   * ObjectUtil.defaults({ a: 1 }, { b: 2 }, { a: 3 }) // => { a: 1, b: 2 }
   * ```
   */
  static defaults = defaults;

  /**
   * 类似于 defaults，但会递归分配默认属性
   * @param object - 目标对象
   * @param sources - 源对象
   * @returns 目标对象
   */
  static defaultsDeep = defaultsDeep;

  /**
   * 查找对象中第一个满足条件的属性的键名
   * @param object - 要搜索的对象
   * @param predicate - 判断函数
   * @returns 找到的键名，否则返回 undefined
   * @example
   * ```ts
   * const users = {
   *   'barney':  { 'age': 36, 'active': true },
   *   'fred':    { 'age': 40, 'active': false },
   *   'pebbles': { 'age': 1,  'active': true }
   * };
   * ObjectUtil.findKey(users, o => o.age < 40) // => 'barney'
   * ```
   */
  static findKey = findKey;

  /**
   * 类似于 findKey，但是从后往前遍历
   * @param object - 要搜索的对象
   * @param predicate - 判断函数
   * @returns 找到的键名，否则返回 undefined
   */
  static findLastKey = findLastKey;

  /**
   * 遍历对象的自身和继承的可枚举属性
   * @param object - 要遍历的对象
   * @param iteratee - 迭代函数
   * @returns 原对象
   * @example
   * ```ts
   * function Foo() { this.a = 1; this.b = 2; }
   * Foo.prototype.c = 3;
   * ObjectUtil.forIn(new Foo, (value, key) => console.log(key));
   * // => 输出 'a', 'b', 'c'
   * ```
   */
  static forIn = forIn;

  /**
   * 类似于 forIn，但是从后往前遍历
   * @param object - 要遍历的对象
   * @param iteratee - 迭代函数
   * @returns 原对象
   */
  static forInRight = forInRight;

  /**
   * 遍历对象的自身可枚举属性
   * @param object - 要遍历的对象
   * @param iteratee - 迭代函数
   * @returns 原对象
   * @example
   * ```ts
   * function Foo() { this.a = 1; this.b = 2; }
   * Foo.prototype.c = 3;
   * ObjectUtil.forOwn(new Foo, (value, key) => console.log(key));
   * // => 输出 'a', 'b'
   * ```
   */
  static forOwn = forOwn;

  /**
   * 类似于 forOwn，但是从后往前遍历
   * @param object - 要遍历的对象
   * @param iteratee - 迭代函数
   * @returns 原对象
   */
  static forOwnRight = forOwnRight;

  /**
   * 获取对象的函数属性名数组
   * @param object - 要检查的对象
   * @returns 函数名数组
   * @example
   * ```ts
   * function Foo() {
   *   this.a = () => 'a';
   *   this.b = () => 'b';
   * }
   * ObjectUtil.functions(new Foo) // => ['a', 'b']
   * ```
   */
  static functions = functions;

  /**
   * 获取对象的自身和继承的函数属性名数组
   * @param object - 要检查的对象
   * @returns 函数名数组
   */
  static functionsIn = functionsIn;

  /**
   * 获取对象路径上的值
   * @param object - 要查询的对象
   * @param path - 要获取的属性路径
   * @param defaultValue - 默认值
   * @returns 解析后的值
   * @example
   * ```ts
   * const object = { 'a': [{ 'b': { 'c': 3 } }] };
   * ObjectUtil.get(object, 'a[0].b.c') // => 3
   * ObjectUtil.get(object, ['a', '0', 'b', 'c']) // => 3
   * ObjectUtil.get(object, 'a.b.c', 'default') // => 'default'
   * ```
   */
  static get = get;

  /**
   * 检查路径是否是对象的直接属性
   * @param object - 要查询的对象
   * @param path - 要检查的属性路径
   * @returns 如果路径存在，那么返回 true，否则返回 false
   * @example
   * ```ts
   * const object = { 'a': { 'b': 2 } };
   * ObjectUtil.has(object, 'a') // => true
   * ObjectUtil.has(object, 'a.b') // => true
   * ```
   */
  static has = has;

  /**
   * 检查路径是否是对象的直接或继承属性
   * @param object - 要查询的对象
   * @param path - 要检查的属性路径
   * @returns 如果路径存在，那么返回 true，否则返回 false
   */
  static hasIn = hasIn;

  /**
   * 创建一个键值倒置的对象
   * @param object - 要倒置的对象
   * @returns 倒置后的新对象
   * @example
   * ```ts
   * const object = { 'a': 1, 'b': 2, 'c': 1 };
   * ObjectUtil.invert(object) // => { '1': 'c', '2': 'b' }
   * ```
   */
  static invert = invert;

  /**
   * 类似于 invert，但支持自定义处理程序
   * @param object - 要倒置的对象
   * @param iteratee - 自定义处理程序
   * @returns 倒置后的新对象
   * @example
   * ```ts
   * const object = { 'a': 1, 'b': 2, 'c': 1 };
   * ObjectUtil.invertBy(object) // => { '1': ['a', 'c'], '2': ['b'] }
   * ```
   */
  static invertBy = invertBy;

  /**
   * 调用对象路径上的方法
   * @param object - 要调用的对象
   * @param path - 方法路径
   * @param args - 方法参数
   * @returns 调用结果
   * @example
   * ```ts
   * const object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
   * ObjectUtil.invoke(object, 'a[0].b.c.slice', 1, 3) // => [2, 3]
   * ```
   */
  static invoke = invoke;

  /**
   * 获取对象自身可枚举属性的键名数组
   * @param object - 要查询的对象
   * @returns 键名数组
   * @example
   * ```ts
   * function Foo() { this.a = 1; this.b = 2; }
   * Foo.prototype.c = 3;
   * ObjectUtil.keys(new Foo) // => ['a', 'b']
   * ```
   */
  static keys = keys;

  /**
   * 获取对象自身和继承的可枚举属性的键名数组
   * @param object - 要查询的对象
   * @returns 键名数组
   */
  static keysIn = keysIn;

  /**
   * 创建一个对象，其键名经过处理
   * @param object - 要处理的对象
   * @param iteratee - 处理函数
   * @returns 新对象
   * @example
   * ```ts
   * ObjectUtil.mapKeys({ 'a': 1, 'b': 2 }, (value, key) => key + value)
   * // => { 'a1': 1, 'b2': 2 }
   * ```
   */
  static mapKeys = mapKeys;

  /**
   * 创建一个对象，其值经过处理
   * @param object - 要处理的对象
   * @param iteratee - 处理函数
   * @returns 新对象
   * @example
   * ```ts
   * const users = { 'fred': { 'user': 'fred', 'age': 40 }, 'pebbles': { 'user': 'pebbles', 'age': 1 } };
   * ObjectUtil.mapValues(users, o => o.age) // => { 'fred': 40, 'pebbles': 1 }
   * ```
   */
  static mapValues = mapValues;

  /**
   * 递归合并源对象到目标对象
   * @param object - 目标对象
   * @param sources - 源对象
   * @returns 合并后的对象
   * @example
   * ```ts
   * const object = { 'a': [{ 'b': 2 }, { 'd': 4 }] };
   * const other = { 'a': [{ 'c': 3 }, { 'e': 5 }] };
   * ObjectUtil.merge(object, other) // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   * ```
   */
  static merge = merge;

  /**
   * 类似于 merge，但支持自定义处理程序
   * @param object - 目标对象
   * @param sources - 源对象
   * @param customizer - 自定义处理程序
   * @returns 合并后的对象
   */
  static mergeWith = mergeWith;

  /**
   * 创建一个对象，忽略指定的属性
   * @param object - 源对象
   * @param paths - 要忽略的属性路径
   * @returns 新对象
   * @example
   * ```ts
   * const object = { 'a': 1, 'b': '2', 'c': 3 };
   * ObjectUtil.omit(object, ['a', 'c']) // => { 'b': '2' }
   * ```
   */
  static omit = omit;

  /**
   * 创建一个对象，忽略不满足条件的属性
   * @param object - 源对象
   * @param predicate - 判断函数
   * @returns 新对象
   * @example
   * ```ts
   * const object = { 'a': 1, 'b': '2', 'c': 3 };
   * ObjectUtil.omitBy(object, isNumber) // => { 'b': '2' }
   * ```
   */
  static omitBy = omitBy;

  /**
   * 创建一个对象，只包含指定的属性
   * @param object - 源对象
   * @param paths - 要选择的属性路径
   * @returns 新对象
   * @example
   * ```ts
   * const object = { 'a': 1, 'b': '2', 'c': 3 };
   * ObjectUtil.pick(object, ['a', 'c']) // => { 'a': 1, 'c': 3 }
   * ```
   */
  static pick = pick;

  /**
   * 创建一个对象，只包含满足条件的属性
   * @param object - 源对象
   * @param predicate - 判断函数
   * @returns 新对象
   * @example
   * ```ts
   * const object = { 'a': 1, 'b': '2', 'c': 3 };
   * ObjectUtil.pickBy(object, isNumber) // => { 'a': 1, 'c': 3 }
   * ```
   */
  static pickBy = pickBy;

  /**
   * 获取对象路径上的值，如果解析值是函数则调用它
   * @param object - 要查询的对象
   * @param path - 属性路径
   * @param defaultValue - 默认值
   * @returns 解析后的值
   * @example
   * ```ts
   * const object = { 'a': [{ 'b': { 'c1': 3, 'c2': () => 4 } }] };
   * ObjectUtil.result(object, 'a[0].b.c1') // => 3
   * ObjectUtil.result(object, 'a[0].b.c2') // => 4
   * ```
   */
  static result = result;

  /**
   * 设置对象路径上的值
   * @param object - 要修改的对象
   * @param path - 属性路径
   * @param value - 要设置的值
   * @returns 修改后的对象
   * @example
   * ```ts
   * const object = { 'a': [{ 'b': { 'c': 3 } }] };
   * ObjectUtil.set(object, 'a[0].b.c', 4);
   * console.log(object.a[0].b.c) // => 4
   * ```
   */
  static set = set;

  /**
   * 类似于 set，但支持自定义处理程序
   * @param object - 要修改的对象
   * @param path - 属性路径
   * @param value - 要设置的值
   * @param customizer - 自定义处理程序
   * @returns 修改后的对象
   */
  static setWith = setWith;

  /**
   * 创建一个键值对数组
   * @param object - 要转换的对象
   * @returns 键值对数组
   * @example
   * ```ts
   * ObjectUtil.toPairs({ 'a': 1, 'b': 2 }) // => [['a', 1], ['b', 2]]
   * ```
   */
  static toPairs = toPairs;

  /**
   * 创建一个包含继承属性的键值对数组
   * @param object - 要转换的对象
   * @returns 键值对数组
   * @example
   * ```ts
   * function Foo() { this.a = 1; }
   * Foo.prototype.b = 2;
   * ObjectUtil.toPairsIn(new Foo) // => [['a', 1], ['b', 2]]
   * ```
   */
  static toPairsIn = toPairsIn;

  /**
   * 转换对象为新对象
   * @param object - 要转换的对象
   * @param iteratee - 迭代函数
   * @param accumulator - 初始值
   * @returns 转换后的对象
   * @example
   * ```ts
   * ObjectUtil.transform({ 'a': 1, 'b': 2 }, (result, value, key) => {
   *   result[key] = value * 2;
   * }, {}) // => { 'a': 2, 'b': 4 }
   * ```
   */
  static transform = transform;

  /**
   * 移除对象路径上的属性
   * @param object - 要修改的对象
   * @param path - 属性路径
   * @returns 如果属性被移除则返回 true，否则返回 false
   * @example
   * ```ts
   * const object = { 'a': [{ 'b': { 'c': 7 } }] };
   * ObjectUtil.unset(object, 'a[0].b.c') // => true
   * console.log(object) // => { 'a': [{ 'b': {} }] }
   * ```
   */
  static unset = unset;

  /**
   * 更新对象路径上的值
   * @param object - 要修改的对象
   * @param path - 属性路径
   * @param updater - 更新函数
   * @returns 修改后的对象
   * @example
   * ```ts
   * const object = { 'a': [{ 'b': { 'c': 3 } }] };
   * ObjectUtil.update(object, 'a[0].b.c', n => n * n)
   * // => { 'a': [{ 'b': { 'c': 9 } }] }
   * ```
   */
  static update = update;

  /**
   * 类似于 update，但支持自定义处理程序
   * @param object - 要修改的对象
   * @param path - 属性路径
   * @param updater - 更新函数
   * @param customizer - 自定义处理程序
   * @returns 修改后的对象
   */
  static updateWith = updateWith;

  /**
   * 获取对象自身可枚举属性的值数组
   * @param object - 要查询的对象
   * @returns 值数组
   * @example
   * ```ts
   * ObjectUtil.values({ 'a': 1, 'b': 2 }) // => [1, 2]
   * ```
   */
  static values = values;

  /**
   * 获取对象自身和继承的可枚举属性的值数组
   * @param object - 要查询的对象
   * @returns 值数组
   * @example
   * ```ts
   * function Foo() { this.a = 1; }
   * Foo.prototype.b = 2;
   * ObjectUtil.valuesIn(new Foo) // => [1, 2]
   * ```
   */
  static valuesIn = valuesIn;

}