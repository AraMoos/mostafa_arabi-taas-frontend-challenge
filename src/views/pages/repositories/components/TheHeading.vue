<script setup lang="ts">
import { useAuth } from "@/stores/auth";
const auth = useAuth();
</script>
<template>
  <header class="flex flex-row-reverse px-8 py-3 bg-white rounded-xl">
    <span class="flex items-center gap-x-3">
      <div class="text-sm c-gray-text">
        <p class="font-normal">
          Hello, <span class="font-medium">{{ auth.username }}</span>
        </p>
      </div>
      <img
        :src="auth.avatarUrl"
        alt=""
        srcset=""
        class="rounded-full w-12 h-12 bg-color-dark-20"
      />
    </span>
  </header>
</template>
