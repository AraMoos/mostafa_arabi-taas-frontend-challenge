<script setup lang="ts">
import LogOutIcon from "@/assets/icons/LogOutIcon.vue";
import VSelect from "@/components/inputs/VSelect.vue";
import { useAuth } from "@/stores/auth";
import { useRepositories } from "@/stores/repositories";

const auth = useAuth();
const repositories = useRepositories();

// Methods

const getBranchesList = async (current: any) => {
  if (current?.text) {
    repositories.setCurrentRepo(current);
    await repositories.getBranches(current.text);
  }
};

const getCommitsList = async (current: any) => {
  if (current?.text && repositories.currentRepo) {
    await repositories.getCommits(repositories.currentRepo.text, current.text);
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
          @on-change="getBranchesList"
        />
        <VSelect
          label="Branches"
          :options="repositories.branchesList"
          placeholder="Find a branch..."
          @on-change="getCommitsList"
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
