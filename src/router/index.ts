import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "authorize",
      component: () => import("@/views/pages/auth/Authorize.vue"),
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/components/checkBoxs",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
