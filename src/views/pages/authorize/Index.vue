<script setup lang="ts">
import { onMounted, ref } from "vue";
import VButton from "@/components/buttons/VButton.vue";
import { useAuth } from "@/stores/auth";
import router from "@/router";
import axios from "axios";

const client_id = "f10d8361dbbfde11cf9b";
const client_secret = "1c576c265bed99a6d2abaf2cacd6da351edd0d2f";
const baseUrl = import.meta.env.VITE_GITHUB_BASE_URL;
const corsAnywhere = import.meta.env.VITE_CORS_ANYWHERE;

// State
const isLoading = ref(true);

// Store
const auth = useAuth();

// Actions
const getAuthorize = () => {
  window.location.assign(`${baseUrl}authorize?client_id=${client_id}`);
};

// Methods
const checkUrl = () => {
  const code = router.currentRoute.value.query?.code;
  if (code) {
    const apiUrl = `${corsAnywhere}${baseUrl}access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
    axios
      .get(apiUrl, { headers: { Accept: "application/json" } })
      .then(async (res) => {
        if (res.status == 200) {
          await auth.userSession(res.data.access_token, () => {});
          router.push("/");
        }
      })
      .catch((err) => {
        isLoading.value = false;
      });
  } else {
    isLoading.value = false;
  }
};

// Mounted
onMounted(() => {
  if (auth.isLoggedin()) router.push("/");
  checkUrl();
});
</script>
<template>
  <div class="w-full h-full flex items-center justify-center">
    <div
      class="box-border rounded-xl p-6 bg-white w-11/12 max-w-[576px] min-h-[300px] flex items-center"
    >
      <div class="w-max mx-auto cursor-pointer">
        <VButton
          v-if="!isLoading"
          label="Authorize my Github account"
          @on-click="getAuthorize"
        />
        <div v-else>Loading</div>
      </div>
    </div>
  </div>
</template>
