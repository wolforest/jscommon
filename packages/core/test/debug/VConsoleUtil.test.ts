import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { VConsoleUtil } from '../../src/debug/VConsoleUtil';
import VConsole from 'vconsole';

// Mock VConsole
vi.mock('vconsole', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      destroy: vi.fn(),
      show: vi.fn(),
      hide: vi.fn(),
      isInited: true,
      addPlugin: vi.fn(),
      removePlugin: vi.fn()
    }))
  };
});

describe('VConsoleUtil', () => {
  beforeEach(() => {
    // 清除所有 mock 的调用记录
    vi.clearAllMocks();
  });

  afterEach(() => {
    // 销毁实例
    VConsoleUtil.destroy();
  });

  describe('init', () => {
    it('should create new VConsole instance', () => {
      const options = { theme: 'dark' };
      const vConsole = VConsoleUtil.init(options);

      expect(VConsole).toHaveBeenCalledWith(options);
      expect(vConsole).toBeDefined();
    });

    it('should return existing instance if already initialized', () => {
      const firstInstance = VConsoleUtil.init();
      const secondInstance = VConsoleUtil.init();

      expect(VConsole).toHaveBeenCalledTimes(1);
      expect(firstInstance).toBe(secondInstance);
    });
  });

  describe('getInstance', () => {
    it('should return null if not initialized', () => {
      expect(VConsoleUtil.getInstance()).toBeNull();
    });

    it('should return instance after initialization', () => {
      const instance = VConsoleUtil.init();
      expect(VConsoleUtil.getInstance()).toBe(instance);
    });
  });

  describe('destroy', () => {
    it('should destroy instance', () => {
      const instance = VConsoleUtil.init();
      VConsoleUtil.destroy();

      expect(instance.destroy).toHaveBeenCalled();
      expect(VConsoleUtil.getInstance()).toBeNull();
    });

    it('should handle multiple destroy calls', () => {
      VConsoleUtil.destroy();
      VConsoleUtil.destroy();
      // Should not throw error
    });
  });

  describe('show/hide/toggle', () => {
    it('should show panel', () => {
      const instance = VConsoleUtil.init();
      VConsoleUtil.show();

      expect(instance.show).toHaveBeenCalled();
    });

    it('should hide panel', () => {
      const instance = VConsoleUtil.init();
      VConsoleUtil.hide();

      expect(instance.hide).toHaveBeenCalled();
    });

    it('should toggle panel', () => {
      const instance = VConsoleUtil.init();
      VConsoleUtil.toggle();

      expect(instance.show).toHaveBeenCalled();
    });

    it('should handle method calls when not initialized', () => {
      // Should not throw errors
      VConsoleUtil.show();
      VConsoleUtil.hide();
      VConsoleUtil.toggle();
    });
  });

  describe('plugin management', () => {
    it('should add plugin', () => {
      const instance = VConsoleUtil.init();
      const plugin = { id: 'test' };
      VConsoleUtil.addPlugin(plugin);

      expect(instance.addPlugin).toHaveBeenCalledWith(plugin);
    });

    it('should remove plugin', () => {
      const instance = VConsoleUtil.init();
      VConsoleUtil.removePlugin('test');

      expect(instance.removePlugin).toHaveBeenCalledWith('test');
    });

    it('should handle plugin operations when not initialized', () => {
      // Should not throw errors
      VConsoleUtil.addPlugin({});
      VConsoleUtil.removePlugin('test');
    });
  });
}); 