import { ref } from 'vue'
import axios from 'axios'

//解包数据
const unpackData = (page) => {
  return page.results.map((item) => {
    return {
      id: item.id,
      title: item.properties.文章标题.title[0]?.plain_text || '无标题',
      summary: item.properties.文章摘要.rich_text[0]?.plain_text || '',
      content: item.properties.文章内容.rich_text[0]?.plain_text || '',
      createAt: item.properties.创建时间.created_time,
      tags: item.properties.tags.multi_select.map((tag) => tag.name),
    }
  })
}

// 获取文章数据
const filterArticles = () => {
  const filteredArticles = ref([])
  const error = ref(null)

  const load = async (tag) => {
    // 模拟延迟
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const res = await axios.get(`/.netlify/functions/filterArticles?tag=${tag}`)

      console.log('筛选到的文章：', res.data)

      filteredArticles.value = unpackData(res.data)
      console.log('从NOtion解包后的数据是:', filteredArticles.value)
    } catch (err) {
      console.error(err.message)
      error.value = err.message
    }
  }
  return { filteredArticles, error, load }
}
export default filterArticles
