import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "repositories",
      component: () => import("@/views/pages/repositories/ReposIndex.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/auth",
      name: "authorize",
      component: () => import("@/views/pages/authorize/AuthIndex.vue"),
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach(async (to) => {
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
