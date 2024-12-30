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

  describe('gt', () => {
    it('should check if value is greater than other', () => {
      expect(NumberUtil.gt(3, 1)).toBe(true);
      expect(NumberUtil.gt(3, 3)).toBe(false);
      expect(NumberUtil.gt(1, 3)).toBe(false);
    });
  });

  describe('gte', () => {
    it('should check if value is greater than or equal to other', () => {
      expect(NumberUtil.gte(3, 1)).toBe(true);
      expect(NumberUtil.gte(3, 3)).toBe(true);
      expect(NumberUtil.gte(1, 3)).toBe(false);
    });
  });

  describe('lt', () => {
    it('should check if value is less than other', () => {
      expect(NumberUtil.lt(1, 3)).toBe(true);
      expect(NumberUtil.lt(3, 3)).toBe(false);
      expect(NumberUtil.lt(3, 1)).toBe(false);
    });
  });

  describe('lte', () => {
    it('should check if value is less than or equal to other', () => {
      expect(NumberUtil.lte(1, 3)).toBe(true);
      expect(NumberUtil.lte(3, 3)).toBe(true);
      expect(NumberUtil.lte(3, 1)).toBe(false);
    });
  });

  describe('isFinite', () => {
    it('should check if value is finite number', () => {
      expect(NumberUtil.isFinite(3)).toBe(true);
      expect(NumberUtil.isFinite(Number.MIN_VALUE)).toBe(true);
      expect(NumberUtil.isFinite(Infinity)).toBe(false);
      expect(NumberUtil.isFinite(-Infinity)).toBe(false);
      expect(NumberUtil.isFinite('3')).toBe(false);
    });
  });

  describe('isInteger', () => {
    it('should check if value is integer', () => {
      expect(NumberUtil.isInteger(3)).toBe(true);
      expect(NumberUtil.isInteger(3.0)).toBe(true);
      expect(NumberUtil.isInteger(3.1)).toBe(false);
      expect(NumberUtil.isInteger('3')).toBe(false);
      expect(NumberUtil.isInteger(Infinity)).toBe(false);
    });
  });

  describe('isLength', () => {
    it('should check if value is valid array-like length', () => {
      expect(NumberUtil.isLength(3)).toBe(true);
      expect(NumberUtil.isLength(Number.MAX_SAFE_INTEGER)).toBe(true);
      expect(NumberUtil.isLength(-1)).toBe(false);
      expect(NumberUtil.isLength(1.1)).toBe(false);
      expect(NumberUtil.isLength(Infinity)).toBe(false);
    });
  });

  describe('isNaN', () => {
    it('should check if value is NaN', () => {
      expect(NumberUtil.isNaN(NaN)).toBe(true);
      expect(NumberUtil.isNaN(new Number(NaN))).toBe(true);
      expect(NumberUtil.isNaN(undefined)).toBe(false);
      expect(NumberUtil.isNaN(1)).toBe(false);
      expect(NumberUtil.isNaN('NaN')).toBe(false);
    });
  });

  describe('isSafeInteger', () => {
    it('should check if value is safe integer', () => {
      expect(NumberUtil.isSafeInteger(3)).toBe(true);
      expect(NumberUtil.isSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
      expect(NumberUtil.isSafeInteger(3.1)).toBe(false);
      expect(NumberUtil.isSafeInteger(Number.MAX_VALUE)).toBe(false);
      expect(NumberUtil.isSafeInteger('3')).toBe(false);
    });
  });

  describe('toFinite', () => {
    it('should convert value to finite number', () => {
      expect(NumberUtil.toFinite(3.2)).toBe(3.2);
      expect(NumberUtil.toFinite(Number.MIN_VALUE)).toBe(5e-324);
      expect(NumberUtil.toFinite(Infinity)).toBe(1.7976931348623157e+308);
      expect(NumberUtil.toFinite('3.2')).toBe(3.2);
      expect(NumberUtil.toFinite(null)).toBe(0);
    });
  });

  describe('toInteger', () => {
    it('should convert value to integer', () => {
      expect(NumberUtil.toInteger(3.2)).toBe(3);
      expect(NumberUtil.toInteger('3.2')).toBe(3);
      expect(NumberUtil.toInteger(Infinity)).toBe(1.7976931348623157e+308);
      expect(NumberUtil.toInteger('')).toBe(0);
      expect(NumberUtil.toInteger(null)).toBe(0);
    });
  });

  describe('toLength', () => {
    it('should convert value to valid array-like length', () => {
      expect(NumberUtil.toLength(3.2)).toBe(3);
      expect(NumberUtil.toLength('3.2')).toBe(3);
      expect(NumberUtil.toLength(-1)).toBe(0);
      expect(NumberUtil.toLength(Number.MAX_VALUE)).toBe(4294967295);
      expect(NumberUtil.toLength(null)).toBe(0);
    });
  });

  describe('toNumber', () => {
    it('should convert value to number', () => {
      expect(NumberUtil.toNumber(3.2)).toBe(3.2);
      expect(NumberUtil.toNumber('3.2')).toBe(3.2);
      expect(NumberUtil.toNumber(Number.MIN_VALUE)).toBe(5e-324);
      expect(NumberUtil.toNumber(Infinity)).toBe(Infinity);
      expect(NumberUtil.toNumber('')).toBe(0);
    });
  });

  describe('toSafeInteger', () => {
    it('should convert value to safe integer', () => {
      expect(NumberUtil.toSafeInteger(3.2)).toBe(3);
      expect(NumberUtil.toSafeInteger(Number.MAX_VALUE)).toBe(9007199254740991);
      expect(NumberUtil.toSafeInteger(Infinity)).toBe(9007199254740991);
      expect(NumberUtil.toSafeInteger('3.2')).toBe(3);
      expect(NumberUtil.toSafeInteger(null)).toBe(0);
    });
  });
}); 