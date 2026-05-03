![image](https://github.com/user-attachments/assets/81a5aaf0-7b12-4be0-9820-d82734bfdb21)

# Cat-Paw-Blog 🐾

一个基于 Vue 3 + Notion 的自动化个人博客系统，利用 Make.com 无代码平台接入 AI 智能体，实现文章的自动获取、翻译、润色与发布。

## ✨ 特性

- 🤖 **自动化内容生产** - 通过 Make.com 工作流，每日定时从外网期刊 RSS 获取文章，AI 自动翻译润色
- 📝 **Notion 作为 CMS** - 利用 Notion 数据库管理文章内容，支持结构化数据存储
- 🎨 **现代化 UI** - 基于 Vue 3 Composition API，响应式设计，完美适配桌面端和移动端
- 🏷️ **标签分类** - 动态标签云，支持按标签快速筛选文章
- ♾️ **无限滚动** - 利用 Intersection Observer 实现流畅的无限滚动加载
- 🚀 **Serverless 部署** - 使用 Netlify Functions 封装 API 调用，安全高效

## 🛠️ 技术栈

### 前端

- **Vue 3** - 渐进式 JavaScript 框架
- **Vue Router 4** - 官方路由管理器
- **Vite** - 下一代前端构建工具
- **Axios** - HTTP 客户端
- **ESLint & Prettier** - 代码规范与格式化

### 后端 & 服务

- **Notion API** - 内容管理系统
- **Netlify Functions** - Serverless 函数
- **Make.com** - 无代码自动化平台
- **AI 智能体** - 文章翻译与润色

## 📁 项目结构

```
Cat-Paw-Blog/
├── src/
│   ├── components/       # 全局组件
│   │   ├── NavBar.vue   # 导航栏
│   │   ├── TagsCloud.vue # 标签云
│   │   ├── PostList.vue # 文章列表
│   │   └── ...
│   ├── composables/      # 组合式函数
│   │   ├── useArticles.js    # Notion 文章获取
│   │   ├── getPosts.js       # 博客文章获取
│   │   └── filterArticles.js # 文章筛选
│   ├── views/           # 页面组件
│   │   ├── HomeView.vue      # 主页
│   │   ├── PsychArticles.vue # 心理科学文章页
│   │   ├── FilteredPosts.vue # 筛选结果页
│   │   └── ...
│   ├── router/          # 路由配置
│   └── main.js          # 入口文件
├── netlify/
│   └── functions/       # Netlify Functions
│       ├── getArticles.js    # 获取 Notion 文章
│       ├── getArticle.js     # 获取单篇文章
│       └── filterArticles.js # 按标签筛选
├── public/              # 静态资源
└── package.json
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- npm 或 pnpm

### 安装依赖

```bash
npm install
```

### 配置环境变量

在项目根目录创建 `.env` 文件：

```env
VITE_NOTION_SECRET=your_notion_integration_token
VITE_NOTION_DATABASE_ID=your_notion_database_id
```

### 本地开发

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173)

### 构建生产版本

```bash
npm run build
```

## 📦 部署

### Netlify 部署

1. 将代码推送到 GitHub
2. 在 Netlify 中导入项目
3. 配置构建命令：`npm run build`
4. 配置发布目录：`dist`
5. 在 Netlify 环境变量中添加：
   - `NOTION_SECRET`
   - `NOTION_DATABASE_ID`

## 🔧 自动化工作流

项目使用 Make.com 实现以下自动化流程：

1. **定时触发** - 每日早上 8 点自动执行
2. **RSS 获取** - 从外网期刊 RSS 源获取最新文章
3. **AI 处理** - 智能体翻译并润色为 Markdown 格式
4. **数据存储** - 自动存储到 Notion 数据库
5. **前端展示** - Cat-Paw-Blog 自动获取并展示新文章

## 🌐 在线演示

- **项目地址**: [https://github.com/EafenQAQ/Cat-Paw-Blog](https://github.com/EafenQAQ/Cat-Paw-Blog)
- **线上部署**: [https://cat-paw-blog.netlify.app/](https://cat-paw-blog.netlify.app/)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

Made with ❤️ by Eafen
