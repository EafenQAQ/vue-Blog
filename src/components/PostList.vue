<template>
  <div id="PostList">
    <h2>文章列表</h2>

    <!-- 文章详情 -->
    <div class="postList" v-for="post in posts" :key="post.id">
      <SinglePost :post="post" />
    </div>



  </div>
</template>

<script setup>
import SinglePost from '@/components/SinglePost.vue';

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
});


</script>

<style scoped>
.postList {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 居中 */
#PostList {
  margin: 0 auto;
}
</style>
