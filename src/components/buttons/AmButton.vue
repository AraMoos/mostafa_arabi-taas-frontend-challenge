<script lang="ts" setup>
/* Props */
const props = defineProps({
  label: { type: String, default: "label" },
});
/* Props */
</script>

<template>
  <button class="py-3 px-7 bg-color-primary rounded">
    <span class="text-white font-medium">{{ label }}</span>
  </button>
</template>
