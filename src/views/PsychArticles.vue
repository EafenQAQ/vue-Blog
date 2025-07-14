<template>
  <div id="PsychArticles">
    <div v-if="error">{{ error }}</div>
    <div v-if="articles.length" class="layout">
      <PostList />
      <TagsCloud />
    </div>
    <div v-else>
      <LoadSpinner />
    </div>
  </div>
</template>

<script setup>
import PostList from '@/components/PostList.vue';
import TagsCloud from '@/components/TagsCloud.vue';
import LoadSpinner from '@/components/LoadSpinner.vue';
import { ref } from 'vue';

const articles = ref([])
</script>

<style lang="scss" scoped></style>
