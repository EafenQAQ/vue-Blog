<template>
  <div id="SinglePost" class="post">
    <RouterLink :to="{ name: 'post', params: { id: post.id } }">
      <h2 class="post-title">{{ post.title }}</h2>
    </RouterLink>
    <p class="post-content">{{ snippet }}</p>
    <p v-if="post.author" class="post-author">作者: {{ post.author }} </p>
    <p class="post-date">发布日期: {{ postDate }}</p>
    <div class="post-tags">
      <span class="pill" v-for="tag in post.tags" :key="tag" @click="gotoTag(tag)">

        # {{ tag }}

      </span>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

// 根据情况计算日期数据
const postDate = computed(() => {
  if (typeof props.post.createAt === 'string') {
    return new Date(props.post.createAt).toLocaleDateString();
  } else {
    return props.post.createAt.toDate().toLocaleDateString();
  }
})

const snippet = computed(
  () => {
    // 截取前100个字符作为摘要
    return props.post.content.length > 100
      ? props.post.content.slice(0, 100) + '...'
      : props.post.content;
  }

)

const gotoTag = (tag) => {
  router.push({ name: 'tag', params: { tag: tag } })
}




</script>

<style scoped>
/* 文章卡片容器 */
#SinglePost {
  width: 100%;
  max-width: 800px;
  margin: var(--spacing-md) auto;
}

.post {
  background: white;
  padding: var(--spacing-xl);
  margin: var(--spacing-lg) 0;
  border-radius: var(--radius-lg);
  border: 2px dashed var(--base-accent);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 文章卡片悬停效果 */
.post:hover {
  border-color: var(--secondary-accent);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

/* 文章标题样式 */
.post-title {
  font-size: var(--font-2xl);
  color: var(--base-accent-2);
  margin-bottom: var(--spacing-md);
  line-height: 1.3;
  transition: all 0.3s ease;
}

.post-title:hover {
  color: var(--base-accent);
  cursor: pointer;
}

/* 文章内容摘要 */
.post-content {
  font-size: var(--font-lg);
  color: var(--secondary-color);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

/* 文章元信息 */
.post-author,
.post-date {
  font-size: var(--font-sm);
  color: var(--secondary-accent);
  font-weight: 500;
  margin: var(--spacing-xs) 0;
}

/* 标签容器 */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-md);
}

/* 响应式设计 */
@media (max-width: 768px) {
  #SinglePost {
    margin: var(--spacing-sm) auto;
  }

  .post {
    padding: var(--spacing-lg);
    margin: var(--spacing-md) 0;
  }

  .post-title {
    font-size: var(--font-xl);
  }

  .post-content {
    font-size: var(--font-base);
  }
}

@media (max-width: 480px) {
  .post {
    padding: var(--spacing-md);
    margin: var(--spacing-sm) 0;
  }

  .post-title {
    font-size: var(--font-lg);
    margin-bottom: var(--spacing-sm);
  }

  .post-content {
    font-size: var(--font-sm);
    margin-bottom: var(--spacing-md);
  }

  .post-author,
  .post-date {
    font-size: var(--font-xs);
  }

  .post-tags {
    margin-top: var(--spacing-sm);
  }
}
</style>
