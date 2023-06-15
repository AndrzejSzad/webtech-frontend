import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ItemSetsView from '../views/ItemSetsView.vue';
import ChampionView from "@/views/ChampionView.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/itemsets',
    name: 'itemsets',
    component: ItemSetsView

  },
  {
    path: '/champions',
    name: 'champions',
    component: ChampionView

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router