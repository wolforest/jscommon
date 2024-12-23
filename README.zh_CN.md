# @wolforest/jscommon
JavaScript/TypeScript 的简单工具集合，为前端应用提供你所需要的全部工具函数，支持完整的 Tree-shaking。

简体中文 | [English](./README.md)

![](/design.png)

## ✨ 特性
+ 📦 支持完整的 Tree-shaking，真正按需加载
+ 🔧 完整的 TypeScript 类型支持
+ 🎯 统一的 API 入口，无需重复安装多个依赖
+ 🚀 零配置，开箱即用
+ 📚 完整的类型提示

## 📦 安装
```bash
npm install @wolforest/jscommon

# or
pnpm add @wolforest/jscommon

# or
yarn add @wolforest/jscommon
```

## 🚀 使用示例

```typescript
// Lodash 工具函数
import { isEmpty, get, merge } from '@wolforest/jscommon';
isEmpty([]);  // true

// 日期处理
import { format, year } from '@wolforest/jscommon';
format(new Date(), 'YYYY-MM-DD');  // '2024-03-21'

// React Hooks
import { useRequest, useMount } from '@wolforest/jscommon';
const { data, loading } = useRequest('/api/users');

// 网络请求
import { request } from '@wolforest/jscommon';
await request.get('/api/users');
await request.post('/api/users', { name: 'John' });

// Vue Composables
import { useLocalStorage, useMouse } from '@wolforest/jscommon';
const storage = useLocalStorage('key', 'default');

// URL 参数处理
import { qs, queryString } from '@wolforest/jscommon';
qs.stringify({ page: 1, size: 10 });

// 中文拼音
import { pinyin } from '@wolforest/jscommon';
pinyin('中文');  // 'zhongwen'

// 精确数学计算
import { Big } from '@wolforest/jscommon';
new Big('0.1').plus('0.2').toString();  // '0.3'

// CSS 类名处理
import { classNames } from '@wolforest/jscommon';
classNames('foo', { bar: true });  // 'foo bar'
```

## 📚 集成的工具库
| 分类 | 工具库 | 说明 |
| --- | --- | --- |
| 通用工具 | lodash-es | JavaScript 实用工具库，提供数组、对象、字符串等处理函数 |
| 日期处理 | dayjs | 轻量级日期处理库，Moment.js 的现代化替代品 |
| React Hooks | ahooks | 高质量和可靠的 React Hooks 库 |
| 函数式编程 | ramda | 实用的函数式编程工具库 |
| 网络请求 | axios | 基于 Promise 的 HTTP 客户端 |
| Vue 工具 | @vueuse/core | Vue Composition API 的实用工具集 |
| URL 处理 | qs | 查询字符串解析和字符串化 |
| URL 处理 | query-string | 现代化的 URL 查询字符串处理工具 |
| 中文处理 | pinyin-pro | 专业的中文拼音转换工具 |
| 数值计算 | big.js | 任意精度的十进制计算库 |
| 样式处理 | classnames | 条件性地将类名连接在一起 |


## 🔨 按需加载
得益于 Tree-shaking 的支持，你只需要导入需要使用的函数，打包工具会自动移除未使用的代码：

```typescript
// 只会打包 isEmpty 相关的代码
import { isEmpty } from '@wolforest/jscommon';

// 只会打包 format 相关的代码
import { format } from '@wolforest/jscommon';
```

## 🛠️ 开发指南
```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test
```

## 🤝 贡献指南
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📝 版本日志
查看 [CHANGELOG.md](./CHANGELOG.md) 了解详细的更新历史。

## 📄 许可证
[MIT](./LICENSE) © Wolforest

## 🔗 相关链接
+ [在线文档](https://1t1d.com)
+ [问题反馈](https://github.com/wolforest/jscommon/issues)
+ [更新日志](./CHANGELOG.md)
+ [贡献指南](./CONTRIBUTING.md)

## 🎯 未来规划
- [ ] 添加更多实用工具库
- [ ] 提供在线文档和演示
- [ ] 添加单元测试
- [ ] 支持更多构建工具和框架

## ☎️ 联系我们
请关注我们的公众号，《jscommon实践》的内容我们后期会周更到公众号上：

![](/qr_code_for_team.png)