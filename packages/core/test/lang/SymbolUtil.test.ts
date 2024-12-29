import { describe, it, expect } from 'vitest';
import { SymbolUtil } from '../../src/lang/SymbolUtil';

describe('SymbolUtil', () => {
  // 类型检查测试
  describe('type checking', () => {
    it('should check if value is symbol', () => {
      expect(SymbolUtil.isSymbol(Symbol('test'))).toBe(true);
      expect(SymbolUtil.isSymbol(Symbol())).toBe(true);
      expect(SymbolUtil.isSymbol(Symbol.for('test'))).toBe(true);
      
      expect(SymbolUtil.isSymbol('test')).toBe(false);
      expect(SymbolUtil.isSymbol(123)).toBe(false);
      expect(SymbolUtil.isSymbol(null)).toBe(false);
      expect(SymbolUtil.isSymbol(undefined)).toBe(false);
      expect(SymbolUtil.isSymbol({})).toBe(false);
      expect(SymbolUtil.isSymbol([])).toBe(false);
    });
  });

  // Symbol 创建测试
  describe('symbol creation', () => {
    it('should create symbol with description', () => {
      const sym = SymbolUtil.create('test');
      expect(SymbolUtil.isSymbol(sym)).toBe(true);
      expect(SymbolUtil.getDescription(sym)).toBe('test');
    });

    it('should create symbol without description', () => {
      const sym = SymbolUtil.create();
      expect(SymbolUtil.isSymbol(sym)).toBe(true);
      expect(SymbolUtil.getDescription(sym)).toBe(undefined);
    });

    it('should create global symbol', () => {
      const sym = SymbolUtil.createGlobal('test');
      expect(SymbolUtil.isSymbol(sym)).toBe(true);
      expect(SymbolUtil.isGlobal(sym)).toBe(true);
      expect(SymbolUtil.getGlobalKey(sym)).toBe('test');
      
      // 相同键的全局 Symbol 应该是同一个
      const sym2 = SymbolUtil.createGlobal('test');
      expect(sym).toBe(sym2);
    });
  });

  // Symbol 描述和转换测试
  describe('symbol description and conversion', () => {
    it('should get symbol description', () => {
      expect(SymbolUtil.getDescription(Symbol('test'))).toBe('test');
      expect(SymbolUtil.getDescription(Symbol())).toBe(undefined);
      expect(SymbolUtil.getDescription(Symbol.for('test'))).toBe('test');
    });

    it('should convert symbol to string', () => {
      expect(SymbolUtil.toString(Symbol('test'))).toBe('Symbol(test)');
      expect(SymbolUtil.toString(Symbol())).toBe('Symbol()');
      expect(SymbolUtil.toString(Symbol.for('test'))).toBe('Symbol(test)');
    });
  });

  // Symbol 属性测试
  describe('symbol properties', () => {
    it('should get symbol keys from object', () => {
      const sym1 = Symbol('test1');
      const sym2 = Symbol('test2');
      const obj = {
        [sym1]: 'value1',
        [sym2]: 'value2',
        normal: 'value3'
      };

      const keys = SymbolUtil.getSymbolKeys(obj);
      expect(keys).toHaveLength(2);
      expect(keys).toContain(sym1);
      expect(keys).toContain(sym2);
    });

    it('should check if object has symbol', () => {
      const sym = Symbol('test');
      const obj = { [sym]: 'value' };

      expect(SymbolUtil.hasSymbol(obj, sym)).toBe(true);
      expect(SymbolUtil.hasSymbol(obj, Symbol('test'))).toBe(false);
      expect(SymbolUtil.hasSymbol({}, sym)).toBe(false);
    });
  });

  // 全局 Symbol 测试
  describe('global symbols', () => {
    it('should check if symbol is global', () => {
      const globalSym = Symbol.for('test');
      const localSym = Symbol('test');

      expect(SymbolUtil.isGlobal(globalSym)).toBe(true);
      expect(SymbolUtil.isGlobal(localSym)).toBe(false);
    });

    it('should get global symbol key', () => {
      const globalSym = Symbol.for('test');
      const localSym = Symbol('test');

      expect(SymbolUtil.getGlobalKey(globalSym)).toBe('test');
      expect(SymbolUtil.getGlobalKey(localSym)).toBe(undefined);
    });

    it('should handle same global symbols', () => {
      const sym1 = SymbolUtil.createGlobal('test');
      const sym2 = SymbolUtil.createGlobal('test');
      const sym3 = SymbolUtil.create('test');

      expect(sym1).toBe(sym2);
      expect(sym1).not.toBe(sym3);
      expect(SymbolUtil.getDescription(sym1)).toBe(SymbolUtil.getDescription(sym3));
    });
  });

  // 边界情况测试
  describe('edge cases', () => {
    it('should handle empty object for symbol keys', () => {
      expect(SymbolUtil.getSymbolKeys({})).toHaveLength(0);
    });

    it('should handle non-symbol properties', () => {
      const obj = { normal: 'value' };
      expect(SymbolUtil.getSymbolKeys(obj)).toHaveLength(0);
    });
  });
});