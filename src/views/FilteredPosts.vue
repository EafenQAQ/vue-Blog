<template>
  <div id="FilteredPosts">
    <template v-if="error">{{ error }}</template>
    <template v-if="posts.length || articles.length">

      <div class="layout">
        <div class="postList">
          <p>包含「 {{ tag }} 」标签的文章有 {{ filteredPosts.length }} 篇：</p>
          <div v-for="post in filteredPosts" :key="post.id">
            <SinglePost :post="post" />
          </div>
        </div>
        <TagsCloud :posts="sourceType === 'blog' ? posts : articles" />
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
const sourceType = ref(route.query.source || 'blog')

// 监听路由参数变化
watch(() => route.params.tag
  , (newTag) => {
    tag.value = newTag;
  });

// 根据条件获取不同来源的文章数据
const { posts, error: postsError, load: loadPosts } = getPosts();
const { articles, error: articlesError, load: loadArticles } = useArticles();

if (sourceType.value === 'blog') {
  loadPosts();
} else if (sourceType.value === 'psych') {
  loadArticles();
} else {
  loadPosts();
}

const error = computed(() => {
  if (sourceType.value === 'blog') {
    return postsError.value;
  } else if (sourceType.value === 'psych') {
    return articlesError.value;
  } else {
    return postsError.value;
  }
}
)

// 监听路由参数的变化


const filteredPosts = computed(() => {
  if (sourceType.value === 'blog') {
    return posts.value.filter(post =>
      post.tags.includes(tag.value)

    )
  } else if (sourceType.value === 'psych') {
    return articles.value.filter(article =>
      article.tags.includes(tag.value)
    )
  } else {
    return posts.value.filter(post =>
      post.tags.includes(tag.value)
    )
  }

}
)

</script>

<style lang="scss" scoped></style>
