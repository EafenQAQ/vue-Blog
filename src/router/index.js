import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../views/PostDetails.vue'),
      props: true,
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../views/PublishPost.vue'),
    },
  ],
})

export default router
