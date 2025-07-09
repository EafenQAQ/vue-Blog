<template>
  <div id="FilteredPosts">
    <template v-if="error">{{ error }}</template>
    <template v-if="posts.length">

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

const route = useRoute();
const tag = ref(route.params.tag);

// 监听路由参数变化
watch(() => route.params.tag
  , (newTag) => {
    tag.value = newTag;
  });

const { posts, error, load } = getPosts();

load();

// 监听路由参数的变化


const filteredPosts = computed(() => {
  return posts.value.filter(post =>
    post.tags.includes(tag.value)

  )
}
)

</script>

<style lang="scss" scoped></style>
