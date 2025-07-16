<template>
  <div id="PsychArticles">
    <div v-if="error">{{ error }}</div>
    <div v-if="articles.length" class="layout">
      <PostList :posts="articles" sourceType="psych" />
      <TagsCloud :posts="articles" sourceType="psych" />
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
import useArticles from '@/composables/useArticles';



const { articles, error, load } = useArticles();

load();

</script>

<style lang="scss" scoped></style>
