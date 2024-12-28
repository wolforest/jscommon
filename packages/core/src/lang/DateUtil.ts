import dayjs, { ConfigType, Dayjs, ManipulateType, OpUnitType, QUnitType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

// 扩展 dayjs 插件
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export class DateUtil {
  /**
   * 创建一个 Dayjs 对象
   * @param date - 日期
   * @param format - 格式
   * @param strict - 是否严格模式
   * @returns Dayjs 对象
   * @example
   * ```ts
   * DateUtil.dayjs('2019-01-25') // => Dayjs
   * DateUtil.dayjs('2019-01-25', 'YYYY-MM-DD') // => Dayjs
   * ```
   */
  static dayjs = dayjs;

  /**
   * 获取或设置年份
   * @param date - 日期
   * @param value - 要设置的年份值
   * @returns 获取时返回年份,设置时返回新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.year('2019-01-25') // => 2019
   * DateUtil.year('2019-01-25', 2020) // => Dayjs('2020-01-25')
   * ```
   */
  static year(date: ConfigType, value?: number): number | Dayjs {
    const d = dayjs(date);
    return value === undefined ? d.year() : d.year(value);
  }

  /**
   * 获取或设置月份 (0-11)
   * @param date - 日期
   * @param value - 要设置的月份值
   * @returns 获取时返回月份,设置时返回新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.month('2019-01-25') // => 0
   * DateUtil.month('2019-01-25', 1) // => Dayjs('2019-02-25')
   * ```
   */
  static month(date: ConfigType, value?: number): number | Dayjs {
    const d = dayjs(date);
    return value === undefined ? d.month() : d.month(value);
  }

  /**
   * 获取或设置日期
   * @param date - 日期
   * @param value - 要设置的日期值
   * @returns 获取时返回日期,设置时返回新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.date('2019-01-25') // => 25
   * DateUtil.date('2019-01-25', 1) // => Dayjs('2019-01-01')
   * ```
   */
  static date(date: ConfigType, value?: number): number | Dayjs {
    const d = dayjs(date);
    return value === undefined ? d.date() : d.date(value);
  }

  /**
   * 获取或设置星期几 (0-6, 星期日是 0)
   * @param date - 日期
   * @param value - 要设置的星期值
   * @returns 获取时返回星期几,设置时返回新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.day('2019-01-25') // => 5
   * DateUtil.day('2019-01-25', 0) // => Dayjs('2019-01-20')
   * ```
   */
  static day(date: ConfigType, value?: number): number | Dayjs {
    const d = dayjs(date);
    return value === undefined ? d.day() : d.day(value);
  }

  /**
   * 获取或设置小时
   * @param date - 日期
   * @param value - 要设置的小时值
   * @returns 获取时返回小时,设置时返回新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.hour('2019-01-25 12:00:00') // => 12
   * DateUtil.hour('2019-01-25 12:00:00', 13) // => Dayjs('2019-01-25 13:00:00')
   * ```
   */
  static hour(date: ConfigType, value?: number): number | Dayjs {
    const d = dayjs(date);
    return value === undefined ? d.hour() : d.hour(value);
  }

  /**
   * 获取或设置分钟
   * @param date - 日期
   * @param value - 要设置的分钟值
   * @returns 获取时返回分钟,设置时返回新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.minute('2019-01-25 12:30:00') // => 30
   * DateUtil.minute('2019-01-25 12:30:00', 45) // => Dayjs('2019-01-25 12:45:00')
   * ```
   */
  static minute(date: ConfigType, value?: number): number | Dayjs {
    const d = dayjs(date);
    return value === undefined ? d.minute() : d.minute(value);
  }

  /**
   * 获取或设置秒
   * @param date - 日期
   * @param value - 要设置的秒值
   * @returns 获取时返回秒,设置时返回新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.second('2019-01-25 12:30:45') // => 45
   * DateUtil.second('2019-01-25 12:30:45', 30) // => Dayjs('2019-01-25 12:30:30')
   * ```
   */
  static second(date: ConfigType, value?: number): number | Dayjs {
    const d = dayjs(date);
    return value === undefined ? d.second() : d.second(value);
  }

  /**
   * 获取或设置毫秒
   * @param date - 日期
   * @param value - 要设置的毫秒值
   * @returns 获取时返回毫秒,设置时返回新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.millisecond('2019-01-25 12:30:45.123') // => 123
   * DateUtil.millisecond('2019-01-25 12:30:45.123', 456) // => Dayjs('2019-01-25 12:30:45.456')
   * ```
   */
  static millisecond(date: ConfigType, value?: number): number | Dayjs {
    const d = dayjs(date);
    return value === undefined ? d.millisecond() : d.millisecond(value);
  }

  /**
   * 增加指定时间
   * @param date - 日期
   * @param value - 要增加的数值
   * @param unit - 时间单位
   * @returns 新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.add('2019-01-25', 1, 'day') // => Dayjs('2019-01-26')
   * DateUtil.add('2019-01-25', 1, 'month') // => Dayjs('2019-02-25')
   * ```
   */
  static add(date: ConfigType, value: number, unit: ManipulateType): Dayjs {
    return dayjs(date).add(value, unit);
  }

  /**
   * 减少指定时间
   * @param date - 日期
   * @param value - 要减少的数值
   * @param unit - 时间单位
   * @returns 新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.subtract('2019-01-25', 1, 'day') // => Dayjs('2019-01-24')
   * DateUtil.subtract('2019-01-25', 1, 'month') // => Dayjs('2018-12-25')
   * ```
   */
  static subtract(date: ConfigType, value: number, unit: ManipulateType): Dayjs {
    return dayjs(date).subtract(value, unit);
  }

  /**
   * 获取时间单位的开始时间
   * @param date - 日期
   * @param unit - 时间单位
   * @returns 新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.startOf('2019-01-25', 'month') // => Dayjs('2019-01-01')
   * DateUtil.startOf('2019-01-25', 'year') // => Dayjs('2019-01-01')
   * ```
   */
  static startOf(date: ConfigType, unit: OpUnitType): Dayjs {
    return dayjs(date).startOf(unit);
  }

  /**
   * 获取时间单位的结束时间
   * @param date - 日期
   * @param unit - 时间单位
   * @returns 新的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.endOf('2019-01-25', 'month') // => Dayjs('2019-01-31 23:59:59.999')
   * DateUtil.endOf('2019-01-25', 'year') // => Dayjs('2019-12-31 23:59:59.999')
   * ```
   */
  static endOf(date: ConfigType, unit: OpUnitType): Dayjs {
    return dayjs(date).endOf(unit);
  }

  /**
   * 格式化日期
   * @param date - 日期
   * @param template - 格式模板
   * @returns 格式化后的字符串
   * @example
   * ```ts
   * DateUtil.format('2019-01-25', 'YYYY-MM-DD') // => '2019-01-25'
   * DateUtil.format('2019-01-25', 'YYYY年MM月DD日') // => '2019年01月25日'
   * ```
   */
  static format(date: ConfigType, template?: string): string {
    return dayjs(date).format(template);
  }

  /**
   * 计算两个日期之间的差值
   * @param date - 日期
   * @param compareDate - 比较的日期
   * @param unit - 时间单位
   * @param float - 是否返回浮点数
   * @returns 差值
   * @example
   * ```ts
   * DateUtil.diff('2019-01-25', '2019-01-24', 'day') // => 1
   * DateUtil.diff('2019-01-25', '2018-12-25', 'month') // => 1
   * ```
   */
  static diff(date: ConfigType, compareDate: ConfigType, unit?: QUnitType | OpUnitType, float?: boolean): number {
    return dayjs(date).diff(compareDate, unit, float);
  }

  /**
   * 获取时间戳(毫秒)
   * @param date - 日期
   * @returns 时间戳
   * @example
   * ```ts
   * DateUtil.valueOf('2019-01-25') // => 1548345600000
   * ```
   */
  static valueOf(date: ConfigType): number {
    return dayjs(date).valueOf();
  }

  /**
   * 获取 Unix 时间戳(秒)
   * @param date - 日期
   * @returns Unix 时间戳
   * @example
   * ```ts
   * DateUtil.unix('2019-01-25') // => 1548345600
   * ```
   */
  static unix(date: ConfigType): number {
    return dayjs(date).unix();
  }

  /**
   * 获取当月天数
   * @param date - 日期
   * @returns 当月天数
   * @example
   * ```ts
   * DateUtil.daysInMonth('2019-01-25') // => 31
   * DateUtil.daysInMonth('2019-02-25') // => 28
   * ```
   */
  static daysInMonth(date: ConfigType): number {
    return dayjs(date).daysInMonth();
  }

  /**
   * 转换为原生 Date 对象
   * @param date - 日期
   * @returns Date 对象
   * @example
   * ```ts
   * DateUtil.toDate('2019-01-25') // => Date
   * ```
   */
  static toDate(date: ConfigType): Date {
    return dayjs(date).toDate();
  }

  /**
   * 转换为 JSON 格式
   * @param date - 日期
   * @returns JSON 字符串
   * @example
   * ```ts
   * DateUtil.toJSON('2019-01-25') // => '2019-01-25T00:00:00.000Z'
   * ```
   */
  static toJSON(date: ConfigType): string {
    return dayjs(date).toJSON();
  }

  /**
   * 转换为 ISO 8601 格式
   * @param date - 日期
   * @returns ISO 8601 字符串
   * @example
   * ```ts
   * DateUtil.toISOString('2019-01-25') // => '2019-01-25T00:00:00.000Z'
   * ```
   */
  static toISOString(date: ConfigType): string {
    return dayjs(date).toISOString();
  }

  /**
   * 转换为字符串
   * @param date - 日期
   * @returns 字符串
   * @example
   * ```ts
   * DateUtil.toString('2019-01-25') // => 'Fri Jan 25 2019 00:00:00 GMT+0800'
   * ```
   */
  static toString(date: ConfigType): string {
    return dayjs(date).toString();
  }

  /**
   * 获取 UTC 偏移量(分钟)
   * @param date - 日期
   * @returns UTC 偏移量
   * @example
   * ```ts
   * DateUtil.utcOffset('2019-01-25') // => 480 (UTC+8)
   * ```
   */
  static utcOffset(date: ConfigType): number {
    return dayjs(date).utcOffset();
  }

  /**
   * 检查日期是否在另一个日期之前
   * @param date - 日期
   * @param compareDate - 比较的日期
   * @param unit - 时间单位
   * @returns 是否在之前
   * @example
   * ```ts
   * DateUtil.isBefore('2019-01-25', '2019-01-26') // => true
   * DateUtil.isBefore('2019-01-25', '2019-02-25', 'month') // => true
   * ```
   */
  static isBefore(date: ConfigType, compareDate: ConfigType, unit?: OpUnitType): boolean {
    return dayjs(date).isBefore(compareDate, unit);
  }

  /**
   * 检查日期是否与另一个日期相同
   * @param date - 日期
   * @param compareDate - 比较的日期
   * @param unit - 时间单位
   * @returns 是否相同
   * @example
   * ```ts
   * DateUtil.isSame('2019-01-25', '2019-01-25') // => true
   * DateUtil.isSame('2019-01-25', '2019-02-25', 'year') // => true
   * ```
   */
  static isSame(date: ConfigType, compareDate: ConfigType, unit?: OpUnitType): boolean {
    return dayjs(date).isSame(compareDate, unit);
  }

  /**
   * 检查日期是否在另一个日期之后
   * @param date - 日期
   * @param compareDate - 比较的日期
   * @param unit - 时间单位
   * @returns 是否在之后
   * @example
   * ```ts
   * DateUtil.isAfter('2019-01-25', '2019-01-24') // => true
   * DateUtil.isAfter('2019-01-25', '2018-12-25', 'month') // => true
   * ```
   */
  static isAfter(date: ConfigType, compareDate: ConfigType, unit?: OpUnitType): boolean {
    return dayjs(date).isAfter(compareDate, unit);
  }

  /**
   * 获取或设置语言环境
   * @param preset - 语言环境名称
   * @returns 当前语言环境
   * @example
   * ```ts
   * DateUtil.locale() // => 'en'
   * DateUtil.locale('zh-cn') // => 'zh-cn'
   * ```
   */
  static locale(preset?: string): string {
    return dayjs.locale(preset);
  }

  /**
   * 检查日期是否有效
   * @param date - 日期
   * @returns 是否有效
   * @example
   * ```ts
   * DateUtil.isValid('2019-01-25') // => true
   * DateUtil.isValid('invalid date') // => false
   * ```
   */
  static isValid(date: ConfigType): boolean {
    return dayjs(date).isValid();
  }

  /**
   * 从 Unix 时间戳(秒)创建 Dayjs 对象
   * @param timestamp - Unix 时间戳
   * @returns Dayjs 对象
   * @example
   * ```ts
   * DateUtil.fromUnix(1548345600) // => Dayjs('2019-01-25')
   * ```
   */
  static fromUnix(timestamp: number): Dayjs {
    return dayjs.unix(timestamp);
  }

  /**
   * 克隆日期对象
   * @param date - 日期
   * @returns 新的 Dayjs 对象
   * @example
   * ```ts
   * const d1 = DateUtil.dayjs('2019-01-25')
   * const d2 = DateUtil.clone(d1) // => 新的 Dayjs 对象
   * ```
   */
  static clone(date: ConfigType): Dayjs {
    return dayjs(date).clone();
  }

  /**
   * 检查日期是否在另一个日期之前或相同
   * @param date - 日期
   * @param compareDate - 比较的日期
   * @param unit - 时间单位
   * @returns 是否在之前或相同
   * @example
   * ```ts
   * DateUtil.isSameOrBefore('2019-01-25', '2019-01-25') // => true
   * DateUtil.isSameOrBefore('2019-01-25', '2019-01-26') // => true
   * DateUtil.isSameOrBefore('2019-01-25', '2019-02-25', 'month') // => true
   * ```
   */
  static isSameOrBefore(date: ConfigType, compareDate: ConfigType, unit?: OpUnitType): boolean {
    return dayjs(date).isSameOrBefore(compareDate, unit);
  }

  /**
   * 检查日期是否在另一个日期之后或相同
   * @param date - 日期
   * @param compareDate - 比较的日期
   * @param unit - 时间单位
   * @returns 是否在之后或相同
   * @example
   * ```ts
   * DateUtil.isSameOrAfter('2019-01-25', '2019-01-25') // => true
   * DateUtil.isSameOrAfter('2019-01-25', '2019-01-24') // => true
   * DateUtil.isSameOrAfter('2019-01-25', '2018-12-25', 'month') // => true
   * ```
   */
  static isSameOrAfter(date: ConfigType, compareDate: ConfigType, unit?: OpUnitType): boolean {
    return dayjs(date).isSameOrAfter(compareDate, unit);
  }

  /**
   * 检查日期是否在指定的时间范围内
   * @param date - 日期
   * @param start - 开始日期
   * @param end - 结束日期
   * @param unit - 时间单位
   * @param inclusivity - 包含性 '()' '[]' '[)' '(]'
   * @returns 是否在范围内
   * @example
   * ```ts
   * DateUtil.isBetween('2019-01-25', '2019-01-24', '2019-01-26') // => true
   * DateUtil.isBetween('2019-01-25', '2019-01-25', '2019-01-26', null, '[)') // => true
   * ```
   */
  static isBetween(
    date: ConfigType, 
    start: ConfigType, 
    end: ConfigType, 
    unit?: OpUnitType,
    inclusivity?: '()' | '[]' | '[)' | '(]'
  ): boolean {
    return dayjs(date).isBetween(start, end, unit, inclusivity);
  }

  /**
   * 转换为 UTC 时间
   * @param input - 要转换的日期
   * @param format - 输入日期的格式字符串（例如：'YYYY-MM-DD HH:mm:ss'）
   * @returns UTC 时间的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.utc('2019-01-25') // => Dayjs('2019-01-25T00:00:00Z')
   * DateUtil.utc('2019-01-25 00:00:00', 'YYYY-MM-DD HH:mm:ss') // => Dayjs('2019-01-25T00:00:00Z')
   * ```
   */
  static utc(input?: ConfigType, format?: string): Dayjs {
    return dayjs.utc(input, format);
  }

  /**
   * 设置时区
   * @param input - 日期
   * @param timezone - 时区
   * @param keepLocalTime - 是否保持本地时间
   * @returns 指定时区的 Dayjs 对象
   * @example
   * ```ts
   * DateUtil.tz('2019-01-25', 'America/New_York') // => Dayjs('2019-01-25T00:00:00-05:00')
   * DateUtil.tz('2019-01-25', 'Asia/Tokyo', true) // => Dayjs('2019-01-25T00:00:00+09:00')
   * ```
   */
  static tz(input: ConfigType, timezone?: string, keepLocalTime?: boolean): Dayjs {
    return dayjs(input).tz(timezone, keepLocalTime);
  }
}