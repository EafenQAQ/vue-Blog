const { Client } = require('@notionhq/client')

// 初始化Notion客户端
const notion = new Client({ auth: process.env.NOTION_SECRET })

// 允许的源列表
const ALLOWED_ORIGINS = [
  'https://cat-paw-blog.netlify.app',  // 你的线上博客
  'https://*.netlify.app',             // 所有Netlify子域名
  process.env.URL,                     // Netlify自动设置的部署URL
  'http://localhost:8888',              // 本地开发
].filter(Boolean)

exports.handler = async (event, context) => {
  // 动态设置CORS头，只允许配置的域名
  const origin = event.headers.origin || event.headers.Origin || ''
  const allowedOrigin = ALLOWED_ORIGINS.find(allowed =>
    allowed.includes('*') ? origin.match(new RegExp('^' + allowed.replace('*', '.*'))) : origin === allowed
  ) || (ALLOWED_ORIGINS.length > 0 ? ALLOWED_ORIGINS[0] : '*')

  // 添加CORS头部
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  }

  // 处理预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Only GET requests allowed' }),
    }
  }

  // 检查环境变量
  if (!process.env.NOTION_SECRET) {
    console.error('Missing NOTION_SECRET environment variable')
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: '服务器配置错误' }),
    }
  }

  const { id } = event.queryStringParameters || {}

  if (!id) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: '缺少文章ID' }),
    }
  }

  console.log('Retrieving article with id:', id)
  try {
    // 1. 获取页面属性（标题、标签等元数据）
    const pageMetadata = await notion.pages.retrieve({ page_id: id })

    // 2. 获取页面正文（Blocks）
    // 因为正文可能由多个 Block 组成，我们使用循环确保拿取完整
    let blocks = []
    let cursor = undefined

    while (true) {
      const response = await notion.blocks.children.list({
        block_id: id,
        start_cursor: cursor,
      })

      blocks.push(...response.results)

      // 如果还有更多块，更新 cursor 继续请求，否则跳出循环
      if (!response.has_more) break
      cursor = response.next_cursor
    }

    console.log('Successfully retrieved article and content blocks')

    // 3. 将元数据和正文内容合并返回
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        metadata: pageMetadata,
        content: blocks, // 这里是 Blocks 数组
      }),
    }
  } catch (error) {
    console.error('Failed to retrieve article:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error retrieving article',
        details: error.message,
      }),
    }
  }
}
