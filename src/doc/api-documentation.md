# Cat Paw Blog 后端接口文档

## 项目概述

Cat Paw Blog 是一个基于 Vue 3 的博客系统，原本使用 Firebase Firestore 作为后端服务。本文档描述了需要实现的后端 API 接口，用于替代 Firebase 服务。

## 数据模型

### Post（文章）数据结构

```json
{
  "id": "string",           // 文章唯一标识符
  "title": "string",        // 文章标题
  "content": "string",      // 文章内容
  "author": "string",       // 作者名称（固定为 "Eafen"）
  "createAt": "timestamp",  // 创建时间戳
  "tags": ["string"]        // 标签数组
}
```

### 数据库集合

- **集合名称**: `posts`
- **主要字段**: 如上述数据结构所示

## API 接口规范

### 基础信息

- **Base URL**: `http://your-domain.com/api`
- **Content-Type**: `application/json`
- **字符编码**: UTF-8

### 1. 获取所有文章列表

**接口路径**: `GET /posts`

**功能描述**: 获取所有文章列表，按创建时间倒序排列

**请求参数**: 无

**响应格式**:
```json
{
  "success": true,
  "data": [
    {
      "id": "post_id_1",
      "title": "文章标题1",
      "content": "文章内容1...",
      "author": "Eafen",
      "createAt": "2024-01-01T10:00:00Z",
      "tags": ["vue", "javascript"]
    },
    {
      "id": "post_id_2",
      "title": "文章标题2",
      "content": "文章内容2...",
      "author": "Eafen",
      "createAt": "2024-01-02T10:00:00Z",
      "tags": ["react", "frontend"]
    }
  ],
  "message": "获取成功"
}
```

**排序要求**: 按 `createAt` 字段降序排列（最新的文章在前）

### 2. 获取单篇文章详情

**接口路径**: `GET /posts/{id}`

**功能描述**: 根据文章ID获取单篇文章的详细信息

**请求参数**:
- `id` (路径参数): 文章的唯一标识符

**响应格式**:
```json
{
  "success": true,
  "data": {
    "id": "post_id_1",
    "title": "文章标题",
    "content": "完整的文章内容...",
    "author": "Eafen",
    "createAt": "2024-01-01T10:00:00Z",
    "tags": ["vue", "javascript", "frontend"]
  },
  "message": "获取成功"
}
```

**错误响应**:
```json
{
  "success": false,
  "data": null,
  "message": "文章不存在"
}
```

### 3. 创建新文章

**接口路径**: `POST /posts`

**功能描述**: 创建一篇新的博客文章

**请求体**:
```json
{
  "title": "文章标题",
  "content": "文章内容",
  "author": "Eafen",
  "tags": ["tag1", "tag2", "tag3"]
}
```

**字段说明**:
- `title`: 必填，文章标题
- `content`: 必填，文章内容
- `author`: 必填，作者名称（通常为 "Eafen"）
- `tags`: 可选，标签数组

**响应格式**:
```json
{
  "success": true,
  "data": {
    "id": "newly_created_post_id",
    "title": "文章标题",
    "content": "文章内容",
    "author": "Eafen",
    "createAt": "2024-01-01T10:00:00Z",
    "tags": ["tag1", "tag2", "tag3"]
  },
  "message": "文章创建成功"
}
```

**注意事项**:
- `id` 字段由后端自动生成
- `createAt` 字段由后端自动设置为当前时间戳
- 标签数组中的重复标签应该被去重

### 4. 删除文章

**接口路径**: `DELETE /posts/{id}`

**功能描述**: 根据文章ID删除指定文章

**请求参数**:
- `id` (路径参数): 要删除的文章ID

**响应格式**:
```json
{
  "success": true,
  "data": null,
  "message": "文章删除成功"
}
```

**错误响应**:
```json
{
  "success": false,
  "data": null,
  "message": "文章不存在或删除失败"
}
```

## 错误处理

### 通用错误响应格式

```json
{
  "success": false,
  "data": null,
  "message": "错误描述信息",
  "error_code": "ERROR_CODE"
}
```

### 常见错误码

- `400`: 请求参数错误
- `404`: 资源不存在
- `500`: 服务器内部错误

## 技术要求

### 时间戳格式
- 使用 ISO 8601 格式: `YYYY-MM-DDTHH:mm:ssZ`
- 时区: UTC
- 前端会使用 `new Date(timestamp)` 来解析时间

### CORS 配置
由于前端运行在不同端口，需要配置 CORS 允许跨域请求：
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### 数据验证
- 文章标题不能为空，最大长度 200 字符
- 文章内容不能为空，最大长度 10000 字符
- 作者名称不能为空，最大长度 50 字符
- 标签数组最多包含 10 个标签，每个标签最大长度 20 字符

## 前端调用示例

### 获取文章列表
```javascript
const response = await fetch('/api/posts');
const result = await response.json();
const posts = result.data;
```

### 获取单篇文章
```javascript
const response = await fetch(`/api/posts/${postId}`);
const result = await response.json();
const post = result.data;
```

### 创建文章
```javascript
const newPost = {
  title: "新文章标题",
  content: "文章内容",
  author: "Eafen",
  tags: ["vue", "javascript"]
};

const response = await fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newPost)
});
```

### 删除文章
```javascript
const response = await fetch(`/api/posts/${postId}`, {
  method: 'DELETE'
});
```

## 部署建议

1. **数据库选择**: 推荐使用 MongoDB 或 PostgreSQL
2. **后端框架**: 推荐使用 Node.js (Express/Koa) 或 Python (FastAPI/Django)
3. **部署环境**: 支持 Docker 容器化部署
4. **性能优化**: 建议对文章列表接口添加分页功能（可选）

## 联系信息

如有疑问，请联系前端开发者进行确认和调试。
