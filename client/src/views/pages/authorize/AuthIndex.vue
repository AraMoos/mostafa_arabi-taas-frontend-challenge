<script setup lang="ts">
import { onMounted, ref } from "vue";
import VButton from "@/components/buttons/VButton.vue";
import VLoader from "@/components/VLoader.vue";
import { useAuth } from "@/stores/auth";
import router from "@/router";
import axios from "axios";

// if you want to use your own github oath app replace client_id and client_secret by yours in .env file
const client_id = import.meta.env.VITE_CLIENT_ID;

//base urls
const githubBaseUrl = import.meta.env.VITE_GITHUB_BASE_URL;

// State
const isLoading = ref(true);

// Store
const auth = useAuth();

// Actions
const getAuthorize = () => {
  window.location.assign(`${githubBaseUrl}authorize?client_id=${client_id}`);
};

// Methods
const checkUrl = () => {
  const code = router.currentRoute.value.query?.code;
  if (code) {
    const request = `/access_token?code=${code}`;
    axios
      .get(request)
      .then(async (res) => {
        if (res.status == 200 && res.data?.access_token) {
          const token = res.data?.access_token;
          if (token) {
            await auth.userSession(res.data.access_token, () => {
              router.push("/");
            });
          }
        }
      })
      .catch(() => {
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
        <div v-else><VLoader /></div>
      </div>
    </div>
  </div>
</template>
