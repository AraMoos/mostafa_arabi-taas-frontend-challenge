<script setup lang="ts">
import { ref } from "vue";
import LogOutIcon from "@/assets/icons/LogOutIcon.vue";
import VSelect from "@/components/inputs/VSelect.vue";

const repoName = ref("");
const repositoriesList = [
  { id: 1, value: "Joggola" },
  { id: 2, value: "mostafa_arabi-taas-frontend-challenge" },
  { id: 3, value: "afraharabi" },
  { id: 4, value: "codemaroc" },
  { id: 5, value: "casablanca.net" },
  { id: 6, value: "eCommercial" },
];
const branchesList = [
  { id: 1, value: "main" },
  { id: 2, value: "develop" },
  { id: 3, value: "prduction" },
];
</script>

<template>
  <aside
    class="h-full max-h-full bg-white flex flex-col box-border py-4 w-[350px]"
  >
    <!--  Filter -->
    <div class="flex-1 box-border px-5">
      <div class="flex flex-col gap-y-6">
        <VSelect label="Repositories" :options="repositoriesList" placeholder="Find a repository…" />
        <VSelect label="Branches" :options="branchesList" placeholder="Find a branch..." />
      </div>
    </div>
    <!--  Filter -->

    <!--  Log Out -->
    <div
      class="pt-4 border-t box-border flex px-3 justify-center border-gray-200"
    >
      <span
        class="log-out w-max flex flex-col items-center justify-center cursor-pointer"
      >
        <LogOutIcon />
        <span class="color-gray-text text-xs uppercase">log Out</span>
      </span>
    </div>
    <!--  Log Out -->
  </aside>
</template>
