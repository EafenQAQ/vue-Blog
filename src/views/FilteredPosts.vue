<template>
  <div id="FilteredPosts">
    <template v-if="error">{{ error }}</template>
    <!-- 博客文章 -->
    <template v-else-if="posts.length">

      <div class="layout">
        <div class="postList">
          <p>包含「 {{ tag }} 」标签的文章有 {{ filteredPosts.length }} 篇：</p>
          <div v-for="post in filteredPosts" :key="post.id">
            <SinglePost :post="post" />
          </div>
        </div>
        <TagsCloud :posts="posts" />
      </div>

    </template>

    <!-- Notion中的文章 -->
    <template v-else-if="articles.length">
      <div class="layout">
        <div class="postList">
          <p>包含「 {{ tag }} 」标签的文章有 {{ filteredArticles.length }} 篇：</p>
          <div v-for="post in filteredArticles" :key="post.id">
            <SinglePost :post="post" />
          </div>
        </div>
        <TagsCloud :posts="posts.length ? posts : articles" />
      </div>

    </template>

    <template v-else>
      <LoadSpinner />
    </template>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import getPosts from '@/composables/getPosts';
import SinglePost from '@/components/SinglePost.vue';
import LoadSpinner from '@/components/LoadSpinner.vue';
import { computed, ref, watch } from 'vue';
import TagsCloud from '@/components/TagsCloud.vue';
import useArticles from '@/composables/useArticles';

const route = useRoute();
const tag = ref(route.params.tag);
const error = ref(null)
// 监听路由参数变化
watch(() => route.params.tag
  , (newTag) => {
    tag.value = newTag;
  });

// 获取文章数据
const { posts, error: getPostsError, load: loadPosts } = getPosts();
const { articles, error: articlesError, load: loadArticles } = useArticles();

if (route.query.source === 'psych') {
  loadArticles();
  error.value = articlesError.value;
} else if (route.query.source === 'blog') {
  loadPosts();
  error.value = getPostsError.value;
} else {
  loadPosts();
  error.value = getPostsError.value;
}









// 过滤包含特定标签的文章
const filteredPosts = computed(() => {
  return posts.value.filter(post =>
    post.tags.includes(tag.value)
  )
})

// 过滤包含articles
const filteredArticles = computed(() => {
  return articles.value.filter(article =>
    article.tags.includes(tag.value)
  )
})

</script>

<style lang="scss" scoped></style>
