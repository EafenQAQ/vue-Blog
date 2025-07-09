<template>
  <div id="SinglePost" class="post">
    <h2 class="post-title">{{ post.title }}</h2>
    <p class="post-content">{{ post.content }}</p>
    <p class="post-author">作者: {{ post.author }}</p>
    <p class="post-date">发布日期: {{ post.date }}</p>


  </div>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.post {
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  background-color: var(--base-light);
}
.post-title {
  font-size: 1.5em;
  color: var(--base-accent-2);
}
.post-content {
  font-size: 1.2em;
  color: var(--secondary-color);
}
.post-author, .post-date {
  font-size: 0.9em;
  color: var(--secondary-accent);
}
.post-author {
  margin-top: 10px;
}
.post-date {
  margin-top: 5px;
}

/* 宽度 */
#SinglePost {
  width: 100%;
  max-width: 800px;
  margin: 1rem auto;
}
</style>
