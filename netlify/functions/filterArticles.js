const { Client } = require('@notionhq/client')

// 初始化Notion客户端
const notion = new Client({ auth: process.env.NOTION_SECRET })

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

  const { tag } = event.queryStringParameters || {}

  if (!tag) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: '缺少文章tag' }),
    }
  }

  console.log('Retrieving article with tag:', tag)
  try {
    // 根据tag参数筛选文章
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'tags',
        rich_text: {
          contains: tag,
        },
      },
      sorts: [
        {
          property: '创建时间',
          direction: 'descending',
        },
      ],
      page_size: 15,
    })
    console.log('Successfully retrieved article')
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(res),
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
