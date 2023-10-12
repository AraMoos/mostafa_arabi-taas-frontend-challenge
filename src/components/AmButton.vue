<script lang="ts" setup>
interface props {
  value?: string;
}
const props = withDefaults(defineProps<props>(), {
  value: "label",
});
</script>

<template>
  <button class="py-3 px-7 bg-color-primary rounded">
    <span class="text-white">{{ props.value }}</span>
  </button>
</template>
