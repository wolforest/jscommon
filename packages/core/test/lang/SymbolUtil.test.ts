import { describe, it, expect } from 'vitest';
import { SymbolUtil } from '../../src/lang/SymbolUtil';

describe('SymbolUtil', () => {
  describe('isSymbol', () => {
    it('should identify Symbols', () => {
      expect(SymbolUtil.isSymbol(Symbol())).toBe(true);
      expect(SymbolUtil.isSymbol(Symbol.iterator)).toBe(true);
      expect(SymbolUtil.isSymbol(Symbol('test'))).toBe(true);
      expect(SymbolUtil.isSymbol(Symbol.for('test'))).toBe(true);
    });

    it('should return false for non-Symbol values', () => {
      expect(SymbolUtil.isSymbol('Symbol()')).toBe(false);
      expect(SymbolUtil.isSymbol(123)).toBe(false);
      expect(SymbolUtil.isSymbol(null)).toBe(false);
      expect(SymbolUtil.isSymbol(undefined)).toBe(false);
      expect(SymbolUtil.isSymbol({})).toBe(false);
      expect(SymbolUtil.isSymbol(() => {})).toBe(false);
    });
  });
});