/**
 * @file getPost.js
 * @description
 * 这是一个 Vue 3 的自定义组合式函数（composable），用于从接口获取“单篇”博客文章数据。
 * 使用了 Vue 的响应式 API（ref）来管理文章数据和错误状态。
 *
 * 使用方式（在组件中）：
 * const { post, error, load } = getPost();
 * load(); // 调用后会从指定 URI 加载文章数据
 *
 * 返回值：
 * - post：存储文章列表
 * - error：响应式变量，存储错误信息（当前未被赋值使用）
 * - load：异步函数，执行网络请求获取数据
 */

import { ref } from 'vue'

// 获取文章数据
const getPost = () => {
  const post = ref(null)
  const error = ref(null)
  const uri = 'http://localhost:3002/posts/'

  const load = async (id) => {
    // 模拟延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const res = await fetch(uri + id)
      if (!res.ok) {
        throw new Error('网络错误')
      }
      const data = await res.json()
      console.log('获取文章数据:', data)

      post.value = data
    } catch (error) {
      console.error('获取文章数据失败:', error)
    }
  }

  return { post, error, load }
}

export default getPost
