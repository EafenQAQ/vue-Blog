require('dotenv').config()
const { Client } = require('@notionhq/client')

// 初始化Notion客户端
const notion = new Client({ auth: process.env.NOTION_SECRET })
const databaseId = process.env.NOTION_DATABASE_ID

//打印环境变量
console.log('NOTION_SECRET:', process.env.NOTION_SECRET)
console.log('NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID)

exports.handler = async (event, context) => {
  // 确保只处理GET请求
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'http请求方法错误' }
  }

  try {
    const res = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: '创建时间',
          direction: 'descending',
        },
      ],
      page_size: 3,
    })

    // // 格式化数据
    // const articles = res.results.map((page) => {
    //   return {
    //     id: page.id,
    //     title: page.properties.文章标题.title[0]?.plain_text || '无标题',
    //     summary: page.properties.文章摘要.rich_text[0]?.plain_text || '',
    //     tags: page.properties.tags.multi_select.map((tag) => tag.name),
    //     createdTime: page.properties.创建时间.created_time,
    //     cover: page.cover?.external?.url || page.cover?.file?.url || null,
    //   }
    // })

    // 返回成功响应
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(res),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: '服务器错误',
    }
  }
}
