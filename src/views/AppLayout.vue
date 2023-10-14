<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div
    class="p-0 overflow-hidden bg-color-dark-20 w-screen h-screen max-h-screen max-w-full"
  >
    <main
      class="flex flex-row overflow-hidden gap-x-8 w-full h-full max-h-full"
    >
      <RouterView />
    </main>
  </div>
</template>
