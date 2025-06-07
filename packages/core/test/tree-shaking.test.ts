import { describe, it, expect } from 'vitest';

describe('Tree-shaking 支持测试', () => {
  it('应该支持按需导入单个工具类', async () => {
    // 测试主入口按需导入
    const { StringUtil } = await import('../src/index');
    expect(typeof StringUtil).toBe('function');
    expect(typeof StringUtil.capitalize).toBe('function');
    expect(StringUtil.capitalize('hello')).toBe('Hello');
  });

  it('应该支持子模块导入', async () => {
    // 测试子模块导入 - 更精细的 Tree-shaking
    const { StringUtil } = await import('../src/lang/index');
    const { URLUtil } = await import('../src/net/index');
    const { StorageUtil } = await import('../src/storage/index');
    
    expect(StringUtil.capitalize('test')).toBe('Test');
    expect(URLUtil.parseQuery('?name=test')).toEqual({ name: 'test' });
    expect(typeof StorageUtil.setItem).toBe('function');
  });

  it('应该支持类型定义', async () => {
    // TypeScript 编译时会验证类型
    // 这里主要测试运行时的类型检查
    const { StringUtil, ArrayUtil } = await import('../src/index');
    const result: string = StringUtil.capitalize('hello');
    const isEmpty: boolean = ArrayUtil.isEmpty([]);
    
    expect(typeof result).toBe('string');
    expect(typeof isEmpty).toBe('boolean');
  });

  it('验证包导出的完整性', async () => {
    const exports = await import('../src/index');
    
    // Lang 模块工具类
    const langUtils = [
      'ArrayUtil', 'DateUtil', 'NumberUtil', 'StringUtil', 'BooleanUtil',
      'CollectionUtil', 'DecimalUtil', 'FunctionUtil', 'JSONUtil',
      'NullUtil', 'ObjectUtil', 'SymbolUtil', 'TypeUtil', 'UndefinedUtil'
    ];
    
    // Net 模块工具类
    const netUtils = ['URLUtil'];
    
    // Storage 模块工具类
    const storageUtils = ['StorageUtil', 'CookieUtil', 'IDBUtil'];
    
    // Style 模块工具类
    const styleUtils = ['ClassNamesUtil', 'AnimateUtil'];
    
    // Debug 模块工具类
    const debugUtils = ['VConsoleUtil'];
    
    const allUtils = [...langUtils, ...netUtils, ...storageUtils, ...styleUtils, ...debugUtils];
    
    // 验证所有工具类都被正确导出
    allUtils.forEach(utilName => {
      expect(exports[utilName]).toBeDefined();
      expect(typeof exports[utilName]).toBe('function');
    });
    
    console.log(`✅ 验证通过：共导出 ${allUtils.length} 个工具类`);
  });

  it('验证 Tree-shaking 友好的导出结构', async () => {
    // 测试各个模块的独立导出
    const langExports = await import('../src/lang/index');
    const netExports = await import('../src/net/index');
    const storageExports = await import('../src/storage/index');
    const styleExports = await import('../src/style/index');
    const debugExports = await import('../src/debug/index');
    
    // 验证每个模块都有正确的导出
    expect(Object.keys(langExports).length).toBeGreaterThan(0);
    expect(Object.keys(netExports).length).toBeGreaterThan(0);
    expect(Object.keys(storageExports).length).toBeGreaterThan(0);
    expect(Object.keys(styleExports).length).toBeGreaterThan(0);
    expect(Object.keys(debugExports).length).toBeGreaterThan(0);
    
    // 验证可以单独导入特定工具类
    expect(langExports.StringUtil).toBeDefined();
    expect(netExports.URLUtil).toBeDefined();
    expect(storageExports.StorageUtil).toBeDefined();
    expect(styleExports.ClassNamesUtil).toBeDefined();
    expect(debugExports.VConsoleUtil).toBeDefined();
    
    console.log('✅ Tree-shaking 友好的模块结构验证通过');
  });
}); 