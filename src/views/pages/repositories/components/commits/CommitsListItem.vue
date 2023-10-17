<script setup lang="ts">
import CodeIcon from "@/assets/icons/CodeIcon.vue";

// Define Props
const props = defineProps({
  item: { type: Object },
});
// Methods
const dateFormat = (d: string) => {
  const dt = new Date(d);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return dt.toLocaleDateString("en", options);
};
</script>
<template>
  <li
    class="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
  >
    <div class="flex flex-col gap-y-2">
      <span class="font-normal text-xs"> {{ item?.message }} </span>
      <span class="pl-8 font-medium text-xs">
        <span>{{ item?.committer.name }} - </span>
        <span class="font-normal text-gray-400"
          >committed on {{ dateFormat(item?.author.date) }}</span
        >
      </span>
    </div>
    <a
      :href="item?.html_url"
      title="Browse the repository at this point in the history"
      target="_blank"
      rel="noopener noreferrer"
      ><CodeIcon
    /></a>
  </li>
</template>
