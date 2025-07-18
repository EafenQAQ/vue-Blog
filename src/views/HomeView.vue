<template>
  <div id="Home">

    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="posts" sourceType="blog" />
      <TagsCloud :posts="posts" sourceType="blog" />
    </div>
    <div v-else>
      <LoadSpinner />
    </div>

    <div ref="sentinel"></div>

  </div>
</template>

<script setup>
import LoadSpinner from '@/components/LoadSpinner.vue';
import PostList from '@/components/PostList.vue';
import TagsCloud from '@/components/TagsCloud.vue';
import getPosts from '@/composables/getPosts';
import { onMounted, onUnmounted, ref } from 'vue';

// 哨兵元素
const sentinel = ref(null)

const { posts, error, load } = getPosts();

load();

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    console.log('isIntersecting? :', entry.isIntersecting)
    if (entry.isIntersecting) {

      console.log('进入视口了')

      // 在这里需要一个LoadMoreItems.js的逻辑
    }
  }
  )


}


const observer = new IntersectionObserver(handleIntersection
  , {
    rootMargin: '0px 0px 100px 0px',
  })

onMounted(() => {
  observer.observe(sentinel.value)
}
)

onUnmounted(() => {
  observer.disconnect()
}
)

</script>

<style scoped>
/* 主页容器 */
#Home {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* 主页标题 */
#Home>h1 {
  background: linear-gradient(135deg, var(--base-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  position: relative;
}

/* 标题装饰 */
#Home>h1::after {
  content: '';
  position: absolute;
  bottom: -var(--spacing-md);
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, var(--base-color), var(--secondary-color));
  border-radius: 2px;
}


#Home>div {
  text-align: center;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  color: var(--secondary-accent);
  font-size: var(--font-lg);
  margin: var(--spacing-xl) 0;
}

/* 加载状态样式 */
#Home>div:last-child {

  color: var(--base-accent);
}



/* 响应式设计 */
@media (max-width: 768px) {
  #Home>h1 {
    margin-bottom: var(--spacing-xl);
  }

  .palette {
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-xl);
  }

  .palette-item {
    padding: var(--spacing-md);
    font-size: var(--font-xs);
  }

  .palette-item:hover {
    transform: none;
  }
}

@media (max-width: 480px) {
  #Home>h1 {
    margin-bottom: var(--spacing-lg);
  }

  .palette {
    margin-top: var(--spacing-lg);
  }

  .palette-item {
    padding: var(--spacing-sm);
  }
}
</style>
