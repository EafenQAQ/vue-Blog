/**
 * @file getPosts.js
 * @description
 * 这是一个 Vue 3 的自定义组合式函数（composable），用于从接口获取博客文章数据。
 * 使用了 Vue 的响应式 API（ref）来管理文章数据和错误状态。
 *
 * 使用方式（在组件中）：
 * const { posts, error, load } = getPosts();
 * load(); // 调用后会从指定 URI 加载文章数据
 *
 * 返回值：
 * - posts：响应式数组，存储文章列表
 * - error：响应式变量，存储错误信息（当前未被赋值使用）
 * - load：异步函数，执行网络请求获取数据
 */

import { ref } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://ssr233.site/'

//解包数据
const unpackData = (responseData) => {
  if (!responseData.success || !responseData.data) {
    return []
  }

  return responseData.data.map((item) => {
    return {
      id: item.id,
      title: item.title || '无标题',
      content: item.content || '',
      author: item.author || '',
      tags: item.tags ? item.tags.split(' ') : [], // 将字符串转换为数组
      createAt: item.created_at, // 映射字段名
    }
  })
}


// 获取文章数据
const getPosts = () => {
  const posts = ref([])
  const error = ref(null)

  const load = async () => {
    // 模拟延迟
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const res = await axios.get(BASE_URL + 'v1/posts/list')

      console.log('从后端获取的数据是：', res.data)

      posts.value = unpackData(res.data)
      console.log('解包后的数据是:', posts.value)
    } catch (err) {
      console.error(err.message)
      error.value = err.message
    }
  }

  return { posts, error, load }
}

export default getPosts
