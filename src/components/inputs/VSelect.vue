<script lang="ts" setup>
import { ref } from "vue";

// Props

const props = defineProps({
  label: { type: String, default: "label" },
  placeholder: { type: String, default: "label" },
  options: {
    type: Object,
    default: () => [],
  },
});

// State

const filteredOptions = ref(props.options);
const searchVal = ref("");
const selectedOption = ref(null);

// Methods

const filterData = () => {
  const val = searchVal.value.trim().toLowerCase();
  filteredOptions.value = props.options.filter((el: any) =>
    el.value.toLowerCase().includes(val)
  );
};
const selectOption = (option: any) => {
  selectedOption.value = option;
  searchVal.value = option?.value || "";
};
</script>

<template>
  <div class="am-select flex flex-col gap-5">
    <label class="text-sm font-medium">{{ label }}</label>
    <div class="am-select-group w-full relative">
      <input
        class="w-full border-gray-300 border rounded-md outline-none px-4 h-11 text-gray-800 text-sm font-normal relative"
        type="search"
        placeholder=" "
        autocomplete="off"
        v-model="searchVal"
        @input="filterData"
      />
      <span class="am-select-group-pl absolute">{{ placeholder }}</span>
      <div class="am-select-group-options absolute z-30 w-full box-border">
        <ul class="flex flex-col gap-y-0 w-full">
          <li
            v-for="option in filteredOptions"
            :key="option.id"
            @click="selectOption(option)"
          >
            <span>{{ option.value }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
