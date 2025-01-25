import VConsole from 'vconsole';

/**
 * VConsole 工具类,用于移动端调试
 */
export class VConsoleUtil {
  private static instance: VConsole | null = null;

  /**
   * 初始化 VConsole
   * @param options - VConsole 配置选项
   * @returns VConsole 实例
   * @example
   * ```ts
   * // 基础用法
   * VConsoleUtil.init();
   * 
   * // 自定义配置
   * VConsoleUtil.init({
   *   theme: 'dark',
   *   maxLogNumber: 1000
   * });
   * ```
   */
  static init(options?: VConsoleOptions): VConsole {
    if (!this.instance) {
      this.instance = new VConsole(options);
    }
    return this.instance;
  }

  /**
   * 获取 VConsole 实例
   * @returns VConsole 实例,如果未初始化则返回 null
   * @example
   * ```ts
   * const vConsole = VConsoleUtil.getInstance();
   * if (vConsole) {
   *   // 使用 vConsole
   * }
   * ```
   */
  static getInstance(): VConsole | null {
    return this.instance;
  }

  /**
   * 销毁 VConsole 实例
   * @example
   * ```ts
   * VConsoleUtil.destroy();
   * ```
   */
  static destroy(): void {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
  }

  /**
   * 显示 VConsole 面板
   * @example
   * ```ts
   * VConsoleUtil.show();
   * ```
   */
  static show(): void {
    this.instance?.show();
  }

  /**
   * 隐藏 VConsole 面板
   * @example
   * ```ts
   * VConsoleUtil.hide();
   * ```
   */
  static hide(): void {
    this.instance?.hide();
  }

  /**
   * 切换 VConsole 面板显示状态
   * @example
   * ```ts
   * VConsoleUtil.toggle();
   * ```
   */
  static toggle(): void {
    if (this.instance) {
      if (this.instance.isInited) {
        this.instance.show();
      } else {
        this.instance.hide();
      }
    }
  }

  /**
   * 添加自定义插件
   * @param plugin - VConsole 插件
   * @example
   * ```ts
   * class MyPlugin extends VConsolePlugin {
   *   constructor() {
   *     super('my_plugin');
   *   }
   * }
   * 
   * VConsoleUtil.addPlugin(new MyPlugin());
   * ```
   */
  static addPlugin(plugin: any): void {
    this.instance?.addPlugin(plugin);
  }

  /**
   * 移除自定义插件
   * @param pluginId - 插件 ID
   * @example
   * ```ts
   * VConsoleUtil.removePlugin('my_plugin');
   * ```
   */
  static removePlugin(pluginId: string): void {
    this.instance?.removePlugin(pluginId);
  }
} 