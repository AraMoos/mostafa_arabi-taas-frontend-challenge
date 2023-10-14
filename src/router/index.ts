import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "repositories",
      component: () => import("@/views/pages/repositories/Index.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/auth",
      name: "authorize",
      component: () => import("@/views/pages/authorize/Index.vue"),
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
