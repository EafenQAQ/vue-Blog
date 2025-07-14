require('dotenv').config()
const { Client } = require('@notionhq/client')

// 初始化Notion客户端
const notion = new Client({ auth: process.env.NOTION_SECRET })

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Only GET requests allowed' }
  }

  const { id } = event.queryStringParameters

  if (!id) {
    return { statusCode: 400, body: '缺少文章ID' }
  }
  console.log('id:', id)
  try {
    const page = await notion.pages.retrieve({ page_id: id })
    console.log('the single article is:', page)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(page),
    }
  } catch (error) {
    console.error('Failed to retrieve article:', error)
    return {
      statusCode: 500,
      body: 'Error retrieving article',
    }
  }
}
