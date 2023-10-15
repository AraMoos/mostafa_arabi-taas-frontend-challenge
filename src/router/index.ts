import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/stores/auth";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "repositories",
      component: () => import("@/views/pages/repositories/Index.vue"),
      meta: { requiresAuth: true },
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
  const auth = useAuth();
  if (to.meta.requiresAuth && !auth.isLoggedin()) {
    // this route requires auth, check if logged in
    // if not, redirect to Authorize page.
    return {
      path: "/auth",
    };
  }
});

export default router;
