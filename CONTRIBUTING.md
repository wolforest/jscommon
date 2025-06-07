# 贡献指南

感谢您对 `@wolforest/jscommon` 项目的关注！我们欢迎任何形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- ✨ 添加新功能

## 🚀 快速开始

### 开发环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0

### 本地开发设置

1. **Fork 并克隆仓库**
   ```bash
   git clone https://github.com/your-username/jscommon.git
   cd jscommon
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **构建项目**
   ```bash
   pnpm build
   ```

4. **运行测试**
   ```bash
   pnpm test
   ```

5. **启动开发模式**
   ```bash
   pnpm dev
   ```

## 📋 项目结构

```
jscommon/
├── packages/
│   └── core/                 # 核心包
│       ├── src/
│       │   ├── lang/        # 语言处理工具
│       │   ├── net/         # 网络工具
│       │   ├── storage/     # 存储工具
│       │   ├── style/       # 样式工具
│       │   └── debug/       # 调试工具
│       └── test/            # 测试文件
├── examples/                # 示例项目
│   ├── react-demo/
│   ├── vue-demo/
│   └── taro-demo/
└── docs/                    # 文档
```

## 🐛 报告 Bug

在报告 Bug 之前，请先检查 [Issues](https://github.com/wolforest/jscommon/issues) 中是否已有相同问题。

### Bug 报告模板

```markdown
**Bug 描述**
简洁明了地描述这个 Bug。

**复现步骤**
1. 执行 '...'
2. 点击 '....'
3. 滚动到 '....'
4. 看到错误

**期望行为**
描述您期望发生的行为。

**实际行为**
描述实际发生的行为。

**环境信息**
- OS: [e.g. macOS, Windows, Linux]
- Node.js 版本: [e.g. 18.17.0]
- 包版本: [e.g. 1.0.0]
- 浏览器: [e.g. Chrome 91, Safari 14]

**额外信息**
添加任何其他有助于解决问题的信息。
```

## 💡 功能建议

我们欢迎新功能建议！请通过 [Issues](https://github.com/wolforest/jscommon/issues) 提交，并使用 `enhancement` 标签。

### 功能建议模板

```markdown
**功能描述**
简洁明了地描述您希望添加的功能。

**问题背景**
描述这个功能要解决的问题。

**解决方案**
描述您希望的解决方案。

**替代方案**
描述您考虑过的其他解决方案。

**额外信息**
添加任何其他相关信息或截图。
```

## 🔧 代码贡献

### 开发流程

1. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

2. **编写代码**
   - 遵循现有的代码风格
   - 添加必要的测试
   - 确保所有测试通过

3. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **创建 Pull Request**
   - 填写 PR 模板
   - 关联相关的 Issue
   - 等待代码审查

### 代码规范

#### 命名规范
- **文件名**: 使用 PascalCase，如 `ArrayUtil.ts`
- **类名**: 使用 PascalCase，如 `ArrayUtil`
- **方法名**: 使用 camelCase，如 `isEmpty`
- **常量**: 使用 UPPER_SNAKE_CASE，如 `DEFAULT_VALUE`

#### 代码风格
- 使用 TypeScript
- 每个工具类都应该是静态方法
- 添加完整的 JSDoc 注释
- 保持函数简洁，单一职责

#### 示例代码结构
```typescript
/**
 * 数组工具类
 */
export class ArrayUtil {
  /**
   * 检查数组是否为空
   * @param arr 要检查的数组
   * @returns 如果数组为空返回 true，否则返回 false
   * @example
   * ```typescript
   * ArrayUtil.isEmpty([]); // true
   * ArrayUtil.isEmpty([1, 2, 3]); // false
   * ```
   */
  static isEmpty<T>(arr: T[]): boolean {
    return !arr || arr.length === 0;
  }
}
```

### 测试规范

- 每个新功能都必须包含测试
- 测试文件位于 `packages/core/test/` 目录
- 使用 Vitest 作为测试框架
- 测试覆盖率应保持在 80% 以上

#### 测试示例
```typescript
import { describe, it, expect } from 'vitest';
import { ArrayUtil } from '../src/lang/ArrayUtil';

describe('ArrayUtil', () => {
  describe('isEmpty', () => {
    it('should return true for empty array', () => {
      expect(ArrayUtil.isEmpty([])).toBe(true);
    });

    it('should return false for non-empty array', () => {
      expect(ArrayUtil.isEmpty([1, 2, 3])).toBe(false);
    });
  });
});
```

### 提交信息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### 类型说明
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

#### 示例
```
feat(lang): add StringUtil.truncate method

Add truncate method to StringUtil for string truncation with ellipsis support.

Closes #123
```

## 📝 文档贡献

文档同样重要！您可以：

- 改进现有文档
- 添加使用示例
- 翻译文档
- 修复文档中的错误

## 🔍 代码审查

所有的 Pull Request 都需要经过代码审查：

- 至少需要一个维护者的批准
- 确保所有 CI 检查通过
- 解决所有审查意见

## 📦 发布流程

项目维护者负责版本发布：

1. 更新版本号
2. 更新 CHANGELOG.md
3. 创建 Git 标签
4. 发布到 npm

## 🤝 行为准则

请遵守我们的 [行为准则](CODE_OF_CONDUCT.md)，营造友好的社区环境。

## ❓ 获得帮助

如果您有任何问题，可以通过以下方式获得帮助：

- 查看 [文档](https://github.com/wolforest/jscommon#readme)
- 搜索现有的 [Issues](https://github.com/wolforest/jscommon/issues)
- 创建新的 Issue
- 加入我们的讨论群

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

再次感谢您的贡献！🎉 