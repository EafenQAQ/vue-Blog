<template>
  <div id="PublishPost">
    <form @submit.prevent="handleSubmit">
      <label>标题：</label>
      <input v-model="title" type="text" required />

      <label>文章正文：</label>
      <textarea v-model="content" required></textarea>

      <label>Tags (按回车添加tag)</label>
      <input type="text" v-model="tag" @keydown.enter.prevent="addTag">
      <div class="pill" v-for="tag in tags" :key="tag" @click="removeTag(tag)">
        # {{ tag }}

      </div>

      <button>发布</button>
    </form>
  </div>
</template>

<script setup>
import { timeStamp } from '@/firebase/config';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const title = ref('');
const content = ref('');
const tag = ref('');
const tags = ref([])

const addTag = () => {
  if (!tags.value.includes(tag.value)) {
    tags.value.push(tag.value.trim());
    tag.value = '';
  }
}

const removeTag = (tag) => {
  tags.value = tags.value.filter((t) => t !== tag);
}




// 发布功能
const handleSubmit = async () => {
  const newPost = {
    title: title.value,
    content: content.value,
    author: 'Eafen',
    tags: tags.value ? tags.value.join(' ') : '' // 将数组转换为字符串
  }
  console.log(JSON.stringify(newPost));

  const res = await axios.post('https://ssr233.site/v1/posts/create', newPost)

  console.log("文章发布成功：", res);


  router.push('/')
}




</script>

<style scoped>
/* 主容器样式 */
#PublishPost {
  width: 100%;
  max-width: 800px;
  margin: var(--spacing-xl) auto;
  padding: 0 var(--spacing-md);
  min-height: 70vh;
}

/* 表单容器样式 */
form {
  background: #fefefe;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--base-light);
  position: relative;
  overflow: hidden;
}

/* 表单顶部装饰条 */
form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--base-color), var(--secondary-color), var(--base-color));
}

/* 标签样式 */
label {
  display: block;
  font-size: 1.1em;
  font-weight: 600;
  color: var(--base-accent-2);
  margin: 1.5rem 0 0.5rem 0;
  position: relative;
}

/* 第一个标签的上边距 */
label:first-of-type {
  margin-top: 0;
}

/* 输入框通用样式 */
input[type="text"],
textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--base-light);
  border-radius: 8px;
  font-size: 1em;
  color: #333;
  background-color: #fff;
  transition: all 0.3s ease;
  font-family: inherit;
  box-sizing: border-box;
}

/* 输入框聚焦状态 */
input[type="text"]:focus,
textarea:focus {
  outline: none;
  border-color: var(--base-color);
  box-shadow: 0 0 0 3px rgba(235, 186, 128, 0.2);
  transform: translateY(-1px);
}

/* 输入框悬停状态 */
input[type="text"]:hover,
textarea:hover {
  border-color: var(--base-accent);
}

/* 标题输入框特殊样式 */
input[type="text"] {
  font-size: 1.1em;
  font-weight: 500;
}

/* 文本域样式 */
textarea {
  min-height: 200px;
  resize: vertical;
  line-height: 1.6;
  font-size: 1em;
}

/* 标签输入框样式 */
input[type="text"]:last-of-type {
  background-color: var(--base-light);
  border-color: var(--base-accent);
}

input[type="text"]:last-of-type:focus {
  background-color: #fff;
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 3px rgba(221, 157, 148, 0.2);
}



/* 响应式设计 */
@media (max-width: 768px) {
  #PublishPost {
    margin: var(--spacing-md) auto;
    padding: 0 var(--spacing-sm);
  }

  form {
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  label {
    font-size: var(--font-base);
    margin: var(--spacing-lg) 0 var(--spacing-sm) 0;
  }

  input[type="text"],
  textarea {
    padding: var(--spacing-sm);
    font-size: var(--font-sm);
  }

  textarea {
    min-height: 150px;
  }
}

@media (max-width: 480px) {
  #PublishPost {
    padding: 0 var(--spacing-xs);
  }

  form {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  label {
    font-size: var(--font-sm);
    margin: var(--spacing-md) 0 var(--spacing-xs) 0;
  }

  input[type="text"],
  textarea {
    padding: var(--spacing-xs);
    font-size: var(--font-xs);
  }

  textarea {
    min-height: 120px;
  }
}

/* 平滑过渡 */
form,
input[type="text"],
textarea {
  transition: all 0.3s ease;
}

/* 必填字段标识
input[required]+label::after,
textarea[required]+label::after {
  content: ' *';
  color: var(--secondary-accent);
  font-weight: bold;
} */

/* 输入验证状态 */
input:invalid,
textarea:invalid {
  border-color: var(--secondary-accent);
}

input:valid,
textarea:valid {
  border-color: var(--base-color);
}

/* 按钮样式 */
button {
  background: linear-gradient(135deg, var(--base-color), var(--base-accent));
  color: white;
  border: none;
  padding: 1rem 6rem;
  font-size: 1.1em;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(235, 186, 128, 0.3);
  position: relative;
  overflow: hidden;
  /* 居中显示 */
  display: block;
  margin: 0 auto;
  margin-top: 2rem;
}

/* 按钮悬停效果 */
button:hover {
  background: linear-gradient(135deg, var(--base-accent), var(--base-accent-2));
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(235, 186, 128, 0.4);
}

/* 按钮按下效果 */
button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(235, 186, 128, 0.3);
}

/* 按钮禁用状态 */
button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

button:disabled:hover {
  background: #ccc;
  transform: none;
  box-shadow: none;
}

/* 按钮光泽效果 */
button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

button:hover::before {
  left: 100%;
}

/* 响应式按钮样式 */
@media (max-width: 768px) {
  button {
    padding: 0.9rem 1.8rem;
    font-size: 1em;
    margin-top: 1.5rem;
  }
}

@media (max-width: 480px) {
  button {
    width: 100%;
    padding: 0.8rem;
    font-size: 0.95em;
    margin-top: 1.2rem;
  }
}
</style>
