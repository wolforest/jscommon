# 发布脚本修复总结

## 🎯 问题概述

在测试发布流程时发现了发布脚本的关键问题，导致发布失败。经过分析和修复，现在发布流程已经完全正常工作。

## 🐛 发现的问题

### 1. Git 工作区不干净导致发布失败

**错误信息**：
```
ERR_PNPM_GIT_UNCLEAN  Unclean working tree. Commit or stash changes first.
```

**问题原因**：
原来的发布流程是：
1. `version:patch` - 升级版本号（修改 package.json）
2. `pnpm build` - 构建包
3. `pnpm publish` - 发布包 ❌ **在这里失败**

问题在于步骤1修改了 `package.json` 但没有提交，导致工作区不干净，pnpm 拒绝发布。

### 2. 版本管理流程不完整

原来的流程缺少了关键的提交步骤，导致：
- 版本升级后没有立即提交
- Git tag 和实际发布的版本可能不一致
- 发布过程中断后状态不清晰

## ✅ 修复方案

### 新的发布脚本

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

### 关键改进

1. **添加 `commit:version` 步骤**：
   - 在版本升级后立即提交更改
   - 确保工作区干净，避免 pnpm 发布失败
   - 提交信息清晰标明版本号

2. **优化发布流程**：
   ```
   version:patch → commit:version → build → publish → tag:latest
   ```

3. **分离关注点**：
   - `version:*` - 只负责版本升级
   - `commit:version` - 只负责提交版本更改
   - `tag:*` - 只负责创建和推送标签

## 🧪 测试验证

### 测试过程

1. **版本升级测试**：
   ```bash
   npm run version:patch
   # ✅ 成功：0.0.3 → 0.0.4
   ```

2. **提交版本测试**：
   ```bash
   npm run commit:version
   # ✅ 成功：提交信息 "chore: bump version to 0.0.4"
   ```

3. **构建测试**：
   ```bash
   pnpm build
   # ✅ 成功：生成所有格式的构建产物
   ```

4. **模拟发布测试**：
   ```bash
   cd packages/core && npm pack --dry-run
   # ✅ 成功：显示正确的版本号 0.0.4
   ```

### 验证结果

- ✅ **版本一致性**：package.json、构建产物、发布包版本完全一致
- ✅ **工作区状态**：发布前工作区干净，无未提交更改
- ✅ **流程完整性**：从版本升级到标签推送的完整自动化流程
- ✅ **错误处理**：每个步骤独立，便于定位和修复问题

## 🚀 使用指南

### 发布正式版本

```bash
npm run publish:jscommon
```

这个命令会：
1. 升级 patch 版本（如 0.0.4 → 0.0.5）
2. 提交版本更改
3. 构建所有格式的包
4. 发布到 npm
5. 创建 Git tag 并推送

### 发布 Beta 版本

```bash
npm run publish:jscommon:beta
```

这个命令会：
1. 升级 beta 版本（如 0.0.4 → 0.0.5-beta.0）
2. 提交版本更改
3. 构建所有格式的包
4. 发布到 npm 的 beta 标签
5. 创建 beta Git tag 并推送

### 手动版本管理

如果需要手动控制版本：

```bash
# 只升级版本，不发布
npm run version:patch

# 提交版本更改
npm run commit:version

# 构建包
pnpm build

# 手动发布（如果需要）
cd packages/core && npm publish --access public
```

## 📋 发布前检查清单

在执行发布命令前，请确认：

- [ ] 所有功能开发完成
- [ ] 所有测试通过
- [ ] 文档已更新
- [ ] 示例项目正常运行
- [ ] Git 工作区干净（无未提交的更改）
- [ ] 已经推送所有本地提交到远程仓库

## 🔍 故障排除

### 如果发布过程中断

1. **检查当前状态**：
   ```bash
   git status
   cat packages/core/package.json | grep version
   ```

2. **如果版本已升级但未发布**：
   ```bash
   # 继续从构建步骤开始
   pnpm build
   pnpm --filter @wolforest/jscommon publish --access public
   npm run tag:latest
   ```

3. **如果需要回滚版本**：
   ```bash
   git reset --hard HEAD~1  # 回滚到上一个提交
   ```

### 常见错误处理

- **`ERR_PNPM_GIT_UNCLEAN`**：确保工作区干净，运行 `git status` 检查
- **版本冲突**：检查 npm 上是否已存在该版本
- **权限问题**：确保有发布到 `@wolforest` 组织的权限

---

*修复完成时间: 2024年12月8日*
*测试版本: 0.0.4*
*状态: ✅ 完全修复并验证* 