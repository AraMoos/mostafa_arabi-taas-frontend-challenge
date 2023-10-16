<script setup lang="ts">
import AppLayout from "@/views/AppLayout.vue";
import { onBeforeMount } from "vue";
import { useAuth } from "./stores/auth";
const auth = useAuth();

onBeforeMount(async () => {
  if (auth.isLoggedin()) {
    const token = localStorage.getItem("@accessToken");
    await auth.userSession(token);
  }
});
</script>

<template>
  <AppLayout />
</template>
