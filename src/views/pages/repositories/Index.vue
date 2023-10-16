<script setup lang="ts">
import { onMounted } from "vue";
import TheSideBar from "./components/TheSideBar.vue";
import TheHeading from "./components/TheHeading.vue";
import { Octokit } from "octokit";
import { useAuth } from "@/stores/auth";

const auth = useAuth();

const octokit = new Octokit({
  auth: auth.accessToken,
});
// Mounted
onMounted(async () => {
  setTimeout(async () => {
    const res = await octokit.request(
      `GET /users/${auth.username}/repos`
    );
    console.log(res);
  }, 1000);
});
</script>
<template>
  <TheSideBar />
  <div class="flex flex-col gap-y-4 flex-1 py-4 pr-8">
    <TheHeading />
    <div class="flex flex-1 px-8 py-3 bg-white rounded-xl"></div>
  </div>
</template>
