import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemSetsView from '../views/ItemSetsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/itemsets',
    name: 'itemsets',
    component: ItemSetsView

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
