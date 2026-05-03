<template>
  <div id="ArticleDetails" class="page-content">
    <!-- 返回按钮 - 固定在右下角 -->
    <button class="back-btn" @click="goBack">
      <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M16.88 2.88a1.25 1.25 0 0 0-1.77 0L6.7 11.29a.996.996 0 0 0 0 1.41l8.41 8.41c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.54 12l7.35-7.35c.48-.49.48-1.28-.01-1.77z" fill="#fff"></path></svg>
    </button>
    <template v-if="error">
      <div class="error">
        {{ error }}

      </div>
    </template>
    <template v-if="article">
      <div>
        <!-- 文章标题 -->
        <h1 class="post-title">{{ article.title }}</h1>
        <!-- 文章内容 -->
        <div class="post-content">
          <div v-html="htmlContent"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <LoadSpinner />
    </template>
  </div>
</template>

<script setup>
defineOptions({
  name: 'ArticleDetails'
})
import LoadSpinner from '@/components/LoadSpinner.vue';
import useArticle from '@/composables/useArticle';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/psych');
  }
};

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const htmlContent = computed(() => {
  if (article.value && article.value.content) {
    return DOMPurify.sanitize(marked(article.value.content));
  }
  return '';
}
)

const articleID = props.id
const { article, error, load } = useArticle();
load(articleID);


</script>

<style scoped>
/* 返回按钮样式 - 固定右下角 */
.back-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--base-accent);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 100;
  padding: 5px;
}

.back-icon {
  width: 24px;
  height: 24px;
}

.back-icon path {
  fill: white;
}

.back-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}
</style>
