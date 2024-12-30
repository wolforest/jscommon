import { describe, it, expect } from 'vitest';
import { DecimalUtil } from '../../src/lang/DecimalUtil';

describe('DecimalUtil', () => {
  describe('basic operations', () => {
    it('should create Big instance', () => {
      const big = DecimalUtil.of('123.45');
      expect(big.toString()).toBe('123.45');
    });

    it('should handle invalid input', () => {
      expect(() => DecimalUtil.of('abc')).toThrow();
    });
  });

  describe('arithmetic operations', () => {
    it('should add numbers', () => {
      expect(DecimalUtil.add('0.1', '0.2')).toBe('0.3');
      expect(DecimalUtil.add('0.1', '0.2', '0.3')).toBe('0.6');
      expect(DecimalUtil.add('-1.5', '2.5')).toBe('1');
    });

    it('should subtract numbers', () => {
      expect(DecimalUtil.subtract('0.3', '0.1')).toBe('0.2');
      expect(DecimalUtil.subtract('2.5', '-1.5')).toBe('4');
    });

    it('should multiply numbers', () => {
      expect(DecimalUtil.multiply('0.1', '0.2')).toBe('0.02');
      expect(DecimalUtil.multiply('0.1', '0.2', '0.3')).toBe('0.006');
      expect(DecimalUtil.multiply('-2', '3')).toBe('-6');
    });

    it('should divide numbers', () => {
      expect(DecimalUtil.divide('0.3', '0.1')).toBe('3.0000000000');
      expect(DecimalUtil.divide('1', '3', 2)).toBe('0.33');
      expect(() => DecimalUtil.divide('1', '0')).toThrow('Division by zero');
    });
  });

  describe('rounding operations', () => {
    it('should round numbers', () => {
      expect(DecimalUtil.round('3.45')).toBe('3');
      expect(DecimalUtil.round('3.45', 1)).toBe('3.5');
      expect(DecimalUtil.round('-3.45', 1)).toBe('-3.5');
    });

    it('should ceil numbers', () => {
      expect(DecimalUtil.ceil('3.1')).toBe('4');
      expect(DecimalUtil.ceil('3.1', 1)).toBe('3.2');
      expect(DecimalUtil.ceil('-3.1')).toBe('-3');
    });

    it('should floor numbers', () => {
      expect(DecimalUtil.floor('3.9')).toBe('3');
      expect(DecimalUtil.floor('3.9', 1)).toBe('3.9');
      expect(DecimalUtil.floor('-3.1')).toBe('-4');
    });
  });

  describe('comparison operations', () => {
    it('should compare numbers', () => {
      expect(DecimalUtil.compare('0.1', '0.2')).toBe(-1);
      expect(DecimalUtil.compare('0.2', '0.2')).toBe(0);
      expect(DecimalUtil.compare('0.3', '0.2')).toBe(1);
    });

    it('should check equality', () => {
      expect(DecimalUtil.equals('0.1', '0.1')).toBe(true);
      expect(DecimalUtil.equals('0.1', '0.2')).toBe(false);
    });

    it('should check greater than', () => {
      expect(DecimalUtil.gt('0.2', '0.1')).toBe(true);
      expect(DecimalUtil.gt('0.1', '0.2')).toBe(false);
    });

    it('should check less than', () => {
      expect(DecimalUtil.lt('0.1', '0.2')).toBe(true);
      expect(DecimalUtil.lt('0.2', '0.1')).toBe(false);
    });
  });

  describe('other operations', () => {
    it('should get absolute value', () => {
      expect(DecimalUtil.abs('-3.2')).toBe('3.2');
      expect(DecimalUtil.abs('3.2')).toBe('3.2');
    });

    it('should get maximum value', () => {
      expect(DecimalUtil.max('1', '2', '3')).toBe('3');
      expect(DecimalUtil.max('-1', '-2', '-3')).toBe('-1');
    });

    it('should get minimum value', () => {
      expect(DecimalUtil.min('1', '2', '3')).toBe('1');
      expect(DecimalUtil.min('-1', '-2', '-3')).toBe('-3');
    });
  });

  describe('percentage operations', () => {
    it('should calculate percentage with default precision', () => {
      expect(DecimalUtil.percentage(1, 2)).toBe('50.00');
      expect(DecimalUtil.percentage('1', '4')).toBe('25.00');
      expect(DecimalUtil.percentage(2, 5)).toBe('40.00');
    });

    it('should calculate percentage with custom precision', () => {
      expect(DecimalUtil.percentage(1, 3, 1)).toBe('33.3');
      expect(DecimalUtil.percentage(1, 3, 3)).toBe('33.333');
      expect(DecimalUtil.percentage('2', '3', 4)).toBe('66.6667');
    });

    it('should handle zero total', () => {
      expect(() => DecimalUtil.percentage(1, 0)).toThrow('Division by zero');
      expect(() => DecimalUtil.percentage('1', '0')).toThrow('Division by zero');
    });

    it('should handle negative numbers', () => {
      expect(DecimalUtil.percentage(-1, 2)).toBe('-50.00');
      expect(DecimalUtil.percentage(1, -2)).toBe('-50.00');
      expect(DecimalUtil.percentage(-1, -2)).toBe('50.00');
    });

    it('should handle decimal numbers', () => {
      expect(DecimalUtil.percentage(0.1, 0.2)).toBe('50.00');
      expect(DecimalUtil.percentage('0.3', '1.5')).toBe('20.00');
      expect(DecimalUtil.percentage(1.5, 3, 1)).toBe('50.0');
    });
  });
});