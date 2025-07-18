import { ref } from 'vue'
import axios from 'axios'

const useArticles = () => {
  const articles = ref([])
  const error = ref(null)
  const isLoading = ref(false)
  const hasMore = ref(true)
  const nextCursor = ref(null)

  //解包数据
  const unpackData = (data) => {
    const newData = data.results.map((page) => {
      return {
        id: page.id,
        title: page.properties.文章标题.title[0]?.plain_text || '无标题',
        summary: page.properties.文章摘要.rich_text[0]?.plain_text || '',
        content: page.properties.文章内容.rich_text[0]?.plain_text || '',
        createAt: page.properties.创建时间.created_time,
        tags: page.properties.tags.multi_select.map((tag) => tag.name),
      }
    })

    return newData
  }

  const load = async () => {
    // 模拟延迟
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    if (isLoading.value || !hasMore.value) return //上锁——避免无限滚动时重复触发加载

    isLoading.value = true
    error.value = null

    try {
      let url = `/.netlify/functions/getArticles`

      if (nextCursor.value) {
        url += `?cursor=${nextCursor.value}`
      }

      const res = await axios.get(url)

      console.log('从Notion返回的数据是：', res.data)

      const newData = unpackData(res.data)
      console.log('解包后的数据是', newData)

      articles.value.push(...newData)
      console.log('目前获取到的articles有', articles.value)

      // 提取出has_more和next_cursor
      hasMore.value = res.data.has_more
      nextCursor.value = res.data.next_cursor

      console.log('还有更多数据吗？', hasMore.value)
      console.log('下一次请求的cursor是：', nextCursor.value)
    } catch (err) {
      console.error(err.message)
      error.value = '加载文章失败'
    } finally {
      isLoading.value = false
    }
  }
  return { articles, error, load, isLoading, hasMore }
}
export default useArticles
