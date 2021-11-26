import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
const Results = () => import("../views/Results.vue");

const routes = [
  { path: "/", component: Home },
  { path: "/results", component: Results },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
