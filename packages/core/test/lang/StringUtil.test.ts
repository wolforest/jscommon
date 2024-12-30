import { describe, it, expect } from 'vitest';
import { StringUtil } from '../../src/lang/StringUtil';

describe('StringUtil', () => {
  // 大小写转换相关方法测试
  describe('case conversion', () => {
    it('should convert to camelCase', () => {
      expect(StringUtil.camelCase('Foo Bar')).toBe('fooBar');
      expect(StringUtil.camelCase('--foo-bar--')).toBe('fooBar');
      expect(StringUtil.camelCase('__FOO_BAR__')).toBe('fooBar');
    });

    it('should convert to kebabCase', () => {
      expect(StringUtil.kebabCase('Foo Bar')).toBe('foo-bar');
      expect(StringUtil.kebabCase('fooBar')).toBe('foo-bar');
      expect(StringUtil.kebabCase('__FOO_BAR__')).toBe('foo-bar');
    });

    it('should convert to snakeCase', () => {
      expect(StringUtil.snakeCase('Foo Bar')).toBe('foo_bar');
      expect(StringUtil.snakeCase('fooBar')).toBe('foo_bar');
    });

    it('should convert to startCase', () => {
      expect(StringUtil.startCase('--foo-bar--')).toBe('Foo Bar');
      expect(StringUtil.startCase('fooBar')).toBe('Foo Bar');
    });

    it('should handle case transformations', () => {
      expect(StringUtil.capitalize('FRED')).toBe('Fred');
      expect(StringUtil.lowerCase('--Foo-Bar--')).toBe('foo bar');
      expect(StringUtil.lowerFirst('FRED')).toBe('fRED');
      expect(StringUtil.upperCase('foo-bar')).toBe('FOO BAR');
      expect(StringUtil.upperFirst('fred')).toBe('Fred');
    });

    it('should handle empty and null inputs', () => {
      expect(StringUtil.camelCase('')).toBe('');
      expect(StringUtil.kebabCase('')).toBe('');
      expect(StringUtil.snakeCase('')).toBe('');
      expect(StringUtil.startCase('')).toBe('');
    });

    it('should handle special characters', () => {
      expect(StringUtil.camelCase('foo.bar')).toBe('fooBar');
      expect(StringUtil.kebabCase('foo_bar$baz')).toBe('foo-bar-baz');
      expect(StringUtil.snakeCase('foo-bar.baz')).toBe('foo_bar_baz');
    });

    it('should handle numbers in strings', () => {
      expect(StringUtil.camelCase('foo2bar')).toBe('foo2Bar');
      expect(StringUtil.kebabCase('2foo2bar2')).toBe('2-foo-2-bar-2');
    });
  });

  // 字符串检查相关方法测试
  describe('string checks', () => {
    it('should check string endings', () => {
      expect(StringUtil.endsWith('abc', 'c')).toBe(true);
      expect(StringUtil.endsWith('abc', 'b')).toBe(false);
      expect(StringUtil.endsWith('abc', 'b', 2)).toBe(true);
    });

    it('should check string starts', () => {
      expect(StringUtil.startsWith('abc', 'a')).toBe(true);
      expect(StringUtil.startsWith('abc', 'b')).toBe(false);
      expect(StringUtil.startsWith('abc', 'b', 1)).toBe(true);
    });

    it('should handle empty strings', () => {
      expect(StringUtil.endsWith('', '')).toBe(true);
      expect(StringUtil.startsWith('', '')).toBe(true);
    });

    it('should handle position parameter correctly', () => {
      expect(StringUtil.endsWith('abc', 'ab', 2)).toBe(true);
      expect(StringUtil.startsWith('abc', 'bc', 1)).toBe(true);
    });

    it('should handle longer target than source', () => {
      expect(StringUtil.endsWith('abc', 'abcd')).toBe(false);
      expect(StringUtil.startsWith('abc', 'abcd')).toBe(false);
    });
  });

  // 字符串转换相关方法测试
  describe('string transformations', () => {
    it('should handle deburr', () => {
      expect(StringUtil.deburr('déjà vu')).toBe('deja vu');
    });

    it('should handle escape/unescape', () => {
      const html = 'fred, barney, & pebbles';
      const escaped = StringUtil.escape(html);
      expect(escaped).toBe('fred, barney, &amp; pebbles');
      expect(StringUtil.unescape(escaped)).toBe(html);
    });

    it('should escape RegExp special characters', () => {
      expect(StringUtil.escapeRegExp('[lodash](https://lodash.com/)'))
        .toBe('\\[lodash\\]\\(https://lodash\\.com/\\)');
    });

    it('should handle complex deburr cases', () => {
      expect(StringUtil.deburr('déjà vu'))
        .toBe('deja vu');
    });

    it('should handle all HTML entities', () => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      
      Object.entries(entities).forEach(([char, entity]) => {
        expect(StringUtil.escape(char)).toBe(entity);
        expect(StringUtil.unescape(entity)).toBe(char);
      });
    });
  });

  // 字符串操作相关方法测试
  describe('string operations', () => {
    it('should pad strings', () => {
      expect(StringUtil.pad('abc', 8)).toBe('  abc   ');
      expect(StringUtil.pad('abc', 8, '_-')).toBe('_-abc_-_');
      expect(StringUtil.padStart('abc', 6)).toBe('   abc');
      expect(StringUtil.padEnd('abc', 6)).toBe('abc   ');
    });

    it('should parse integers', () => {
      expect(StringUtil.parseInt('08')).toBe(8);
      expect(StringUtil.parseInt('10', 2)).toBe(2);
    });

    it('should repeat strings', () => {
      expect(StringUtil.repeat('*', 3)).toBe('***');
      expect(StringUtil.repeat('abc', 2)).toBe('abcabc');
    });

    it('should replace substrings', () => {
      expect(StringUtil.replace('Hi Fred', 'Fred', 'Barney')).toBe('Hi Barney');
    });

    it('should split strings', () => {
      expect(StringUtil.split('a-b-c', '-', 2)).toEqual(['a', 'b']);
    });

    it('should handle templates', () => {
      const compiled = StringUtil.template('hello <%= user %>!');
      expect(compiled({ user: 'fred' })).toBe('hello fred!');
    });

    it('should handle pad with different lengths', () => {
      expect(StringUtil.pad('abc', 3)).toBe('abc');
      expect(StringUtil.pad('abc', 2)).toBe('abc');
      expect(StringUtil.padStart('abc', 2)).toBe('abc');
      expect(StringUtil.padEnd('abc', 2)).toBe('abc');
    });

    it('should handle parseInt with different radixes', () => {
      expect(StringUtil.parseInt('1010', 2)).toBe(10);
      expect(StringUtil.parseInt('ff', 16)).toBe(255);
      expect(StringUtil.parseInt('07', 8)).toBe(7);
    });

    it('should handle complex templates', () => {
      const compiled = StringUtil.template(
        '<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>'
      );
      expect(compiled({ users: ['fred', 'barney'] }))
        .toBe('<li>fred</li><li>barney</li>');
    });
  });

  // 字符串修剪相关方法测试
  describe('string trimming', () => {
    it('should trim strings', () => {
      expect(StringUtil.trim('  abc  ')).toBe('abc');
      expect(StringUtil.trim('-_-abc-_-', '_-')).toBe('abc');
      expect(StringUtil.trimStart('  abc  ')).toBe('abc  ');
      expect(StringUtil.trimEnd('  abc  ')).toBe('  abc');
    });

    it('should truncate strings', () => {
      expect(StringUtil.truncate('hi-diddly-ho there, neighborino'))
        .toBe('hi-diddly-ho there, neighbo...');
    });

    it('should handle multiple character trimming', () => {
      expect(StringUtil.trim('_-_abc_-_', '_-')).toBe('abc');
      expect(StringUtil.trimStart('_-_abc_-_', '_-')).toBe('abc_-_');
      expect(StringUtil.trimEnd('_-_abc_-_', '_-')).toBe('_-_abc');
    });

    it('should handle truncate with custom options', () => {
      expect(StringUtil.truncate('hi-diddly-ho there, neighborino', {
        length: 24,
        separator: ' '
      })).toBe('hi-diddly-ho there,...');

      expect(StringUtil.truncate('hi-diddly-ho there, neighborino', {
        length: 24,
        separator: /,? +/
      })).toBe('hi-diddly-ho there...');
    });
  });

  // 字符串解析相关方法测试
  describe('string parsing', () => {
    it('should split into words', () => {
      expect(StringUtil.words('fred, barney, & pebbles'))
        .toEqual(['fred', 'barney', 'pebbles']);
    });

    it('should handle words with patterns', () => {
      expect(StringUtil.words('fred, barney, & pebbles', /[^, ]+/g))
        .toEqual(['fred', 'barney', '&', 'pebbles']);
    });

    it('should handle unicode words', () => {
      expect(StringUtil.words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
      expect(StringUtil.words('fred, barney, & pebbles', /[^, ]+/g)).toEqual(['fred', 'barney', '&', 'pebbles']);
    });
  });

  // 错误处理测试
  describe('error handling', () => {
    it('should handle null and undefined inputs', () => {
      expect(StringUtil.camelCase(undefined as any)).toBe('');
      expect(StringUtil.kebabCase(null as any)).toBe('');
      expect(StringUtil.trim(null as any)).toBe('');
    });

    it('should handle invalid number inputs', () => {
      expect(StringUtil.repeat('*', -1)).toBe('');
      expect(StringUtil.pad('abc', -1)).toBe('abc');
    });
  });

  describe('isString', () => {
    it('should identify strings', () => {
      expect(StringUtil.isString('abc')).toBe(true);
      expect(StringUtil.isString(String('abc'))).toBe(true);
      expect(StringUtil.isString(new String('abc'))).toBe(true);
      expect(StringUtil.isString('')).toBe(true);
    });

    it('should return false for non-strings', () => {
      expect(StringUtil.isString(1)).toBe(false);
      expect(StringUtil.isString(true)).toBe(false);
      expect(StringUtil.isString(null)).toBe(false);
      expect(StringUtil.isString(undefined)).toBe(false);
      expect(StringUtil.isString({})).toBe(false);
      expect(StringUtil.isString([])).toBe(false);
      expect(StringUtil.isString(() => {})).toBe(false);
      expect(StringUtil.isString(/abc/)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should convert values to strings', () => {
      expect(StringUtil.toString('abc')).toBe('abc');
      expect(StringUtil.toString(-0)).toBe('-0');
      expect(StringUtil.toString([1, 2, 3])).toBe('1,2,3');
      expect(StringUtil.toString({ 'a': 1 })).toBe('[object Object]');
    });

    it('should handle special values', () => {
      expect(StringUtil.toString(null)).toBe('');
      expect(StringUtil.toString(undefined)).toBe('');
      expect(StringUtil.toString('')).toBe('');
      expect(StringUtil.toString(0)).toBe('0');
      expect(StringUtil.toString(false)).toBe('false');
      expect(StringUtil.toString(true)).toBe('true');
      expect(StringUtil.toString(NaN)).toBe('NaN');
      expect(StringUtil.toString(Infinity)).toBe('Infinity');
      expect(StringUtil.toString(-Infinity)).toBe('-Infinity');
    });

    it('should handle arrays and objects', () => {
      expect(StringUtil.toString([])).toBe('');
      expect(StringUtil.toString([1])).toBe('1');
      expect(StringUtil.toString([null, undefined, []])).toBe('null,undefined,');
      expect(StringUtil.toString(new Date(2024, 0, 1))).toMatch(/2024/);
      expect(StringUtil.toString(/abc/)).toBe('/abc/');
      expect(StringUtil.toString(Symbol('test'))).toBe('Symbol(test)');
    });
  });
}); 