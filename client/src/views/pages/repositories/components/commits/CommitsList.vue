<script setup lang="ts">
import { ref } from "vue";
import VLoader from "@/components/VLoader.vue";
import CommitsListItem from "./CommitsListItem.vue";
import { useRepositories } from "@/stores/repositories";
// Refs
const pagination = ref({ per_page: 20, page: 1 });
const loadMore = ref(false);
// Stores
const repositories = useRepositories();

// Methods
const doScroll = async (event: Event) => {
  const e =(event.target as HTMLElement);
  const scrollHeight = e.scrollHeight;
  const scrollTop = e.scrollTop;
  const clientHeight = e.clientHeight;
  if (
    scrollTop + clientHeight >= scrollHeight &&
    !loadMore.value &&
    !repositories.lastPage
  ) {
    loadMore.value = true;
    pagination.value.page++;
    await repositories.getCommits(
      repositories.currentRepo!.name,
      repositories.currentBranch!.name,
      pagination.value,
      true
    );
    loadMore.value = false;
  }
};
</script>
<template>
  <div class="flex flex-1 flex-col p-6 bg-white rounded-xl overflow-hidden">
    <div
      class="flex-1 flex flex-col overflow-hidden"
      v-if="!repositories.commitsLoading"
    >
      <ul
        class="flex-1 flex flex-col gap-y-4 w-full overflow-x-hidden max-h-full overflow-y-auto box-border pr-6"
        @scroll="doScroll"
      >
        <CommitsListItem
          v-for="(commit, index) in repositories.commitsList"
          :key="index"
          :item="commit"
        />
        <li v-if="loadMore" class="flex items-center justify-center p-4">
          <VLoader />
        </li>
        <li
          v-if="repositories.lastPage"
          class="flex items-center justify-center p-4"
        >
          <span class="text-xs font-medium text-gray-500 uppercase"
            >No more commits</span
          >
        </li>
      </ul>
    </div>
    <div class="flex flex-1 items-center justify-center" v-else>
      <VLoader />
    </div>
  </div>
</template>
