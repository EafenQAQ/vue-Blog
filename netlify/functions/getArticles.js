const { Client } = require('@notionhq/client')

// Notion客户端配置 - 添加超时设置
const notion = new Client({ 
  auth: process.env.NOTION_SECRET,
  timeout: 30000, // 30秒超时
  retryConfig: {
    retries: 3,           // 最多重试3次
    minTimeout: 1000,      // 初始重试间隔1秒
    maxTimeout: 10000,    // 最大重试间隔10秒
    factor: 2,            // 指数退避因子
    randomize: true,      // 随机化间隔避免惊群效应
  }
})
const databaseId = process.env.NOTION_DATABASE_ID

// 允许的源列表
const ALLOWED_ORIGINS = [
  'https://cat-paw-blog.netlify.app',  // 你的线上博客
  'https://*.netlify.app',             // 所有Netlify子域名
  process.env.URL,                     // Netlify自动设置的部署URL
  'http://localhost:8888',              // 本地开发
].filter(Boolean)

// 网络重试装饰器
async function withRetry(fn, maxRetries = 3, retryDelay = 1000) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const isNetworkError = error.code === 'ECONNRESET' || 
                             error.code === 'ETIMEDOUT' ||
                             error.code === 'ENOTFOUND' ||
                             error.message?.includes('fetch failed') ||
                             error.cause?.code === 'ECONNRESET';
      
      if (isNetworkError && attempt < maxRetries) {
        const delay = retryDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
        console.log(`Attempt ${attempt} failed, retrying in ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else if (attempt < maxRetries) {
        // 非网络错误也重试一次
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
  throw lastError;
}

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
  // 确保只处理GET请求
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'http请求方法错误' }),
    }
  }

  // 检查环境变量
  if (!process.env.NOTION_SECRET || !process.env.NOTION_DATABASE_ID) {
    console.error('Missing environment variables:', {
      NOTION_SECRET: !!process.env.NOTION_SECRET,
      NOTION_DATABASE_ID: !!process.env.NOTION_DATABASE_ID,
    })
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: '服务器配置错误' }),
    }
  }

  // 接收cursor请求参数
  const { cursor } = event.queryStringParameters || {}

  try {
    console.log('Querying Notion database...')
    
    // 使用重试机制包装API调用
    const res = await withRetry(async () => {
      const queryBody = {
        database_id: databaseId,
        sorts: [
          {
            property: '创建时间',
            direction: 'descending',
          },
        ],
        page_size: 10,
      }
      if (cursor) {
        queryBody.start_cursor = cursor
      }
      return await notion.databases.query(queryBody)
    });

    console.log('Query successful, returning data')
    // 返回成功响应
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(res),
    }
  } catch (err) {
    console.error('Notion API Error after retries:', err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: '获取文章列表失败，请稍后重试',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined,
      }),
    }
  }
}
