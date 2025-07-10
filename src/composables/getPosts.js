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
import { projectFirestore } from '@/firebase/config'

// 获取文章数据
const getPosts = () => {
  const posts = ref([])
  const error = ref(null)

  const load = async () => {
    // 模拟延迟
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const res = await projectFirestore.collection('posts')
        .orderBy('createAt', 'desc')
        .get()
      // console.log(res.docs[0].data());
      posts.value = res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  return { posts, error, load }
}

export default getPosts
