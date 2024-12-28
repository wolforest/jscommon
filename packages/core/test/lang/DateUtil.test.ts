import { describe, it, expect } from 'vitest';
import { DateUtil } from '../../src/lang/DateUtil';

describe('DateUtil', () => {
  // 基础日期操作测试
  describe('basic operations', () => {
    it('should create dayjs object', () => {
      const date = DateUtil.dayjs('2019-01-25');
      expect(date.isValid()).toBe(true);
      expect(date.format('YYYY-MM-DD')).toBe('2019-01-25');
    });

    it('should check if date is valid', () => {
      expect(DateUtil.isValid('2019-01-25')).toBe(true);
      expect(DateUtil.isValid('invalid date')).toBe(false);
    });

    it('should clone date object', () => {
      const date = DateUtil.dayjs('2019-01-25');
      const cloned = DateUtil.clone(date);
      expect(cloned.format('YYYY-MM-DD')).toBe('2019-01-25');
      expect(cloned).not.toBe(date); // 不是同一个对象
    });
  });

  // 获取和设置日期组件测试
  describe('getters and setters', () => {
    it('should get and set year', () => {
      expect(DateUtil.year('2019-01-25')).toBe(2019);
      expect(DateUtil.year('2019-01-25', 2020).format('YYYY-MM-DD')).toBe('2020-01-25');
    });

    it('should get and set month', () => {
      expect(DateUtil.month('2019-01-25')).toBe(0); // 0-based month
      expect(DateUtil.month('2019-01-25', 1).format('YYYY-MM-DD')).toBe('2019-02-25');
    });

    it('should get and set date', () => {
      expect(DateUtil.date('2019-01-25')).toBe(25);
      expect(DateUtil.date('2019-01-25', 1).format('YYYY-MM-DD')).toBe('2019-01-01');
    });

    it('should get and set day', () => {
      expect(DateUtil.day('2019-01-25')).toBe(5); // Friday
      expect(DateUtil.day('2019-01-25', 0).format('YYYY-MM-DD')).toBe('2019-01-20'); // Sunday
    });

    it('should get and set hour', () => {
      expect(DateUtil.hour('2019-01-25 12:30:45')).toBe(12);
      expect(DateUtil.hour('2019-01-25 12:30:45', 13).format('HH:mm:ss')).toBe('13:30:45');
    });

    it('should get and set minute', () => {
      expect(DateUtil.minute('2019-01-25 12:30:45')).toBe(30);
      expect(DateUtil.minute('2019-01-25 12:30:45', 15).format('HH:mm:ss')).toBe('12:15:45');
    });

    it('should get and set second', () => {
      expect(DateUtil.second('2019-01-25 12:30:45')).toBe(45);
      expect(DateUtil.second('2019-01-25 12:30:45', 30).format('HH:mm:ss')).toBe('12:30:30');
    });

    it('should get and set millisecond', () => {
      expect(DateUtil.millisecond('2019-01-25 12:30:45.123')).toBe(123);
      expect(DateUtil.millisecond('2019-01-25 12:30:45.123', 456).format('SSS')).toBe('456');
    });
  });

  // 日期操作测试
  describe('date manipulations', () => {
    it('should add time', () => {
      expect(DateUtil.add('2019-01-25', 1, 'day').format('YYYY-MM-DD')).toBe('2019-01-26');
      expect(DateUtil.add('2019-01-25', 1, 'month').format('YYYY-MM-DD')).toBe('2019-02-25');
      expect(DateUtil.add('2019-01-25', 1, 'year').format('YYYY-MM-DD')).toBe('2020-01-25');
    });

    it('should subtract time', () => {
      expect(DateUtil.subtract('2019-01-25', 1, 'day').format('YYYY-MM-DD')).toBe('2019-01-24');
      expect(DateUtil.subtract('2019-01-25', 1, 'month').format('YYYY-MM-DD')).toBe('2018-12-25');
      expect(DateUtil.subtract('2019-01-25', 1, 'year').format('YYYY-MM-DD')).toBe('2018-01-25');
    });

    it('should get start of time', () => {
      expect(DateUtil.startOf('2019-01-25', 'month').format('YYYY-MM-DD')).toBe('2019-01-01');
      expect(DateUtil.startOf('2019-01-25', 'year').format('YYYY-MM-DD')).toBe('2019-01-01');
      expect(DateUtil.startOf('2019-01-25 12:30:45', 'day').format('HH:mm:ss')).toBe('00:00:00');
    });

    it('should get end of time', () => {
      expect(DateUtil.endOf('2019-01-25', 'month').format('YYYY-MM-DD')).toBe('2019-01-31');
      expect(DateUtil.endOf('2019-01-25', 'year').format('YYYY-MM-DD')).toBe('2019-12-31');
      expect(DateUtil.endOf('2019-01-25 12:30:45', 'day').format('HH:mm:ss')).toBe('23:59:59');
    });
  });

  // 格式化和解析测试
  describe('formatting and parsing', () => {
    it('should format date', () => {
      expect(DateUtil.format('2019-01-25', 'YYYY-MM-DD')).toBe('2019-01-25');
      expect(DateUtil.format('2019-01-25', 'YYYY年MM月DD日')).toBe('2019年01月25日');
      expect(DateUtil.format('2019-01-25 12:30:45', 'HH:mm:ss')).toBe('12:30:45');
    });

    it('should convert to various formats', () => {
      const date = '2019-01-25T00:00:00.000Z';
      expect(DateUtil.toJSON(date)).toMatch(/2019-01-25T00:00:00/);
      expect(DateUtil.toISOString(date)).toMatch(/2019-01-25T00:00:00/);
      expect(DateUtil.toString(date)).toMatch(/2019/);
      expect(DateUtil.toDate(date) instanceof Date).toBe(true);
    });
  });

  // 日期比较测试
  describe('date comparisons', () => {
    it('should compare dates with isBefore', () => {
      expect(DateUtil.isBefore('2019-01-25', '2019-01-26')).toBe(true);
      expect(DateUtil.isBefore('2019-01-25', '2019-01-24')).toBe(false);
    });

    it('should compare dates with isAfter', () => {
      expect(DateUtil.isAfter('2019-01-25', '2019-01-24')).toBe(true);
      expect(DateUtil.isAfter('2019-01-25', '2019-01-26')).toBe(false);
    });

    it('should compare dates with isSame', () => {
      expect(DateUtil.isSame('2019-01-25', '2019-01-25')).toBe(true);
      expect(DateUtil.isSame('2019-01-25', '2019-01-26')).toBe(false);
    });

    it('should compare dates with isSameOrBefore', () => {
      expect(DateUtil.isSameOrBefore('2019-01-25', '2019-01-25')).toBe(true);
      expect(DateUtil.isSameOrBefore('2019-01-25', '2019-01-26')).toBe(true);
      expect(DateUtil.isSameOrBefore('2019-01-25', '2019-01-24')).toBe(false);
    });

    it('should compare dates with isSameOrAfter', () => {
      expect(DateUtil.isSameOrAfter('2019-01-25', '2019-01-25')).toBe(true);
      expect(DateUtil.isSameOrAfter('2019-01-25', '2019-01-24')).toBe(true);
      expect(DateUtil.isSameOrAfter('2019-01-25', '2019-01-26')).toBe(false);
    });

    it('should check if date is between', () => {
      expect(DateUtil.isBetween('2019-01-25', '2019-01-24', '2019-01-26')).toBe(true);
      expect(DateUtil.isBetween('2019-01-25', '2019-01-25', '2019-01-26', null, '[)')).toBe(true);
      expect(DateUtil.isBetween('2019-01-25', '2019-01-25', '2019-01-26', null, '()')).toBe(false);
    });
  });

  // 时区相关测试
  describe('timezone operations', () => {
    it('should handle UTC conversion', () => {
      const date = DateUtil.utc('2019-01-25');
      expect(date.isUTC()).toBe(true);
      expect(date.format()).toMatch(/2019-01-25/);
    });

    it('should handle timezone conversion', () => {
      const date = DateUtil.tz('2019-01-25', 'America/New_York');
      expect(date.format('Z')).toMatch(/-0[45]:00/); // 匹配 -05:00 或 -04:00
    });

    it('should get UTC offset', () => {
      const offset = DateUtil.utcOffset('2019-01-25');
      expect(typeof offset).toBe('number');
    });
  });

  // 其他实用方法测试
  describe('utility methods', () => {
    it('should get days in month', () => {
      expect(DateUtil.daysInMonth('2019-01-25')).toBe(31);
      expect(DateUtil.daysInMonth('2019-02-25')).toBe(28);
      expect(DateUtil.daysInMonth('2020-02-25')).toBe(29);
    });

    it('should handle unix timestamp', () => {
      const timestamp = 1548345600; // 2019-01-25 00:00:00
      const date = DateUtil.fromUnix(timestamp);
      expect(date.format('YYYY-MM-DD')).toBe('2019-01-25');
    });

    it('should get value of date', () => {
      const value = DateUtil.valueOf('2019-01-25');
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThan(0);
    });
  });
});