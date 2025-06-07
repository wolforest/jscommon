# @wolforest/jscommon

simple utils facade for javascripThe simple utils Facade for javascript/typescript，the only utils you need for frontEnd application

[简体中文](./README.zh_CN.md) | English

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

```typescript
// Import the required utility functions
import { ArrayUtil, StringUtil, DateUtil } from '@wolforest/jscommon';

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = ArrayUtil.map(numbers, x => x * 2); // [2, 4, 6, 8, 10]

// String operations
const text = 'hello world';
const capitalized = StringUtil.capitalize(text); // 'Hello world'

// Date operations
const now = new Date();
const formatted = DateUtil.format(now, 'YYYY-MM-DD HH:mm:ss');
```

## 📚 Documentation

For detailed documentation, please visit:
- [Core Package README](./packages/core/README.md) - Complete API documentation
- [Examples](./examples/) - Usage examples for different frameworks

## 🔗 Links

- [GitHub Repository](https://github.com/wolforest/jscommon)
- [npm Package](https://www.npmjs.com/package/@wolforest/jscommon)
- [Issue Tracker](https://github.com/wolforest/jscommon/issues)

## ☎️ Contact us

![](/qr_code_for_team.png)