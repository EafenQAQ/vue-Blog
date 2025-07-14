import { ref } from 'vue'
import axios from 'axios'

//解包数据
const unpackData = (page) => {
  return {
    id: page.id,
    title: page.properties.文章标题.title[0]?.plain_text || '无标题',
    summary: page.properties.文章摘要.rich_text[0]?.plain_text || '',
    content: page.properties.文章内容.rich_text[0]?.plain_text || '',
    createAt: page.properties.创建时间.created_time,
  }
}

// 获取文章数据
const useArticle = () => {
  const article = ref(null)
  const error = ref(null)

  const load = async (id) => {
    // 模拟延迟
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const res = await axios.get(`/.netlify/functions/getArticle?id=${id}`)

      console.log('获取到的单篇文章：', res.data)

      article.value = unpackData(res.data)
      console.log('解包后的数据是:', article.value)
    } catch (err) {
      console.error(err.message)
      error.value = err.message
    }
  }
  return { article, error, load }
}
export default useArticle
