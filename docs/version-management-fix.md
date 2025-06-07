# 版本管理修复说明

## 🐛 修复的问题

### 1. 发布脚本版本不一致问题

**问题描述**：
原来的发布脚本 `publish:jscommon` 存在版本不一致的问题：
1. 先发布包（使用当前版本，如 0.0.1）
2. 然后才升级版本并打 tag（生成 0.0.2 的 tag）

这导致发布到 npm 的包版本和 Git tag 版本不匹配。

**进一步发现的问题**：
在修复过程中发现，升级版本后如果不立即提交，pnpm publish 会因为工作区不干净而失败。

**最终修复方案**：
重新设计发布流程，确保版本号一致性和工作区干净：

```json
{
  "scripts": {
    "publish:jscommon": "npm run version:patch && npm run commit:version && pnpm build && pnpm --filter @wolforest/jscommon publish --access public && npm run tag:latest",
    "publish:jscommon:beta": "npm run version:beta && npm run commit:version && pnpm build && pnpm --filter @wolforest/jscommon publish --tag beta && npm run tag:beta",
    "version:patch": "cd packages/core && npm version patch --no-git-tag-version",
    "version:beta": "cd packages/core && npm version prerelease --preid=beta --no-git-tag-version",
    "commit:version": "git add packages/core/package.json && git commit -m \"chore: bump version to $(cd packages/core && node -p \"require('./package.json').version\")\"",
    "tag:latest": "cd packages/core && git tag v$(node -p \"require('./package.json').version\") && git push && git push --tags",
    "tag:beta": "cd packages/core && git tag v$(node -p \"require('./package.json').version\")-beta && git push && git push --tags"
  }
}
```

**新的发布流程**：
1. `version:patch` - 先升级版本号
2. `commit:version` - 提交版本更改，确保工作区干净
3. `pnpm build` - 构建包
4. `pnpm publish` - 发布包（使用新版本号）
5. `tag:latest` - 创建对应的 Git tag 并推送

### 2. React 示例硬编码版本问题

**问题描述**：
React 示例中的版本号是硬编码的：
```typescript
const [packageInfo, setPackageInfo] = useState<PackageInfo>({
  version: '0.0.1-beta.1', // 硬编码版本
  // ...
});
```

这导致每次发布新版本时都需要手动更新示例代码。

**修复方案**：
1. **Vite 配置注入版本**：
```typescript
// vite.config.ts
import { readFileSync } from 'fs'

const jscommonPkg = JSON.parse(
  readFileSync(resolve(__dirname, '../../packages/core/package.json'), 'utf-8')
)

export default defineConfig({
  // ...
  define: {
    __JSCOMMON_VERSION__: JSON.stringify(jscommonPkg.version)
  }
})
```

2. **类型声明**：
```typescript
// vite-env.d.ts
/// <reference types="vite/client" />

declare const __JSCOMMON_VERSION__: string;
```

3. **动态使用版本**：
```typescript
// App.tsx
const packageInfo: PackageInfo = {
  version: __JSCOMMON_VERSION__, // 动态读取版本
  bundleSize: '484KB',
  gzipSize: '136KB',
  modules: 21,
  totalMethods: 409
};
```

## ✅ 修复结果

### 发布脚本优化
- ✅ **版本一致性**：确保发布的包版本和 Git tag 版本一致
- ✅ **流程清晰**：分离版本升级、构建、发布、标记步骤
- ✅ **支持 Beta 版本**：独立的 beta 版本发布流程
- ✅ **自动化程度高**：一条命令完成整个发布流程

### 版本管理自动化
- ✅ **动态版本读取**：示例自动显示当前包版本
- ✅ **构建时注入**：通过 Vite 在构建时注入版本信息
- ✅ **类型安全**：完整的 TypeScript 类型支持
- ✅ **维护简化**：无需手动更新示例中的版本号

## 🚀 使用方法

### 发布正式版本
```bash
npm run publish:jscommon
```
这将：
1. 升级 patch 版本（如 0.0.1 → 0.0.2）
2. 构建包
3. 发布到 npm
4. 创建 Git tag 并推送

### 发布 Beta 版本
```bash
npm run publish:jscommon:beta
```
这将：
1. 构建包
2. 发布到 npm 的 beta tag
3. 创建 beta Git tag 并推送

### 手动版本管理
```bash
# 升级 patch 版本
npm run version:patch

# 升级 beta 版本
npm run version:beta
```

## 📋 验证清单

发布前请确认：
- [ ] 所有测试通过
- [ ] 文档已更新
- [ ] 示例正常运行
- [ ] 版本号符合语义化版本规范
- [ ] Git 工作区干净（无未提交的更改）

## 🔄 版本号规范

项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **MAJOR.MINOR.PATCH** (如 1.0.0)
  - **MAJOR**：不兼容的 API 修改
  - **MINOR**：向下兼容的功能性新增
  - **PATCH**：向下兼容的问题修正

- **Beta 版本** (如 1.0.0-beta.1)
  - 用于预发布测试
  - 不建议在生产环境使用

---

*修复时间: 2024年12月8日*
*当前版本: 0.0.4* 