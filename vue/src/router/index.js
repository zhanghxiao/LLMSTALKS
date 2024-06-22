import Vue from 'vue';
import VueRouter from 'vue-router';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Manager',
    component: () => import('../views/Manager.vue'),
    redirect: '/home',
    children: [
      { path: 'more-model', name: 'MoreModelChat', meta: { name: '多模型对话' }, component: () => import('../views/manager/MoreModelChat.vue') },
      { path: 'about', name: 'About', meta: { name: '关于' }, component: () => import('../views/manager/About.vue') },
      { path: 'single-model', name: 'SingleModelChat', meta: { name: '单模型对话' }, component: () => import('../views/manager/SingleModelChat.vue') }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
