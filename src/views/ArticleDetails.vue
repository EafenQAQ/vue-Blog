<template>
  <div id="ArticleDetails">
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
        <p>{{ article.content }}</p>
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

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const articleID = props.id
const { article, error, load } = useArticle();

load(articleID);
</script>

<style lang="scss" scoped></style>
