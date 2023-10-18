<script setup lang="ts">
import { onMounted } from "vue";
import TheSideBar from "./components/TheSideBar.vue";
import TheHeading from "./components/TheHeading.vue";
import CommitsList from "./components/commits/CommitsList.vue";
import { useAuth } from "@/stores/auth";
import { useRepositories } from "@/stores/repositories";

const auth = useAuth();
const repositories = useRepositories();

// Mounted
onMounted(async () => {
  const token = auth.isLoggedin();
  if (token && auth.user.accessToken === "") {
    await auth.userSession(token, async () => {
      await repositories.getRepos();
    });
  } else if (token) {
    await repositories.getRepos();
  }
});
</script>
<template>
  <TheSideBar />
  <div class="flex flex-col gap-y-4 flex-1 py-4 pr-8">
    <TheHeading />
    <CommitsList />
  </div>
</template>
