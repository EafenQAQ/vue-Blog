**联系方式**：15847007426 (微信同号) | **电子邮箱**：15847007426@163.com **个人网站**：[eafen-resume.netlify.app](https://eafen-resume.netlify.app/) | **现居**：杭州

---

# **个人介绍**

⼀个从应⽤⼼理学专业跨界⾃学进⼊前端开发领域的求职者。具备相应的⾃学能⼒和解决问题的决⼼，已掌握扎实的前端基 础及主流框架技术，并通过多个实际项⽬进⾏了实践

---

# 开发技能

- **JavaScript\TypeScript**: 精通ES6+新特性、原型链、作用域, 手写Promise等; 熟练运用 TS的类型系统、**Interface** 与泛型进行开发。
- **HTML / CSS**: 深入掌握H5语义化、**Forms 2.0** 及浏览器 **Storage** 技术; 精通 **Flexbox**、**Grid**、**CSS** 动画及响应式设计。
- **响应式与多端适配**：熟练运用 **Flex / Grid** 布局与 `@media`，针对不同屏幕分辨率进行差异化布局调整。
- **开发框架**：熟练使用 **Vue 3 Composition API**，深度理解响应式系统、生命周期；组件间、跨组件通信：`props` / `emits`、`provide` / `inject`；计算属性 `computed`、监听函数 `watch` / `watchEffect` 等。
- **Pinia**：熟练掌握，实现企业级状态管理。
- **Vue-router**：配置动态路由，实现组件异步加载与路由懒加载，利用路由守卫实现权限管理等。
- **UI框架**：熟练应用 **Tailwind CSS**、**Bootstrap**。熟悉 **Element Plus**、**Naive UI**、**DaisyUI** 等主流组件库。
- **构建工具**：掌握 **Vite** 与 **Webpack** 的配置与优化。熟悉 **Entry**、**Output**、**Resolve**、**Module**、**Plugins** 等核心配置。
- **版本控制**：熟练运用 **Git**，掌握 **Gitflow**、**GitHub Flow** 分支管理策略，精通 **Merge** 与 **Rebase** 操作。
- **包管理与规范**： 熟练使用 **npm**、**pnpm** 及 **Yarn**，开发中熟练运用 **ESLint** 与 **Prettier**，提高代码规范性，保证代码提交质量。
- **性能优化**：通过代码分割、**Gzip** 资源压缩与静态资源 **CDN** 加速，显著降低首屏加载耗时。
- **渲染调优**：利用 **Intersection Observer** 实现图片或组件懒加载，并针对复杂场景实施 **Preload** 或 **Prefetch** 策略。
- **指标提升**：熟练使用 **Lighthouse** 及 **Chrome DevTools** 进行性能瓶颈分析，提高Lighthouse得分

## AI 工具掌握与其他

- **Python**：掌握 **Python** 基本语法、字典、数组等常用工具，在 **AI**辅助下可以编写自动化脚本。
- **AI 辅助开发**：熟悉 **Claude Code**、**Augment**、**Cursor** 等辅助编程工具。
- **无代码平台**：使用 **Make.com** 接入智能体，实现自动化工作流。

### **项目经验**

---

### **Sound-Flow 在线音乐播放平台** | **前端 + BaaS (Firebase)**

1. **技术栈：** Vue 3、Composition API、Pinia、Vue Router 4、Vite、Firebase（Authentication、Firestore、Storage）、Cloudinary、ESLint、Prettier

2. **项目描述：** 基于 Vue 3 + Firebase BaaS 的现代化在线音乐播放平台，支持用户创建个人歌单、上传音乐文件、云端存储及流畅的音乐播放体验，完美适配桌面端和移动端设备。

3. **项目亮点：**
   - **组件化架构：** 封装 MusicPlayer、OptimizedImage 等全局组件，OptimizedImage 支持懒加载与多尺寸适配，提升加载性能。

   - **Pinia 状态管理：** 统一管理播放器核心状态（当前歌曲、播放状态、进度、音量），通过 computed 实现响应式数据派生，确保状态与 UI 实时同步。

   - **路由守卫与权限控制：** 结合 Vue Router beforeEach 钩子与 Firebase Authentication，实现基于用户认证的路由拦截，保护需要登录的页面。

   - **响应式多端适配：** 针对 1200px、1024px、768px、640px、480px、360px 等多种屏幕尺寸精细化适配，使用 Flexbox 与 @media 查询确保全端体验。

   - **交互体验优化：** 实现进度条与音量条拖拽控制，同时支持鼠标事件（mousedown/mousemove/mouseup）和触摸事件（touchstart/touchmove/touchend），确保移动端操作流畅。

   - **Firebase BaaS 集成：** 集成 Authentication 实现邮箱注册登录；使用 Firestore 存储歌单与用户数据；通过 Storage 实现音乐文件与封面图片的云端上传与下载，采用动态导入策略优化首屏加载。

   - **数据安全保障**:
     - **Firebase 安全规则配置**：编写 Firestore 与 Storage 安全规则，限制未登录用户无法写入数据，登录用户只能修改自己的歌单数据（通过 `request.auth.uid` 验证）；对上传文件设置类型限制（仅允许音频/图片）与大小限制（音频 < 15MB、图片 < 10MB），有效防止恶意文件上传。
     - **域名白名单控制**：在 Google Cloud Console 中配置授权域名，仅允许 `localhost:5173` 及线上部署域名访问，其他来源的请求将被 CORS 拦截，确保数据访问的可控性。
   - **性能优化：**
     - **图片 CDN 加速：** 结合 Cloudinary 与 Firebase Storage 实现 CDN 加速，针对大/中/窄屏幕提供不同规格优化图片（如 200x200、400x400），显著提升图片加载速度，减少首屏时间。
     - **分包策略：** 配置 Vite manualChunks，将 Vue、Pinia、Vue Router 等核心框架单独打包为 vendor-vue，其他第三方依赖打包为 vendor，利用浏览器缓存策略缓存不常更新依赖，提升二次访问效率。
     - **模块动态导入：** 采用 Firebase 模块动态导入（如 `import('firebase/storage')`）减少初始包体积。

4. **项目地址：** [https://github.com/EafenQAQ/Sound-Flow](https://github.com/EafenQAQ/Sound-Flow)

5. **线上部署：** [https://sound-flow-e1a34.web.app/](https://sound-flow-e1a34.web.app/)

---

### **MindFree AI 心理咨询聊天应用** | **前端 + BaaS (Supabase) + GLM4.7**

1. **技术栈：** Vue 3、Composition API、Pinia、Vue Router 4、Vite、Supabase（Authentication）、火山引擎 ARK（GLM-4.7）、Netlify Functions、Tailwind CSS 4.0、DaisyUI、Anime.js、Axios

2. **项目描述：** 基于 Vue 3 + Supabase + AI 的现代化心理咨询聊天应用，采用人本主义心理咨询师角色，运用来访者中心疗法。支持用户注册登录、多会话管理、智能对话交互，提供无条件的积极关注、共情和真诚，帮助用户更深入地理解自己的感受和需求，完美适配桌面端和移动端设备。

3. **项目亮点：**
   - **AI 模型集成与 Prompt Engineering：** 集成火山引擎 ARK 的 GLM-4.7 大语言模型，通过精心设计的系统提示词实现人本主义心理咨询师角色，采用来访者中心疗法，运用开放式问题、共情回应等原则提供专业对话服务。

   - **API 安全代理与环境隔离：** 创建 Axios 双实例（`callARK`、`callProxy`），通过 `import.meta.env.DEV` 动态判断环境。开发环境直接调用 API，生产环境通过 Netlify Functions 代理，将密钥存储在服务端环境变量中，有效防止密钥泄露。

   - **Supabase BaaS 集成：** 使用 Supabase 实现用户认证（邮箱注册登录、密码验证、邮箱验证）、会话管理，通过 Pinia Store 持久化用户登录状态，支持"记住我"功能。

   - **多会话管理系统：** 实现完整的聊天会话生命周期管理，包括创建、切换、编辑标题、删除会话。每个会话独立存储消息历史，通过 `uid` 库生成唯一会话 ID。

   - **本地存储持久化：** 聊天历史自动保存到 `localStorage`，页面刷新后数据不丢失，实现会话数据的序列化与反序列化。

4. **项目地址：** [https://github.com/EafenQAQ/mindFree](https://github.com/EafenQAQ/mindFree)

5. **线上部署：** [https://mindfree-ai.netlify.app/](https://mindfree-ai.netlify.app/)

---

### **教育经历**

- **济南大学** | **教育学学士 (应用心理学专业)** | 2019.09 - 2023.06

---

### **自我评价**

- **专业素养**：通过 **CET6 (英语六级)** 考试，可流畅阅读英文技术文档。

- **综合特质**：具备心理学背景带来的协商、沟通能力与团队协作意识；对技术迭代保持高度敏感与持续学习的热情 。
