# @wolforest/jscommon

[![npm version](https://badge.fury.io/js/@wolforest%2Fjscommon.svg)](https://badge.fury.io/js/@wolforest%2Fjscommon)
[![npm downloads](https://img.shields.io/npm/dm/@wolforest/jscommon.svg)](https://www.npmjs.com/package/@wolforest/jscommon)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Tree Shaking](https://img.shields.io/badge/Tree%20Shaking-Supported-green.svg)](https://webpack.js.org/guides/tree-shaking/)

A simple collection of JavaScript/TypeScript utilities that provides all the utility functions you need for frontend applications, with full Tree-shaking support.

English | [简体中文](./README.zh_CN.md)

![](/design_en.png)

## ✨ Features

- 📦 **Tree-shaking Friendly** - Support on-demand imports to reduce bundle size
- 🔧 **TypeScript First** - Complete type definitions and type safety
- 🎯 **Modular Design** - Organized by functional domains, easy to use and maintain
- 🚀 **Zero Configuration** - Works out of the box, no additional configuration needed
- 📚 **Complete Documentation** - Detailed API documentation and usage examples
- 🧪 **Test Coverage** - Complete unit tests ensure code quality

## 📦 Installation

```bash
# npm
npm install @wolforest/jscommon

# yarn
yarn add @wolforest/jscommon

# pnpm
pnpm add @wolforest/jscommon
```

## 🚀 Quick Start

### Basic Usage

```typescript
// Import the required utility functions
import { ArrayUtil, StringUtil, DateUtil } from '@wolforest/jscommon';

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = ArrayUtil.map(numbers, x => x * 2); // [2, 4, 6, 8, 10]
const filtered = ArrayUtil.filter(numbers, x => x > 3); // [4, 5]

// String operations
const text = 'hello world';
const capitalized = StringUtil.capitalize(text); // 'Hello world'
const camelCase = StringUtil.toCamelCase('hello-world'); // 'helloWorld'

// Date operations
const now = new Date();
const formatted = DateUtil.format(now, 'YYYY-MM-DD HH:mm:ss');
const tomorrow = DateUtil.addDays(now, 1);
```

### On-demand Import

```typescript
// Import only the modules you need, supports Tree-shaking
import { ArrayUtil } from '@wolforest/jscommon/lang';
import { URLUtil } from '@wolforest/jscommon/net';
import { StorageUtil } from '@wolforest/jscommon/storage';
```

## 📚 API Documentation

### Lang Module - Language Processing Tools

#### ArrayUtil - Array Utilities

```typescript
import { ArrayUtil } from '@wolforest/jscommon';

// Array operations
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

#### StringUtil - String Utilities

```typescript
import { StringUtil } from '@wolforest/jscommon';

// String operations
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

#### ObjectUtil - Object Utilities

```typescript
import { ObjectUtil } from '@wolforest/jscommon';

// Object operations
ObjectUtil.isEmpty({}); // true
ObjectUtil.isNotEmpty({ a: 1 }); // true
ObjectUtil.keys({ a: 1, b: 2 }); // ['a', 'b']
ObjectUtil.values({ a: 1, b: 2 }); // [1, 2]
ObjectUtil.pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
ObjectUtil.omit({ a: 1, b: 2, c: 3 }, ['b']); // { a: 1, c: 3 }
ObjectUtil.merge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
ObjectUtil.clone({ a: { b: 1 } }); // Deep clone
```

#### NumberUtil - Number Utilities

```typescript
import { NumberUtil } from '@wolforest/jscommon';

// Number operations
NumberUtil.isInteger(42); // true
NumberUtil.isFloat(3.14); // true
NumberUtil.toFixed(3.14159, 2); // '3.14'
NumberUtil.random(1, 10); // Random number between 1-10
NumberUtil.clamp(15, 1, 10); // 10 (clamp to 1-10 range)
NumberUtil.inRange(5, 1, 10); // true
```

#### DateUtil - Date Utilities

```typescript
import { DateUtil } from '@wolforest/jscommon';

// Date operations
DateUtil.format(new Date(), 'YYYY-MM-DD'); // '2024-03-21'
DateUtil.parse('2024-03-21', 'YYYY-MM-DD'); // Date object
DateUtil.addDays(new Date(), 7); // 7 days later
DateUtil.addMonths(new Date(), 1); // 1 month later
DateUtil.startOfDay(new Date()); // Start of the day
DateUtil.endOfDay(new Date()); // End of the day
DateUtil.isSameDay(date1, date2); // Check if same day
DateUtil.diffInDays(date1, date2); // Difference in days
```

#### DecimalUtil - Precise Calculation Utilities

```typescript
import { DecimalUtil } from '@wolforest/jscommon';

// Precise mathematical calculations
DecimalUtil.add(0.1, 0.2); // '0.3' (avoid floating point precision issues)
DecimalUtil.subtract(1, 0.9); // '0.1'
DecimalUtil.multiply(0.1, 3); // '0.3'
DecimalUtil.divide(1, 3); // '0.333333...'
DecimalUtil.round(3.14159, 2); // '3.14'
DecimalUtil.compare(0.1, 0.2); // -1 (less than)
```

### Net Module - Network Tools

#### URLUtil - URL Utilities

```typescript
import { URLUtil } from '@wolforest/jscommon';

// URL operations
URLUtil.parseQuery('?name=john&age=30'); // { name: 'john', age: '30' }
URLUtil.stringifyQuery({ name: 'john', age: 30 }); // 'name=john&age=30'
URLUtil.addQuery('https://example.com', { page: 1 }); // 'https://example.com?page=1'
URLUtil.removeQuery('https://example.com?page=1', 'page'); // 'https://example.com'
URLUtil.isValidUrl('https://example.com'); // true
URLUtil.getDomain('https://example.com/path'); // 'example.com'
```

### Storage Module - Storage Tools

#### StorageUtil - Local Storage Utilities

```typescript
import { StorageUtil } from '@wolforest/jscommon';

// localStorage operations
StorageUtil.setItem('key', { name: 'john' }); // Auto serialization
StorageUtil.getItem('key'); // Auto deserialization
StorageUtil.removeItem('key');
StorageUtil.clear();
StorageUtil.hasItem('key'); // boolean

// sessionStorage operations
StorageUtil.setSessionItem('key', 'value');
StorageUtil.getSessionItem('key');
StorageUtil.removeSessionItem('key');
```

#### CookieUtil - Cookie Utilities

```typescript
import { CookieUtil } from '@wolforest/jscommon';

// Cookie operations
CookieUtil.set('name', 'john', { expires: 7 }); // Expires in 7 days
CookieUtil.get('name'); // 'john'
CookieUtil.remove('name');
CookieUtil.getAll(); // All cookies
```

#### IDBUtil - IndexedDB Utilities

```typescript
import { IDBUtil } from '@wolforest/jscommon';

// IndexedDB operations
const db = new IDBUtil('myDB', 1);
await db.open();
await db.add('users', { id: 1, name: 'john' });
const user = await db.get('users', 1);
await db.update('users', { id: 1, name: 'jane' });
await db.delete('users', 1);
```

### Style Module - Style Tools

#### ClassNamesUtil - CSS Class Name Utilities

```typescript
import { ClassNamesUtil } from '@wolforest/jscommon';

// Class name handling
ClassNamesUtil.combine('btn', 'btn-primary'); // 'btn btn-primary'
ClassNamesUtil.conditional('active', true); // 'active'
ClassNamesUtil.conditional('hidden', false); // ''
ClassNamesUtil.merge({
  'btn': true,
  'btn-primary': true,
  'disabled': false
}); // 'btn btn-primary'
```

#### AnimateUtil - Animation Utilities

```typescript
import { AnimateUtil } from '@wolforest/jscommon';

// Animation operations
AnimateUtil.fadeIn(element, 300); // Fade in animation
AnimateUtil.fadeOut(element, 300); // Fade out animation
AnimateUtil.slideUp(element, 300); // Slide up
AnimateUtil.slideDown(element, 300); // Slide down
```

### Debug Module - Debug Tools

#### VConsoleUtil - Mobile Debug Utilities

```typescript
import { VConsoleUtil } from '@wolforest/jscommon';

// Mobile debugging
VConsoleUtil.init(); // Initialize vConsole
VConsoleUtil.show(); // Show debug panel
VConsoleUtil.hide(); // Hide debug panel
VConsoleUtil.destroy(); // Destroy instance
```

## 🔧 Advanced Usage

### Modular Import

```typescript
// Import entire module
import * as JSCommon from '@wolforest/jscommon';

// Import specific modules
import { ArrayUtil, StringUtil } from '@wolforest/jscommon/lang';
import { URLUtil } from '@wolforest/jscommon/net';
import { StorageUtil } from '@wolforest/jscommon/storage';
import { ClassNamesUtil } from '@wolforest/jscommon/style';
import { VConsoleUtil } from '@wolforest/jscommon/debug';
```

### TypeScript Support

```typescript
// Complete type support
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

// TypeScript will automatically infer types
const userNames = ArrayUtil.map(users, user => user.name); // string[]
const firstUser = ArrayUtil.first(users); // User | undefined
```

## 📊 Bundle Size

| Import Method | Size (gzipped) |
|---------------|----------------|
| Full Import | ~140KB |
| Module Import | ~10-50KB |
| Function Import | ~1-10KB |

## 🔗 Related Links

- [GitHub Repository](https://github.com/wolforest/jscommon)
- [Issue Tracker](https://github.com/wolforest/jscommon/issues)
- [Changelog](https://github.com/wolforest/jscommon/blob/main/CHANGELOG.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/wolforest/jscommon/blob/main/CONTRIBUTING.md).

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 License

[MIT](https://github.com/wolforest/jscommon/blob/main/LICENSE) © Wolforest

## 🙋‍♂️ Support

If this project helps you, please give us a ⭐️!

For questions or suggestions, please contact us through:
- Submit an [Issue](https://github.com/wolforest/jscommon/issues)

## ☎️ Contact us

![](/qr_code_for_team.png)