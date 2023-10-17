<script setup lang="ts">
import { ref } from "vue";
import LogOutIcon from "@/assets/icons/LogOutIcon.vue";
import VSelect from "@/components/inputs/VSelect.vue";
import { useAuth } from "@/stores/auth";
import { useRepositories } from "@/stores/repositories";

const auth = useAuth();
const repositories = useRepositories();

// Methods

const getRepo = (current: any) => {
  if (current?.value) {
    repositories.getBranches(current.value);
  }
};
</script>

<template>
  <aside
    class="h-full max-h-full bg-white flex flex-col box-border py-4 w-[350px]"
  >
    <!--  Filter -->
    <div class="flex-1 box-border px-5">
      <div class="flex flex-col gap-y-6">
        <VSelect
          label="Repositories"
          :options="repositories.reposList"
          placeholder="Find a repository…"
          @on-change="getRepo"
        />
        <VSelect
          label="Branches"
          :options="repositories.branchesList"
          placeholder="Find a branch..."
        />
      </div>
    </div>
    <!--  Filter -->

    <!--  Log Out -->
    <div
      class="pt-4 border-t box-border flex px-3 justify-center border-gray-200"
    >
      <button
        class="log-out w-max flex flex-col items-center justify-center cursor-pointer"
        @click="auth.logOut"
      >
        <LogOutIcon />
        <span class="color-gray-text text-xs uppercase">log Out</span>
      </button>
    </div>
    <!--  Log Out -->
  </aside>
</template>
