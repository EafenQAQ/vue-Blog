<template>
  <div id="posts-manager">
    <h1 class="manager-title">文章管理</h1>

    <div v-if="error" class="error-message">{{ error }}</div>

    <div v-if="posts.length" class="manager-content">
      <!-- 操作栏 -->
      <div class="toolbar">
        <label class="select-all">
          <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" />
          全选
        </label>
        <button class="delete-btn" :disabled="selectedPosts.length === 0" @click="showDeleteModal = true">
          删除选中 ({{ selectedPosts.length }})
        </button>
      </div>

      <!-- 文章列表 -->
      <div class="posts-list">
        <div v-for="post in posts" :key="post.id" class="post-item"
          :class="{ selected: selectedPosts.includes(post.id) }">
          <label class="post-checkbox">
            <input type="checkbox" :value="post.id" v-model="selectedPosts" />
          </label>
          <div class="post-info">
            <h3 class="post-title">{{ post.title }}</h3>
            <div class="post-meta">
              <span>作者: {{ post.author }}</span>
              <span>创建时间: {{ formatDate(post.createAt) }}</span>
              <span v-if="post.tags.length">标签: {{ post.tags.join(', ') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!error">
      <LoadSpinner />
    </div>

    <!-- 删除确认弹窗 -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>确认删除</h3>
        <p>即将删除 {{ selectedPosts.length }} 篇文章，此操作不可撤销。</p>
        <div class="password-input">
          <label>请输入管理员密码：</label>
          <input type="password" v-model="password" placeholder="输入密码" @keyup.enter="confirmDelete" />
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">取消</button>
          <button class="confirm-btn" @click="confirmDelete" :disabled="!password.trim()">
            确认删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import LoadSpinner from '@/components/LoadSpinner.vue';
import getPosts from '@/composables/getPosts';
import axios from 'axios';

const { posts, error, load } = getPosts();
const selectedPosts = ref([]);
const showDeleteModal = ref(false);
const password = ref('');

// 全选状态
const isAllSelected = computed(() => {
  return posts.value.length > 0 && selectedPosts.value.length === posts.value.length;
});

// 切换全选
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedPosts.value = [];
  } else {
    selectedPosts.value = posts.value.map(post => post.id);
  }
};

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '未知';
  return new Date(dateString).toLocaleDateString('zh-CN');
};

// 关闭弹窗
const closeModal = () => {
  showDeleteModal.value = false;
  password.value = '';
};

// 确认删除
const confirmDelete = async () => {
  if (!password.value.trim()) return;

  if (password.value.trim() === 'eafen') {
    try {
      // 这里需要根据你的后端API调整删除逻辑
      const deletePromises = selectedPosts.value.map(postId =>
        axios.delete(`https://ssr233.site/v1/posts/${postId}`, {
          headers: { 'Authorization': password.value }
        })
      );
      // 并行发送删除请求
      await Promise.all(deletePromises);

      // 重新加载文章列表
      await load();
      selectedPosts.value = [];
      closeModal();

      alert(`成功删除 ${deletePromises.length} 篇文章`);
    } catch (err) {
      console.error('删除失败:', err);
      alert('删除失败，请检查密码或网络连接');
    }
  } else { alert('密码错误！') }

};

onMounted(() => {
  load();
});
</script>

<style scoped>
#posts-manager {
  width: 100%;
  max-width: 1000px;
  margin: var(--spacing-xl) auto;
  padding: 0 var(--spacing-md);
  min-height: 70vh;
}

.manager-title {
  font-size: 2.5em;
  color: var(--base-accent-2);
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 1rem;
}

.manager-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--base-color), var(--secondary-color));
  border-radius: 2px;
}

.error-message {
  color: var(--secondary-accent);
  font-size: 1.1em;
  text-align: center;
  padding: 2rem;
  background-color: var(--secondary-light);
  border-radius: 8px;
  border: 1px solid var(--secondary-color);
}

.manager-content {
  background: #fefefe;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--base-light);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--base-light);
}

.select-all {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.delete-btn {
  background: var(--secondary-accent);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-btn:hover:not(:disabled) {
  background: hsl(from var(--secondary-accent) h s calc(l - 10));
  transform: translateY(-2px);
}

.delete-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--base-light);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.post-item:hover {
  background: #f9f9f9;
  border-color: var(--base-color);
}

.post-item.selected {
  background: hsl(from var(--base-color) h s l / 0.1);
  border-color: var(--base-color);
}

.post-checkbox input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.post-info {
  flex: 1;
}

.post-title {
  font-size: 1.2em;
  color: var(--base-accent-2);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9em;
  color: #666;
}

.post-meta span {
  padding: 0.2rem 0.5rem;
  background: #f0f0f0;
  border-radius: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal h3 {
  color: var(--base-accent-2);
  margin-bottom: 1rem;
  text-align: center;
}

.modal p {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #666;
}

.password-input {
  margin-bottom: 2rem;
}

.password-input label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.password-input input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--base-light);
  border-radius: 6px;
  font-size: 1em;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.cancel-btn,
.confirm-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.confirm-btn {
  background: var(--secondary-accent);
  color: white;
}

.confirm-btn:hover:not(:disabled) {
  background: hsl(from var(--secondary-accent) h s calc(l - 10));
}

.confirm-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .post-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .modal {
    margin: 1rem;
  }
}
</style>
