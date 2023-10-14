<script setup lang="ts">
import { ref } from "vue";
import LogOutIcon from "@/assets/icons/LogOutIcon.vue";
import AmSelect from "@/components/inputs/AmSelect.vue";

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
        <AmSelect label="Repositories" :options="repositoriesList" placeholder="Find a repository…" />
        <AmSelect label="Branches" :options="branchesList" placeholder="Find a branch..." />
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
      <!--  <span class="flex items-center gap-x-3">
        <img
          src="https://avatars.githubusercontent.com/u/111636676?v=4"
          alt=""
          srcset=""
          class="rounded-full w-12 h-12 bg-color-dark-20"
        />
        <div class="text-sm c-gray-text">
          <p class="font-normal">Hello,</p>
          <p class="font-semibold">AraMoos</p>
        </div>
      </span> -->
    </div>
    <!--  Log Out -->
  </aside>
</template>
