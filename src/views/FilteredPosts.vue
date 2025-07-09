<template>
  <div id="FilteredPosts">
    <template v-if="error">{{ error }}</template>
    <template v-if="posts.length">
      <p>包含「 {{ tag }} 」标签的文章有 {{ filteredPosts.length }} 篇：</p>
      <div v-for="post in filteredPosts" :key="post.id">
        <SinglePost :post="post" />
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
import { computed } from 'vue';

const route = useRoute();
const tag = route.params.tag

const { posts, error, load } = getPosts();

load();

const filteredPosts = computed(() => {
  return posts.value.filter(post =>
    post.tags.includes(tag)

  )
}
)

</script>

<style lang="scss" scoped></style>
