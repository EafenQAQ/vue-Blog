

import { ref } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://ssr233.site/'

// 解包数据
const unpackData = (responseData) => {
  return {
    id:responseData.data.id,
    title:responseData.data.title,
    content:responseData.data.content,
    author:responseData.data.author,
    tags: responseData.data.tags ? responseData.data.tags.split(' ') : [], // 将字符串转换为数组
    createAt:responseData.data.created_at,
  }
}

// 获取文章数据
const getPost = () => {
  const post = ref(null)
  const error = ref(null)

  const load = async (id) => {
    // 模拟延迟
    // await new Promise((resolve) => setTimeout(resolve, 1000))

   try {
    const res = await axios.get(BASE_URL + 'v1/posts/' + id)


    console.log('从后端获取的数据是：', res.data)

    post.value = unpackData(res.data)
    console.log('解包后的数据是:', post.value)
   }catch (err) {
    console.log(err.message)
    error.value = err.message
   }

  }

  return { post, error, load }
}

export default getPost
