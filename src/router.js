import { createRouter, createWebHistory } from "vue-router";
import Users from './components/User.vue';
import userDetails from './components/UserDetails.vue'
import pageNotFound from './components/pageNotFound.vue'
// import TodoForm from './components/TodoForm.vue'

const routes = [
  {
    name: 'Users',
    path: '/',
    component: Users
  },
  {
    name: 'userDetails',
    path: '/users/:userId',
    component: userDetails
  },
  {
    name: 'pageNotFound',
    path: '/:pathMatch(.*)*',
    component: pageNotFound
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;