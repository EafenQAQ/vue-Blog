<template>
  <div id="TagsCloud">
    <div class="pill" v-for="tag in tags" :key="tag">
      <RouterLink :to="{ name: 'tag', params: { tag: tag } }"># {{ tag }}</RouterLink>
    </div>
  </div>
</template>

<script setup>
import useTags from '@/composables/useTags';

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
});
const { tags } = useTags(props.posts);

</script>

<style scoped>
#TagsCloud {
  margin-top: 2rem;
  background-color: hsl(from var(--secondary-light) h s l / 0.5);
  height: fit-content;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--base-light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
</style>
