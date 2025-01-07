import { describe, it, expect } from 'vitest';
import { ClassNamesUtil } from '../../src/style/ClassNamesUtil';

describe('ClassNamesUtil', () => {
  describe('combine', () => {
    it('should handle strings', () => {
      expect(ClassNamesUtil.combine('foo', 'bar')).toBe('foo bar');
      expect(ClassNamesUtil.combine('foo', 'bar', 'baz')).toBe('foo bar baz');
    });

    it('should handle objects', () => {
      expect(ClassNamesUtil.combine({ foo: true, bar: false })).toBe('foo');
      expect(ClassNamesUtil.combine({ foo: true, bar: true })).toBe('foo bar');
      expect(ClassNamesUtil.combine({ foo: false, bar: false })).toBe('');
    });

    it('should handle arrays', () => {
      expect(ClassNamesUtil.combine(['foo', 'bar'])).toBe('foo bar');
      expect(ClassNamesUtil.combine(['foo', { bar: true }])).toBe('foo bar');
      expect(ClassNamesUtil.combine(['foo', ['bar', 'baz']])).toBe('foo bar baz');
    });

    it('should handle mixed arguments', () => {
      expect(ClassNamesUtil.combine('foo', { bar: true }, ['baz'])).toBe('foo bar baz');
      expect(ClassNamesUtil.combine('foo', { bar: false }, ['baz', { qux: true }]))
        .toBe('foo baz qux');
    });

    it('should handle falsy values', () => {
      expect(ClassNamesUtil.combine(null, undefined, false, 0, '')).toBe('0');
      expect(ClassNamesUtil.combine('foo', null, 'bar')).toBe('foo bar');
    });

    it('should handle numbers', () => {
      expect(ClassNamesUtil.combine(42, 'foo')).toBe('42 foo');
      expect(ClassNamesUtil.combine('foo', 42)).toBe('foo 42');
    });
  });

  describe('withPrefix', () => {
    it('should add prefix to class names', () => {
      const bem = ClassNamesUtil.withPrefix('btn');
      expect(bem('primary')).toBe('btn-primary');
      expect(bem('primary', 'large')).toBe('btn-primary btn-large');
    });

    it('should handle objects with prefix', () => {
      const bem = ClassNamesUtil.withPrefix('btn');
      expect(bem({ primary: true, large: false })).toBe('btn-primary');
      expect(bem({ primary: true, large: true })).toBe('btn-primary btn-large');
    });

    it('should handle arrays with prefix', () => {
      const bem = ClassNamesUtil.withPrefix('btn');
      expect(bem(['primary', 'large'])).toBe('btn-primary btn-large');
      expect(bem(['primary', { large: true }])).toBe('btn-primary btn-large');
    });

    it('should handle empty values with prefix', () => {
      const bem = ClassNamesUtil.withPrefix('btn');
      expect(bem()).toBe('');
      expect(bem('')).toBe('');
      expect(bem(null)).toBe('');
      expect(bem(undefined)).toBe('');
    });
  });

  describe('when', () => {
    it('should conditionally include class names', () => {
      expect(ClassNamesUtil.when('active', true)).toBe('active');
      expect(ClassNamesUtil.when('active', false)).toBe('');
      expect(ClassNamesUtil.when('disabled', 1 > 0)).toBe('disabled');
      expect(ClassNamesUtil.when('visible', null)).toBe('');
    });
  });
}); 