<template>
  <div id="ArticleDetails">
    <template v-if="error">
      <div class="error">
        {{ error }}

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
const { articles, error, load } = useArticle();

load(articleID);
</script>

<style lang="scss" scoped></style>
