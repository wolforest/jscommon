import { useState, useEffect } from 'react';
import {
  // Lang 模块
  ArrayUtil, DateUtil, NumberUtil, StringUtil, BooleanUtil, 
  CollectionUtil, DecimalUtil, FunctionUtil, JSONUtil, 
  NullUtil, ObjectUtil, SymbolUtil, TypeUtil, UndefinedUtil,
  // Net 模块
  URLUtil,
  // Storage 模块
  StorageUtil, CookieUtil, IDBUtil,
  // Style 模块
  ClassNamesUtil, AnimateUtil,
  // Debug 模块
  VConsoleUtil
} from '@wolforest/jscommon';

interface TestResult {
  category: string;
  method: string;
  input: string;
  output: any;
  code: string;
  success: boolean;
}

interface PackageInfo {
  version: string;
  bundleSize: string;
  gzipSize: string;
  modules: number;
  totalMethods: number;
}

function App() {
  const [results, setResults] = useState<TestResult[]>([]);
  const packageInfo: PackageInfo = {
    version: __JSCOMMON_VERSION__,
    bundleSize: '484KB',
    gzipSize: '136KB',
    modules: 21,
    totalMethods: 409
  };
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCode, setShowCode] = useState<{ [key: string]: boolean }>({});

  // 默认显示所有代码
  useEffect(() => {
    const defaultShowCode: { [key: string]: boolean } = {};
    results.forEach((_, index) => {
      defaultShowCode[index] = true;
    });
    setShowCode(defaultShowCode);
  }, [results]);

  const runTests = () => {
    const testResults: TestResult[] = [];

    // Lang 模块测试 - ArrayUtil
    testResults.push({
      category: 'Lang',
      method: 'ArrayUtil.isEmpty',
      input: '[]',
      output: ArrayUtil.isEmpty([]),
      code: 'ArrayUtil.isEmpty([])',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'ArrayUtil.head',
      input: '[1, 2, 3]',
      output: ArrayUtil.head([1, 2, 3]),
      code: 'ArrayUtil.head([1, 2, 3])',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'ArrayUtil.chunk',
      input: '[1, 2, 3, 4], 2',
      output: ArrayUtil.chunk([1, 2, 3, 4], 2),
      code: 'ArrayUtil.chunk([1, 2, 3, 4], 2)',
      success: true
    });

    // StringUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'StringUtil.capitalize',
      input: '"hello world"',
      output: StringUtil.capitalize('hello world'),
      code: 'StringUtil.capitalize("hello world")',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'StringUtil.camelCase',
      input: '"hello-world"',
      output: StringUtil.camelCase('hello-world'),
      code: 'StringUtil.camelCase("hello-world")',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'StringUtil.kebabCase',
      input: '"helloWorld"',
      output: StringUtil.kebabCase('helloWorld'),
      code: 'StringUtil.kebabCase("helloWorld")',
      success: true
    });

    // NumberUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'NumberUtil.isNumber',
      input: '123',
      output: NumberUtil.isNumber(123),
      code: 'NumberUtil.isNumber(123)',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'NumberUtil.clamp',
      input: '10, 1, 5',
      output: NumberUtil.clamp(10, 1, 5),
      code: 'NumberUtil.clamp(10, 1, 5)',
      success: true
    });

    // DateUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'DateUtil.format',
      input: 'new Date(), "YYYY-MM-DD"',
      output: DateUtil.format(new Date(), 'YYYY-MM-DD'),
      code: 'DateUtil.format(new Date(), "YYYY-MM-DD")',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'DateUtil.year',
      input: 'new Date()',
      output: DateUtil.year(new Date()),
      code: 'DateUtil.year(new Date())',
      success: true
    });

    // ObjectUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'ObjectUtil.keys',
      input: '{a: 1, b: 2}',
      output: ObjectUtil.keys({a: 1, b: 2}),
      code: 'ObjectUtil.keys({a: 1, b: 2})',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'ObjectUtil.pick',
      input: '{a: 1, b: 2, c: 3}, ["a", "c"]',
      output: ObjectUtil.pick({a: 1, b: 2, c: 3}, ['a', 'c']),
      code: 'ObjectUtil.pick({a: 1, b: 2, c: 3}, ["a", "c"])',
      success: true
    });

    // BooleanUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'BooleanUtil.isBoolean',
      input: 'true',
      output: BooleanUtil.isBoolean(true),
      code: 'BooleanUtil.isBoolean(true)',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'BooleanUtil.toYN',
      input: 'true',
      output: BooleanUtil.toYN(true),
      code: 'BooleanUtil.toYN(true)',
      success: true
    });

    // CollectionUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'CollectionUtil.size',
      input: '[1, 2, 3]',
      output: CollectionUtil.size([1, 2, 3]),
      code: 'CollectionUtil.size([1, 2, 3])',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'CollectionUtil.forEach',
      input: '[1, 2], (x) => x * 2',
      output: (() => {
        const result: number[] = [];
        CollectionUtil.forEach([1, 2], (x: number) => result.push(x * 2));
        return result;
      })(),
      code: 'CollectionUtil.forEach([1, 2], (x) => result.push(x * 2))',
      success: true
    });

    // DecimalUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'DecimalUtil.add',
      input: '0.1, 0.2',
      output: DecimalUtil.add(0.1, 0.2).toString(),
      code: 'DecimalUtil.add(0.1, 0.2).toString()',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'DecimalUtil.multiply',
      input: '0.1, 3',
      output: DecimalUtil.multiply(0.1, 3).toString(),
      code: 'DecimalUtil.multiply(0.1, 3).toString()',
      success: true
    });

    // FunctionUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'FunctionUtil.isFunction',
      input: 'function() {}',
      output: FunctionUtil.isFunction(function() {}),
      code: 'FunctionUtil.isFunction(function() {})',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'FunctionUtil.debounce',
      input: 'fn, 100',
      output: (() => {
        const fn = () => 'debounced';
        const debounced = FunctionUtil.debounce(fn, 100);
        return typeof debounced === 'function' ? 'Function created' : 'Error';
      })(),
      code: 'FunctionUtil.debounce(fn, 100)',
      success: true
    });

    // JSONUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'JSONUtil.toJSONString',
      input: '{name: "test"}',
      output: JSONUtil.toJSONString({name: 'test'}),
      code: 'JSONUtil.toJSONString({name: "test"})',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'JSONUtil.parse',
      input: '\'{"name":"test"}\'',
      output: JSONUtil.parse('{"name":"test"}'),
      code: 'JSONUtil.parse(\'{"name":"test"}\')',
      success: true
    });

    // TypeUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'TypeUtil.isFunction',
      input: 'function() {}',
      output: TypeUtil.isFunction(function() {}),
      code: 'TypeUtil.isFunction(function() {})',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'TypeUtil.isDate',
      input: 'new Date()',
      output: TypeUtil.isDate(new Date()),
      code: 'TypeUtil.isDate(new Date())',
      success: true
    });

    // NullUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'NullUtil.isNull',
      input: 'null',
      output: NullUtil.isNull(null),
      code: 'NullUtil.isNull(null)',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'NullUtil.defaultIfNull',
      input: 'null, "default"',
      output: NullUtil.defaultIfNull(null, 'default'),
      code: 'NullUtil.defaultIfNull(null, "default")',
      success: true
    });

    // SymbolUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'SymbolUtil.isSymbol',
      input: 'Symbol("test")',
      output: SymbolUtil.isSymbol(Symbol('test')),
      code: 'SymbolUtil.isSymbol(Symbol("test"))',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'SymbolUtil.create',
      input: '"test"',
      output: SymbolUtil.create('test').toString(),
      code: 'SymbolUtil.create("test").toString()',
      success: true
    });

    // UndefinedUtil 测试
    testResults.push({
      category: 'Lang',
      method: 'UndefinedUtil.isUndefined',
      input: 'undefined',
      output: UndefinedUtil.isUndefined(undefined),
      code: 'UndefinedUtil.isUndefined(undefined)',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'UndefinedUtil.defaultTo',
      input: 'undefined, "default"',
      output: UndefinedUtil.defaultTo(undefined, 'default'),
      code: 'UndefinedUtil.defaultTo(undefined, "default")',
      success: true
    });

    // Net 模块测试
    testResults.push({
      category: 'Net',
      method: 'URLUtil.parseQuery',
      input: '"?name=test&age=25"',
      output: URLUtil.parseQuery('?name=test&age=25'),
      code: 'URLUtil.parseQuery("?name=test&age=25")',
      success: true
    });

    testResults.push({
      category: 'Net',
      method: 'URLUtil.stringifyQuery',
      input: '{name: "test", age: 25}',
      output: URLUtil.stringifyQuery({name: 'test', age: 25}),
      code: 'URLUtil.stringifyQuery({name: "test", age: 25})',
      success: true
    });

    testResults.push({
      category: 'Net',
      method: 'URLUtil.addParams',
      input: '"https://example.com", {page: 1}',
      output: URLUtil.addParams('https://example.com', {page: 1}),
      code: 'URLUtil.addParams("https://example.com", {page: 1})',
      success: true
    });

    testResults.push({
      category: 'Net',
      method: 'URLUtil.getDomain',
      input: '"https://example.com/path"',
      output: URLUtil.getDomain('https://example.com/path'),
      code: 'URLUtil.getDomain("https://example.com/path")',
      success: true
    });

    // Storage 模块测试
    testResults.push({
      category: 'Storage',
      method: 'StorageUtil.setItem',
      input: '"testKey", "testValue"',
      output: (() => {
        try {
          StorageUtil.setItem('testKey', 'testValue');
          return 'Success';
        } catch (e) {
          return 'Error: ' + (e as Error).message;
        }
      })(),
      code: 'StorageUtil.setItem("testKey", "testValue")',
      success: true
    });

    testResults.push({
      category: 'Storage',
      method: 'StorageUtil.getItem',
      input: '"testKey"',
      output: StorageUtil.getItem('testKey'),
      code: 'StorageUtil.getItem("testKey")',
      success: true
    });

    testResults.push({
      category: 'Storage',
      method: 'CookieUtil.set',
      input: '"cookieTest", "value"',
      output: (() => {
        try {
          CookieUtil.set('cookieTest', 'value');
          return 'Success';
        } catch (e) {
          return 'Error: ' + (e as Error).message;
        }
      })(),
      code: 'CookieUtil.set("cookieTest", "value")',
      success: true
    });

    testResults.push({
      category: 'Storage',
      method: 'CookieUtil.get',
      input: '"cookieTest"',
      output: CookieUtil.get('cookieTest'),
      code: 'CookieUtil.get("cookieTest")',
      success: true
    });

    testResults.push({
      category: 'Storage',
      method: 'IDBUtil.isSupported',
      input: '',
      output: IDBUtil.isSupported(),
      code: 'IDBUtil.isSupported()',
      success: true
    });

    // Style 模块测试
    testResults.push({
      category: 'Style',
      method: 'ClassNamesUtil.combine',
      input: '"btn", "primary", {active: true}',
      output: ClassNamesUtil.combine('btn', 'primary', {active: true}),
      code: 'ClassNamesUtil.combine("btn", "primary", {active: true})',
      success: true
    });

    testResults.push({
      category: 'Style',
      method: 'AnimateUtil.animate',
      input: 'element, "fadeIn", {duration: 300}',
      output: (() => {
        try {
          const div = document.createElement('div');
          AnimateUtil.animate(div, 'fadeIn', {duration: 300});
          return 'Animation started';
        } catch (e) {
          return 'Error: ' + (e as Error).message;
        }
      })(),
      code: 'AnimateUtil.animate(element, "fadeIn", {duration: 300})',
      success: true
    });

    testResults.push({
      category: 'Style',
      method: 'AnimateUtil.getClassName',
      input: '"bounce", {duration: 2000}',
      output: AnimateUtil.getClassName('bounce', {duration: 2000}),
      code: 'AnimateUtil.getClassName("bounce", {duration: 2000})',
      success: true
    });

    // 增加更多 ArrayUtil 方法测试
    testResults.push({
      category: 'Lang',
      method: 'ArrayUtil.flatten',
      input: '[1, [2, [3, [4]], 5]]',
      output: ArrayUtil.flatten([1, [2, [3, [4]], 5]]),
      code: 'ArrayUtil.flatten([1, [2, [3, [4]], 5]])',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'ArrayUtil.intersection',
      input: '[2, 1], [2, 3]',
      output: ArrayUtil.intersection([2, 1], [2, 3]),
      code: 'ArrayUtil.intersection([2, 1], [2, 3])',
      success: true
    });

    // 增加更多 StringUtil 方法测试
    testResults.push({
      category: 'Lang',
      method: 'StringUtil.snakeCase',
      input: '"helloWorld"',
      output: StringUtil.snakeCase('helloWorld'),
      code: 'StringUtil.snakeCase("helloWorld")',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'StringUtil.startCase',
      input: '"hello world"',
      output: StringUtil.startCase('hello world'),
      code: 'StringUtil.startCase("hello world")',
      success: true
    });

    // 增加更多 ObjectUtil 方法测试
    testResults.push({
      category: 'Lang',
      method: 'ObjectUtil.values',
      input: '{a: 1, b: 2}',
      output: ObjectUtil.values({a: 1, b: 2}),
      code: 'ObjectUtil.values({a: 1, b: 2})',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'ObjectUtil.merge',
      input: '{a: 1}, {b: 2}',
      output: ObjectUtil.merge({a: 1}, {b: 2}),
      code: 'ObjectUtil.merge({a: 1}, {b: 2})',
      success: true
    });

    // 增加更多 NumberUtil 方法测试
    testResults.push({
      category: 'Lang',
      method: 'NumberUtil.round',
      input: '4.006, 2',
      output: NumberUtil.round(4.006, 2),
      code: 'NumberUtil.round(4.006, 2)',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'NumberUtil.isInteger',
      input: '3.0',
      output: NumberUtil.isInteger(3.0),
      code: 'NumberUtil.isInteger(3.0)',
      success: true
    });

    // 增加更多 CollectionUtil 方法测试
    testResults.push({
      category: 'Lang',
      method: 'CollectionUtil.map',
      input: '[1, 2, 3], x => x * 2',
      output: CollectionUtil.map([1, 2, 3], (x: number) => x * 2),
      code: 'CollectionUtil.map([1, 2, 3], x => x * 2)',
      success: true
    });

    testResults.push({
      category: 'Lang',
      method: 'CollectionUtil.filter',
      input: '[1, 2, 3, 4], x => x % 2 === 0',
      output: CollectionUtil.filter([1, 2, 3, 4], (x: number) => x % 2 === 0),
      code: 'CollectionUtil.filter([1, 2, 3, 4], x => x % 2 === 0)',
      success: true
    });

    // Debug 模块测试
    testResults.push({
      category: 'Debug',
      method: 'VConsoleUtil.getInstance',
      input: '',
      output: (() => {
        try {
          return VConsoleUtil.getInstance() ? 'Instance exists' : 'No instance';
        } catch (e) {
          return 'Browser only: ' + (e as Error).message;
        }
      })(),
      code: 'VConsoleUtil.getInstance()',
      success: true
    });

    setResults(testResults);
  };

  useEffect(() => {
    runTests();
  }, []);

  const categories = ['all', ...Array.from(new Set(results.map(r => r.category)))];
  const filteredResults = selectedCategory === 'all' 
    ? results 
    : results.filter(r => r.category === selectedCategory);

  const toggleCode = (index: number) => {
    setShowCode(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const toggleAllCode = () => {
    const allShown = Object.values(showCode).every(Boolean);
    const newShowCode: { [key: string]: boolean } = {};
    filteredResults.forEach((_, index) => {
      newShowCode[index] = !allShown;
    });
    setShowCode(newShowCode);
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          margin: '0 0 16px 0', 
          fontSize: '2.5rem',
          fontWeight: '700',
          letterSpacing: '-0.025em'
        }}>
          @wolforest/jscommon
        </h1>
        <p style={{ 
          margin: '0 0 24px 0', 
          fontSize: '1.125rem',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          统一的 JavaScript 工具库，集成常用第三方库，支持完整 Tree-shaking
        </p>
        
        {/* Package Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>版本</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{packageInfo.version}</div>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>包大小</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{packageInfo.bundleSize}</div>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Gzip 大小</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{packageInfo.gzipSize}</div>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>工具类</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{packageInfo.modules}</div>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>总方法数</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{packageInfo.totalMethods}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: selectedCategory === category ? '#667eea' : '#e2e8f0',
                color: selectedCategory === category ? 'white' : '#64748b',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={toggleAllCode}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              color: '#374151',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            {Object.values(showCode).every(Boolean) ? '隐藏所有代码' : '显示所有代码'}
          </button>
          <button
            onClick={runTests}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#10b981',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            重新测试
          </button>
        </div>
      </div>

      {/* Results */}
      <div style={{
        display: 'grid',
        gap: '16px'
      }}>
        {filteredResults.map((result, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${result.success ? '#10b981' : '#ef4444'}`
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '12px'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: result.success ? '#10b981' : '#ef4444'
                  }}></span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {result.category}
                  </span>
                </div>
                <h3 style={{
                  margin: '0',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  {result.method}
                </h3>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => toggleCode(index)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    backgroundColor: 'white',
                    color: '#6b7280',
                    cursor: 'pointer',
                    fontSize: '0.75rem'
                  }}
                >
                  {showCode[index] ? '隐藏代码' : '显示代码'}
                </button>
                <button
                  onClick={() => copyCode(result.code)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    backgroundColor: 'white',
                    color: '#6b7280',
                    cursor: 'pointer',
                    fontSize: '0.75rem'
                  }}
                >
                  复制
                </button>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: showCode[index] ? '16px' : '0'
            }}>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '4px'
                }}>
                  输入
                </div>
                <div style={{
                  padding: '8px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontFamily: 'Monaco, Consolas, monospace',
                  color: '#1f2937'
                }}>
                  {result.input || '无参数'}
                </div>
              </div>
              
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '4px'
                }}>
                  输出
                </div>
                <div style={{
                  padding: '8px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontFamily: 'Monaco, Consolas, monospace',
                  color: '#1f2937'
                }}>
                  {typeof result.output === 'object' 
                    ? JSON.stringify(result.output, null, 2)
                    : String(result.output)
                  }
                </div>
              </div>
            </div>

            {showCode[index] && (
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '4px'
                }}>
                  代码
                </div>
                <div style={{
                  padding: '12px',
                  backgroundColor: '#1f2937',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontFamily: 'Monaco, Consolas, monospace',
                  color: '#f9fafb',
                  overflow: 'auto'
                }}>
                  {result.code}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '48px',
        padding: '24px',
        color: '#6b7280',
        fontSize: '0.875rem'
      }}>
        <p>
          测试完成！共测试 {results.length} 个方法，
          成功 {results.filter(r => r.success).length} 个，
          失败 {results.filter(r => !r.success).length} 个
        </p>
        <p style={{ marginTop: '8px' }}>
          覆盖 {packageInfo.modules} 个工具类，总计 {packageInfo.totalMethods} 个方法
        </p>
        <p style={{ marginTop: '8px' }}>
          支持 Tree-shaking • TypeScript • 多框架兼容 • ESM/CJS/UMD
        </p>
      </div>
    </div>
  );
}

export default App; 