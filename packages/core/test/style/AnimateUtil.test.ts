import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnimateUtil, type AnimationType } from '../../src/style/AnimateUtil';

describe('AnimateUtil', () => {
  describe('getClassName', () => {
    it('should return basic animation class', () => {
      expect(AnimateUtil.getClassName('bounce'))
        .toBe('animate__animated animate__bounce');
      
      expect(AnimateUtil.getClassName('fadeIn'))
        .toBe('animate__animated animate__fadeIn');
    });

    it('should handle duration option', () => {
      expect(AnimateUtil.getClassName('bounce', { duration: 2000 }))
        .toBe('animate__animated animate__bounce animate__duration-2s');
      
      expect(AnimateUtil.getClassName('fadeIn', { duration: 500 }))
        .toBe('animate__animated animate__fadeIn animate__duration-0.5s');
      
      // 应该处理最小持续时间
      expect(AnimateUtil.getClassName('bounce', { duration: 50 }))
        .toBe('animate__animated animate__bounce animate__duration-0.1s');
    });

    it('should handle delay option', () => {
      expect(AnimateUtil.getClassName('bounce', { delay: 1000 }))
        .toBe('animate__animated animate__bounce animate__delay-1s');
      
      expect(AnimateUtil.getClassName('fadeIn', { delay: 500 }))
        .toBe('animate__animated animate__fadeIn animate__delay-0.5s');
      
      // 应该处理最小延迟时间
      expect(AnimateUtil.getClassName('bounce', { delay: 50 }))
        .toBe('animate__animated animate__bounce animate__delay-0.1s');
    });

    it('should handle repeat option', () => {
      expect(AnimateUtil.getClassName('bounce', { repeat: 3 }))
        .toBe('animate__animated animate__bounce animate__repeat-3');
      
      // infinite 应该优先于 repeat
      expect(AnimateUtil.getClassName('bounce', { repeat: 3, infinite: true }))
        .toBe('animate__animated animate__bounce animate__infinite');
    });

    it('should handle infinite option', () => {
      expect(AnimateUtil.getClassName('bounce', { infinite: true }))
        .toBe('animate__animated animate__bounce animate__infinite');
    });

    it('should handle multiple options', () => {
      expect(AnimateUtil.getClassName('fadeIn', {
        duration: 2000,
        delay: 1000,
        repeat: 2
      })).toBe(
        'animate__animated animate__fadeIn animate__duration-2s animate__delay-1s animate__repeat-2'
      );
    });
  });

  describe('animate', () => {
    let element: HTMLElement;
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      element = document.createElement('div');
      container.appendChild(element);
    });

    afterEach(() => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    });

    it('should add animation classes', async () => {
      const animationPromise = AnimateUtil.animate(element, 'bounce');
      
      expect(element.classList.contains('animate__animated')).toBe(true);
      expect(element.classList.contains('animate__bounce')).toBe(true);

      const event = new Event('animationend');
      element.dispatchEvent(event);
      await animationPromise;
    });

    it('should remove animation classes after animation ends', async () => {
      const animationPromise = AnimateUtil.animate(element, 'bounce');
      
      const event = new Event('animationend');
      element.dispatchEvent(event);
      await animationPromise;

      expect(element.classList.contains('animate__animated')).toBe(false);
      expect(element.classList.contains('animate__bounce')).toBe(false);
    });

    it('should handle animation options', async () => {
      const animationPromise = AnimateUtil.animate(element, 'fadeIn', {
        duration: 2000,
        delay: 1000,
        repeat: 2
      });

      expect(element.classList.contains('animate__duration-2s')).toBe(true);
      expect(element.classList.contains('animate__delay-1s')).toBe(true);
      expect(element.classList.contains('animate__repeat-2')).toBe(true);

      const event = new Event('animationend');
      element.dispatchEvent(event);
      await animationPromise;
    });

    it('should resolve promise after animation ends', async () => {
      const animationPromise = AnimateUtil.animate(element, 'bounce');
      const spy = vi.fn();
      
      animationPromise.then(spy);
      
      expect(spy).not.toHaveBeenCalled();
      
      const event = new Event('animationend');
      element.dispatchEvent(event);
      await animationPromise;
      
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('removeAnimation', () => {
    let element: HTMLElement;
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      element = document.createElement('div');
      element.classList.add(
        'animate__animated',
        'animate__bounce',
        'animate__duration-2s',
        'animate__delay-1s',
        'other-class'
      );
      container.appendChild(element);
    });

    afterEach(() => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    });

    it('should remove all animation classes', () => {
      AnimateUtil.removeAnimation(element);

      expect(element.classList.contains('animate__animated')).toBe(false);
      expect(element.classList.contains('animate__bounce')).toBe(false);
      expect(element.classList.contains('animate__duration-2s')).toBe(false);
      expect(element.classList.contains('animate__delay-1s')).toBe(false);
      expect(element.classList.contains('other-class')).toBe(true);
    });
  });

  describe('type safety', () => {
    it('should accept all valid animation types', () => {
      const validTypes: AnimationType[] = [
        'bounce',
        'flash',
        'pulse',
        'fadeIn',
        'fadeOut',
        'slideInDown',
        'zoomOut'
      ];

      validTypes.forEach(type => {
        expect(() => AnimateUtil.getClassName(type)).not.toThrow();
      });
    });
  });
}); 