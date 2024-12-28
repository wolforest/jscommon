import { describe, it, expect } from 'vitest';
import { NumberUtil } from '../../src/lang/NumberUtil';

describe('NumberUtil', () => {
  describe('isNumber', () => {
    it('should return true for valid numbers', () => {
      expect(NumberUtil.isNumber(3)).toBe(true);
      expect(NumberUtil.isNumber(Number.MIN_VALUE)).toBe(true);
      expect(NumberUtil.isNumber(Infinity)).toBe(true);
      expect(NumberUtil.isNumber(123)).toBe(true);
      expect(NumberUtil.isNumber(0)).toBe(true);
      expect(NumberUtil.isNumber(-123)).toBe(true);
      expect(NumberUtil.isNumber(1.23)).toBe(true);
      expect(NumberUtil.isNumber(Number.MAX_VALUE)).toBe(true);
      expect(NumberUtil.isNumber(Number.MIN_VALUE)).toBe(true);
    });

    it('should return false for non-numbers', () => {
      expect(NumberUtil.isNumber('3')).toBe(false);
      expect(NumberUtil.isNumber('123')).toBe(false);
      expect(NumberUtil.isNumber(null)).toBe(false);
      expect(NumberUtil.isNumber(undefined)).toBe(false);
      expect(NumberUtil.isNumber({})).toBe(false);
      expect(NumberUtil.isNumber([])).toBe(false);
    });
  });

  describe('clamp', () => {
    it('should clamp number within range', () => {
      expect(NumberUtil.clamp(-10, -5, 5)).toBe(-5);
      expect(NumberUtil.clamp(10, -5, 5)).toBe(5);
      expect(NumberUtil.clamp(5, 0, 10)).toBe(5);
      expect(NumberUtil.clamp(-5, 0, 10)).toBe(0);
      expect(NumberUtil.clamp(15, 0, 10)).toBe(10);
      expect(NumberUtil.clamp(3.5, 2.1, 4.9)).toBe(3.5);
    });

    it('should handle equal bounds', () => {
      expect(NumberUtil.clamp(5, 5, 5)).toBe(5);
    });

  });

  describe('precision calculations', () => {
    describe('add', () => {
      it('should perform precise addition', () => {
        expect(NumberUtil.add(0.1, 0.2)).toBe(0.3);
        expect(NumberUtil.add(1.23, 4.56)).toBe(5.79);
        expect(NumberUtil.add(-1.23, 4.56)).toBe(3.33);
        expect(NumberUtil.add(0, 0)).toBe(0);
      });

      it('should handle large numbers', () => {
        expect(NumberUtil.add(1e20, 1e20)).toBe(2e20);
      });
    });

    describe('subtract', () => {
      it('should perform precise subtraction', () => {
        expect(NumberUtil.subtract(0.3, 0.1)).toBe(0.2);
        expect(NumberUtil.subtract(5.79, 1.23)).toBe(4.56);
        expect(NumberUtil.subtract(1.23, -4.56)).toBe(5.79);
        expect(NumberUtil.subtract(0, 0)).toBe(0);
      });

      it('should handle large numbers', () => {
        expect(NumberUtil.subtract(2e20, 1e20)).toBe(1e20);
      });
    });

    describe('multiply', () => {
      it('should perform precise multiplication', () => {
        expect(NumberUtil.multiply(0.1, 0.2)).toBe(0.02);
        expect(NumberUtil.multiply(1.23, 2)).toBe(2.46);
        expect(NumberUtil.multiply(-1.23, 2)).toBe(-2.46);
        expect(NumberUtil.multiply(0, 5)).toBe(0);
      });

      it('should handle large numbers', () => {
        expect(NumberUtil.multiply(1e10, 1e10)).toBe(1e20);
      });
    });

    describe('divide', () => {
      it('should perform precise division', () => {
        expect(NumberUtil.divide(0.3, 0.1)).toBe(3);
        expect(NumberUtil.divide(4.56, 2)).toBe(2.28);
        expect(NumberUtil.divide(-4.56, 2)).toBe(-2.28);
        expect(NumberUtil.divide(0, 5)).toBe(0);
      });

      it('should throw error when dividing by zero', () => {
        expect(() => NumberUtil.divide(1, 0)).toThrow('Division by zero');
      });

      it('should handle large numbers', () => {
        expect(NumberUtil.divide(1e20, 1e10)).toBe(1e10);
      });
    });
  });

  describe('rounding', () => {
    describe('round', () => {
      it('should round numbers correctly', () => {
        expect(NumberUtil.round(4.006, 2)).toBe(4.01);
        expect(NumberUtil.round(4.004, 2)).toBe(4.00);
        expect(NumberUtil.round(4.5)).toBe(5);
        expect(NumberUtil.round(-4.5)).toBe(-4);
      });
    });

    describe('floor', () => {
      it('should floor numbers correctly', () => {
        expect(NumberUtil.floor(4.9)).toBe(4);
        expect(NumberUtil.floor(4.006, 2)).toBe(4.00);
        expect(NumberUtil.floor(-4.1)).toBe(-5);
        expect(NumberUtil.floor(0)).toBe(0);
      });
    });

    describe('ceil', () => {
      it('should ceil numbers correctly', () => {
        expect(NumberUtil.ceil(4.1)).toBe(5);
        expect(NumberUtil.ceil(4.006, 2)).toBe(4.01);
        expect(NumberUtil.ceil(-4.9)).toBe(-4);
        expect(NumberUtil.ceil(0)).toBe(0);
      });
    });
  });

  describe('format', () => {
    it('should format numbers with default options', () => {
      expect(NumberUtil.format(1234.5678)).toBe('1,234.57');
      expect(NumberUtil.format(-1234.5678)).toBe('-1,234.57');
      expect(NumberUtil.format(0)).toBe('0.00');
    });

    it('should format numbers with custom options', () => {
      expect(NumberUtil.format(1234.5678, { 
        precision: 3,
        thousandsSeparator: ' ',
        decimalSeparator: ','
      })).toBe('1 234,568');

      expect(NumberUtil.format(-1234.5678, {
        precision: 1,
        thousandsSeparator: '.',
        decimalSeparator: ','
      })).toBe('-1.234,6');
    });

    it('should handle edge cases', () => {
      expect(NumberUtil.format(0.0000001, { precision: 7 })).toBe('0.0000001');
      expect(NumberUtil.format(1e6)).toBe('1,000,000.00');
      expect(NumberUtil.format(1e-6, { precision: 7 })).toBe('0.0000010');
    });
  });
}); 