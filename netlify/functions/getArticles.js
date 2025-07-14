const { Client } = require('@notionhq/client')

// 初始化Notion客户端
const notion = new Client({ auth: process.env.NOTION_SECRET })
const databaseId = process.env.NOTION_DATABASE_ID

exports.handler = async (event, context) => {
  // 添加CORS头部
  const headers = {
    'Access-Control-Allow-Origin': '*',
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

  try {
    console.log('Querying Notion database...')
    const res = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: '创建时间',
          direction: 'descending',
        },
      ],
      page_size: 15,
    })

    console.log('Query successful, returning data')
    // 返回成功响应
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(res),
    }
  } catch (err) {
    console.error('Notion API Error:', err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: '服务器错误',
        details: err.message,
      }),
    }
  }
}
