<script setup lang="ts">
import VButton from "@/components/buttons/VButton.vue";
</script>
<template>
  <div class="w-full h-full flex items-center justify-center">
    <div
      class="box-border rounded-xl p-6 bg-white w-11/12 max-w-[576px] min-h-[300px] flex items-center"
    >
      <div class="w-max mx-auto">
        <VButton label="Authorize my Github account"/>
      </div>
    </div>
  </div>
</template>
