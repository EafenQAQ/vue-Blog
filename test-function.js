// 测试Netlify Functions的脚本
const axios = require('axios')

async function testLocalFunction() {
  try {
    console.log('测试本地Netlify Functions...')
    const response = await axios.get('http://localhost:8888/.netlify/functions/getArticles')
    console.log('本地测试成功:', response.status)
    console.log('返回数据:', response.data)
  } catch (error) {
    console.error('本地测试失败:', error.message)
    if (error.response) {
      console.error('错误状态:', error.response.status)
      console.error('错误数据:', error.response.data)
    }
  }
}

async function testProductionFunction() {
  try {
    console.log('测试生产环境Netlify Functions...')
    // 请将YOUR_NETLIFY_SITE_URL替换为您的实际Netlify站点URL
    const response = await axios.get('https://YOUR_NETLIFY_SITE_URL/.netlify/functions/getArticles')
    console.log('生产环境测试成功:', response.status)
    console.log('返回数据:', response.data)
  } catch (error) {
    console.error('生产环境测试失败:', error.message)
    if (error.response) {
      console.error('错误状态:', error.response.status)
      console.error('错误数据:', error.response.data)
    }
  }
}

// 运行测试
testLocalFunction()
// testProductionFunction() // 取消注释并替换URL后使用
