import { ref } from 'vue'
import axios from 'axios'

//解包数据
const unpackData = (data) => {
  return data.results.map((page) => {
    return {
      id: page.id,
      title: page.properties.文章标题.title[0]?.plain_text || '无标题',
      summary: page.properties.文章摘要.rich_text[0]?.plain_text || '',
      content: page.properties.文章内容.rich_text[0]?.plain_text || '',
      createAt: page.properties.创建时间.created_time,
    }
  })
}

// 获取文章数据
const useArticle = () => {
  const articles = ref([])
  const error = ref(null)

  const load = async (id) => {
    // 模拟延迟
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const res = await axios.get('/.netlify/functions/getArticle/' + id)

      console.log('获取到的单篇文章：', res.data)

      //articles.value = unpackData(res.data)
    } catch (err) {
      console.error(err.message)
      error.value = err.message
    }
  }
  return { articles, error, load }
}
export default useArticle
