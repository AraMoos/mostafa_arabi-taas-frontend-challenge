<script lang="ts" setup>
// Define Props
const props = defineProps({
  label: { type: String, default: "label" },
});

//Define Emits
const emits = defineEmits(["onClick"]);

// Actions
const handleClick = () => {
  emits("onClick");
};
</script>

<template>
  <button class="py-3 px-7 bg-color-primary rounded" @click="handleClick">
    <span class="text-white font-medium">{{ label }}</span>
  </button>
</template>
