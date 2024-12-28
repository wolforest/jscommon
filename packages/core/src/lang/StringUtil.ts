import {
  camelCase,
  capitalize,
  deburr,
  endsWith,
  escape,
  escapeRegExp,
  kebabCase,
  lowerCase,
  lowerFirst,
  pad,
  padEnd,
  padStart,
  parseInt,
  repeat,
  replace,
  snakeCase,
  split,
  startCase,
  startsWith,
  template,
  toLower,
  toUpper,
  trim,
  trimEnd,
  trimStart,
  truncate,
  unescape,
  upperCase,
  upperFirst,
  words
} from 'lodash-es';

export class StringUtil {
  /**
   * 转换字符串为驼峰写法
   * @param string - 要转换的字符串
   * @returns 驼峰写法的字符串
   * @example
   * ```ts
   * StringUtil.camelCase('Foo Bar') // => 'fooBar'
   * StringUtil.camelCase('--foo-bar--') // => 'fooBar'
   * StringUtil.camelCase('__FOO_BAR__') // => 'fooBar'
   * ```
   */
  static camelCase = camelCase;

  /**
   * 转换字符串首字母为大写，其余为小写
   * @param string - 要转换的字符串
   * @returns 转换后的字符串
   * @example
   * ```ts
   * StringUtil.capitalize('FRED') // => 'Fred'
   * ```
   */
  static capitalize = capitalize;

  /**
   * 转换字符串中的 Latin-1 Supplement 和 Latin Extended-A 字母为本的 Latin 字母
   * @param string - 要转换的字符串
   * @returns 转换后的字符串
   * @example
   * ```ts
   * StringUtil.deburr('déjà vu') // => 'deja vu'
   * ```
   */
  static deburr = deburr;

  /**
   * 检查字符串是否以给定的目标字符串结尾
   * @param string - 要检查的字符串
   * @param target - 目标字符串
   * @param position - 搜索的位置
   * @returns 如果字符串以目标字符串结尾，返回 true，否则返回 false
   * @example
   * ```ts
   * StringUtil.endsWith('abc', 'c') // => true
   * StringUtil.endsWith('abc', 'b') // => false
   * StringUtil.endsWith('abc', 'b', 2) // => true
   * ```
   */
  static endsWith = endsWith;

  /**
   * 转义字符串中的 HTML 特殊字符
   * @param string - 要转义的字符串
   * @returns 转义后的字符串
   * @example
   * ```ts
   * StringUtil.escape('fred, barney, & pebbles') // => 'fred, barney, &amp; pebbles'
   * ```
   */
  static escape = escape;

  /**
   * 转义正则表达式特殊字符
   * @param string - 要转义的字符串
   * @returns 转义后的字符串
   * @example
   * ```ts
   * StringUtil.escapeRegExp('[lodash](https://lodash.com/)') 
   * // => '\[lodash\]\(https://lodash\.com/\)'
   * ```
   */
  static escapeRegExp = escapeRegExp;

  /**
   * 转换字符串为短横线分隔写法
   * @param string - 要转换的字符串
   * @returns 短横线分隔的字符串
   * @example
   * ```ts
   * StringUtil.kebabCase('Foo Bar') // => 'foo-bar'
   * StringUtil.kebabCase('fooBar') // => 'foo-bar'
   * StringUtil.kebabCase('__FOO_BAR__') // => 'foo-bar'
   * ```
   */
  static kebabCase = kebabCase;

  /**
   * 转换字符串为空格分隔的小写单词
   * @param string - 要转换的字符串
   * @returns 转换后的字符串
   * @example
   * ```ts
   * StringUtil.lowerCase('--Foo-Bar--') // => 'foo bar'
   * StringUtil.lowerCase('fooBar') // => 'foo bar'
   * StringUtil.lowerCase('__FOO_BAR__') // => 'foo bar'
   * ```
   */
  static lowerCase = lowerCase;

