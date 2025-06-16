# @wolforest/jscommon

[![npm version](https://badge.fury.io/js/@wolforest%2Fjscommon.svg)](https://badge.fury.io/js/@wolforest%2Fjscommon)
[![npm downloads](https://img.shields.io/npm/dm/@wolforest/jscommon.svg)](https://www.npmjs.com/package/@wolforest/jscommon)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Tree Shaking](https://img.shields.io/badge/Tree%20Shaking-Supported-green.svg)](https://webpack.js.org/guides/tree-shaking/)

JavaScript/TypeScript 的简单工具集合，为前端应用提供你所需要的全部工具函数，支持粗颗粒度的 Tree-shaking。

简体中文 | [English](./README.md)

![](/design.png)

## ✨ 特性
 
✅ 🔧 **TypeScript 优先** - 完整的类型定义和类型安全
✅ 🎯 **模块化设计** - 按功能领域组织，易于使用和维护
✅ 🚀 **零配置** - 开箱即用，无需额外配置
✅ 📚 **完整文档** - 详细的 API 文档和使用示例
✅ 🧪 **测试覆盖** - 完整的单元测试保证代码质量
☑️ 📦 **Tree-shaking 友好** - 支持粗颗粒度的按需导入，减少打包体积

## 📦 安装

```bash
# npm
npm install @wolforest/jscommon

# yarn
yarn add @wolforest/jscommon

# pnpm
pnpm add @wolforest/jscommon
```

## 🚀 快速开始

### 基础使用

```typescript
// 导入所需的工具函数
import { ArrayUtil, StringUtil, DateUtil } from '@wolforest/jscommon';

// 数组操作
const numbers = [1, 2, 3, 4, 5];
const doubled = ArrayUtil.map(numbers, x => x * 2); // [2, 4, 6, 8, 10]
const filtered = ArrayUtil.filter(numbers, x => x > 3); // [4, 5]

// 字符串操作
const text = 'hello world';
const capitalized = StringUtil.capitalize(text); // 'Hello world'
const camelCase = StringUtil.toCamelCase('hello-world'); // 'helloWorld'

// 日期操作
const now = new Date();
const formatted = DateUtil.format(now, 'YYYY-MM-DD HH:mm:ss');
const tomorrow = DateUtil.addDays(now, 1);
```

### 按需导入

```typescript
// 只导入需要的模块，支持 Tree-shaking
import { ArrayUtil } from '@wolforest/jscommon/lang';
import { URLUtil } from '@wolforest/jscommon/net';
import { StorageUtil } from '@wolforest/jscommon/storage';
```

## 📚 集成的第三方库

本工具库集成了以下常用的第三方库，无需单独安装：

| 分类 | 工具库 | 说明 |
| --- | --- | --- |
| 通用工具 | lodash-es | JavaScript 实用工具库，提供数组、对象、字符串等处理函数 |
| 日期处理 | dayjs | 轻量级日期处理库，Moment.js 的现代化替代品 |
| 数值计算 | big.js | 任意精度的十进制计算库 |
| 样式处理 | classnames | 条件性地将类名连接在一起 |
| 动画效果 | animate.css | CSS 动画库 |
| 存储工具 | localforage | 异步存储库，支持 IndexedDB、WebSQL、localStorage |
| Cookie 处理 | js-cookie | 简单轻量的 JavaScript Cookie 处理库 |
| URL 处理 | qs | 查询字符串解析和字符串化 |
| 表单验证 | validator | 字符串验证和清理库 |
| 移动调试 | vconsole | 移动端网页调试工具 |

## 📚 API 文档

### Lang 模块 - 语言处理工具

#### ArrayUtil - 数组工具

```typescript
import { ArrayUtil } from '@wolforest/jscommon';

// 数组操作
ArrayUtil.isEmpty([]); // true
ArrayUtil.isNotEmpty([1, 2, 3]); // true
ArrayUtil.first([1, 2, 3]); // 1
ArrayUtil.last([1, 2, 3]); // 3
ArrayUtil.chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
ArrayUtil.flatten([[1, 2], [3, 4]]); // [1, 2, 3, 4]
ArrayUtil.unique([1, 2, 2, 3]); // [1, 2, 3]
ArrayUtil.intersection([1, 2, 3], [2, 3, 4]); // [2, 3]
ArrayUtil.difference([1, 2, 3], [2, 3, 4]); // [1]
```

#### StringUtil - 字符串工具

```typescript
import { StringUtil } from '@wolforest/jscommon';

// 字符串操作
StringUtil.isEmpty(''); // true
StringUtil.isBlank('  '); // true
StringUtil.capitalize('hello'); // 'Hello'
StringUtil.toCamelCase('hello-world'); // 'helloWorld'
StringUtil.toKebabCase('helloWorld'); // 'hello-world'
StringUtil.toSnakeCase('helloWorld'); // 'hello_world'
StringUtil.truncate('hello world', 5); // 'hello...'
StringUtil.padStart('5', 3, '0'); // '005'
StringUtil.reverse('hello'); // 'olleh'
```

#### ObjectUtil - 对象工具

```typescript
import { ObjectUtil } from '@wolforest/jscommon';

// 对象操作
ObjectUtil.isEmpty({}); // true
ObjectUtil.isNotEmpty({ a: 1 }); // true
ObjectUtil.keys({ a: 1, b: 2 }); // ['a', 'b']
ObjectUtil.values({ a: 1, b: 2 }); // [1, 2]
ObjectUtil.pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
ObjectUtil.omit({ a: 1, b: 2, c: 3 }, ['b']); // { a: 1, c: 3 }
ObjectUtil.merge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
ObjectUtil.clone({ a: { b: 1 } }); // 深拷贝
```

#### NumberUtil - 数字工具

```typescript
import { NumberUtil } from '@wolforest/jscommon';

// 数字操作
NumberUtil.isInteger(42); // true
NumberUtil.isFloat(3.14); // true
NumberUtil.toFixed(3.14159, 2); // '3.14'
NumberUtil.random(1, 10); // 1-10 之间的随机数
NumberUtil.clamp(15, 1, 10); // 10 (限制在 1-10 范围内)
NumberUtil.inRange(5, 1, 10); // true
```

#### DateUtil - 日期工具

```typescript
import { DateUtil } from '@wolforest/jscommon';

// 日期操作
DateUtil.format(new Date(), 'YYYY-MM-DD'); // '2024-03-21'
DateUtil.parse('2024-03-21', 'YYYY-MM-DD'); // Date 对象
DateUtil.addDays(new Date(), 7); // 7天后
DateUtil.addMonths(new Date(), 1); // 1个月后
DateUtil.startOfDay(new Date()); // 当天开始时间
DateUtil.endOfDay(new Date()); // 当天结束时间
DateUtil.isSameDay(date1, date2); // 是否同一天
DateUtil.diffInDays(date1, date2); // 相差天数
```

#### DecimalUtil - 精确计算工具

```typescript
import { DecimalUtil } from '@wolforest/jscommon';

// 精确数学计算
DecimalUtil.add(0.1, 0.2); // '0.3' (避免浮点数精度问题)
DecimalUtil.subtract(1, 0.9); // '0.1'
DecimalUtil.multiply(0.1, 3); // '0.3'
DecimalUtil.divide(1, 3); // '0.333333...'
DecimalUtil.round(3.14159, 2); // '3.14'
DecimalUtil.compare(0.1, 0.2); // -1 (小于)
```

### Net 模块 - 网络工具

#### URLUtil - URL 工具

```typescript
import { URLUtil } from '@wolforest/jscommon';

// URL 操作
URLUtil.parseQuery('?name=john&age=30'); // { name: 'john', age: '30' }
URLUtil.stringifyQuery({ name: 'john', age: 30 }); // 'name=john&age=30'
URLUtil.addQuery('https://example.com', { page: 1 }); // 'https://example.com?page=1'
URLUtil.removeQuery('https://example.com?page=1', 'page'); // 'https://example.com'
URLUtil.isValidUrl('https://example.com'); // true
URLUtil.getDomain('https://example.com/path'); // 'example.com'
```

### Storage 模块 - 存储工具

#### StorageUtil - 本地存储工具

```typescript
import { StorageUtil } from '@wolforest/jscommon';

// localStorage 操作
StorageUtil.setItem('key', { name: 'john' }); // 自动序列化
StorageUtil.getItem('key'); // 自动反序列化
StorageUtil.removeItem('key');
StorageUtil.clear();
StorageUtil.hasItem('key'); // boolean

// sessionStorage 操作
StorageUtil.setSessionItem('key', 'value');
StorageUtil.getSessionItem('key');
StorageUtil.removeSessionItem('key');
```

#### CookieUtil - Cookie 工具

```typescript
import { CookieUtil } from '@wolforest/jscommon';

// Cookie 操作
CookieUtil.set('name', 'john', { expires: 7 }); // 7天后过期
CookieUtil.get('name'); // 'john'
CookieUtil.remove('name');
CookieUtil.getAll(); // 所有 cookie
```

#### IDBUtil - IndexedDB 工具

```typescript
import { IDBUtil } from '@wolforest/jscommon';

// IndexedDB 操作
const db = new IDBUtil('myDB', 1);
await db.open();
await db.add('users', { id: 1, name: 'john' });
const user = await db.get('users', 1);
await db.update('users', { id: 1, name: 'jane' });
await db.delete('users', 1);
```

### Style 模块 - 样式工具

#### ClassNamesUtil - CSS 类名工具

```typescript
import { ClassNamesUtil } from '@wolforest/jscommon';

// 类名处理
ClassNamesUtil.combine('btn', 'btn-primary'); // 'btn btn-primary'
ClassNamesUtil.conditional('active', true); // 'active'
ClassNamesUtil.conditional('hidden', false); // ''
ClassNamesUtil.merge({
  'btn': true,
  'btn-primary': true,
  'disabled': false
}); // 'btn btn-primary'
```

#### AnimateUtil - 动画工具

```typescript
import { AnimateUtil } from '@wolforest/jscommon';

// 动画操作
AnimateUtil.fadeIn(element, 300); // 淡入动画
AnimateUtil.fadeOut(element, 300); // 淡出动画
AnimateUtil.slideUp(element, 300); // 滑动向上
AnimateUtil.slideDown(element, 300); // 滑动向下
```

### Debug 模块 - 调试工具

#### VConsoleUtil - 移动端调试工具

```typescript
import { VConsoleUtil } from '@wolforest/jscommon';

// 移动端调试
VConsoleUtil.init(); // 初始化 vConsole
VConsoleUtil.show(); // 显示调试面板
VConsoleUtil.hide(); // 隐藏调试面板
VConsoleUtil.destroy(); // 销毁实例
```

## 🔧 高级用法

### 模块化导入

```typescript
// 导入整个模块
import * as JSCommon from '@wolforest/jscommon';

// 导入特定模块
import { ArrayUtil, StringUtil } from '@wolforest/jscommon/lang';
import { URLUtil } from '@wolforest/jscommon/net';
import { StorageUtil } from '@wolforest/jscommon/storage';
import { ClassNamesUtil } from '@wolforest/jscommon/style';
import { VConsoleUtil } from '@wolforest/jscommon/debug';
```

### TypeScript 支持

```typescript
// 完整的类型支持
import { ArrayUtil, ObjectUtil } from '@wolforest/jscommon';

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

// TypeScript 会自动推断类型
const userNames = ArrayUtil.map(users, user => user.name); // string[]
const firstUser = ArrayUtil.first(users); // User | undefined
```

## 📊 包大小

根据实际构建结果，不同导入方式的包大小如下：

| 导入方式 | 大小 (gzipped) | 说明 |
|---------|---------------|------|
| 完整导入 (UMD) | ~140KB | 包含所有功能和第三方库 |
| 模块导入 | ~10-50KB | 按模块导入，如 lang、storage 等 |
| 按需导入 | ~1-10KB | 只导入具体的工具类 |

> 💡 **建议**: 使用按需导入或模块导入方式，可以显著减少打包体积。

## 🔗 相关链接

- [GitHub 仓库](https://github.com/wolforest/jscommon)
- [问题反馈](https://github.com/wolforest/jscommon/issues)
- [更新日志](https://github.com/wolforest/jscommon/blob/main/CHANGELOG.md)

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](https://github.com/wolforest/jscommon/blob/main/CONTRIBUTING.md)。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

[MIT](https://github.com/wolforest/jscommon/blob/main/LICENSE) © Wolforest

## 🙋‍♂️ 支持

如果这个项目对你有帮助，请给我们一个 ⭐️！

如有问题或建议，请通过以下方式联系我们：
- 提交 [Issue](https://github.com/wolforest/jscommon/issues)

## ☎️ 联系我们

请关注我们的公众号，《jscommon实践》的内容我们后期会周更到公众号上：

![](/qr_code_for_team.png)
