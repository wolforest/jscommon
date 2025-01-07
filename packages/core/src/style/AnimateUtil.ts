import 'animate.css';

/**
 * 动画效果类型
 */
export type AnimationType =
  | 'bounce'
  | 'flash'
  | 'pulse'
  | 'rubberBand'
  | 'shakeX'
  | 'shakeY'
  | 'headShake'
  | 'swing'
  | 'tada'
  | 'wobble'
  | 'jello'
  | 'heartBeat'
  | 'backInDown'
  | 'backInLeft'
  | 'backInRight'
  | 'backInUp'
  | 'backOutDown'
  | 'backOutLeft'
  | 'backOutRight'
  | 'backOutUp'
  | 'bounceIn'
  | 'bounceInDown'
  | 'bounceInLeft'
  | 'bounceInRight'
  | 'bounceInUp'
  | 'bounceOut'
  | 'bounceOutDown'
  | 'bounceOutLeft'
  | 'bounceOutRight'
  | 'bounceOutUp'
  | 'fadeIn'
  | 'fadeInDown'
  | 'fadeInDownBig'
  | 'fadeInLeft'
  | 'fadeInLeftBig'
  | 'fadeInRight'
  | 'fadeInRightBig'
  | 'fadeInUp'
  | 'fadeInUpBig'
  | 'fadeOut'
  | 'fadeOutDown'
  | 'fadeOutDownBig'
  | 'fadeOutLeft'
  | 'fadeOutLeftBig'
  | 'fadeOutRight'
  | 'fadeOutRightBig'
  | 'fadeOutUp'
  | 'fadeOutUpBig'
  | 'flip'
  | 'flipInX'
  | 'flipInY'
  | 'flipOutX'
  | 'flipOutY'
  | 'lightSpeedInRight'
  | 'lightSpeedInLeft'
  | 'lightSpeedOutRight'
  | 'lightSpeedOutLeft'
  | 'rotateIn'
  | 'rotateInDownLeft'
  | 'rotateInDownRight'
  | 'rotateInUpLeft'
  | 'rotateInUpRight'
  | 'rotateOut'
  | 'rotateOutDownLeft'
  | 'rotateOutDownRight'
  | 'rotateOutUpLeft'
  | 'rotateOutUpRight'
  | 'hinge'
  | 'jackInTheBox'
  | 'rollIn'
  | 'rollOut'
  | 'zoomIn'
  | 'zoomInDown'
  | 'zoomInLeft'
  | 'zoomInRight'
  | 'zoomInUp'
  | 'zoomOut'
  | 'zoomOutDown'
  | 'zoomOutLeft'
  | 'zoomOutRight'
  | 'zoomOutUp'
  | 'slideInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInUp'
  | 'slideOutDown'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'slideOutUp';

/**
 * 动画配置选项
 */
export interface AnimateOptions {
  /** 动画持续时间(ms) */
  duration?: number;
  /** 动画延迟时间(ms) */
  delay?: number;
  /** 动画重复次数 */
  repeat?: number;
  /** 是否无限重复 */
  infinite?: boolean;
}

/**
 * Animate.css 工具类，用于处理动画效果
 */
export class AnimateUtil {
  /**
   * 获取动画类名
   * @param type - 动画类型
   * @param options - 动画配置选项
   * @returns 动画类名字符串
   * @example
   * ```ts
   * // 基础用法
   * AnimateUtil.getClassName('bounce') // => 'animate__animated animate__bounce'
   * 
   * // 配置动画时间
   * AnimateUtil.getClassName('fadeIn', { duration: 2000 }) 
   * // => 'animate__animated animate__fadeIn animate__duration-2s'
   * 
   * // 配置延迟时间
   * AnimateUtil.getClassName('fadeOut', { delay: 1000 })
   * // => 'animate__animated animate__fadeOut animate__delay-1s'
   * 
   * // 配置重复次数
   * AnimateUtil.getClassName('pulse', { repeat: 3 })
   * // => 'animate__animated animate__pulse animate__repeat-3'
   * 
   * // 无限重复
   * AnimateUtil.getClassName('bounce', { infinite: true })
   * // => 'animate__animated animate__bounce animate__infinite'
   * 
   * // 组合配置
   * AnimateUtil.getClassName('fadeIn', {
   *   duration: 2000,
   *   delay: 1000,
   *   repeat: 2
   * })
   * // => 'animate__animated animate__fadeIn animate__duration-2s animate__delay-1s animate__repeat-2'
   * ```
   */
  static getClassName(type: AnimationType, options: AnimateOptions = {}): string {
    const classes = ['animate__animated', `animate__${type}`];

    if (options.duration) {
      const seconds = Math.max(0.1, options.duration / 1000);
      classes.push(`animate__duration-${seconds}s`);
    }

    if (options.delay) {
      const seconds = Math.max(0.1, options.delay / 1000);
      classes.push(`animate__delay-${seconds}s`);
    }

    if (options.infinite) {
      classes.push('animate__infinite');
    } else if (options.repeat && options.repeat > 0) {
      classes.push(`animate__repeat-${options.repeat}`);
    }

    return classes.join(' ');
  }

  /**
   * 为元素添加动画效果
   * @param element - DOM 元素
   * @param type - 动画类型
   * @param options - 动画配置选项
   * @returns 返回一个 Promise，动画结束后 resolve
   * @example
   * ```ts
   * // 基础用法
   * const element = document.querySelector('.my-element');
   * await AnimateUtil.animate(element, 'bounce');
   * 
   * // 配置动画参数
   * await AnimateUtil.animate(element, 'fadeIn', {
   *   duration: 2000,
   *   delay: 1000,
   *   repeat: 2
   * });
   * 
   * // 处理动画完成
   * AnimateUtil.animate(element, 'fadeOut').then(() => {
   *   element.style.display = 'none';
   * });
   * ```
   */
  static animate(
    element: HTMLElement,
    type: AnimationType,
    options: AnimateOptions = {}
  ): Promise<void> {
    return new Promise((resolve) => {
      const className = this.getClassName(type, options);
      const animationEndHandler = () => {
        element.classList.remove(...className.split(' '));
        element.removeEventListener('animationend', animationEndHandler);
        resolve();
      };

      element.addEventListener('animationend', animationEndHandler);
      element.classList.add(...className.split(' '));
    });
  }

  /**
   * 移除元素的动画效果
   * @param element - DOM 元素
   * @example
   * ```ts
   * // 移除动画效果
   * const element = document.querySelector('.my-element');
   * AnimateUtil.removeAnimation(element);
   * ```
   */
  static removeAnimation(element: HTMLElement): void {
    const classes = Array.from(element.classList).filter(cls => 
      cls.startsWith('animate__')
    );
    element.classList.remove(...classes);
  }
} 