  /**
   * 转换字符串的第一个字符为小写
   * @param string - 要转换的字符串
   * @returns 转换后的字符串
   * @example
   * ```ts
   * StringUtil.lowerFirst('Fred') // => 'fred'
   * StringUtil.lowerFirst('FRED') // => 'fRED'
   * ```
   */
  static lowerFirst = lowerFirst;

  /**
   * 在字符串两侧填充字符
   * @param string - 要填充的字符串
   * @param length - 目标长度
   * @param chars - 填充字符
   * @returns 填充后的字符串
   * @example
   * ```ts
   * StringUtil.pad('abc', 8) // => '  abc   '
   * StringUtil.pad('abc', 8, '_-') // => '_-abc_-_'
   * ```
   */
  static pad = pad;

  /**
   * 在字符串右侧填充字符
   * @param string - 要填充的字符串
   * @param length - 目标长度
   * @param chars - 填充字符
   * @returns 填充后的字符串
   * @example
   * ```ts
   * StringUtil.padEnd('abc', 6) // => 'abc   '
   * StringUtil.padEnd('abc', 6, '_-') // => 'abc_-_'
   * ```
   */
  static padEnd = padEnd;

  /**
   * 在字符串左侧填充字符
   * @param string - 要填充的字符串
   * @param length - 目标长度
   * @param chars - 填充字符
   * @returns 填充后的字符串
   * @example
   * ```ts
   * StringUtil.padStart('abc', 6) // => '   abc'
   * StringUtil.padStart('abc', 6, '_-') // => '_-_abc'
   * ```
   */
  static padStart = padStart;

  /**
   * 转换字符串为整数
   * @param string - 要转换的字符串
   * @param radix - 基数
   * @returns 转换后的整数
   * @example
   * ```ts
   * StringUtil.parseInt('08') // => 8
   * StringUtil.parseInt('10', 2) // => 2
   * ```
   */
  static parseInt = parseInt;

  /**
   * 重复字符串指定次数
   * @param string - 要重复的字符串
   * @param n - 重复次数
   * @returns 重复后的字符串
   * @example
   * ```ts
   * StringUtil.repeat('*', 3) // => '***'
   * StringUtil.repeat('abc', 2) // => 'abcabc'
   * ```
   */
  static repeat = repeat;

  /**
   * 替换字符串中匹配的内容
   * @param string - 原字符串
   * @param pattern - 匹配模式
   * @param replacement - 替换内容
   * @returns 替换后的字符串
   * @example
   * ```ts
   * StringUtil.replace('Hi Fred', 'Fred', 'Barney') // => 'Hi Barney'
   * ```
   */
  static replace = replace;

  /**
   * 转换字符串为下划线分隔写法
   * @param string - 要转换的字符串
   * @returns 下划线分隔的字符串
   * @example
   * ```ts
   * StringUtil.snakeCase('Foo Bar') // => 'foo_bar'
   * StringUtil.snakeCase('fooBar') // => 'foo_bar'
   * ```
   */
  static snakeCase = snakeCase;

  /**
   * 根据分隔符拆分字符串
   * @param string - 要拆分的字符串
   * @param separator - 分隔符
   * @param limit - 限制结果数量
   * @returns 拆分后的数组
   * @example
   * ```ts
   * StringUtil.split('a-b-c', '-', 2) // => ['a', 'b']
   * ```
   */
  static split = split;

  /**
   * 转换字符串为空格分隔的首字母大写单词
   * @param string - 要转换的字符串
   * @returns 转换后的字符串
   * @example
   * ```ts
   * StringUtil.startCase('--foo-bar--') // => 'Foo Bar'
   * StringUtil.startCase('fooBar') // => 'Foo Bar'
   * ```
   */
  static startCase = startCase;

