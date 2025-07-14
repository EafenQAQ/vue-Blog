<template>
  <div id="ArticleDetails" class="page-content">
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
import LoadSpinner from '@/components/LoadSpinner.vue';
import useArticle from '@/composables/useArticle';
import { marked } from 'marked';
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const htmlContent = computed(() => {
  if (article.value && article.value.content) {
    return marked(article.value.content);
  }
  return '';
}
)

const articleID = props.id
const { article, error, load } = useArticle();
load(articleID);


</script>

<style lang="scss" scoped></style>