  /**
   * 检查字符串是否以给定的目标字符串开头
   * @param string - 要检查的字符串
   * @param target - 目标字符串
   * @param position - 搜索的位置
   * @returns 如果字符串以目标字符串开头，返回 true，否则返回 false
   * @example
   * ```ts
   * StringUtil.startsWith('abc', 'a') // => true
   * StringUtil.startsWith('abc', 'b') // => false
   * StringUtil.startsWith('abc', 'b', 1) // => true
   * ```
   */
  static startsWith = startsWith;

  /**
   * 创建一个预编译模板
   * @param string - 模板字符串
   * @param options - 选项对象
   * @returns 编译后的模板函数
   * @example
   * ```ts
   * const compiled = StringUtil.template('hello <%= user %>!');
   * compiled({ 'user': 'fred' }) // => 'hello fred!'
   * ```
   */
  static template = template;

  /**
   * 转换字符串为小写
   * @param string - 要转换的字符串
   * @returns 转换后的字符串
   * @example
   * ```ts
   * StringUtil.toLower('--Foo-Bar--') // => '--foo-bar--'
   * ```
   */
  static toLower = toLower;

  /**
   * 转换字符串为大写
   * @param string - 要转换的字符串
   * @returns 转换后的字符串
   * @example
   * ```ts
   * StringUtil.toUpper('--foo-bar--') // => '--FOO-BAR--'
   * ```
   */
  static toUpper = toUpper;

  /**
   * 从字符串两端删除空白字符
   * @param string - 要处理的字符串
   * @param chars - 要删除的字符
   * @returns 处理后的字符串
   * @example
   * ```ts
   * StringUtil.trim('  abc  ') // => 'abc'
   * StringUtil.trim('-_-abc-_-', '_-') // => 'abc'
   * ```
   */
  static trim = trim;

  /**
   * 从字符串末尾删除空白字符
   * @param string - 要处理的字符串
   * @param chars - 要删除的字符
   * @returns 处理后的字符串
   * @example
   * ```ts
   * StringUtil.trimEnd('  abc  ') // => '  abc'
   * ```
   */
  static trimEnd = trimEnd;

  /**
   * 从字符串开头删除空白字符
   * @param string - 要处理的字符串
   * @param chars - 要删除的字符
   * @returns 处理后的字符串
   * @example
   * ```ts
   * StringUtil.trimStart('  abc  ') // => 'abc  '
   * ```
   */
  static trimStart = trimStart;

  /**
   * 截断字符串
   * @param string - 要截断的字符串
   * @param options - 选项对象
   * @returns 截断后的字符串
   * @example
   * ```ts
   * StringUtil.truncate('hi-diddly-ho there, neighborino')
   * // => 'hi-diddly-ho there, neighbo...'
   * ```
   */
  static truncate = truncate;

  /**
   * 反转义 HTML 实体字符
   * @param string - 要反转义的字符串
   * @returns 反转义后的字符串
   * @example
   * ```ts
   * StringUtil.unescape('fred, barney, &amp; pebbles')
   * // => 'fred, barney, & pebbles'
   * ```
   */
  static unescape = unescape;

  /**
   * 转换字符串为空格分隔的大写单词
   * @param string - 要转换的字符串
   * @returns 转换后的字符串
   * @example
   * ```ts
   * StringUtil.upperCase('--foo-bar--') // => 'FOO BAR'
   * ```
   */
  static upperCase = upperCase;

  /**
   * 转换字符串的第一个字符为大写
   * @param string - 要转换的字符串
   * @returns 转换后的字符串
   * @example
   * ```ts
   * StringUtil.upperFirst('fred') // => 'Fred'
   * StringUtil.upperFirst('FRED') // => 'FRED'
   * ```
   */
  static upperFirst = upperFirst;

  /**
   * 拆分字符串为单词数组
   * @param string - 要拆分的字符串
   * @param pattern - 匹配模式
   * @returns 单词数组
   * @example
   * ```ts
   * StringUtil.words('fred, barney, & pebbles')
   * // => ['fred', 'barney', 'pebbles']
   * ```
   */
  static words = words;
} 